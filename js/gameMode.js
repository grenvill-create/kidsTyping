/* ============================================================
   gameMode.js — 4 Mini-Game Types for Kids Typing Adventure
   ============================================================ */
const gameMode = {
    lesson: null,
    score: 0,
    targetScore: 10,
    items: [],
    spawnInterval: null,
    timerInterval: null,
    gameLoop: null,
    isPlaying: false,
    timeLeft: 60,
    gameType: 'balloon',

    colors: ['#FF9AA2', '#FFB347', '#FDFD96', '#77DD77', '#84B6F4', '#C3B1E1'],

    start(lesson) {
        this.lesson = lesson;
        this.score = 0;
        this.targetScore = lesson.targetScore || 10;
        this.items = [];
        this.isPlaying = true;
        this.timeLeft = 60;
        this.gameType = lesson.gameType || 'balloon';

        document.getElementById('game-title').textContent = lesson.title;
        document.getElementById('game-score').textContent = `Score: 0 / ${this.targetScore * 100}`;
        document.getElementById('game-timer').textContent = `Time: 60s`;
        
        const area = document.getElementById('balloon-area');
        area.innerHTML = '';
        area.className = 'game-area'; // Reset all classes
        area.style.background = ''; // reset inline background

        audioManager.init();
        audioManager.startBGM();

        // Dispatch to the right game
        switch (this.gameType) {
            case 'balloon': this.startBalloon(); break;
            case 'mole':    this.startMole();    break;
            case 'runner':  this.startRunner();  break;
            case 'space':   this.startSpace();   break;
            default:        this.startBalloon(); break;
        }

        this.timerInterval = setInterval(() => {
            if (!this.isPlaying) return;
            this.timeLeft--;
            document.getElementById('game-timer').textContent = `Time: ${this.timeLeft}s`;
            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    },

    endGame() {
        this.stop();
        // Save score
        gameState.saveHighScore(this.gameType, this.score);
        
        // Check pass condition
        if (this.score >= this.targetScore * 100) {
            app.showLeaderboard(this.gameType, true); // true = passed
        } else {
            app.showLeaderboard(this.gameType, false); // false = failed
        }
    },

    stop() {
        this.isPlaying = false;
        audioManager.stopBGM();
        if (this.spawnInterval) clearInterval(this.spawnInterval);
        if (this.timerInterval) clearInterval(this.timerInterval);
        if (this.gameLoop) cancelAnimationFrame(this.gameLoop);
        if (this._moleTimeout) clearTimeout(this._moleTimeout);
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
        document.getElementById('game-score').textContent = `Score: ${this.score} / ${this.targetScore * 100}`;
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
            case 'mole':    this.handleMoleInput(inputChar);    break;
            case 'runner':  this.handleRunnerInput(inputChar);  break;
            case 'space':   this.handleSpaceInput(inputChar);   break;
        }
    },

    // ===========================================================
    //  GAME 1: BALLOON POP 🎈
    // ===========================================================
    startBalloon() {
        this.spawnInterval = setInterval(() => this.spawnBalloon(), 2500);
        this._startAnimLoop((delta) => {
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
        });
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
        this.items.push({ el, char, y: -100, speed: 40 + Math.random() * 30 });
    },

    handleBalloonInput(ch) {
        // find lowest balloon with matching char
        let idx = -1, lowest = 9999;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].char.toLowerCase() === ch && this.items[i].y < lowest) {
                lowest = this.items[i].y;
                idx = i;
            }
        }
        
        if (idx !== -1) {
            const b = this.items[idx];
            audioManager.playPop();
            b.el.classList.add('popped');
            this.items.splice(idx, 1);
            setTimeout(() => { if (b.el.parentNode) b.el.parentNode.removeChild(b.el); }, 200);
            this.score += 100;
            this.updateScore();
        } else {
            audioManager.playError();
        }
    },

    // ===========================================================
    //  GAME 2: WHACK-A-MOLE 🐹
    // ===========================================================
    _moleHoles: [],
    startMole() {
        const area = document.getElementById('balloon-area');
        area.style.background = 'linear-gradient(180deg, #87CEEB, #90EE90)';
        
        const grid = document.createElement('div');
        grid.className = 'mole-grid';
        this._moleHoles = [];
        
        // Create 9 holes (3x3 grid)
        for(let i=0; i<9; i++) {
            const hole = document.createElement('div');
            hole.className = 'mole-hole';
            const mole = document.createElement('div');
            mole.className = 'mole';
            const letter = document.createElement('div');
            letter.className = 'mole-letter';
            letter.textContent = '';
            mole.appendChild(letter);
            hole.appendChild(mole);
            grid.appendChild(hole);
            this._moleHoles.push({ el: mole, letterEl: letter, active: false, char: '' });
        }
        area.appendChild(grid);
        
        this.spawnInterval = setInterval(() => this.spawnMole(), 2000);
        this.spawnMole();
    },

    spawnMole() {
        if (!this.isPlaying) return;
        const available = this._moleHoles.filter(h => !h.active);
        if (available.length === 0) return;
        
        // Spawn 2 or 3 moles at once
        const count = Math.min(available.length, Math.random() > 0.5 ? 3 : 2);
        
        for (let i = 0; i < count; i++) {
            const idx = Math.floor(Math.random() * available.length);
            const hole = available.splice(idx, 1)[0];
            const char = this.randomChar();
            
            hole.active = true;
            hole.char = char;
            hole.letterEl.textContent = char;
            hole.el.classList.remove('whacked');
            hole.el.classList.add('up');
            
            hole.timeout = setTimeout(() => {
                if (hole.active) {
                    hole.el.classList.remove('up');
                    hole.active = false;
                }
            }, 3000 + Math.random() * 1000); // 3-4 seconds before disappearing
        }
    },

    handleMoleInput(ch) {
        let hit = false;
        for (let i = 0; i < this._moleHoles.length; i++) {
            const hole = this._moleHoles[i];
            if (hole.active && hole.char.toLowerCase() === ch) {
                hit = true;
                hole.active = false;
                clearTimeout(hole.timeout);
                audioManager.playPop(); // Hammer whack sound
                
                // Spawn Hammer animation
                const hammer = document.createElement('div');
                hammer.className = 'hammer';
                hole.el.parentElement.appendChild(hammer);
                setTimeout(() => {
                    if (hammer.parentNode) hammer.parentNode.removeChild(hammer);
                }, 300);

                hole.el.classList.add('whacked');
                this.score += 100;
                this.updateScore();
                break;
            }
        }
        if (!hit) audioManager.playError();
    },

    // ===========================================================
    //  GAME 3: TYPING RUNNER 🐆
    // ===========================================================
    _runnerChar: null,
    startRunner() {
        const area = document.getElementById('balloon-area');
        area.classList.add('runner-bg');
        area.style.background = ''; // Managed by CSS
        
        const track = document.createElement('div');
        track.className = 'runner-track';
        area.appendChild(track);
        
        this._runnerChar = document.createElement('div');
        this._runnerChar.className = 'runner-char';
        area.appendChild(this._runnerChar);
        
        this.spawnInterval = setInterval(() => this.spawnHurdle(), 3000);
        
        this._startAnimLoop((delta) => {
            for (let i = this.items.length - 1; i >= 0; i--) {
                const b = this.items[i];
                if (!b.cleared) {
                    b.x -= b.speed * delta;
                    b.el.style.left = `${b.x}px`;
                    
                    // Hit the player?
                    if (b.x < 150 && b.x > 50) {
                        b.cleared = true; // effectively skipped/hit
                        audioManager.playError();
                        this._runnerChar.classList.add('stumble');
                        setTimeout(() => this._runnerChar.classList.remove('stumble'), 300);
                        
                        b.el.classList.add('cleared'); // knock it over
                        setTimeout(() => { if(b.el.parentNode) b.el.parentNode.removeChild(b.el); }, 500);
                        this.items.splice(i, 1);
                    }
                }
            }
        });
    },

    spawnHurdle() {
        if (!this.isPlaying) return;
        const area = document.getElementById('balloon-area');
        const char = this.randomChar();
        const el = document.createElement('div');
        el.className = 'hurdle';
        el.textContent = char;
        
        const startX = area.clientWidth;
        el.style.left = `${startX}px`;
        area.appendChild(el);
        
        this.items.push({ el, char, x: startX, speed: 100 + Math.random() * 50, cleared: false });
    },

    handleRunnerInput(ch) {
        // Find leftmost uncleared hurdle
        let idx = -1, leftmost = 9999;
        for (let i = 0; i < this.items.length; i++) {
            if (!this.items[i].cleared && this.items[i].char.toLowerCase() === ch && this.items[i].x < leftmost) {
                leftmost = this.items[i].x;
                idx = i;
            }
        }
        
        if (idx !== -1) {
            const b = this.items[idx];
            b.cleared = true;
            audioManager.playPop(); // jump sound
            
            // Jump animation
            this._runnerChar.classList.add('jump');
            setTimeout(() => this._runnerChar.classList.remove('jump'), 500);
            
            b.el.classList.add('cleared');
            setTimeout(() => { if(b.el.parentNode) b.el.parentNode.removeChild(b.el); }, 300);
            this.items.splice(idx, 1);
            
            this.score += 100;
            this.updateScore();
        } else {
            audioManager.playError();
        }
    },

    // ===========================================================
    //  GAME 4: SPACE DEFENDER 🛸
    // ===========================================================
    _spaceShip: null,
    startSpace() {
        const area = document.getElementById('balloon-area');
        area.classList.add('space-bg');
        area.style.background = ''; // Managed by CSS class
        
        this._spaceShip = document.createElement('div');
        this._spaceShip.className = 'space-ship';
        area.appendChild(this._spaceShip);
        
        this.spawnInterval = setInterval(() => this.spawnAsteroid(), 2500);
        
        this._startAnimLoop((delta) => {
            const shipX = area.clientWidth / 2;
            const shipY = area.clientHeight - 80;
            
            for (let i = this.items.length - 1; i >= 0; i--) {
                const b = this.items[i];
                if (b.destroyed) continue;
                
                // Move towards ship
                const dx = shipX - b.x;
                const dy = shipY - b.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < 60) {
                    // Hit ship!
                    b.destroyed = true;
                    audioManager.playError();
                    this._spaceShip.style.filter = 'brightness(2) drop-shadow(0 0 20px red)';
                    setTimeout(() => this._spaceShip.style.filter = '', 200);
                    
                    b.el.classList.add('destroyed');
                    setTimeout(() => { if(b.el.parentNode) b.el.parentNode.removeChild(b.el); }, 300);
                    this.items.splice(i, 1);
                    continue;
                }
                
                const vx = (dx / dist) * b.speed;
                const vy = (dy / dist) * b.speed;
                
                b.x += vx * delta;
                b.y += vy * delta;
                b.el.style.left = `${b.x}px`;
                b.el.style.top = `${b.y}px`;
            }
        });
    },

    spawnAsteroid() {
        if (!this.isPlaying) return;
        const area = document.getElementById('balloon-area');
        const char = this.randomChar();
        const el = document.createElement('div');
        el.className = 'asteroid';
        const wrap = document.createElement('div');
        wrap.className = 'letter-wrap';
        wrap.textContent = char;
        el.appendChild(wrap);
        
        // Spawn from top, top-left, top-right randomly
        let startX, startY;
        const edge = Math.random();
        if (edge < 0.33) {
            startX = -50; startY = Math.random() * 200;
        } else if (edge < 0.66) {
            startX = area.clientWidth + 50; startY = Math.random() * 200;
        } else {
            startX = Math.random() * area.clientWidth; startY = -50;
        }
        
        el.style.left = `${startX}px`;
        el.style.top = `${startY}px`;
        area.appendChild(el);
        
        this.items.push({ el, char, x: startX, y: startY, speed: 40 + Math.random() * 30, destroyed: false });
    },

    handleSpaceInput(ch) {
        // Find closest asteroid
        let idx = -1, closest = 999999;
        const area = document.getElementById('balloon-area');
        const shipX = area.clientWidth / 2;
        const shipY = area.clientHeight - 80;
        
        for (let i = 0; i < this.items.length; i++) {
            const b = this.items[i];
            if (!b.destroyed && b.char.toLowerCase() === ch) {
                const dx = shipX - b.x;
                const dy = shipY - b.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < closest) {
                    closest = dist;
                    idx = i;
                }
            }
        }
        
        if (idx !== -1) {
            const b = this.items[idx];
            b.destroyed = true;
            audioManager.playPop(); // Laser sound conceptually
            
            // Draw laser line
            const laser = document.createElement('div');
            laser.className = 'laser';
            
            const dx = b.x - shipX;
            const dy = b.y - (shipY - 60); // from top of ship
            const length = Math.sqrt(dx*dx + dy*dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            laser.style.height = `${length}px`;
            laser.style.left = `${shipX}px`;
            laser.style.top = `${shipY - 60 + dy/2 - length/2}px`;
            // Math for laser rotation passed to CSS
            laser.style.setProperty('--angle', `${angle + 90}deg`);
            
            area.appendChild(laser);
            setTimeout(() => { if(laser.parentNode) laser.parentNode.removeChild(laser); }, 200);
            
            b.el.classList.add('destroyed');
            setTimeout(() => { if(b.el.parentNode) b.el.parentNode.removeChild(b.el); }, 300);
            this.items.splice(idx, 1);
            
            this.score += 100;
            this.updateScore();
        } else {
            audioManager.playError();
        }
    },

    // ===========================================================
    //  SHARED HELPERS
    // ===========================================================
    _startAnimLoop(updateFn) {
        let lastTime = performance.now();
        const loop = (time) => {
            if (!this.isPlaying) return;
            const delta = (time - lastTime) / 1000;
            lastTime = time;
            updateFn(delta);
            this.gameLoop = requestAnimationFrame(loop);
        };
        this.gameLoop = requestAnimationFrame(loop);
    }
};
