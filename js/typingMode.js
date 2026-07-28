const typingMode = {
    chars: [],        // Array of { char, state: 'pending'|'current'|'correct'|'wrong' }
    currentIndex: 0,
    totalCorrect: 0,
    totalTyped: 0,
    startTime: null,
    drillIndex: 0,
    lesson: null,

    start(lesson) {
        this.lesson = lesson;
        this.drillIndex = 0;
        this.totalCorrect = 0;
        this.totalTyped = 0;
        this.startTime = null;
        this.loadDrill();
    },

    loadDrill() {
        if (this.drillIndex >= this.lesson.drills.length) {
            // All drills done
            this.finish();
            return;
        }

        const text = this.lesson.drills[this.drillIndex];
        this.chars = text.split('').map(ch => ({ char: ch, state: 'pending' }));
        this.currentIndex = 0;
        if (this.chars.length > 0) {
            this.chars[0].state = 'current';
        }
        if (!this.startTime) this.startTime = Date.now();
        this.render();
        this.highlightCurrent();
    },

    render() {
        const container = document.getElementById('typing-prompt');
        container.innerHTML = '';

        this.chars.forEach((item, i) => {
            const span = document.createElement('span');
            span.className = `typing-char ${item.state}`;
            if (item.char === ' ') span.classList.add('space-char');

            if (item.char === ' ') {
                span.textContent = '\u00A0'; // nbsp for space
            } else {
                span.textContent = item.char;
            }
            container.appendChild(span);
        });

        // Update progress
        const totalChars = this.lesson.drills.reduce((sum, d) => sum + d.length, 0);
        const doneChars = this.lesson.drills.slice(0, this.drillIndex).reduce((sum, d) => sum + d.length, 0) + this.currentIndex;
        const remaining = totalChars - doneChars;
        const pct = Math.min(100, (doneChars / totalChars) * 100);
        document.getElementById('typing-progress').style.width = `${pct}%`;
        document.getElementById('typing-remaining').textContent = `Remaining: ${remaining} characters`;

        this.updateStats();
    },

    highlightCurrent() {
        if (this.currentIndex >= this.chars.length) return;
        const ch = this.chars[this.currentIndex].char;
        keyboardManager.highlightKey(ch);
        keyboardManager.highlightFinger(ch);
    },

    handleInput(inputChar) {
        if (this.currentIndex >= this.chars.length) return;

        const expected = this.chars[this.currentIndex].char;
        this.totalTyped++;

        if (inputChar === expected) {
            this.chars[this.currentIndex].state = 'correct';
            this.totalCorrect++;
            audioManager.playTick();
        } else {
            this.chars[this.currentIndex].state = 'wrong';
            audioManager.playError();
        }

        this.currentIndex++;

        if (this.currentIndex < this.chars.length) {
            this.chars[this.currentIndex].state = 'current';
            this.render();
            this.highlightCurrent();
        } else {
            // Drill line done
            this.render();
            keyboardManager.clearHighlights();
            keyboardManager.highlightFinger(null);

            this.drillIndex++;
            setTimeout(() => {
                this.loadDrill();
            }, 600);
        }
    },

    updateStats() {
        const accuracy = this.totalTyped > 0 ? Math.round((this.totalCorrect / this.totalTyped) * 100) : 0;
        const elapsed = this.startTime ? (Date.now() - this.startTime) / 1000 / 60 : 0; // minutes
        const wpm = elapsed > 0 ? Math.round((this.totalCorrect / 5) / elapsed) : 0;

        document.getElementById('stat-accuracy').textContent = `Accuracy: ${accuracy}%`;
        document.getElementById('stat-wpm').textContent = `WPM: ${wpm}`;
    },

    finish() {
        const accuracy = this.totalTyped > 0 ? Math.round((this.totalCorrect / this.totalTyped) * 100) : 0;
        const elapsed = this.startTime ? (Date.now() - this.startTime) / 1000 / 60 : 0;
        const wpm = elapsed > 0 ? Math.round((this.totalCorrect / 5) / elapsed) : 0;

        keyboardManager.clearHighlights();
        keyboardManager.highlightFinger(null);

        app.lessonComplete(accuracy, wpm);
    },

    cleanup() {
        this.chars = [];
        keyboardManager.clearHighlights();
        keyboardManager.highlightFinger(null);
    }
};
