(function (global) {
    'use strict';

    function distanceSq(a, b) {
        var dx = a.x - b.x;
        var dy = a.y - b.y;
        return dx * dx + dy * dy;
    }

    function distance(a, b) {
        return Math.sqrt(distanceSq(a, b));
    }

    function isCollide(a, b, r) {
        return distanceSq(a, b) < 4 * r * r;
    }

    function isInCircle(point, circle) {
        return distance(point, circle) < circle.radius;
    }

    global.utils = {
        distance: distance,
        distanceSq: distanceSq,
        isCollide: isCollide,
        isInCircle: isInCircle
    };
}(window));
