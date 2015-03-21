(function (global) {

    'use strict';

    function SceneController (scene, view) {

        this.scene = scene;
        this.view = view;

    }

    SceneController.prototype.updateScene = function updateScene (gamepadData) {
        
    };

    global.SceneController = SceneController;

}(window));
