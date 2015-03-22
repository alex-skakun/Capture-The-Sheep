(function (global) {
    'use strict';

    function playSoundFile(filename, isLoop) {
        var embed = document.createElement('object');
        embed.setAttribute('type', 'audio/ogg');
        embed.setAttribute('data', filename);
        embed.setAttribute('autostart', true);
        if (isLoop) {
            embed.setAttribute('loop', true);
        }
        document.getElementsByTagName('body')[0].appendChild(embed);
        return function () {
            embed.remove();
        }
    }

    var win = function () {
        setTimeout(playSoundFile('sounds/bell.ogg'), 10000);
    };

    function bleating() {
        setTimeout(playSoundFile('sounds/bleating.ogg'), 15000);
    }

    function running() {
        return playSoundFile('sounds/running.ogg');
    }

    function hit() {
        setTimeout(playSoundFile('sounds/hit.ogg'), 10000);
    }

    function swing() {
        setTimeout(playSoundFile('sounds/swing.ogg'), 10000);
    }

    function kick() {
        setTimeout(playSoundFile('sounds/kick.ogg'));
    }

    function birds() {
        setInterval(playSoundFile.bind(null, 'sounds/birds.ogg'), 300000);
    }

    setTimeout(birds, 15000);

    global.sounds = {
        win: win,
        bleating: bleating,
        running: running,
        hit: hit,
        swing: swing,
        kick: kick
    };
}(window));
