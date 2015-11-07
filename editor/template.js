BEMTMPL.decl('foo', function(ctx) {
    // ctx.content('eeeee');
    // ctx.content('eeeee', true);
    // ctx.content({ block: 'z', elem: 'x' });
    ctx.content({
        block: 'z',
        content: [
            {elem: 'x'},
            {elem: 'y'}
        ]
    });
    // ctx.mods({theme: '123'});
    // ctx.mix([{block: '111'}, {block: 'bar', mods: {a:1}}])
    // return [1,2,3];
});
