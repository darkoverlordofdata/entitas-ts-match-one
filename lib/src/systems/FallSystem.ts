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

  export class FallSystem implements IReactiveSystem, ISetPool {

    protected pool:Pool;

    public get trigger():TriggerOnEvent {
      return Matcher.GameBoardElement.onEntityRemoved();
    }
    
    public execute(entities:Array<Entity>) {
      var gameBoard = this.pool.gameBoard;
      var grid = (<GameBoardCacheComponent>this.pool.gameBoardCache).grid;

      for (var column=0; column < (<GameBoardComponent>gameBoard).columns; column++) {
        for (var row=1; row < (<GameBoardComponent>gameBoard).rows; row++) {
          var e = grid[column][row];
          if (e !== undefined && e.isMovable) {
            this.moveDown(e, column, row, grid);
          }

        }
      }
    }

    protected moveDown(e:Entity, column:number, row:number, grid:any) {
      var nextRowPos = getNextEmptyRow(grid, column, row);
      if (nextRowPos !== row) {
        e.replacePosition(column, nextRowPos);
      }
    }

    public setPool(pool:Pool) {
      this.pool = pool;
    }

  }
}