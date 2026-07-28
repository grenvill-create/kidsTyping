const gameState = {
    currentLessonId: null,
    showHands: true,
    sessionStartTime: null,
    breakInterval: null,

    // Per-lesson progress: { lessonId: { stars: 0-3, bestAccuracy: 0, bestWpm: 0 } }
    progress: {},

    init() {
        try {
            const saved = localStorage.getItem('kidsTypingV2');
            if (saved) {
                const data = JSON.parse(saved);
                this.progress = data.progress || {};
                this.showHands = data.showHands !== undefined ? data.showHands : true;
            }
        } catch (e) {
            console.error('Load error', e);
        }
    },

    save() {
        try {
            localStorage.setItem('kidsTypingV2', JSON.stringify({
                progress: this.progress,
                showHands: this.showHands
            }));
        } catch (e) {
            console.error('Save error', e);
        }
    },

    isLessonUnlocked(lessonId) {
        if (lessonId === 1) return true;
        const idx = lessons.findIndex(l => l.id === lessonId);
        if (idx > 0) {
            const prevLessonId = lessons[idx - 1].id;
            const prev = this.progress[prevLessonId];
            return prev && prev.stars > 0;
        }
        return false;
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
                bestWpm: wpm
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
