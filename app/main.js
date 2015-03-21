(function () {

    'use strict';

    var gui = require('nw.gui'),
        win = gui.Window.get();

    //win.enterFullscreen();

    win.showDevTools();

    var gamePadController = new GamePadController();
    gamePadController.startPolling();

}());
