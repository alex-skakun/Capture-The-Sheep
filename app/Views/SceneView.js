(function (global) {

    'use strict';

    var doc = document;

    function createDOM (scene) {
        var sceneContainer =doc.getElementById('mainSceneContainer'),
            sceneFragment = doc.createDocumentFragment(),
            scoreContainer = doc.createElement('div'),
            gameField = doc.createElement('div');
        scoreContainer.id = 'scoreContainer';
        gameField.id = 'gameField';

        sceneFragment.appendChild(scoreContainer);
        sceneFragment.appendChild(gameField);

        scene.farms.forEach(function () {});

        sceneContainer.appendChild(sceneFragment);
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
