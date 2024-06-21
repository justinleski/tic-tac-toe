// make gameboard object
const gameboard = (function() {

    // Make an n x n board; default will be n = 3
    var n = 3;
    var boardArr = [];
    /*
    I am trying to make a jagged (2D) array where a board is populated like so
    Assume n=3

    boardArr = [
        [" "," "," "]
        [" "," "," "]
        [" "," "," "]
    ];
    */

    for (var i = 0; i < n; i++){
        const boardRow = [];
        for (var j = 0; j < n; j++){
            boardRow.push(null);
        }
        boardArr.push(boardRow);
    }

    temp = JSON.stringify(boardArr);
    alert(temp);

})();

// Make instance of gameboard
// gameboard();
