(function (global) {
    'use strict';

    function playSoundFile(filename, time) {
        var embed = document.createElement('object');
        embed.setAttribute('type', 'audio/ogg');
        embed.setAttribute('data', filename);
        embed.setAttribute('autostart', true);
        document.getElementsByTagName('body')[0].appendChild(embed);
        return function () {
            embed.remove();
        }
    }

    var win = function () {
        return playSoundFile('sounds/bell.ogg');
    };

    function bleating() {
        return playSoundFile('sounds/bleating.ogg');
    }

    function running() {
        return playSoundFile('sounds/running.ogg');
    }

    function hit() {
        return playSoundFile('sounds/hit.ogg');
    }

    function swing() {
        return playSoundFile('sounds/swing.ogg');
    }

    global.sounds = {
        win: win,
        bleating: bleating,
        running: running,
        hit: hit,
        swing: swing
    };
}(window));
