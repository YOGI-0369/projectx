// AutoFolio — Create Form JS

let currentSection = 'personal';
let projectCount = 1;
let usernameTimer = null;

// ---- SECTION NAVIGATION ----
function showSection(name) {
    document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
    document.getElementById('section-' + name).classList.add('active');

    document.querySelectorAll('.step-item').forEach(s => {
        s.classList.remove('active');
        if (s.dataset.section === name) s.classList.add('active');
    });

    currentSection = name;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextSection(name) {
    if (currentSection === 'personal' && !validatePersonal()) return;
    // Mark current as done
    document.querySelectorAll('.step-item').forEach(s => {
        if (s.dataset.section === currentSection) {
            s.classList.add('done');
            s.classList.remove('active');
        }
    });
    showSection(name);
}

function prevSection(name) { showSection(name); }

// ---- PERSONAL VALIDATION ----
function validatePersonal() {
    const fullName = document.getElementById('fullName').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!fullName) { alert('Please enter your full name.'); return false; }
    if (!username || username.length < 3) { alert('Username must be at least 3 characters.'); return false; }
    if (!email || !email.includes('@')) { alert('Please enter a valid email.'); return false; }
    return true;
}

// ---- USERNAME CHECK (AJAX) ----
document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const statusEl = document.getElementById('usernameStatus');

    if (usernameInput) {
        usernameInput.addEventListener('input', () => {
            const val = usernameInput.value.trim().toLowerCase();
            if (val.length < 3) {
                statusEl.textContent = '';
                return;
            }
            clearTimeout(usernameTimer);
            statusEl.textContent = 'Checking...';
            statusEl.className = 'username-status';

            usernameTimer = setTimeout(() => {
                fetch('/api/check-username?username=' + encodeURIComponent(val))
                    .then(r => r.json())
                    .then(available => {
                        if (available) {
                            statusEl.textContent = '✓ Available!';
                            statusEl.className = 'username-status available';
                        } else {
                            statusEl.textContent = '✗ Already taken';
                            statusEl.className = 'username-status taken';
                        }
                    })
                    .catch(() => { statusEl.textContent = ''; });
            }, 500);
        });
    }

    // ---- SKILLS PREVIEW ----
    const skillsInput = document.getElementById('skills');
    const skillsPreview = document.getElementById('skillsPreview');
    if (skillsInput && skillsPreview) {
        skillsInput.addEventListener('input', () => {
            const skills = skillsInput.value.split(',')
                .map(s => s.trim()).filter(s => s);
            skillsPreview.innerHTML = skills
                .map(s => `<span class="skill-preview-tag">${escapeHtml(s)}</span>`)
                .join('');
        });
    }

    // ---- THEME PICKER ----
    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            opt.querySelector('input').checked = true;
        });
    });

    // ---- FORMAT PICKER ----
    document.querySelectorAll('.format-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.format-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            opt.querySelector('input').checked = true;
        });
    });

    // Sidebar step clicks
    document.querySelectorAll('.step-item').forEach(item => {
        item.addEventListener('click', () => {
            showSection(item.dataset.section);
        });
    });
});

// ---- ADD PROJECT ----
function addProject() {
    if (projectCount >= 6) {
        alert('Maximum 6 projects allowed for MVP.');
        return;
    }
    projectCount++;
    const builder = document.getElementById('projectsBuilder');
    const div = document.createElement('div');
    div.className = 'project-item';
    div.id = 'project-' + (projectCount - 1);
    div.innerHTML = `
        <div class="project-item-header">
            <h4>Project ${projectCount}</h4>
            <button type="button" onclick="removeProject(this)" style="
                background:transparent;border:none;color:#ef4444;
                cursor:pointer;font-size:0.85rem;font-weight:600;">
                Remove
            </button>
        </div>
        <div class="form-grid two-col">
            <div class="form-group">
                <label>Project Name</label>
                <input type="text" class="form-input proj-name" placeholder="e.g. Chat App"/>
            </div>
            <div class="form-group">
                <label>Tech Stack</label>
                <input type="text" class="form-input proj-tech" placeholder="e.g. React, Firebase"/>
            </div>
            <div class="form-group full-width">
                <label>Description</label>
                <textarea class="form-input proj-desc" rows="2" placeholder="What does it do?"></textarea>
            </div>
            <div class="form-group">
                <label>GitHub Link</label>
                <input type="url" class="form-input proj-github" placeholder="https://github.com/..."/>
            </div>
            <div class="form-group">
                <label>Live Demo</label>
                <input type="url" class="form-input proj-demo" placeholder="https://..."/>
            </div>
        </div>
    `;
    builder.appendChild(div);
}

function removeProject(btn) {
    btn.closest('.project-item').remove();
    // Renumber
    document.querySelectorAll('.project-item').forEach((el, i) => {
        el.querySelector('h4').textContent = 'Project ' + (i + 1);
    });
    projectCount--;
}

// ---- COLLECT PROJECTS INTO JSON ----
function collectProjects() {
    const projects = [];
    document.querySelectorAll('.project-item').forEach(item => {
        const name = item.querySelector('.proj-name')?.value?.trim();
        if (!name) return; // skip empty
        projects.push({
            name: name,
            tech: item.querySelector('.proj-tech')?.value?.trim() || '',
            description: item.querySelector('.proj-desc')?.value?.trim() || '',
            github: item.querySelector('.proj-github')?.value?.trim() || '',
            demo: item.querySelector('.proj-demo')?.value?.trim() || ''
        });
    });
    document.getElementById('projectsJsonField').value = JSON.stringify(projects);
}

// ---- HELPERS ----
function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
