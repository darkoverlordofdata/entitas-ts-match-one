module matchone {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IReactiveSystem = entitas.IReactiveSystem;

  export class RenderPositionSystem implements IReactiveSystem {


    public get trigger():TriggerOnEvent {
      return (<Matcher>Matcher.allOf(Matcher.View, Matcher.Position)).onEntityAdded();
    }
    
    public execute(entities:Array<Entity>) {
      for (var e of entities) {
        var pos = e.position;
        var x = 64+pos.x*64;
        var y = 640-(64+pos.y*64);
        e.view.sprite.position.set(x, y);
      }
    }
    


  }
}