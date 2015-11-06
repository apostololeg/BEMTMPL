var BEMTMPL = require('../BEMTMPL.js');

// console.log(BEMTMPL);
module.exports = BEMTMPL.decl('b-one', function(ctx) {
    // default block mods
    ctx.mods({theme: 'normal'});

    return {
        content: [
            ctx.content,
            [ctx.data.a, ' + ', ctx.data.b]
        ]
    };
});
