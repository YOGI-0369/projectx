// AutoFolio — Main JS
// Animate counter on home page
document.addEventListener('DOMContentLoaded', () => {
    const stat = document.querySelector('.hero-stat span');
    if (stat) {
        const target = parseInt(stat.textContent) || 0;
        let count = 0;
        const inc = Math.ceil(target / 40);
        const timer = setInterval(() => {
            count = Math.min(count + inc, target);
            stat.textContent = count;
            if (count >= target) clearInterval(timer);
        }, 40);
    }
});
