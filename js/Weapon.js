/*jshint browser:true, strict:true, devel:true, camelcase:true, eqeqeq:true, forin:true, immed:true, indent: 4, newcap:true, noempty:true, quotmark:true, undef:true, unused:true */
/*global define*/

define([], function () {
    "use strict";
    
    function Weapon(pName, pAttack, tNum) {
        this.name = pName;
        this.attack = pAttack;
        this.targetNum = tNum;
    }
    
    return Weapon;
    
});