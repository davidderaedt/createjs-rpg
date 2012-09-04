/*jshint browser:true, strict:true, devel:true, camelcase:true, eqeqeq:true, forin:true, immed:true, indent: 4, newcap:true, noempty:true, quotmark:true, undef:true, unused:true */
/*global define*/

define([], function () {
    "use strict";

    function FighterAction(pFighter, pType, pTargets) {        
        this.fighter = pFighter;
        this.chosenTargets = pTargets;
        this.actionType = pType;
    }
    FighterAction.DEFEND = "defend";
    FighterAction.ATTACK = "attack";
    FighterAction.SPECIAL = "special";
    FighterAction.ITEM = "item";
    FighterAction.MAGIC = "magic";

    return FighterAction;

});