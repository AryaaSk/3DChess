const setColour = (body: Shape, colour: string) => {
    for (let i = 0; i != body.faces.length; i +=1) {
        body.faces[i].colour = colour;
    }
}

//OBJECTS:
class PawnObject extends Shape {
    constructor () {
        super();

        this.pointMatrix = new matrix();
        const points = [[-15,79.375,5],[-5,79.375,15],[5,79.375,15],[15,79.375,5],[15,79.375,-5],[5,79.375,-15],[-5,79.375,-15],[-15,79.375,-5],[-21,87.625,7],[-7,87.625,21],[7,87.625,21],[21,87.625,7],[21,87.625,-7],[7,87.625,-21],[-7,87.625,-21],[-21,87.625,-7],[-25,95.875,8.4],[-8.4,95.875,25],[8.4,95.875,25],[25,95.875,8.4],[25,95.875,-8.4],[8.4,95.875,-25],[-8.4,95.875,-25],[-25,95.875,-8.4],[-21,112.375,7],[-7,112.375,21],[7,112.375,21],[21,112.375,7],[21,112.375,-7],[7,112.375,-21],[-7,112.375,-21],[-21,112.375,-7],[-15,120.625,5],[-5,120.625,15],[5,120.625,15],[15,120.625,5],[15,120.625,-5],[5,120.625,-15],[-5,120.625,-15],[-15,120.625,-5],[-25,104.125,8.4],[-8.4,104.125,25],[8.4,104.125,25],[25,104.125,8.4],[25,104.125,-8.4],[8.4,104.125,-25],[-8.4,104.125,-25],[-25,104.125,-8.4],[0,73.875,0],[0,126.125,0],[-30,0,30],[30,0,30],[30,0,-30],[-30,0,-30],[-30,10,30],[30,10,30],[30,10,-30],[-30,10,-30],[-25,20,25],[25,20,25],[25,20,-25],[-25,20,-25],[-10,35,10],[10,35,10],[10,35,-10],[-10,35,-10]];
        for (let i = 0; i != points.length; i += 1)
        { this.pointMatrix.addColumn(points[i]); }

        const [centeringX, centeringY, centeringZ] = [0, 0, 0];
        this.pointMatrix.translateMatrix(centeringX, centeringY, centeringZ);

        this.setFaces();
        this.updateMatrices();
    }
    setFaces() {
        this.faces = [{pointIndexes:[0,8,15,7],colour:"#c4c4c4"},{pointIndexes:[7,6,14,15],colour:"#c4c4c4"},{pointIndexes:[6,5,13,14],colour:"#c4c4c4"},{pointIndexes:[5,4,12,13],colour:"#c4c4c4"},{pointIndexes:[4,3,11,12],colour:"#c4c4c4"},{pointIndexes:[3,2,10,11],colour:"#c4c4c4"},{pointIndexes:[2,1,9,10],colour:"#c4c4c4"},{pointIndexes:[1,0,8,9],colour:"#c4c4c4"},{pointIndexes:[9,8,16,17],colour:"#c4c4c4"},{pointIndexes:[8,15,23,16],colour:"#c4c4c4"},{pointIndexes:[15,14,22,23],colour:"#c4c4c4"},{pointIndexes:[14,13,21,22],colour:"#c4c4c4"},{pointIndexes:[13,12,20,21],colour:"#c4c4c4"},{pointIndexes:[12,11,19,20],colour:"#c4c4c4"},{pointIndexes:[11,10,18,19],colour:"#c4c4c4"},{pointIndexes:[10,9,17,18],colour:"#c4c4c4"},{pointIndexes:[18,17,41,42],colour:"#c4c4c4"},{pointIndexes:[17,16,40,41],colour:"#c4c4c4"},{pointIndexes:[16,23,47,40],colour:"#c4c4c4"},{pointIndexes:[23,22,46,47],colour:"#c4c4c4"},{pointIndexes:[22,21,45,46],colour:"#c4c4c4"},{pointIndexes:[21,20,44,45],colour:"#c4c4c4"},{pointIndexes:[20,19,43,44],colour:"#c4c4c4"},{pointIndexes:[19,18,42,43],colour:"#c4c4c4"},{pointIndexes:[44,28,27,43],colour:"#c4c4c4"},{pointIndexes:[43,27,26,42],colour:"#c4c4c4"},{pointIndexes:[42,26,25,41],colour:"#c4c4c4"},{pointIndexes:[41,25,24,40],colour:"#c4c4c4"},{pointIndexes:[40,24,31,47],colour:"#c4c4c4"},{pointIndexes:[47,31,30,46],colour:"#c4c4c4"},{pointIndexes:[46,30,29,45],colour:"#c4c4c4"},{pointIndexes:[45,29,28,44],colour:"#c4c4c4"},{pointIndexes:[30,29,37,38],colour:"#c4c4c4"},{pointIndexes:[29,28,36,37],colour:"#c4c4c4"},{pointIndexes:[28,27,35,36],colour:"#c4c4c4"},{pointIndexes:[27,26,34,35],colour:"#c4c4c4"},{pointIndexes:[26,25,33,34],colour:"#c4c4c4"},{pointIndexes:[25,24,32,33],colour:"#c4c4c4"},{pointIndexes:[24,31,39,32],colour:"#c4c4c4"},{pointIndexes:[31,30,38,39],colour:"#c4c4c4"},{pointIndexes:[7,48,6],colour:"#c4c4c4"},{pointIndexes:[6,48,5],colour:"#c4c4c4"},{pointIndexes:[5,48,4],colour:"#c4c4c4"},{pointIndexes:[4,48,3],colour:"#c4c4c4"},{pointIndexes:[3,48,2],colour:"#c4c4c4"},{pointIndexes:[2,48,1],colour:"#c4c4c4"},{pointIndexes:[1,48,0],colour:"#c4c4c4"},{pointIndexes:[0,48,7],colour:"#c4c4c4"},{pointIndexes:[38,49,39],colour:"#c4c4c4"},{pointIndexes:[49,38,37],colour:"#c4c4c4"},{pointIndexes:[37,49,36],colour:"#c4c4c4"},{pointIndexes:[36,49,35],colour:"#c4c4c4"},{pointIndexes:[35,49,34],colour:"#c4c4c4"},{pointIndexes:[34,49,33],colour:"#c4c4c4"},{pointIndexes:[33,49,32],colour:"#c4c4c4"},{pointIndexes:[49,32,39],colour:"#c4c4c4"},{pointIndexes:[62,65,7,1],colour:"#c4c4c4"},{pointIndexes:[65,64,5,7],colour:"#c4c4c4"},{pointIndexes:[64,63,3,5],colour:"#c4c4c4"},{pointIndexes:[63,62,1,3],colour:"#c4c4c4"},{pointIndexes:[59,58,62,63],colour:"#c4c4c4"},{pointIndexes:[58,61,65,62],colour:"#c4c4c4"},{pointIndexes:[61,60,64,65],colour:"#c4c4c4"},{pointIndexes:[60,59,63,64],colour:"#c4c4c4"},{pointIndexes:[56,55,59,60],colour:"#c4c4c4"},{pointIndexes:[55,54,58,59],colour:"#c4c4c4"},{pointIndexes:[54,57,61,58],colour:"#c4c4c4"},{pointIndexes:[57,56,60,61],colour:"#c4c4c4"},{pointIndexes:[50,53,57,54],colour:"#c4c4c4"},{pointIndexes:[53,52,56,57],colour:"#c4c4c4"},{pointIndexes:[52,51,55,56],colour:"#c4c4c4"},{pointIndexes:[51,50,54,55],colour:"#c4c4c4"},{pointIndexes:[51,50,53,52],colour:"#c4c4c4"}];
    }
}
class RookObject extends Shape {
    constructor () {
        super();

        this.pointMatrix = new matrix();
        const points = [[-30,0,30],[30,0,30],[30,0,-30],[-30,0,-30],[-30,10,30],[30,10,30],[30,10,-30],[-30,10,-30],[-25,20,25],[25,20,25],[25,20,-25],[-25,20,-25],[-10,35,10],[10,35,10],[10,35,-10],[-10,35,-10],[-10,100,10],[10,100,10],[10,100,-10],[-10,100,-10],[-25,110,25],[25,110,25],[25,110,-25],[-25,110,-25],[-25,130,25],[25,130,25],[25,130,-25],[-25,130,-25],[-10,120,10],[10,120,10],[10,120,-10],[-10,120,-10]];
        for (let i = 0; i != points.length; i += 1)
        { this.pointMatrix.addColumn(points[i]); }

        const [centeringX, centeringY, centeringZ] = [0, 0, 0];
        this.pointMatrix.translateMatrix(centeringX, centeringY, centeringZ);

        this.setFaces();
        this.updateMatrices();
    }
    setFaces() {
        this.faces = [{pointIndexes:[1,0,4,5],colour:"#c4c4c4"},{pointIndexes:[0,3,7,4],colour:"#c4c4c4"},{pointIndexes:[3,2,6,7],colour:"#c4c4c4"},{pointIndexes:[2,1,5,6],colour:"#c4c4c4"},{pointIndexes:[6,10,9,5],colour:"#c4c4c4"},{pointIndexes:[5,9,8,4],colour:"#c4c4c4"},{pointIndexes:[4,8,11,7],colour:"#c4c4c4"},{pointIndexes:[10,11,7,6],colour:"#c4c4c4"},{pointIndexes:[11,15,14,10],colour:"#c4c4c4"},{pointIndexes:[10,14,13,9],colour:"#c4c4c4"},{pointIndexes:[9,13,12,8],colour:"#c4c4c4"},{pointIndexes:[8,12,15,11],colour:"#c4c4c4"},{pointIndexes:[12,15,19,16],colour:"#c4c4c4"},{pointIndexes:[15,14,18,19],colour:"#c4c4c4"},{pointIndexes:[14,18,17,13],colour:"#c4c4c4"},{pointIndexes:[13,17,16,12],colour:"#c4c4c4"},{pointIndexes:[18,22,21,17],colour:"#c4c4c4"},{pointIndexes:[21,17,16,20],colour:"#c4c4c4"},{pointIndexes:[20,16,19,23],colour:"#c4c4c4"},{pointIndexes:[23,19,18,22],colour:"#c4c4c4"},{pointIndexes:[27,23,22,26],colour:"#c4c4c4"},{pointIndexes:[26,22,21,25],colour:"#c4c4c4"},{pointIndexes:[25,21,20,24],colour:"#c4c4c4"},{pointIndexes:[24,20,23,27],colour:"#c4c4c4"},{pointIndexes:[24,28,31,27],colour:"#c4c4c4"},{pointIndexes:[27,31,30,26],colour:"#c4c4c4"},{pointIndexes:[26,30,29,25],colour:"#c4c4c4"},{pointIndexes:[25,29,28,24],colour:"#c4c4c4"},{pointIndexes:[30,31,28,29],colour:"#c4c4c4"}];
    }
}



//Piece Classes
const whitePieceColour = "#ffffff";
const blackPieceColour = "#525252";
class Piece {
    chessPosition: string = "a1";
    colour: string = "white";

    body: Shape = new Shape(); //a reference to an object which will get rendered

    updateGridPosition(chessPosition?: string) { //when building the shape, center on x and z, but not on y, the whole piece should sit on the y-axis
        if (chessPosition != undefined) { this.chessPosition = chessPosition; }
        const piecePosition = squareToGridPosition(this.chessPosition);
        this.body.position.x = piecePosition[0];
        this.body.position.y = 50;
        this.body.position.z = piecePosition[2];
    }
}

class Pawn extends Piece {
    constructor (colour: string) {
        super();

        this.body = new PawnObject();
        this.body.showOutline = true;
        this.body.scale = 0.8;
        this.body.updateMatrices();

        this.colour = colour;
        if (this.colour == "white") { setColour(this.body, whitePieceColour); }
        else if (this.colour == "black") { setColour(this.body, blackPieceColour) }
    }
}

class Rook extends Piece {
    constructor (colour: string) {
        super();

        this.body = new RookObject();
        this.body.showOutline = true;
        this.body.scale = 1;
        this.body.updateMatrices();

        this.colour = colour;
        if (this.colour == "white") { setColour(this.body, whitePieceColour); }
        else if (this.colour == "black") { setColour(this.body, blackPieceColour) }
    }
}