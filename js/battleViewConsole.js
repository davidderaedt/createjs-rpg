/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, setTimeout */
define(["Observable", "FighterAction"], function (Observable, FighterAction) {
    "use strict";
    
    var obj = new Observable();

    obj.EVENT_TURN_ACTIONS_SET = "turnActionsSet";
    obj.EVENT_PERFORM_ACTION = "performAction";
    obj.EVENT_ACTION_DONE = "actionDone";
    
    var team1;
    var team2;

    
    function showMessage(pMessage) {
        console.log.apply(console, arguments);
    }
    
    
    
    
    obj.showBattle = function (pTeam1, pTeam2) {
        showMessage("------------- NEW BATTLE -------------");
        team1 = pTeam1;
        team2 = pTeam2;
        showMessage("Friends", team1);
        showMessage("Enemies", team2);
    };
    
    
    obj.showTurn = function (pIndex) {
        showMessage("\t*** Turn " + pIndex + " ***");
        
        // tmp: actions should be user generated, we keep them null to have it generated for us
        var actions = null;
        obj.trigger(obj.EVENT_TURN_ACTIONS_SET, actions);
    };
    
    
    obj.showHit = function (fighter, hitValue) {
        showMessage(fighter.name + " loses " + hitValue + " HP (" + fighter.hp + "/" + fighter.maxhp + ")");
    };
    
    
    obj.showAsDead = function (fighter) {
        showMessage(fighter.name + " is KO !");
    };
    
    
    function onActionDone() {
        obj.trigger(obj.EVENT_ACTION_DONE);
    }
    
    
    function onActionBePerformed() {
        obj.trigger(obj.EVENT_PERFORM_ACTION);
        
        //TODO: postpone call when action animation is done
        setTimeout(onActionDone, 10);
    }
    
    
    obj.showActionStart = function (action) {
        showMessage(action.fighter.name + " performs " + action.actionType + " on ", action.chosenTargets);
        
        // TODO: postpone call when action animation makes sense (e.g. sword touches enemy)
        setTimeout(onActionBePerformed, 10);
    };
    
    
    obj.showBattleResult = function (victory, battleCount) {
        if (victory) {
            showMessage("#### VICTORY !!!!");
        } else {
            showMessage("#### GAME OVER, battle count: " + battleCount);
        }
    };

    
    return obj;
    
});