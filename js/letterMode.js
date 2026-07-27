const letterMode = {
    targetChar: null,
    levelChars: [],
    currentIndex: 0,
    
    start(levelIndex) {
        this.levelChars = [...gameData.levels.letter[levelIndex]];
        if (this.levelChars.length === 0) {
            // Random 26 level
            this.levelChars = gameData.letters.map(l => l.char).sort(() => 0.5 - Math.random()).slice(0, 7);
        }
        this.currentIndex = 0;
        this.renderNext();
    },
    
    renderNext() {
        if (this.currentIndex >= this.levelChars.length) {
            app.levelComplete();
            return;
        }
        
        this.targetChar = this.levelChars[this.currentIndex];
        const letterData = gameData.letters.find(l => l.char === this.targetChar);
        
        const playArea = document.getElementById('play-area');
        playArea.innerHTML = `
            <div class="flash-card" id="current-card">
                <div class="big-letter">${letterData.char.toUpperCase()}${letterData.char}</div>
                <div class="illustration">${letterData.icon}</div>
            </div>
        `;
        
        keyboardManager.highlightKey(this.targetChar);
        
        // Announce
        audioManager.speak(`${letterData.char.toUpperCase()}! ${letterData.char.toUpperCase()} for ${letterData.word}!`);
        app.updateProgress(this.currentIndex / this.levelChars.length);
    },
    
    handleInput(char) {
        if (char === this.targetChar) {
            audioManager.playPop();
            const card = document.getElementById('current-card');
            card.classList.add('pop-animation');
            
            // Wait for animation
            setTimeout(() => {
                this.currentIndex++;
                this.renderNext();
            }, 600);
        } else {
            keyboardManager.showError(this.targetChar);
        }
    },
    
    cleanup() {
        this.targetChar = null;
        keyboardManager.clearHighlights();
    }
};
