if (!window.lib) { window.lib = {}; }
(function() {
var spritesheetPath = "assets/sprites/rpg.png";

var BasicFighter = function() {
	this.initialize();
}
BasicFighter._SpriteSheet = new createjs.SpriteSheet({images: [spritesheetPath], frames: [[0,0,64,64,0,0,0],[64,0,64,64,0,0,0],[128,0,64,64,0,0,0],[192,0,64,64,0,0,0],[256,0,64,64,0,0,0],[320,0,64,64,0,0,0],[384,0,64,64,0,0,0],[448,0,64,64,0,0,0],[512,0,64,64,0,0,0],[576,0,64,64,0,0,0],[640,0,64,64,0,0,0],[704,0,64,64,0,0,0],[768,0,64,64,0,0,0],[832,0,64,64,0,0,0],[896,0,64,64,0,0,0],[960,0,64,64,0,0,0],[0,64,64,64,0,0,0],[64,64,64,64,0,0,0],[128,64,64,64,0,0,0],[192,64,64,64,0,0,0],[256,64,64,64,0,0,0],[320,64,64,64,0,0,0],[384,64,64,64,0,0,0],[448,64,64,64,0,0,0],[512,64,64,64,0,0,0],[576,64,64,64,0,0,0],[640,64,64,64,0,0,0],[704,64,64,64,0,0,0],[768,64,64,64,0,0,0],[832,64,64,64,0,0,0],[896,64,64,64,0,0,0],[960,64,64,64,0,0,0],[0,128,64,64,0,0,0],[64,128,64,64,0,0,0],[128,128,64,64,0,0,0],[192,128,64,64,0,0,0],[256,128,64,64,0,0,0],[320,128,64,64,0,0,0],[384,128,64,64,0,0,0],[448,128,64,64,0,0,0],[512,128,64,64,0,0,0],[576,128,64,64,0,0,0],[640,128,64,64,0,0,0],[704,128,64,64,0,0,0],[768,128,64,64,0,0,0],[832,128,64,64,0,0,0],[896,128,64,64,0,0,0],[960,128,64,64,0,0,0],[0,192,64,64,0,0,0],[64,192,64,64,0,0,0]],  animations: {idle:[0,9, true], run:[10,19, true], attack:[20,29, "false"], hit:[30,39, "false"], dead:[40,49, "false"]}});
var BasicFighter_p = BasicFighter.prototype = new createjs.BitmapAnimation();
BasicFighter_p.BitmapAnimation_initialize = BasicFighter_p.initialize;
BasicFighter_p.initialize = function() {
	this.BitmapAnimation_initialize(BasicFighter._SpriteSheet);
	this.paused = false;
}
BasicFighter_p.idle = function(){
	this.gotoAndPlay("idle");
}
BasicFighter_p.run = function(){
	this.gotoAndPlay("run");
}
BasicFighter_p.attack = function(){
	this.gotoAndPlay("attack");
}
BasicFighter_p.hit = function(){
	this.gotoAndPlay("hit");
}
BasicFighter_p.dead = function(){
	this.gotoAndPlay("dead");
}
lib.BasicFighter = BasicFighter;

var NMEFighter = function() {
	this.initialize();
}
NMEFighter._SpriteSheet = new createjs.SpriteSheet({images: [spritesheetPath], frames: [[128,192,75,72,0,7.95,7.95],[203,192,75,72,0,7.95,7.95],[278,192,75,72,0,7.95,7.95],[353,192,75,72,0,7.95,7.95],[428,192,75,72,0,7.95,7.95],[503,192,75,72,0,7.95,7.95],[578,192,75,72,0,7.95,7.95],[653,192,75,72,0,7.95,7.95],[728,192,75,72,0,7.95,7.95],[803,192,75,72,0,7.95,7.95],[878,192,75,72,0,7.95,7.95],[0,264,75,72,0,7.95,7.95],[75,264,75,72,0,7.95,7.95],[150,264,75,72,0,7.95,7.95],[225,264,75,72,0,7.95,7.95],[300,264,75,72,0,7.95,7.95],[375,264,75,72,0,7.95,7.95],[450,264,75,72,0,7.95,7.95],[525,264,75,72,0,7.95,7.95],[600,264,75,72,0,7.95,7.95],[675,264,75,72,0,7.95,7.95],[750,264,75,72,0,7.95,7.95],[825,264,75,72,0,7.95,7.95],[900,264,75,72,0,7.95,7.95],[0,336,75,72,0,7.95,7.95],[75,336,75,72,0,7.95,7.95],[150,336,75,72,0,7.95,7.95],[225,336,75,72,0,7.95,7.95],[300,336,75,72,0,7.95,7.95],[375,336,75,72,0,7.95,7.95],[450,336,75,72,0,7.95,7.95],[525,336,75,72,0,7.95,7.95],[600,336,75,72,0,7.95,7.95],[675,336,75,72,0,7.95,7.95],[750,336,75,72,0,7.95,7.95],[825,336,75,72,0,7.95,7.95],[900,336,75,72,0,7.95,7.95],[0,408,75,72,0,7.95,7.95],[75,408,75,72,0,7.95,7.95],[150,408,75,72,0,7.95,7.95],[225,408,75,72,0,7.95,7.95],[300,408,75,72,0,7.95,7.95],[375,408,75,72,0,7.95,7.95],[450,408,75,72,0,7.95,7.95],[525,408,75,72,0,7.95,7.95],[600,408,75,72,0,7.95,7.95],[675,408,75,72,0,7.95,7.95],[750,408,75,72,0,7.95,7.95],[825,408,75,72,0,7.95,7.95],[900,408,75,72,0,7.95,7.95]],  animations: {idle:[0,9, true], run:[10,19, true], attack:[20,29, "false"], hit:[30,39, "false"], dead:[40,49, "false"]}});
var NMEFighter_p = NMEFighter.prototype = new createjs.BitmapAnimation();
NMEFighter_p.BitmapAnimation_initialize = NMEFighter_p.initialize;
NMEFighter_p.initialize = function() {
	this.BitmapAnimation_initialize(NMEFighter._SpriteSheet);
	this.paused = false;
}
NMEFighter_p.idle = function(){
	this.gotoAndPlay("idle");
}
NMEFighter_p.run = function(){
	this.gotoAndPlay("run");
}
NMEFighter_p.attack = function(){
	this.gotoAndPlay("attack");
}
NMEFighter_p.hit = function(){
	this.gotoAndPlay("hit");
}
NMEFighter_p.dead = function(){
	this.gotoAndPlay("dead");
}
lib.NMEFighter = NMEFighter;
}());

