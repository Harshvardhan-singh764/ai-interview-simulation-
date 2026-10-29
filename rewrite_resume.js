const fs = require('fs');
let content = fs.readFileSync('resume.html', 'utf8');

const newMain = `  <main class="main-content" style="display:flex; flex-direction:column; height: 100vh;">
    <div class="page-header animate-fade-up" style="flex-shrink:0;">
      <div class="page-title">📄 Advanced Resume Builder</div>
      <div class="page-subtitle">Create, preview, and AI-optimize your resume in real-time.</div>
    </div>

    <div class="setup-grid" style="flex: 1; overflow: hidden; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">

      <!-- LEFT: Editor Form -->
      <div class="card animate-fade-up stagger-1" style="display: flex; flex-direction: column; overflow-y: auto; padding: 20px; height: 100%;">

        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
          <button class="btn btn-primary" onclick="analyzeResume()" id="btn-analyze">✨ AI Analyze</button>
          <button class="btn btn-outline" onclick="improveBullets()" id="btn-improve">🪄 AI Improve</button>
          <button class="btn btn-outline" onclick="window.print()">🖨️ Print / PDF</button>
        </div>

        <div id="ai-feedback" style="display:none; background: rgba(59,130,246,0.1); border: 1px solid var(--primary); border-radius: 8px; padding: 16px; margin-bottom: 20px;">
          <h4 style="margin:0 0 10px 0; color:var(--primary); display:flex; justify-content:space-between;">
            AI Feedback <span id="ai-score" style="font-weight:800;"></span>
          </h4>
          <div id="ai-feedback-content" style="font-size: 13px; line-height: 1.6; color: var(--text-dark);"></div>
        </div>

        <!-- Forms -->
        <h3 style="margin-top:0; font-size:16px; color:var(--text-dark); border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Personal Details</h3>
        <input type="text" id="r-name" placeholder="Full Name" oninput="updatePreview()" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid var(--card-border); border-radius:6px;">
        <div style="display:flex; gap:10px; margin-bottom:10px;">
          <input type="text" id="r-email" placeholder="Email" oninput="updatePreview()" style="flex:1; padding:10px; border:1px solid var(--card-border); border-radius:6px;">
          <input type="text" id="r-phone" placeholder="Phone" oninput="updatePreview()" style="flex:1; padding:10px; border:1px solid var(--card-border); border-radius:6px;">
        </div>
        <input type="text" id="r-links" placeholder="LinkedIn / GitHub / Portfolio" oninput="updatePreview()" style="width:100%; padding:10px; margin-bottom:20px; border:1px solid var(--card-border); border-radius:6px;">

        <h3 style="margin-top:0; font-size:16px; color:var(--text-dark); border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Professional Summary</h3>
        <textarea id="r-summary" placeholder="A brief summary of your background..." oninput="updatePreview()" style="width:100%; height:80px; padding:10px; margin-bottom:20px; border:1px solid var(--card-border); border-radius:6px; font-family:inherit;"></textarea>

        <h3 style="margin-top:0; font-size:16px; color:var(--text-dark); border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Target Job Role</h3>
        <input type="text" id="r-role" placeholder="e.g. Senior Frontend Engineer" oninput="updatePreview()" style="width:100%; padding:10px; margin-bottom:20px; border:1px solid var(--card-border); border-radius:6px;">

        <h3 style="margin-top:0; font-size:16px; color:var(--text-dark); border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Experience</h3>
        <textarea id="r-exp" placeholder="Company Name - Role (Dates)\n- Bullet point 1\n- Bullet point 2" oninput="updatePreview()" style="width:100%; height:150px; padding:10px; margin-bottom:20px; border:1px solid var(--card-border); border-radius:6px; font-family:inherit;"></textarea>

        <h3 style="margin-top:0; font-size:16px; color:var(--text-dark); border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Education</h3>
        <textarea id="r-edu" placeholder="University Name - Degree (Year)" oninput="updatePreview()" style="width:100%; height:80px; padding:10px; margin-bottom:20px; border:1px solid var(--card-border); border-radius:6px; font-family:inherit;"></textarea>

        <h3 style="margin-top:0; font-size:16px; color:var(--text-dark); border-bottom:1px solid #e2e8f0; padding-bottom:8px;">Skills</h3>
        <textarea id="r-skills" placeholder="JavaScript, React, Node.js, Python..." oninput="updatePreview()" style="width:100%; height:80px; padding:10px; margin-bottom:20px; border:1px solid var(--card-border); border-radius:6px; font-family:inherit;"></textarea>
      </div>

      <!-- RIGHT: Live Preview (A4 format) -->
      <div class="animate-fade-up stagger-2" style="display:flex; justify-content:center; overflow-y:auto; padding:20px; background:#e2e8f0; border-radius:12px; height:100%;">
        <div id="resume-preview" class="resume-preview-doc" style="background:white; width: 100%; max-width: 800px; min-height: 1100px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; box-sizing: border-box;">
          <!-- Live Preview Injected Here -->
        </div>
      </div>

    </div>
  </main>`;

content = content.replace(/<main class="main-content">[\s\S]*?<\/main>/, newMain);

const styleStart = content.indexOf('<style>');
if (styleStart !== -1) {
  const customStyles = `
    @media print {
      body * { visibility: hidden; }
      #resume-preview, #resume-preview * { visibility: visible; }
      #resume-preview { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none; padding: 0; }
    }
    .resume-preview-doc h1 { margin:0 0 5px 0; font-size:28px; color:#111; text-transform:uppercase; letter-spacing:1px; }
    .resume-preview-doc .contact { font-size:13px; color:#555; margin-bottom:15px; border-bottom:2px solid #333; padding-bottom:10px; }
    .resume-preview-doc h2 { margin:15px 0 10px 0; font-size:16px; color:#222; text-transform:uppercase; border-bottom:1px solid #ccc; padding-bottom:3px; }
    .resume-preview-doc p { font-size:13px; line-height:1.5; margin:0 0 10px 0; }
    .resume-preview-doc .exp-item { margin-bottom: 12px; }
    .resume-preview-doc .exp-item h4 { margin:0; font-size:14px; color:#111; }
    .resume-preview-doc ul { margin:5px 0 10px 0; padding-left:20px; font-size:13px; line-height:1.5; }
  `;
  content = content.slice(0, styleStart + 7) + customStyles + content.slice(styleStart + 7);
}

const newScripts = `
<script src="js/utils.js"></script>
<script>
  requireAuth();
  populateSidebar('resume');

  function updatePreview() {
    const name = document.getElementById('r-name').value || 'Your Name';
    const email = document.getElementById('r-email').value || 'email@example.com';
    const phone = document.getElementById('r-phone').value || '+1 234 567 890';
    const links = document.getElementById('r-links').value || 'linkedin.com/in/yourprofile';
    const summary = document.getElementById('r-summary').value || 'Experienced professional looking for the next big challenge...';

    // Parse exp (naive split by newline for bullets)
    const expText = document.getElementById('r-exp').value;
    const expLines = expText ? expText.split('\\n') : ['Company - Role (2020-Present)', '- Developed amazing features'];

    let expHTML = '<div class="exp-item">';
    expLines.forEach(line => {
      line = line.trim();
      if (!line) return;
      if (line.startsWith('-')) {
        if (!expHTML.includes('<ul>')) expHTML += '<ul>';
        expHTML += '<li>' + line.substring(1).trim() + '</li>';
      } else {
        if (expHTML.includes('<ul>')) { expHTML += '</ul></div><div class="exp-item">'; }
        expHTML += '<h4>' + line + '</h4>';
      }
    });
    if (expHTML.includes('<ul>')) expHTML += '</ul>';
    expHTML += '</div>';

    const eduText = document.getElementById('r-edu').value || 'University of Tech - B.S. Computer Science (2020)';
    const eduHTML = eduText.split('\\n').map(l => '<p><strong>' + l + '</strong></p>').join('');

    const skillsText = document.getElementById('r-skills').value || 'JavaScript, HTML, CSS, React, Node.js';

    document.getElementById('resume-preview').innerHTML = \`
      <div style="text-align:center;">
        <h1>\${name}</h1>
        <div class="contact">\${email} | \${phone} | \${links}</div>
      </div>

      <h2>Professional Summary</h2>
      <p>\${summary}</p>

      <h2>Experience</h2>
      \${expHTML}

      <h2>Education</h2>
      \${eduHTML}

      <h2>Skills</h2>
      <p>\${skillsText}</p>
    \`;
  }

  // Ini
  updatePreview();

  function getFullResumeText() {
    return [
      document.getElementById('r-name').value,
      document.getElementById('r-summary').value,
      document.getElementById('r-exp').value,
      document.getElementById('r-edu').value,
      document.getElementById('r-skills').value
    ].join('\\n\\n');
  }

  async function analyzeResume() {
    const role = document.getElementById('r-role').value.trim() || 'General';
    const text = getFullResumeText();

    const btn = document.getElementById('btn-analyze');
    const fb = document.getElementById('ai-feedback');
    const fbc = document.getElementById('ai-feedback-content');

    btn.disabled = true;
    btn.innerHTML = 'Analyzing...';
    fb.style.display = 'block';
    fbc.innerHTML = '<div class="spinner" style="display:inline-block; width:16px; height:16px; border-width:2px; margin-right:8px; border-top-color:var(--primary);"></div> Analyzing...';
    document.getElementById('ai-score').textContent = '';

    try {
      const res = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, resumeText: text })
      });

      if (!res.ok) throw new Error("Failed to analyze resume.");
      const data = await res.json();

      document.getElementById('ai-score').textContent = data.rating + '/10';
      fbc.innerHTML = \`
        <div style="margin-bottom:8px;"><strong style="color:#16a34a;">Strengths:</strong> <ul style="margin:4px 0 0; padding-left:16px;">\${data.strengths.map(s=>'<li>'+s+'</li>').join('')}</ul></div>
        <div style="margin-bottom:8px;"><strong style="color:#ef4444;">Weaknesses:</strong> <ul style="margin:4px 0 0; padding-left:16px;">\${data.weaknesses.map(s=>'<li>'+s+'</li>').join('')}</ul></div>
        <div><strong style="color:var(--primary);">Tips:</strong> \${data.recommendations}</div>
      \`;
    } catch (err) {
      fbc.innerHTML = '<span style="color:red;">Analysis failed.</span>';
    } finally {
      btn.disabled = false;
      btn.innerHTML = '✨ AI Analyze';
    }
  }

  async function improveBullets() {
    const role = document.getElementById('r-role').value.trim() || 'General';
    const expField = document.getElementById('r-exp');
    const text = expField.value.trim();
    if (!text) { alert('Add some experience first!'); return; }

    const btn = document.getElementById('btn-improve');
    btn.disabled = true;
    btn.innerHTML = 'Improving...';

    try {
      const res = await fetch('/api/improve-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, expText: text })
      });

      if (!res.ok) throw new Error("Failed to improve.");
      const data = await res.json();
      expField.value = data.improvedText;
      updatePreview();
    } catch (err) {
      alert('Failed to improve bullets.');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '🪄 AI Improve';
    }
  }
</script>
</body>
</html>
`;

content = content.replace(/<script src="js\/utils\.js">[\s\S]*?<\/html>/, newScripts);

fs.writeFileSync('resume.html', content);
console.log("Done updating resume.html");
