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
];
