module matchone {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IInitializeSystem = entitas.IInitializeSystem;
  import IReactiveSystem = entitas.IReactiveSystem;
  import ISetPool = entitas.ISetPool;

  export class GameBoardSystem implements IInitializeSystem, IReactiveSystem, ISetPool {
    protected pool:Pool;
    protected gameBoardElements:Group;

    public initialize() {
      var gameBoard = this.pool.setGameBoard(8, 9).gameBoard;
      for (var row=0; row < gameBoard.rows; row++) {
        for (var column=0; column < gameBoard.columns; column++) {
          if (Math.random() > 0.91) {
            this.pool.createBlocker(column, row);
          } else {
            this.pool.createRandomPiece(column, row);
          }
        }
      }
    }
    
    public get trigger():TriggerOnEvent {
      return Matcher.GameBoard.onEntityAdded();
    }
    
    public execute(entities:Array<Entity>) {
      if (entities.length != 1) {
        throw new Exception("Expected exactly one entity but found " + entities.length);
      }
      var gameBoard = entities[0].gameBoard;
      for (var e of this.gameBoardElements.getEntities()) {
        if (e.position.x >= gameBoard.columns || e.position.y >= gameBoard.rows) {
          e.isDestroy = true;
        }
      }
    }
    
    public setPool(pool:Pool) {
      this.pool = pool;
      this.gameBoardElements = pool.getGroup(Matcher.allOf(Matcher.GameBoardElement, Matcher.Position));
    }
    


  }
}