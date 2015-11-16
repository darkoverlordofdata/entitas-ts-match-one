module matchone {

  import Input = bosco.utils.Input;
  import Sprite = PIXI.Sprite;
  import Point = PIXI.Point;

  export class InputController {

    public burstMode:boolean;
    protected point:Point;
    
    start() {
      this.point = new Point(0,0);
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
        var point = this.point;
        point.x = pos.x;
        point.y = pos.y;
        var children = bosco.viewContainer.children;
        for (var i=0, l=children.length; i<l; i++) {
          var child:Sprite = <Sprite>children[i];
          if (child.containsPoint(point)) {
            var w = ~~(child.width * scale);
            var x = ~~((pos.x-w)/w);
            var y = 8-(~~((pos.y-w)/w));
            Pools.pool.createEntity('Input')
              .addInput(x, y);
          }
        }
      }
    }
  }
}