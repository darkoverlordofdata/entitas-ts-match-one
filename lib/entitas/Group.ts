module entitas {

  import Entity = entitas.Entity;
  import Signal = entitas.Signal;
  import ISignal = entitas.ISignal;
  import IMatcher = entitas.IMatcher;
  import IComponent = entitas.IComponent;
  import GroupChanged = Group.GroupChanged;
  import GroupUpdated = Group.GroupUpdated;
  import GroupEventType = entitas.GroupEventType;
  import SingleEntityException = entitas.SingleEntityException;

  /**
   * event delegate boilerplate:
   */
  export module Group {

    export interface GroupChanged {(group:Group, entity:Entity, index:number, component:IComponent):void;}
    export interface IGroupChanged<T> extends ISignal<T> {
      dispatch(group:Group, entity:Entity, index:number, component:IComponent):void;
    }

    export interface GroupUpdated {(group:Group, entity:Entity, index:number, component:IComponent, newComponent:IComponent):void;}
    export interface IGroupUpdated<T> extends ISignal<T> {
      dispatch(group:Group, entity:Entity, index:number, component:IComponent, newComponent:IComponent):void;
    }
  }

  export class Group {

    public onEntityAdded:Group.IGroupChanged<GroupChanged>;
    public onEntityRemoved:Group.IGroupChanged<GroupChanged>;
    public onEntityUpdated:Group.IGroupUpdated<GroupUpdated>;

    public get count():number {return Object.keys(this._entities).length;}
    public get matcher():IMatcher {return this._matcher;}

    public _matcher:IMatcher;
    public _entities = {};
    public _entitiesCache:Entity[];
    public _singleEntityCache:Entity;
    public _toStringCache:string;

    /** Extension Points */
    public createObserver(eventType:GroupEventType):GroupObserver;

    constructor(matcher:IMatcher) {
      this.onEntityAdded = new Signal<GroupChanged>(this);
      this.onEntityRemoved = new Signal<GroupChanged>(this);
      this.onEntityUpdated = new Signal<GroupUpdated>(this);
      this._matcher = matcher;
    }

    public handleEntitySilently(entity:Entity) {
      if (this._matcher.matches(entity)) {
        this.addEntitySilently(entity);
      } else {
        this.removeEntitySilently(entity);
      }
    }

    public handleEntity(entity:Entity, index:number, component:IComponent) {
      if (this._matcher.matches(entity)) {
        this.addEntity(entity, index, component);
      } else {
        this.removeEntity(entity, index, component);
      }
    }

    public updateEntity(entity:Entity, index:number, previousComponent:IComponent, newComponent:IComponent) {
      if (entity.creationIndex in this._entities) {

        this.onEntityRemoved.dispatch(this, entity, index, previousComponent);
        this.onEntityAdded.dispatch(this, entity, index, newComponent);
        this.onEntityUpdated.dispatch(this, entity, index, previousComponent, newComponent);

      }
    }

    public addEntitySilently(entity:Entity) {
      if (!(entity.creationIndex in this._entities)) {
        this._entities[entity.creationIndex] = entity;
        this._entitiesCache = undefined;
        this._singleEntityCache = undefined;
        entity.addRef();
      }
    }

    public addEntity(entity:Entity, index:number, component:IComponent) {
      if (!(entity.creationIndex in this._entities)) {
        this._entities[entity.creationIndex] = entity;
        this._entitiesCache = undefined;
        this._singleEntityCache = undefined;
        entity.addRef();
        this.onEntityAdded.dispatch(this, entity, index, component)

      }
    }

    public removeEntitySilently(entity:Entity) {
      if (entity.creationIndex in this._entities) {
        delete this._entities[entity.creationIndex];
        this._entitiesCache = undefined;
        this._singleEntityCache = undefined;
        entity.release();
      }
    }

    public removeEntity(entity:Entity, index:number, component:IComponent) {
      if (entity.creationIndex in this._entities) {
        delete this._entities[entity.creationIndex];
        this._entitiesCache = undefined;
        this._singleEntityCache = undefined;
        this.onEntityRemoved.dispatch(this, entity, index, component);
        entity.release();
      }
    }

    public containsEntity(entity:Entity):boolean {
      return entity.creationIndex in this._entities;
    }

    public getEntities():Entity[] {
      if (this._entitiesCache === undefined) {
        this._entitiesCache = [];
        for (var k in this._entities) {
          this._entitiesCache.push(this._entities[k]);
        }
      }
      return this._entitiesCache;
    }

    public getSingleEntity():Entity {
      if (this._singleEntityCache === undefined) {
        var enumerator = Object.keys(this._entities);
        var c = enumerator.length;
        if (c === 1) {
          this._singleEntityCache = this._entities[enumerator[0]];
        } else if (c === 0) {
          return undefined;
        } else {
          throw new SingleEntityException(this._matcher);
        }
      }

      return this._singleEntityCache;
    }

    public toString():string {
      if (this._toStringCache === undefined) {
        this._toStringCache = "Group(" + this._matcher + ")";
      }
      return this._toStringCache;
    }

    //public createObserver(eventType:GroupEventType = GroupEventType.OnEntityAdded):GroupObserver {
    //  return new GroupObserver(this, eventType);
    //}

  }

}