/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $ */

define([], function () {
    "use strict";
    
    function Fighter() {
        this.name = "not-named";
        this.level = 0;
        this.hp = 0;
        this.maxhp = 0;
        this.pm = 0;
        this.maxpm = 0;
        this.attack = 0;
        this.defense = 0;
        this.weapon = null;
        this.shield = null;
    }
    
    
    Fighter.prototype.getAttack = function () {
        return Math.round(this.attack * this.weapon.attack);
    };
    

    Fighter.prototype.getDefense = function () {
        return Math.round(this.defense * this.shield.defense);
    };

    return Fighter;
    
});