/*jshint browser:true, strict:true, devel:true, camelcase:true, eqeqeq:true, forin:true, immed:true, indent: 4, newcap:true, noempty:true, quotmark:true, undef:true, unused:true */
/*global define*/

define([], function () {
    "use strict";
    
    
    function Shield(pName, pDefense) {
        this.name = pName;
        this.defense = pDefense;
    }
    
    return Shield;
    
});