(function (global) {

    'use strict';

    function SceneController(scene, view) {

        this.scene = scene;
        this.view = view;

    }

    SceneController.prototype.updateScene = function updateScene(gamepadData) {
        this._updatePositions(gamepadData);
        this._attack(gamepadData);
        this._sitting(gamepadData);
        this._winning();
    };

    SceneController.prototype._updatePositions = function (gamepadData) {
        _(this.scene.players)
            .forEach(function (player, i) {
                player.updatePosition(gamepadData[i].l);
            })
            .filter(function (player) {
                return player.isOutOfTheWorld() ||
                    _(this.scene.players)
                    .without(player)
                    .concat(this.scene.sheep)
                    .any(function (anotherPlayer) {
                        return player.isCollisionWith(anotherPlayer);
                    });
            }.bind(this))
            .forEach(function (playerCollided, i) {
                playerCollided.updatePosition({
                    x: -gamepadData[i].l.x,
                    y: -gamepadData[i].l.y
                });
            });
    };

    SceneController.prototype._attack = function (gamepadData) {
        var _this = this;
        _(gamepadData)
            .filter('a')
            .map(function (gamepadDataPlayer, i) {
                return _this.scene.players[i];
            })
            .filter('inAttack', false)
            .filter('wasted', false)
            .forEach(function (player) {
                player.inAttack = true;
                setTimeout(function () {
                    player.inAttack = false;
                    if (player.wasted){
                        return;
                    }
                    _(_this.scene.players)
                        .filter('team', (player.team + 1) % 2)
                        .filter(function (otherPlayer) {
                            return otherPlayer.isInAttackAreaWith(player);
                        })
                        .filter('wasted', false)
                        .invoke('waste', player.direction);
                }, 500);
            });
    };

    SceneController.prototype._sitting = function (gamepadData) {

    };

    SceneController.prototype._winning = function () {

    };

    global.SceneController = SceneController;

}(window));
