/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $ */

define([], function () {
    "use strict";
    
    
    function Shield(pName, pDefense) {
        this.name = pName;
        this.defense = pDefense;
    }
    
    return Shield;
    
});