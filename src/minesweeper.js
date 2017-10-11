const printBoard = board => {
  console.log('Current Board:');
  for (i = 0; i < 3; i++) {
    console.log(board[i].join(' | '));
  }
};

let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

printBoard(board);
board[0][1] = '1';
board[2][2] = 'B';
printBoard(board);
