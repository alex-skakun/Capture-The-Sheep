(function (global) {

    'use strict';

    var doc = document;

    function createDOM(scene, displayParams) {
        var sceneContainer = doc.getElementById('mainSceneContainer'),
            sceneFragment = doc.createDocumentFragment(),
            scoreContainer = doc.createElement('div'),
            gameField = doc.createElement('div');
        scoreContainer.id = 'scoreContainer';
        gameField.id = 'gameField';

        sceneFragment.appendChild(scoreContainer);
        sceneFragment.appendChild(gameField);

        scene.players.forEach(function (player, index) {
            player.element.querySelector('figcaption').textContent = 'Player ' + (index + 1);
            gameField.appendChild(player.element);
        });

        scene.sheep.forEach(function (sheep) {
            gameField.appendChild(sheep.element);
        });

        sceneContainer.appendChild(sceneFragment);
    }

    function getDisplayParams() {
        return {
            width: 1920,
            height: 1080 * 0.7,
            step: 0.1
        };
    }

    function SceneView(scene) {
        this.displayParams = getDisplayParams(scene);
        this.dom = createDOM(scene, this.displayParams);
    }

    SceneView.prototype.reRender = function reRender(scene) {
        var _this = this;
        _(scene.players)
            .forEach(function (player) {
                var style = player.element.style;
                var classList = player.element.classList;
                if (player.position) {
                    var x = player.position.x * 100 / _this.displayParams.width;
                    var y = player.position.y * 100 / _this.displayParams.height;

                    style.top = y + '%';
                    style.left = x + '%';
                    style.zIndex = Math.floor(y);
                }
                var classes = {
                    'blue': player.team,
                    'red': !player.team,
                    'attacks': player.inAttack,
                    'wasted': player.wasted,
                    'right': !player.direction,
                    'left': player.direction,
                    'on-sheep': player.sheep,
                    'sheep-red': player.sheep && !player.sheep.team,
                    'sheep-blue': player.sheep && player.sheep.team,
                    'moving': player.isMoving
                };
                _(classes)
                    .forEach(function (isUsed, className) {
                        if (isUsed && !classList.contains(className)) {
                            classList.add(className);
                        } else if (!isUsed && classList.contains(className)) {
                            classList.remove(className);
                        }
                    })
                    .value();
            })
            .value();
        _(scene.sheep)
            .forEach(function (sheep) {
                var classList = sheep.element.classList;
                var style = sheep.element.style;
                if (sheep.position) {
                    var x = sheep.position.x * 100 / _this.displayParams.width;
                    var y = sheep.position.y * 100 / _this.displayParams.height;

                    style.top = y + '%';
                    style.left = x + '%';
                    style.zIndex = Math.floor(y);
                }
                var classes = {
                    'blue': sheep.team,
                    'red': !sheep.team,
                    'right': !sheep.direction,
                    'left': sheep.direction,
                    'busy': sheep.busy,
                    'leaving': sheep.isLeaving
                };
                _(classes)
                    .forEach(function (isUsed, className) {
                        if (isUsed && !classList.contains(className)) {
                            classList.add(className);
                        } else if (!isUsed && classList.contains(className)) {
                            classList.remove(className);
                        }
                    })
                    .value();
            })
            .value();
    };

    global.SceneView = SceneView;
}(window));
