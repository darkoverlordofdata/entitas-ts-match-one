module matchone {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import ISetPool = entitas.ISetPool;
  import ISystem = entitas.ISystem;
  import IComponent = entitas.IComponent;
  import GameBoardComponent = matchone.GameBoardComponent;

  export class CreateGameBoardCacheSystem implements ISystem, ISetPool {
    protected pool:Pool;

    public setPool(pool:Pool) {
      this.pool = pool;

      var gameBoard = pool.getGroup(Matcher.GameBoard);
      gameBoard.onEntityAdded.add((group, entity, index, component) =>
        this.createNewGameBoardCache(<GameBoardComponent>component)
      );
      gameBoard.onEntityUpdated.add((group, entity, index, previousComponent, newComponent) =>
        this.createNewGameBoardCache(<GameBoardComponent>newComponent)
      );

      var gameBoardElements = pool.getGroup(Matcher.allOf(Matcher.GameBoardElement, Matcher.Position));
      gameBoardElements.onEntityAdded.add(this.onGameBoardElementAdded);
      gameBoardElements.onEntityRemoved.add(this.onGameBoardElementRemoved);

    }

    protected createNewGameBoardCache(gameBoard:GameBoardComponent) {

      var grid:any = new Array(gameBoard.rows);
      for (var r=0; r<gameBoard.rows; r++) {
        grid[r] = new Array(gameBoard.columns);
      }

      var entities = this.pool.getEntities(Matcher.allOf(Matcher.GameBoardElement, Matcher.Position));
      for (var e of entities) {
        var pos = e.position;
        grid[pos.x][pos.y] = e;
      }
      this.pool.replaceGameBoardCache(grid);

    }

    protected onGameBoardElementAdded = (group:Group, entity:Entity, index:number, component:IComponent) => {
      var grid:any = (<GameBoardCacheComponent>this.pool.gameBoardCache).grid;
      var pos = entity.position;
      grid[pos.x][pos.y] = entity;
      this.pool.replaceGameBoardCache(grid);

    };
    
    protected onGameBoardElementRemoved = (group:Group, entity:Entity, index:number, component:IComponent) => {
      if ('x' in component && 'y' in component) {
        var pos:any = component;
      } else {
        var pos:any = entity.position;
      }
      var grid:any = (<GameBoardCacheComponent>this.pool.gameBoardCache).grid;
      delete grid[pos.x][pos.y];
      this.pool.replaceGameBoardCache(grid);

    };

  }
}