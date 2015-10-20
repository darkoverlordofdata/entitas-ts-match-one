//matchone.Game.main();
bosco.Game.main({
    "namespace": "matchone",
    "width": false,
    "height": false,
    "scaleType": 0,
    "options": {
        "backgroundColor": "0x3c3c3c"
    },
    "assets": {
        "Blocker": "res/images.json"
    },
    "resources": {
        "Blocker" : {"path": "Blocker.png", "scale": {"x":0.5, "y":0.5}},
        "Piece0"  : {"path": "Piece0.png", "scale": {"x":0.5, "y":0.5}},
        "Piece1"  : {"path": "Piece1.png", "scale": {"x":0.5, "y":0.5}},
        "Piece2"  : {"path": "Piece2.png", "scale": {"x":0.5, "y":0.5}},
        "Piece3"  : {"path": "Piece3.png", "scale": {"x":0.5, "y":0.5}},
        "Piece4"  : {"path": "Piece4.png", "scale": {"x":0.5, "y":0.5}},
        "Piece5"  : {"path": "Piece5.png", "scale": {"x":0.5, "y":0.5}}
    },
    "controllers": [
        "GameController",
        "InputController",
        "ScoreLabelController"
    ]
});

