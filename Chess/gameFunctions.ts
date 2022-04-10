const calculateAvailableMoves = (pieceType: string, currentSquare: string, colour: string) => {
    const avaialableSquares = [];

    //ALSO HAVE TO DIFFERENTIATE BETWEEN WHITE AND BLACK, FOR EXAMPLE WHITE PAWN MOVE FORWARD 1, BUT BLACK PAWN WILL MOVE BACKWARD 1 RELATIVE TO WHITE

    if (pieceType == "pawn") {
        //can only move 1 forward
        if (colour == "white") { avaialableSquares.push(`${currentSquare[0]}${Number(currentSquare[1]) + 1}`); }
        else if (colour == "black") { avaialableSquares.push(`${currentSquare[0]}${Number(currentSquare[1]) - 1}`); }
    }
    else if (pieceType == "rook") {
        //can move wherever in a straight line
        //TODO: IMPLEMENT ROOK MOVEMENT
    }

    //check if the moves are valid, invalid if the same colour piece occupies the space
    let i = 0; while (i != avaialableSquares.length) { if (board[avaialableSquares[i]]?.colour == colour) { avaialableSquares.splice(i, 1); } else { i += 1; } }
    
    document.getElementById("currentMove")!.innerText = `${colour} selected ${pieceType} at ${currentSquare}\nCan move to: ${JSON.stringify(avaialableSquares)}`;
    for (let i = 0; i != avaialableSquares.length; i += 1) { highlightSquare(avaialableSquares[i]); }

    return avaialableSquares;
}


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