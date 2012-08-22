/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global require, define, $ */
define(["game"], function (game) {
    "use strict";
        
    var app = {};
    
    function init() {
        
        console.log("App init");
        
        // Splash screen, Intro, settings go here
        
        game.bind(game.EVENT_READY, function () {
            console.log("Game Starts!");
            game.start();
        });
        
        game.init();
    }
    
    
    app.init = init;
    return app;
    
});