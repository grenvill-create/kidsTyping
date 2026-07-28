/* ============================================================
   gameMode.js — 4 Mini-Game Types for Kids Typing Adventure
   ============================================================ */
const gameMode = {
    lesson: null,
    score: 0,
    targetScore: 10,
    items: [],
    spawnInterval: null,
    gameLoop: null,
    isPlaying: false,
    gameType: 'balloon',

    colors: ['#FF9AA2', '#FFB347', '#FDFD96', '#77DD77', '#84B6F4', '#C3B1E1'],

    start(lesson) {
        this.lesson = lesson;
        this.score = 0;
        this.targetScore = 10;
        this.items = [];
        this.isPlaying = true;
        this.gameType = lesson.gameType || 'balloon';

        document.getElementById('game-title').textContent = lesson.title;
        document.getElementById('game-score').textContent = `Score: 0 / ${this.targetScore}`;
        document.getElementById('balloon-area').innerHTML = '';

        audioManager.init();

        // Dispatch to the right game
        switch (this.gameType) {
            case 'balloon': this.startBalloon(); break;
            case 'rain':    this.startRain();    break;
            case 'speed':   this.startSpeed();   break;
            case 'target':  this.startTarget();  break;
            default:        this.startBalloon(); break;
        }
    },

    stop() {
        this.isPlaying = false;
        if (this.spawnInterval) clearInterval(this.spawnInterval);
        if (this.gameLoop) cancelAnimationFrame(this.gameLoop);
        if (this._speedTimeout) clearTimeout(this._speedTimeout);
        this.items.forEach(b => {
            if (b.el && b.el.parentNode) b.el.parentNode.removeChild(b.el);
        });
        this.items = [];
    },

    getChars() {
        return this.lesson.chars || 'abcdefghijklmnopqrstuvwxyz';
    },

    randomChar() {
        const chars = this.getChars();
        return chars[Math.floor(Math.random() * chars.length)];
    },

    randomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    },

    updateScore() {
        document.getElementById('game-score').textContent = `Score: ${this.score} / ${this.targetScore}`;
        if (this.score >= this.targetScore) {
            this.win();
        }
    },

    win() {
        this.stop();
        audioManager.playSuccess();
        gameState.saveResult(this.lesson.id, 100, 30);
        setTimeout(() => {
            if (window.app) app.nextLesson();
        }, 1500);
    },

    handleInput(inputChar) {
        if (!this.isPlaying) return;
        switch (this.gameType) {
            case 'balloon': this.handleBalloonInput(inputChar); break;
            case 'rain':    this.handleRainInput(inputChar);    break;
            case 'speed':   this.handleSpeedInput(inputChar);   break;
            case 'target':  this.handleTargetInput(inputChar);  break;
        }
    },

    // ===========================================================
    //  GAME 1: BALLOON POP 🎈
    //  Balloons float up slowly. Type the letter to pop them.
    // ===========================================================
    startBalloon() {
        this.spawnInterval = setInterval(() => this.spawnBalloon(), 3000);
        this._startAnimLoop();
    },

    spawnBalloon() {
        if (!this.isPlaying) return;
        const area = document.getElementById('balloon-area');
        const char = this.randomChar();
        const el = document.createElement('div');
        el.className = 'balloon';
        el.textContent = char;
        el.style.backgroundColor = this.randomColor();
        el.style.left = `${30 + Math.random() * (area.clientWidth - 120)}px`;
        area.appendChild(el);
        this.items.push({ el, char, y: -100, speed: 35 + Math.random() * 25 });
    },

    handleBalloonInput(ch) {
        const idx = this._findLowest(ch);
        if (idx !== -1) {
            this._popItem(idx);
        } else {
            audioManager.playError();
        }
    },

    // ===========================================================
    //  GAME 2: RAIN CATCHER 🌧️
    //  Letters fall from top like rain. Type to catch before landing.
    // ===========================================================
    startRain() {
        this.spawnInterval = setInterval(() => this.spawnRaindrop(), 2500);
        this._startAnimLoopDown();
    },

    spawnRaindrop() {
        if (!this.isPlaying) return;
        const area = document.getElementById('balloon-area');
        const char = this.randomChar();
        const el = document.createElement('div');
        el.className = 'raindrop';
        el.textContent = char;
        el.style.backgroundColor = this.randomColor();
        el.style.left = `${30 + Math.random() * (area.clientWidth - 80)}px`;
        el.style.top = '-60px';
        area.appendChild(el);
        this.items.push({ el, char, y: -60, speed: 30 + Math.random() * 20 });
    },

    handleRainInput(ch) {
        const idx = this._findHighest(ch);
        if (idx !== -1) {
            this._popItem(idx);
        } else {
            audioManager.playError();
        }
    },

    // ===========================================================
    //  GAME 3: SPEED TYPING ⚡
    //  One letter at a time in the center. Type it fast!
    // ===========================================================
    _speedTimeout: null,

    startSpeed() {
        this._showNextSpeedChar();
    },

    _showNextSpeedChar() {
        if (!this.isPlaying) return;
        const area = document.getElementById('balloon-area');
        // Clear old
        area.innerHTML = '';
        this.items = [];

        const char = this.randomChar();
        const el = document.createElement('div');
        el.className = 'speed-char';
        el.textContent = char;
        area.appendChild(el);
        this.items = [{ el, char }];

        // Timeout: if not typed in 5 seconds, show next
        this._speedTimeout = setTimeout(() => {
            if (this.isPlaying && this.items.length > 0) {
                this.items[0].el.classList.add('missed');
                setTimeout(() => this._showNextSpeedChar(), 300);
            }
        }, 5000);
    },

    handleSpeedInput(ch) {
        if (this.items.length === 0) return;
        const item = this.items[0];
        if (ch === item.char) {
            clearTimeout(this._speedTimeout);
            audioManager.playPop();
            item.el.classList.add('popped');
            this.score++;
            this.updateScore();
            if (this.score < this.targetScore) {
                setTimeout(() => this._showNextSpeedChar(), 400);
            }
        } else {
            audioManager.playError();
            item.el.classList.add('shake');
            setTimeout(() => item.el.classList.remove('shake'), 300);
        }
    },

    // ===========================================================
    //  GAME 4: TARGET PRACTICE 🎯
    //  Letters appear at random positions. Type to hit the target.
    // ===========================================================
    startTarget() {
        this.spawnInterval = setInterval(() => this.spawnTarget(), 2800);
        // Spawn first one immediately
        this.spawnTarget();
    },

    spawnTarget() {
        if (!this.isPlaying) return;
        // Max 4 targets on screen
        if (this.items.length >= 4) return;

        const area = document.getElementById('balloon-area');
        const char = this.randomChar();
        const el = document.createElement('div');
        el.className = 'target-char';
        el.textContent = char;
        el.style.backgroundColor = this.randomColor();

        const maxX = Math.max(60, area.clientWidth - 100);
        const maxY = Math.max(60, area.clientHeight - 100);
        el.style.left = `${30 + Math.random() * maxX}px`;
        el.style.top = `${30 + Math.random() * maxY}px`;
        area.appendChild(el);

        const item = { el, char };

        // Auto-remove after 6 seconds
        item.timeout = setTimeout(() => {
            if (el.parentNode) {
                el.classList.add('missed');
                setTimeout(() => {
                    if (el.parentNode) el.parentNode.removeChild(el);
                    const i = this.items.indexOf(item);
                    if (i !== -1) this.items.splice(i, 1);
                }, 300);
            }
        }, 6000);

        this.items.push(item);
    },

    handleTargetInput(ch) {
        const idx = this.items.findIndex(i => i.char === ch);
        if (idx !== -1) {
            const item = this.items[idx];
            if (item.timeout) clearTimeout(item.timeout);
            audioManager.playPop();
            item.el.classList.add('popped');
            this.items.splice(idx, 1);
            setTimeout(() => {
                if (item.el.parentNode) item.el.parentNode.removeChild(item.el);
            }, 200);
            this.score++;
            this.updateScore();
        } else {
            audioManager.playError();
        }
    },

    // ===========================================================
    //  SHARED HELPERS
    // ===========================================================
    _startAnimLoop() {
        let lastTime = performance.now();
        const loop = (time) => {
            if (!this.isPlaying) return;
            const delta = (time - lastTime) / 1000;
            lastTime = time;
            this._updateBalloons(delta);
            this.gameLoop = requestAnimationFrame(loop);
        };
        this.gameLoop = requestAnimationFrame(loop);
    },

    _updateBalloons(delta) {
        const areaHeight = document.getElementById('balloon-area').clientHeight;
        for (let i = this.items.length - 1; i >= 0; i--) {
            const b = this.items[i];
            b.y += b.speed * delta;
            b.el.style.bottom = `${b.y}px`;
            if (b.y > areaHeight + 100) {
                if (b.el.parentNode) b.el.parentNode.removeChild(b.el);
                this.items.splice(i, 1);
            }
        }
    },

    _startAnimLoopDown() {
        let lastTime = performance.now();
        const loop = (time) => {
            if (!this.isPlaying) return;
            const delta = (time - lastTime) / 1000;
            lastTime = time;
            this._updateRaindrops(delta);
            this.gameLoop = requestAnimationFrame(loop);
        };
        this.gameLoop = requestAnimationFrame(loop);
    },

    _updateRaindrops(delta) {
        const areaHeight = document.getElementById('balloon-area').clientHeight;
        for (let i = this.items.length - 1; i >= 0; i--) {
            const b = this.items[i];
            b.y += b.speed * delta;
            b.el.style.top = `${b.y}px`;
            if (b.y > areaHeight + 60) {
                if (b.el.parentNode) b.el.parentNode.removeChild(b.el);
                this.items.splice(i, 1);
            }
        }
    },

    _findLowest(ch) {
        let idx = -1, lowest = 9999;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].char === ch && this.items[i].y < lowest) {
                lowest = this.items[i].y;
                idx = i;
            }
        }
        return idx;
    },

    _findHighest(ch) {
        let idx = -1, highest = -9999;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].char === ch && this.items[i].y > highest) {
                highest = this.items[i].y;
                idx = i;
            }
        }
        return idx;
    },

    _popItem(idx) {
        const b = this.items[idx];
        audioManager.playPop();
        b.el.classList.add('popped');
        this.items.splice(idx, 1);
        setTimeout(() => {
            if (b.el.parentNode) b.el.parentNode.removeChild(b.el);
        }, 200);
        this.score++;
        this.updateScore();
    },
};
