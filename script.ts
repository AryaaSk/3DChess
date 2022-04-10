linkCanvas("renderingWindow");

const camera = new Camera();
camera.worldRotation.x = -20;
camera.worldRotation.y = 20;
camera.updateRotationMatrix();
camera.enableMovementControls("renderingWindow", true, true, true, true);


class ChessBoardTop extends Shape {
    constructor () {
        super();

        this.pointMatrix = new matrix();
        const points = [[0,0,0],[100,0,0],[100,0,100],[0,0,100],[0,0,200],[100,0,200],[100,0,300],[0,0,300],[0,0,400],[100,0,400],[100,0,500],[0,0,500],[0,0,600],[100,0,600],[100,0,700],[0,0,700],[0,0,800],[100,0,800],[200,0,0],[300,0,0],[300,0,100],[200,0,100],[200,0,200],[300,0,200],[300,0,300],[200,0,300],[200,0,400],[300,0,400],[300,0,500],[200,0,500],[200,0,600],[300,0,600],[300,0,700],[200,0,700],[200,0,800],[300,0,800],[400,0,0],[500,0,0],[500,0,100],[400,0,100],[400,0,200],[500,0,200],[500,0,300],[400,0,300],[400,0,400],[500,0,400],[500,0,500],[400,0,500],[400,0,600],[500,0,600],[500,0,700],[400,0,700],[400,0,800],[500,0,800],[600,0,0],[700,0,0],[700,0,100],[600,0,100],[600,0,200],[700,0,200],[700,0,300],[600,0,300],[600,0,400],[700,0,400],[700,0,500],[600,0,500],[600,0,600],[700,0,600],[700,0,700],[600,0,700],[600,0,800],[700,0,800],[800,0,0],[800,0,100],[800,0,200],[800,0,300],[800,0,400],[800,0,500],[800,0,600],[800,0,700],[800,0,800]];
        for (let i = 0; i != points.length; i += 1)
        { this.pointMatrix.addColumn(points[i]); }

        const [centeringX, centeringY, centeringZ] = [-400, 0, -400];
        this.pointMatrix.translateMatrix(centeringX, centeringY, centeringZ);

        this.setFaces();
        this.updateMatrices();
    }
    setFaces() {
        this.faces = [{pointIndexes:[0,1,2,3],colour:"#c4c4c4"},{pointIndexes:[1,18,21,2],colour:"#c4c4c4"},{pointIndexes:[18,19,20,21],colour:"#c4c4c4"},{pointIndexes:[19,36,39,20],colour:"#c4c4c4"},{pointIndexes:[36,37,38,39],colour:"#c4c4c4"},{pointIndexes:[37,54,57,38],colour:"#c4c4c4"},{pointIndexes:[54,55,56,57],colour:"#c4c4c4"},{pointIndexes:[55,72,73,56],colour:"#c4c4c4"},{pointIndexes:[3,2,5,4],colour:"#c4c4c4"},{pointIndexes:[2,21,22,5],colour:"#c4c4c4"},{pointIndexes:[21,20,23,22],colour:"#c4c4c4"},{pointIndexes:[20,39,40,23],colour:"#c4c4c4"},{pointIndexes:[39,38,41,40],colour:"#c4c4c4"},{pointIndexes:[38,57,58,41],colour:"#c4c4c4"},{pointIndexes:[57,56,59,58],colour:"#c4c4c4"},{pointIndexes:[56,73,74,59],colour:"#c4c4c4"},{pointIndexes:[4,5,6,7],colour:"#c4c4c4"},{pointIndexes:[5,22,25,6],colour:"#c4c4c4"},{pointIndexes:[22,23,24,25],colour:"#c4c4c4"},{pointIndexes:[23,40,43,24],colour:"#c4c4c4"},{pointIndexes:[40,41,42,43],colour:"#c4c4c4"},{pointIndexes:[41,58,61,42],colour:"#c4c4c4"},{pointIndexes:[58,59,60,61],colour:"#c4c4c4"},{pointIndexes:[59,74,75,60],colour:"#c4c4c4"},{pointIndexes:[7,6,9,8],colour:"#c4c4c4"},{pointIndexes:[6,25,26,9],colour:"#c4c4c4"},{pointIndexes:[25,24,27,26],colour:"#c4c4c4"},{pointIndexes:[24,43,44,27],colour:"#c4c4c4"},{pointIndexes:[43,42,45,44],colour:"#c4c4c4"},{pointIndexes:[42,61,62,45],colour:"#c4c4c4"},{pointIndexes:[61,60,63,62],colour:"#c4c4c4"},{pointIndexes:[60,75,76,63],colour:"#c4c4c4"},{pointIndexes:[8,9,10,11],colour:"#c4c4c4"},{pointIndexes:[9,26,29,10],colour:"#c4c4c4"},{pointIndexes:[26,27,28,29],colour:"#c4c4c4"},{pointIndexes:[27,44,47,28],colour:"#c4c4c4"},{pointIndexes:[44,45,46,47],colour:"#c4c4c4"},{pointIndexes:[45,62,65,46],colour:"#c4c4c4"},{pointIndexes:[62,63,64,65],colour:"#c4c4c4"},{pointIndexes:[63,76,77,64],colour:"#c4c4c4"},{pointIndexes:[11,10,13,12],colour:"#c4c4c4"},{pointIndexes:[10,29,30,13],colour:"#c4c4c4"},{pointIndexes:[29,28,31,30],colour:"#c4c4c4"},{pointIndexes:[28,47,48,31],colour:"#c4c4c4"},{pointIndexes:[47,46,49,48],colour:"#c4c4c4"},{pointIndexes:[46,65,66,49],colour:"#c4c4c4"},{pointIndexes:[65,64,67,66],colour:"#c4c4c4"},{pointIndexes:[64,77,78,67],colour:"#c4c4c4"},{pointIndexes:[12,13,14,15],colour:"#c4c4c4"},{pointIndexes:[13,30,33,14],colour:"#c4c4c4"},{pointIndexes:[30,31,32,33],colour:"#c4c4c4"},{pointIndexes:[31,48,51,32],colour:"#c4c4c4"},{pointIndexes:[48,49,50,51],colour:"#c4c4c4"},{pointIndexes:[49,66,69,50],colour:"#c4c4c4"},{pointIndexes:[66,67,68,69],colour:"#c4c4c4"},{pointIndexes:[67,78,79,68],colour:"#c4c4c4"},{pointIndexes:[15,14,17,16],colour:"#c4c4c4"},{pointIndexes:[14,33,34,17],colour:"#c4c4c4"},{pointIndexes:[33,32,35,34],colour:"#c4c4c4"},{pointIndexes:[32,51,52,35],colour:"#c4c4c4"},{pointIndexes:[51,50,53,52],colour:"#c4c4c4"},{pointIndexes:[50,69,70,53],colour:"#c4c4c4"},{pointIndexes:[69,68,71,70],colour:"#c4c4c4"},{pointIndexes:[68,79,80,71],colour:"#c4c4c4"}];
    }
}

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

//Pieces
const board: {[k: string] : Piece} = {};
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


let boardPieces: Shape[] = [];
const updateBoardPieces = () => { //call this everytime there is a change on the board
    boardPieces = [];
    for (let key in board) {
        const currentPiece = board[key];
        currentPiece.chessPosition = key;
        currentPiece.updateGridPosition();
        boardPieces.push(currentPiece.body);
    }
}
updateBoardPieces();






setInterval(() => {
    clearCanvas();
    //camera.renderGrid();
    camera.render([chessBoardBody, chessBoard]);
    camera.render(boardPieces); //pieces are always on top of board, which is why I limit rotation, in the future I should combine all objects into 1 when rendering
});

document.onkeydown = ($e) => {
    const key = $e.key.toLowerCase();
    if (key == "escape") {
        const square = prompt("What square do you want to highlight");
        highlightSquare(square!);
    }
}

let currentMove = "white";
const gameLoop = () => {
    
}
