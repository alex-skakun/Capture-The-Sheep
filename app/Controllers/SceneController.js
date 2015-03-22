(function (global) {

    'use strict';

    function SceneController(scene, view) {

        this.scene = scene;
        this.view = view;

    }

    SceneController.prototype.updateScene = function updateScene(gamepadData) {
        if (gamepadData.length < 2){
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
            .filter('wasted', false)
            .forEach(function (player) {
                var i = this.scene.players.indexOf(player);
                player.updatePosition(gamepadData[i].l);
            }.bind(this))
            .filter(function (player) {
                return player.isOutOfTheWorld() ||
                    _(this.scene.players)
                    .without(player)
                    .concat(this.scene.sheep)
                    .any(function (anotherPlayer) {
                        return player.isCollisionWith(anotherPlayer);
                    });
            }.bind(this))
            .forEach(function (playerCollided) {
                var i = this.scene.players.indexOf(playerCollided);
                if (playerCollided.isOutOfTheWorld()){
                    playerCollided.updatePosition({
                        x: playerCollided.position.x < 0 ? -gamepadData[i].l.x : 1920 < playerCollided.position.x ? -gamepadData[i].l.x : 0,
                        y: playerCollided.position.y < 0 ? -gamepadData[i].l.y : 756 < playerCollided.position.y ? -gamepadData[i].l.y : 0
                    });
                    return;
                }
                playerCollided.updatePosition({
                    x: -gamepadData[i].l.x,
                    y: -gamepadData[i].l.y
                });
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
                    if (player.wasted){
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
            .forEach(function(player){
                if (player.sheep){
                    player.standUp();
                } else {
                    var sheepNear = _(this.scene.sheep)
                        .filter('busy', false)
                        .filter('isLeaving', false)
                        .find(function(sheep) {
                            return player.isInSittingAreaWith(sheep);
                        });
                    if (sheepNear){
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
                        return utils.isInCircle(player.position, farm);
                    })
                    .forEach(function (player) {
                        this.scene.scores[player.team]++;
                        player.sheep.leave();
                        player.standUp();
                    }.bind(this))
                    .value()
            }.bind(this))
            .value()
    };

    global.SceneController = SceneController;

}(window));
