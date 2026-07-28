const app = {
    init() {
        gameState.init();
        keyboardManager.init();
        gameState.startSession();
        this.renderLessonMap();

        // Apply saved hand toggle state
        const guide = document.getElementById('finger-guide');
        const btn = document.getElementById('btn-toggle-hands');
        if (gameState.showHands) {
            guide.classList.remove('hidden');
            btn.classList.add('active');
        } else {
            guide.classList.add('hidden');
            btn.classList.remove('active');
        }
    },

    renderLessonMap() {
        const container = document.getElementById('lesson-map');
        container.innerHTML = '';

        lessons.forEach(lesson => {
            const unlocked = gameState.isLessonUnlocked(lesson.id);
            const stars = gameState.getLessonStars(lesson.id);
            const isCurrent = unlocked && stars === 0;

            const card = document.createElement('div');
            card.className = `lesson-card ${unlocked ? '' : 'locked'} ${isCurrent ? 'current' : ''}`;
            card.onclick = () => {
                if (unlocked) this.startLesson(lesson.id);
            };

            let starsHtml = '';
            if (unlocked && stars > 0) {
                for (let i = 0; i < 3; i++) {
                    starsHtml += i < stars ? '⭐' : '☆';
                }
            }

            const isGame = lesson.type === 'game';
            card.innerHTML = `
                <div class="lesson-num">${unlocked ? (isGame ? '🎮' : lesson.id) : '🔒'}</div>
                <div class="lesson-keys">${lesson.title}</div>
                ${starsHtml ? `<div class="lesson-stars">${starsHtml}</div>` : ''}
            `;
            if (isGame) card.classList.add('game-card');
            container.appendChild(card);
        });
    },

    startLesson(lessonId) {
        audioManager.init();
        const lesson = lessons.find(l => l.id === lessonId);
        if (!lesson) return;

        gameState.currentLessonId = lessonId;
        document.getElementById('lesson-title').textContent = `Lesson ${lesson.id}: ${lesson.title}`;
        document.getElementById('stat-accuracy').textContent = 'Accuracy: --';
        document.getElementById('stat-wpm').textContent = 'WPM: --';

        this.switchView(lesson.type === 'game' ? 'balloon-game-view' : 'game-view');
        
        if (lesson.type === 'game') {
            gameMode.start(lesson);
        } else {
            typingMode.start(lesson);
        }
    },

    handleInput(ch, shiftKey) {
        if (!gameState.currentLessonId) return;
        const lesson = lessons.find(l => l.id === gameState.currentLessonId);
        if (!lesson) return;
        
        if (lesson.type === 'game') {
            if (window.gameMode) gameMode.handleInput(ch);
        } else {
            typingMode.handleInput(ch);
        }
    },

    lessonComplete(accuracy, wpm) {
        const stars = gameState.saveResult(gameState.currentLessonId, accuracy, wpm);
        audioManager.playSuccess();

        rewardsManager.showResult(accuracy, wpm, stars);
        document.getElementById('modal-overlay').classList.remove('hidden');
        document.getElementById('lesson-complete-modal').classList.remove('hidden');
    },

    nextLesson() {
        this.hideModals();
        const nextId = gameState.currentLessonId + 1;
        if (nextId <= lessons.length && gameState.isLessonUnlocked(nextId)) {
            this.startLesson(nextId);
        } else {
            this.goHome();
        }
    },

    restartLesson() {
        this.hideModals();
        if (gameState.currentLessonId) {
            this.startLesson(gameState.currentLessonId);
        }
    },

    goHome() {
        typingMode.cleanup();
        this.hideModals();
        gameState.currentLessonId = null;
        this.renderLessonMap();
        this.switchView('home-view');
    },

    toggleHands() {
        const guide = document.getElementById('finger-guide');
        const btn = document.getElementById('btn-toggle-hands');
        gameState.showHands = !gameState.showHands;
        if (gameState.showHands) {
            guide.classList.remove('hidden');
            btn.classList.add('active');
        } else {
            guide.classList.add('hidden');
            btn.classList.remove('active');
        }
        gameState.save();
    },

    showBreakModal() {
        document.getElementById('modal-overlay').classList.remove('hidden');
        document.getElementById('break-modal').classList.remove('hidden');
    },

    resumeFromBreak() {
        this.hideModals();
        gameState.resetSessionTime();
    },

    hideModals() {
        document.getElementById('modal-overlay').classList.add('hidden');
        document.getElementById('lesson-complete-modal').classList.add('hidden');
        document.getElementById('break-modal').classList.add('hidden');
    },

    switchView(targetId) {
        document.querySelectorAll('.view').forEach(v => {
            v.classList.remove('active');
            v.classList.add('hidden');
        });
        const target = document.getElementById(targetId);
        target.classList.remove('hidden');
        target.classList.add('active');
    }
};

window.onload = () => { app.init(); };
