(function (global) {

    'use strict';

    function SceneController(scene, view) {

        this.scene = scene;
        this.view = view;

    }

    SceneController.prototype.updateScene = function updateScene(gamepadData) {
        if (gamepadData.length < 2) {
            return;
        }
        this._updatePositions(gamepadData);
        this._sitting(gamepadData);
        this._attack(gamepadData);
        this._winning();
        this.view.reRender(this.scene);
    };

    SceneController.prototype._updatePositions = function (gamepadData) {
        _(this.scene.players)
            .forEach(function (player, i) {
                if (player.wasted) {
                    return;
                }
                var delta = gamepadData[i].l;
                if (player.sheep) {
                    delta.x *= 0.7;
                    delta.y *= 0.7;
                }
                var newPosition = utils.addVectors(delta, player.position);
                if (utils.isOutTheWorld(newPosition)) {
                    if (newPosition.x < 0 && delta.x < 0) {
                        delta.x = 0
                    }
                    if (newPosition.x > 1920 && delta.x > 0) {
                        delta.x = 0;
                    }
                    if (newPosition.y < 0 && delta.y < 0) {
                        delta.y = 0;
                    }
                    if (newPosition.y > 756 && delta.y > 0) {
                        delta.y = 0;
                    }
                }
                newPosition = utils.addVectors(delta, player.position);

                _(this.scene.players)
                    .without(player)
                    .filter('wasted', false)
                    .concat(this.scene.sheep)
                    .forEach(function (anotherPlayer) {
                        var oldDistance = utils.distanceSq(anotherPlayer.position, player.position);
                        var newDistance = utils.distanceSq(anotherPlayer.position, newPosition);
                        if (oldDistance > 6400){
                            return;
                        }
                        if (oldDistance > newDistance) {
                            delta = {
                                x: 0,
                                y: 0
                            }
                        }
                    })
                    .value();
                player.updatePosition(delta);
            }.bind(this))
            .value();

    };

    SceneController.prototype._attack = function (gamepadData) {
        var _this = this;
        _(gamepadData)
            .filter('a')
            .map(function (gamepadDataPlayer) {
                var i = gamepadData.indexOf(gamepadDataPlayer);
                return _this.scene.players[i];
            })
            .filter('inAttack', false)
            .filter('wasted', false)
            .forEach(function (player) {
                player.inAttack = true;
                setTimeout(function () {
                    player.inAttack = false;
                    if (player.wasted) {
                        return;
                    }
                    _(_this.scene.players)
                        .filter('team', (player.team + 1) % 2)
                        .filter(function (otherPlayer) {
                            return otherPlayer.isInAttackAreaWith(player);
                        })
                        .filter('wasted', false)
                        .invoke('waste', player.direction)
                        .value();
                }, 500);
            })
            .value();
    };

    SceneController.prototype._sitting = function (gamepadData) {
        _(gamepadData)
            .filter('x')
            .map(function (gamepadDataPlayer) {
                var i = gamepadData.indexOf(gamepadDataPlayer);
                return this.scene.players[i];
            }.bind(this))
            .filter('inAttack', false)
            .filter('wasted', false)
            .filter('inSittingProccess', false)
            .forEach(function (player) {
                if (player.sheep) {
                    player.standUp();
                } else {
                    var sheepNear = _(this.scene.sheep)
                        .filter('busy', false)
                        .filter('isLeaving', false)
                        .find(function (sheep) {
                            return player.isInSittingAreaWith(sheep);
                        });
                    if (sheepNear) {
                        player.sit(sheepNear);
                    }
                }
            }.bind(this))
            .value();
    };

    SceneController.prototype._winning = function () {
        _(this.scene.farms)
            .forEach(function (farm) {
                _(this.scene.players)
                    .filter(function (player) {
                        return player.sheep && player.sheep.team !== player.team;
                    })
                    .filter(function (player) {
                        if (player.team === farm.team) {
                            return utils.isInCircle(player.position, farm);
                        } else {
                            return false;
                        }
                    })
                    .forEach(function (player) {
                        this.scene.scores[player.team]++;
                        var sheep = player.sheep;
                        player.standUp();
                        //player.sheep.leave();
                        this.scene.replaceSheep(sheep);
                    }.bind(this))
                    .value()
            }.bind(this))
            .value()
    };

    global.SceneController = SceneController;

}(window));
