(function (global) {

    'use strict';

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
            var gamepadsData = [];
            Array.prototype.forEach.call(gamepads, function (gamepad) {
                gamepadsData.push({
                    a: gamepad.buttons[0].pressed,
                    x: gamepad.buttons[2].pressed,
                    l: {
                        x: Math.abs(gamepad.axes[0]) < 0.15 ? 0 : gamepad.axes[0] * 7,
                        y: Math.abs(gamepad.axes[1]) < 0.15 ? 0 : gamepad.axes[1] * 7

                    },
                    pause: gamepad.buttons[9].pressed,
                    up: gamepad.buttons[12].pressed,
                    down: gamepad.buttons[13].pressed
                });
            });
            sceneController.updateScene(gamepadsData);
        };
    }

    global.GamePadController = GamePadController;

}(window));
