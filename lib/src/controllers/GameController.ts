module matchone {

  import Pools = matchone.Pools;
  import Systems = entitas.Systems;

  export class GameController {

    systems:Systems;

    start() {

      this.systems = this.createSystems(Pools.pool);
      this.systems.initialize();

    }

    update(delta:number) {
      this.systems.execute();
    }

    createSystems(pool) {
      return new Systems()
        // Input
        .add(pool.createSystem(matchone.ProcessInputSystem))

        // Update
        .add(pool.createSystem(matchone.CreateGameBoardCacheSystem))
        .add(pool.createSystem(matchone.GameBoardSystem))
        .add(pool.createSystem(matchone.FallSystem))
        .add(pool.createSystem(matchone.FillSystem))
        .add(pool.createSystem(matchone.ScoreSystem))

        // Render
        .add(pool.createSystem(matchone.RemoveViewSystem))
        .add(pool.createSystem(matchone.AddViewSystem))
        .add(pool.createSystem(matchone.RenderPositionSystem))

        // Destroy
        .add(pool.createSystem(matchone.DestroySystem));

    }
  }
}