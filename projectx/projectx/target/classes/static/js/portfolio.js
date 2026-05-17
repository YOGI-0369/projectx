// AutoFolio — Portfolio View JS
// Renders project cards from the JSON data stored in backend

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('projectsList');
    if (!container) return;

    const json = container.dataset.projects;
    if (!json || json === '[]' || json === 'null') return;

    let projects;
    try {
        projects = JSON.parse(json);
    } catch(e) {
        return;
    }

    if (!Array.isArray(projects) || projects.length === 0) return;

    // Detect if developer format (different card style)
    const isDev = container.classList.contains('dev-projects');
    const isShowcase = container.classList.contains('projects-showcase');

    projects.forEach(p => {
        if (!p.name) return;

        if (isDev) {
            container.innerHTML += `
                <div class="dev-project">
                    <div class="dev-proj-title">${esc(p.name)}</div>
                    ${p.tech ? `<div class="dev-proj-tech"># ${esc(p.tech)}</div>` : ''}
                    ${p.description ? `<div class="dev-proj-desc">${esc(p.description)}</div>` : ''}
                    <div class="dev-proj-links">
                        ${p.github ? `<a href="${esc(p.github)}" target="_blank" class="dev-proj-link">→ GitHub</a>` : ''}
                        ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" class="dev-proj-link">→ Live Demo</a>` : ''}
                    </div>
                </div>
            `;
        } else if (isShowcase) {
            container.innerHTML += `
                <div class="pf-card project-card" style="margin-bottom:0">
                    <div class="proj-title">${esc(p.name)}</div>
                    ${p.tech ? `<div class="proj-tech">${esc(p.tech)}</div>` : ''}
                    ${p.description ? `<div class="proj-desc">${esc(p.description)}</div>` : ''}
                    <div class="proj-links">
                        ${p.github ? `<a href="${esc(p.github)}" target="_blank" class="proj-link">GitHub →</a>` : ''}
                        ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" class="proj-link">Live Demo →</a>` : ''}
                    </div>
                </div>
            `;
        } else {
            container.innerHTML += `
                <div class="project-card">
                    <div class="proj-title">${esc(p.name)}</div>
                    ${p.tech ? `<div class="proj-tech">${esc(p.tech)}</div>` : ''}
                    ${p.description ? `<div class="proj-desc">${esc(p.description)}</div>` : ''}
                    <div class="proj-links">
                        ${p.github ? `<a href="${esc(p.github)}" target="_blank" class="proj-link">GitHub →</a>` : ''}
                        ${p.demo ? `<a href="${esc(p.demo)}" target="_blank" class="proj-link">Live Demo →</a>` : ''}
                    </div>
                </div>
            `;
        }
    });
});

// Copy portfolio link
function copyLink() {
    navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Portfolio link copied!'));
}

function esc(str) {
    if (!str) return '';
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
              .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
