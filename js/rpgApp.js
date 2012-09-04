/*jshint browser:true, strict:true, devel:true, camelcase:true, eqeqeq:true, forin:true, immed:true, indent: 4, newcap:true, noempty:true, quotmark:true, undef:true, unused:true */
/*global define*/

define(["rpgGame"], function (rpgGame) {
    "use strict";
        
    var module = {};
    
    function init() {
        
        console.log("App init");
        
        // Splash screen, Intro, settings mgmt would go here        
        // Here, we just launch a new game
        
        rpgGame.bind(rpgGame.EVENT_READY, function () {
            
            console.log("Game Ready to start!");
            
            // let's pretend the user clicks "start new game"
            rpgGame.start();
        });
        
        rpgGame.init();
    }
    
    
    module.init = init;
    return module;
    
});