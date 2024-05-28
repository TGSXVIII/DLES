let words = [];
let word = "";
let currentGuess = "";
let currentRow = 0;

// ---------------------------------------------------- //

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
    }

    else if (key === "backspace") {
        currentGuess = currentGuess.slice(0, -1);
        updateBoard();
    }

    else if (/^[a-z]$/.test(key)) {
        handleKeyPress(key);
    }
});

// ---------------------------------------------------- //

async function loadWords() {
    try {
        const response = await fetch("Lists/Wordle (English)/answerlist.txt");  // Fetch the word list file
        const text = await response.text();  // Read the file content as text
        words = text.split("\n").map(word => word.trim()).filter(word => word.length > 0);  // Split and clean the words
    }

    catch (error) {
        console.error("Failed to load words:", error);  // Log any errors if the fetch fails
    }
}

async function isInWordList(guess) {
    try {
        const response = await fetch("Lists/Wordle (English)/answerlist.txt"); // Fetch the word list file
        const text = await response.text(); // Read the file content as text
        const wordsList = text.split("\n").map(word => word.trim()).filter(word => word.length > 0); // Split and clean the words
        return wordsList.includes(guess.toLowerCase()); // Check if the guess is in the list
    } catch (error) {
        console.error("Failed to check if guess is in word list:", error);
        return false; // Return false if there's an error
    }
}

async function checkGuess() {
    const guess = currentGuess.toLowerCase();
    const usedKeys = new Set();

    if (!(await isInWordList(guess))) {
        alert("That isn't a word in the word list. Try again.");
        clearRow();
        return;
    }

    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        const keyElement = document.getElementById(`key-${guess[i]}`);

        if (guess[i] === word[i]) {
            tile.classList.add("correct");
            keyElement.classList.remove("present", "absent");
            keyElement.classList.add("correct");
        }

        else if (word.includes(guess[i])) {
            tile.classList.add("present");

            if (!keyElement.classList.contains("correct")) {
                keyElement.classList.remove("absent");
                keyElement.classList.add("present");
            }
        }

        else {
            tile.classList.add("absent");

            if (!usedKeys.has(guess[i])) {
                keyElement.classList.add("absent");
            }
        }
        usedKeys.add(guess[i]);
    }

    // Add an if statement that checks if the users previous is writen again and then say you cant write the same answer again
    if (guess){

    }

    // Add an if statement that checks if the letter has been sat in correct position and then not show it in another position
    // to make sure that if there is fx only one E that it dosent show there are 2
    if (guess) {

    }

    if (guess === word) {
        alert("Congratulations! You've guessed the word!");
        clearBoard();
        clearKeyboard(); // Call clearKeyboard when the game is over
        location.reload();
    } else {
        currentRow++;
        currentGuess = "";

        if (currentRow === 6) {
            alert(`Game Over! The word was ${word}`);
            clearBoard();
            clearKeyboard(); // Call clearKeyboard when the game is over
            location.reload();
        }
    }
}

// ---------------------------------------------------- //

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
    const keys = "abcdefghijklmnopqrstuvwxyz".split("");
    keys.forEach(key => {
        const keyElement = document.createElement("div");
        keyElement.classList.add("key");
        keyElement.id = `key-${key}`; // Set the ID for the key element
        keyElement.textContent = key;
        keyElement.addEventListener("click", () => handleKeyPress(key));
        keyboard.appendChild(keyElement);
    });
}

function handleKeyPress(key) {
    if (currentGuess.length < 5) {
        currentGuess += key;
        updateBoard();
    }
}

function updateBoard() {
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        tile.textContent = currentGuess[i] || "";
    }
}

function clearRow() {
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${currentRow}-${i}`);
        tile.textContent = "";
        tile.classList.remove("correct", "present", "absent");
    }
    currentGuess = "";
}

function clearBoard() {
    // Iterate through all rows
    for (let i = 0; i < 6; i++) {
        // Iterate through all columns
        for (let j = 0; j < 5; j++) {
            const box = document.getElementById(`tile-${i}-${j}`);
            box.textContent = "";
            box.classList.remove("correct", "present", "absent");
        }
    }

    currentGuess = "";  // Reset the current guess
    currentRow = 0;  // Reset the current row
}

function clearKeyboard() {
    const keys = document.querySelectorAll(".key");

    keys.forEach(key => {
        key.classList.remove("correct", "present", "absent");
        key.style.backgroundColor = "#eee"; // Set back to original background color
        key.style.color = "black"; // Set back to original text color
    });
}
