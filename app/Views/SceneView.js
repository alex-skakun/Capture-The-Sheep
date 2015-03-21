(function (global) {

    'use strict';

    function createDOM (scene) {
        scene.farms.forEach(function () {});
    }

    function getDisplayParams () {
        return {
            width: 0,
            height: 0,
            step: 0.1
        };
    }

    function SceneView (scene) {

        this.displayParams = getDisplayParams();
        this.dom = createDOM(scene);

    }

    SceneView.prototype.reRender = function reRender (scene) {

    };

    global.SceneView = SceneView;

}(window));
