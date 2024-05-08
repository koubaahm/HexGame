document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("hex-game-board");
    const currentPlayerSpan = document.getElementById("current-player");
    const winnerMessage = document.getElementById("winner-message");
    const resetButton = document.getElementById("reset-button");

    const rows = 11; // Hauteur du plateau
    const cols = 11; // Largeur du plateau
    let currentPlayer = 1;
    let gameBoard = Array.from({ length: rows }, () => Array(cols).fill(0));

    function updateCurrentPlayerDisplay() {
        currentPlayerSpan.textContent = `Joueur actuel : Joueur ${currentPlayer}`;
    }

    function checkWin(player) {
        // Implémentez votre logique de vérification ici
        // Cette fonction doit vérifier si le joueur a formé un chemin continu entre les côtés assignés du plateau.
        return false;
    }

    function resetGame() {
        gameBoard = Array.from({ length: rows }, () => Array(cols).fill(0));
        board.innerHTML = '';
        initializeBoard();
        currentPlayer = 1;
        updateCurrentPlayerDisplay();
        winnerMessage.textContent = '';
    }

    function initializeBoard() {
        for (let i = 0; i < rows; i++) {
            let rowContainer = document.createElement("div");
            rowContainer.classList.add("row");
            if (i % 2 === 0) {
                rowContainer.style.marginLeft = '30px'; // Décaler les rangées pour un effet de grille
            }
            for (let j = 0; j < cols; j++) {
                const hexagon = document.createElement("div");
                hexagon.className = "hexagon";
                hexagon.dataset.row = i;
                hexagon.dataset.col = j;
                hexagon.addEventListener("click", hexagonClick);
                rowContainer.appendChild(hexagon);
            }
            board.appendChild(rowContainer);
        }
    }
    
    function hexagonClick() {
        const row = parseInt(this.dataset.row);
        const col = parseInt(this.dataset.col);
        if (gameBoard[row][col] === 0) {
            gameBoard[row][col] = currentPlayer;
            this.className = `hexagon player${currentPlayer}`;
            if (checkWin(currentPlayer)) {
                winnerMessage.textContent = `Joueur ${currentPlayer} gagne !`;
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                updateCurrentPlayerDisplay();
            }
        }
    }

    updateCurrentPlayerDisplay();
    initializeBoard();

    resetButton.addEventListener('click', resetGame);
});
