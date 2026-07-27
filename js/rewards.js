const rewardsManager = {
    renderStickerBook() {
        const grid = document.getElementById('sticker-grid');
        grid.innerHTML = '';
        
        gameData.stickers.forEach(s => {
            const unlocked = gameState.unlockedStickers.includes(s.id);
            const el = document.createElement('div');
            el.className = `sticker-item ${unlocked ? 'unlocked' : 'locked'}`;
            
            el.innerHTML = `
                <div class="sticker-icon" style="font-size: 3rem;">${unlocked ? s.icon : '❓'}</div>
                <div class="sticker-name" style="font-weight: bold; margin-top: 0.5rem; color: var(--color-text-main);">${unlocked ? s.name : '???'}</div>
            `;
            
            // Simple styling for stickers in JS to avoid switching to CSS file again
            el.style.backgroundColor = unlocked ? 'white' : 'rgba(255,255,255,0.3)';
            el.style.borderRadius = 'var(--radius-md)';
            el.style.padding = '1rem';
            el.style.textAlign = 'center';
            el.style.boxShadow = unlocked ? '0 4px 10px rgba(0,0,0,0.1)' : 'none';
            el.style.filter = unlocked ? 'none' : 'grayscale(100%) opacity(0.5)';
            
            grid.appendChild(el);
        });
        
        // Grid styling
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))';
        grid.style.gap = '1rem';
        grid.style.padding = '2rem';
    }
};
