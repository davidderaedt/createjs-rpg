/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global require, requirejs, $ */

(function () {
    'use strict';
    
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
            jquery: 'libs/jquery-1.7.1.min'
        }
    });
    
    
    require(["app", "jquery"], function (app, $) {
                
        $(function () {
            console.log("Doc ready");
            app.init();
        });
        
    });
        
}());


