var board = [
              [ '.', '.', '.' ],
              [ '.', '.', '.' ],
              [ '.', '.', '.' ]
            ];

var winningPatternsForX = [
                        [
                          [ 'X', 'X', 'X' ],
                          [ '.', '.', '.' ],
                          [ '.', '.', '.' ]
                        ],
                        [
                          [ 'X', '.', '.' ],
                          [ 'X', '.', '.' ],
                          [ 'X', '.', '.' ]
                        ],
                        [
                          [ 'X', '.', '.' ],
                          [ '.', 'X', '.' ],
                          [ '.', '.', 'X' ]
                        ],
                        [
                          [ '.', 'X', '.' ],
                          [ '.', 'X', '.' ],
                          [ '.', 'X', '.' ]
                        ],
                        [
                          [ '.', '.', 'X' ],
                          [ '.', '.', 'X' ],
                          [ '.', '.', 'X' ]
                        ],
                        [
                          [ '.', '.', 'X' ],
                          [ '.', 'X', '.' ],
                          [ 'X', '.', '.' ]
                        ],
                        [
                          [ '.', '.', '.' ],
                          [ 'X', 'X', 'X' ],
                          [ '.', '.', '.' ]
                        ],
                        [
                          [ '.', '.', '.' ],
                          [ '.', '.', '.' ],
                          [ 'X', 'X', 'X' ]
                        ],
                      ];

var winningPatternsForO = [
                        [
                          [ 'O', 'O', 'O' ],
                          [ '.', '.', '.' ],
                          [ '.', '.', '.' ]
                        ],
                        [
                          [ 'O', '.', '.' ],
                          [ 'O', '.', '.' ],
                          [ 'O', '.', '.' ]
                        ],
                        [
                          [ 'O', '.', '.' ],
                          [ '.', 'O', '.' ],
                          [ '.', '.', 'O' ]
                        ],
                        [
                          [ '.', 'O', '.' ],
                          [ '.', 'O', '.' ],
                          [ '.', 'O', '.' ]
                        ],
                        [
                          [ '.', '.', 'O' ],
                          [ '.', '.', 'O' ],
                          [ '.', '.', 'O' ]
                        ],
                        [
                          [ '.', '.', 'O' ],
                          [ '.', 'O', '.' ],
                          [ 'O', '.', '.' ]
                        ],
                        [
                          [ '.', '.', '.' ],
                          [ 'O', 'O', 'O' ],
                          [ '.', '.', '.' ]
                        ],
                        [
                          [ '.', '.', '.' ],
                          [ '.', '.', '.' ],
                          [ 'O', 'O', 'O' ]
                        ],
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
  if ( player === 'X' ) {
    for ( var idx = 0; idx < winningPatternsForX.length; idx++  ) {
      if ( this.board.toString().replace( /O/g, '.' ) === winningPatternsForX[ idx ].toString() ) {
        this.winner = player;
        return true;
      };
    };
  } else if ( player === 'O' ) {
    for ( var idx = 0; idx < winningPatternsForO.length; idx++  ) {
      if ( this.board.toString().replace( /X/g, '.' ) === winningPatternsForO[ idx ].toString() ) {
        this.winner = player;
        return true;
      };
    };
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

$( document ).ready( function() {
  var winStatement = $( 'p.win-statement' );
  winStatement.hide();
  var game = new Board();
  var position = [];

  $( 'td' ).on( 'click', function( e ) {
    position[ 0 ] = parseInt( $( e.target ).parent().attr( 'class' ).match( /\d+/ )[ 0 ] );
    position[ 1 ] = parseInt( $( e.target ).attr( 'class' ).match( /\d+/ )[ 0 ] );
    this.playerMove( position, this.currentPlayer );
    this.checkForWinner( this.currentPlayer );
    this.turn ++;
    this.currentPlayer = this.trace();
    this.automateComputerTurn( this.currentPlayer );

    if ( this.winner !== '.' ) {
      winStatement.show();
      winStatement.append( ' ' + this.winner );
    };
  }.bind( game ));
});
