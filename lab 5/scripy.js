let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; 
let isGameActive = true;
const winningConditions = [ 
    [0, 1, 2], [3, 4, 5],
    [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(index) {
    if (!isGameActive || board[index] !== '') return;
    board[index] = currentPlayer;
    const btn = document.getElementById('cell-' + index);
    if (btn) {
        btn.textContent = currentPlayer;
        btn.disabled = true;
    }

    const winningCells = checkWin();
    if (winningCells) {
        isGameActive = false;
        displayWinner(currentPlayer, winningCells);
        return;
    }

    if (checkTie()) {
        isGameActive = false;
        displayTie();
        return;
    }

    changePlayer();
}

function checkWin() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
            return [a, b, c];
        }
    }
    return null;
}
function checkTie() {
    return board.every(cell => cell !== '');
}

function displayWinner(player, winningCells) {
    const status = document.getElementById('status');
    if (status) status.textContent = player + ' wins!';
    
    winningCells.forEach(index => {
        const btn = document.getElementById('cell-' + index);
        if (btn) btn.classList.add('win');
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    for (let i = 0; i < 9; i++) {
        const btn = document.getElementById('cell-' + i);
        if (btn) {
            btn.textContent = '';
            btn.disabled = false;
            btn.classList.remove('win');
            btn.style.backgroundImage = '';
        }
    }
    const status = document.getElementById('status');
    if (status) status.textContent = currentPlayer + "'s turn";
}

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    const status = document.getElementById('status');
    if (status) status.textContent = currentPlayer + "'s turn";
}