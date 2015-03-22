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
        this.isLeaving = false;
    }

    Sheep.prototype.leave = function () {
        this.isLeaving = true;
    };




    global.Sheep = Sheep;

}(window));
