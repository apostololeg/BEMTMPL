var $ = require('jquery');
var ace = require('brace');
var BEMTMPL = require('../index.js');
var JSON5 = require('json5');
var beautifyHTML = require('js-beautify').html;

// export for live templating
window.BEMTMPL = BEMTMPL;

require('brace/mode/xml');
require('brace/mode/javascript');
require('brace/theme/github');

// EDITOR
function Editor(name, opts) {
    this.name = name;
    this.domElem = $('#' + name);
    this.editor = ace.edit(name);

    this.editor.setTheme('ace/theme/github');
    this.editor.getSession().setMode('ace/mode/' + opts.mode);
    this.editor.setReadOnly(opts.disabled);
    this.editor.renderer.setShowGutter(false);

    this._loadData();
};

$.extend(Editor.prototype, {
    _loadData: function() {
        $.ajax('./' + this.name + '.js', {dataType: 'text'})
            .then(function(data) {
                this.editor.setValue(data.replace(/\r?\n?$/, ''));
                this.editor.clearSelection();
                this.editor.gotoLine(1);
            }.bind(this));
    },
    val: function() {
        return this.editor.getValue();
    }
});


// EDITOR
function Editor(name, opts) {
    this.name = name;
    this.domElem = $('#' + name);
    this.editor = ace.edit(name);

    this.editor.setTheme('ace/theme/github');
    this.editor.getSession().setMode('ace/mode/' + opts.mode);
    this.editor.setReadOnly(opts.disabled);
    this.editor.renderer.setShowGutter(false);

    this._loadData();
};

$.extend(Editor.prototype, {
    _loadData: function() {
        $.ajax('./' + this.name + '.js', {dataType: 'text'})
            .then(function(data) {
                this.editor.setValue(data.replace(/\r?\n?$/, ''));
                this.editor.clearSelection();
                this.editor.gotoLine(1);
                this.editor.scrollPageUp();
            }.bind(this));
    },
    val: function() {
        return this.editor.getValue();
    }
});

// EDITORS
var result = new Editor('result', {mode: 'xml', disabled: true});
var entry = new Editor('entry', {mode: 'javascript'});
var template = new Editor('template', {mode: 'javascript'});
var RENDER_INTERVAL = 500;
var nextTick = function(fn) {setTimeout(fn, 0)};

function renderBEMTMPL() {
    setTimeout(renderBEMTMPL, RENDER_INTERVAL);
    if ($(result.editor.container).hasClass('ace_focus')) {
        return;
    }
    nextTick(updateTemplate);
    nextTick(updateResult);
}

function updateTemplate() {
    var script = $('<script id="tmplexec">');

    $('#tmplexec').remove();
    script.text(
        'try{' + template.val() + '} catch(e) { console.log(e) }'
    );
    $('body').append(script);
}

function updateResult() {
    var entryData = entry.val(),
        html;

    result.editor.setValue('');
    html = BEMTMPL.apply(JSON5.parse(entryData));
    result.editor.setValue(beautifyHTML(html));
    result.editor.clearSelection();
}

renderBEMTMPL();
