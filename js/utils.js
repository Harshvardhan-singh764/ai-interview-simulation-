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
  { id: 'aptitude-reasoning', name: 'Aptitude & Reasoning', emoji: '🧠' }
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
  },
  'Aptitude & Reasoning': {
    Beginner: [
      { id:'ap_b1', q:'If a train travels 60 km/h, how far will it travel in 45 minutes?', keywords:['45', 'km', 'distance', 'speed', 'time', 'formula', 'multiply'], isAptitude: true, coreKeywords: ['45'] },
      { id:'ap_b2', q:'What is the next number in the series: 2, 4, 8, 16, ...?', keywords:['32', 'multiply', 'double', 'pattern', 'power', 'series'], isAptitude: true, coreKeywords: ['32'] },
      { id:'ap_b3', q:'If 5 workers can build a wall in 10 days, how many days will it take 10 workers?', keywords:['5', 'days', 'inverse', 'proportion', 'man-days', 'work'], isAptitude: true, coreKeywords: ['5'] },
      { id:'ap_b4', q:'Solve: 15% of 200.', keywords:['30', 'percentage', 'multiply', 'divide', 'fraction'], isAptitude: true, coreKeywords: ['30'] }
    ],
    Intermediate: [
      { id:'ap_m1', q:'A sum of money doubles itself in 5 years at simple interest. What is the rate of interest?', keywords:['20%', '20', 'simple interest', 'principal', 'rate', 'formula', 'time'], isAptitude: true, coreKeywords: ['20', '20%'] },
      { id:'ap_m2', q:'In a row of 40 children, P is 13th from the left and Q is 9th from the right. How many children are between P and Q?', keywords:['18', 'subtract', 'total', 'position', 'between', 'rank'], isAptitude: true, coreKeywords: ['18'] },
      { id:'ap_m3', q:'Pointing to a photograph, a man says, "She is the only daughter of my wife\'s mother-in-law." How is the woman related to the man?', keywords:['sister', 'wife', 'mother-in-law', 'daughter', 'blood relation', 'family tree'], isAptitude: true, coreKeywords: ['sister'] }
    ],
    Advanced: [
      { id:'ap_a1', q:'Two pipes A and B can fill a tank in 20 and 30 minutes respectively. If both are opened together, how much time will it take to fill the tank?', keywords:['12', 'minutes', 'work', 'efficiency', 'fraction', 'LCM', 'capacity'], isAptitude: true, coreKeywords: ['12'] },
      { id:'ap_a2', q:'In how many ways can the letters of the word "APPLE" be arranged?', keywords:['60', 'permutation', 'factorial', 'repeat', 'arrangement', 'divide'], isAptitude: true, coreKeywords: ['60'] },
      { id:'ap_a3', q:'Find the probability of getting a sum of 9 when two dice are thrown simultaneously.', keywords:['1/9', '4/36', 'probability', 'favorable', 'outcomes', 'total', 'sample space'], isAptitude: true, coreKeywords: ['1/9', '4/36'] }
    ]
  }
};

const DIFFICULTY_TIMERS = { Beginner: 120, Intermediate: 90, Advanced: 60 };

// ============================================================
// MOCK HISTORY GENERATOR
// ============================================================

function _generateMockFeedback(role, difficulty, count, overallScore) {
  const roleBank = QUESTION_BANK[role];
  const diffBank = roleBank ? (roleBank[difficulty] || roleBank['Beginner']) : QUESTION_BANK['Software Engineer']['Beginner'];
  const feedbacks = [];
  for (let i = 0; i < count; i++) {
    const q = diffBank[i % diffBank.length];
    const qScore = Math.min(100, Math.max(20, overallScore + Math.round((Math.random() - 0.5) * 30)));
    const matched = q ? q.keywords.slice(0, Math.floor(Math.random() * q.keywords.length)) : [];
    feedbacks.push({
      question: q ? q.q : `Question ${i+1} for ${role}`,
      answer: 'The candidate provided a structured response covering the main concepts with some specific examples.',
      score: qScore,
      keywords: q ? q.keywords : [],
      matchedKeywords: matched,
      grade: qScore >= 85 ? 'A' : qScore >= 70 ? 'B' : qScore >= 55 ? 'C' : qScore >= 40 ? 'D' : 'F',
      suggestion: qScore >= 70 ? 'Good answer! Consider adding more real-world examples.' : 'Review the core concepts and practice structured answers.'
    });
  }
  return feedbacks;
}

function _genHistory() {
  const roles = ['Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'DevOps Engineer', 'Aptitude & Reasoning'];
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

function getUser() {
  const raw = sessionStorage.getItem('ai_user');
  return raw ? JSON.parse(raw) : null;
}

function requireAuth() {
  const user = getUser();
  if (!user) { window.location.href = 'index.html'; return null; }
  return user;
}

function doLogin(email, password) {
  if (!email.trim() || !password.trim()) return { success: false, error: 'Please enter your email and password.' };
  if (password.length < 4) return { success: false, error: 'Password must be at least 4 characters.' };
  const user = { ...MOCK_USER, email: email.trim() };
  sessionStorage.setItem('ai_user', JSON.stringify(user));
  return { success: true };
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

function generateQuestions(role, difficulty, count) {
  const bank = (QUESTION_BANK[role] && QUESTION_BANK[role][difficulty]) ||
               (QUESTION_BANK[role] && QUESTION_BANK[role]['Beginner']) ||
               QUESTION_BANK['Software Engineer']['Beginner'];
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function evaluateAnswer(question, answer) {
  const trimmed = (answer || '').trim();
  if (trimmed.length < 5 && !question.isAptitude) {
    return {
      score: Math.floor(Math.random() * 15 + 5),
      matchedKeywords: [],
      allKeywords: question.keywords,
      suggestion: 'Your answer was too short. Elaborate on the key concepts with specific examples and detail.',
      grade: 'F'
    };
  }
  const lc = trimmed.toLowerCase();
  
  if (question.isAptitude) {
    // Thorough aptitude grading
    const matchedKeywords = question.keywords.filter(kw => lc.includes(kw.toLowerCase()));
    const hasCore = question.coreKeywords.some(kw => lc.includes(kw.toLowerCase()));
    
    let totalScore = 0;
    let grade, suggestion;
    
    if (hasCore) {
      // Base score for right answer
      totalScore = 60 + (matchedKeywords.length / question.keywords.length) * 40;
    } else {
      // Right answer missing, score based purely on keywords (steps) but capped low
      totalScore = (matchedKeywords.length / question.keywords.length) * 40;
    }
    
    totalScore = Math.min(Math.max(Math.round(totalScore), 5), 100);
    const missed = question.keywords.filter(k => !matchedKeywords.includes(k)).slice(0, 3);
    
    if (totalScore >= 85) { grade = 'A'; suggestion = 'Excellent reasoning! You correctly identified the answer and explained your steps well.'; }
    else if (totalScore >= 70) { grade = 'B'; suggestion = `Good job. You got the core answer, but mentioning concepts like ${missed.join(', ')} would show better logical structuring.`; }
    else if (totalScore >= 50) { grade = 'C'; suggestion = `You missed some critical steps. Focus more on clearly explaining: ${missed.join(', ')}.`; }
    else { grade = 'F'; suggestion = 'Your answer is missing the correct numerical or logical conclusion. Please double-check your calculations or logical steps.'; }
    
    return { score: totalScore, matchedKeywords, allKeywords: question.keywords, suggestion, grade };
  }

  // Normal grading for other roles
  const matchedKeywords = question.keywords.filter(kw => lc.includes(kw.toLowerCase()));
  const keywordScore = (matchedKeywords.length / Math.max(question.keywords.length, 1)) * 55;
  const lengthScore = Math.min(trimmed.length / 600 * 28, 28);
  const baseScore = 12;
  const noise = Math.round((Math.random() - 0.5) * 8);
  const totalScore = Math.min(Math.max(Math.round(baseScore + keywordScore + lengthScore + noise), 5), 100);
  let grade, suggestion;
  const missed = question.keywords.filter(k => !matchedKeywords.includes(k)).slice(0, 3);
  if (totalScore >= 85) { grade = 'A'; suggestion = 'Excellent! You covered the key concepts thoroughly. Adding real-world examples would make it even stronger.'; }
  else if (totalScore >= 70) { grade = 'B'; suggestion = `Good answer! Consider mentioning: ${missed.join(', ')} for a complete response.`; }
  else if (totalScore >= 55) { grade = 'C'; suggestion = `Decent attempt. Focus more on: ${missed.join(', ')}. Structure your answer with clear, logical points.`; }
  else if (totalScore >= 40) { grade = 'D'; suggestion = 'Your answer needs improvement. Review core concepts and practice giving structured, detailed explanations.'; }
  else { grade = 'F'; suggestion = 'This topic needs significant study. Review the fundamentals and practice with detailed, structured answers.'; }
  return { score: totalScore, matchedKeywords, allKeywords: question.keywords, suggestion, grade };
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
