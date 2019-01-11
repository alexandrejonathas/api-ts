"use strict";
var extension = 'js';
var ambiente = process.env.NODE_ENV || 'development';
console.log(ambiente);
if (ambiente == 'development') {
    extension = 'ts';
}
module.exports = function () { return require("../env/" + ambiente + ".env." + extension); };
//# sourceMappingURL=config.js.map