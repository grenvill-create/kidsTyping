# 🌟 Kids Typing Adventure

A fun, interactive, colorful, and audio-guided English typing game specially designed for kids (ages 5+).

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green.style=for-the-badge)

---

## 🚀 Live Demo / GitHub Pages

Experience the game online:
👉 **[Play Kids Typing Adventure Online](https://grenvill-create.github.io/kidsTyping/)**

*(Note: Enable sound on your computer for the full audio-guided experience!)*

---

## ✨ Features

- **🌈 1:1 QWERTY Rainbow Virtual Keyboard**:
  - Color-coded finger zones (Pink, Orange, Yellow, Green, Blue, Purple) to help kids easily map screen letters to physical keyboard keys.
  - Active key pulsing animation for easy visual guidance.
  - Case-insensitive typing (works regardless of `Caps Lock` status).
- **🔊 Audio & Speech Synthesis**:
  - Native US English pronunciation for letters ("A says /æ/ for Apple") and CVC vocabulary.
  - Fun pop sound effects and celebration tunes powered by Web Audio API.
- **🎮 3 Fun Game Modes**:
  1. **🔤 Letter Explorer**: Progressive 4-level alphabet learning starting from Home Row keys (`A S D F J K L`).
  2. **🐶 Word Cards**: CVC 3-letter word spelling (`CAT`, `DOG`, `SUN`, `BUS`) with instant letter-slot lighting.
  3. **🎈 Balloon Pop Arcade**: Pop floating letter balloons before they reach the top!
- **🏆 Reward System**:
  - Earn 3 stars per level.
  - Unlock cute animal stickers saved to your browser (`localStorage`).
  - Eye-care rest break reminders after 10 minutes of continuous play.

---

## 🛠️ How to Deploy on GitHub Pages

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Deploy Kids Typing Adventure to GitHub Pages"
   git push origin main
   ```
2. On GitHub, go to your repository **Settings** -> **Pages**.
3. Under **Build and deployment** -> **Branch**, select `main` branch and `/ (root)` folder.
4. Click **Save**. Your site will be live at `https://<your-username>.github.io/kidsTyping/` in a few minutes!

---

## 📁 Project Structure

```
kidsTyping/
├── index.html            # Main HTML layout & Web SEO metadata
├── css/
│   ├── variables.css     # Design tokens (Colors, Radii, Fonts)
│   ├── base.css          # Layout & Reset
│   ├── components.css    # Buttons, Modals, Cards, Progress Bars
│   ├── keyboard.css      # Responsive Rainbow Keyboard Styles
│   └── animations.css   # Keyframe Animations & Particles
├── js/
│   ├── data.js           # Alphabet & Vocabulary Database
│   ├── state.js          # Game State & LocalStorage Manager
│   ├── audio.js          # Web Audio & SpeechSynthesis Engine
│   ├── keyboard.js       # Physical & Virtual Keyboard Controller
│   ├── letterMode.js     # Mode 1: Letter Explorer Logic
│   ├── wordMode.js       # Mode 2: Word Cards Logic
│   ├── balloonMode.js    # Mode 3: Canvas Balloon Arcade Engine
│   ├── rewards.js        # Sticker Book & Rewards Renderer
│   └── app.js            # Main Controller & Router
├── README.md
└── .gitignore
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
