window.$ = window.jQuery = require('jquery');
require('trumbowyg');
require('trumbowyg/dist/ui/trumbowyg.min.css');
require('@padawansoftware/spoiler.js/src/spoiler.css');
require('../../trumbowyg.spoiler.js');
require('../../ui/sass/trumbowyg.spoiler.css');

$('.wysiwyg').trumbowyg({
    btns: ['spoiler']
});
