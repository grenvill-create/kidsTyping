const keyboardManager = {
    layout: [
        ['1','2','3','4','5','6','7','8','9','0'],
        ['q','w','e','r','t','y','u','i','o','p'],
        ['a','s','d','f','g','h','j','k','l',';'],
        ['z','x','c','v','b','n','m',',','.','/'],
    ],

    init() {
        const container = document.getElementById('virtual-keyboard');
        if (!container) return;
        container.innerHTML = '';

        this.layout.forEach(row => {
            const rowEl = document.createElement('div');
            rowEl.className = 'kb-row';
            row.forEach(ch => {
                const key = document.createElement('div');
                key.className = 'kb-key';
                key.id = `key-${this.keyId(ch)}`;
                key.dataset.zone = zoneMap[ch] || 'grey';
                key.textContent = ch;
                rowEl.appendChild(key);
            });
            container.appendChild(rowEl);
        });

        // Space bar row
        const spaceRow = document.createElement('div');
        spaceRow.className = 'kb-row';
        const spaceKey = document.createElement('div');
        spaceKey.className = 'kb-key space-key';
        spaceKey.id = 'key-space';
        spaceKey.dataset.zone = 'grey';
        spaceKey.textContent = 'SPACE';
        spaceRow.appendChild(spaceKey);
        container.appendChild(spaceRow);

        document.addEventListener('keydown', this._onKeyDown.bind(this));
        document.addEventListener('keyup', this._onKeyUp.bind(this));
    },

    keyId(ch) {
        if (ch === ' ') return 'space';
        if (ch === ';') return 'semicolon';
        if (ch === ',') return 'comma';
        if (ch === '.') return 'period';
        if (ch === '/') return 'slash';
        if (ch === "'") return 'quote';
        return ch;
    },

    _onKeyDown(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.ctrlKey || e.altKey || e.metaKey) return;

        // Prevent scrolling during game
        if (gameState.currentLessonId) {
            if (e.key === ' ' || e.key.length === 1) {
                e.preventDefault();
            }
        }

        let ch = e.key;
        if (ch === ' ') ch = ' ';
        else ch = ch.toLowerCase ? ch.toLowerCase() : ch;

        const keyEl = document.getElementById(`key-${this.keyId(ch)}`);
        if (keyEl) keyEl.classList.add('pressed');

        if (window.app && typeof app.handleInput === 'function') {
            app.handleInput(ch, e.shiftKey);
        }
    },

    _onKeyUp(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        let ch = e.key;
        if (ch === ' ') ch = ' ';
        else ch = ch.toLowerCase ? ch.toLowerCase() : ch;

        const keyEl = document.getElementById(`key-${this.keyId(ch)}`);
        if (keyEl) keyEl.classList.remove('pressed');
    },

    highlightKey(ch) {
        this.clearHighlights();
        if (!ch) return;
        const k = ch.toLowerCase ? ch.toLowerCase() : ch;
        const keyEl = document.getElementById(`key-${this.keyId(k)}`);
        if (keyEl) keyEl.classList.add('target');
    },

    clearHighlights() {
        document.querySelectorAll('.kb-key.target').forEach(el => el.classList.remove('target'));
    },

    highlightFinger(ch) {
        document.querySelectorAll('.finger.active').forEach(el => el.classList.remove('active'));
        if (!ch) return;
        const k = ch.toLowerCase ? ch.toLowerCase() : ch;
        const finger = fingerMap[k];
        if (finger) {
            const el = document.querySelector(`.finger[data-finger="${finger}"]`);
            if (el) el.classList.add('active');
        }
    }
};
