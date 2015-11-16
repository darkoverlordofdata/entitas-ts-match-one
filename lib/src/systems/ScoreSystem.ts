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
  import ScoreComponent = matchone.ScoreComponent;

  export class ScoreSystem implements IInitializeSystem, IReactiveSystem, ISetPool {
    protected pool:Pool;
    public get trigger():TriggerOnEvent {
      return Matcher.GameBoardElement.onEntityRemoved();
    }
    
    public setPool(pool:Pool) {
      this.pool = pool;
    }

    public initialize() {
      this.pool.setScore(0);
    }
    
    public execute(entities:Array<Entity>) {
      var score:ScoreComponent = <ScoreComponent>(this.pool.score);
      this.pool.replaceScore(score.value + entities.length);
    }
  }
}