module matchone {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IReactiveSystem = entitas.IReactiveSystem;
  import ISetPool = entitas.ISetPool;
  import IComponent = entitas.IComponent;
  import GameBoardComponent = matchone.GameBoardComponent;
  import GameBoardCacheComponent = matchone.GameBoardCacheComponent;

  function getNextEmptyRow(grid, column:number, row:number) {
    var rowBelow = row - 1;
    while (rowBelow >= 0 && grid[column][rowBelow] === undefined) {
      rowBelow -= 1;
    }
    return rowBelow + 1;
  }

  export class FillSystem implements IReactiveSystem, ISetPool {

    protected pool:Pool;

    public get trigger():TriggerOnEvent {
      return Matcher.GameBoardElement.onEntityRemoved();
    }
    
    public execute(entities:Array<Entity>) {
      var gameBoard:GameBoardComponent = <GameBoardComponent>(this.pool.gameBoard);
      var grid = (<GameBoardCacheComponent>this.pool.gameBoardCache).grid;

      for (var column=0; column < gameBoard.columns; column++) {
        var nextRowPos = getNextEmptyRow(grid, column, gameBoard.rows);
        while (nextRowPos != gameBoard.rows) {
          this.pool.createRandomPiece(column, nextRowPos);
          nextRowPos = getNextEmptyRow(grid, column, gameBoard.rows);
        }
      }
    }
    
    public setPool(pool:Pool) {
      this.pool = pool;
    }
    


  }
}