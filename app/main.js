(function (global) {

    'use strict';

    global.scene = new Scene(2);
    global.view = new SceneView(scene);
    global.sceneController = new SceneController(scene, view);

    var gui = require('nw.gui'),
        win = gui.Window.get();



    var gamePadController = new GamePadController();

    gamePadController.startPolling();

    setTimeout(function () {
        document.body.removeChild(document.getElementById('startScreen'));
        win.enterFullscreen();

        //win.showDevTools();
    }, 1000);
}(window));
