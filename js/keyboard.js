const keyboardManager = {
    layout: [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    ],
    zones: {
        'q':'pink', 'a':'pink', 'z':'pink',
        'w':'orange', 's':'orange', 'x':'orange',
        'e':'yellow', 'd':'yellow', 'c':'yellow',
        'r':'green', 'f':'green', 'v':'green', 't':'green', 'g':'green', 'b':'green',
        'y':'blue', 'h':'blue', 'n':'blue', 'u':'blue', 'j':'blue', 'm':'blue',
        'i':'purple', 'k':'purple', 'o':'purple', 'l':'purple', 'p':'purple'
    },
    
    init() {
        const container = document.getElementById('virtual-keyboard');
        if(!container) return;
        container.innerHTML = '';
        
        this.layout.forEach(row => {
            const rowEl = document.createElement('div');
            rowEl.className = 'kb-row';
            row.forEach(char => {
                const keyEl = document.createElement('div');
                keyEl.className = 'kb-key';
                keyEl.id = `key-${char}`;
                keyEl.dataset.zone = this.zones[char] || 'blue';
                keyEl.textContent = char;
                rowEl.appendChild(keyEl);
            });
            container.appendChild(rowEl);
        });
        
        document.addEventListener('keydown', this.handleGlobalKeyDown.bind(this));
        document.addEventListener('keyup', this.handleGlobalKeyUp.bind(this));
    },
    
    handleGlobalKeyDown(e) {
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        
        const char = e.key.toLowerCase();
        if (/^[a-z]$/.test(char) || e.key === ' ') {
            if (gameState.currentMode) {
                e.preventDefault(); // Prevent accidental browser scrolling or shortcuts
            }
        }
        
        if (/^[a-z]$/.test(char)) {
            const keyEl = document.getElementById(`key-${char}`);
            if (keyEl) keyEl.classList.add('pressed');
            
            if (window.app && typeof app.handleInput === 'function') {
                app.handleInput(char);
            }
        }
    },
    
    handleGlobalKeyUp(e) {
        const char = e.key.toLowerCase();
        if (/^[a-z]$/.test(char)) {
            const keyEl = document.getElementById(`key-${char}`);
            if (keyEl) keyEl.classList.remove('pressed');
        }
    },
    
    highlightKey(char) {
        this.clearHighlights();
        if (!char) return;
        const keyEl = document.getElementById(`key-${char.toLowerCase()}`);
        if (keyEl) keyEl.classList.add('target');
    },
    
    clearHighlights() {
        document.querySelectorAll('.kb-key.target').forEach(el => el.classList.remove('target'));
        document.querySelectorAll('.kb-key.error-shake').forEach(el => el.classList.remove('error-shake'));
    },
    
    showError(char) {
        if (!char) return;
        const keyEl = document.getElementById(`key-${char.toLowerCase()}`);
        if (keyEl) {
            keyEl.classList.remove('error-shake');
            void keyEl.offsetWidth; // trigger reflow
            keyEl.classList.add('error-shake');
        }
    }
};
