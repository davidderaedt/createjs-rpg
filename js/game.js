/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global document, define, $, setTimeout, XMLHttpRequest, navigator */

define(["Observable", "battleEngine", "Fighter", "ActionResult", "battleView", "Weapon", "Shield"], function (Observable, battleEngine, Fighter, ActionResult, battleView, Weapon, Shield) {
    "use strict";

    var module = new Observable();

    module.EVENT_READY = "gameReady";

    var playerTeam;
    var enemyTeam;
    
    var battleCount = 0;
    var dataDB = {};

    // utility function to load json
    function loadJSON(URL, callback) {
        var oRequest = new XMLHttpRequest();
        oRequest.open("GET", URL, true);
        oRequest.onreadystatechange = function () {
            if (oRequest.readyState === 4 && oRequest.status === 200) {
                callback(JSON.parse(oRequest.responseText));
            }
        };
        oRequest.send(null);
    }


    function _generateTeam(pNum, pPrefix) {
        var team = [];
        var j;
        for (j = 0; j < pNum; j++) {
            var fighter = new Fighter();
            fighter.name = pPrefix + (j + 1);
            fighter.maxhp = 1 + Math.round(Math.random() * 100);
            fighter.hp = fighter.maxhp;
            fighter.attack =   Math.round(1 + Math.random() * 10);
            fighter.defense =  Math.round(1 + Math.random() * 10);
            fighter.weapon = dataDB.weapons[Math.floor(Math.random() * dataDB.weapons.length)];
            fighter.shield = dataDB.shields[Math.floor(Math.random() * dataDB.shields.length)];
            team.push(fighter);
        }
        return team;
    }


    function _newBattle() {

        battleCount++;

        var numEnemies = Math.ceil(Math.random() * 5);
        enemyTeam = _generateTeam(numEnemies, "Enemy ");

        battleView.showBattle(playerTeam, enemyTeam);

       
    }
    
    function onReadyToEngage() {
        battleEngine.engage(playerTeam, enemyTeam);
    }


    function onTurnReady() {
        battleView.showTurn(battleEngine.turnIndex);
    }


    function onTurnActionsSet(topic, actions) {
        if (actions === null) {
            actions = battleEngine.generateTeamActions(playerTeam, enemyTeam);
        }
        battleEngine.setTeam1Actions(actions);
    }


    function onActionDone() {
        battleEngine.fighterActionDone();
    }


    function onActionBePerformed() {

        var actionResults = battleEngine.performAction();

        var i;
        for (i = 0; i < actionResults.length; i++) {
            var actionResult = actionResults[i];
            //TODO: other types of action results
            if (actionResult.type === ActionResult.HP_LOST) {
                battleView.showHit(actionResult.target, actionResult.value);
            }
        }
        battleView.showEndOfAction(battleEngine.currentAction);
    }


    function onFighterActionStart() {
        battleView.showActionStart(battleEngine.currentAction);
    }


    function onBattleEnded() {

        if (battleEngine.status === battleEngine.STATUS_T1_VICTORY) {
            battleView.showBattleResult(true, battleCount);

        } else {
            battleView.showBattleResult(false, battleCount);
        }
    }
    
    function onOutroDone() {
        // TMP: chain fights until the end !!
        _newBattle();
        
    }


    function init() {

        battleEngine.bind(battleEngine.EVENT_TURN_READY, onTurnReady);
        battleEngine.bind(battleEngine.EVENT_FIGHTER_ACTION_START, onFighterActionStart);
        battleEngine.bind(battleEngine.EVENT_BATTLE_ENDED, onBattleEnded);

        battleView.bind(battleView.EVENT_TURN_ACTIONS_SET, onTurnActionsSet);
        battleView.bind(battleView.EVENT_PERFORM_ACTION, onActionBePerformed);
        battleView.bind(battleView.EVENT_ACTION_DONE, onActionDone);
        battleView.bind(battleView.EVENT_READY_TO_ENGAGE, onReadyToEngage);
        battleView.bind(battleView.EVENT_OUTRO_DONE, onOutroDone);

        battleView.bind(battleView.EVENT_READY, function () {
            
            console.log("view is ready, now loading data");

            loadJSON("data/data.json", function (obj) {
                console.log("Data loaded");
                dataDB = obj;
                module.trigger(module.EVENT_READY);
            });
            
        });

        var canvas = document.getElementById('mainCanvas');
        battleView.init(canvas);
        
    }


    function start() {

        playerTeam = _generateTeam(4, "Friend ");

        _newBattle();
    }


    module.init = init;
    module.start = start;

    return module;

});
