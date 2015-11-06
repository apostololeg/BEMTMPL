var extend = require('extend');
var extendibleFields = ['js', 'attrs', 'mods', 'mix'];

/**
 * @param  {String} fName – field name for extending (_mods, _mix, ...)
 * @param  {Object|Array} data
 */
function extendField(fName, data) {
    var fData = this[fName];

    if (Array.isArray(fData)) {
        this[fName] = fData.concat(data);
        return;
    }

    if (typeof fData === 'object') {
        this[fName] = extend(fData, data);
        return;
    }

    this[fName] = data;
}

function extendMethods(ctx) {
    extendibleFields.forEach(function(fName) {
        var _fName = '_' + fName;

        ctx[_fName] = ctx[fName];
        ctx[fName] = extendField.bind(ctx, _fName);
    });
}

function BEMTMPL() {};

extend(BEMTMPL.prototype, {

    _tmpl: {},

    /**
     * Register new template
     *
     * @param  {String}   name
     * @param  {Function} fn
     */
    decl: function(name, fn) {
        this._tmpl[name] = fn;
    },

    /**
     * Entry data => bemjson
     *
     * @param  {Object} data
     */
    apply: function(ctx) {
        var bemjson,
            _field;

        // add methods for extend ctx fields
        extendMethods(ctx);
        // applying template
        bemjson = this._tmpl[ctx.block](ctx);
        console.log(bemjson);
        // remove '_' in fields names
        extendibleFields.forEach(function(field) {
            // fields with one underline
            _field = '_' + field;
            if (ctx[_field]) {
                console.log(field);
                bemjson[field] = ctx[_field];
            }
            delete ctx[_field];
        });

        if (bemjson.__force) {
            delete bemjson.__force;
            return bemjson;
        }

        return extend(ctx, bemjson);
    },

    /**
     * Entry data => bemjson without ctx
     *
     * @param  {Object} data
     */
    applyForce: function(data) {
        var bemjson = typeof data === 'object'

        if (typeof data === 'object') {
            data.__force = true;
            return data;
        }

        return {
            __force: true,
            content: data
        };
    }

});

module.exports = new BEMTMPL();
