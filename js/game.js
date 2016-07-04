var board = [
              [ '.', '.', '.' ],
              [ '.', '.', '.' ],
              [ '.', '.', '.' ]
            ];

var winningPatterns = [
                        [
                          [ 0, 0 ], [ 0, 1 ], [ 0, 2 ]
                        ],
                        [
                          [ 1, 0 ], [ 1, 1 ], [ 1, 2 ]
                        ],
                        [
                          [ 2, 0 ], [ 2, 1 ], [ 2, 2 ]
                        ],
                        [
                          [ 0, 0 ], [ 1, 0 ], [ 2, 0 ]
                        ],
                        [
                          [ 0, 1 ], [ 1, 1 ], [ 2, 1 ]
                        ],
                        [
                          [ 0, 2 ], [ 1, 2 ], [ 2, 2 ]
                        ],
                        [
                          [ 0, 0 ], [ 1, 1 ], [ 2, 2 ]
                        ],
                        [
                          [ 0, 2 ], [ 1, 1 ], [ 2, 0 ]
                        ]
                      ];


var Board = function() {
  this.board = board;
  this.turn = 0;
  this.currentPlayer = this.trace();
  this.winner = '.';
};

Board.prototype.trace = function() {
  function isEven( x ) { return ( x % 2 ) == 0; };

  if ( isEven( this.turn ) ) {
    return 'X';
  } else {
    return 'O';
  };
};

Board.prototype.placeOnBoard = function( position, player ) {
  $( 'table tr.row-' + position[ 0 ] + ' td.col-' + position[ 1 ] ).append( player )
};

Board.prototype.playerMove = function( position, player ) {
  if ( this.board[ position[ 0 ] ][ position[ 1 ] ] === '.' ) {
    this.board[ position[ 0 ] ][ position[ 1 ] ] = player;
  };
  this.placeOnBoard( position, this.currentPlayer );
};

Board.prototype.checkForWinner = function( player ) {
  var allPositions = []
  var matched = 0

  this.board.forEach( function( row, idx ) {
    row.forEach( function( letter, idx2 ) {
      if ( letter === player ) {
        allPositions.push( [ idx, idx2 ] );
      };
    });
  });

  for ( var idx = 0; idx < winningPatterns.length; idx++ ) {
    for ( var idx2 = 0; idx2 < winningPatterns[ idx ].length; idx2++ ) {
      for ( var idx3 = 0; idx3 < allPositions.length; idx3++ ) {
        if ( winningPatterns[ idx ][ idx2 ].toString() === allPositions[ idx3 ].toString() ) {
          matched ++
          if ( matched === 3 ) {
            this.winner = player;
            return true;
          };
        };
      };
    };
    matched = 0;
  };
  return false;
};

Board.prototype.generateRandomPosition = function() {
  var position = []

  do {
    var row = Math.floor( Math.random() * this.board.length );
    var col = Math.floor( Math.random() * this.board[ row ].length );
    position = [ row, col ]
  } while ( this.board[ position[ 0 ] ][ position[ 1 ] ] !== '.' )

  return position;
}

Board.prototype.automateComputerTurn = function( player ) {
  if ( player === 'O' ) {
    var position = this.generateRandomPosition();
    this.playerMove( position, player );
    this.checkForWinner( player );
    this.turn ++;
    this.currentPlayer = this.trace();
  }
}
