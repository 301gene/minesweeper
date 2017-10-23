class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log('Game over! Final Board:');
      this._board.print();
    }
      else if (!this._board.hasSafeTiles()) {
        console.log('You won!');
        this._board.print();
      }
        else {
          console.log('Current Board:');
          this._board.print();
        }
  }
}

// class board
class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  // getter method for player board
  get playerBoard() {
    return this._playerBoard;
  }

  // fliptile function
  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] === '') {
      console.log('This tile has already been flipped!');
      return;
    }
    else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    }
    else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }

    this._numberOfTiles--;
  }

  // function to get the number of bombs in adjacent cell
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    // check the adjacent cells for bombs
    neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
    });

    return numberOfBombs;
  }

  //function to determine if the player has won
  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  // Print board function
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  // function that generates a blank board of a given size to hold the player's guess
  static generatePlayerBoard (numberOfRows, numberOfColumns) {
    let board = []; // array that represents the board
    // add rows and columns to the board, based on user input
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  // function that generates the bomb board
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = []; // array that represents the board
    // add rows and columns to the board, based on user input
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      let row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;

    // place the bombs in random cells
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if(board[randomRowIndex][randomColumnIndex] != 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }

    return board;
  }

}


/*
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:');
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 1);
console.log('Updated Player Board:');
printBoard(playerBoard);
*/

const g = new Game(3, 3, 3);
g.playMove(0,0);
