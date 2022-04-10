"use strict";
linkCanvas("renderingWindow");
const camera = new Camera();
camera.worldRotation.x = -20;
camera.worldRotation.y = 20;
camera.updateRotationMatrix();
camera.enableMovementControls("renderingWindow", true, true, true, true);
const whiteColour = "#ffffff";
const blackColour = "#1f1f1f";
const chessBoardBody = new Box(800, 100, 800);
const boardColour = "#d19826";
chessBoardBody.faces[0].colour = boardColour;
chessBoardBody.faces[1].colour = boardColour;
chessBoardBody.faces[2].colour = boardColour;
chessBoardBody.faces[3].colour = boardColour;
chessBoardBody.faces[4].colour = boardColour;
chessBoardBody.faces[5].colour = boardColour;
chessBoardBody.showOutline = true;
const chessBoard = new ChessBoardTop();
chessBoard.position.y = 51;
chessBoard.showOutline = true;
chessBoard.scale = 0.92;
chessBoard.updateMatrices();
//set colours of chessboard
const resetBoardColours = () => {
    for (let i = 0; i != 64; i += 1) {
        const row = Math.floor(i / 8);
        if (row % 2 == 0) {
            if (i % 2 == 0) {
                chessBoard.faces[i].colour = blackColour;
            }
            else {
                chessBoard.faces[i].colour = whiteColour;
            }
        }
        else {
            if (i % 2 == 0) {
                chessBoard.faces[i].colour = whiteColour;
            }
            else {
                chessBoard.faces[i].colour = blackColour;
            }
        }
    }
};
resetBoardColours();
//Pieces
board["a2"] = new Pawn("white");
board["b2"] = new Pawn("white");
board["c2"] = new Pawn("white");
board["d2"] = new Pawn("white");
board["e2"] = new Pawn("white");
board["f2"] = new Pawn("white");
board["g2"] = new Pawn("white");
board["h2"] = new Pawn("white");
board["a7"] = new Pawn("black");
board["b7"] = new Pawn("black");
board["c7"] = new Pawn("black");
board["d7"] = new Pawn("black");
board["e7"] = new Pawn("black");
board["f7"] = new Pawn("black");
board["g7"] = new Pawn("black");
board["h7"] = new Pawn("black");
board["a1"] = new Rook("white");
board["h1"] = new Rook("white");
board["a8"] = new Rook("black");
board["h8"] = new Rook("black");
updateBoardPieces();
let chessboardPoints = new matrix();
setInterval(() => {
    clearCanvas();
    camera.render([chessBoardBody]);
    chessboardPoints = camera.render([chessBoard])[0].screenPoints;
    camera.render(boardPieces); //pieces are always on top of board, which is why I limit rotation, in the future I should combine all objects into 1 when rendering
});
let currentMove = "white";
const gameLoop = () => {
    const faceSquares = [];
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
    for (let i = 0; i != numbers.length; i += 1) {
        for (let j = 0; j != letters.length; j += 1) {
            faceSquares.push(letters[j] + numbers[i]);
        }
    }
    const getFaceClicked = (mouseX, mouseY) => {
        const boardFaces = [];
        for (let i = 0; i != chessBoard.faces.length; i += 1) {
            const [p1Index, p2Index, p3Index, p4Index] = [chessBoard.faces[i].pointIndexes[0], chessBoard.faces[i].pointIndexes[1], chessBoard.faces[i].pointIndexes[2], chessBoard.faces[i].pointIndexes[3]];
            const [p1, p2, p3, p4] = [chessboardPoints.getColumn(p1Index), chessboardPoints.getColumn(p2Index), chessboardPoints.getColumn(p3Index), chessboardPoints.getColumn(p4Index)];
            //find average of points to get center
            const [totalX, totalY, totalZ] = [p1[0] + p2[0] + p3[0] + p4[0], p1[1] + p2[1] + p3[1] + p4[1], p1[2] + p2[2] + p3[2] + p4[2]];
            const [averageX, averageY, averageZ] = [totalX / 4, totalY / 4, totalZ / 4];
            boardFaces.push({ square: faceSquares[i], center: [averageX, averageY, averageZ] });
        }
        //need to convert the clickX and clickY into X and Y coordinates on the grid
        const gridX = mouseX - (canvasWidth / 2);
        const gridY = (canvasHeight / 2) - mouseY;
        const cursorPoint = [gridX, gridY];
        //now loop through boardFaces, and find the face whose center is closest to the mouse
        const distanceBetween2D = (p1, p2) => { return Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2); };
        let closestFaceIndex = 0;
        for (let i = 0; i != boardFaces.length; i += 1) {
            if (distanceBetween2D(cursorPoint, boardFaces[i].center) < distanceBetween2D(cursorPoint, boardFaces[closestFaceIndex].center)) {
                closestFaceIndex = i;
            }
        }
        //it will always have a closest point by default (a1), but we don't want to highlight a square when the user didn't mean to click it
        if (distanceBetween2D(cursorPoint, boardFaces[closestFaceIndex].center) < 100) {
            return boardFaces[closestFaceIndex].square;
        }
        else {
            return undefined;
        }
    };
    let selectedPiece = undefined;
    let avaialableSquares = [];
    document.getElementById("renderingWindow").onclick = ($e) => {
        let clickedSquare = getFaceClicked($e.clientX, $e.clientY);
        ;
        if (clickedSquare == undefined) {
            selectedPiece = undefined;
            resetBoardColours();
            return;
        }
        else {
            clickedSquare;
        }
        //check if the square is occupied by a piece on the board
        if (selectedPiece == undefined && board[clickedSquare] != undefined) {
            selectedPiece = JSON.parse(JSON.stringify(clickedSquare));
            avaialableSquares = calculateAvailableMoves(board[selectedPiece].type, selectedPiece, currentMove);
        }
        else if (selectedPiece != undefined) {
            //the user has selected a piece, and now has chosen to move to another square
            const moveTo = JSON.parse(JSON.stringify(clickedSquare));
            //check whether moveTo is an allowedMove
            if (avaialableSquares.includes(moveTo)) {
                movePiece(selectedPiece, moveTo);
                selectedPiece = undefined;
                resetBoardColours();
            }
            else if (board[moveTo] != undefined) { //if there is still a piece at at position on the board then it is another piece from the same team, so we select that one
                selectedPiece = moveTo;
                resetBoardColours();
                avaialableSquares = calculateAvailableMoves(board[selectedPiece].type, selectedPiece, currentMove);
            }
        }
    };
};
gameLoop();
