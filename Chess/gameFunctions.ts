const faceSquares: string[] = [];
const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8"];
for (let i = 0; i != numbers.length; i += 1) {
    for (let j = 0; j != letters.length; j += 1) {
        faceSquares.push(letters[j] + numbers[i]);
    }
}

const getFaceClicked = (mouseX: number, mouseY: number) => {
    const boardFaces: { square: string, center: number[] }[] = [];
    for (let i = 0; i != chessBoard.faces.length; i += 1) {

        const [p1Index, p2Index, p3Index, p4Index] = [chessBoard.faces[i].pointIndexes[0], chessBoard.faces[i].pointIndexes[1], chessBoard.faces[i].pointIndexes[2], chessBoard.faces[i].pointIndexes[3]]
        const [p1, p2, p3, p4] = [chessboardPoints.getColumn(p1Index), chessboardPoints.getColumn(p2Index), chessboardPoints.getColumn(p3Index), chessboardPoints.getColumn(p4Index)];
        //find average of points to get center
        const [totalX, totalY, totalZ] = [p1[0] + p2[0] + p3[0] + p4[0], p1[1] + p2[1] + p3[1] + p4[1], p1[2] + p2[2] + p3[2] + p4[2]];
        const [averageX, averageY, averageZ] = [totalX / 4, totalY / 4, totalZ / 4];
        boardFaces.push( { square: faceSquares[i], center: [averageX, averageY, averageZ] } );
    }

        //need to convert the clickX and clickY into X and Y coordinates on the grid
        const gridX = mouseX - (canvasWidth / 2);
        const gridY = (canvasHeight / 2) - mouseY;
        const cursorPoint = [gridX, gridY];

        //now loop through boardFaces, and find the face whose center is closest to the mouse
        const distanceBetween2D = (p1: number[], p2: number[]) => { return Math.sqrt((p2[0] - p1[0])**2 + (p2[1] - p1[1])**2); }
        let closestFaceIndex = 0;
        for (let i = 0; i != boardFaces.length; i += 1) {
            if (distanceBetween2D(cursorPoint, boardFaces[i].center) < distanceBetween2D(cursorPoint, boardFaces[closestFaceIndex].center)) { closestFaceIndex = i; }
        }

        //it will always have a closest point by default (a1), but we don't want to highlight a square when the user didn't mean to click it
        if (distanceBetween2D(cursorPoint, boardFaces[closestFaceIndex].center) < 100) { return boardFaces[closestFaceIndex].square; }
        else { return undefined; }
}

const movedSquare = (square: string, vertical: number, horizontal: number) => {
    //relative to white, e.g. vertical +2, and horizontal +2 from a1 would be c3
    const letterIndex = letters.indexOf(square[0]) + horizontal;
    const numberIndex = numbers.indexOf(square[1]) + vertical;
    const newSquare = letters[letterIndex] + numbers[numberIndex];

    //check if new square is contained in face squares
    if (faceSquares.includes(newSquare)) { return newSquare; }
    else { return undefined; }
}

const calculateAvailableMoves = (pieceType: string, currentSquare: string, colour: string) => {
    const avaialableSquares: any[] = [];

    //ALSO HAVE TO DIFFERENTIATE BETWEEN WHITE AND BLACK, FOR EXAMPLE WHITE PAWN MOVE FORWARD 1, BUT BLACK PAWN WILL MOVE BACKWARD 1 RELATIVE TO WHITE

    if (pieceType == "pawn") {
        //can only move 1 forward
        if (colour == "white") { avaialableSquares.push(movedSquare(currentSquare, 1, 0)); }
        else if (colour == "black") { avaialableSquares.push(movedSquare(currentSquare, -1, 0)); }
    }
    else if (pieceType == "rook") {
        //can move wherever in a straight line
        //all movement are relative to white
        let [vertical, horizontal] = [0, 0]
        let newSquare: any = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //moving forward until you hit edge of board
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            vertical += 1;
        }

        [vertical, horizontal] = [0, 0];
        newSquare = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //moving backward until you hit edge of board
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            vertical -= 1;
        }

        [vertical, horizontal] = [0, 0];
        newSquare = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //moving left until you hit edge of board
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            horizontal -= 1;
        }

        [vertical, horizontal] = [0, 0];
        newSquare = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //moving right until you hit edge of board
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            horizontal += 1;
        }
    }
    else if (pieceType == "knight") {
        //knight moves in an L shape, so he has 8 moves in total, we don't check for undefined here, that gets filtered out at the end
        avaialableSquares.push(movedSquare(currentSquare, 2, 1));
        avaialableSquares.push(movedSquare(currentSquare, 2, -1));
        avaialableSquares.push(movedSquare(currentSquare, 1, 2));
        avaialableSquares.push(movedSquare(currentSquare, -1, 2));
        avaialableSquares.push(movedSquare(currentSquare, -2, 1));
        avaialableSquares.push(movedSquare(currentSquare, -2, -1));
        avaialableSquares.push(movedSquare(currentSquare, 1, -2));
        avaialableSquares.push(movedSquare(currentSquare, -1, -2));
    }
    else if (pieceType == "bishop") {
        //can move wherever in a diagonal line
        let [vertical, horizontal] = [0, 0]
        let newSquare: any = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //forward-left
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            vertical += 1;
            horizontal -= 1;
        }

        [vertical, horizontal] = [0, 0];
        newSquare = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //forward-right
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            vertical += 1;
            horizontal += 1;
        }

        [vertical, horizontal] = [0, 0];
        newSquare = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //backward-left
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            vertical -= 1;
            horizontal -= 1;
        }

        [vertical, horizontal] = [0, 0];
        newSquare = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //backward-right
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            vertical -= 1;
            horizontal += 1;
        }
    }
    else if (pieceType == "queen") {
        //just combine rook and bishop's movement

        let [vertical, horizontal] = [0, 0]
        let newSquare: any = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //moving forward until you hit edge of board
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            vertical += 1;
        }

        [vertical, horizontal] = [0, 0];
        newSquare = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //moving backward until you hit edge of board
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            vertical -= 1;
        }

        [vertical, horizontal] = [0, 0];
        newSquare = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //moving left until you hit edge of board
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            horizontal -= 1;
        }

        [vertical, horizontal] = [0, 0];
        newSquare = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //moving right until you hit edge of board
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            horizontal += 1;
        }
        
        [vertical, horizontal] = [0, 0]
        newSquare = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //forward-left
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            vertical += 1;
            horizontal -= 1;
        }

        [vertical, horizontal] = [0, 0];
        newSquare = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //forward-right
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            vertical += 1;
            horizontal += 1;
        }

        [vertical, horizontal] = [0, 0];
        newSquare = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //backward-left
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            vertical -= 1;
            horizontal -= 1;
        }

        [vertical, horizontal] = [0, 0];
        newSquare = JSON.parse(JSON.stringify(currentSquare));
        while (newSquare != undefined) { //backward-right
            newSquare = movedSquare(currentSquare, vertical, horizontal); 
            avaialableSquares.push(newSquare);
            if (board[newSquare] != undefined && newSquare != currentSquare) { break; }
            vertical -= 1;
            horizontal += 1;
        }
    }
    else if (pieceType == "king") {
        //can move in any direction, but only once, will add moves similar to knight, which then get filtered later
        avaialableSquares.push(movedSquare(currentSquare, 1, 0));
        avaialableSquares.push(movedSquare(currentSquare, 1, 1));
        avaialableSquares.push(movedSquare(currentSquare, 0, 1));
        avaialableSquares.push(movedSquare(currentSquare, -1, 1));
        avaialableSquares.push(movedSquare(currentSquare, -1, 0));
        avaialableSquares.push(movedSquare(currentSquare, -1, -1));
        avaialableSquares.push(movedSquare(currentSquare, 0, -1));
        avaialableSquares.push(movedSquare(currentSquare, 1, -1));
    }

    //check if the moves are valid, invalid if the same colour piece occupies the space
    let i = 0; while (i != avaialableSquares.length) { if (board[avaialableSquares[i]]?.colour == colour || avaialableSquares[i] == undefined) { avaialableSquares.splice(i, 1); } else { i += 1; } }
    
    document.getElementById("currentMove")!.innerText = `${colour} selected ${pieceType} at ${currentSquare}\nCan move to: ${JSON.stringify(avaialableSquares)}`;
    for (let i = 0; i != avaialableSquares.length; i += 1) { highlightSquare(avaialableSquares[i], "#ff0000"); }
    highlightSquare(currentSquare, "#87ceeb")

    return avaialableSquares;
}

const kingInCheck = (colour: string) => {

    //check if the king of the specified colour is in check at the current moment
    //first get positions of every opposing colour's piece, as well as position of your own king
    let opposingColour = "";
    if (colour == "white") { opposingColour = "black"; }
    else if (colour == "black") { opposingColour = "white"; }

    let kingPosition = "";
    const opposingPieces: { position: string, type: string }[] = [];
    for (let key in board) {
        if (board[key].colour == opposingColour) {
            opposingPieces.push( { position: key, type: board[key].type } );
        }
        else if (board[key].colour == colour && board[key].type == "king") { kingPosition = key; }
    }

    //now find the possible moves for all the opposing pieces, and check if the king position is contained in any of them
    for (let i = 0; i != opposingPieces.length; i += 1) {
        const opposingPiece = opposingPieces[i];
        const possibleMoves = calculateAvailableMoves(opposingPiece.type, opposingPiece.position, opposingColour);
        resetBoardColours();
        if (possibleMoves.includes(kingPosition)) {
            return true;
        }
    }
 
    return false;
}