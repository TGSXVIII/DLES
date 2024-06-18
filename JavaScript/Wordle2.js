let words = [];
let word = "";
let currentGuess = "";
let currentRow = 0;
let previousGuesses = [];

// ------------------------ Event listeners ------------------------- //

document.addEventListener("DOMContentLoaded", async () => {
    await loadWords();  // Load words from the file into the `words` array
    word = words[Math.floor(Math.random() * words.length)];  // Pick a random word from the `words` array
    createBoard();  // Create the game board
    createKeyboard();  // Create the keyboard
});

document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === "enter" && currentGuess.length === 5) {
        checkGuess();
    } else if (key === "backspace") {
        currentGuess = currentGuess.slice(0, -1);
        updateBoard();
    } else if (/^[a-z]$/.test(key)) {
        handleKeyPress(key);
    }
});

// Function for loading all the words in the words list
async function loadWords() {
    try {
        const response = await fetch("Lists/Wordle (English)/wordlist.txt");  
        const text = await response.text();
        words = text.split("\n").map(word => word.trim()).filter(word => word.length > 0);
    } catch (error) {
        console.error("Failed to load words:", error);  
    }
}

// function for checking if the guess is correct, partly correct or not at all correct
async function checkGuess() {
    const letterCounts = {};
    const guess = currentGuess.toLowerCase();
    const usedKeys = new Set();

    if (!words.includes(guess)) {
        alert("That isn't a word in the word list. Try again.");
        clearRow();
        return;
    }

    if (previousGuesses.includes(guess)) {
        alert("You can't write the same answer again. Try again.");
        clearRow();
        return;
    }

    previousGuesses.push(guess);

    for (let letter of word) {
        letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    }

    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        const keyElement = document.getElementById(`key-${guess[i]}`);

        if (guess[i] === word[i]) {
            tile.classList.add("correct");
            keyElement.classList.remove("present", "absent");
            keyElement.classList.add("correct");
            letterCounts[guess[i]] -= 1;
        }

        if (tile.classList.contains("correct")) continue;

        if (word.includes(guess[i]) && letterCounts[guess[i]] > 0) {
            tile.classList.add("present");

            if (keyElement.classList.contains("correct")) {
                keyElement.classList.remove("present");
            }

            if (!keyElement.classList.contains("correct")) {
                keyElement.classList.remove("absent");
                keyElement.classList.add("present");
            }

            letterCounts[guess[i]] -= 1;
        } else {
            tile.classList.add("absent");

            if (!usedKeys.has(guess[i])) {
                keyElement.classList.add("absent");
            }
        }
        usedKeys.add(guess[i]);
    }

    if (guess === word) {
        alert("Congratulations! You've guessed the word!");
        clearAll();
        location.reload();
    } else {
        currentRow++;
        currentGuess = "";

        if (currentRow === 6) {
            alert(`Game Over! The word was ${word}`);
            clearAll();
            location.reload();
        }
    }
}

// Function used to create the board with the grid
function createBoard() {
    const board = document.getElementById("board");

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = `tile-${i}-${j}`;
            board.appendChild(tile);
        }
    }
}

function createKeyboard() {
    const keyboard = document.getElementById("keyboard");
    const rows = [
        "qwertyuiop",
        "asdfghjkl",
        "zxcvbnm"
    ];

    rows.forEach((row, rowIndex) => {
        if (rowIndex === 1) {
            // Add spacer for the second row
            const spacer = document.createElement("div");
            spacer.classList.add("spacer");
            keyboard.appendChild(spacer);
        }
        
        row.split("").forEach(key => {
            const keyElement = document.createElement("div");
            keyElement.classList.add("key");
            keyElement.id = `key-${key}`;
            keyElement.textContent = key;
            keyElement.addEventListener("click", () => handleKeyPress(key));
            keyboard.appendChild(keyElement);
        });

        if (rowIndex === 1) {
            // Add spacer for the second row alignment
            const spacer = document.createElement("div");
            spacer.classList.add("spacer");
            keyboard.appendChild(spacer);
        }

        if (rowIndex === 2) {
            // Add extra spacers for alignment on the third row
            const extraSpacer = document.createElement("div");
            extraSpacer.classList.add("spacer");
            keyboard.appendChild(extraSpacer);
            keyboard.appendChild(extraSpacer);

            // Add Enter key at the end of the third row
            const enterKey = document.createElement("div");
            enterKey.classList.add("key", "enter");
            enterKey.id = "key-enter";
            enterKey.textContent = "Enter";
            enterKey.addEventListener("click", () => handleKeyPress("Enter"));
            keyboard.appendChild(enterKey);
        }
    });

    // Add Delete key at the end of the keyboard
    const deleteKey = document.createElement("div");
    deleteKey.classList.add("key", "delete");
    deleteKey.id = "key-delete";
    deleteKey.textContent = "Delete";
    deleteKey.addEventListener("click", () => handleKeyPress("Delete"));
    keyboard.appendChild(deleteKey);
}

// Call the function to create the keyboard on page load or whenever appropriate
createKeyboard();


// Call the function to create the keyboard on page load or whenever appropriate
createKeyboard();


// Function used to start the update board if all things are as they should be
function handleKeyPress(key) {
    if (currentGuess.length < 5) {
        currentGuess += key;
        updateBoard();
    }
}

// Function used to update the board
function updateBoard() {
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        tile.textContent = currentGuess[i] || "";
    }
}

// Function used to clear a row when the input is incorrect
function clearRow() {
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        tile.textContent = "";
        tile.classList.remove("correct", "present", "absent");
    }

    currentGuess = "";
}

// Function used for clearing the board once you the game is over
function clearBoard() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const box = document.getElementById(`tile-${i}-${j}`);
            box.textContent = "";
            box.classList.remove("correct", "present", "absent");
        }
    }

    currentGuess = "";  
    currentRow = 0;  
}

// Function for clearing the keyboard once the game is over
function clearKeyboard() {
    const keys = document.querySelectorAll(".key");

    keys.forEach(key => {
        key.classList.remove("correct", "present", "absent");
        key.style.backgroundColor = "#eee";
        key.style.color = "black";
    });
}

// Function to clear all
function clearAll() {
    clearBoard();
    clearKeyboard();
}
