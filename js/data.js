/*  ============================================================
    data.js — 30-Lesson Typing Course + Finger / Zone Mappings
    ============================================================ */

/* ---- key → finger mapping ---- */
const fingerMap = {
    '`':'lp','1':'lp','2':'lr','3':'lm','4':'li','5':'li',
    '6':'ri','7':'ri','8':'rm','9':'rr','0':'rp',
    '-':'rp','=':'rp',
    'q':'lp','w':'lr','e':'lm','r':'li','t':'li',
    'y':'ri','u':'ri','i':'rm','o':'rr','p':'rp',
    '[':'rp',']':'rp','\\':'rp',
    'a':'lp','s':'lr','d':'lm','f':'li','g':'li',
    'h':'ri','j':'ri','k':'rm','l':'rr',';':'rp',
    "'": 'rp',
    'z':'lp','x':'lr','c':'lm','v':'li','b':'li',
    'n':'ri','m':'ri',',':'rm','.':'rr','/':'rp',
    ' ':'rt'
};

/* ---- key → keyboard color zone ---- */
const zoneMap = {
    '`':'pink','1':'pink','q':'pink','a':'pink','z':'pink',
    '2':'orange','w':'orange','s':'orange','x':'orange',
    '3':'yellow','e':'yellow','d':'yellow','c':'yellow',
    '4':'green','r':'green','f':'green','v':'green',
    '5':'green','t':'green','g':'green','b':'green',
    '6':'blue','y':'blue','h':'blue','n':'blue',
    '7':'blue','u':'blue','j':'blue','m':'blue',
    '8':'teal','i':'teal','k':'teal',',':'teal',
    '9':'purple','o':'purple','l':'purple','.':'purple',
    '0':'rose','p':'rose',';':'rose','/':'rose',
    '-':'rose','=':'rose','[':'rose',']':'rose',
    "'": 'rose', '\\':'rose',
    ' ':'grey'
};

/* ---- 30 Lessons ----
   Each lesson has:
     id       – lesson number
     title    – displayed name
     newKeys  – keys introduced in this lesson (for display)
     chars    – all characters available for random drill generation
     drills   – predefined drill lines (3-5 lines per lesson)
*/
const lessons = [
    // ===== Stage 1: Home Row =====
    {
        id: 1, title: 'Home Keys: F and J', newKeys: ['f','j'],
        chars: 'fj',
        drills: [
            'fff jjj fff jjj fff jjj',
            'fjf jfj fjf jfj fjf jfj',
            'ffjj jjff fjfj jfjf ffjj',
        ]
    },
    {
        id: 2, title: 'Home Keys: D and K', newKeys: ['d','k'],
        chars: 'fjdk',
        drills: [
            'ddd kkk ddd kkk ddd kkk',
            'dkd kdk fdk jkf dkfj',
            'ffd jjk ddk ffj dkfj jkdf',
        ]
    },
    {
        id: 3, title: 'Home Keys: S and L', newKeys: ['s','l'],
        chars: 'fjdksl',
        drills: [
            'sss lll sss lll sss lll',
            'sls lsl fds jkl sdf lkj',
            'flask salad falls flask sad',
        ]
    },
    {
        id: 4, title: 'Home Keys: A and ;', newKeys: ['a',';'],
        chars: 'fjdksla;',
        drills: [
            'aaa ;;; aaa ;;; aaa ;;;',
            'asd ;lk fad; ja; las; fads;',
            'ask dad; fall lad; salad;',
        ]
    },
    {
        id: 5, title: 'Home Keys: G and H', newKeys: ['g','h'],
        chars: 'fjdksla;gh',
        drills: [
            'ggg hhh ggg hhh ggg hhh',
            'fgf jhj ghgh hghg fg jh',
            'gash dash hash lash glad shall',
        ]
    },
    {
        id: 6, title: 'Home Row Review', newKeys: [],
        chars: 'fjdksla;gh',
        drills: [
            'a lad had a glass flask;',
            'dad shall add half a salad;',
            'a glad gal has a dash;',
            'ask all lads; half shall fall;',
        ]
    },

    // ===== Stage 2: Top Row =====
    {
        id: 7, title: 'Top Row: R and U', newKeys: ['r','u'],
        chars: 'fjdksla;ghru',
        drills: [
            'rrr uuu rrr uuu rrr uuu',
            'fur ruf rug dug rude rusk',
            'rush dusk hardfulls sugar',
        ]
    },
    {
        id: 8, title: 'Top Row: E and I', newKeys: ['e','i'],
        chars: 'fjdksla;ghruei',
        drills: [
            'eee iii eee iii eee iii',
            'die fie rid hid like ride',
            'his desire is like fire',
        ]
    },
    {
        id: 9, title: 'Top Row: W and O', newKeys: ['w','o'],
        chars: 'fjdksla;ghrueiwo',
        drills: [
            'www ooo www ooo www ooo',
            'wow low row how slow grow',
            'work words would follow good',
        ]
    },
    {
        id: 10, title: 'Top Row: Q and P', newKeys: ['q','p'],
        chars: 'fjdksla;ghrueiwoqp',
        drills: [
            'qqq ppp qqq ppp qqq ppp',
            'quip quop equip proof loop',
            'please pause properequip;',
        ]
    },
    {
        id: 11, title: 'Top Row: T and Y', newKeys: ['t','y'],
        chars: 'fjdksla;ghrueiwoqpty',
        drills: [
            'ttt yyy ttt yyy ttt yyy',
            'try yet stay your truly',
            'they reply with your story',
        ]
    },
    {
        id: 12, title: 'Top Row Review', newKeys: [],
        chars: 'fjdksla;ghrueiwoqpty',
        drills: [
            'the quick dog walks forward',
            'your story is quite pretty',
            'why do we study our words;',
            'people write good qualities',
        ]
    },
    {
        id: 13, title: 'Capital Letters: Shift', newKeys: ['Shift'],
        chars: 'fjdksla;ghrueiwoqpty',
        drills: [
            'The First Tall Sky World;',
            'Please Help Your Dad Sir;',
            'George Likes Pretty Fish;',
            'Quiet People Work Together;',
        ]
    },

    // ===== Stage 3: Bottom Row =====
    {
        id: 14, title: 'Bottom Row: V and M', newKeys: ['v','m'],
        chars: 'fjdksla;ghrueiwoqptyvm',
        drills: [
            'vvv mmm vvv mmm vvv mmm',
            'vim move veil movie vim',
            'my movie provide volume',
        ]
    },
    {
        id: 15, title: 'Bottom Row: C and Comma', newKeys: ['c',','],
        chars: 'fjdksla;ghrueiwoqptyvm,c',
        drills: [
            'ccc ,,, ccc ,,, ccc ,,,',
            'cat, cup, car, mice, come,',
            'pick a color, cut, compose,',
        ]
    },
    {
        id: 16, title: 'Bottom Row: X and Period', newKeys: ['x','.'],
        chars: 'fjdksla;ghrueiwoqptyvm,cx.',
        drills: [
            'xxx ... xxx ... xxx ...',
            'fix. six. mix. exit. fox.',
            'explore text. extra exist.',
        ]
    },
    {
        id: 17, title: 'Bottom Row: Z and /', newKeys: ['z','/'],
        chars: 'fjdksla;ghrueiwoqptyvm,cx.z/',
        drills: [
            'zzz /// zzz /// zzz ///',
            'zip zap zero zigzag zone',
            'fizz quiz lazy/dizzy zoom',
        ]
    },
    {
        id: 18, title: 'Bottom Row: B and N', newKeys: ['b','n'],
        chars: 'fjdksla;ghrueiwoqptyvm,cx.z/bn',
        drills: [
            'bbb nnn bbb nnn bbb nnn',
            'bin ban bone nine brown',
            'bring noble number cabin',
        ]
    },
    {
        id: 19, title: 'Bottom Row Review', newKeys: [],
        chars: 'fjdksla;ghrueiwoqptyvm,cx.z/bn',
        drills: [
            'black magic, zen vibes.',
            'combine the next puzzle/',
            'amazing, complex boxes.',
            'brave monks visit caves.',
        ]
    },

    // ===== Stage 4: Numbers & Symbols =====
    {
        id: 20, title: 'Numbers: 1 2 3', newKeys: ['1','2','3'],
        chars: '123fjdksla',
        drills: [
            '111 222 333 123 321 132',
            'add 12 and 31 and 23;',
            '123 213 312 132 231 321',
        ]
    },
    {
        id: 21, title: 'Numbers: 4 5 6 7', newKeys: ['4','5','6','7'],
        chars: '1234567fjdksla',
        drills: [
            '444 555 666 777 456 567',
            '1234567 7654321 1357 2467',
            'sell 45 and 67 for 123;',
        ]
    },
    {
        id: 22, title: 'Numbers: 8 9 0', newKeys: ['8','9','0'],
        chars: '1234567890fjdksla',
        drills: [
            '888 999 000 890 908 098',
            '1234567890 0987654321',
            'dial 456 or 7890 soon;',
        ]
    },
    {
        id: 23, title: 'Symbols: ! ? \'', newKeys: ['!','?',"'"],
        chars: "fjdksla;ghrueiwoqptyvm,cx.z/bn",
        drills: [
            "Hello! How are you?",
            "It's a great day, isn't it?",
            "What? Where? Why? Who?",
            "Let's go! That's amazing!",
        ]
    },

    // ===== Stage 5: Words & Sentences =====
    {
        id: 24, title: 'Easy Words', newKeys: [],
        chars: '',
        drills: [
            'the cat sat on a mat',
            'a big red dog ran fast',
            'she had six toy cups',
            'we like to run and jump',
        ]
    },
    {
        id: 25, title: 'Animal Sentences', newKeys: [],
        chars: '',
        drills: [
            'a quick brown fox jumps',
            'lazy dogs sleep on rugs',
            'birds fly over the lake',
            'fish swim in cool water',
        ]
    },
    {
        id: 26, title: 'Daily Sentences', newKeys: [],
        chars: '',
        drills: [
            'I like to play games.',
            'She reads books at home.',
            'We go to school by bus.',
            'He drinks milk every day.',
        ]
    },
    {
        id: 27, title: 'Longer Sentences', newKeys: [],
        chars: '',
        drills: [
            'The sun is up. Let us go!',
            'My dad makes good food.',
            'We play in the park today.',
        ]
    },
    {
        id: 28, title: 'Mixed Practice', newKeys: [],
        chars: '',
        drills: [
            'She has 3 cats and 2 dogs.',
            'I ate 5 apples yesterday.',
            'Call me at 7890 today!',
        ]
    },
    {
        id: 29, title: 'Speed Challenge', newKeys: [],
        chars: '',
        drills: [
            'Quick! Can you type fast?',
            'The five boxing wizards jump.',
            'Pack my box with jugs.',
        ]
    },
    {
        id: 30, title: 'Final Test', newKeys: [],
        chars: '',
        drills: [
            'The quick brown fox jumps over the lazy dog.',
            'Pack my box with five dozen jugs.',
            'How quickly jumping zebras vex!',
        ]
    },

    // ===== Stage 6: Review & Reinforce =====
    {
        id: 31, title: 'Home Row Mastery', newKeys: [],
        chars: 'fjdksla;gh',
        drills: [
            'flash flash dash dash lash lash',
            'a glad lad had a salad half;',
            'shall dad add glass flask;',
            'hash gash lash flash dash;',
        ]
    },
    {
        id: 32, title: 'Top Row Mastery', newKeys: [],
        chars: 'qwertyuiop',
        drills: [
            'quite pretty poetry wire type',
            'you write your quiet report',
            'we power up your equipment',
            'ripe fruit quip true require',
        ]
    },
    {
        id: 33, title: 'Bottom Row Mastery', newKeys: [],
        chars: 'zxcvbnm,./',
        drills: [
            'zinc box cave next combine',
            'buzz Mexico vacant zinc',
            'Mexico. combine, zinc/box.',
            'vacant, combine, maximize.',
        ]
    },
    {
        id: 34, title: 'Number Row Mastery', newKeys: [],
        chars: '1234567890',
        drills: [
            '10 20 30 40 50 60 70 80 90',
            '123 456 789 012 345 678 901',
            '99 88 77 66 55 44 33 22 11',
        ]
    },
    {
        id: 35, title: 'Left Hand Focus', newKeys: [],
        chars: 'qwertasdfgzxcvb12345',
        drills: [
            'great fast west red raft beast',
            'exact grace brave create fact',
            'extract treat craft draft vest',
        ]
    },
    {
        id: 36, title: 'Right Hand Focus', newKeys: [],
        chars: 'yuiophjkl;nm,./67890',
        drills: [
            'only link join him pull milk',
            'upon you; monopoly hook lion;',
            'opinion million union; junior',
        ]
    },

    // ===== Stage 7: Common Words =====
    {
        id: 37, title: 'Top 20 Words', newKeys: [],
        chars: '',
        drills: [
            'the of and a to in is you',
            'that it he was for on are',
            'as with his they I at be this',
        ]
    },
    {
        id: 38, title: 'Action Words', newKeys: [],
        chars: '',
        drills: [
            'run jump walk talk play read',
            'write sing dance think swim',
            'climb push pull open close look',
            'listen help make build learn fly',
        ]
    },
    {
        id: 39, title: 'Describing Words', newKeys: [],
        chars: '',
        drills: [
            'big small tall short fast slow',
            'happy sad funny brave kind smart',
            'bright dark warm cool fresh strong',
        ]
    },
    {
        id: 40, title: 'School Words', newKeys: [],
        chars: '',
        drills: [
            'teacher student pencil eraser',
            'classroom homework library book',
            'science history math English art',
            'computer keyboard mouse screen',
        ]
    },
    {
        id: 41, title: 'Food Words', newKeys: [],
        chars: '',
        drills: [
            'apple banana orange grape cherry',
            'pizza bread butter cheese milk',
            'chicken salad sandwich cookie cake',
        ]
    },
    {
        id: 42, title: 'Nature Words', newKeys: [],
        chars: '',
        drills: [
            'mountain river forest ocean sky',
            'flower garden rainbow sunshine cloud',
            'butterfly dolphin elephant penguin',
        ]
    },

    // ===== Stage 8: Short Paragraphs =====
    {
        id: 43, title: 'My Pet', newKeys: [],
        chars: '',
        drills: [
            'I have a small cat. Her name is Mimi.',
            'She likes to play with a red ball.',
            'Mimi sleeps on my bed every night.',
        ]
    },
    {
        id: 44, title: 'At the Park', newKeys: [],
        chars: '',
        drills: [
            'We go to the park on Sunday.',
            'I like to swing and slide there.',
            'My friend and I play catch too.',
            'The park is our favorite place.',
        ]
    },
    {
        id: 45, title: 'My Family', newKeys: [],
        chars: '',
        drills: [
            'My family has four people in it.',
            'Dad cooks dinner every evening.',
            'Mom reads stories before bed.',
            'My sister and I do homework together.',
        ]
    },
    {
        id: 46, title: 'Weather Report', newKeys: [],
        chars: '',
        drills: [
            'Today is sunny and warm outside.',
            'The wind blows gently through trees.',
            'Tomorrow it may rain in the afternoon.',
            'Remember to bring your umbrella!',
        ]
    },
    {
        id: 47, title: 'Birthday Party', newKeys: [],
        chars: '',
        drills: [
            'Today is my birthday! I am so happy.',
            'We have a big cake with 7 candles.',
            'My friends gave me nice presents.',
            'We played games until it was dark.',
        ]
    },
    {
        id: 48, title: 'Going to School', newKeys: [],
        chars: '',
        drills: [
            'I wake up at 7 o\'clock every morning.',
            'I brush my teeth and eat breakfast.',
            'The school bus arrives at 8 o\'clock.',
            'My favorite class is art and music!',
        ]
    },

    // ===== Stage 9: Mixed Challenge =====
    {
        id: 49, title: 'Numbers in Sentences', newKeys: [],
        chars: '',
        drills: [
            'There are 26 letters in English.',
            'A year has 12 months and 365 days.',
            'She scored 98 out of 100 on her test!',
        ]
    },
    {
        id: 50, title: 'Punctuation Practice', newKeys: [],
        chars: '',
        drills: [
            'Hello! How are you doing today?',
            'Wow, that\'s amazing! Can you believe it?',
            'Yes, I can; no, he can\'t. Why not?',
            'Wait... are you sure? Let\'s go!',
        ]
    },
    {
        id: 51, title: 'Capital Letters Mix', newKeys: [],
        chars: '',
        drills: [
            'New York, London, Tokyo, and Paris.',
            'January, February, March, April.',
            'Monday is the start of the week.',
            'Dr. Smith lives on Oak Street.',
        ]
    },
    {
        id: 52, title: 'Email & Web Words', newKeys: [],
        chars: '',
        drills: [
            'Send me an email at hello today.',
            'Visit the website for more info.',
            'Click the link and download it.',
            'Type your password carefully.',
        ]
    },
    {
        id: 53, title: 'Mixed Symbols', newKeys: [],
        chars: '',
        drills: [
            'Price: 5 dollars and 99 cents.',
            'Call 123-456-7890 for details.',
            'Open from 9:00 to 5:00 daily.',
            'Score: 15/20. Grade: A. Great!',
        ]
    },
    {
        id: 54, title: 'Dialogue Practice', newKeys: [],
        chars: '',
        drills: [
            '"Hi there!" said Tom happily.',
            '"What time is it?" asked Mary.',
            '"It\'s 3 o\'clock," replied Dad.',
            '"Let\'s go play outside!" she said.',
        ]
    },

    // ===== Stage 10: Speed Challenge =====
    {
        id: 55, title: 'Tongue Twisters 1', newKeys: [],
        chars: '',
        drills: [
            'She sells seashells by the seashore.',
            'Peter Piper picked a peck of peppers.',
            'How much wood would a woodchuck chuck?',
        ]
    },
    {
        id: 56, title: 'Tongue Twisters 2', newKeys: [],
        chars: '',
        drills: [
            'Betty Botter bought some butter.',
            'Red lorry, yellow lorry, red lorry.',
            'Fuzzy Wuzzy was a bear. Fuzzy had no hair.',
        ]
    },
    {
        id: 57, title: 'Famous Quotes', newKeys: [],
        chars: '',
        drills: [
            'To be or not to be, that is the question.',
            'All you need is love. Love is all you need.',
            'The only way to do great work is to love it.',
        ]
    },
    {
        id: 58, title: 'Story Paragraph', newKeys: [],
        chars: '',
        drills: [
            'Once upon a time, in a land far away,',
            'there lived a brave young knight.',
            'He set out on a quest to find the golden key.',
            'Along the way, he made many friends.',
        ]
    },
    {
        id: 59, title: 'Science Fun Facts', newKeys: [],
        chars: '',
        drills: [
            'The Earth orbits the Sun in 365 days.',
            'Light travels at 300,000 km per second.',
            'Water boils at 100 degrees Celsius.',
            'The human body has 206 bones inside.',
        ]
    },
    {
        id: 60, title: 'Grand Finale!', newKeys: [],
        chars: '',
        drills: [
            'Congratulations! You have learned to type!',
            'The quick brown fox jumps over the lazy dog.',
            'Pack my box with five dozen liquor jugs.',
            'How vexingly quick daft zebras jump!',
            'You are now a typing champion! Well done!',
        ]
    },
];

/* ---- Inject Game Nodes ---- */
const gameTypes = ['balloon', 'rain', 'speed', 'target'];
const gameIcons = {balloon: '🎈', rain: '🌧️', speed: '⚡', target: '🎯'};
const gameNames = {balloon: 'Balloon Pop', rain: 'Rain Catcher', speed: 'Speed Typing', target: 'Target Practice'};

// Insert a game after every 5th lesson
const allLessonIds = lessons.map(l => l.id);
let gameIndex = 0;
for (let i = 0; i < allLessonIds.length; i++) {
    const lid = allLessonIds[i];
    if (typeof lid === 'number' && lid % 5 === 0) {
        const spliceIdx = lessons.findIndex(l => l.id === lid);
        if (spliceIdx !== -1) {
            const gt = gameTypes[gameIndex % gameTypes.length];
            lessons.splice(spliceIdx + 1, 0, {
                id: 'g' + lid,
                type: 'game',
                gameType: gt,
                title: gameIcons[gt] + ' ' + gameNames[gt],
                chars: lessons[spliceIdx].chars
            });
            gameIndex++;
        }
    }
}

