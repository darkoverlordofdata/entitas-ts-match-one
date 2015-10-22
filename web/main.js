/**
 *
 *     __  __         ___                            ___  ___
 *    / /_/ /  ___   / _ \___ _    _____ ____  ___  / _/ / _ )___  ___ _______
 *   / __/ _ \/ -_) / ___/ _ \ |/|/ / -_) __/ / _ \/ _/ / _  / _ \(_-</ __/ _ \
 *   \__/_//_/\__/ /_/   \___/__,__/\__/_/    \___/_/  /____/\___/___/\__/\___/
 *
 *
 *
 */
bosco.start({
    "namespace": "matchone",
    "width": 640,
    "height": 640,
    "scale": false,
    "scaleType": "FILL",
    "stats": true,
    "storage": false,
    "options": {
        "antialiasing": false,
        "transparent": false,
        "resolution": window.devicePixelRatio,
        "autoResize": true, "backgroundColor": "0x3c3c3c"
    },
    "assets": {
        "images": (window.devicePixelRatio >= 2) ? "res/images@2x.json" : "res/images.json"
    },
    "resources": {
        "Blocker" : {"path": "Blocker.png"},
        "Piece0"  : {"path": "Piece0.png"},
        "Piece1"  : {"path": "Piece1.png"},
        "Piece2"  : {"path": "Piece2.png"},
        "Piece3"  : {"path": "Piece3.png"},
        "Piece4"  : {"path": "Piece4.png"},
        "Piece5"  : {"path": "Piece5.png"}
    },
    "controllers": [
        "GameController",
        "InputController",
        "ScoreLabelController"
    ],
    "properties": {
        "skip": "false",
        "leaderboard": "off",
        "player": "",
        "userId": "",
        "playMusic": "true",
        "playSfx": "true"
    }
});

