document.addEventListener("DOMContentLoaded", function() {
    // Créer le plateau de jeu
    const board = document.getElementById("hex-game-board");
    const rows = 11;
    const cols = 11;
    let currentPlayer = 1;
    let gameBoard = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const hexagon = document.createElement("div");
            hexagon.className = "hexagon";
            hexagon.dataset.row = i;
            hexagon.dataset.col = j;
            hexagon.addEventListener("click", function() {
                const row = parseInt(this.dataset.row);
                const col = parseInt(this.dataset.col);
                if (gameBoard[row][col] === 0) {
                    gameBoard[row][col] = currentPlayer;
                    this.className = `hexagon player${currentPlayer}`;
                    currentPlayer = currentPlayer === 1 ? 2 : 1;
                }
            });
            board.appendChild(hexagon);
        }
    }
});
