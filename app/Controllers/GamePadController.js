(function (global) {

    'use strict';

    var KEY_MAP = {
        0: 'a',
        1: 'b',
        2: 'x',
        3: 'y',
        4: 'l1',
        5: 'r1',
        6: 'l2',
        7: 'r2',
        8: 'back',
        9: 'start',
        10: 'l3',
        11: 'r3',
        12: 'up',
        13: 'down',
        14: 'left',
        15: 'right'
    };

    var gamepads = navigator.getGamepads();

    function GamePadController () {

        var gamepadSupport = this;
        /**
         * Starts a polling loop to check for gamepad state.
         */
        this.startPolling = function () {
            // Don't accidentally start a second loop, man.
            if (!gamepadSupport.ticking) {
                gamepadSupport.ticking = true;
                gamepadSupport.tick();
            }
        };

        /**
         * Stops a polling loop by setting a flag which will prevent the next
         * requestAnimationFrame() from being scheduled.
         */
        this.stopPolling = function () {
            gamepadSupport.ticking = false;
        };

        /**
         * A function called with each requestAnimationFrame(). Polls the gamepad
         * status and schedules another poll.
         */
        this.tick = function () {
            gamepadSupport.pollStatus();
            gamepadSupport.scheduleNextTick();
        };

        this.scheduleNextTick = function () {
            if (gamepadSupport.ticking) {
                window.requestAnimationFrame(gamepadSupport.tick);
            }
        };

        /**
         * Checks for the gamepad status. Monitors the necessary data and notices
         * the differences from previous state (buttons for Chrome/Firefox,
         * new connects/disconnects for Chrome). If differences are noticed, asks
         * to update the display accordingly. Should run as close to 60 frames per
         * second as possible.
         */
        this.pollStatus = function() {
            gamepads = navigator.getGamepads();
            Array.prototype.forEach.call(gamepads, function (gamepad) {
                var pressedButtons = [];
                for (var i = 0, l = gamepad.buttons.length; i < l; i++) {
                    var button = gamepad.buttons[i];
                    if (button.pressed) {
                        pressedButtons.push(KEY_MAP[i]);
                    }
                }


                console.log(pressedButtons.join(' + '));
            });
        };
    }

    global.GamePadController = GamePadController;

}(window));
