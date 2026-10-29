// ============================================================
// Database & Authentication Layer (SQLite via node:sqlite)
// With Strict 10-Digit Phone, RFC Email Validation & Full Login History Audit
// ============================================================
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

// Vercel serverless environment check:
// On Vercel, the app root directory is read-only. Store sqlite database in /tmp or use memory.
const isVercel = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DB_PATH = isVercel ? path.join('/tmp', 'database.sqlite') : path.join(__dirname, 'database.sqlite');

let db;
try {
  const { DatabaseSync } = require('node:sqlite');
  try {
    db = new DatabaseSync(DB_PATH);
  } catch (fsErr) {
    console.warn('[DB] Could not open database at ' + DB_PATH + ', falling back to in-memory SQLite:', fsErr.message);
    db = new DatabaseSync(':memory:');
  }
} catch (sqliteModuleErr) {
  console.warn('[DB] node:sqlite is not available on this Node runtime, activating in-memory store:', sqliteModuleErr.message);
  db = createMemorySqlFallback();
}

function createMemorySqlFallback() {
  const mem = {
    users: [],
    otps: new Map(),
    login_history: [],
    failed_logins: new Map()
  };

  return {
    exec: () => {},
    prepare: (sql) => {
      const s = sql.trim();
      return {
        run: (...params) => {
          if (/INSERT INTO users/i.test(s)) {
            const [id, name, email, phone, password_hash, avatar, title, bio, role, join_date, stats, skills, preferences, created_at, updated_at, location, linkedin, github, portfolio, experience_level, years_exp, current_company, education, certifications, target_role] = params;
            mem.users.push({ id, name, email, phone, password_hash, avatar, title, bio, role, join_date, stats, skills, preferences, created_at, updated_at, location, linkedin, github, portfolio, experience_level, years_exp, current_company, education, certifications, target_role, login_count: 0 });
          } else if (/INSERT OR REPLACE INTO otps/i.test(s)) {
            const [phone, otp, expires_at] = params;
            mem.otps.set(phone, { phone, otp, expires_at });
          } else if (/DELETE FROM otps/i.test(s)) {
            const [phone] = params;
            mem.otps.delete(phone);
          } else if (/INSERT INTO login_history/i.test(s)) {
            const [id, user_id, identifier, login_method, status, ip_address, user_agent, risk_score, risk_reason, timestamp] = params;
            mem.login_history.unshift({ id, user_id, identifier, login_method, status, ip_address, user_agent, risk_score, risk_reason, timestamp });
          } else if (/UPDATE users SET password_hash = \?, updated_at = \? WHERE email = \?/i.test(s)) {
            const [password_hash, updated_at, email] = params;
            const u = mem.users.find(x => x.email.toLowerCase() === (email || '').toLowerCase());
            if (u) { u.password_hash = password_hash; u.updated_at = updated_at; }
          } else if (/UPDATE users SET login_count/i.test(s)) {
            const [last_login_at, email] = params;
            const u = mem.users.find(x => x.email.toLowerCase() === (email || '').toLowerCase());
            if (u) { u.login_count = (u.login_count || 0) + 1; u.last_login_at = last_login_at; }
          } else if (/UPDATE users SET/i.test(s)) {
            const [name, phone, title, bio, avatar, skills, preferences, location, linkedin, github, portfolio, experience_level, years_exp, current_company, education, certifications, target_role, updated_at, email] = params;
            const u = mem.users.find(x => x.email.toLowerCase() === (email || '').toLowerCase());
            if (u) {
              Object.assign(u, { name, phone, title, bio, avatar, skills, preferences, location, linkedin, github, portfolio, experience_level, years_exp, current_company, education, certifications, target_role, updated_at });
            }
          } else if (/INSERT INTO failed_logins/i.test(s) || /UPDATE failed_logins/i.test(s)) {
            const id = params[params.length - 1] || params[0];
            mem.failed_logins.set(id, { attempts: params[1] || 1, last_failed_at: Date.now() });
          } else if (/DELETE FROM failed_logins/i.test(s)) {
            mem.failed_logins.delete(params[0]);
          }
          return { changes: 1 };
        },
        get: (...params) => {
          if (/FROM users WHERE email = \?/i.test(s)) {
            const email = (params[0] || '').toLowerCase();
            return mem.users.find(x => x.email.toLowerCase() === email) || null;
          } else if (/FROM users WHERE phone = \?/i.test(s)) {
            const phone = params[0] || '';
            return mem.users.find(x => x.phone === phone) || null;
          } else if (/FROM users WHERE id = \?/i.test(s)) {
            const id = params[0] || '';
            return mem.users.find(x => x.id === id) || null;
          } else if (/FROM otps WHERE phone = \?/i.test(s)) {
            const phone = params[0] || '';
            return mem.otps.get(phone) || null;
          } else if (/FROM failed_logins/i.test(s)) {
            return mem.failed_logins.get(params[0]) || null;
          } else if (/SELECT COUNT\(\*\) as total FROM users/i.test(s)) {
            return { total: mem.users.length };
          } else if (/SELECT COUNT\(\*\) as total FROM login_history WHERE status = 'SUCCESS'/i.test(s)) {
            return { total: mem.login_history.filter(x => x.status === 'SUCCESS').length };
          } else if (/SELECT COUNT\(\*\) as total FROM login_history WHERE status = 'FAILED'/i.test(s)) {
            return { total: mem.login_history.filter(x => x.status === 'FAILED').length };
          }
          return null;
        },
        all: (...params) => {
          if (/FROM login_history WHERE identifier = \?/i.test(s)) {
            const id = (params[0] || '').toLowerCase();
            const limit = params[1] || 10;
            return mem.login_history.filter(x => x.identifier.toLowerCase() === id).slice(0, limit);
          } else if (/FROM login_history ORDER BY/i.test(s)) {
            const limit = params[0] || 10;
            return mem.login_history.slice(0, limit);
          }
          return [];
        }
      };
    }
  };
}

// Initialize SQLite Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL COLLATE NOCASE,
    phone TEXT,
    password_hash TEXT NOT NULL,
    avatar TEXT,
    title TEXT,
    bio TEXT,
    role TEXT DEFAULT 'user',
    join_date TEXT,
    stats TEXT,
    skills TEXT,
    preferences TEXT,
    login_count INTEGER DEFAULT 0,
    last_login_at TEXT,
    created_at TEXT,
    updated_at TEXT
  );

  CREATE TABLE IF NOT EXISTS otps (
    phone TEXT PRIMARY KEY,
    otp TEXT NOT NULL,
    expires_at INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS login_history (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    identifier TEXT NOT NULL COLLATE NOCASE,
    login_method TEXT NOT NULL,
    status TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    risk_score INTEGER DEFAULT 0,
    risk_reason TEXT,
    timestamp TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS failed_logins (
    identifier TEXT PRIMARY KEY COLLATE NOCASE,
    attempts INTEGER DEFAULT 1,
    first_failed_at INTEGER NOT NULL,
    last_failed_at INTEGER NOT NULL,
    locked_until INTEGER DEFAULT 0
  );
`);

// Safely ensure new columns exist if table was already created
try { db.exec('ALTER TABLE users ADD COLUMN login_count INTEGER DEFAULT 0'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN last_login_at TEXT'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN location TEXT'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN linkedin TEXT'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN github TEXT'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN portfolio TEXT'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN experience_level TEXT'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN years_exp TEXT'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN current_company TEXT'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN education TEXT'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN certifications TEXT'); } catch(e) {}
try { db.exec('ALTER TABLE users ADD COLUMN target_role TEXT'); } catch(e) {}

// ============================================================
// VALIDATION & SANITIZATION HELPERS
// ============================================================

/**
 * Validates standard 10-digit mobile phone numbers.
 * Strips formatting (spaces, +, -, (), dots) and extracts 10 digits.
 * Accepts:
 *  - 10 digits: "9876543210"
 *  - 11 digits with country code: "+1 9876543210"
 *  - 12 digits with country code: "+91 9876543210"
 * Rejects numbers that are not 10 digits or repeating junk like "0000000000".
 */
function normalizePhoneNumber(rawPhone) {
  if (!rawPhone || typeof rawPhone !== 'string') return null;
  // Remove invisible/zero-width characters and spaces
  const clean = rawPhone.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
  const digits = clean.replace(/\D/g, '');

  let normalized = null;
  if (digits.length === 10) {
    normalized = digits;
  } else if (digits.length === 11 && digits.startsWith('1')) {
    normalized = digits.slice(1);
  } else if (digits.length === 12 && digits.startsWith('91')) {
    normalized = digits.slice(2);
  }

  if (normalized) {
    // Reject repeating junk numbers (e.g. 0000000000, 1111111111)
    if (/^(\d)\1{9}$/.test(normalized)) return null;
    return normalized;
  }
  return null;
}

/**
 * Strict RFC-compliant email validator.
 * Ensures local part, @ symbol, valid domain name, and minimum 2-character TLD.
 */
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const clean = email.replace(/[\u200B-\u200D\uFEFF]/g, '').trim().toLowerCase();
  
  if (clean.length < 5 || clean.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(clean)) return false;

  const [local, domain] = clean.split('@');
  if (!local || local.length > 64) return false;
  if (!domain || !domain.includes('.')) return false;

  const domainParts = domain.split('.');
  if (domainParts.some(p => p.length === 0 || p.length > 63)) return false;
  const tld = domainParts[domainParts.length - 1];
  if (!/^[a-zA-Z]{2,24}$/.test(tld)) return false;

  return true;
}

/**
 * Analyzes credentials for extreme conditions / security anomalies:
 * SQL injection patterns, script injection, buffer overflow payloads.
 */
function assessSecurityRisk(identifier, password = '') {
  let riskScore = 0;
  const reasons = [];

  const combined = `${identifier || ''} ${password || ''}`;

  // SQL Injection signatures
  if (/(\b(UNION|SELECT|DROP|INSERT|DELETE|UPDATE|ALTER|CREATE|EXEC)\b)|(--|;|\/\*)/i.test(combined)) {
    riskScore += 60;
    reasons.push('SQL injection signature detected');
  }

  // XSS / Script signatures
  if (/<script|javascript:|onerror=|onload=/i.test(combined)) {
    riskScore += 60;
    reasons.push('XSS payload detected');
  }

  // Excessive length (Buffer overflow or DOS attempt)
  if ((identifier && identifier.length > 200) || (password && password.length > 250)) {
    riskScore += 40;
    reasons.push('Excessive input length anomaly');
  }

  return {
    riskScore: Math.min(100, riskScore),
    isSuspicious: riskScore >= 50,
    riskReason: reasons.length > 0 ? reasons.join(', ') : 'Normal verification'
  };
}

// ============================================================
// PASSWORD HASHING (SCRYPT)
// ============================================================

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  if (!stored) return false;
  // If stored in plain text (legacy fallback)
  if (!stored.includes(':')) {
    return password === stored;
  }
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const verifyHash = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(verifyHash, 'hex'));
}

function sanitizeUser(user) {
  if (!user) return null;
  const copy = { ...user };
  delete copy.password_hash;
  if (typeof copy.stats === 'string') {
    try { copy.stats = JSON.parse(copy.stats); } catch(e) {}
  }
  if (typeof copy.skills === 'string') {
    try { copy.skills = JSON.parse(copy.skills); } catch(e) {}
  }
  if (typeof copy.preferences === 'string') {
    try { copy.preferences = JSON.parse(copy.preferences); } catch(e) {}
  }
  return copy;
}

// ============================================================
// LOGIN HISTORY & RATE LIMIT AUDIT
// ============================================================

function checkRateLimit(identifier) {
  if (!identifier) return { allowed: true };
  const cleanId = identifier.trim().toLowerCase();
  const row = db.prepare('SELECT * FROM failed_logins WHERE identifier = ?').get(cleanId);
  if (!row) return { allowed: true };

  const now = Date.now();
  if (row.locked_until && row.locked_until > now) {
    const remainingSec = Math.ceil((row.locked_until - now) / 1000);
    return {
      allowed: false,
      error: `Too many failed attempts. Account temporarily locked for security. Please try again in ${remainingSec} seconds.`
    };
  }
  return { allowed: true };
}

function recordFailedAttempt(identifier) {
  if (!identifier) return;
  const cleanId = identifier.trim().toLowerCase();
  const now = Date.now();
  const row = db.prepare('SELECT * FROM failed_logins WHERE identifier = ?').get(cleanId);

  if (!row) {
    db.prepare(`
      INSERT INTO failed_logins (identifier, attempts, first_failed_at, last_failed_at, locked_until)
      VALUES (?, 1, ?, ?, 0)
    `).run(cleanId, now, now);
  } else {
    // Reset if window exceeded 5 minutes
    if (now - row.first_failed_at > 5 * 60 * 1000) {
      db.prepare(`
        UPDATE failed_logins 
        SET attempts = 1, first_failed_at = ?, last_failed_at = ?, locked_until = 0
        WHERE identifier = ?
      `).run(now, now, cleanId);
    } else {
      const newAttempts = row.attempts + 1;
      let lockedUntil = 0;
      if (newAttempts >= 5) {
        lockedUntil = now + (2 * 60 * 1000); // 2 minute lock
      }
      db.prepare(`
        UPDATE failed_logins 
        SET attempts = ?, last_failed_at = ?, locked_until = ?
        WHERE identifier = ?
      `).run(newAttempts, now, lockedUntil, cleanId);
    }
  }
}

function logLoginEvent({ userId, identifier, method, status, ip = '127.0.0.1', userAgent = 'Unknown', riskScore = 0, riskReason = 'Normal' }) {
  try {
    const id = 'log_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    const now = new Date().toISOString();
    const cleanId = (identifier || 'unknown').trim().toLowerCase();

    db.prepare(`
      INSERT INTO login_history (id, user_id, identifier, login_method, status, ip_address, user_agent, risk_score, risk_reason, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, userId || null, cleanId, method, status, ip, userAgent, riskScore, riskReason, now);

    if (status === 'success' && userId) {
      db.prepare(`
        UPDATE users 
        SET login_count = COALESCE(login_count, 0) + 1, last_login_at = ?, updated_at = ?
        WHERE id = ?
      `).run(now, now, userId);

      // Clear failed login counter
      db.prepare('DELETE FROM failed_logins WHERE identifier = ?').run(cleanId);
    } else if (status !== 'success') {
      recordFailedAttempt(cleanId);
    }
  } catch (err) {
    console.error('Error logging login event:', err);
  }
}

// ============================================================
// USER LOOKUP & SEEDING
// ============================================================

function getUserByEmail(email) {
  if (!email) return null;
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(email.trim().toLowerCase());
  return row ? sanitizeUser(row) : null;
}

function getUserById(id) {
  if (!id) return null;
  const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  return row ? sanitizeUser(row) : null;
}

function getUserByPhone(phone) {
  const normalized = normalizePhoneNumber(phone);
  if (!normalized) return null;
  const row = db.prepare('SELECT * FROM users WHERE phone = ?').get(normalized);
  return row ? sanitizeUser(row) : null;
}

// Seed default demo user if harsh@example.com does not exist
try {
  const checkUser = db.prepare('SELECT id FROM users WHERE email = ?').get('harsh@example.com');
  if (!checkUser) {
    const defaultUser = {
      id: 'u1',
      name: 'Harsh Vardhan Singh',
      email: 'harsh@example.com',
      phone: '9876543210',
      password_hash: hashPassword('demo1234'),
      avatar: 'HV',
      title: 'Senior Software Engineer',
      bio: 'Full-stack developer passionate about building scalable web applications and AI systems. Practicing system design and behavioral interviews.',
      role: 'user',
      join_date: '2024-01-15',
      stats: JSON.stringify({
        interviewsCompleted: 14,
        avgScore: 78,
        hoursPracticed: '8.5h',
        streakDays: 5,
        topRole: 'Software Engineer',
        topDifficulty: 'Intermediate'
      }),
      skills: JSON.stringify([
        { name: 'JavaScript', score: 85 },
        { name: 'React', score: 80 },
        { name: 'Node.js', score: 75 },
        { name: 'System Design', score: 70 },
        { name: 'Data Structures', score: 68 },
        { name: 'SQL', score: 82 }
      ]),
      preferences: JSON.stringify({
        defaultRole: 'Software Engineer',
        defaultDifficulty: 'Intermediate',
        cameraDefault: true,
        micDefault: true,
        emailAlerts: true,
        weeklyReport: false,
        darkMode: false
      }),
      login_count: 5,
      last_login_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const insertStmt = db.prepare(`
      INSERT INTO users (id, name, email, phone, password_hash, avatar, title, bio, role, join_date, stats, skills, preferences, login_count, last_login_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertStmt.run(
      defaultUser.id,
      defaultUser.name,
      defaultUser.email,
      defaultUser.phone,
      defaultUser.password_hash,
      defaultUser.avatar,
      defaultUser.title,
      defaultUser.bio,
      defaultUser.role,
      defaultUser.join_date,
      defaultUser.stats,
      defaultUser.skills,
      defaultUser.preferences,
      defaultUser.login_count,
      defaultUser.last_login_at,
      defaultUser.created_at,
      defaultUser.updated_at
    );
  }
} catch (e) {
  console.error('Error seeding demo user:', e);
}

// ============================================================
// CORE AUTHENTICATION FUNCTIONS
// ============================================================

/**
 * Creates a unique user with strict 10-digit phone and RFC email validation.
 */
function createUser({ name, email, phone, password }, context = {}) {
  const ip = context.ip || '127.0.0.1';
  const userAgent = context.userAgent || 'Unknown';

  if (!name || !name.trim()) {
    return { success: false, error: 'Full name is required.' };
  }
  if (!email || !email.trim()) {
    return { success: false, error: 'Email address is required.' };
  }
  if (!isValidEmail(email)) {
    return { success: false, error: 'Please enter a valid email address (e.g. name@example.com).' };
  }

  // Strict 10-digit phone requirement
  if (!phone || !phone.trim()) {
    return { success: false, error: '10-digit phone number is required.' };
  }
  const cleanPhone = normalizePhoneNumber(phone);
  if (!cleanPhone) {
    return { success: false, error: 'Please enter a valid 10-digit mobile number (e.g. 9876543210).' };
  }

  if (!password || password.trim().length < 4) {
    return { success: false, error: 'Password must be at least 4 characters long.' };
  }

  // Check for security risks in extreme conditions
  const security = assessSecurityRisk(`${name} ${email} ${phone}`, password);
  if (security.isSuspicious) {
    logLoginEvent({
      userId: null,
      identifier: email.trim().toLowerCase(),
      method: 'register',
      status: 'rejected_security_risk',
      ip,
      userAgent,
      riskScore: security.riskScore,
      riskReason: security.riskReason
    });
    return { success: false, error: 'Registration rejected due to invalid or malformed character sequence.' };
  }

  const cleanEmail = email.trim().toLowerCase();

  // Check unique email
  const existingEmail = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
  if (existingEmail) {
    return { success: false, error: 'An account with this email already exists. Please sign in.' };
  }

  // Check unique 10-digit phone
  const existingPhone = db.prepare('SELECT id FROM users WHERE phone = ?').get(cleanPhone);
  if (existingPhone) {
    return { success: false, error: 'An account with this 10-digit phone number already exists.' };
  }

  const id = 'u' + Date.now();
  const avatar = name.trim().split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';
  const joinDate = new Date().toISOString().split('T')[0];
  const now = new Date().toISOString();
  const passwordHash = hashPassword(password.trim());

  const stats = JSON.stringify({
    interviewsCompleted: 0,
    avgScore: 0,
    hoursPracticed: '0h',
    streakDays: 1,
    topRole: 'Software Engineer',
    topDifficulty: 'Beginner'
  });
  const skills = JSON.stringify([]);
  const preferences = JSON.stringify({
    defaultRole: 'Software Engineer',
    defaultDifficulty: 'Beginner',
    cameraDefault: true,
    micDefault: true,
    emailAlerts: true,
    weeklyReport: false,
    darkMode: false
  });

  const insert = db.prepare(`
    INSERT INTO users (id, name, email, phone, password_hash, avatar, title, bio, role, join_date, stats, skills, preferences, login_count, last_login_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
  `);

  insert.run(
    id,
    name.trim(),
    cleanEmail,
    cleanPhone,
    passwordHash,
    avatar,
    'Software Engineer',
    '',
    'user',
    joinDate,
    stats,
    skills,
    preferences,
    now,
    now,
    now
  );

  // Store registration login event
  logLoginEvent({
    userId: id,
    identifier: cleanEmail,
    method: 'register',
    status: 'success',
    ip,
    userAgent,
    riskScore: 0,
    riskReason: 'Account created'
  });

  const newUser = getUserByEmail(cleanEmail);
  return { success: true, user: newUser };
}

/**
 * Verifies email and password, logs every login in SQLite, and protects against extreme conditions.
 */
function verifyLogin(email, password, context = {}) {
  const ip = context.ip || '127.0.0.1';
  const userAgent = context.userAgent || 'Unknown';

  if (!email || !email.trim()) {
    return { success: false, error: 'Please enter your email address.' };
  }
  if (!password || !password.trim()) {
    return { success: false, error: 'Please enter your password.' };
  }

  const cleanEmail = email.trim().toLowerCase();

  // Rate-limiting check
  const rateLimit = checkRateLimit(cleanEmail);
  if (!rateLimit.allowed) {
    logLoginEvent({
      userId: null,
      identifier: cleanEmail,
      method: 'password',
      status: 'blocked_rate_limit',
      ip,
      userAgent,
      riskScore: 75,
      riskReason: 'Account locked due to consecutive failed attempts'
    });
    return { success: false, error: rateLimit.error };
  }

  // Extreme condition security check
  const security = assessSecurityRisk(cleanEmail, password);
  if (security.isSuspicious) {
    logLoginEvent({
      userId: null,
      identifier: cleanEmail,
      method: 'password',
      status: 'rejected_security_risk',
      ip,
      userAgent,
      riskScore: security.riskScore,
      riskReason: security.riskReason
    });
    return { success: false, error: 'Invalid or malformed characters detected in login request.' };
  }

  // Strict email validation
  if (!isValidEmail(cleanEmail)) {
    logLoginEvent({
      userId: null,
      identifier: cleanEmail,
      method: 'password',
      status: 'failed_invalid_email',
      ip,
      userAgent,
      riskScore: 30,
      riskReason: 'Malformed email format'
    });
    return { success: false, error: 'Please enter a valid email address (e.g. name@example.com).' };
  }

  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);
  if (!row) {
    logLoginEvent({
      userId: null,
      identifier: cleanEmail,
      method: 'password',
      status: 'failed_user_not_found',
      ip,
      userAgent,
      riskScore: 20,
      riskReason: 'User not found'
    });
    return { success: false, error: 'Account not found with this email. Please check your email or register.' };
  }

  const isValid = verifyPassword(password.trim(), row.password_hash);
  if (!isValid) {
    logLoginEvent({
      userId: row.id,
      identifier: cleanEmail,
      method: 'password',
      status: 'failed_incorrect_password',
      ip,
      userAgent,
      riskScore: 35,
      riskReason: 'Incorrect password supplied'
    });
    return { success: false, error: 'Incorrect password. Please try again.' };
  }

  // Success: Log login event and update user login stats
  logLoginEvent({
    userId: row.id,
    identifier: cleanEmail,
    method: 'password',
    status: 'success',
    ip,
    userAgent,
    riskScore: 0,
    riskReason: 'Normal password authentication'
  });

  return { success: true, user: sanitizeUser(row) };
}

function updateUserPassword(email, newPassword, currentPassword = null) {
  if (!email || !email.trim()) return { success: false, error: 'Email is required.' };
  if (!newPassword || newPassword.trim().length < 4) return { success: false, error: 'Password must be at least 4 characters.' };

  const cleanEmail = email.trim().toLowerCase();
  const row = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);
  if (!row) return { success: false, error: 'Account not found.' };

  if (currentPassword !== null && currentPassword !== undefined && currentPassword !== '') {
    const isValid = verifyPassword(currentPassword, row.password_hash);
    if (!isValid) {
      return { success: false, error: 'Current password is incorrect.' };
    }
  }

  const newHash = hashPassword(newPassword.trim());
  const now = new Date().toISOString();
  db.prepare('UPDATE users SET password_hash = ?, updated_at = ? WHERE email = ?').run(newHash, now, cleanEmail);

  return { success: true };
}

function updateUserProfile(user) {
  if (!user || !user.email) return { success: false, error: 'User email is required.' };
  const cleanEmail = user.email.trim().toLowerCase();
  const existing = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);
  if (!existing) return { success: false, error: 'User not found in database.' };

  const name = user.name || existing.name;
  let phone = existing.phone;
  if (user.phone !== undefined && user.phone !== null && user.phone !== '') {
    const normPhone = normalizePhoneNumber(user.phone);
    if (normPhone) phone = normPhone;
  }

  const title = user.title !== undefined ? user.title : existing.title;
  const bio = user.bio !== undefined ? user.bio : existing.bio;
  const avatar = user.avatar || existing.avatar;
  const stats = typeof user.stats === 'object' ? JSON.stringify(user.stats) : (user.stats || existing.stats);
  const skills = typeof user.skills === 'object' ? JSON.stringify(user.skills) : (user.skills || existing.skills);
  const preferences = typeof user.preferences === 'object' ? JSON.stringify(user.preferences) : (user.preferences || existing.preferences);
  
  const location = user.location !== undefined ? user.location : (existing.location || '');
  const linkedin = user.linkedin !== undefined ? user.linkedin : (existing.linkedin || '');
  const github = user.github !== undefined ? user.github : (existing.github || '');
  const portfolio = user.portfolio !== undefined ? user.portfolio : (existing.portfolio || '');
  const experience_level = user.experience_level !== undefined ? user.experience_level : (existing.experience_level || '');
  const years_exp = user.years_exp !== undefined ? user.years_exp : (existing.years_exp || '');
  const current_company = user.current_company !== undefined ? user.current_company : (existing.current_company || '');
  const education = user.education !== undefined ? (typeof user.education === 'object' ? JSON.stringify(user.education) : user.education) : (existing.education || '');
  const certifications = user.certifications !== undefined ? (typeof user.certifications === 'object' ? JSON.stringify(user.certifications) : user.certifications) : (existing.certifications || '');
  const target_role = user.target_role !== undefined ? user.target_role : (existing.target_role || '');

  const now = new Date().toISOString();

  db.prepare(`
    UPDATE users SET 
      name = ?, phone = ?, title = ?, bio = ?, avatar = ?, stats = ?, skills = ?, preferences = ?,
      location = ?, linkedin = ?, github = ?, portfolio = ?, experience_level = ?, years_exp = ?, current_company = ?, education = ?, certifications = ?, target_role = ?,
      updated_at = ?
    WHERE email = ?
  `).run(
    name, phone, title, bio, avatar, stats, skills, preferences,
    location, linkedin, github, portfolio, experience_level, years_exp, current_company, education, certifications, target_role,
    now, cleanEmail
  );

  return { success: true, user: getUserByEmail(cleanEmail) };
}

/**
 * OTP Request enforcing strictly 10 digits.
 */
function saveOTP(phone) {
  const cleanPhone = normalizePhoneNumber(phone);
  if (!cleanPhone) {
    return { success: false, error: 'Please enter a valid 10-digit phone number (e.g., 9876543210).' };
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins
  db.prepare('INSERT OR REPLACE INTO otps (phone, otp, expires_at) VALUES (?, ?, ?)').run(cleanPhone, otp, expiresAt);
  
  return { success: true, otp, phone: cleanPhone };
}

/**
 * OTP Verify enforcing 10-digit phone and logging login into database.
 */
function verifyOTP(phone, enteredOtp, context = {}) {
  const ip = context.ip || '127.0.0.1';
  const userAgent = context.userAgent || 'Unknown';

  const cleanPhone = normalizePhoneNumber(phone);
  if (!cleanPhone) {
    return { success: false, error: 'Please enter a valid 10-digit phone number.' };
  }
  if (!enteredOtp || !enteredOtp.trim()) {
    return { success: false, error: 'Please enter the 6-digit OTP code.' };
  }

  const row = db.prepare('SELECT * FROM otps WHERE phone = ?').get(cleanPhone);
  if (!row) {
    logLoginEvent({
      userId: null,
      identifier: cleanPhone,
      method: 'phone_otp',
      status: 'failed_no_otp_requested',
      ip,
      userAgent,
      riskScore: 25,
      riskReason: 'No OTP requested for phone'
    });
    return { success: false, error: 'No OTP requested for this phone number. Please request a new code.' };
  }

  if (Date.now() > row.expires_at) {
    db.prepare('DELETE FROM otps WHERE phone = ?').run(cleanPhone);
    logLoginEvent({
      userId: null,
      identifier: cleanPhone,
      method: 'phone_otp',
      status: 'failed_otp_expired',
      ip,
      userAgent,
      riskScore: 10,
      riskReason: 'OTP expired'
    });
    return { success: false, error: 'OTP has expired. Please request a new code.' };
  }

  if (row.otp !== enteredOtp.trim()) {
    logLoginEvent({
      userId: null,
      identifier: cleanPhone,
      method: 'phone_otp',
      status: 'failed_incorrect_otp',
      ip,
      userAgent,
      riskScore: 30,
      riskReason: 'Incorrect OTP'
    });
    return { success: false, error: 'Invalid OTP code. Please check and try again.' };
  }

  // Clear OTP
  db.prepare('DELETE FROM otps WHERE phone = ?').run(cleanPhone);

  // Find or create unique user for this 10-digit phone
  let user = db.prepare('SELECT * FROM users WHERE phone = ?').get(cleanPhone);
  if (!user) {
    const id = 'u' + Date.now();
    const name = 'User ' + cleanPhone.slice(-4);
    const email = cleanPhone + '@phone.user';
    const dummyHash = hashPassword(crypto.randomBytes(16).toString('hex'));
    const joinDate = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO users (id, name, email, phone, password_hash, avatar, title, bio, role, join_date, stats, skills, preferences, login_count, last_login_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
    `).run(id, name, email, cleanPhone, dummyHash, 'U', 'New Member', '', 'user', joinDate, '{}', '[]', '{}', now, now, now);
    user = db.prepare('SELECT * FROM users WHERE phone = ?').get(cleanPhone);
  }

  // Log successful login
  logLoginEvent({
    userId: user.id,
    identifier: cleanPhone,
    method: 'phone_otp',
    status: 'success',
    ip,
    userAgent,
    riskScore: 0,
    riskReason: 'OTP verified'
  });

  return { success: true, user: sanitizeUser(user) };
}

/**
 * Google Login with email validation and login history tracking.
 */
function googleLogin(email, context = {}) {
  const ip = context.ip || '127.0.0.1';
  const userAgent = context.userAgent || 'Unknown';

  if (!email || !email.trim()) return { success: false, error: 'Email is required.' };
  const cleanEmail = email.trim().toLowerCase();

  if (!isValidEmail(cleanEmail)) {
    return { success: false, error: 'Please enter a valid Google email address.' };
  }

  let user = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);
  if (!user) {
    const namePart = cleanEmail.split('@')[0];
    const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const id = 'u' + Date.now();
    const dummyHash = hashPassword(crypto.randomBytes(16).toString('hex'));
    const joinDate = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO users (id, name, email, phone, password_hash, avatar, title, bio, role, join_date, stats, skills, preferences, login_count, last_login_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
    `).run(id, name, cleanEmail, '', dummyHash, name.slice(0, 2).toUpperCase(), 'New Member', '', 'user', joinDate, '{}', '[]', '{}', now, now, now);
    user = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);
  }

  // Log Google Login
  logLoginEvent({
    userId: user.id,
    identifier: cleanEmail,
    method: 'google',
    status: 'success',
    ip,
    userAgent,
    riskScore: 0,
    riskReason: 'Google OAuth mock login'
  });

  return { success: true, user: sanitizeUser(user) };
}

function getLoginAudit(identifier = null, limit = 20) {
  if (identifier) {
    const clean = identifier.trim().toLowerCase();
    return db.prepare('SELECT * FROM login_history WHERE identifier = ? ORDER BY timestamp DESC LIMIT ?').all(clean, limit);
  }
  return db.prepare('SELECT * FROM login_history ORDER BY timestamp DESC LIMIT ?').all(limit);
}

function getSystemAuthStats() {
  const usersRow = db.prepare('SELECT COUNT(*) as unique_users FROM users').get();
  const loginsRow = db.prepare("SELECT COUNT(*) as total_logins FROM login_history WHERE status = 'success'").get();
  const failedRow = db.prepare("SELECT COUNT(*) as failed_attempts FROM login_history WHERE status != 'success'").get();
  return {
    uniqueUsers: usersRow ? usersRow.unique_users : 0,
    totalLogins: loginsRow ? loginsRow.total_logins : 0,
    failedAttempts: failedRow ? failedRow.failed_attempts : 0
  };
}

module.exports = {
  db,
  isValidEmail,
  normalizePhoneNumber,
  assessSecurityRisk,
  hashPassword,
  verifyPassword,
  sanitizeUser,
  getUserByEmail,
  getUserById,
  getUserByPhone,
  createUser,
  verifyLogin,
  updateUserPassword,
  updateUserProfile,
  saveOTP,
  verifyOTP,
  googleLogin,
  logLoginEvent,
  getLoginAudit,
  getSystemAuthStats
};
