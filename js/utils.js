// ============================================================
// MOCK DATA — AI Interview Simulation
// ============================================================

const MOCK_USER = {
  id: 'u1',
  name: 'Harsh Vardhan Singh',
  email: 'harsh@example.com',
  avatar: 'HV',
  joinDate: '2025-01-15',
  role: 'user',
  title: 'Software Engineer'
};

const ROLES = [
  { id: 'software-engineer', name: 'Software Engineer', emoji: '💻' },
  { id: 'data-scientist', name: 'Data Scientist', emoji: '📊' },
  { id: 'product-manager', name: 'Product Manager', emoji: '🚀' },
  { id: 'ux-designer', name: 'UX Designer', emoji: '🎨' },
  { id: 'devops-engineer', name: 'DevOps Engineer', emoji: '⚙️' },
  { id: 'aptitude', name: 'Aptitude', emoji: '🧠' }
];

const QUESTION_BANK = {
  'Software Engineer': {
    Beginner: [
      { id:'se_b1', q:'What is the difference between an array and a linked list?', keywords:['array','linked list','memory','index','node','contiguous','pointer'] },
      { id:'se_b2', q:'Explain what Object-Oriented Programming (OOP) is.', keywords:['object','class','inheritance','encapsulation','polymorphism','abstraction'] },
      { id:'se_b3', q:'What is a REST API and how does it work?', keywords:['REST','HTTP','GET','POST','stateless','endpoint','JSON','request','response'] },
      { id:'se_b4', q:'What is version control and why is it important?', keywords:['git','commit','branch','merge','history','collaboration','track','repository'] },
      { id:'se_b5', q:'Explain the difference between SQL and NoSQL databases.', keywords:['SQL','NoSQL','relational','document','schema','scalable','table','query'] },
      { id:'se_b6', q:'What is a function and what is recursion?', keywords:['function','recursion','base case','call stack','return','parameter','method'] },
      { id:'se_b7', q:'What is the difference between frontend and backend development?', keywords:['frontend','backend','client','server','UI','database','API','render'] },
      { id:'se_b8', q:'What is debugging and what tools do you use?', keywords:['bug','breakpoint','console','debugger','test','error','stack trace','log'] },
      { id:'se_b9', q:'What is the difference between HTTP and HTTPS?', keywords:['HTTP','HTTPS','SSL','TLS','encryption','secure','certificate','port'] },
      { id:'se_b10', q:'What is a variable and what are different data types?', keywords:['variable','string','integer','boolean','float','type','declare','value'] }
    ],
    Intermediate: [
      { id:'se_m1', q:'Explain time and space complexity. What is Big O notation?', keywords:['O(n)','O(1)','O(log n)','complexity','time','space','algorithm','efficiency','Big O','worst case'] },
      { id:'se_m2', q:'What is the difference between synchronous and asynchronous programming?', keywords:['async','await','promise','callback','event loop','blocking','non-blocking','concurrent'] },
      { id:'se_m3', q:'Describe the SOLID principles in software design.', keywords:['single responsibility','open/closed','Liskov','interface','dependency','SOLID','principle'] },
      { id:'se_m4', q:'What is a design pattern? Describe Singleton and Observer.', keywords:['singleton','observer','pattern','instance','notify','subscribe','design','factory','creational'] },
      { id:'se_m5', q:'How does a hash table work? What is a hash collision?', keywords:['hash','key','value','collision','bucket','function','O(1)','chaining','open addressing'] },
      { id:'se_m6', q:'What is CI/CD and why is it important in modern development?', keywords:['continuous','integration','deployment','pipeline','automation','build','test','release'] },
      { id:'se_m7', q:'Explain the difference between TCP and UDP.', keywords:['TCP','UDP','reliable','handshake','packet','datagram','protocol','connection','acknowledgment'] },
      { id:'se_m8', q:'What is a microservices architecture vs. monolithic?', keywords:['microservices','monolithic','service','independent','API','scale','deploy','loose coupling'] },
      { id:'se_m9', q:'Describe how garbage collection works in memory management.', keywords:['garbage','memory','heap','reference','collect','leak','deallocation','mark and sweep'] },
      { id:'se_m10', q:'What is the CAP theorem in distributed systems?', keywords:['CAP','consistency','availability','partition','distributed','theorem','trade-off','eventual'] }
    ],
    Advanced: [
      { id:'se_a1', q:'Design a URL shortener system. Discuss architecture, storage, and scalability.', keywords:['hash','database','redirect','cache','load balancer','scale','CDN','encoding','base62'] },
      { id:'se_a2', q:'Explain the internals of a database index and when you would NOT use one.', keywords:['B-tree','index','query','write','read','performance','clustered','scan','selectivity'] },
      { id:'se_a3', q:'Describe different concurrency models and their trade-offs.', keywords:['thread','lock','mutex','deadlock','actor','async','concurrent','race condition','semaphore'] },
      { id:'se_a4', q:'How would you design a real-time chat application at scale?', keywords:['websocket','message queue','pub/sub','scale','persistence','delivery','read receipt','shard'] },
      { id:'se_a5', q:'Explain how the V8 JavaScript engine optimizes code execution.', keywords:['JIT','hidden class','optimization','bytecode','inline cache','garbage collection','V8','deoptimize'] }
    ]
  },
  'Data Scientist': {
    Beginner: [
      { id:'ds_b1', q:'What is the difference between supervised and unsupervised learning?', keywords:['supervised','unsupervised','label','cluster','train','predict','classification','regression'] },
      { id:'ds_b2', q:'What is overfitting and how can you prevent it?', keywords:['overfitting','regularization','dropout','cross-validation','train','test','generalize','L1','L2'] },
      { id:'ds_b3', q:'Explain what a confusion matrix is and its metrics.', keywords:['confusion matrix','precision','recall','F1','accuracy','false positive','false negative','true positive'] },
      { id:'ds_b4', q:'What is the difference between mean, median, and mode?', keywords:['mean','median','mode','average','central tendency','outlier','distribution','skew'] },
      { id:'ds_b5', q:'What is feature engineering?', keywords:['feature','engineering','transform','normalize','encode','variable','selection','extraction','creation'] },
      { id:'ds_b6', q:'What is cross-validation and why is it used?', keywords:['cross-validation','k-fold','train','test','split','validate','performance','generalization'] },
      { id:'ds_b7', q:'What is the purpose of normalization and standardization?', keywords:['normalization','standardization','scale','feature','min-max','z-score','gradient','range'] },
      { id:'ds_b8', q:'What is pandas used for in data science?', keywords:['pandas','dataframe','series','data manipulation','filter','groupby','merge','clean','analysis'] }
    ],
    Intermediate: [
      { id:'ds_m1', q:'Explain gradient descent and how it trains neural networks.', keywords:['gradient','descent','loss','weight','backpropagation','learning rate','minimize','epoch','batch'] },
      { id:'ds_m2', q:'What is the bias-variance tradeoff?', keywords:['bias','variance','tradeoff','underfitting','overfitting','complexity','error','decomposition'] },
      { id:'ds_m3', q:'Compare Random Forest and Gradient Boosting.', keywords:['random forest','gradient boosting','ensemble','tree','bagging','boosting','feature importance','XGBoost'] },
      { id:'ds_m4', q:'What is principal component analysis (PCA)?', keywords:['PCA','dimensionality','reduction','variance','eigenvector','component','projection','orthogonal'] },
      { id:'ds_m5', q:'How would you handle imbalanced datasets?', keywords:['imbalanced','SMOTE','oversample','undersample','class weight','threshold','F1','precision','recall'] }
    ],
    Advanced: [
      { id:'ds_a1', q:'Explain the attention mechanism and why it revolutionized NLP.', keywords:['attention','transformer','self-attention','query','key','value','NLP','BERT','positional encoding'] },
      { id:'ds_a2', q:'How would you design an A/B testing framework for an ML system?', keywords:['A/B test','statistical significance','p-value','control','treatment','confidence','metric','power'] },
      { id:'ds_a3', q:'Describe the challenges of deploying ML models to production.', keywords:['drift','monitor','retrain','pipeline','latency','version','serve','MLOps','feature store'] }
    ]
  },
  'Product Manager': {
    Beginner: [
      { id:'pm_b1', q:'What is the difference between a product roadmap and a sprint backlog?', keywords:['roadmap','backlog','sprint','prioritize','goal','feature','planning','epics','timeline'] },
      { id:'pm_b2', q:'What is a user story and how do you write one?', keywords:['user story','as a','I want','so that','acceptance criteria','persona','value','definition of done'] },
      { id:'pm_b3', q:'How do you prioritize features in a product backlog?', keywords:['MoSCoW','RICE','priority','impact','effort','value','stakeholder','rank','framework'] },
      { id:'pm_b4', q:'What metrics would you use to measure product success?', keywords:['KPI','retention','DAU','NPS','conversion','churn','revenue','metric','north star'] },
      { id:'pm_b5', q:'What is a minimum viable product (MVP)?', keywords:['MVP','minimum','viable','feature','launch','feedback','hypothesis','iteration','lean'] },
      { id:'pm_b6', q:'Explain the difference between a product manager and a project manager.', keywords:['product','project','strategy','execution','roadmap','scope','timeline','why','what'] }
    ],
    Intermediate: [
      { id:'pm_m1', q:'How would you handle conflicting priorities from multiple stakeholders?', keywords:['stakeholder','prioritize','align','tradeoff','data','communicate','compromise','goal','OKR'] },
      { id:'pm_m2', q:'Describe your approach to conducting user research.', keywords:['user research','interview','survey','persona','insight','qualitative','quantitative','jobs-to-be-done'] },
      { id:'pm_m3', q:'What is product-market fit and how do you measure it?', keywords:['product-market fit','retention','NPS','survey','churn','grow','need','40% rule'] },
      { id:'pm_m4', q:'How do you decide when to launch a feature vs. iterate further?', keywords:['launch','iterate','feedback','metric','quality','risk','ready','criteria','exit criteria'] }
    ],
    Advanced: [
      { id:'pm_a1', q:'Design a recommendation system for an e-commerce platform.', keywords:['recommendation','collaborative filtering','A/B test','personalization','metric','click','conversion','cold start'] },
      { id:'pm_a2', q:'How would you turn around a declining product?', keywords:['decline','churn','root cause','segment','pivot','retention','reposition','strategy','cohort'] }
    ]
  },
  'UX Designer': {
    Beginner: [
      { id:'ux_b1', q:'What is the difference between UX and UI design?', keywords:['UX','UI','experience','interface','user','usability','visual','interaction','research'] },
      { id:'ux_b2', q:'What is a wireframe and when do you use it?', keywords:['wireframe','prototype','layout','low-fidelity','sketch','structure','iterate','deliverable'] },
      { id:'ux_b3', q:'Explain the design thinking process.', keywords:['empathize','define','ideate','prototype','test','design thinking','user-centered','iterate'] },
      { id:'ux_b4', q:'What are the principles of good typography in design?', keywords:['typography','font','hierarchy','readability','contrast','spacing','weight','legibility','scale'] },
      { id:'ux_b5', q:'How do you ensure your designs are accessible?', keywords:['accessibility','WCAG','contrast','alt text','screen reader','keyboard','color','aria','inclusive'] }
    ],
    Intermediate: [
      { id:'ux_m1', q:'How do you conduct usability testing and what do you look for?', keywords:['usability','test','task','user','observe','feedback','insight','iteration','think aloud'] },
      { id:'ux_m2', q:'Describe your design handoff process to developers.', keywords:['handoff','Figma','Zeplin','spec','component','annotation','token','documentation','redline'] },
      { id:'ux_m3', q:'What is information architecture and how does it affect UX?', keywords:['information architecture','navigation','hierarchy','sitemap','user flow','label','mental model','taxonomy'] }
    ],
    Advanced: [
      { id:'ux_a1', q:'How do you measure the ROI of UX improvements?', keywords:['ROI','conversion','retention','metric','NPS','task completion','A/B test','data','business impact'] },
      { id:'ux_a2', q:'Describe how you would redesign a complex enterprise application.', keywords:['research','stakeholder','workflow','pain point','design system','iterate','validate','rollout','adoption'] }
    ]
  },
  'DevOps Engineer': {
    Beginner: [
      { id:'do_b1', q:'What is Docker and what problem does it solve?', keywords:['Docker','container','image','environment','portable','isolated','dependency','Dockerfile','registry'] },
      { id:'do_b2', q:'Explain the difference between CI and CD.', keywords:['CI','CD','build','test','deploy','pipeline','automate','integration','continuous delivery'] },
      { id:'do_b3', q:'What is Infrastructure as Code (IaC)?', keywords:['IaC','Terraform','infrastructure','code','automate','provision','idempotent','declarative','Ansible'] },
      { id:'do_b4', q:'What is a load balancer and why is it used?', keywords:['load balancer','distribute','traffic','availability','health check','scale','server','round robin'] }
    ],
    Intermediate: [
      { id:'do_m1', q:'How does Kubernetes manage containerized applications?', keywords:['Kubernetes','pod','deployment','service','cluster','node','orchestrate','replica','scheduler'] },
      { id:'do_m2', q:'Explain the concept of monitoring and observability in production.', keywords:['monitoring','observability','metrics','logs','traces','alert','dashboard','Prometheus','Grafana'] },
      { id:'do_m3', q:'What strategies do you use for zero-downtime deployments?', keywords:['blue-green','canary','rolling','zero-downtime','deploy','switch','rollback','traffic','feature flag'] }
    ],
    Advanced: [
      { id:'do_a1', q:'Design a highly available, multi-region deployment architecture.', keywords:['multi-region','failover','DNS','latency','data sync','replica','CDN','active-active','RTO','RPO'] },
      { id:'do_a2', q:'How would you respond to a security incident in production?', keywords:['incident','response','isolate','audit','log','patch','rollback','communicate','runbook','forensics'] }
    ]
  }
};

const DIFFICULTY_TIMERS = { Beginner: 120, Intermediate: 90, Advanced: 60 };

// ============================================================
// MOCK HISTORY GENERATOR
// ============================================================

function _generateMockFeedback(role, difficulty, count, overallScore) {
  const roleBank = typeof MCQ_BANK !== 'undefined' ? MCQ_BANK[role] : null;
  const diffBank = roleBank ? (roleBank[difficulty] || roleBank['Beginner']) : (typeof MCQ_BANK !== 'undefined' ? MCQ_BANK['Software Engineer']['Beginner'] : []);
  const feedbacks = [];
  for (let i = 0; i < count; i++) {
    const q = diffBank[i % Math.max(diffBank.length, 1)];
    const qScore = Math.min(100, Math.max(20, overallScore + Math.round((Math.random() - 0.5) * 30)));
    feedbacks.push({
      question: q ? q.q : `Question ${i+1} for ${role}`,
      answer: 'Selected Option',
      score: qScore,
      keywords: [],
      matchedKeywords: [],
      grade: qScore >= 85 ? 'A' : qScore >= 70 ? 'B' : qScore >= 55 ? 'C' : qScore >= 40 ? 'D' : 'F',
      suggestion: q ? q.exp : 'Good answer.'
    });
  }
  return feedbacks;
}

function _genHistory() {
  const roles = ['Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'DevOps Engineer'];
  const diffs = ['Beginner', 'Intermediate', 'Advanced'];
  const counts = [3, 5, 7];
  const history = [];
  for (let i = 0; i < 12; i++) {
    const role = roles[i % roles.length];
    const diff = diffs[Math.floor(i / 4) % 3];
    const score = Math.floor(48 + Math.random() * 48);
    const qCount = counts[i % counts.length];
    const date = new Date(Date.now() - (i * 2 + Math.random() * 5) * 24 * 60 * 60 * 1000);
    history.push({
      id: `h${i+1}`,
      role, difficulty: diff, score,
      questions: qCount,
      duration: `${Math.floor(qCount * 1.5 + Math.random() * 5)}m`,
      date: date.toISOString(),
      feedback: _generateMockFeedback(role, diff, qCount, score)
    });
  }
  return history;
}

// ============================================================
// AUTH UTILITIES
// ============================================================

function getDbUsers() {
  const raw = localStorage.getItem('ai_users_db');
  return raw ? JSON.parse(raw) : [];
}

function saveDbUsers(users) {
  localStorage.setItem('ai_users_db', JSON.stringify(users));
}

function getUser() {
  const raw = sessionStorage.getItem('ai_user');
  if (raw) {
    const user = JSON.parse(raw);
    // Refresh user from DB in case profile was updated elsewhere
    const dbUser = getDbUsers().find(u => u.email === user.email);
    return dbUser || user;
  }
  return null;
}

function requireAuth() {
  const user = getUser();
  if (!user) { window.location.href = 'index.html'; return null; }
  return user;
}

// ============================================================
// CREDENTIAL VALIDATORS (10-DIGIT PHONE & RFC EMAIL)
// ============================================================

function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const clean = email.replace(/[\u200B-\u200D\uFEFF]/g, '').trim().toLowerCase();
  if (clean.length < 5 || clean.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(clean)) return false;
  const [local, domain] = clean.split('@');
  if (!local || local.length > 64) return false;
  if (!domain || !domain.includes('.')) return false;
  const parts = domain.split('.');
  if (parts.some(p => p.length === 0 || p.length > 63)) return false;
  const tld = parts[parts.length - 1];
  return /^[a-zA-Z]{2,24}$/.test(tld);
}

function normalizePhoneNumber(rawPhone) {
  if (!rawPhone || typeof rawPhone !== 'string') return null;
  const clean = rawPhone.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
  const digits = clean.replace(/\D/g, '');
  let normalized = null;
  if (digits.length === 10) normalized = digits;
  else if (digits.length === 11 && digits.startsWith('1')) normalized = digits.slice(1);
  else if (digits.length === 12 && digits.startsWith('91')) normalized = digits.slice(2);
  
  if (normalized) {
    if (/^(\d)\1{9}$/.test(normalized)) return null;
    return normalized;
  }
  return null;
}

async function doLogin(email, password) {
  if (!email || !email.trim()) {
    return { success: false, error: 'Please enter your email address.' };
  }
  const cleanEmail = email.trim().toLowerCase();
  if (!isValidEmail(cleanEmail)) {
    return { success: false, error: 'Please enter a valid email address (e.g. name@example.com).' };
  }
  if (!password || !password.trim()) {
    return { success: false, error: 'Please enter your password.' };
  }
  const cleanPass = password.trim();

  // 1. Try Backend SQLite Database API
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, password: cleanPass })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success && data.user) {
      sessionStorage.setItem('ai_user', JSON.stringify(data.user));
      // Sync local storage cache
      const users = getDbUsers();
      const idx = users.findIndex(u => u.email.toLowerCase() === cleanEmail.toLowerCase());
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...data.user };
      } else {
        users.push({ ...data.user, password: cleanPass });
      }
      saveDbUsers(users);
      return { success: true, user: data.user };
    } else if (data.error) {
      return { success: false, error: data.error };
    }
  } catch (netErr) {
    console.warn('Backend server not reachable, using local storage database fallback:', netErr);
  }

  // 2. Fallback to Local Storage Database (Offline / file://)
  const users = getDbUsers();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail.toLowerCase());
  
  if (!user) {
    if (cleanEmail === 'harsh@example.com' && cleanPass === 'demo1234') {
      const newUser = { ...MOCK_USER, email: cleanEmail, password: cleanPass };
      users.push(newUser);
      saveDbUsers(users);
      sessionStorage.setItem('ai_user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    }
    return { success: false, error: 'Account not found with this email. Please register.' };
  }
  
  // STRICT password check
  if (user.password !== cleanPass) {
    return { success: false, error: 'Incorrect password. Please try again.' };
  }
  
  sessionStorage.setItem('ai_user', JSON.stringify(user));
  return { success: true, user };
}

async function doRegister(name, email, phone, password) {
  if (!name || !name.trim()) {
    return { success: false, error: 'Full name is required.' };
  }
  if (!email || !email.trim()) {
    return { success: false, error: 'Email address is required.' };
  }
  const cleanEmail = email.trim().toLowerCase();
  if (!isValidEmail(cleanEmail)) {
    return { success: false, error: 'Please enter a valid email address (e.g. name@example.com).' };
  }
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
  const cleanName = name.trim();
  const cleanPass = password.trim();

  // 1. Try Backend SQLite Database API
  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cleanName, email: cleanEmail, phone: cleanPhone, password: cleanPass })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success && data.user) {
      sessionStorage.setItem('ai_user', JSON.stringify(data.user));
      const users = getDbUsers();
      users.push({ ...data.user, password: cleanPass });
      saveDbUsers(users);
      return { success: true, user: data.user };
    } else if (data.error) {
      return { success: false, error: data.error };
    }
  } catch (netErr) {
    console.warn('Backend server not reachable, saving to local database fallback:', netErr);
  }

  // 2. Fallback to Local Storage Database (Offline)
  const users = getDbUsers();
  if (users.find(u => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, error: 'An account with this email already exists. Please log in.' };
  }
  if (users.find(u => u.phone === cleanPhone)) {
    return { success: false, error: 'An account with this 10-digit phone number already exists.' };
  }
  
  const newUser = {
    id: 'u' + Date.now(),
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    password: cleanPass,
    avatar: cleanName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U',
    joinDate: new Date().toISOString().split('T')[0],
    role: 'user',
    title: 'Software Engineer',
    stats: {
      interviewsCompleted: 0,
      avgScore: 0,
      hoursPracticed: '0h',
      streakDays: 1,
      topRole: 'Software Engineer',
      topDifficulty: 'Beginner'
    },
    skills: [],
    preferences: {
      defaultRole: 'Software Engineer',
      defaultDifficulty: 'Beginner',
      cameraDefault: true,
      micDefault: true,
      emailAlerts: true,
      weeklyReport: false,
      darkMode: false
    }
  };
  
  users.push(newUser);
  saveDbUsers(users);
  sessionStorage.setItem('ai_user', JSON.stringify(newUser));
  return { success: true, user: newUser };
}

async function doGoogleLogin(email) {
  if (!email || !email.trim()) return { success: false, error: 'Google login cancelled.' };
  const cleanEmail = email.trim();

  try {
    const res = await fetch('/api/auth/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success && data.user) {
      sessionStorage.setItem('ai_user', JSON.stringify(data.user));
      return { success: true, user: data.user };
    }
  } catch (e) {
    console.warn('Backend not reachable for Google login, using local fallback:', e);
  }
  
  const users = getDbUsers();
  let user = users.find(u => u.email.toLowerCase() === cleanEmail.toLowerCase());
  
  if (!user) {
    const namePart = cleanEmail.split('@')[0];
    user = {
      id: 'u' + Date.now(),
      name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      email: cleanEmail,
      password: 'GOOGLE_OAUTH_NO_PASSWORD',
      avatar: namePart.slice(0, 2).toUpperCase(),
      joinDate: new Date().toISOString().split('T')[0],
      role: 'user',
      title: 'New Member'
    };
    users.push(user);
    saveDbUsers(users);
  }
  
  sessionStorage.setItem('ai_user', JSON.stringify(user));
  return { success: true, user };
}

async function doForgotPassword(email) {
  if (!email || !email.trim()) return { success: false, error: 'Please provide an email address.' };
  const cleanEmail = email.trim();

  try {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, otp: data.otp, user: data.user };
    } else if (data.error) {
      return { success: false, error: data.error };
    }
  } catch (e) {
    console.warn('Backend not reachable for forgot password, using local fallback:', e);
  }

  const users = getDbUsers();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail.toLowerCase());
  if (!user) return { success: false, error: 'Account not found with this email.' };
  
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return { success: true, user: user, otp };
}

async function requestOTP(phone) {
  if (!phone || !phone.trim()) return { success: false, error: 'Please enter your 10-digit mobile number.' };
  const cleanPhone = normalizePhoneNumber(phone);
  if (!cleanPhone) {
    return { success: false, error: 'Please enter a valid 10-digit mobile number (e.g., 9876543210).' };
  }

  try {
    const res = await fetch('/api/auth/otp-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cleanPhone })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      return { success: true, otp: data.otp, phone: data.phone || cleanPhone };
    } else if (data.error) {
      return { success: false, error: data.error };
    }
  } catch (e) {
    console.warn('Backend not reachable for OTP request, using local fallback:', e);
  }
  
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  sessionStorage.setItem('ai_mock_otp', JSON.stringify({ phone: cleanPhone, otp }));
  return { success: true, otp, phone: cleanPhone };
}

async function verifyOTP(phone, enteredOtp) {
  if (!phone || !enteredOtp) return { success: false, error: 'Phone number and 6-digit OTP code are required.' };
  const cleanPhone = normalizePhoneNumber(phone);
  if (!cleanPhone) {
    return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
  }
  const cleanOtp = enteredOtp.trim();

  try {
    const res = await fetch('/api/auth/otp-verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cleanPhone, otp: cleanOtp })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success && data.user) {
      sessionStorage.setItem('ai_user', JSON.stringify(data.user));
      return { success: true, user: data.user };
    } else if (data.error) {
      return { success: false, error: data.error };
    }
  } catch (e) {
    console.warn('Backend not reachable for OTP verify, using local fallback:', e);
  }

  const data = JSON.parse(sessionStorage.getItem('ai_mock_otp') || '{}');
  if (!data || data.phone !== cleanPhone) {
    return { success: false, error: 'OTP request expired or invalid. Please request again.' };
  }
  if (data.otp !== cleanOtp) {
    return { success: false, error: 'Invalid OTP code. Please check and try again.' };
  }
  
  const users = getDbUsers();
  let user = users.find(u => u.phone === cleanPhone);
  
  if (!user) {
    user = {
      id: 'u' + Date.now(),
      name: 'User ' + cleanPhone.slice(-4),
      email: cleanPhone.replace(/[^\d]/g, '') + '@phone.user',
      phone: cleanPhone,
      password: 'OTP_LOGIN',
      avatar: 'U',
      joinDate: new Date().toISOString().split('T')[0],
      role: 'user',
      title: 'New Member'
    };
    users.push(user);
    saveDbUsers(users);
  }
  
  sessionStorage.setItem('ai_user', JSON.stringify(user));
  sessionStorage.removeItem('ai_mock_otp');
  return { success: true, user };
}

async function updatePassword(email, newPassword, currentPassword = null) {
  if (!email || !email.trim()) return { success: false, error: 'Email is required.' };
  if (!newPassword || newPassword.trim().length < 4) return { success: false, error: 'Password must be at least 4 characters long.' };
  const cleanEmail = email.trim();
  const cleanNew = newPassword.trim();

  try {
    const res = await fetch('/api/auth/update-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail, newPassword: cleanNew, currentPassword })
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success) {
      const users = getDbUsers();
      const idx = users.findIndex(u => u.email.toLowerCase() === cleanEmail.toLowerCase());
      if (idx !== -1) {
        users[idx].password = cleanNew;
        saveDbUsers(users);
      }
      return { success: true };
    } else if (data.error) {
      return { success: false, error: data.error };
    }
  } catch (e) {
    console.warn('Backend not reachable for password update, using local fallback:', e);
  }

  const users = getDbUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === cleanEmail.toLowerCase());
  if (userIndex === -1) return { success: false, error: 'Account not found in database.' };

  if (currentPassword && users[userIndex].password && users[userIndex].password !== currentPassword) {
    return { success: false, error: 'Current password is incorrect.' };
  }
  
  users[userIndex].password = cleanNew;
  saveDbUsers(users);
  return { success: true };
}

async function updateUserProfile(updatedUser) {
  if (!updatedUser || !updatedUser.email) return { success: false, error: 'Email required' };
  const cleanEmail = updatedUser.email.trim();

  try {
    const res = await fetch('/api/auth/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.success && data.user) {
      updatedUser = { ...updatedUser, ...data.user };
    }
  } catch (e) {
    console.warn('Backend not reachable for profile update, using local fallback:', e);
  }

  const users = getDbUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === cleanEmail.toLowerCase());
  if (userIndex !== -1) {
    updatedUser.password = users[userIndex].password;
    users[userIndex] = updatedUser;
    saveDbUsers(users);
  } else {
    users.push(updatedUser);
    saveDbUsers(users);
  }
  sessionStorage.setItem('ai_user', JSON.stringify(updatedUser));
  return { success: true, user: updatedUser };
}

function doLogout() {
  sessionStorage.removeItem('ai_user');
  window.location.href = 'index.html';
}

function populateSidebar(activePage) {
  const user = getUser();
  if (!user) return;
  const nameEl = document.getElementById('sidebar-user-name');
  const emailEl = document.getElementById('sidebar-user-email');
  const avatarEl = document.getElementById('sidebar-avatar');
  if (nameEl) nameEl.textContent = user.name;
  if (emailEl) emailEl.textContent = user.email;
  if (avatarEl) avatarEl.textContent = user.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.page === activePage);
  });
  // Mobile hamburger
  const ham = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (ham && sidebar) {
    ham.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      if (backdrop) backdrop.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
    });
    if (backdrop) backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.style.display = 'none';
    });
  }

  // Handle sidebar to-dos
  const todos = JSON.parse(localStorage.getItem('ai_sidebar_todos') || '{}');
  document.querySelectorAll('.todo-cb').forEach(cb => {
    cb.checked = !!todos[cb.dataset.id];
    cb.addEventListener('change', (e) => {
      todos[e.target.dataset.id] = e.target.checked;
      localStorage.setItem('ai_sidebar_todos', JSON.stringify(todos));
    });
  });
}

// ============================================================
// INTERVIEW UTILITIES
// ============================================================

function getInterviewConfig() {
  const raw = sessionStorage.getItem('ai_interview_config');
  return raw ? JSON.parse(raw) : null;
}

function setInterviewConfig(config) {
  sessionStorage.setItem('ai_interview_config', JSON.stringify(config));
}

function getInterviewSession() {
  const raw = sessionStorage.getItem('ai_interview_session');
  return raw ? JSON.parse(raw) : null;
}

function setInterviewSession(session) {
  sessionStorage.setItem('ai_interview_session', JSON.stringify(session));
}

function clearInterviewSession() {
  sessionStorage.removeItem('ai_interview_config');
  sessionStorage.removeItem('ai_interview_session');
}

async function generateQuestions(role, difficulty, count) {
  try {
    const res = await fetch('/api/generate-questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, difficulty, count })
    });
    if (!res.ok) throw new Error('Failed to fetch questions');
    return await res.json();
  } catch (e) {
    console.error('AI question generation failed, using fallback bank.', e);
    // Fallback to static bank if AI fails
    if (typeof MCQ_BANK === 'undefined') return [];
    const bank = (MCQ_BANK[role] && MCQ_BANK[role][difficulty]) ||
                 (MCQ_BANK[role] && MCQ_BANK[role]['Beginner']) ||
                 MCQ_BANK['Software Engineer']['Beginner'];
    const shuffled = [...bank].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }
}

function evaluateAnswer(question, selectedIndex) {
  if (selectedIndex === null || selectedIndex === undefined || selectedIndex === -1 || selectedIndex === '') {
    return {
      score: 0,
      matchedKeywords: [],
      allKeywords: [],
      suggestion: 'No answer selected. ' + (question.exp || ''),
      grade: 'F'
    };
  }
  const isCorrect = parseInt(selectedIndex) === question.correctIndex;
  if (isCorrect) {
    return {
      score: 100,
      matchedKeywords: [],
      allKeywords: [],
      suggestion: 'Correct! ' + (question.exp || ''),
      grade: 'A'
    };
  } else {
    return {
      score: 0,
      matchedKeywords: [],
      allKeywords: [],
      suggestion: 'Incorrect. ' + (question.exp || ''),
      grade: 'F'
    };
  }
}

function getScoreColor(score) {
  if (score >= 85) return '#16a34a';
  if (score >= 70) return '#2563eb';
  if (score >= 55) return '#f59e0b';
  if (score >= 40) return '#f97316';
  return '#dc2626';
}

function getScoreBadgeClass(score) {
  if (score >= 85) return 'badge-green';
  if (score >= 70) return 'badge-blue';
  if (score >= 55) return 'badge-orange';
  return 'badge-red';
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
}

function formatRelativeDate(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return formatDate(dateStr);
}

function getHistory() {
  const raw = localStorage.getItem('ai_interview_history');
  if (raw) return JSON.parse(raw);
  const h = _genHistory();
  localStorage.setItem('ai_interview_history', JSON.stringify(h));
  return h;
}

function saveHistory(history) {
  localStorage.setItem('ai_interview_history', JSON.stringify(history));
}

function addInterviewToHistory(data) {
  const history = getHistory();
  history.unshift(data);
  saveHistory(history);
}

function getInterviewById(id) {
  return getHistory().find(h => h.id === id) || null;
}

// Generate unique ID
function genId() {
  return 'i' + Date.now() + Math.random().toString(36).slice(2,6);
}

// ============================================================
// FLOATING TO-DO WIDGET
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  if (!document.body) return;

  const todoHtml = `
    <div id="floating-todo-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999; font-family: inherit;">
      <button id="ft-toggle-btn" style="background: var(--primary); color: white; border: none; border-radius: 50%; width: 56px; height: 56px; font-size: 24px; cursor: pointer; box-shadow: 0 4px 12px rgba(30,58,138,0.3); display: flex; align-items: center; justify-content: center; transition: transform 0.2s;">
        📝
      </button>
      <div id="ft-panel" style="display: none; position: absolute; bottom: 70px; right: 0; width: 300px; background: white; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); overflow: hidden; border: 1px solid var(--card-border); flex-direction: column;">
        <div style="background: var(--primary); color: white; padding: 16px; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
          <span>My To-Do List</span>
          <button id="ft-close-btn" style="background: transparent; border: none; color: white; cursor: pointer; font-size: 16px;">✖</button>
        </div>
        <div id="ft-list" style="padding: 16px; max-height: 250px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px;">
          <!-- Items will be injected here -->
        </div>
        <div style="padding: 16px; border-top: 1px solid var(--card-border); display: flex; gap: 8px;">
          <input type="text" id="ft-input" placeholder="Add a task..." style="flex: 1; padding: 8px 12px; border: 1.5px solid var(--card-border); border-radius: 8px; font-size: 13px; outline: none;">
          <button id="ft-add-btn" style="background: var(--primary); color: white; border: none; border-radius: 8px; padding: 0 12px; cursor: pointer; font-weight: 700;">+</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', todoHtml);

  const toggleBtn = document.getElementById('ft-toggle-btn');
  const panel = document.getElementById('ft-panel');
  const closeBtn = document.getElementById('ft-close-btn');
  const addBtn = document.getElementById('ft-add-btn');
  const input = document.getElementById('ft-input');
  const list = document.getElementById('ft-list');

  let customTodos = JSON.parse(localStorage.getItem('ai_custom_todos') || '[]');

  function renderCustomTodos() {
    list.innerHTML = '';
    if (customTodos.length === 0) {
      list.innerHTML = '<div style="font-size:12px; color:var(--text-muted); text-align:center;">No tasks yet.</div>';
    }
    customTodos.forEach((t, i) => {
      const item = document.createElement('label');
      item.style.cssText = 'display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--text-dark); cursor: pointer; line-height: 1.4;';
      item.innerHTML = `
        <input type="checkbox" data-index="${i}" ${t.done ? 'checked' : ''} style="margin-top:2px; accent-color: var(--primary); cursor:pointer;">
        <span style="flex:1; ${t.done ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${t.text}</span>
        <span class="ft-del" data-index="${i}" style="color: #ef4444; cursor: pointer; font-size: 12px;">🗑</span>
      `;
      list.appendChild(item);
    });
  }

  toggleBtn.addEventListener('click', () => {
    panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
    if (panel.style.display === 'flex') input.focus();
  });

  closeBtn.addEventListener('click', () => panel.style.display = 'none');

  function addTodo() {
    const val = input.value.trim();
    if (val) {
      customTodos.push({ text: val, done: false });
      localStorage.setItem('ai_custom_todos', JSON.stringify(customTodos));
      input.value = '';
      renderCustomTodos();
    }
  }

  addBtn.addEventListener('click', addTodo);
  input.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTodo(); });

  list.addEventListener('change', (e) => {
    if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
      const idx = e.target.dataset.index;
      customTodos[idx].done = e.target.checked;
      localStorage.setItem('ai_custom_todos', JSON.stringify(customTodos));
      renderCustomTodos();
    }
  });

  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('ft-del')) {
      const idx = e.target.dataset.index;
      customTodos.splice(idx, 1);
      localStorage.setItem('ai_custom_todos', JSON.stringify(customTodos));
      renderCustomTodos();
    }
  });

  renderCustomTodos();
});
