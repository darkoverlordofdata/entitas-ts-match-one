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
        var pos = Input.mousePosition;
        var children = viewContainer.children;
        for (var i=0, l=children.length; i<l; i++) {
          if (children[i].containsPoint(pos)) {
            var x = ~~((pos.x-64)/64);
            var y = 8-(~~((pos.y-64)/64));
            Pools.pool.createEntity()
              .addInput(x, y);
          }
        }
      }
    }
  }
}