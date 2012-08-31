/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global require, requirejs, $ */

(function () {
    'use strict';
    
    console.log("Page init");
        
    
    $(function () {
        
        console.log("Doc ready");
        
        requirejs.config({
            
            paths: {
                jquery: 'js/libs/jquery-1.7.1.min'
            }
        });
        
        
        require(["app"], function (app) {
            app.init();
        });
        
    });

}());


