const rewardsManager = {
    showResult(accuracy, wpm, stars) {
        const statsEl = document.getElementById('result-stats');
        statsEl.innerHTML = `
            <div>Accuracy: <strong>${accuracy}%</strong></div>
            <div>Speed: <strong>${wpm} WPM</strong></div>
        `;

        const starsEl = document.getElementById('modal-stars');
        starsEl.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const star = document.createElement('span');
            star.textContent = i < stars ? '⭐' : '☆';
            star.style.display = 'inline-block';
            if (i < stars) {
                star.style.animation = `starBounce 0.5s ${i * 0.15}s both`;
            }
            starsEl.appendChild(star);
        }
    }
};
