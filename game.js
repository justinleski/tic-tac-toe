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
    const checkBoard = (currentPlayer, isEmpty) => {
        // Check if user's attempt is valid
        if (gameboard.getBoard[input[0]][input[1]] != null){
            console.log("Invalid; gameboard is not empty here");
            isEmpty = false;
            return isEmpty;
        } else {
            gameboard.placePiece(input[0], input[1], currentPlayer.piece); 
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
    const {p1, p2} = gameHandler.updatePlayers();
    const player1 = gameHandler.p1; // wait maye this
    
    console.log(player1.name);

    // Set turn to start with player 1
    player1.isTurn();
    do {
        // Alternate player turns until 9 plays reached, i.e.
        if (player1.getTurnStatus == true){
            gameHandler.runPlayerTurn(player1, player2);
        } else {
            gameHandler.runPlayerTurn(player2, player1);
        }
        // Now we have to check for rows/columns of X/Os
        

        // Increment total count
        playedTurns++;
    } while (playedTurns < (n**2 + 1)); // i.e. < 10 when n=3
    


}

const gameHandler = (function() {

    const runPlayerTurn = (currentPlayer, oppPlayer) => {
        var turnCoords = [];
        turnCoords = gameHandler.getPlayerInput(currentPlayer); 
        gameboard.placePiece(turnCoords[0], turnCoords[1], currentPlayer.piece);
        currentPlayer.noTurn();

        // Give opposing player a turn
        oppPlayer.isTurn();  
    }

    // Pass in the current player object and get the piece member
    const getPlayerInput = (currentPlayer) => {
        // Ask player where to put piece
        var isEmpty = true;
        do {
            
            var input = prompt("Where would you like to place the piece? Enter two numbers in this format '0 1'");
            input.split(" ");

            // Call gameboard check func
            isEmpty = gameboard.checkBoard(currentPlayer, isEmpty);

            if (isEmpty == false){
                console.log("You cannot place a piece here as it is occupied. Try elsewhere.");
            }

        } while (isEmpty == true); 

        // Return the coordinates user provided
        return input;

    } // end playerInput func

    const validateInput = () => {
        if (playerTurn == true){ // TODO: pass into function
            gameboard.placePiece(x, y, player.piece);
        } else {
            console.log("Error; not the current player's turn");
        }
    }

    const checkForWin = (playedTurns) => {
        if (playedTurns >= 9) {
            console.log("Tie! No one wins.");
            gameboard.resetBoard();
            // No points awarded for a tie
        } else {
            // Check each row and column; diagonal consider later
            var currentBoard = gameboard.getBoard();
            
        }
    }

    const updatePlayers = () => {
        var player1Name = prompt("Player 1 name: ");
        var player2Name = prompt("Player 2 name: ");
        player1 = createPlayer(player1Name, "X");
        player2 = createPlayer(player2Name, "O");

        // Return both players as an object
        return {
            p1: player1,
            p2: player2,
        }
    }

    // Return the function
    return {runPlayerTurn, getPlayerInput, validateInput, checkForWin, updatePlayers};

})();

// Factory for players
function createPlayer(name, piece) {
    //
    let score = 0;
    let currentTurn = false; // by default false
    const getScore = () => score; // redundant too?
    const addScore = () => score++;
    const resetScore = () => {score = 0};
    const getTurnStatus = () => currentTurn; // redundant??????????????????????????????????????????
    const noTurn = () => {currentTurn = false};
    const isTurn = () => {currentTurn = true};

    return {name, piece, score, getScore, addScore, resetScore, getTurnStatus, noTurn, isTurn};
}



// Make instance of gameboard
startGame();
gameboard.placePiece(0,0, "X");
//gameboard.alertBoard(); // both work
console.log(gameboard.getBoard());
gameboard.resetBoard();
console.log(gameboard.getBoard());
gameboard.placePiece(1,1, "O");
console.log(gameboard.getBoard());
gameboard.resetBoard(); // ASYNC!!
