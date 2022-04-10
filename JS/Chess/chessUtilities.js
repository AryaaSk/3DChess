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
    setTimeout(() => { chessBoard.faces[faceIndex].colour = currentColour; }, 1000);
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
