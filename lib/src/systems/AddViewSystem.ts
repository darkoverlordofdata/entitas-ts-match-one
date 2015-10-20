module matchone {

  declare var viewContainer;

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IReactiveSystem = entitas.IReactiveSystem;

  export class AddViewSystem implements IReactiveSystem {


    public get trigger():TriggerOnEvent {
      return Matcher.Resource.onEntityAdded();
    }
    
    public execute(entities:Array<Entity>) {
      for (var i = 0, l = entities.length; i < l; i++) {
        var e = entities[i];

        var sprite = bosco.prefab(e.resource.name);
        viewContainer.addChild(sprite);
        e.addView(sprite);

        if (e.hasPosition) {
          var pos = e.position;
          sprite.position.set(pos.x, pos.y);
        }
      }
    }
  }

}