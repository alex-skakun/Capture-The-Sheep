(function (global) {
    'use strict';
    var PLAYER_RADIUS = 10;
    var ATTACK_RADIUS = PLAYER_RADIUS * 1.5;

    var doc = document;

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
    };

    Player.prototype.isCollisionWith = function (player) {
        return global.utils.isCollide(this.position, player.position, PLAYER_RADIUS);
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
    };

    global.Player = Player;

}(window));
