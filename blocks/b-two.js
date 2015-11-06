var BEMTMPL = require('../BEMTMPL.js');

module.exports = BEMTMPL.decl('b-two', function(ctx, data) {
    return BEMTMPL.applyForce(data);
});
