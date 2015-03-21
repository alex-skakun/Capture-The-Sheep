(function (global) {

    'use strict';

    function Farm (farmDto) {

        this.team = farmDto.team;
        this.radius = farmDto.radius;
        this.position = farmDto.position;

    }

    global.Farm = Farm;

}(window));
