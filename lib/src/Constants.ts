/**
 * core/Constants.ts
 *
 * Core Constants for Schmup Warz
 *
 */
module matchone {

  export enum ScaleType {
    FILL, // fill to fit screen
    FIXED // scale fixed size to fit the screen
  }
  export class Constants {

    public static isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    public static appName = "example";
    public static FRAME_WIDTH:number = window.innerWidth;
    public static FRAME_HEIGHT:number = window.innerHeight;
    public static RATIO = window.devicePixelRatio * .6;

    public static SCALE_TYPE:ScaleType = ScaleType.FILL;

    public static options = {
      backgroundColor:0x3c3c3c
    };
    public static assets = {

      Blocker    : 'res/Blocker.png',
      Piece0     : 'res/Piece0.png',
      Piece1     : 'res/Piece1.png',
      Piece2     : 'res/Piece2.png',
      Piece3     : 'res/Piece3.png',
      Piece4     : 'res/Piece4.png',
      Piece5     : 'res/Piece5.png',
    };

    /**
     * Prefab's
     */
    public static resources = {

      'Blocker' : {path: 'res/Blocker.png', scale: {x:.5, y:.5}},
      'Piece0'  : {path: 'res/Piece0.png', scale: {x:.5, y:.5}},
      'Piece1'  : {path: 'res/Piece1.png', scale: {x:.5, y:.5}},
      'Piece2'  : {path: 'res/Piece2.png', scale: {x:.5, y:.5}},
      'Piece3'  : {path: 'res/Piece3.png', scale: {x:.5, y:.5}},
      'Piece4'  : {path: 'res/Piece4.png', scale: {x:.5, y:.5}},
      'Piece5'  : {path: 'res/Piece5.png', scale: {x:.5, y:.5}},

    }
  }
}


