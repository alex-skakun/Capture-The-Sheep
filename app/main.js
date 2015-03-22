(function (global) {

    'use strict';

    global.scene = new Scene(2);
    global.view = new SceneView(scene);
    global.sceneController = new SceneController(scene, view);

    var gui = require('nw.gui'),
        win = gui.Window.get();

    global.win = win;

    var gamePadController = new GamePadController();

    gamePadController.startPolling();

    setTimeout(function () {
        document.body.removeChild(document.getElementById('startScreen'));
        win.enterFullscreen();
        document.body.requestPointerLock();

        win.on('focus', function () {
            document.body.requestPointerLock();
        });

        //win.showDevTools();
    }, 1000);
}(window));
