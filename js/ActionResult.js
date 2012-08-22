/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $ */

define([], function () {

    "use strict";

    var instance;


    function ActionResult(pType, pTarget, pValue) {
        
        instance = this;
        
        this.type = pType;
        this.target = pTarget;
        this.value = pValue;
    }
    ActionResult.HP_LOST = "hp_lost";
    ActionResult.HP_GAINED = "hp_gained";
    
    return ActionResult;

});