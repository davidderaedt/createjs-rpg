/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $ */

define([], function () {
    "use strict";
    
    function Weapon(pName, pAttack, tNum) {
        this.name = pName;
        this.attack = pAttack;
        this.targetNum = tNum;
    }
    
    return Weapon;
    
});