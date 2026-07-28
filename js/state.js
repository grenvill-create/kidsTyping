const gameState = {
    currentLessonId: null,
    showHands: true,
    sessionStartTime: null,
    breakInterval: null,

    // Per-lesson progress: { lessonId: { stars: 0-3, bestAccuracy: 0, bestWpm: 0 } }
    progress: {},

    // Leaderboards for games: { gameType: [ {score, date}, ... ] }
    leaderboards: { balloon: [], mole: [], runner: [], space: [] },

    globalUnlock: false,

    init() {
        try {
            const saved = localStorage.getItem('kidsTypingV2');
            if (saved) {
                const data = JSON.parse(saved);
                this.progress = data.progress || {};
                this.leaderboards = data.leaderboards || { balloon: [], mole: [], runner: [], space: [] };
                this.showHands = data.showHands !== undefined ? data.showHands : true;
                this.globalUnlock = data.globalUnlock || false;
            }
        } catch (e) {
            console.error('Load error', e);
        }
    },

    save() {
        try {
            localStorage.setItem('kidsTypingV2', JSON.stringify({
                progress: this.progress,
                leaderboards: this.leaderboards,
                showHands: this.showHands,
                globalUnlock: this.globalUnlock
            }));
        } catch (e) {
            console.error('Save error', e);
        }
    },

    isLessonUnlocked(lessonId) {
        if (this.globalUnlock) return true;
        if (lessonId === 1) return true;
        if (this.progress[lessonId] && this.progress[lessonId].forceUnlocked) return true;

        const idx = lessons.findIndex(l => l.id === lessonId);
        if (idx > 0) {
            const prevLessonId = lessons[idx - 1].id;
            const prev = this.progress[prevLessonId];
            return prev && prev.stars > 0;
        }
        return false;
    },

    forceUnlock(lessonId) {
        // Unlock all levels when parent gate is passed for any level
        this.globalUnlock = true;
        this.save();
    },

    resetAll() {
        this.progress = {};
        this.leaderboards = { balloon: [], mole: [], runner: [], space: [] };
        this.globalUnlock = false;
        this.save();
    },

    saveHighScore(gameType, score) {
        if (!this.leaderboards[gameType]) {
            this.leaderboards[gameType] = [];
        }
        this.leaderboards[gameType].push({
            score: score,
            date: new Date().toLocaleDateString()
        });
        // Sort descending and keep top 5
        this.leaderboards[gameType].sort((a, b) => b.score - a.score);
        this.leaderboards[gameType] = this.leaderboards[gameType].slice(0, 5);
        this.save();
    },

    getLeaderboard(gameType) {
        return this.leaderboards[gameType] || [];
    },

    getLessonStars(lessonId) {
        return this.progress[lessonId] ? this.progress[lessonId].stars : 0;
    },

    saveResult(lessonId, accuracy, wpm) {
        let stars = 0;
        if (accuracy >= 50) stars = 1;
        if (accuracy >= 80) stars = 2;
        if (accuracy >= 95) stars = 3;

        const existing = this.progress[lessonId];
        if (!existing || stars > existing.stars) {
            this.progress[lessonId] = {
                stars: stars,
                bestAccuracy: accuracy,
                bestWpm: wpm,
                forceUnlocked: existing ? existing.forceUnlocked : false
            };
        } else {
            if (accuracy > existing.bestAccuracy) existing.bestAccuracy = accuracy;
            if (wpm > existing.bestWpm) existing.bestWpm = wpm;
        }
        this.save();
        return stars;
    },

    startSession() {
        this.sessionStartTime = Date.now();
        if (this.breakInterval) clearInterval(this.breakInterval);
        this.breakInterval = setInterval(() => {
            if (Date.now() - this.sessionStartTime > 10 * 60 * 1000) {
                if (window.app && app.showBreakModal) {
                    app.showBreakModal();
                }
            }
        }, 60000);
    },

    resetSessionTime() {
        this.sessionStartTime = Date.now();
    }
};
