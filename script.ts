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
            if (i % 2 == 0) { chessBoard.faces[i].colour = blackColour; }
            else { chessBoard.faces[i].colour = whiteColour; }
        }
        else {
            if (i % 2 == 0) { chessBoard.faces[i].colour = whiteColour; }
            else { chessBoard.faces[i].colour = blackColour; }
        }
    }
}
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


let chessboardPoints: matrix = new matrix();
setInterval(() => {
    clearCanvas();
    camera.render([chessBoardBody]);
    chessboardPoints = camera.render([chessBoard])[0].screenPoints;
    camera.render(boardPieces); //pieces are always on top of board, which is why I limit rotation, in the future I should combine all objects into 1 when rendering
});


let currentMove = "white";
const updateCurrentMove = () => { document.getElementById("currentMove")!.innerText = `Current Move: ${currentMove}`; }
updateCurrentMove();

let selectedPiece: any = undefined;
let avaialableSquares: string[] = [];

document.getElementById("renderingWindow")!.onclick = ($e) => {
    let clickedSquare = getFaceClicked($e.clientX, $e.clientY);;

    if (clickedSquare == undefined) { //user clicked outside the board, so we unselect the selectedPiece
        selectedPiece = undefined; 
        resetBoardColours(); 
        updateCurrentMove();
        return; 
    }
    else { clickedSquare!; }

    //check if the square is occupied by a piece on the board
    if (selectedPiece == undefined && board[clickedSquare]?.colour == currentMove ) { 
        selectedPiece = JSON.parse(JSON.stringify(clickedSquare)); 
        avaialableSquares = calculateAvailableMoves(board[selectedPiece].type, selectedPiece, currentMove);
    }
    else if (selectedPiece != undefined) {
        //the user has selected a piece, and now has chosen to move to another square
        const selectedSquare = JSON.parse(JSON.stringify(clickedSquare));
        
        //check whether selectedSquare is an allowedMove by checking if it is in the availableSquares
        if (avaialableSquares.includes(selectedSquare)) { 
            movePiece(selectedPiece, selectedSquare);
            resetBoardColours();

            selectedPiece = undefined;
            if (currentMove == "white") { currentMove = "black"; }
            else { currentMove = "white"; }
            updateCurrentMove();
        }
        else if ( board[selectedSquare] != undefined && board[selectedSquare].colour == currentMove ) { //if it is not in the availableSquares, but there is still a piece there, it means that the user is trying to select another piece
            selectedPiece = selectedSquare; 
            resetBoardColours();
            avaialableSquares = calculateAvailableMoves(board[selectedPiece].type, selectedPiece, currentMove);
        }
    }
}