const gameData = {
    letters: [
        { char: 'a', word: 'Apple', icon: '🍎' },
        { char: 'b', word: 'Bear', icon: '🐻' },
        { char: 'c', word: 'Cat', icon: '🐱' },
        { char: 'd', word: 'Dog', icon: '🐶' },
        { char: 'e', word: 'Elephant', icon: '🐘' },
        { char: 'f', word: 'Fox', icon: '🦊' },
        { char: 'g', word: 'Giraffe', icon: '🦒' },
        { char: 'h', word: 'Horse', icon: '🐴' },
        { char: 'i', word: 'Ice Cream', icon: '🍦' },
        { char: 'j', word: 'Jellyfish', icon: '🪼' },
        { char: 'k', word: 'Kangaroo', icon: '🦘' },
        { char: 'l', word: 'Lion', icon: '🦁' },
        { char: 'm', word: 'Monkey', icon: '🐒' },
        { char: 'n', word: 'Nest', icon: '🪹' },
        { char: 'o', word: 'Owl', icon: '🦉' },
        { char: 'p', word: 'Pig', icon: '🐷' },
        { char: 'q', word: 'Queen', icon: '👸' },
        { char: 'r', word: 'Rabbit', icon: '🐰' },
        { char: 's', word: 'Sun', icon: '☀️' },
        { char: 't', word: 'Tiger', icon: '🐯' },
        { char: 'u', word: 'Umbrella', icon: '☔' },
        { char: 'v', word: 'Volcano', icon: '🌋' },
        { char: 'w', word: 'Whale', icon: '🐳' },
        { char: 'x', word: 'Xylophone', icon: '🎹' },
        { char: 'y', word: 'Yak', icon: '🐂' },
        { char: 'z', word: 'Zebra', icon: '🦓' }
    ],
    words: [
        { word: 'cat', icon: '🐱' },
        { word: 'dog', icon: '🐶' },
        { word: 'pig', icon: '🐷' },
        { word: 'fox', icon: '🦊' },
        { word: 'sun', icon: '☀️' },
        { word: 'bug', icon: '🐛' },
        { word: 'bee', icon: '🐝' },
        { word: 'red', icon: '🔴' },
        { word: 'bus', icon: '🚌' },
        { word: 'car', icon: '🚗' },
        { word: 'hat', icon: '🎩' },
        { word: 'cup', icon: '☕' }
    ],
    stickers: [
        { id: 's1', icon: '🐻', name: 'Bear' },
        { id: 's2', icon: '🦊', name: 'Fox' },
        { id: 's3', icon: '🦁', name: 'Lion' },
        { id: 's4', icon: '🐰', name: 'Rabbit' },
        { id: 's5', icon: '🐯', name: 'Tiger' },
        { id: 's6', icon: '🐳', name: 'Whale' }
    ],
    levels: {
        letter: [
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'], // Middle row
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'], // Top row
            ['z', 'x', 'c', 'v', 'b', 'n', 'm'], // Bottom row
            [] // Random 26 (handled dynamically in letterMode)
        ],
        word: [
            ['cat', 'dog', 'pig'],
            ['sun', 'bug', 'bee'],
            ['red', 'bus', 'car'],
            ['hat', 'cup', 'fox']
        ],
        balloon: [
            { speed: 8000, maxBalloons: 1 },
            { speed: 6000, maxBalloons: 2 },
            { speed: 5000, maxBalloons: 3 }
        ]
    }
};
