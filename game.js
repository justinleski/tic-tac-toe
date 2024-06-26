// make gameboard object
const gameboard = (function() {

    // Make an n x n board; default will be n = 3
    var n = 3;
    var boardArr = [];
   
    // Make jagged array for board
    for (var i = 0; i < n; i++){
        const boardRow = [];
        for (var j = 0; j < n; j++){
            boardRow.push(null);
        }
        boardArr.push(boardRow);
    }

    /*
    Functions
    */
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
    return {alertBoard, placePiece, getBoard, resetBoard, checkBoard};

})();

const startGame = (function() { // doesnt need to be Immeadiatley Invoked

    // Reset board before each game
    gameboard.resetBoard();

    // Create players
    var player1Name = "Player 1";
    var player2Name = "Player 2";
    player1 = createPlayer(player1Name, "X");
    player2 = createPlayer(player2Name, "O");

    gameHandler.getPlayerInput(pass in player);

    

})();

const gameHandler = (function() {

    // Pass in the current player object and get the piece member
    const getPlayerInput = (currentPlayer) => {
        // Ask player 1 where to put piece
        var isEmpty = true;
        do {
            
            var input = prompt("Where would you like to place the piece? Enter two numbers in this format '0 1'");
            input.split(" ");

            // Call gameboard check func
            isEmpty = gameboard.checkBoard(currentPlayer, isEmpty);

        } while (isEmpty == true); 
    } // end playerInput func

    const validateInput = () => {
        if (playerTurn == true){
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

    // Return the function
    return {getPlayerInput, validateInput, checkForWin};

})();

// Factory for players
function createPlayer(name, piece) {
    //
    let score = 0;
    const getScore = () => score;
    const addScore = () => score++;
    const resetScore = () => {
        score = 0;
    }

    return {name, piece, getScore, addScore, resetScore};
}



// Make instance of gameboard
gameboard.placePiece(0,0, "X");
//gameboard.alertBoard(); // both work
console.log(gameboard.getBoard());
gameboard.resetBoard();
console.log(gameboard.getBoard());
gameboard.placePiece(1,1, "O");
console.log(gameboard.getBoard());
gameboard.resetBoard(); // ASYNC!!
