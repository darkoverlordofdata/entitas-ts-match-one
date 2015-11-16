module matchone {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IReactiveSystem = entitas.IReactiveSystem;
  import ISetPool = entitas.ISetPool;
  import GameBoardCacheComponent = matchone.GameBoardCacheComponent;

  export class ProcessInputSystem implements IReactiveSystem, ISetPool {
    protected pool:Pool;
    public get trigger():TriggerOnEvent {
      return Matcher.Input.onEntityAdded();
    }
    
    public setPool(pool:Pool) {
      this.pool = pool;
    }

    public execute(entities:Array<Entity>) {
      if (entities.length != 1) {
        throw new Exception("Expected exactly one entity but found " + entities.length);
      }
      var inputEntity = entities[0];
      var input = inputEntity.input;
      var cache:GameBoardCacheComponent = <GameBoardCacheComponent>(this.pool.gameBoardCache);
      var e = cache.grid[input.x][input.y];
      if (e !== undefined && e.isInteractive) {
        e.isDestroy = true;
      }
      this.pool.destroyEntity(inputEntity);
    }
  }
}