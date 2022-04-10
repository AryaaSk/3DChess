"use strict";
const notationToFaceIndex = (notation) => {
    //first letter is column, second number is row, e.g b3 is second column, third row
    const letterIndexes = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const column = letterIndexes.indexOf(notation[0]);
    const row = Number(notation[1]) - 1;
    const faceIndex = (row * 8) + column;
    return faceIndex;
};
const highlightSquare = (squarePos) => {
    const faceIndex = notationToFaceIndex(squarePos);
    const currentColour = chessBoard.faces[faceIndex].colour;
    chessBoard.faces[faceIndex].colour = "#ff0000";
};
const squareToGridPosition = (square) => {
    const letterIndexes = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const column = letterIndexes.indexOf(square[0]);
    const row = Number(square[1]) - 1;
    const columnPos = (column - 4) * 100 * chessBoard.scale;
    const rowPos = (row - 4) * 100 * chessBoard.scale; //this will give you the position of the bottom left corner, but we want the center
    const columnPosCentered = columnPos + (50 * chessBoard.scale);
    const rowPosCentered = rowPos + (50 * chessBoard.scale);
    return [columnPosCentered, 0, rowPosCentered];
};
const gridCoordinates = (square) => {
    const piecePosition = squareToGridPosition(square);
    return [piecePosition[0], 50, piecePosition[2]];
};
const calculateAvailableMoves = (pieceType, currentSquare, colour) => {
    var _a;
    const avaialableSquares = [];
    //ALSO HAVE TO DIFFERENTIATE BETWEEN WHITE AND BLACK, FOR EXAMPLE WHITE PAWN MOVE FORWARD 1, BUT BLACK PAWN WILL MOVE BACKWARD 1 RELATIVE TO WHITE
    if (pieceType == "pawn") {
        //can only move 1 forward
        avaialableSquares.push(`${currentSquare[0]}${Number(currentSquare[1]) + 1}`);
    }
    else if (pieceType == "rook") {
        //can move wherever in a straight line
        //TODO: IMPLEMENT ROOK MOVEMENT
    }
    //check if the moves are valid, invalid if the same colour piece occupies the space
    let i = 0;
    while (i != avaialableSquares.length) {
        if (((_a = board[avaialableSquares[i]]) === null || _a === void 0 ? void 0 : _a.colour) == colour) {
            avaialableSquares.splice(i, 1);
        }
        else {
            i += 1;
        }
    }
    console.log(`Selected Piece ${pieceType} at ${currentSquare}\nCan move to: ${JSON.stringify(avaialableSquares)}`);
    for (let i = 0; i != avaialableSquares.length; i += 1) {
        highlightSquare(avaialableSquares[i]);
    }
    return avaialableSquares;
};
