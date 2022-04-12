# 3D Chess
## A chess game in 3D, which I made to test my [3D Engine](https://github.com/AryaaSk/3D-Engine)
I modified my library a little bit here, just to fit the needs of this project better

## How to play
It is just like regular chess, but 3D, you can use the mouse to look around the board and zoom in/out.\
**The game may have some bugs here and there, since I was more focused on the 3D aspect rather than the actual gameplay**

I hosted the game on Github Pages: https://aryaask.github.io/3DChess/index.html

Here are some previews of the game:
![Preview 1](https://github.com/AryaaSk/3DChess/blob/master/Previews/ChessPreview1.png?raw=true)

![Preview 2](https://github.com/AryaaSk/3DChess/blob/master/Previews/ChessPreview2.png?raw=true)

I have actually changed the theme to a Green and Grey theme, if you prefered the old theme as seen in the images above, then add this parameter to the URL:
```
theme=original
```

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

## Objects and Models
I had to model every piece individually using the [Shape Builder](https://aryaask.github.io/3D-Engine/ShapeBuilder/). If you want the models, you can go to the [Pieces File](Chess/pieces.ts), if you look at the top there are the piece object clases.

I also had to model the chess board itself, which is just a box and then a custom plane on top, the plane has 64 faces to represent the 64 spaces on a chess board, the model of that is after all the piece models, it's called ChessboardTop. To construct the board I create a box of dimensions *800 x 100 x 800*, and then place the ChessboardTop on top of this.

This is what the Queen and ChessboardTop look like in the Shape Builder, there is no colour since the colour is added dynamically based on the colour of the piece in the game:
<p float="left">
  <img src="https://github.com/AryaaSk/3DChess/blob/master/Previews/Queen.png?raw=true" width="250"/>
  <img src="https://github.com/AryaaSk/3DChess/blob/master/Previews/ChessboardTop.png?raw=true" width="500"/>
</p>

### 3D Positioning and Movement
- To convert a chess square position such as A1 or E7, into an actual 3D position in the world, I just used a simple formula:
    1. First I converted the Square into a column and row, for example, A1 is of column 0 and row 0, E7 is column 4, row 6.
    2. Then, since I know that the length and width of the chessboard is just going to be (800 * chessboard.scale), I can find the position of the piece using **((column or row) - 4) * 100 * chessboard.scale. This gives me the coordintes of the bottom-left corner of the square in the 3D world.
    3. Then to find the center of the square I just add (100 * chessboard.scale) to the X and Z coordinates. The height of the board remains at constant 100, so to position the piece on top of the board I set the Y to 50.
    - When modelling the pieces, I made sure to center the pieces on the X and Z axis, but not the Y axis, so that all pieces would be consistent, and I wouldn't have to do a calculation to find the Y axis based on the object's/piece's height.

- The 3D movement such as rotating the board, moving the board, and zooming in/out, is all handled by my 3D Library, I just called the  enabledMovementControls() function, however I did modify it a little to trigger on pointer events, rather than mouse events. I will have to change that in the original source code as well, since you need to use pointer events to be able to use the controls on mobile as well.

## Performance
Unfortunately I have realised that performance is an issue, since there are so many faces and points to calculate. I believe the main reason is because every pawn contains a sphere in it's model, which is the most demanding shape, so I could replce the sphere with a cube, to improve performance.

Here is the old pawn (sphere top), with the new one (square top), it improves performace a bit, but is still an issue:
<p float="left">
  <img src="https://github.com/AryaaSk/3DChess/blob/master/Previews/ChessPawn.png?raw=true" width="250"/>
  <img src="https://github.com/AryaaSk/3DChess/blob/master/Previews/ChessPawnSimple.png?raw=true" width="250"/>
</p>

Although that did not help much, I made some other improvements to performance by **modifying the source code of my 3D engine for this project**:
- It now uses requestAnimationFrame(), and I also have a variable called changeInState, which is a boolean. Every time there is a user interaction, such as dragging the mouse or clicking something, changeInState is set to true at the end of the function. Then in the animation loop, it only renders a new frame if changeInState == true, and then once it has rendered the frame it sets the changeInState back to false. **This helps performance by a few FPS**.

- I have singled the problem out to be because I am trying to do **too many operations on the canvas at once**, when I only draw the border lines, or only draw the faces, then it is fine. The solution is probably to use 2 canvases, 1 for the main faces, and 1 for the outlines. Then all calls to the drawLine function will actually draw to the second canvas.
    - After trying to use 2 canvasas, I realised that I needed it all to be rendered on a single canvas, since the lines are rendered with the face, so that they get ovrritten by another face which is layered on top of it. This means I need to try and improve the performance while still using a single canvas.

- To solve the issue for now, I have added a feature which will render the outlines separately before rendering the faces, this causes a 2D outline effect, it should help performance a lot however it does not that good compared to the regular outlines, which is why it is not enabled by default. To enable this add this parameter to the URL:
```
2doutlines=true
```
- The reason this helps performance is because it renders the outline separately from the faces, which means there are less operations being executed on the canvas at one time, improving the overall FPS.