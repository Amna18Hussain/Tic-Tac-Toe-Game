document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.square');
    const restartButton = document.getElementById('restart');
    const winnerText = document.getElementById('winner');
    const playerScore = document.getElementById('score1');
    const computerScore = document.getElementById('score2');

    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    let playerTurn = true;
    let gameActive = true;
    let playerWinCount = 0;
    let computerWinCount = 0;

    const winningCombinations = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    function handleClick(event) {
        if (!playerTurn || !gameActive) return;

        const id = event.target.id;
        const row = parseInt(id[0]);
        const col = parseInt(id[1]);

        if (board[row][col] !== '') return;

        board[row][col] = 'X';
        event.target.innerText = 'X';

        if (checkWin('X')) {
            gameActive = false;
            winnerText.innerText = "Player Wins!";
            playerWinCount++;
            playerScore.innerText = playerWinCount;
        } else if (isDraw()) {
            gameActive = false;
            winnerText.innerText = "It's a Draw!";
        } else {
            playerTurn = false;
            setTimeout(computerMove, 500); // Give a slight delay for computer move
        }
    }

    function computerMove() {
        if (!gameActive) return;

        let emptySquares = [];
        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === '') emptySquares.push([rowIndex, colIndex]);
            });
        });

        if (emptySquares.length === 0) return;

        const [row, col] = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        board[row][col] = 'O';
        document.getElementById(`${row}${col}`).innerText = 'O';

        if (checkWin('O')) {
            gameActive = false;
            winnerText.innerText = "Computer Wins!";
            computerWinCount++;
            computerScore.innerText = computerWinCount;
        } else if (isDraw()) {
            gameActive = false;
            winnerText.innerText = "It's a Draw!";
        } else {
            playerTurn = true;
        }
    }

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(([row, col]) => {
                return board[row][col] === player;
            });
        });
    }

    function isDraw() {
        return board.every(row => {
            return row.every(cell => {
                return cell !== '';
            });
        });
    }

    function resetGame() {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        squares.forEach(square => {
            square.innerText = '';
        });
        gameActive = true;
        playerTurn = true;
        winnerText.innerText = '';
    }

    squares.forEach(square => square.addEventListener('click', handleClick));
    restartButton.addEventListener('click', resetGame);
});
