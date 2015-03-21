(function (global) {

    'use strict';

    var doc = document;

    function createPlayerElement () {
        var playerContainer = doc.createElement('figure'),
            label = doc.createElement('figcaption'),
            image = doc.createElement('div');
        playerContainer.classList.add('player');
        playerContainer.appendChild(label);
        playerContainer.appendChild(image);
        return playerContainer;
    }

    function Player (playerDto) {
        this.position = playerDto.position;
        this.team = playerDto.team;
        this.inAttack = false;
        this.wasted = false;
        this.direction = playerDto.direction;
        this.sheep = null;
        this.element = createPlayerElement();
    }




    global.Player = Player;

}(window));
