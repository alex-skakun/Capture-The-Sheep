(function (global) {

    'use strict';

    function Scene (numberOfPlayers) {

        this.players = [];
        for (var i = 0; i < numberOfPlayers; i++) {
            this.players.push(new Player({
                position: null,
                team: i % 2,
                direction: i % 2
            }));
        }
        this.sheep = [
            new Sheep({
                position: null,
                team: 0,
                direction: 0
            }),
            new Sheep({
                position: null,
                team: 1,
                direction: 1
            })
        ];
        this.farms = [
            new Farm({
                team: 0,
                radius: 30,
                position: null
            }),
            new Farm({
                team: 0,
                radius: 30,
                position: null
            })
        ];

    }

    global.Scene = Scene;

}(window));
