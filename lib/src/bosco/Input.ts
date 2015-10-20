module bosco.utils {

  declare var viewContainer;

  export class Input {

    private static _input = new Input();

    static get mousePosition() {
      return Input._input.mousePosition;
    }

    static getKeyDown(k) {
      return Input._input.isDown(k.charCodeAt(0));
    }

    static getKeyUp(k) {
      return Input._input.isUp(k.charCodeAt(0));
    }

    static getMouseButtonUp(m) {
      return !Input._input.mouseButtonDown;
    }

    static getMouseButton(m) {
      return Input._input.mouseDown;
    }

    static getMouseButtonDown(m) {
      return Input._input.mouseButtonDown;
    }

    static update() {
      Input._input.mouseDown = false;
      Input._input.states = {};
    }

    public states = {};
    public mouseDown:boolean = false;
    public mouseButtonDown:boolean = false;
    public mousePosition = {x:0, y:0};

    isDown = (keyCode) => this.states[keyCode];
    isUp = (keyCode) => !this.states[keyCode];

    constructor() {

      document.addEventListener('touchstart', this.onTouchStart, true);
      document.addEventListener('touchmove', this.onTouchMove, true);
      document.addEventListener('touchend', this.onTouchEnd, true);
      document.addEventListener('mousedown', this.onTouchStart, true);
      document.addEventListener('mousemove', this.onTouchMove, true);
      document.addEventListener('mouseup', this.onTouchEnd, true);
      window.addEventListener('keydown', this.onKeyDown, true);
      window.addEventListener('keyup', this.onKeyUp, true);

    }

    private onKeyUp = (event) => {
      if (this.states[event.keyCode]) this.states[event.keyCode] = false;
    };

    private onKeyDown = (event) => {
      this.states[event.keyCode] = true;
    };

    private onTouchStart = (event) => {
      event = event.targetTouches ? event.targetTouches[0] : event;
      this.mouseDown = true;
      this.mouseButtonDown = true;
      this.mousePosition.x = parseInt(event.clientX);
      this.mousePosition.y = parseInt(event.clientY);
      return true;
    };

    private onTouchMove = (event) => {
      event = event.targetTouches ? event.targetTouches[0] : event;
      this.mousePosition.x = parseInt(event.clientX);
      this.mousePosition.y = parseInt(event.clientY);
    };

    private onTouchEnd = (event) => {
      this.mouseDown = false;
      this.mouseButtonDown = false;
    };

  }
}