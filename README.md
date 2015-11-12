## JavaScript based, client-side, lightweight, simple templater for BEM
[![npm](https://img.shields.io/npm/v/bemtmpl.svg?style=flat-square)](https://www.npmjs.com/package/bemtmpl)
[![npm](https://img.shields.io/npm/dm/bemtmpl.svg?style=flat-square)](https://www.npmjs.com/package/bemtmpl)

[Demo](http://truerenton.github.io/BEMTMPL/editor/)

### Declaration
Use `.decl(name, templater)` method to declarate new template.

* `name` – the name of template
* `templater(ctx)` – function, which convert entry bemjson to html
  * `ctx` – entry bemjson tree

```javascript
BEMTMPL.decl('my-block', function(ctx) {
    ctx.content(ctx.data, true);
});
```

### Templating
```javascript
BEMTMPL.apply({ block: 'my-block', data: 'azaza' });
```

### Methods
`ctx` object, that available inside templater, have several methods for modification entry
bemjson tree:

* `js`
* `attr`
* `mods`
* `mix`
* `content`

All methods have same signature `method([data][, force])`:

* `data` – data to modify self-named field of bemjson tree
* `force` – by default, field data was extended with `data`. If `force: true`, field value was replaced with `data`.

**NOTE**: `force` doesn't work for `mix` for ideological reasons.

#### Getters
If you don't specify the `data`, all above methods return value of appropriate field.

`ctx.mods(); // { theme: simple }`

For `attrs` and `mods` you can specify the name of attribute or modifier that you want to get.

`ctx.mods('theme'); // 'simple'`


### Dependencies
* [bemjson-to-html](https://github.com/floatdrop/bemjson-to-html)
