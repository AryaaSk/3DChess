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
board["b1"] = new Knight("white");
board["c1"] = new Bishop("white");
board["d1"] = new Queen("white");
board["e1"] = new King("white");
board["f1"] = new Bishop("white");
board["g1"] = new Knight("white");
board["h1"] = new Rook("white");
board["a8"] = new Rook("black");
board["b8"] = new Knight("black");
board["c8"] = new Bishop("black");
board["d8"] = new Queen("black");
board["e8"] = new King("black");
board["f8"] = new Bishop("black");
board["g8"] = new Knight("black");
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
const updateCurrentMove = () => { document.getElementById("currentMove").innerText = `Current Move: ${currentMove}`; };
updateCurrentMove();
const updateTempText = (message, duration) => {
    document.getElementById("tempText").innerText = message;
    setTimeout(() => {
        document.getElementById("tempText").innerText = "";
    }, duration);
};
let selectedPiece = undefined;
let avaialableSquares = [];
document.getElementById("renderingWindow").onclick = ($e) => {
    var _a;
    let clickedSquare = getFaceClicked($e.clientX, $e.clientY);
    ;
    if (clickedSquare == undefined) { //user clicked outside the board, so we unselect the selectedPiece
        selectedPiece = undefined;
        resetBoardColours();
        updateCurrentMove();
        return;
    }
    else {
        clickedSquare;
    }
    //check if the square is occupied by a piece on the board
    if (selectedPiece == undefined && ((_a = board[clickedSquare]) === null || _a === void 0 ? void 0 : _a.colour) == currentMove) {
        selectedPiece = JSON.parse(JSON.stringify(clickedSquare));
        avaialableSquares = calculateAvailableMoves(board[selectedPiece].type, selectedPiece, currentMove);
    }
    else if (selectedPiece != undefined) {
        //the user has selected a piece, and now has chosen to move to another square
        const selectedSquare = JSON.parse(JSON.stringify(clickedSquare));
        //check whether selectedSquare is an allowedMove by checking if it is in the availableSquares
        if (avaialableSquares.includes(selectedSquare)) {
            const boardBeforeMove = Object.assign({}, board);
            const pieceAtSelectedSquare = board[selectedSquare];
            movePiece(selectedPiece, selectedSquare);
            resetBoardColours();
            //after moving we need to check if the our own king will be in check after this move, if so then move it back
            if (kingInCheck(currentMove) == true) {
                alert("Cannot move there since your king will still be in check");
                board = Object.assign({}, boardBeforeMove); //revert change
                updateBoardPieces();
            }
            else {
                if (pieceAtSelectedSquare != undefined) {
                    updateTempText(`${currentMove} took a ${pieceAtSelectedSquare.type}`, 3000);
                }
                selectedPiece = undefined;
                if (currentMove == "white") {
                    currentMove = "black";
                }
                else {
                    currentMove = "white";
                }
                //after switching colours, check if the currentColour's king is in check, this means the other person has put the king in check
                if (kingInCheck(currentMove) == true) {
                    updateTempText(`${currentMove} is in check`, 1000000);
                    let boardBefore = Object.assign({}, board); //need to copy board, not create a reference, so we can revert the changes that we make
                    const revertChanges = () => { board = Object.assign({}, boardBefore); };
                    //if you know that you are in check, you need to check if you are in checkmate
                    //checkmate means that you cannot do anything to get out of check, so I need to calculate all the possible moves for every piece, and check if the king is in check for everymove
                    let checkmate = true;
                    const ownPieces = [];
                    for (let key in board) {
                        if (board[key].colour == currentMove) {
                            ownPieces.push({ position: key, type: JSON.parse(JSON.stringify(board[key].type)) });
                        }
                    }
                    for (let i = 0; i != ownPieces.length; i += 1) {
                        const currentPiece = ownPieces[i];
                        const possibleMoves = calculateAvailableMoves(currentPiece.type, currentPiece.position, currentMove);
                        //loop through these moves, check if the king is still in check, and then revert the move
                        for (let a = 0; a != possibleMoves.length; a += 1) {
                            const moveTo = possibleMoves[a];
                            movePiece(currentPiece.position, moveTo);
                            if (kingInCheck(currentMove) == false) {
                                console.log(`Could move ${currentPiece.position} to ${moveTo}`);
                                checkmate = false;
                                revertChanges();
                                break;
                            }
                            else {
                                revertChanges();
                            }
                        }
                        if (checkmate == false) {
                            break;
                        }
                    }
                    revertChanges();
                    updateBoardPieces();
                    if (checkmate == true) {
                        updateTempText(`${currentMove} is Checkmated`, 1000000);
                        let otherPlayer = "";
                        if (currentMove == "white") {
                            otherPlayer = "black";
                        }
                        else if (currentMove == "black") {
                            otherPlayer = "white";
                        }
                        document.getElementById("currentMove").innerText = `${otherPlayer} Wins!`;
                        gameOver();
                    }
                }
                else {
                    updateTempText(``, 10);
                }
            }
            updateCurrentMove();
        }
        else if (board[selectedSquare] != undefined && board[selectedSquare].colour == currentMove) { //if it is not in the availableSquares, but there is still a piece there, it means that the user is trying to select another piece
            selectedPiece = selectedSquare;
            resetBoardColours();
            avaialableSquares = calculateAvailableMoves(board[selectedPiece].type, selectedPiece, currentMove);
        }
    }
};
const gameOver = () => {
    document.getElementById("renderingWindow").onclick = () => {
        camera.enableMovementControls("renderingWindow", false, false, false); //to disable movement
        alert("Reload Page to Play Again");
    };
};
