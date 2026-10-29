const fs = require('fs');
const files = ['dashboard.html', 'setup.html', 'history.html', 'history-detail.html', 'profile.html', 'resume.html'];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('data-page="resume"')) {
    content = content.replace('<span class="nav-section-label">Practice Areas</span>', '<a href="resume.html" class="nav-link" data-page="resume"><span class="nav-icon">📄</span> Resume Builder</a>\n      <span class="nav-section-label">Practice Areas</span>');
    fs.writeFileSync(f, content);
  }
});
console.log("Done");
