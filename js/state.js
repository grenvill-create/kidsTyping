const gameState = {
    currentMode: null, // 'letter', 'word', 'balloon'
    currentLevelIndex: 0,
    currentStepIndex: 0,
    score: 0,
    stars: 0,
    sessionStartTime: null,
    breakInterval: null,
    
    unlockedStickers: [],
    
    init() {
        // Load from local storage
        try {
            const saved = localStorage.getItem('kidsTypingSave');
            if (saved) {
                const data = JSON.parse(saved);
                this.unlockedStickers = data.unlockedStickers || [];
                this.stars = data.stars || 0;
            }
        } catch (e) {
            console.error("Could not load save data", e);
        }
    },
    
    save() {
        try {
            localStorage.setItem('kidsTypingSave', JSON.stringify({
                unlockedStickers: this.unlockedStickers,
                stars: this.stars
            }));
        } catch (e) {
            console.error("Could not save data", e);
        }
    },
    
    startSession() {
        this.sessionStartTime = Date.now();
        // 10 minute break reminder
        if (this.breakInterval) clearInterval(this.breakInterval);
        this.breakInterval = setInterval(() => {
            if (Date.now() - this.sessionStartTime > 10 * 60 * 1000) {
                if (window.app && app.showBreakModal) {
                    app.showBreakModal();
                }
            }
        }, 60000); // Check every minute
    },
    
    resetSessionTime() {
        this.sessionStartTime = Date.now();
    },

    unlockRandomSticker() {
        if (!gameData || !gameData.stickers) return null;
        const available = gameData.stickers.filter(s => !this.unlockedStickers.includes(s.id));
        if (available.length > 0) {
            const sticker = available[Math.floor(Math.random() * available.length)];
            this.unlockedStickers.push(sticker.id);
            this.save();
            return sticker;
        }
        return null;
    }
};
