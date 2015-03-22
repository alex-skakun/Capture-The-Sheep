(function (global) {

    'use strict';

    function createSheepElement () {
        var sheepContainer = document.createElement('div');
        sheepContainer.classList.add('ship');
        return sheepContainer;
    }

    function Sheep (playerDto) {
        this.position = playerDto.position;
        this.team = playerDto.team;
        this.direction = playerDto.direction;
        this.busy = false;
        this.element = createSheepElement();
        this.isLeaving = false;
    }

    Sheep.prototype.leave = function () {
        this.isLeaving = true;
    };




    global.Sheep = Sheep;

}(window));
