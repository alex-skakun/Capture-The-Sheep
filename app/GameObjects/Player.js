(function (global) {
    'use strict';
    var PLAYER_RADIUS = 40;
    var ATTACK_RADIUS = PLAYER_RADIUS * 1.5;

    var doc = document;
    var SITTING_RADIUS = PLAYER_RADIUS * 1.5;

    function createPlayerElement() {
        var playerContainer = doc.createElement('figure'),
            label = doc.createElement('figcaption'),
            image = doc.createElement('div');
        playerContainer.classList.add('player');
        playerContainer.appendChild(label);
        playerContainer.appendChild(image);
        return playerContainer;
    }

    function Player(playerDto) {
        this.position = playerDto.position;
        this.team = playerDto.team;
        this.inAttack = false;
        this.wasted = false;
        this.direction = playerDto.direction;
        this.sheep = null;
        this.element = createPlayerElement();
    }

    Player.prototype.updatePosition = function (delta) {
        this.position.x += delta.x;
        this.position.y += delta.y;
        this.direction = delta.x === 0 ? this.direction : +(delta.x < 0);
    };
    Player.prototype.sit = function (sheep) {
        this.sheep = sheep;
        sheep.busy = true;
        sheep.position = this.position;
    };

    Player.prototype.isCollisionWith = function (player) {
        return global.utils.isCollide(this.position, player.position, PLAYER_RADIUS);
    };
    Player.prototype.standUp = function (direction) {
        if (!this.sheep){
            return;
        }
        this.sheep.busy = false;
        if (direction === undefined) {
            direction = this.direction;
        }
        this.sheep.direction = direction;
        this.sheep.position = {
            x: this.position.x,
            y: this.position.y
        };
        this.position = {
            x: this.position.x + (direction ? 1 : -1) * SITTING_RADIUS,
            y: this.position.y
        };
        this.sheep = null;
    };

    Player.prototype.isOutOfTheWorld = function () {
        return this.position.x < 0 || 1920 < this.position.x ||
            this.position.y < 0 || 756 < this.position.y;
    };

    Player.prototype.isInAttackAreaWith = function (player) {
        return global.utils.isCollide(this.position, player.position, ATTACK_RADIUS);
    };

    Player.prototype.waste = function (direction) {
        this.standUp(direction);
        this.wasted = true;
        this.inAttack = false;
        setTimeout(function(){
            this.wasted = false;
        }.bind(this), 2000);
    };
    Player.prototype.isInSittingAreaWith = function (sheep) {
        return utils.isCollide(sheep.position, this.position, SITTING_RADIUS);
    };

    global.Player = Player;

}(window));
