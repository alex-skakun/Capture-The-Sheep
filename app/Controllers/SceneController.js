(function (global) {

    'use strict';

    function SceneController(scene, view) {

        this.scene = scene;
        this.view = view;

    }

    SceneController.prototype.updateScene = function updateScene(gamepadData) {
        this._updatePositions(gamepadData);
        this._sitting(gamepadData);
        this._attack(gamepadData);
        this._winning();
        this.view.reRender(this.scene);
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
        var actionAllowed = _(gamepadData)
            .filter('x')
            .map(function (gamepadDataPlayer, i) {
                return this.scene.players[i];
            }.bind(this))
            .filter('inAttack', false)
            .filter('wasted', false);
        actionAllowed
            .filter('sheep')
            .invoke('standUp');
        actionAllowed
            .filter('sheep', null)
            .forEach(function (player) {
                var sheepNear = _(this.scene.sheep)
                    .filter('busy', false)
                    .filter('isLeaving', false)
                    .find(function(sheep) {
                        return player.isInSittingAreaWith(sheep);
                    });
                if (sheepNear){
                    player.sit(sheepNear);
                }
            }.bind(this));
    };

    SceneController.prototype._winning = function () {
        _(this.scene.farms)
            .forEach(function (farm) {
                _(this.scene.players)
                    .filter(function (player) {
                        return utils.isInCircle(player.position, farm);
                    })
                    .forEach(function (player) {
                        this.scene.scores[player.team]++;
                        player.sheep.leave();
                        player.standUp();
                    }.bind(this))
            }.bind(this))
    };

    global.SceneController = SceneController;

}(window));
