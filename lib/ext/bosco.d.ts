declare module bosco.utils {
    class Input {
        private static _input;
        static mousePosition: {
            x: number;
            y: number;
        };
        static getKeyDown(k: any): any;
        static getKeyUp(k: any): boolean;
        static getMouseButtonUp(m: any): boolean;
        static getMouseButton(m: any): boolean;
        static getMouseButtonDown(m: any): boolean;
        static update(): void;
        states: {};
        mouseDown: boolean;
        mouseButtonDown: boolean;
        mousePosition: {
            x: number;
            y: number;
        };
        isDown: (keyCode: any) => any;
        isUp: (keyCode: any) => boolean;
        constructor();
        private onKeyUp;
        private onKeyDown;
        private onTouchStart;
        private onTouchMove;
        private onTouchEnd;
    }
}
declare module bosco.utils {
    class Rnd {
        static nextBool(): boolean;
        static nextDouble(): number;
        static nextInt(max: any): number;
        static random(start: any, end?: any): any;
    }
}
declare module bosco.utils {
    class TrigLUT {
        static sin(rad: number): number;
        static cos(rad: number): number;
        static sinDeg(deg: number): number;
        static cosDeg(deg: number): number;
        private static RAD;
        private static DEG;
        private static SIN_BITS;
        private static SIN_MASK;
        private static SIN_COUNT;
        private static radFull;
        private static radToIndex;
        private static degFull;
        private static degToIndex;
        private static sin_;
        private static cos_;
        static init(update: boolean): void;
    }
}
/**
 * Utils.ts
 *
 * Bosco Utility functions
 *
 */
declare module bosco {
    import Sprite = PIXI.Sprite;
    /**
     * Builds a composited sprite
     *
     * @param name  resource name
     * @returns {PIXI.Sprite}
     */
    function prefab(name: any): Sprite;
}
/**
 * Properties.ts
 *
 * Persist properties using LocalStorage
 *
 */
declare module bosco {
    class Properties {
        private static db;
        private static dbname;
        private static properties;
        static init(name: any, properties: any): void;
        static get(prop: any): any;
        static set: (prop: any, value: any) => void;
        static setScore(score: any): void;
        static getLeaderboard(count: any): any;
    }
}
/**
 * Bosco.ts
 *
 * Game Shell
 *
 *     __  __         ___                            ___  ___
 *    / /_/ /  ___   / _ \___ _    _____ ____  ___  / _/ / _ )___  ___ _______
 *   / __/ _ \/ -_) / ___/ _ \ |/|/ / -_) __/ / _ \/ _/ / _  / _ \(_-</ __/ _ \
 *   \__/_//_/\__/ /_/   \___/__,__/\__/_/    \___/_/  /____/\___/___/\__/\___/
 *
 */
declare module bosco {
    import Container = PIXI.Container;
    import SystemRenderer = PIXI.SystemRenderer;
    enum ScaleType {
        FILL = 0,
        FIXED = 1,
    }
    var config: any;
    /**
     * Load assets and start
     */
    function start(config: any): void;
    class Game {
        stage: Container;
        sprites: Container;
        fore: Container;
        renderer: SystemRenderer;
        stats: any;
        config: any;
        resources: any;
        /**
         * Create the game instance
         * @param resources
         */
        constructor(config: any, resources: any);
        /**
         * Game Loop
         * @param time
         */
        update: (time: number) => void;
        /**
         * Resize window
         */
        resize: () => void;
    }
}
