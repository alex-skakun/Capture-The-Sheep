(function (global) {

    'use strict';

    function createPlayerElement () {

    }

    function Player (playerDto) {
        this.position = playerDto.position;
        this.team = playerDto.team;
        this.inAttack = false;
        this.wasted = false;
        this.direction = playerDto.direction;
        this.sheep = null;
        this.element = createPlayerElement();
    }




    global.Player = Player;

}(window));
