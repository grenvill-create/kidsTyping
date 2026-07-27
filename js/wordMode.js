const wordMode = {
    currentWord: '',
    currentIcon: '',
    typedWord: '',
    levelWords: [],
    currentIndex: 0,
    
    start(levelIndex) {
        this.levelWords = [...gameData.levels.word[levelIndex]];
        this.currentIndex = 0;
        this.renderNext();
    },
    
    renderNext() {
        if (this.currentIndex >= this.levelWords.length) {
            app.levelComplete();
            return;
        }
        
        const wordStr = this.levelWords[this.currentIndex];
        const wordData = gameData.words.find(w => w.word === wordStr);
        this.currentWord = wordStr;
        this.currentIcon = wordData ? wordData.icon : '❓';
        this.typedWord = '';
        
        this.renderUI();
        audioManager.speak(`${this.currentWord}! Can you spell ${this.currentWord}?`);
        app.updateProgress(this.currentIndex / this.levelWords.length);
    },
    
    renderUI() {
        const playArea = document.getElementById('play-area');
        
        let slotsHtml = '';
        for (let i = 0; i < this.currentWord.length; i++) {
            const isFilled = i < this.typedWord.length;
            slotsHtml += `<div class="word-slot ${isFilled ? 'filled' : ''}">${isFilled ? this.typedWord[i].toUpperCase() : ''}</div>`;
        }
        
        playArea.innerHTML = `
            <div class="flash-card" id="word-card">
                <div class="illustration" id="word-icon">${this.currentIcon}</div>
                <div class="word-slots">
                    ${slotsHtml}
                </div>
            </div>
        `;
        
        // Highlight next key
        if (this.typedWord.length < this.currentWord.length) {
            keyboardManager.highlightKey(this.currentWord[this.typedWord.length]);
        }
    },
    
    handleInput(char) {
        const expectedChar = this.currentWord[this.typedWord.length];
        
        if (char === expectedChar) {
            audioManager.playPop();
            this.typedWord += char;
            this.renderUI();
            
            if (this.typedWord.length === this.currentWord.length) {
                // Word completed
                keyboardManager.clearHighlights();
                document.getElementById('word-icon').classList.add('celebrate-anim');
                audioManager.playSuccess();
                audioManager.speak(`${this.typedWord.split('').join('-')}! ${this.currentWord}!`);
                
                setTimeout(() => {
                    this.currentIndex++;
                    this.renderNext();
                }, 2000);
            }
        } else {
            keyboardManager.showError(expectedChar);
        }
    },
    
    cleanup() {
        this.currentWord = '';
        keyboardManager.clearHighlights();
    }
};
