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
        return distance(point, circle.position) < circle.radius;
    }

    function addVectors (a, b) {
        return {
            x: a.x + b.x,
            y: a.y + b.y
        };
    }

    function isOutTheWorld (a) {
        return a.x < 0 || 1920 < a.x ||
            a.y < 0 || 756 < a.y;
    }

    global.utils = {
        distance: distance,
        distanceSq: distanceSq,
        isCollide: isCollide,
        isInCircle: isInCircle,
        addVectors: addVectors,
        isOutTheWorld: isOutTheWorld
    };
}(window));
