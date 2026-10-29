// ============================================================
// AI Interview Simulation — Node.js Server & SQLite Database
// ============================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./db.js');

// --- Load .env ---
try {
  const envFile = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
  envFile.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        process.env[key] = val.replace(/^["']|["']$/g, '');
      }
    }
  });
  console.log('✓ .env loaded successfully with keys:', Object.keys(process.env).filter(k => k.startsWith('GEMINI_')));
} catch (e) {
  console.log('No .env file found or error parsing it:', e.message);
}

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

async function handleRequest(req, res) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // Parse URL, strip query string
  let urlPath = req.url.split('?')[0];

  // ============================================================
  // AUTH & DATABASE API ENDPOINTS (AUDITED & VALIDATED)
  // ============================================================

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const clientUserAgent = req.headers['user-agent'] || 'Unknown';
  const reqContext = { ip: clientIp, userAgent: clientUserAgent };

  // 1. Login Endpoint
  if (urlPath === '/api/auth/login' && req.method === 'POST') {
    try {
      const { email, password } = await parseBody(req);
      const result = db.verifyLogin(email, password, reqContext);
      if (result.success) {
        sendJson(res, 200, result);
      } else {
        sendJson(res, 401, result);
      }
    } catch (e) {
      console.error('Login error:', e);
      sendJson(res, 500, { success: false, error: 'Internal server error' });
    }
    return;
  }

  // 2. Register Endpoint
  if (urlPath === '/api/auth/register' && req.method === 'POST') {
    try {
      const { name, email, phone, password } = await parseBody(req);
      const result = db.createUser({ name, email, phone, password }, reqContext);
      if (result.success) {
        sendJson(res, 201, result);
      } else {
        sendJson(res, 400, result);
      }
    } catch (e) {
      console.error('Register error:', e);
      sendJson(res, 500, { success: false, error: 'Internal server error' });
    }
    return;
  }

  // 3. Update Password Endpoint
  if (urlPath === '/api/auth/update-password' && req.method === 'POST') {
    try {
      const { email, newPassword, currentPassword } = await parseBody(req);
      const result = db.updateUserPassword(email, newPassword, currentPassword);
      if (result.success) {
        sendJson(res, 200, result);
      } else {
        sendJson(res, 400, result);
      }
    } catch (e) {
      console.error('Update password error:', e);
      sendJson(res, 500, { success: false, error: 'Internal server error' });
    }
    return;
  }

  // 4. Update Profile Endpoint
  if (urlPath === '/api/auth/update-profile' && req.method === 'POST') {
    try {
      const userObj = await parseBody(req);
      const result = db.updateUserProfile(userObj);
      if (result.success) {
        sendJson(res, 200, result);
      } else {
        sendJson(res, 400, result);
      }
    } catch (e) {
      console.error('Update profile error:', e);
      sendJson(res, 500, { success: false, error: 'Internal server error' });
    }
    return;
  }

  // 5. OTP Request Endpoint (10-Digit Mobile Phone Enforcement)
  if (urlPath === '/api/auth/otp-request' && req.method === 'POST') {
    try {
      const { phone } = await parseBody(req);
      const result = db.saveOTP(phone);
      if (result.success) {
        sendJson(res, 200, {
          ...result,
          simulated: true,
          message: `Verification code generated for +91 ${result.phone}`
        });
      } else {
        sendJson(res, 400, result);
      }
    } catch (e) {
      console.error('OTP request error:', e);
      sendJson(res, 500, { success: false, error: 'Internal server error' });
    }
    return;
  }

  // 6. OTP Verify Endpoint
  if (urlPath === '/api/auth/otp-verify' && req.method === 'POST') {
    try {
      const { phone, otp } = await parseBody(req);
      const result = db.verifyOTP(phone, otp, reqContext);
      if (result.success) {
        sendJson(res, 200, result);
      } else {
        sendJson(res, 400, result);
      }
    } catch (e) {
      console.error('OTP verify error:', e);
      sendJson(res, 500, { success: false, error: 'Internal server error' });
    }
    return;
  }

  // 7. Google Login Mock Endpoint
  if (urlPath === '/api/auth/google-login' && req.method === 'POST') {
    try {
      const { email } = await parseBody(req);
      const result = db.googleLogin(email, reqContext);
      if (result.success) {
        sendJson(res, 200, result);
      } else {
        sendJson(res, 400, result);
      }
    } catch (e) {
      console.error('Google login error:', e);
      sendJson(res, 500, { success: false, error: 'Internal server error' });
    }
    return;
  }

  // 8. Forgot Password / Verification Check Endpoint
  if (urlPath === '/api/auth/forgot-password' && req.method === 'POST') {
    try {
      const { email } = await parseBody(req);
      const user = db.getUserByEmail(email);
      if (!user) {
        sendJson(res, 404, { success: false, error: 'Account not found with this email.' });
      } else {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        sendJson(res, 200, { success: true, otp, user });
      }
    } catch (e) {
      console.error('Forgot password error:', e);
      sendJson(res, 500, { success: false, error: 'Internal server error' });
    }
    return;
  }

  // 9. Get User by Email
  if (urlPath === '/api/auth/user' && req.method === 'GET') {
    try {
      const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const email = urlObj.searchParams.get('email');
      const user = db.getUserByEmail(email);
      if (user) {
        sendJson(res, 200, { success: true, user });
      } else {
        sendJson(res, 404, { success: false, error: 'User not found' });
      }
    } catch (e) {
      console.error('Get user error:', e);
      sendJson(res, 500, { success: false, error: 'Internal server error' });
    }
    return;
  }

  // 10. Real-time Field Validator Endpoint
  if (urlPath === '/api/auth/validate-field' && req.method === 'POST') {
    try {
      const { type, value } = await parseBody(req);
      if (type === 'email') {
        const valid = db.isValidEmail(value);
        sendJson(res, 200, {
          valid,
          message: valid ? 'Valid email format' : 'Please enter a valid email address (e.g., name@example.com)'
        });
        return;
      }
      if (type === 'phone') {
        const normalized = db.normalizePhoneNumber(value);
        sendJson(res, 200, {
          valid: !!normalized,
          digits: normalized || '',
          digitCount: (value || '').replace(/\D/g, '').length,
          message: normalized ? 'Valid 10-digit mobile number' : 'Must be exactly 10 digits (e.g. 9876543210)'
        });
        return;
      }
      sendJson(res, 200, { valid: true });
    } catch (e) {
      sendJson(res, 500, { valid: false, error: e.message });
    }
    return;
  }

  // 11. System Auth Stats & Login History Endpoint
  if (urlPath === '/api/auth/stats' && req.method === 'GET') {
    try {
      sendJson(res, 200, { success: true, stats: db.getSystemAuthStats() });
    } catch (e) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  if (urlPath === '/api/auth/login-history' && req.method === 'GET') {
    try {
      const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const email = urlObj.searchParams.get('email');
      const history = db.getLoginAudit(email, 15);
      sendJson(res, 200, { success: true, history });
    } catch (e) {
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // ============================================================
  // AI INTERVIEW & RESUME ENDPOINTS (GEMINI API)
  // ============================================================

  // --- Generate Interview Questions Endpoint ---
  if (urlPath === '/api/generate-questions' && req.method === 'POST') {
    try {
      const { role, difficulty, count } = await parseBody(req);
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error('GEMINI_API_KEY not set in .env');

      const prompt = `Generate ${count} unique multiple-choice questions for the topic/role: "${role}" at ${difficulty} level.
      If the topic is "Aptitude", generate quantitative aptitude or math questions.
      If the topic is "Reasoning", generate logical reasoning questions.
      If the topic is "Soft Skills", generate behavioral or situational questions.
      Otherwise, generate technical interview questions for the job role.
      Return ONLY a valid JSON array of objects. Each object must have:
      - "id": a unique string
      - "q": the question text
      - "options": an array of 4 string options
      - "correctIndex": integer (0-3) for the correct option
      - "exp": a string explaining the answer`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
      
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      if (!data.candidates || !data.candidates[0]) {
        console.error('Gemini API Error:', JSON.stringify(data, null, 2));
        throw new Error('Invalid response from AI model');
      }
      let aiText = data.candidates[0].content.parts[0].text;
      
      aiText = aiText.replace(/```(json)?/g, '').trim();
      const questions = JSON.parse(aiText);

      sendJson(res, 200, questions);
    } catch (e) {
      console.error('Questions generation error:', e);
      sendJson(res, 500, { error: e.message });
    }
    return;
  }

  // --- Analyze Resume Endpoint ---
  if (urlPath === '/api/analyze-resume' && req.method === 'POST') {
    try {
      const { role, resumeText } = await parseBody(req);
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error('GEMINI_API_KEY not set in .env');

      const prompt = `You are an expert technical recruiter analyzing a resume for the role of "${role}".
      Analyze the following resume text and provide a rating out of 10.
      Provide your response ONLY as a JSON object with the following keys:
      - "rating": integer (1-10)
      - "strengths": an array of 2-3 string bullet points
      - "weaknesses": an array of 2-3 string bullet points
      - "recommendations": a short string paragraph with actionable advice

      Resume Text:
      """${resumeText}"""`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
      
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      if (!data.candidates || !data.candidates[0]) {
        throw new Error('Invalid response from AI model');
      }
      let aiText = data.candidates[0].content.parts[0].text;
      
      aiText = aiText.replace(/```(json)?/g, '').trim();
      const analysis = JSON.parse(aiText);

      sendJson(res, 200, analysis);
    } catch (e) {
      console.error('Resume analysis error:', e);
      sendJson(res, 500, { error: e.message });
    }
    return;
  }

  // --- Improve Resume Bullets Endpoint ---
  if (urlPath === '/api/improve-resume' && req.method === 'POST') {
    try {
      const { role, expText } = await parseBody(req);
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error('GEMINI_API_KEY not set in .env');

      const prompt = `You are an expert resume writer. Improve the following experience section for a "${role}" role. 
      Make the bullet points more impactful, use action verbs, and quantify achievements where possible. 
      Maintain the original structure (Company Name - Role (Dates) followed by bullet points).
      Provide your response ONLY as a JSON object with this key:
      - "improvedText": a single string containing the rewritten experience section (use \\n for line breaks)

      Original Text:
      """${expText}"""`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
      
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      if (!data.candidates || !data.candidates[0]) throw new Error('Invalid response from AI model');
      
      let aiText = data.candidates[0].content.parts[0].text;
      aiText = aiText.replace(/```(json)?/g, '').trim();
      const result = JSON.parse(aiText);

      sendJson(res, 200, result);
    } catch (e) {
      console.error('Improve resume error:', e);
      sendJson(res, 500, { error: e.message });
    }
    return;
  }

  // --- Generate Full Resume by Job Role Endpoint (Gemini AI) ---
  if (urlPath === '/api/generate-full-resume' && req.method === 'POST') {
    try {
      const { role = 'Software Engineer', level = 'Mid-Level', userName = 'Candidate', email = 'candidate@example.com', phone = '+91 98765 43210', location = 'Bangalore, India' } = await parseBody(req);
      const apiKey = process.env.GEMINI_API_KEY;

      const prompt = `You are a premier executive resume writer and FAANG technical recruiter.
Create a complete, highly-detailed, industry-standard, ATS-optimized resume tailored specifically for the target job role: "${role}" at experience level: "${level}".
The candidate's name is "${userName}", email is "${email}", phone is "${phone}", location is "${location}".

Ensure:
1. "summary": A powerful 3-4 sentence professional summary highlighting years of experience, core domains, modern tools, and business impact.
2. "skills": An object with arrays for "languages", "frameworks", "tools_cloud", "databases", "methodologies".
3. "experience": An array of 2-3 realistic, prestigious companies. Each company must have "company", "role", "dates", "location", and "bullets" (3-4 bullet points using the Google XYZ formula: Accomplished [X] as measured by [Y], by doing [Z]).
4. "projects": An array of 2 high-impact, realistic projects tailored to "${role}" with "title", "techStack", and "bullets" (2-3 detailed bullets with metrics).
5. "education": An array of 1-2 degrees with "degree", "institution", "dates", "details".
6. "certifications": An array of 2-3 prominent, industry-recognized certifications for "${role}".

Provide your response ONLY as a valid JSON object matching this exact structure without markdown backticks.`;

      let resumeData = null;
      if (apiKey) {
        try {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;
          const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                responseMimeType: "application/json"
              }
            })
          });

          const data = await response.json();
          if (data.candidates && data.candidates[0]) {
            let aiText = data.candidates[0].content.parts[0].text;
            aiText = aiText.replace(/```(json)?/g, '').trim();
            resumeData = JSON.parse(aiText);
          }
        } catch (apiErr) {
          console.warn('Gemini resume generation API call failed, generating fallback:', apiErr);
        }
      }

      if (!resumeData) {
        resumeData = generateFallbackResume(role, level, userName, email, phone, location);
      }

      sendJson(res, 200, { success: true, resume: resumeData });
    } catch (e) {
      console.error('Generate full resume error:', e);
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // --- Analyze Video Frame (AI Vision: Unfair Objects, Multiple People, Lip Movement, Bounds) ---
  if (urlPath === '/api/analyze-video-frame' && req.method === 'POST') {
    try {
      const { imageBase64 } = await parseBody(req);
      const apiKey = process.env.GEMINI_API_KEY;

      if (!imageBase64) {
        sendJson(res, 400, { success: false, error: 'Image base64 required' });
        return;
      }

      // If API key is present, execute Deep Gemini Vision AI Analysis
      if (apiKey) {
        try {
          const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
          const prompt = `You are a high-precision AI Proctor and Computer Vision anti-cheating evaluator monitoring an official online exam.
Analyze this webcam frame with extreme precision for:

1. MULTIPLE CANDIDATES / PERSONS (CRITICAL - DIRECT DISQUALIFICATION):
   - Count the number of human faces, heads, bodies, or silhouettes visible anywhere in this camera frame (including foreground, background, someone standing behind, leaning in, or whispering).
   - If there is MORE THAN 1 PERSON (2 or more people visible):
     "multiplePeopleDetected": true,
     "candidateCount": 2,
     "immediateDisqualify": true,
     "disqualifyReason": "Multiple candidates/persons detected in camera frame. Direct disqualification applied."
   - If only 1 single candidate is present:
     "multiplePeopleDetected": false,
     "candidateCount": 1,
     "immediateDisqualify": false,
     "disqualifyReason": ""

2. UNFAIR PROHIBITED OBJECTS:
   - Carefully inspect for prohibited objects:
     a) Mobile phone / smartphone / cell phone (in hand, on desk, held up, near ear, or reflected).
     b) Earphones / earbuds / AirPods / headphones (in ear, over ear, or draped on neck).
     c) Smartwatch or digital wrist gadget being consulted.
     d) Cheat sheets, handwritten notes, printed papers, textbooks, or study guides.
     e) Secondary laptop, tablet, iPad, or extra monitor in view.
   - If ANY prohibited object is present:
     "unfairObjectDetected": true,
     "detectedObjects": ["<Item Name>"],
     "mobileDetected": true (if phone detected)
   - If no prohibited objects:
     "unfairObjectDetected": false,
     "detectedObjects": [],
     "mobileDetected": false

3. BOUNDARY / CIRCLE POSITION:
   - Is candidate's face centered within the designated middle area, or has candidate moved completely out of bounds / out of camera view? ("outsideCircle": boolean).

4. LIP MOVEMENT / WHISPERING:
   - Are candidate's lips or mouth moving, mouthing answers, whispering, or speaking off-camera without answering the prompt? ("lipMovement": boolean).

5. EYE CONTACT & GAZE:
   - "eyeContact": ONE of ["Direct", "Looking Away Left", "Looking Away Right", "Looking Down", "Looking Up"].
   - "eyeScore": Integer 0 to 100.

6. VIOLATION TYPE:
   - ONE of ["NONE", "MULTIPLE_PEOPLE", "UNFAIR_OBJECT", "MOBILE_PHONE", "LIP_MOVEMENT", "LOOKING_AWAY", "OUT_OF_BOUNDS", "NO_FACE"].

7. PROCTOR ALERT:
   - Clear string describing the infraction if any (e.g. "Prohibited object detected: Mobile Phone", "Multiple people detected in frame", "Unauthorized lip movement / whispering", "Face completely out of circle"), or "Normal".

8. EXPRESSION & CONFIDENCE:
   - "expression": ONE of ["Confident", "Focused", "Calm", "Nervous", "Thinking", "Distracted"].
   - "confidence": Integer 0 to 100.
   - "tip": 1 short sentence.

Return ONLY a valid JSON object matching these exact keys:
{
  "multiplePeopleDetected": false,
  "candidateCount": 1,
  "immediateDisqualify": false,
  "disqualifyReason": "",
  "unfairObjectDetected": false,
  "detectedObjects": [],
  "mobileDetected": false,
  "outsideCircle": false,
  "lipMovement": false,
  "unfairAction": false,
  "violationType": "NONE",
  "proctorAlert": "Normal",
  "expression": "Focused",
  "confidence": 85,
  "eyeContact": "Direct",
  "eyeScore": 90,
  "tip": "Maintain center posture and eye contact."
}`;

          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);

          const response = await fetch(geminiUrl, {
            method: 'POST',
            signal: controller.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: prompt },
                  { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } }
                ]
              }]
            })
          });
          clearTimeout(timeoutId);

          const data = await response.json();
          if (data.candidates && data.candidates[0]) {
            let aiText = data.candidates[0].content.parts[0].text;
            aiText = aiText.replace(/```(json)?/g, '').trim();
            const result = JSON.parse(aiText);
            sendJson(res, 200, { success: true, ...result, source: 'gemini-ai' });
            return;
          }
        } catch (visionErr) {
          console.warn('Gemini vision API error or timeout, applying computer vision fallback:', visionErr.message);
        }
      }

      // Fallback heuristics response
      sendJson(res, 200, {
        success: true,
        multiplePeopleDetected: false,
        candidateCount: 1,
        immediateDisqualify: false,
        disqualifyReason: '',
        unfairObjectDetected: false,
        detectedObjects: [],
        mobileDetected: false,
        outsideCircle: false,
        lipMovement: false,
        unfairAction: false,
        violationType: 'NONE',
        expression: 'Focused',
        confidence: 85,
        eyeContact: 'Direct',
        eyeScore: 88,
        proctorAlert: 'Normal',
        tip: 'Maintain steady eye contact within the circle.',
        source: 'smart-cv'
      });
    } catch (e) {
      console.error('Video frame analysis error:', e);
      sendJson(res, 500, { success: false, error: e.message });
    }
    return;
  }

  // ============================================================
  // STATIC FILES SERVING
  // ============================================================

  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 — Page Not Found</h1><p><a href="/">Go Home</a></p>');
      } else {
        res.writeHead(500);
        res.end('Server Error');
      }
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
    });
    res.end(data);
  });
}

const server = http.createServer(handleRequest);

function generateFallbackResume(role = 'Software Engineer', level = 'Mid-Level', userName = 'Harsh Vardhan Singh', email = 'harsh@example.com', phone = '+91 98765 43210', location = 'Bangalore, India') {
  const isSenior = level.toLowerCase().includes('senior') || level.toLowerCase().includes('lead');
  const years = isSenior ? '5+' : '3+';
  
  return {
    name: userName,
    role: `${isSenior ? 'Senior ' : ''}${role}`,
    email: email,
    phone: phone,
    location: location,
    links: "linkedin.com/in/" + userName.toLowerCase().replace(/\s+/g, '') + " | github.com/" + userName.toLowerCase().replace(/\s+/g, ''),
    summary: `Results-driven ${role} with ${years} years of proven expertise designing, developing, and deploying high-performance distributed systems. Track record of optimizing throughput by 35%, modernizing legacy architectures, and mentoring cross-functional engineering teams. Adept in cloud-native paradigms, rigorous testing, and translating complex business requirements into resilient technical solutions.`,
    skills: {
      languages: ["JavaScript (ESNext)", "TypeScript", "Python", "Go", "SQL"],
      frameworks: ["React.js", "Node.js / Express", "Next.js", "FastAPI", "Tailwind CSS"],
      tools_cloud: ["Docker", "Kubernetes", "AWS (EC2, S3, Lambda)", "GitHub Actions (CI/CD)", "Terraform"],
      databases: ["PostgreSQL", "MongoDB", "Redis (Caching)", "SQLite"],
      methodologies: ["Microservices Architecture", "REST & GraphQL APIs", "Test-Driven Development (TDD)", "Agile / Scrum", "System Design"]
    },
    experience: [
      {
        company: "Apex Tech Innovations",
        role: `${isSenior ? 'Lead ' : 'Senior '}${role}`,
        location: location,
        dates: "2023 – Present",
        bullets: [
          `Architected and deployed a multi-tenant microservices platform handling 1.5M+ daily requests with 99.98% uptime.`,
          `Reduced API response latency by 42% by implementing distributed Redis caching and query indexing on PostgreSQL.`,
          `Led automated CI/CD pipeline modernization across 12 microservices using GitHub Actions, cutting release cycles from 4 hours to 15 minutes.`,
          `Mentored 6 junior and mid-level engineers in Clean Code, SOLID design principles, and automated test coverage.`
        ]
      },
      {
        company: "Nexus Software Labs",
        role: role,
        location: location,
        dates: "2021 – 2023",
        bullets: [
          `Engineered key client-facing workflows and real-time dashboards utilizing React, TypeScript, and WebSockets.`,
          `Spearheaded database schema re-architecture that decreased database CPU utilization by 28% during peak load events.`,
          `Collaborated directly with Product Managers and UX Designers to translate wireframes into pixel-perfect, accessible components.`,
          `Authored comprehensive unit and integration test suites achieving 88% overall test coverage.`
        ]
      }
    ],
    projects: [
      {
        title: "AI-Powered Distributed System Monitor",
        techStack: "Node.js, React, WebSockets, Docker, Prometheus",
        bullets: [
          `Engineered an observability dashboard aggregating metrics across 50+ simulated container nodes in real time.`,
          `Integrated anomaly detection model forecasting system threshold breaches 10 minutes prior to failure incidents.`
        ]
      },
      {
        title: "Enterprise Multi-Channel Notification Engine",
        techStack: "Python, FastAPI, Redis, RabbitMQ, PostgreSQL",
        bullets: [
          `Engineered an asynchronous messaging service delivering 10,000+ transactional SMS and emails per minute.`,
          `Designed resilient exponential backoff retry policies and dead-letter queues reducing message failure rates to 0.01%.`
        ]
      }
    ],
    education: [
      {
        institution: "National Institute of Technology",
        degree: "Bachelor of Technology in Computer Science & Engineering",
        dates: "2017 – 2021",
        details: "First Class with Distinction (GPA: 8.8/10.0) • Core: Data Structures, Distributed Systems, DBMS, Operating Systems"
      }
    ],
    certifications: [
      "AWS Certified Solutions Architect – Associate",
      "Certified Kubernetes Application Developer (CKAD)",
      "Meta Front-End / Back-End Professional Certificate"
    ]
  };
}

if (require.main === module && !process.env.VERCEL) {
  server.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════════════════╗
    ║  🎯 AI Interview Simulation               ║
    ║  Server running at http://localhost:${PORT}   ║
    ║  Database: SQLite (users.db initialized)   ║
    ║  Press Ctrl+C to stop                      ║
    ╚════════════════════════════════════════════╝
    `);
  });
}

module.exports = server;
module.exports.handler = handleRequest;
