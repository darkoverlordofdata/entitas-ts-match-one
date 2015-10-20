/**
 * core/Game.ts
 *
 * Top level application object
 *
 */
module bosco {

  /** @see https://github.com/mrdoob/stats.js */
  declare var Stats;
  /** global PIXI Container  */
  declare var viewContainer;
  declare var foreContainer;

  export enum ScaleType {
    FILL, // fill to fit screen
    FIXED // scale fixed size to fit the screen
  }

  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import Container = PIXI.Container;
  import SystemRenderer = PIXI.SystemRenderer;

  import Input = bosco.utils.Input;

  export var config;

  export class Game {


    stage:Container;
    sprites:Container;
    fore:Container;
    renderer:SystemRenderer;
    controllers = [];
    delta:number;
    previousTime:number;
    stats;
    config;
    resources;

    /**
     * Load assets and start
     */
    public static main(config) {

      for (var asset in config.assets) {
        PIXI.loader.add(asset, config.assets[asset]);
      }
      PIXI.loader.load((loader, resources) => new Game(config, resources));
    }

    /**
     * Create the game instance
     * @param resources
     */
    constructor(config, resources) {

      config.height = config.height || window.innerHeight;
      config.width = config.width || window.innerWidth;

      this.config = bosco.config = config;
      this.resources = resources;
      var stats = this.stats = new Stats();
      stats.setMode(0);
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = '0px';
      stats.domElement.style.top = '0px';


      this.stage = new Container();
      viewContainer = this.sprites = new Container();
      foreContainer = this.fore = new Container();
      var renderer = this.renderer = PIXI.autoDetectRenderer(config.width, config.height, config.options);
      switch (config.scaleType) {
        case 0: //ScaleType.FILL:
          this.renderer.view.style.position = 'absolute';
          break;
        case 1: //ScaleType.FIXED:
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

      for (var i=0; i<config.controllers.length; i++) {
        var classname = config.controllers[i];
        var Class:any = window[config.namespace][classname];
        this.controllers.push(new Class());
      }

      for (var controller of this.controllers) {
        controller.start();
      }
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
      for (var controller of this.controllers) {
        controller.update(delta);
      }
      this.renderer.render(this.stage);
      this.stats.end();
      requestAnimationFrame(this.update);
      Input.update();
    };

    /**
     * Resize window
     */
    resize = () => {
      switch (this.config.scaleType) {
        case 0: //ScaleType.FILL:
          var height = window.innerHeight;
          var width = window.innerWidth;
          this.renderer.resize(width, height);
          break;
        case 1: //ScaleType.FIXED:
          this.renderer.view.style.width = window.innerWidth + 'px';
          this.renderer.view.style.height = window.innerHeight + 'px';
          break;
      }
    };
  }
}

