/*jshint browser:true, strict:true, devel:true, camelcase:true, eqeqeq:true, forin:true, immed:true, indent: 4, newcap:true, noempty:true, quotmark:true, undef:true, unused:true */
/*global require, requirejs*/

(function () {
    "use strict";
    
    console.log("Page init");
    
    
    requirejs.config({
        /*
        // If we load createjs with requirejs
        // we need to make sure that easeljs is loaded before animation definitions
        shim: {
            '../assets/sprites/rpg': {
                deps: ['libs/easeljs-0.5.0.min'],
                exports: 'rpg'
            }
        },
        */
        
        paths: {
            jquery: "libs/jquery-1.7.1.min"
        }
    });
    
    
    require(["rpgApp", "jquery"], function (rpgApp, $) {
                
        $(function () {
            console.log("Doc ready");
            rpgApp.init();
        });
        
    });
        
}());


