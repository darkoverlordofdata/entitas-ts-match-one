/**
 * core/Game.ts
 *
 * Top level application object
 *
 */
module bosco {

  /** @see https://github.com/mrdoob/stats.js */

  import Sprite = PIXI.Sprite;
  import Texture = PIXI.Texture;
  import Container = PIXI.Container;
  //import SystemRenderer = PIXI.SystemRenderer;

  //import Input = bosco.utils.Input;

  /**
   * Builds a prefab composite sprite
   *
   * @param config
   * @returns {PIXI.Sprite}
   */
  export function prefab(name): Sprite {

    var config = bosco.config.resources[name];

    if (Array.isArray(config)) {
      var container = new Sprite();
      for (var i = 0, l = config.length; i < l; i++) {
        container.addChild(prefab(config[i]));
      }
      return container;
    } else {
      var sprite = new Sprite(Texture.fromFrame(config.path));
      for (var k in config) {
        switch (k) {
          case 'anchor':
            sprite.anchor.set(config.anchor.x, config.anchor.y);
            break;
          case 'scale':
            sprite.scale.set(config.scale.x, config.scale.y);
            break;
          case 'position':
            sprite.position.set(config.position.x, config.position.y);
            break;
          case 'rotation':
            sprite.rotation = config.rotation.z;
            break;
          case 'tint':
            sprite.tint = config.tint;
            break;
        }
      }
      return sprite;
    }
  }
}

