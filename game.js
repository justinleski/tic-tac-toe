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
            row.forEach((element, colIndex) => {
                boardArr[rowIndex][colIndex] = null;})
        })
    }

    // Return the functions
    return {alertBoard, placePiece, getBoard, resetBoard};

})();

const startGame = (function() {

    // Reset board before each game
    gameboard.resetBoard();

    // Create players
    var player1Name = "Player 1";
    var player2Name = "Player 2";
    player1 = createPlayer(player1Name, "X");
    player2 = createPlayer(player2Name, "O");

    // Ask player 1 where to put piece
    
    do {
        var isEmpty = true;
        var input = prompt("Where would you like to place the piece? Enter two numbers in this format '0 1'");
        input.split(" ");

        // Check if user's attempt is valid
        if (gameboard.getBoard[input[0]][input[1]] != null){
            console.log("Invalid; gameboard is not empty here");
            isEmpty = false;
        } else {
            placePiece(input[0], input[1], createPlayer.piece); // TODO: FIX! should not be createPlayer.piece
            // I need logic to check this for each player - ideally a function where we pass in the player as a variable
        }

    } while (isEmpty == true); // fix later


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
