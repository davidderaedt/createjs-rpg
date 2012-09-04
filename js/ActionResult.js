/*jshint browser:true, strict:true, devel:true, camelcase:true, eqeqeq:true, forin:true, immed:true, indent: 4, newcap:true, noempty:true, quotmark:true, undef:true, unused:true */
/*global define*/

define([], function () {
    "use strict";

    function ActionResult(pType, pTarget, pValue) {        
        this.type = pType;
        this.target = pTarget;
        this.value = pValue;
    }
    ActionResult.HP_LOST = "hp_lost";
    ActionResult.HP_GAINED = "hp_gained";
    
    return ActionResult;

});