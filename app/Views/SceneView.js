(function (global) {

    'use strict';

    var doc = document;

    function createDOM (scene, displayParams) {
        var sceneContainer = doc.getElementById('mainSceneContainer'),
            sceneFragment = doc.createDocumentFragment(),
            scoreContainer = doc.createElement('div'),
            gameField = doc.createElement('div');
        scoreContainer.id = 'scoreContainer';
        gameField.id = 'gameField';

        sceneFragment.appendChild(scoreContainer);
        sceneFragment.appendChild(gameField);

        scene.players.forEach(function (player, index) {
            player.element.classList.add('team-' + (player.team ? 'blue' : 'red'));
            player.element.querySelector('figcaption').textContent = 'Player ' + (index + 1);
            if (player.position) {
                var x = player.position.x * 100 / displayParams.width,
                    y = player.position.y * 100 / displayParams.height;

                player.element.classList.remove('to-left');
                player.element.classList.remove('to-right');
                player.element.classList.remove('to-' + (player.direction ? 'left' : 'right'));
                player.element.style.top = y + '%';
                player.element.style.left = x + '%';
            }
            gameField.appendChild(player.element);
        });

        sceneContainer.appendChild(sceneFragment);
    }

    function getDisplayParams () {
        return {
            width: 1920,
            height: 1080 * 0.7,
            step: 0.1
        };
    }

    function SceneView (scene) {

        this.displayParams = getDisplayParams(scene);
        this.dom = createDOM(scene, this.displayParams);

    }

    SceneView.prototype.reRender = function reRender (scene) {
        var _this = this;
        scene.players.forEach(function (player) {

            if (player.position) {
                var x = player.position.x * 100 / _this.displayParams.width,
                    y = player.position.y * 100 / _this.displayParams.height;

                player.element.style.top = y + '%';
                player.element.style.left = x + '%';
            }
            player.element.classList.remove('to-left');
            player.element.classList.remove('to-right');
            player.element.classList.remove('to-' + (player.direction ? 'left' : 'right'));
        });
    };

    global.SceneView = SceneView;

}(window));
