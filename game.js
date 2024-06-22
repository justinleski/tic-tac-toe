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

// Factory for players
function createPlayer(name, order, piece) {
    //
    let score = 0;
    const getScore = () => score;
    const addScore = () => score++;

    return {name, order, piece, getScore, addScore};
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
