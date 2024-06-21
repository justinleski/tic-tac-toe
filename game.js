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
        alert(temp);
    }
    const placePiece = (x, y, piece) => boardArr[x][y] = piece;
    const getBoard = () => boardArr;

    // Return the functions
    return {alertBoard, placePiece};

})();

// Factory for players
function createPlayer(name) {
    //
}

// Make instance of gameboard
gameboard.placePiece(0,0, "X");
gameboard.alertBoard(); // both work