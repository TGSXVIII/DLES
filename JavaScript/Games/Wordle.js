let word = "";
let currentGuess = "";
let currentRow = 0;
let previousGuesses = [];
let words = [];
let wordList = [];
let currentLanguage = "";

//------ Document ------//

document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();

    if (key === "enter" && currentGuess.length === 5) {
        checkGuess();
    } else if (key === "backspace") {
        currentGuess = currentGuess.slice(0, -1);
        updateBoard();
    } else if (/^[a-záéíóúüñ]$/.test(key)) {
        handleKeyPress(key);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const backButton = document.getElementById('back-button');
    backButton.addEventListener('click', () => {
        document.getElementById('game').style.display = 'none';
        document.getElementById('language-buttons').style.display = 'block';
        clearBoard();
        clearKeyboard();
    });

    // Add event listeners for language buttons
    document.getElementById('english-button').addEventListener('click', startEnglishGame);
    document.getElementById('german-button').addEventListener('click', startGermanGame);
    document.getElementById('spanish-button').addEventListener('click', startSpanishGame);
});

//------ Load ------//

async function startEnglishGame() {
    currentLanguage = "english";
    await loadEnglishWords();
    startGame();
}

async function startGermanGame() {
    currentLanguage = "german";
    await loadGermanWords();
    startGame();
}

async function startSpanishGame() {
    currentLanguage = "spanish";
    await loadSpanishWords();
    startGame();
}

async function loadEnglishWords() {
    await loadWords("/Lists/Wordle (english)/answerlist.txt");
}

async function loadGermanWords() {
    await loadWords("/Lists/Wordle (german)/answerlist.txt");
}

async function loadSpanishWords() {
    await loadWords("/Lists/Wordle (spanish)/answerlist.txt");
}

async function loadWords(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        words = text.split("\n").map(word => word.trim()).filter(word => word.length > 0);
        wordList = [...words];
    } catch (error) {
        console.error("Failed to load words:", error);
    }
}

function startGame() {
    word = words[Math.floor(Math.random() * words.length)];
    createBoard();
    createKeyboard(currentLanguage);
    document.getElementById('game').style.display = 'block';
    document.getElementById('language-buttons').style.display = 'none';
}

//------ Check ------//

function isInWordList(guess) {
    return wordList.includes(guess.toLowerCase());
}

function checkGuess() {
    const guess = currentGuess.toLowerCase();
    const normalizedGuess = normalizeWord(guess);
    const normalizedWord = normalizeWord(word);
    const letterCounts = {};
    const usedKeys = new Set();

    if (!isInWordList(guess)) {
        alert("That isn't a word in the word list. Try again.");
        clearRow();
        return;
    }

    if (previousGuesses.includes(guess)) {
        alert("You've already guessed that word. Try a different one.");
        clearRow();
        return;
    }

    previousGuesses.push(guess);

    // First pass: mark all correct letters
    for (let i = 0; i < 5; i++) {
        if (normalizedGuess[i] === normalizedWord[i]) {
            const tile = document.getElementById(`tile-${currentRow}-${i}`);
            const keyElement = document.getElementById(`key-${guess[i]}`);

            tile.classList.add("correct");
            keyElement.classList.remove("present", "absent");
            keyElement.classList.add("correct");

            if (!letterCounts[normalizedWord[i]]) {
                letterCounts[normalizedWord[i]] = 0;
            }
            letterCounts[normalizedWord[i]]++;
        }
    }

    // Second pass: mark present letters
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        const keyElement = document.getElementById(`key-${guess[i]}`);

        if (!tile.classList.contains("correct")) {
            if (normalizedWord.includes(normalizedGuess[i]) && letterCounts[normalizedGuess[i]] > 0) {
                tile.classList.add("present");
                if (!keyElement.classList.contains("correct")) {
                    keyElement.classList.remove("absent");
                    keyElement.classList.add("present");
                }
                letterCounts[normalizedGuess[i]]--;
            } else {
                tile.classList.add("absent");
                if (!usedKeys.has(guess[i])) {
                    keyElement.classList.add("absent");
                }
            }
            usedKeys.add(guess[i]);
        }
    }

    if (normalizedGuess === normalizedWord) {
        alert("Congratulations! You've guessed the word!");
        clearBoard();
        clearKeyboard();
        location.reload();
    } else {
        currentRow++;
        currentGuess = "";

        if (currentRow === 6) {
            alert(`Game Over! The word was ${word}`);
            clearBoard();
            clearKeyboard();
            location.reload();
        }
    }
}

function handleKeyPress(key) {
    if (key === "enter") {
        if (currentGuess.length === 5) {
            checkGuess();
        }
    } else if (key === "delete" || key === "backspace") {
        currentGuess = currentGuess.slice(0, -1);
        updateBoard();
    } else if (/^[a-záéíóúüñ]$/.test(key) && currentGuess.length < 5) {
        currentGuess += key;
        updateBoard();
    }
}

//------ Create ------//

function createBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = `tile-${i}-${j}`;
            board.appendChild(tile);
        }
    }
}

function createKeyboard(language) {
    const keyboard = document.getElementById("keyboard");
    keyboard.innerHTML = "";

    const rows = {
        english: [
            "qwertyuiop",
            "asdfghjkl",
            "zxcvbnm"
        ],
        german: [
            "qwertzuiopü",
            "asdfghjklöä",
            "yxcvbnm"
        ],
        spanish: [
            "qwertyuiop",
            "asdfghjklñ",
            "zxcvbnm"
        ]
    };

    rows[language].forEach((row, rowIndex) => {
        const rowElement = document.createElement("div");
        rowElement.classList.add("keyboard-row");

        row.split("").forEach(key => {
            const keyElement = document.createElement("div");
            keyElement.classList.add("key");
            keyElement.id = `key-${key}`;
            keyElement.textContent = key;
            keyElement.addEventListener("click", () => handleKeyPress(key));
            rowElement.appendChild(keyElement);
        });

        if (rowIndex === 2) {
            const deleteKey = document.createElement("div");
            deleteKey.classList.add("key", "delete");
            deleteKey.id = "key-delete";
            deleteKey.textContent = "Delete";
            deleteKey.addEventListener("click", () => handleKeyPress("delete"));
            rowElement.appendChild(deleteKey);

            const enterKey = document.createElement("div");
            enterKey.classList.add("key", "enter");
            enterKey.id = "key-enter";
            enterKey.textContent = "Enter";
            enterKey.addEventListener("click", () => handleKeyPress("enter"));
            rowElement.appendChild(enterKey);
        }

        keyboard.appendChild(rowElement);
    });
}

//------ Update ------//

function updateBoard() {
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        tile.textContent = currentGuess[i] || "";
    }
}

//------ Clear ------//

function clearRow() {
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        tile.textContent = "";
        tile.classList.remove("correct", "present", "absent");
    }
    currentGuess = "";
}

function clearBoard() {
    const board = document.getElementById("board");
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const tile = document.getElementById(`tile-${i}-${j}`);
            tile.textContent = "";
            tile.classList.remove("correct", "present", "absent");
        }
    }
}

function clearKeyboard() {
    const keys = document.querySelectorAll(".key");
    keys.forEach(key => {
        key.classList.remove("correct", "present", "absent");
    });
}

//------ Helper ------//

function normalizeWord(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
