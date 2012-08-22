/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $ */

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