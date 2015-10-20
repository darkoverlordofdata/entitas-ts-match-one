/**
 * core/Game.ts
 *
 * Top level application object
 *
 */
module matchone {

  /** @see https://github.com/mrdoob/stats.js */
  declare var Stats;
  /** global PIXI Container  */
  declare var viewContainer;
  declare var foreContainer;

  import Sprite = PIXI.Sprite;
  import Container = PIXI.Container;
  import SystemRenderer = PIXI.SystemRenderer;

  import Input = matchone.utils.Input;
  import Constants = matchone.Constants;
  import GameController = matchone.GameController;
  import InputController = matchone.InputController;
  import ScoreLabelController = matchone.ScoreLabelController;

  export class Game {


    stage:Container;
    sprites:Container;
    fore:Container;
    renderer:SystemRenderer;
    game:GameController;
    input:InputController;
    scoreLabel:ScoreLabelController;
    delta:number;
    previousTime:number;
    stats;

    /**
     * Load assets and start
     */
    public static main() {

      for (var asset in Constants.assets) {
        PIXI.loader.add(asset, Constants.assets[asset]);
      }
      PIXI.loader.load((loader, resources) => new Game(resources));
    }

    /**
     * Create the game instance
     * @param resources
     */
    constructor(resources) {

      var stats = this.stats = new Stats();
      stats.setMode(0);
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = '0px';
      stats.domElement.style.top = '0px';


      this.stage = new Container();
      viewContainer = this.sprites = new Container();
      foreContainer = this.fore = new Container();
      var renderer = this.renderer = PIXI.autoDetectRenderer(Constants.FRAME_WIDTH, Constants.FRAME_HEIGHT, Constants.options);
      switch (Constants.SCALE_TYPE) {
        case ScaleType.FILL:
          this.renderer.view.style.position = 'absolute';
          break;
        case ScaleType.FIXED:
          renderer.view.style.position = 'absolute';
          renderer.view.style.width = window.innerWidth + 'px';
          renderer.view.style.height = window.innerHeight + 'px';
          renderer.view.style.display = 'block';
          break;
      }

      document.body.appendChild(renderer.view);
      document.body.appendChild(stats.domElement);

      window.addEventListener('resize', this.resize, true);
      window.onorientationchange = this.resize;
      this.stage.addChild(this.sprites);
      this.stage.addChild(this.fore);

      this.game = new GameController();
      this.game.start();
      this.input = new InputController();
      this.input.start();
      this.scoreLabel = new ScoreLabelController();
      this.scoreLabel.start();
      requestAnimationFrame(this.update);

    }

    /**
     * Game Loop
     * @param time
     */
    update = (time:number) => {
      this.stats.begin();
      this.delta = this.previousTime || time;
      this.previousTime = time;
      var delta = (time - this.delta) * 0.001;
      this.game.update(delta);
      this.input.update(delta);
      this.scoreLabel.update(delta);
      this.renderer.render(this.stage);
      this.stats.end();
      requestAnimationFrame(this.update);
      Input.update();
    };

    /**
     * Resize window
     */
    resize = () => {
      switch (Constants.SCALE_TYPE) {
        case ScaleType.FILL:
          var height = window.innerHeight;
          var width = window.innerWidth;
          this.renderer.resize(width, height);
          break;
        case ScaleType.FIXED:
          this.renderer.view.style.width = window.innerWidth + 'px';
          this.renderer.view.style.height = window.innerHeight + 'px';
          break;
      }
    };
  }
}

