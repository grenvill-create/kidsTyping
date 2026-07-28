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
                if (unlocked) {
                    this.startLesson(lesson.id);
                } else {
                    this.openParentGate(lesson.id);
                }
            };

            let starsHtml = '';
            if (unlocked && stars > 0) {
                for (let i = 0; i < 3; i++) {
                    starsHtml += i < stars ? '⭐' : '☆';
                }
            }

            const isGame = lesson.type === 'game';
            const gameIcon = isGame && typeof gameIcons !== 'undefined' ? (gameIcons[lesson.gameType] || '🎮') : '';
            card.innerHTML = `
                <div class="lesson-num">${unlocked ? (isGame ? gameIcon : lesson.id) : '🔒'}</div>
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
            if (typeof gameMode !== 'undefined') gameMode.handleInput(ch);
        } else {
            typingMode.handleInput(ch);
        }
    },

    lessonComplete(accuracy, wpm) {
        let stars = 0;
        if (accuracy >= 95) stars = 3;
        else if (accuracy >= 85) stars = 2;
        else if (accuracy >= 70) stars = 1;

        // Ensure we always save game stars as 3 if they passed
        const currentLesson = lessons.find(l => l.id === gameState.currentLessonId);
        if (currentLesson && (currentLesson.type === 'game' || currentLesson.gameType)) {
            stars = 3;
        }

        gameState.saveResult(gameState.currentLessonId, accuracy, wpm);
        audioManager.playSuccess();

        rewardsManager.showResult(accuracy, wpm, stars);
        document.getElementById('modal-overlay').classList.remove('hidden');
        document.getElementById('lesson-complete-modal').classList.remove('hidden');
    },

    nextLesson() {
        this.hideModals();
        const currentIndex = lessons.findIndex(l => l.id === gameState.currentLessonId);
        if (currentIndex !== -1 && currentIndex + 1 < lessons.length) {
            const nextId = lessons[currentIndex + 1].id;
            if (gameState.isLessonUnlocked(nextId)) {
                this.startLesson(nextId);
                return;
            }
        }
        this.goHome();
    },

    restartLesson() {
        this.hideModals();
        if (gameState.currentLessonId) {
            this.startLesson(gameState.currentLessonId);
        }
    },

    goHome() {
        typingMode.cleanup();
        if (typeof gameMode !== 'undefined') gameMode.stop();
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

    showLeaderboard(gameType, passed) {
        if (passed) {
            // Save progress silently so we unlock the next level
            gameState.saveResult(gameState.currentLessonId, 100, 20);
            audioManager.playSuccess();
        }
        
        const board = gameState.getLeaderboard(gameType);
        const listEl = document.getElementById('leaderboard-list');
        listEl.innerHTML = '';
        
        let html = '';
        if (passed) {
            html += `<p style="color: #2ed573; font-weight: bold; text-align: center; margin-bottom: 1rem;">✅ You passed!</p>`;
        } else {
            html += `<p style="color: #ff4757; font-weight: bold; text-align: center; margin-bottom: 1rem;">❌ Time's up! Try again to reach the target score.</p>`;
        }
        
        board.forEach((entry, i) => {
            let medal = '';
            if (i === 0) medal = '🥇 ';
            else if (i === 1) medal = '🥈 ';
            else if (i === 2) medal = '🥉 ';
            html += `<div style="display: flex; justify-content: space-between; padding: 0.5rem; border-bottom: 1px solid #eee;">
                <span>${medal}Rank ${i+1}</span>
                <span style="font-weight: bold;">${entry.score} pts</span>
            </div>`;
        });
        
        if (board.length === 0) {
            html += `<p style="text-align: center;">No scores yet!</p>`;
        }
        
        listEl.innerHTML = html;
        this.showModal('leaderboard-modal');
        audioManager.playWin();
    },

    hideModal(id) {
        document.getElementById(id).classList.add('hidden');
        document.getElementById('modal-overlay').classList.add('hidden');
    },

    // ===== Parent Gate Logic =====
    parentGateTarget: null,
    parentGateAnswer: null,
    parentGateAction: 'unlock', // 'unlock' or 'reset'

    openParentGate(lessonId) {
        this.parentGateTarget = lessonId;
        this.parentGateAction = 'unlock';
        this._showParentGate();
    },

    openResetGate() {
        this.parentGateAction = 'reset';
        this._showParentGate();
    },

    _showParentGate() {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        this.parentGateAnswer = num1 * num2;
        
        document.getElementById('parent-math-problem').textContent = `${num1} × ${num2} = ?`;
        document.getElementById('parent-math-input').value = '';
        document.getElementById('parent-math-error').style.display = 'none';
        
        this.showModal('parent-gate-modal');
        setTimeout(() => document.getElementById('parent-math-input').focus(), 100);
    },

    verifyParentGate() {
        const input = document.getElementById('parent-math-input').value;
        if (parseInt(input) === this.parentGateAnswer) {
            this.closeParentGate();

            if (this.parentGateAction === 'reset') {
                gameState.resetAll();
                this.renderLessonMap();
            } else {
                gameState.forceUnlock(this.parentGateTarget);
                this.renderLessonMap();
                this.startLesson(this.parentGateTarget);
            }
        } else {
            document.getElementById('parent-math-error').style.display = 'block';
            document.getElementById('parent-math-input').value = '';
            document.getElementById('parent-math-input').focus();
        }
    },

    closeParentGate() {
        this.hideModal('parent-gate-modal');
        this.parentGateTarget = null;
    },

    showModal(id) {
        document.getElementById('modal-overlay').classList.remove('hidden');
        document.getElementById(id).classList.remove('hidden');
    },

    hideModals() {
        document.getElementById('modal-overlay').classList.add('hidden');
        document.getElementById('lesson-complete-modal').classList.add('hidden');
        document.getElementById('break-modal').classList.add('hidden');
        document.getElementById('leaderboard-modal').classList.add('hidden');
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
