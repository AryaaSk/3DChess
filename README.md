# 3D Chess
## A chess game in 3D, which I made to test my 3D Engine

## How to play
It is just like regular chess, but 3D, you can use the mouse to look around the board and zoom in/out.\
**The game may have some bugs here and there, since I was more focused on the 3D aspect rather than the actual gameplay**



## Objects and Models
I had to model every piece individually using the [Shape Builder](https://aryaask.github.io/3D-Engine/ShapeBuilder/). If you want the models, you can go to the [Pieces File](Chess/pieces.ts), if you look at the top there are the piece object clases.

I also had to model the chess board itself, which is just a box and then a custom plane on top, the plane has 64 faces to represent the 64 spaces on a chess board, the model of that is after all the piece models, it's called ChessboardTop. To construct the board I create a box of dimensions *800 x 100 x 800*, and then place the ChessboardTop on top of this.

## How it works
### Game Flow:
There is a Piece class, which contains about:
- It's type, what type of piece it is, e.g. a Rook or a Queen
- It's colour, if it is White or Black
- It's body, this is the piece's physical object, of class Shape from my 3D Library.

There is a board variable, stored in a dictionary, which contains data in the structure: **[Position : Piece]**, the position of the piece is the chess notation of the piece, e.g. A1 or G4, and the piece is an instance of the Piece class, to position it I use a function which takes in a chess square and returns a physical position in the 3D World, then I just place the piece's body there

The game flow works like this:
1. There is a variable called currentMove which stores whose move it is, it starts as "white"
2. When the user clicks on the canvas, it calculates the closests face to the mouse position, and assumes the user wanted to click that square
    1. A variable called selectedPiece keeps track it the user has already selected a piece, if this is undefined then it sets it. Then it calculates the available moves based on the piece that was in the square that was selected and stores them in a variable called availableSquares. It then presents these moves to the user.

    2. If selectedPiece is already selected, then the user it trying to select the square which they want to move the selectedPiece to, I check if that square is in the availableSquares *(the squares which the selectedPiece can move to, calculated above)*.
        - After moving the piece, I check if their king is in check. If the king is in check then I revert the move, show an alert, and the user has to pick another square to move the selectedPiece.
        - If the currentMoves king is not in check, then I also check if the other players king is in check, if it is then it means the previous move put it in check. If the other player's king is in check then I also check for a checkmate. *Look below for info on how that works*. It the other player's king is in checkmate then I call the gameOver() function, and end the game.

    3. If the square the user selected was not in availableSquares, but there is still a piece there, it means the user is trying to switch the original selection for selectedPiece, so the game changes the selectedPiece, and restarts the process.

3. When gameOver() is called, the canvas.clicked function is overritten, and whenever the user clicks, an alert pops up telling the user to reload the page to play again.

### Check and Checkmate:
- To check if a player's king is in check:
    1. Get all the opposing player's pieces.
    2. Calculate all the possible moves they can make.
    3. If just one of the possible moves contains the king's position, then it means the king is in check.

- To check for checkamte, it means that you cannot do anything to get out of check, so it is a bit more defensive. Assume checkmate by default.
    1. Get all of your own pieces.
    2. Calculate all possible moves for your own pieces.
    3. Actually perform the moves one by one, **It is important to revert the changes after each move**.
    4. Then after each move, check if the king is still in check, if he is not then you know you are not in checkmate.

*One of the missing features is the Stalemate, which is when your king is not directly in check, but cannot move anywhere without being in check, I may implement this later*