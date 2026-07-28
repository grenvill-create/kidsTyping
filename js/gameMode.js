const gameMode = {
    lesson: null,
    score: 0,
    targetScore: 20,
    balloons: [],
    spawnInterval: null,
    gameLoop: null,
    isPlaying: false,

    colors: ['#FF9AA2', '#FFB347', '#FDFD96', '#77DD77', '#84B6F4', '#C3B1E1'],

    start(lesson) {
        this.lesson = lesson;
        this.score = 0;
        this.targetScore = 20;
        this.balloons = [];
        this.isPlaying = true;
        
        document.getElementById('game-title').textContent = lesson.title;
        document.getElementById('game-score').textContent = `Score: 0 / ${this.targetScore}`;
        document.getElementById('balloon-area').innerHTML = '';

        // Start spawning
        this.spawnInterval = setInterval(() => this.spawnBalloon(), 1500);
        
        // Game loop for moving balloons
        let lastTime = performance.now();
        const loop = (time) => {
            if (!this.isPlaying) return;
            const delta = (time - lastTime) / 1000;
            lastTime = time;
            this.update(delta);
            this.gameLoop = requestAnimationFrame(loop);
        };
        this.gameLoop = requestAnimationFrame(loop);
    },

    stop() {
        this.isPlaying = false;
        clearInterval(this.spawnInterval);
        cancelAnimationFrame(this.gameLoop);
        this.balloons.forEach(b => {
            if (b.el && b.el.parentNode) {
                b.el.parentNode.removeChild(b.el);
            }
        });
        this.balloons = [];
    },

    spawnBalloon() {
        if (!this.isPlaying) return;
        
        const area = document.getElementById('balloon-area');
        const width = area.clientWidth;
        
        // Pick a random char from lesson.chars
        const chars = this.lesson.chars || 'abcdefghijklmnopqrstuvwxyz';
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Pick random color
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        
        const el = document.createElement('div');
        el.className = 'balloon';
        el.textContent = char;
        el.style.backgroundColor = color;
        
        // Random horizontal position (padding 30px)
        const x = 30 + Math.random() * (width - 120);
        el.style.left = `${x}px`;
        
        area.appendChild(el);
        
        this.balloons.push({
            el: el,
            char: char,
            y: -100, // starting below
            speed: 80 + Math.random() * 50 // pixels per second
        });
    },

    update(delta) {
        const areaHeight = document.getElementById('balloon-area').clientHeight;
        
        for (let i = this.balloons.length - 1; i >= 0; i--) {
            const b = this.balloons[i];
            b.y += b.speed * delta;
            b.el.style.bottom = `${b.y}px`;
            
            // If it goes past top
            if (b.y > areaHeight + 100) {
                if (b.el.parentNode) b.el.parentNode.removeChild(b.el);
                this.balloons.splice(i, 1);
            }
        }
    },

    handleInput(inputChar) {
        if (!this.isPlaying) return;
        
        // Find lowest balloon with this char
        let targetIndex = -1;
        let lowestY = 9999;
        
        for (let i = 0; i < this.balloons.length; i++) {
            if (this.balloons[i].char === inputChar) {
                if (this.balloons[i].y < lowestY) {
                    lowestY = this.balloons[i].y;
                    targetIndex = i;
                }
            }
        }
        
        if (targetIndex !== -1) {
            // Pop it!
            const b = this.balloons[targetIndex];
            b.el.classList.add('popped');
            audioManager.playKey();
            
            this.balloons.splice(targetIndex, 1);
            
            setTimeout(() => {
                if (b.el.parentNode) b.el.parentNode.removeChild(b.el);
            }, 200);
            
            this.score++;
            document.getElementById('game-score').textContent = `Score: ${this.score} / ${this.targetScore}`;
            
            if (this.score >= this.targetScore) {
                this.win();
            }
        } else {
            audioManager.playError();
        }
    },

    win() {
        this.stop();
        audioManager.playSuccess();
        
        // 100% accuracy equivalent for games, 3 stars
        gameState.saveResult(this.lesson.id, 100, 30);
        
        rewardsManager.showResult({
            lessonId: this.lesson.id,
            accuracy: 100,
            wpm: 30
        });
    }
};
