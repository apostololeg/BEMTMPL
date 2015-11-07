var bemjso2html = require('bemjson-to-html');
var BEMJSON = new bemjso2html();
var extend = require('extend');
var extendibleFields = ['js', 'attrs', 'mods', 'mix', 'content'];

/**
 * @param  {String}       _fName – field name for extending
 * @param  {Object|Array} data
 * @param  {Boolean}      force
 */
function extendField(_fName, data, force) {
    var fData = this[_fName];

    if (force || !fData) {
        this[_fName] = data;
        return;
    }

    if (Array.isArray(fData) || _fName === '_mix') {
        this[_fName] = fData.concat(data);
        return;
    }

    if (typeof fData === 'string') {
        this[_fName] += data;
        return
    }

    if (typeof fData === 'object') {
        this[_fName] = extend(fData, data);
        return;
    }
}

/**
 * @constructor
 */
function BEMTMPL() {};

extend(BEMTMPL.prototype, {

    /**
     * Shelf with templates
     * @type {Object}
     */
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

    html: BEMJSON.toHtml.bind(BEMJSON),

    /**
     * Apply template to entry bemjson
     * @param  {Object}  ctx
     * @param  {Boolean} force – apply template without extending entry ctx
     * @return {HTML}
     */
    apply: function(ctx, force) {
        if (Array.isArray(ctx)) {
            ctx.map(this._applyTemplate.bind(this));
        } else if (typeof ctx === 'object' && !force) {
            ctx = this._applyTemplate(ctx);
        }

        return this.html(Array.isArray(ctx) ? ctx.join('') : ctx);
    },

    _applyTemplate: function(ctx) {
        var template = this._tmpl[ctx.block];

        if (!template) {
            return;
        }

        // add methods for extend ctx fields
        this._extendMethods(ctx);
        // applying template
        ctx = template(ctx) || ctx;
        // _field => field
        this._returnFieldNames(ctx);

        return ctx;
    },

    _extendMethods: function(ctx) {
        var _fName;

        // helpers
        ctx.extend = extend;
        // fields
        extendibleFields.forEach(function(fName) {
            _fName = '_' + fName;

            ctx[_fName] = ctx[fName];
            ctx[fName] = extendField.bind(ctx, _fName);
        });
    },

    /**
     * _fieldname => fieldname
     * @param  {Object} ctx
     */
    _returnFieldNames: function(ctx) {
        var _field,
            _saved;

        if (typeof ctx === 'string' || typeof ctx === 'number') {
            return ctx;
        }

        // remove '_' in fields names
        extendibleFields.forEach(function(field) {
            // fields with one underline
            _field = '_' + field;
            _saved = ctx[_field];

            delete ctx[field];
            delete ctx[_field];

            if (_saved) {
                ctx[field] = _saved;
            }
        });
    }

});

module.exports = new BEMTMPL();
