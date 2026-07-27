const app = {
    init() {
        gameState.init();
        keyboardManager.init();
        gameState.startSession();
        
        // Listen for keyboard events
        document.addEventListener('kidsTypingKey', (e) => {
            this.handleInput(e.detail.char);
        });
    },
    
    startGame(mode) {
        audioManager.init(); // Must be called on user interaction
        gameState.currentMode = mode;
        gameState.currentLevelIndex = 0;
        
        document.getElementById('home-view').classList.remove('active');
        document.getElementById('home-view').classList.add('hidden');
        
        document.getElementById('game-view').classList.remove('hidden');
        document.getElementById('game-view').classList.add('active');
        
        this.startLevel();
    },
    
    startLevel() {
        this.updateProgress(0);
        document.getElementById('virtual-keyboard').style.display = 'flex';
        
        if (gameState.currentMode === 'letter') {
            letterMode.start(gameState.currentLevelIndex);
        } else if (gameState.currentMode === 'word') {
            wordMode.start(gameState.currentLevelIndex);
        } else if (gameState.currentMode === 'balloon') {
            balloonMode.start(gameState.currentLevelIndex);
        }
    },
    
    handleInput(char) {
        if (gameState.currentMode === 'letter') {
            letterMode.handleInput(char);
        } else if (gameState.currentMode === 'word') {
            wordMode.handleInput(char);
        } else if (gameState.currentMode === 'balloon') {
            balloonMode.handleInput(char);
        }
    },
    
    updateProgress(percent) {
        document.getElementById('level-progress').style.width = `${Math.min(100, percent * 100)}%`;
    },
    
    levelComplete() {
        audioManager.playSuccess();
        audioManager.speak("Great job! Level complete!");
        
        gameState.stars += 3;
        gameState.save();
        
        // Cleanup current mode
        if (gameState.currentMode === 'letter') letterMode.cleanup();
        else if (gameState.currentMode === 'word') wordMode.cleanup();
        else if (gameState.currentMode === 'balloon') balloonMode.cleanup();
        
        document.getElementById('virtual-keyboard').style.display = 'none';
        
        // Show modal
        document.getElementById('modal-overlay').classList.remove('hidden');
        const modal = document.getElementById('level-complete-modal');
        modal.classList.remove('hidden');
        
        document.getElementById('modal-stars').innerHTML = '⭐ ⭐ ⭐';
        document.getElementById('current-stars').innerHTML = `⭐ ${gameState.stars}`;
        
        // Sticker reward
        const sticker = gameState.unlockRandomSticker();
        const stickerReward = document.getElementById('modal-sticker-reward');
        if (sticker) {
            stickerReward.innerHTML = `<p>You got a sticker!</p><div style="font-size:4rem">${sticker.icon}</div>`;
        } else {
            stickerReward.innerHTML = '';
        }
    },
    
    nextLevel() {
        this.hideModals();
        
        let maxLevels = 0;
        if (gameState.currentMode === 'letter') maxLevels = gameData.levels.letter.length;
        if (gameState.currentMode === 'word') maxLevels = gameData.levels.word.length;
        if (gameState.currentMode === 'balloon') maxLevels = gameData.levels.balloon.length;
        
        gameState.currentLevelIndex++;
        if (gameState.currentLevelIndex >= maxLevels) {
            // Loop back or go home
            gameState.currentLevelIndex = 0; 
        }
        
        this.startLevel();
    },
    
    goHome() {
        // Cleanup current mode
        if (gameState.currentMode === 'letter') letterMode.cleanup();
        else if (gameState.currentMode === 'word') wordMode.cleanup();
        else if (gameState.currentMode === 'balloon') balloonMode.cleanup();
        
        this.hideModals();
        gameState.currentMode = null;
        
        document.getElementById('game-view').classList.remove('active');
        document.getElementById('game-view').classList.add('hidden');
        document.getElementById('sticker-view').classList.remove('active');
        document.getElementById('sticker-view').classList.add('hidden');
        
        document.getElementById('home-view').classList.remove('hidden');
        document.getElementById('home-view').classList.add('active');
    },
    
    showStickerBook() {
        document.getElementById('home-view').classList.remove('active');
        document.getElementById('home-view').classList.add('hidden');
        
        document.getElementById('sticker-view').classList.remove('hidden');
        document.getElementById('sticker-view').classList.add('active');
        
        rewardsManager.renderStickerBook();
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
        document.getElementById('level-complete-modal').classList.add('hidden');
        document.getElementById('break-modal').classList.add('hidden');
    }
};

window.onload = () => {
    app.init();
};
