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
    const checkBoard = (isEmpty, x, y) => {
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
    displayController.board();

    // Create players 1 and 2
    var player1Name = prompt("Player 1 name: ");
    var player2Name = prompt("Player 2 name: ");
    player1 = createPlayer(player1Name, "X");
    player2 = createPlayer(player2Name, "O");

    // Set turn to start with player 1
    player1.isTurn();

    do {
        // Alternate player turns until 9 plays reached, i.e.
        if (player1.getTurnStatus() == true){
            console.log("Player 1's turn");
            gameHandler.runPlayerTurn(player1, player2);
            gameHandler.checkForWin(player1);
            if (player1.isWinner() == true){
                console.log("Player 1 wins!");
                player1.addScore();
                gameHandler.newRound(player1);
                playedTurns = 0;
            }
        } else {
            console.log("Player 2's turn");
            gameHandler.runPlayerTurn(player2, player1);
            gameHandler.checkForWin(player2);
            if (player2.isWinner() == true){
                console.log("Player 2 wins!");
                player2.addScore();
                gameHandler.newRound(player2);
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
    startGame();

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

    const runPlayerTurn = (currentPlayer, oppPlayer) => {
        // Check to see if coords the user selects are valid / empty
        var turnCoords = [];
        turnCoords = gameHandler.getPlayerInput(currentPlayer); // function loops until empty coords found
        console.log("Turn coords are: "+turnCoords[0]);

        // After we checked to see if the coordinates are valid, place the piece
        gameboard.placePiece((turnCoords[0]), (turnCoords[1]), currentPlayer.piece);
        currentPlayer.noTurn();

        // Give opposing player a turn
        oppPlayer.isTurn();  
    }

    // Pass in the current player object and get the piece member
    const getPlayerInput = (currentPlayer) => {
        var input = [null, null];
        // Ask player where to put piece
        var isEmpty = true;
        do {
            // Take input convert to string, and split it
            input[0] = prompt(currentPlayer.name+": coord 1 - ");
            input[1] = prompt(currentPlayer.name+": coord 2 - ");

            // Call gameboard check func
            isEmpty = gameboard.checkBoard(isEmpty, input[0], input[1]);
  
        } while (isEmpty == false); // we want to loop until the user finds an empty spot

        // Return the coordinates user provided
        return input;

    } // end playerInput func

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


    // Return the function
    return {runPlayerTurn, getPlayerInput, checkForWin, newRound};

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
    const board = () => {
        var grid = document.querySelector(".gameGrid");
        var currBoard = gameboard.getBoard();

        // Count all rows/columns in the grid
        grid.style.gridTemplateRows = "repeat(3, 1fr)"
        grid.style.gridTemplateColumns = "repeat(3, 1fr)"
        // Make an n x n grid on the dom

        // Create buttons for each grid element
        currBoard.forEach((x, y) => {
            x.forEach((y) => {
                console.log("Executed");
                const boardCell = document.createElement("button");
                boardCell.setAttribute("xCoord", x);
                boardCell.setAttribute("yCoord", y);
                grid.appendChild(boardCell);
            })
        })
    }

    return {board}

})();

// Make instance of gameboard
startGame();

