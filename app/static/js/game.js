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
        // Modifier la couleur de l'en-tête en fonction du joueur actuel
        const header = document.getElementById('game-header'); // Assurez-vous que l'élément a l'ID 'game-header'
        if (currentPlayer === 1) {
            header.classList.remove('bg-blue-500'); // Retire la classe pour le joueur 2
            header.classList.add('bg-red-500'); // Ajoute la classe pour le joueur 1
        } else {
            header.classList.remove('bg-red-500'); // Retire la classe pour le joueur 1
            header.classList.add('bg-blue-500'); // Ajoute la classe pour le joueur 2
        }
    }
    
    // algorithme BFS (recherche en largeur)
    function checkWin(player) {
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        let win = false;
    
        function dfs(r, c) {
            if (visited[r][c]) return;
            visited[r][c] = true;
    
            // Conditions de victoire spécifiques à chaque joueur
            if (player === 1 && r === rows - 1) {  // Victoire verticale pour le Joueur 1
                win = true;
                return;
            } else if (player === 2 && c === cols - 1) {  // Victoire horizontale pour le Joueur 2
                win = true;
                return;
            }
    
            const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, 1], [1, -1]];
            for (let [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && gameBoard[nr][nc] === player) {
                    dfs(nr, nc);
                    if (win) return; // Sortie immédiate après la victoire
                }
            }
        }
       
/* 
// algorithme DFS (recherche en profondeur)
function checkWin(player) {
const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
let win = false;
function dfs(r, c) {
if (visited[r][c]) return;
visited[r][c] = true;
// Conditions de victoire spécifiques à chaque joueur
if (player === 1 && r === rows - 1) { // Victoire verticale pour le Joueur 1
win = true;
return;
} else if (player === 2 && c === cols - 1) { // Victoire horizontale pour le Joueur 2
win = true;
return;
}
const directions = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, 1], [1, -1]];
for (let [dr, dc] of directions) {
const nr = r + dr;
const nc = c + dc;
if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && gameBoard[nr][nc] === player) {
dfs(nr, nc);
if (win) return; // Sortie immédiate après la victoire
}
}
}
// Initier la recherche à partir des positions de départ appropriées pour chaque joueur
for (let i = 0; i < (player === 1 ? cols : rows); i++) {
if (!win) {
if (player === 1 && !visited[0][i] && gameBoard[0][i] === player) {
dfs(0, i);
} else if (player === 2 && !visited[i][0] && gameBoard[i][0] === player) {
dfs(i, 0);
}
}
}
return win;
} */

    
        // Initier la recherche à partir des positions de départ appropriées pour chaque joueur
        for (let i = 0; i < (player === 1 ? cols : rows); i++) {
            if (!win) {
                if (player === 1 && !visited[0][i] && gameBoard[0][i] === player) {
                    dfs(0, i);
                } else if (player === 2 && !visited[i][0] && gameBoard[i][0] === player) {
                    dfs(i, 0);
                }
            }
        }
        return win;
    }
    
    

    function resetGame() {
        gameBoard = Array.from({ length: rows }, () => Array(cols).fill(0));
        board.innerHTML = '';
        initializeBoard();
        currentPlayer = 1;
        updateCurrentPlayerDisplay();
        winnerMessage.textContent = '';
        console.log('Game reset');
    }

  function initializeBoard() {
    const board = document.getElementById("hex-game-board");
    board.innerHTML = ''; // S'assurer que le plateau est vide avant de l'initialiser

    for (let i = 0; i < rows; i++) {
        let rowContainer = document.createElement("div");
        rowContainer.classList.add("flex", "justify-center", "mb-1"); // Utiliser Tailwind pour le style de la rangée
        if (i % 2 === 1) {
            rowContainer.style.marginLeft = '30px'; // Décalage pour les rangées impaires pour l'effet nid d'abeille
        }

        for (let j = 0; j < cols; j++) {
            const hexagon = document.createElement("div");
            hexagon.classList.add("hexagon", "w-16", "h-14", "bg-gray-300", "cursor-pointer", "flex", "justify-center", "items-center", "transform", "transition", "duration-200", "hover:scale-110");
            hexagon.dataset.row = i;
            hexagon.dataset.col = j;
            hexagon.addEventListener("click", hexagonClick);
            rowContainer.appendChild(hexagon);
        }
        board.appendChild(rowContainer);
    }
}

    
    
function displayFireworks() {
    const totalFireworks = 12;
    let count = 0;
    const fireworkImageUrl = document.body.getAttribute('data-firework-image'); // Récupération de l'URL

    // Modification du message de victoire avec la couleur spécifique au joueur
    winnerMessage.textContent = `Félicitations ! Joueur ${currentPlayer} gagne !`;
    winnerMessage.style.color = currentPlayer === 1 ? 'red' : 'blue';
    winnerMessage.style.opacity = 1;

    const positions = [
        { top: '10%', left: '10%' },
        { top: '10%', left: '80%' },
        { top: '80%', left: '10%' },
        { top: '80%', left: '80%' },
        { top: '50%', left: '50%' }
        
    ];

    const interval = setInterval(() => {
        const size = Math.random() * 100+ 500; // Taille aléatoire entre 30px et 80px
        const firework = document.createElement('div');
        firework.classList.add('firework');
        const position = positions[Math.floor(Math.random() * positions.length)];
        firework.style.position = 'fixed';
        firework.style.top = position.top;
        firework.style.left = position.left;
        firework.style.width = `${size}px`;
        firework.style.height = `${size}px`;
        firework.style.background = `url('${fireworkImageUrl}') no-repeat center center`;
        firework.style.backgroundSize = 'cover';

        document.body.appendChild(firework);

        setTimeout(() => {
            document.body.removeChild(firework);
        }, 900); // Feux d'artifice visibles pour 900ms

        count++;
        if (count >= totalFireworks) {
            clearInterval(interval);
            setTimeout(() => {
                winnerMessage.style.opacity = 0;
            }, 1000);
        }
    }, 1000);
}



  
function hexagonClick() {
    const row = parseInt(this.dataset.row);
    const col = parseInt(this.dataset.col);
    if (gameBoard[row][col] === 0) {
        gameBoard[row][col] = currentPlayer;
        this.classList.remove('bg-gray-300', 'hover:bg-gray-400');
        this.classList.add(currentPlayer === 1 ? 'player1' : 'player2');

        if (checkWin(currentPlayer)) {
            displayFireworks();  // Afficher les feux d'artifice au lieu de l'alert
            setTimeout(resetGame, 1500);  // Attendre 9 secondes avant de réinitialiser le jeu
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
