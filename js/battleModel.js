/*jshint browser:true, strict:true, devel:true, camelcase:true, eqeqeq:true, forin:true, immed:true, indent: 4, newcap:true, noempty:true, quotmark:true, undef:true, unused:true */
/*global define*/

define(["Observable", "FighterAction", "ActionResult"], function (Observable, FighterAction, ActionResult) {
    "use strict";

    var module = new Observable();


    module.STATUS_ONGOING = "Ongoing";
    module.STATUS_T1_VICTORY = "Team1 Victory";
    module.STATUS_T2_VICTORY = "Team2 Victory";
    module.STATUS_T1_FLEE = "Team1 flee";
    module.STATUS_T2_FLEE = "Team2 Flee";

    module.EVENT_TURN_READY = "turnReady";
    module.EVENT_FIGHTER_ACTION_START = "FighterActionStart";
    module.EVENT_BATTLE_ENDED = "EndOfBattle";

    module.status = "";
    module.turnIndex = 0;
    module.currentAction = null;
    
    module.teamOne = null;
    module.teamTwo = null;
    module.actionList = null;
    module.actionIndexInTurn = null;



    function getValidTeamMembers(pTeam) {
        var validTeamBMembers = [];
        var i;
        var n = pTeam.length;
        for (i = 0; i < n; i++) {
            var f = pTeam[i];
            if (f.hp > 0) {
                validTeamBMembers.push(f);
            }
        }
        return validTeamBMembers;
    }
    

    module.generateTeamActions = function (pTeam, pTeamB) {

        var actionList = [];
        var total = pTeam.length;
        
        // determine what oponents are left
        var validTeamBMembers = getValidTeamMembers(pTeamB);
        
        var i;
        for (i = 0; i < total; i++) {
            var fighter = pTeam[i];
            var type = FighterAction.ATTACK;// todo: AI
            var action = new FighterAction(fighter, type, []);
            
            var targetNum = fighter.weapon.targetNum;
            
            // target num is either one or all
            if (targetNum === 1) {
                var target = validTeamBMembers[Math.floor(Math.random() * validTeamBMembers.length)];
                action.chosenTargets = [target];
            } else {
                action.chosenTargets = validTeamBMembers;
            }
                        
            actionList.push(action);
        }
        console.log("Actions:", actionList);
        return actionList;
    };



    function _nextTurn() {
        
        module.turnIndex++;
        module.actionList = [];
        module.actionIndexInTurn = 0;

        var team2Actions = module.generateTeamActions(module.teamTwo, module.teamOne);
        module.actionList = team2Actions;

        module.trigger(module.EVENT_TURN_READY);
    }



    module.engage = function (pTeamOne, pTeamTwo) {
        
        module.status = module.STATUS_ONGOING;
        module.teamOne = pTeamOne;
        module.teamTwo = pTeamTwo;
        module.turnIndex = 0;
        _nextTurn();
    };



    function _actionSorting(pItem, pOrder) {
        // tmp: random action sorting
        // todo : sort action list according to some logic
        if (Math.random() < 0.5) {
            return 1;
        }
        return -1;
    }



    function _getNextValidActionIndex(pIndex) {
        
        var i;
        for (i = pIndex; i < module.actionList.length; i++) {
            var action = module.actionList[i];
            if (action.fighter.hp > 0) {
                return i;
            }
            //else {console.log("skipping action index "+i+" because fighter is dead: "+action.fighter.name)}
        }
        return null;
    }
    
    
    
    function _getOtherValidTarget(target) {
        var index = module.teamOne.indexOf(target);
        var team;
        if (index > -1) {
            team = module.teamOne;
        } else {
            team = module.teamTwo;
            index = team.indexOf(target);
        }
        
        var validTeam = getValidTeamMembers(team);
        if (validTeam.length === 0) {
            return null;
        } else if (validTeam.length === 1) {
            return validTeam[0];
        } else {
            return validTeam[Math.floor(Math.random() * validTeam.length)];
        }
    }
    
    
    
    function _nextFighterAction() {
        
        if (module.actionIndexInTurn + 1 === module.actionList.length) {
            _nextTurn();
            return;
        }

        module.actionIndexInTurn = _getNextValidActionIndex(module.actionIndexInTurn + 1);
        
        if (module.actionIndexInTurn === null) {
            _nextTurn();
            return;
        }
        
        console.log("so action index = " + module.actionIndexInTurn);

        var nextAction = module.actionList[module.actionIndexInTurn];

        // validate targets for attacks (for single targets only, multiple target attacks can fail)
        if (nextAction.actionType === FighterAction.ATTACK) {
            if (nextAction.chosenTargets.length === 1) {
                var target = nextAction.chosenTargets[0];
                if (target.hp === 0) {
                    target = _getOtherValidTarget(target);
                    console.log("New target is " + target);
                    if (target === null) {
                        console.log("No valid target found (team is defeated)");
                    } else {
                        nextAction.chosenTargets[0] = target;
                    }
                }
            }
        }
        
        module.currentAction = nextAction;

        module.trigger(module.EVENT_FIGHTER_ACTION_START);
    }
    
    
    module.setTeam1Actions = function (actions) {
        // add it to the list of team2 actions
        module.actionList = module.actionList.concat(actions);
        
        // begin turn actions
        module.actionList.sort(_actionSorting);
        _nextFighterAction();
    };
    
    
    
    
    function _performAttack(pChar1, pChar2) {

        // TODO improve damage logic 
        //console.log("damage details: attack:" + pChar1.getAttack() + " defense:" + pChar2.getDefense());
        
        var damage = Math.round(pChar1.getAttack() * 2 - pChar2.getDefense());
        if (damage < 0) {
            damage = 0;
        }

        pChar2.hp -= damage;

        if (pChar2.hp <= 0) {
            pChar2.hp = 0;
        }
        
        return new ActionResult(ActionResult.HP_LOST, pChar2, damage);
    }
    
    
    module.performAction = function () {
        
        var results = [];
        var pAction = module.currentAction;
        var totalTargets = pAction.chosenTargets.length;
        
        var i;
        for (i = 0; i < totalTargets; i++) {
            var target = pAction.chosenTargets[i];

            // TODO deal with other actions
            if (pAction.actionType === FighterAction.ATTACK) {
                var action =  _performAttack(pAction.fighter, target);
                results.push(action);
            }
        }
        
        return results;
    };

    
    
    function _checkEndOfFightConditions() {
        
        if (getValidTeamMembers(module.teamOne).length === 0) {
            module.status = module.STATUS_T2_VICTORY;
            return true;
        } else if (getValidTeamMembers(module.teamTwo).length === 0) {
            module.status = module.STATUS_T1_VICTORY;
            return true;
        }
        
        return false;
    }

    
    module.fighterActionDone = function () {
        
        var over = _checkEndOfFightConditions();

        if (over) {
            module.trigger(module.EVENT_BATTLE_ENDED);
            return;
        } else {
            _nextFighterAction();
        }
    };

    return module;

});