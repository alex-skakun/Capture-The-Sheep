(function (global) {

    'use strict';

    function createPlayerElement () {

    }

    function Sheep (playerDto) {
        this.position = playerDto.position;
        this.team = playerDto.team;
        this.direction = playerDto.direction;
        this.busy = false;
        this.element = createPlayerElement();
    }




    global.Sheep = Sheep;

}(window));
