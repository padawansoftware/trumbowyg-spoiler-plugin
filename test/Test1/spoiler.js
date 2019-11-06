/**
 * JavaScript Spoiler
 * ------------------
 */

(function() {
    var defaults = {
        'spoilerText': 'Spoiler',
        'spoilerContent': '<br/>',
        'status': 'collapsed'
    };

    function addListener(toggle)
    {
        toggle.onclick = function() {
            var target = this.parentNode,
                isExpanded = /(^| )spoiler-state-expanded( |$)/.test(target.className)
            ;

            target.className = isExpanded ? target.className.replace(/(^| )spoiler-state-expanded( |$)/, '$1spoiler-state-collapsed$2') : target.className.replace(/(^| )spoiler-state-collapsed( |$)/, '$1spoiler-state-expanded$2');

            return false;
        };
    }

    var Spoiler = {
        // Return new spoiler HTML
        createHTML(options = {}) {
            options = {...defaults, ...options};

            return `
                <div class="spoiler spoiler-state-${options.status}">
                    <a class="spoiler-toggle">${options.spoilerText}</a>
                    <div class="spoiler-content">${options.spoilerContent}</div>
                </div>
            `;
        },
        // Return new spoiler DOM Object
        create(options = {}) {
            var html = this.createHTML(options);

            var div = document.createElement('div');
            div.innerHTML = html.trim();

            return div.firstChild;
        },
        // (Re)init all spoilers
        initAll() {
            var spoilers = document.getElementsByClassName('spoiler');
            if (!spoilers) return;

            // Add class and id to each spoiler
            for (var i = 0 ; i < spoilers.length; ++i) {
                spoilers[i].id = 'spoiler-' + (i + 1);

                var spoilerToggle = spoilers[i].getElementsByClassName('spoiler-toggle').item(0);
                if(spoilerToggle) {
                    spoilerToggle.href = `#spoiler-${i +1}`;
                    addListener(spoilerToggle);
                }
            }
        }
    };

    // Init all spoilers on load
    Spoiler.initAll();

    // Export Spoiler object
    if ("object" == typeof module && module.exports) {
        module.exports = Spoiler;
    } else {
        window.Spoiler = Spoiler;
    }
})();