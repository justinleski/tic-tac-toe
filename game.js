const allEqual = arr => arr.every( v => (v === arr[0]) && (v != null) ); // Exclude null for the purpose of this game logic



// make gameboard object
const gameboard = (function() {

    var boardArr = [];

    // Make an n x n board; default will be n = 3
    const makeBoard = (n) => {
        boardArr= [];
        // Make jagged array for board
        for (var i = 0; i < n; i++){
            const boardRow = [];
            for (var j = 0; j < n; j++){
                boardRow.push(null);
            }
            boardArr.push(boardRow);
        }
    }
    const alertBoard = () => {
        temp = JSON.stringify(boardArr);
    }
    const placePiece = (x, y, piece) => boardArr[x][y] = piece;
    const getBoard = () => boardArr;
    const resetBoard = () => {
        boardArr.forEach((row, rowIndex) => {
            row.forEach((colIndex) => {
                boardArr[rowIndex][colIndex] = null;})
        })
    }
    const checkBoard = (isEmpty, x, y) => { // TODO: Remove redundant isEmpty variable
        // Check if user's attempt is valid
        if (boardArr[x][y] != null){
            return isEmpty = false;
        } else {
            return isEmpty = true; 
        }
    }

    // Return the functions
    return {makeBoard, alertBoard, placePiece, getBoard, resetBoard, checkBoard};

})();

function startGame() { 

    // Make board
    var n = 3;
    var playedTurns = 0;
    gameboard.makeBoard(n);

    // Create players 1 and 2
    var player1Name = "1";
    var player2Name = "2";
    player1 = createPlayer(player1Name, "X");
    player2 = createPlayer(player2Name, "O");

    displayController.board(player1, player2);

    // Set turn to start with player 1
    player1.isTurn();

    do {
        // Alternate player turns until 9 plays reached, i.e.
        if (player1.getTurnStatus() == true){
            
            console.log("Player 1's turn");
            //gameHandler.runPlayerTurn(player1, player2);
            gameHandler.checkForWin(player1);
            
            if (player1.isWinner() == true){
                playerWins(player1);
                playedTurns = 0;
            }
        } else {
            
            console.log("Player 2's turn");
            //gameHandler.runPlayerTurn(player2, player1);
            gameHandler.checkForWin(player2);

            if (player2.isWinner() == true){
                playerWins(player2);
                playedTurns = 0;
            }
        }
        // Now we have to check for rows/columns of X/Os
        console.table(gameboard.getBoard());

        // Increment total count
        playedTurns++;
        console.log("Current no of played turns: "+playedTurns);
    } while (playedTurns < (n**2));

    // If we exceed the number of turns the size of the board, tie
    console.log("Tie!");
    //startGame();

}

const boardChecker = (function() {

    // Returns `true` if there exists a row with all of the values equal - i.e. [O,O,O]
    const rows = () => {

        board = gameboard.getBoard();
        // Check each row for full of same piece 
        for (const row of board) {
            if (allEqual(row) == true){ 
                return true; 
            }
        } // end for loop to check for true condition
         return false;

    }

    const columns = () => {
        var board = gameboard.getBoard();

        // For the number of rows (= to columns), create an array of the vertical columns
        for (let y = 0; y < board.length; y++){
            // Map out each column to a new (temporary) array, then check if this array consists of all of the same piece
            const tempCol = board.map(x => x[y]);
            if (allEqual(tempCol) == true){
                return true; 
            }
        }
        // no matches, then return false
        return false;
    }

    const diagonalUp = () => { // diag up starts from bottom left and goes to top right
        // Map from bottom left to top right of board
        var board = gameboard.getBoard();
        var diag = [...board].reverse().map((x, y) => x[y]);

        // Return true or false based on if all equal or not
        return allEqual(diag);
    }

    const diagonalDown = () => { // diag down starts from top left and goes to bottom right
        var board = gameboard.getBoard();
        var diag = board.map((x, y) => x[y]);

        return allEqual(diag);
    }

    return {rows, columns, diagonalUp, diagonalDown};

})();

const gameHandler = (function() {

    const playerWins = (winningPlayer) => {
        console.log(winningPlayer.name+" wins!");
        winningPlayer.addScore();
        displayController.win(winningPlayer);
        gameHandler.newRound(winningPlayer);
    }

    const checkForWin = (currentPlayer) => {
       
        if (
        boardChecker.rows() ||
        boardChecker.columns() ||
        boardChecker.diagonalUp() ||
        boardChecker.diagonalDown()) {
            currentPlayer.won();
        }

    }

    const newRound = (winningPlayer) => {
        winningPlayer.resetWin();
        startGame();
    }

    const checkTurn = (player1, player2) => {
        if (player1.getTurnStatus() == true){
            return player1;
        } else {
            return player2;
        }
    }

    // Return the function
    return {playerWins, checkForWin, newRound, checkTurn};

})();

// Factory for players
function createPlayer(name, piece) {
    //
    let score = 0;
    let currentTurn = false; // by default false
    let winStatus = false;

    const getScore = () => score; 
    const addScore = () => score++;
    const resetScore = () => {score = 0};
    const getTurnStatus = () => currentTurn; 
    const noTurn = () => {currentTurn = false};
    const isTurn = () => {currentTurn = true};
    const isWinner = () => winStatus;
    const won = () => winStatus = true;
    const resetWin = () => winStatus = false;

    return {name, piece, getScore, addScore, resetScore, getTurnStatus, noTurn, isTurn, isWinner, won, resetWin};
}

const displayController = (function() {

    // Create variables to manipulate DOM
    const board = (player1, player2) => {
        var grid = document.querySelector(".gameGrid");
        var currBoard = gameboard.getBoard();

        // Count all rows/columns in the grid
        grid.style.gridTemplateRows = "repeat(3, 1fr)"
        grid.style.gridTemplateColumns = "repeat(3, 1fr)"
        // Make an n x n grid on the dom

        // Create buttons for each grid element
        currBoard.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                const boardCell = document.createElement("button");

                boardCell.setAttribute("xCoord", rowIndex); 
                boardCell.setAttribute("yCoord", colIndex);

                boardCell.addEventListener("click", function(){
                    // Check if the who the opposing player is
                    var currentPlayer = gameHandler.checkTurn(player1, player2); // problem line
                    if (player1 === currentPlayer) {
                        oppPlayer = player2;
                    } else {
                        oppPlayer = player1;
                    }

                    gameboard.placePiece(boardCell.getAttribute("xCoord"), boardCell.getAttribute("yCoord"), currentPlayer.piece);
                    boardCell.disabled = "disabled"; // disable button after press, hence no need for checking validity
                    fillCell(boardCell, currentPlayer.piece);

                    gameHandler.checkForWin(currentPlayer);
                    if (currentPlayer.isWinner() == true){
                        gameHandler.playerWins(currentPlayer);
                        // playedTurns = 0;
                    }

                    // Check if turns are < 9 ; can maybe be IIFE?

                    currentPlayer.noTurn();

                    // Give opposing player a turn
                    oppPlayer.isTurn();  
                });
                boardCell.classList.add("gridCell")
                
                grid.appendChild(boardCell);
            })
        })
    }

    const fillCell = (boardCell, piece) => {
        boardCell.innerText = piece;
    }

    const win = (currentPlayer) => {
        // Modal pops up when game ends
        head = document.querySelector("#winModal #winMsg");
        pg = document.querySelector("#winModal p");

        head.innerText(currentPlayer.name + " wins");
        pg.innerText("Total wins: "+currentPlayer.getScore);

        // Make elements show after setting custom values
        modalPopup();
    }

    const tie = () => {
        // Modal pops up when game ends
        head = document.querySelector("#winModal #winMsg");
        pg = document.querySelector("#winModal p");

        head.innerText("Tie");
        pg.innerText("No one wins.");
        modalPopup();
    }

    const modalPopup = () => {
        document.querySelector("#winModal").classList.add("active");
    }

    return {board, fillCell, win, tie, modalPopup}

})();

// Make instance of gameboard
startGame();

