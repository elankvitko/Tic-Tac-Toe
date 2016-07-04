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
