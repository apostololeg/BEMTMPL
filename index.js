var BEMTMPL = require('./BEMTMPL.js');

require('./blocks/b-one.js');
require('./blocks/b-two.js');

// entry data => bemjson
console.log('BEMJSON:', BEMTMPL.apply({
    block: 'b-one',
    mods: {azaza: 'ololo'},
    mix: {block: 'some-block'},
    data: {
        a: 1,
        b: 2
    },
    content: 'aaaaaaaa'
}));

console.log('BEMJSON:', BEMTMPL.apply({block: 'b-two', data: 'azaza'}));
