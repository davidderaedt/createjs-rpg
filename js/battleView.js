/*jshint browser:true, strict:true, devel:true, camelcase:true, eqeqeq:true, forin:true, immed:true, indent: 4, newcap:true, noempty:true, quotmark:true, undef:true, unused:true */
/*global define, createjs, lib*/

/*
If we wanted to load createJS libs with requirejs, we'd use this:
define(["Observable", "FighterAction", "require", "../assets/sprites/rpg", "libs/easeljs-0.5.0.min", "libs/tweenjs-0.3.0.min", "libs/preloadjs-0.2.0.min"], function (Observable, FighterAction, require) {
*/
define(["Observable", "FighterAction", "../assets/sprites/rpg" ], function (Observable, FighterAction) {
    "use strict";
        
    var module = new Observable();

    module.EVENT_READY = "battleViewReady"; // view was initialized
    module.EVENT_READY_TO_ENGAGE = "battleViewReadyToEngage"; // intro was done
    module.EVENT_TURN_ACTIONS_SET = "turnActionsSet";
    module.EVENT_PERFORM_ACTION = "performAction";
    module.EVENT_ACTION_DONE = "actionDone";
    module.EVENT_OUTRO_DONE = "outroDone"; // battle final status displayed, ready to quit
    
    // NOTE:
    // The only way to compute this would be: obj.spriteSheet._frames[0].width;
    var SPRITE_SIZE = 64;
    
    var rawAssets;//loaded items (image files, json, ...)
    var assets;// processed or intanciable objects (BitmapAnimations, ...)
    
    // displayObjects
    var stage;
    var fpsText;
    var loadingText;
    var msgText;
    var bigMsgBox;
    var bigMsgText;
    var fightersContainer;
    
    var fighterSpriteList; // TODO see if needed or if we can use fightersContainer.children
    
    // Store team models
    var team1;
    var team2;
    
    // 100 is normal, lower is faster
    var speedFactor = 100;
    
    
    // Logging system
    function log() {
        console.log.apply(console, arguments);
    }

    function showMessage(pMessage) {
        console.log.apply(console, arguments);
        msgText.text = pMessage;
    }
    
    
    function showBigMessage(pMessage, pTime, pCallback) {
        bigMsgBox.visible = true;
        bigMsgText.text = pMessage;
        if (!pTime) {
            return;
        }
        
        window.setTimeout(function () {
            bigMsgBox.visible = false;
            pCallback();
        }, pTime);
    }
    
    
    // Generic utility function to store loaded assets somewhere
    function storeAssets(pRawAssets, pAssets) {
        var i;
        for (i = 0; i < pRawAssets.length; i++) {

            var item = pRawAssets[i];

            switch (item.type) {

            case "json":
                var ssdata = JSON.parse(item.result.toString());
                var key;
                for (key in ssdata) {
                    if (ssdata.hasOwnProperty(key)) {
                        var spData = ssdata[key];
                        pAssets[key + "SpriteSheet"] = new createjs.SpriteSheet(spData);
                    }
                }

                break;

            case "image":
                pAssets[item.id + "Img"] = item.result;
                break;
            }
        }
    }
    
    
    function showLoadingMessage() {
        
        log("Now loading...");
        
        loadingText = new createjs.Text("Loading", "36px Arial", "#777");
        stage.addChild(loadingText);
        loadingText.x = 10;
        loadingText.y = 40;
        
    }

    
    function createMsgBoxes() {
        
        msgText = new createjs.Text("", "bold 14px Arial", "#EEEEEE");
        stage.addChild(msgText);
        msgText.x = 10;
        msgText.y = stage.canvas.height - 20;
        msgText.shadow = new createjs.Shadow("#000", 2, 2, 2);
        
        
        bigMsgBox = new createjs.Container();
        stage.addChild(bigMsgBox);
        var boxHeight = 90;
        var bigMsgBoxBgd = new createjs.Shape();
        var g = bigMsgBoxBgd.graphics;
		g.beginFill("rgba(50,50,50,0.7)");
		g.drawRect(0, 0, stage.canvas.width, boxHeight);
        bigMsgBox.addChild(bigMsgBoxBgd);
        bigMsgText = new createjs.Text("", "bold 36px ARIAL", "#FFFFFF");
        bigMsgBox.addChild(bigMsgText);
        bigMsgText.textAlign = "center";
        bigMsgText.text = "-";
        bigMsgText.y = (boxHeight / 2) - (20);
        bigMsgText.shadow = new createjs.Shadow("#000", 3, 3, 3);
        bigMsgText.x = stage.canvas.width / 2;
        log("stage.canvas.height " + stage.canvas.height);
        bigMsgBox.y = (stage.canvas.height / 2) - (boxHeight / 2);
        bigMsgBox.visible = false;
    }
    
    
    function addFPS() {
        
        fpsText = new createjs.Text("--/--", "bold 16px Arial", "#000");
        stage.addChild(fpsText);
        fpsText.x = stage.canvas.width - 50;
        fpsText.y = 26;
        fpsText.onTick = function () {
            fpsText.text = (Math.round(createjs.Ticker.getMeasuredFPS()) + "/" + createjs.Ticker.getFPS());
        };
    }
    
    
    function drawBackground() {
        var bmp = new createjs.Bitmap(assets.bgdImg);
        stage.addChild(bmp);
    }
    
    
    function initStage() {
        stage.removeChild(loadingText);
        drawBackground();
        fightersContainer = new createjs.Container();
        stage.addChild(fightersContainer);
        createMsgBoxes();
        addFPS();
    }
    

    function load(manifest) {
        
        showLoadingMessage();

        rawAssets = [];
        assets = {};

        var loader = new createjs.PreloadJS();
        
        loader.onFileLoad = function (item) {
            rawAssets.push(item);
        };
        
        loader.onComplete = function () {
            log("Done loading");
            storeAssets(rawAssets, assets);
            initStage();
            module.trigger(module.EVENT_READY);
        };
        
        loader.loadManifest(manifest);
    }
    
    

    function onTick() {
        stage.update();
    }
    
    
    
    module.init = function (pCanvas) {

        log("Initializing battle view");
        
        stage = new createjs.Stage(pCanvas);

        createjs.Ticker.setFPS(40);
        createjs.Ticker.addListener(onTick);
        
        // load data
        
        var manifest = [
            {src: "assets/bgd.jpg", id: "bgd"}
        ];
        
        load(manifest);
    };


    function createFighter(pFighterModel, pPos, pReverse) {
        
        // TODO get the spriteSheet according to the model
        var fighterType = "BasicFighter";
        
        var f = new lib[fighterType]();
        
        fightersContainer.addChild(f);
        f.model = pFighterModel;
        f.x = pPos.x;
        f.y = pPos.y;
        f.regX = (SPRITE_SIZE / 2);
        f.regY = (SPRITE_SIZE / 2);
        
        if (pReverse) {
            f.scaleX = -1;
        }
        
        if (pFighterModel.hp === 0) {
            f.gotoAndPlay("dead");
        } else {
            f.gotoAndPlay("idle");
        }
        return f;
    }

    
    
    function createFighterGroup(pTeam, pRightTeam) {
        
        var xDest = SPRITE_SIZE;
        if (pRightTeam) {
            xDest = stage.canvas.width - SPRITE_SIZE;
        }
        var i;
        for (i = 0; i < pTeam.length; i++) {
            var fighterModel = pTeam[i];
            var f = createFighter(fighterModel, {x: xDest, y: 46 + (65 * (i + 1)) }, pRightTeam);
            fighterSpriteList.push(f);
        }
    }

    
        
    function getFighterSpriteOf(pModel) {
        
        var i;
        for (i = 0; i < fighterSpriteList.length; i++) {
            var sprite = fighterSpriteList[i];
            if (sprite.model === pModel) {
                return sprite;
            }
        }
        log("WARNING: no sprite could be found for " + pModel);
        return null;
    }

    

    function createFighters() {
        
        fighterSpriteList = [];
        fightersContainer.removeAllChildren();

        createFighterGroup(team1, false);
        createFighterGroup(team2, true);
    }
    
    
    
    module.showTurn = function (pIndex) {
        showMessage("\t*** Turn " + pIndex + " ***");
        
        // tmp: actions should be user generated, we keep them null to have it generated for us
        var actions = null;
        module.trigger(module.EVENT_TURN_ACTIONS_SET, actions);
    };
    
    
    
    module.showHit = function (fighter, hitValue) {
        
        var targetSprite = getFighterSpriteOf(fighter);
        
        createjs.Tween.get(targetSprite)
            .call(targetSprite.gotoAndPlay, ["hit"])
            .wait(5 * speedFactor)
            .call(function () {
                if (fighter.hp > 0) {
                    targetSprite.gotoAndPlay("idle");
                } else {
                    showMessage(fighter.name + " is KO !");
                    targetSprite.gotoAndPlay("dead");
                }
            });
        
        // TODO show damage bubble
        
        showMessage(fighter.name + " loses " + hitValue + " HP (" + fighter.hp + "/" + fighter.maxhp + ")");
    };
    
    
    
    module.showEndOfAction = function (pAction) {
        
        var pFighterSprite = getFighterSpriteOf(pAction.fighter);
        
        createjs.Tween.get(pFighterSprite)
            .wait(5 * speedFactor)
            .call(pFighterSprite.gotoAndPlay, ["run"])
            .to(pFighterSprite.originPoint, 10 * speedFactor)
            .call(pFighterSprite.gotoAndPlay, ["idle"])
            .call(function () {
                module.trigger(module.EVENT_ACTION_DONE);
            });
    };
    
    
    
    
    function attackAnim(pFighterSprite, pTargetSprite) {
        
        pFighterSprite.originPoint = {x: pFighterSprite.x, y: pFighterSprite.y};
        
        var targetPoint;
        // If no target, we place the attacker at the center
        if (!pTargetSprite) {
            targetPoint = {
                x: (stage.canvas.width / 2) - (SPRITE_SIZE / 2),
                y: (stage.canvas.height / 2) - (SPRITE_SIZE / 2)
            };
        } else {
            targetPoint = {
                x: pTargetSprite.x + (SPRITE_SIZE * pTargetSprite.scaleX),
                y: pTargetSprite.y
            };
        }
        
        createjs.Tween.get(pFighterSprite)
            .call(pFighterSprite.gotoAndPlay, ["run"])
            .to(targetPoint, 15 * speedFactor)
            .call(pFighterSprite.gotoAndPlay, ["attack"])
            .call(function () {
                module.trigger(module.EVENT_PERFORM_ACTION);
            });
    }
    
    
    module.showActionStart = function (action) {
        
                    
        var fighterSprite = getFighterSpriteOf(action.fighter);
        var targetSprite;
        var n = action.chosenTargets.length;
        
        var targetName = "ALL";
        
        if (n === 1) {
            targetSprite = getFighterSpriteOf(action.chosenTargets[0]);
            targetName = action.chosenTargets[0].name;
        }
        showMessage(action.fighter.name + " performs " + action.actionType + " on " + targetName);
        
                
        // TODO deal with other types of actions
        if (action.actionType === FighterAction.ATTACK) {
            attackAnim(fighterSprite, targetSprite);
        }
    };
    
    
    
    module.showBattle = function (pTeam1, pTeam2) {
        
        team1 = pTeam1;
        team2 = pTeam2;

        log("Friends", team1);
        log("Enemies", team2);

        createFighters(pTeam1, pTeam2);

        log("------------- NEW BATTLE -------------");
        showBigMessage("READY...", 600, function () {
            showBigMessage("FIGHT !", 400, function () {
                module.trigger(module.EVENT_READY_TO_ENGAGE);
            });
        });
    };
    
    
    module.showBattleResult = function (victory, battleCount) {
        if (victory) {
            showMessage("The good guys win!");
            showBigMessage("VICTORY !", 1000, function () {
                module.trigger(module.EVENT_OUTRO_DONE);
            });
        } else {
            showMessage("GAME OVER, battle count: " + battleCount);
            showBigMessage("YOU LOSE !");
        }
    };
    
    return module;
});

