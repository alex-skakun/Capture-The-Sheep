(function (global) {

    'use strict';

    var DEFAULT_POSITIONS = {
        players: {
            '00': {
                x: 154,
                y: 454
            },
            '11': {
                x: 1766,
                y: 136
            }
        }
    };

    function Scene (numberOfPlayers) {

        this.players = [];
        for (var i = 0; i < numberOfPlayers; i++) {
            this.players.push(new Player({
                position: DEFAULT_POSITIONS.players[(i % 2).toString() + i],
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
                radius: 1000,
                position: {
                    x: 2,
                    y: 1724
                }
            }),
            new Farm({
                team: 0,
                radius: 1000,
                position: {
                    x: 1864,
                    y: -404
                }
            })
        ];

    }

    global.Scene = Scene;

}(window));
