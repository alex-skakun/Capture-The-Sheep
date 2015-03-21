(function () {
    'use strict';

    function distanceSq(a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return dx * dx + dy * dy;
    }

    function distance(a, b) {
        return Math.sqrt(distanceSq(a, b));
    }

    global.utils = {
        distance: distance,
        distanceSq: distanceSq
    };
}(window));
