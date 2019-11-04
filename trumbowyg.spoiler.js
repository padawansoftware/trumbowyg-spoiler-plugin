Spoiler = require('@padawansoftware/spoiler.js');

(function ($, Spoiler) {
    'use strict';

    // Plugin default options
    var defaultOptions = {
    };

    function buildButtonDef(trumbowyg) {
        return {
            fn: function () {
                var $modal = trumbowyg.openModal('Spoiler', [
                    `<div class="${trumbowyg.o.prefix}highlight-form-group ">
                        <label>Title</label>
                        <input id="title" class="${trumbowyg.o.prefix}highlight-form-control title"></input>
                    </div>
                    <div class="${trumbowyg.o.prefix}highlight-form-group">
                        <label>Content</label>
                       <textarea class="${trumbowyg.o.prefix}highlight-form-control content"></textarea>
                    </div>
                    `
                ].join('\n')),

                $title = $modal.find('.title'),
                $content = $modal.find('.content');

                // Listen clicks on modal box buttons
                $modal.on('tbwconfirm', function () {
                    trumbowyg.restoreRange();
                    trumbowyg.execCmd('insertHTML', Spoiler.create({
                        'spoilerText': $title.val(),
                        'spoilerContent': $content.val() ? $content.val() : (trumbowyg.getRangeText() ? trumbowyg.getRangeText() : '<br/>')
                        })
                    );
                    trumbowyg.execCmd('insertHTML', '<p><br></p>');
                    trumbowyg.closeModal();

                    Spoiler.initAll();
                });

                $modal.on('tbwcancel', function () {
                    trumbowyg.closeModal();
                });
            },
            title: 'Insert spoiler',
            text: '[]',
            hasIcon: false
        };
    }

    $.extend(true, $.trumbowyg, {
        langs: {
            en: {
                spoiler: 'Add spoiler'
            }
        },
        plugins: {
            spoiler: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.spoiler = $.extend(true, {},
                        defaultOptions,
                        trumbowyg.o.plugins.spoiler || {}
                    );

                    trumbowyg.addBtnDef('spoiler', buildButtonDef(trumbowyg));
                }
            }
        }
    });
})(jQuery, Spoiler);

