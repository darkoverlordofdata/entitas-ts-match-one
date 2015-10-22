module matchone {

  declare var viewContainer;

  import Input = bosco.utils.Input;

  export class InputController {

    public burstMode:boolean;

    start() {
    }

    update(delta:number) {
      if (Input.getKeyDown('B')) {
        this.burstMode = !this.burstMode;
      }

      var input = this.burstMode
        ? Input.getMouseButtonDown(0)
        : Input.getMouseButton(0);

      if (input) {
        var scale = bosco.config.scale;
        var pos = Input.mousePosition;
        var children = viewContainer.children;
        for (var i=0, l=children.length; i<l; i++) {
          var child =children[i];
          if (child.containsPoint(pos)) {
            var w = ~~(child.width * scale);
            var x = ~~((pos.x-w)/w);
            var y = 8-(~~((pos.y-w)/w));
            Pools.pool.createEntity()
              .addInput(x, y);
          }
        }
      }
    }
  }
}