const balloonMode = {
    canvas: null,
    ctx: null,
    balloons: [],
    settings: null,
    animationId: null,
    balloonsPopped: 0,
    targetPops: 10,
    lastSpawnTime: 0,
    
    start(levelIndex) {
        this.settings = gameData.levels.balloon[levelIndex];
        this.balloonsPopped = 0;
        this.balloons = [];
        this.lastSpawnTime = 0;
        
        const playArea = document.getElementById('play-area');
        playArea.innerHTML = `<canvas id="balloon-canvas"></canvas>`;
        this.canvas = document.getElementById('balloon-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.resize();
        window.addEventListener('resize', this.resize.bind(this));
        
        app.updateProgress(0);
        this.gameLoop();
    },
    
    resize() {
        if (!this.canvas) return;
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
    },
    
    spawnBalloon() {
        const letters = gameData.letters;
        const letter = letters[Math.floor(Math.random() * letters.length)];
        const radius = 40;
        const x = Math.random() * (this.canvas.width - radius * 2) + radius;
        const y = this.canvas.height + radius;
        
        const colors = ['#FF9A9E', '#FECFEF', '#A18CD1', '#BAFFC9', '#FFFFBA'];
        
        this.balloons.push({
            char: letter.char,
            x: x,
            y: y,
            radius: radius,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: this.canvas.height / (this.settings.speed / 16) // pixels per frame roughly
        });
    },
    
    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const now = Date.now();
        if (this.balloons.length < this.settings.maxBalloons && now - this.lastSpawnTime > 1500) {
            this.spawnBalloon();
            this.lastSpawnTime = now;
        }
        
        for (let i = this.balloons.length - 1; i >= 0; i--) {
            const b = this.balloons[i];
            b.y -= b.speed;
            
            // Draw balloon
            this.ctx.beginPath();
            this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = b.color;
            this.ctx.fill();
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Draw letter
            this.ctx.fillStyle = '#333';
            this.ctx.font = 'bold 30px Fredoka';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(b.char.toUpperCase(), b.x, b.y);
            
            // Remove if off screen
            if (b.y < -b.radius) {
                this.balloons.splice(i, 1);
            }
        }
        
        this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
    },
    
    handleInput(char) {
        for (let i = 0; i < this.balloons.length; i++) {
            if (this.balloons[i].char === char) {
                this.popBalloon(i);
                return;
            }
        }
        // Incorrect press, no penalty.
    },
    
    popBalloon(index) {
        audioManager.playPop();
        this.balloons.splice(index, 1);
        this.balloonsPopped++;
        app.updateProgress(this.balloonsPopped / this.targetPops);
        
        if (this.balloonsPopped >= this.targetPops) {
            cancelAnimationFrame(this.animationId);
            setTimeout(() => {
                app.levelComplete();
            }, 1000);
        }
    },
    
    cleanup() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        window.removeEventListener('resize', this.resize.bind(this));
        this.canvas = null;
    }
};
