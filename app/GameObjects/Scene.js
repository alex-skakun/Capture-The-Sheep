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
            },
            '02': {
                x: 400,
                y: 720
            },
            '13': {
                x: 1600,
                y: 0
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
                position: {
                    x: 270,
                    y: 560
                },
                team: 0,
                direction: 0
            }),
            new Sheep({
                position: {
                    x: 1630,
                    y: 26
                },
                team: 1,
                direction: 1
            })
        ];
        this.farms = [
            new Farm({
                team: 0,
                radius: 1200,
                position: {
                    x: 2,
                    y: 1724
                }
            }),
            new Farm({
                team: 1,
                radius: 800,
                position: {
                    x: 1864,
                    y: -404
                }
            })
        ];
        this.scores = [0, 0];
        this.paused = false;
        this.activeButton = 1;
    }

    Scene.prototype.replaceSheep = function (oldSheep) {
        oldSheep.position = !oldSheep.team ? {
            x: 270,
            y: 560
        } : {
            x: 1630,
            y: 26
        }

    };

    global.Scene = Scene;

}(window));
