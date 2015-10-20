/**
 * Extensions for Match-One
 */
module matchone.extensions {

  import Entity = entitas.Entity;

  var pieces = [
    'Piece0',
    'Piece1',
    'Piece2',
    'Piece3',
    'Piece4',
    'Piece5'
  ];

  entitas.Pool.prototype.createRandomPiece = function(x:number, y:number):Entity {
    return this.createEntity()
      .setGameBoardElement(true)
      .addPosition(x, y)
      .setMovable(true)
      .setInteractive(true)
      .addResource(pieces[~~(Math.random()*pieces.length)]);
  };

  entitas.Pool.prototype.createBlocker = function(x:number, y:number):Entity {
    return this.createEntity()
      .setGameBoardElement(true)
      .addPosition(x, y)
      .addResource('Blocker');
  };
}