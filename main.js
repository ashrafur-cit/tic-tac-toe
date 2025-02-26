const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetButton = document.querySelector(".reset");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]  // Diagonals
];

// Handle cell click
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");

        if (boardState[index] === "" && gameActive) {
            boardState[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add("taken");
            checkWinner();
            togglePlayer();
        }
    });
});

// Check for winner
function checkWinner() {
    let roundWon = false;

    for (let condition of winningCombinations) {
        let [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
    } else if (!boardState.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
    }
}

// Switch player
function togglePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameActive) {
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Restart game
resetButton.addEventListener("click", () => {
    currentPlayer = "X";
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = "Player X's turn";
    
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
});