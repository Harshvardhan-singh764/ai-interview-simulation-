const fs = require('fs');
let content = fs.readFileSync('resume.html', 'utf8');

const newMain = `  <main class="main-content">
    <div class="page-header animate-fade-up">
      <div class="page-title">📄 Resume Builder & Analyzer</div>
      <div class="page-subtitle">Build your resume or paste existing text to get an AI rating.</div>
    </div>

    <div class="setup-grid">
      <!-- LEFT: Editor -->
      <div class="card animate-fade-up stagger-1">
        <h3 style="margin-top:0; margin-bottom: 20px; font-size: 18px; color: var(--text-dark);">Resume Content</h3>

        <div style="margin-bottom: 16px;">
          <label style="display:block; font-size: 13px; font-weight: 600; color: var(--text-dark); margin-bottom: 6px;">Job Target / Role</label>
          <input type="text" id="res-role" placeholder="e.g. Software Engineer" style="width: 100%; padding: 10px; border: 1.5px solid var(--card-border); border-radius: 8px; font-family: inherit;">
        </div>

        <div style="margin-bottom: 16px;">
          <label style="display:block; font-size: 13px; font-weight: 600; color: var(--text-dark); margin-bottom: 6px;">Paste Resume Text Here</label>
          <textarea id="res-text" placeholder="Paste your full resume text here to analyze..." style="width: 100%; height: 350px; padding: 12px; border: 1.5px solid var(--card-border); border-radius: 8px; resize: vertical; font-family: inherit; font-size: 14px; line-height: 1.5;"></textarea>
        </div>

        <button class="btn btn-primary btn-lg btn-full" id="analyze-btn" onclick="analyzeResume()">
          ✨ Analyze Resume
        </button>
      </div>

      <!-- RIGHT: Analyzer Results -->
      <div class="animate-fade-up stagger-2">
        <div class="preview-card" id="res-result" style="display: none; border-top: 4px solid var(--primary);">
          <h3 style="margin-top:0; color: var(--text-dark);">📊 AI Analysis Result</h3>

          <div style="text-align: center; margin: 24px 0;">
            <div style="font-size: 48px; font-weight: 800; color: var(--primary);" id="res-score">--/10</div>
            <div style="font-size: 14px; color: var(--text-muted); font-weight: 600;">Overall Rating</div>
          </div>

          <div style="margin-bottom: 16px;">
            <h4 style="margin: 0 0 8px 0; font-size: 15px; color: #16a34a;">✅ Strengths</h4>
            <ul id="res-strengths" style="margin:0; padding-left: 20px; font-size: 13px; color: var(--text-dark); line-height: 1.6;"></ul>
          </div>

          <div style="margin-bottom: 16px;">
            <h4 style="margin: 0 0 8px 0; font-size: 15px; color: #ef4444;">⚠️ Weaknesses</h4>
            <ul id="res-weaknesses" style="margin:0; padding-left: 20px; font-size: 13px; color: var(--text-dark); line-height: 1.6;"></ul>
          </div>

          <div>
            <h4 style="margin: 0 0 8px 0; font-size: 15px; color: var(--primary);">💡 Recommendations</h4>
            <p id="res-recommendations" style="margin:0; font-size: 13px; color: var(--text-dark); line-height: 1.6;"></p>
          </div>
        </div>

        <div class="card" id="res-loading" style="display:none; text-align: center; padding: 40px 20px;">
          <div class="spinner" style="margin: 0 auto 16px;"></div>
          <div style="font-size: 15px; font-weight: 600; color: var(--text-muted);">AI is analyzing your resume...</div>
        </div>

        <!-- Tips -->
        <div class="card" id="res-tips" style="margin-top:16px;border-left:4px solid var(--accent)">
          <div style="font-size:13px;font-weight:700;color:var(--text-dark);margin-bottom:10px">💡 Resume Tips</div>
          <ul style="font-size:12px;color:var(--text-muted);line-height:1.8;padding-left:16px">
            <li>Include quantifiable metrics (e.g., "Increased sales by 20%")</li>
            <li>Tailor keywords to the job role</li>
            <li>Keep it concise (1-2 pages maximum)</li>
            <li>Use active verbs (e.g., "Led", "Developed", "Managed")</li>
          </ul>
        </div>
      </div>

    </div>
  </main>`;

content = content.replace(/<main class="main-content">[\s\S]*?<\/main>/, newMain);

// Also replace the trailing scripts specific to setup.html
const newScripts = `
<script src="js/utils.js"></script>
<script>
  requireAuth();
  populateSidebar('resume');

  async function analyzeResume() {
    const role = document.getElementById('res-role').value.trim();
    const text = document.getElementById('res-text').value.trim();

    if (!role || !text) {
      alert("Please enter a job role and paste your resume text.");
      return;
    }

    const btn = document.getElementById('analyze-btn');
    const loading = document.getElementById('res-loading');
    const resultCard = document.getElementById('res-result');
    const tips = document.getElementById('res-tips');

    btn.disabled = true;
    btn.innerHTML = 'Analyzing...';
    resultCard.style.display = 'none';
    tips.style.display = 'none';
    loading.style.display = 'block';

    try {
      const res = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, resumeText: text })
      });

      if (!res.ok) throw new Error("Failed to analyze resume.");

      const data = await res.json();

      document.getElementById('res-score').textContent = data.rating + '/10';
      document.getElementById('res-strengths').innerHTML = data.strengths.map(s => '<li>' + s + '</li>').join('');
      document.getElementById('res-weaknesses').innerHTML = data.weaknesses.map(s => '<li>' + s + '</li>').join('');
      document.getElementById('res-recommendations').textContent = data.recommendations;

      loading.style.display = 'none';
      resultCard.style.display = 'block';
    } catch (err) {
      console.error(err);
      alert("An error occurred while analyzing the resume.");
      loading.style.display = 'none';
      tips.style.display = 'block';
    } finally {
      btn.disabled = false;
      btn.innerHTML = '✨ Analyze Resume';
    }
  }
</script>
</body>
</html>
`;

content = content.replace(/<script src="js\/questions\.js">[\s\S]*?<\/html>/, newScripts);

fs.writeFileSync('resume.html', content);
console.log("Updated resume.html");
