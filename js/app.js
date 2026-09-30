/**
 * MelodyNest — Frontend Logic
 * Handles pill selection, form submission, and result display.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- State ---
    const state = {
        topic: '',
        language: 'english',
        style: 'kids',
        duration: '30',
    };

    // --- DOM References ---
    const form = document.getElementById('songForm');
    const topicInput = document.getElementById('topic');
    const generateBtn = document.getElementById('generateBtn');
    const resultArea = document.getElementById('resultArea');
    const resultSummary = document.getElementById('resultSummary');

    // --- Pill Toggle Logic ---
    document.querySelectorAll('.pill-group').forEach(group => {
        const pills = group.querySelectorAll('.pill');

        pills.forEach(pill => {
            pill.addEventListener('click', () => {
                // Deactivate siblings
                pills.forEach(p => p.classList.remove('active'));
                // Activate clicked
                pill.classList.add('active');
                // Update state
                const name = pill.dataset.name;
                const value = pill.dataset.value;
                if (name && value) {
                    state[name] = value;
                }
            });
        });
    });

    // --- Form Submission ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        state.topic = topicInput.value.trim();

        if (!state.topic) {
            topicInput.focus();
            shakeElement(topicInput.closest('.input-wrapper'));
            return;
        }

        // Show result
        showResult();
    });

    // --- Show Result Placeholder ---
    function showResult() {
        const styleLabels = { kids: '🎈 Kids', nursery: '🧸 Nursery', lullaby: '🌙 Lullaby' };
        const langLabels = { english: '🇬🇧 English', tamil: '🇮🇳 Tamil' };

        const tags = [
            `📝 ${state.topic}`,
            langLabels[state.language] || state.language,
            styleLabels[state.style] || state.style,
            `⏱ ${state.duration}s`,
        ];

        resultSummary.innerHTML = tags
            .map(tag => `<span class="result-tag">${tag}</span>`)
            .join('');

        resultArea.classList.remove('hidden');

        // Smooth scroll to result
        resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // --- Shake Animation (validation feedback) ---
    function shakeElement(el) {
        el.style.animation = 'none';
        // Trigger reflow
        void el.offsetWidth;
        el.style.animation = 'shake 0.4s ease';
        el.addEventListener('animationend', () => {
            el.style.animation = '';
        }, { once: true });
    }

    // Inject shake keyframes once
    const shakeCSS = document.createElement('style');
    shakeCSS.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%      { transform: translateX(-6px); }
            40%      { transform: translateX(6px); }
            60%      { transform: translateX(-4px); }
            80%      { transform: translateX(4px); }
        }
    `;
    document.head.appendChild(shakeCSS);
});
