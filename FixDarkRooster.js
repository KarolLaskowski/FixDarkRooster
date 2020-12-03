// ==UserScript==
// @name         FixRoosterEditor
// @namespace    
// @version      0.1
// @description  kto !important wojuje, od !important ginie
// @author       Karol Laskowski
// @include      /^https?:\/\/(.*\.visualstudio\.com|dev\.azure\.com)+/
// @run-at 		 document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var needBlurEvent = true;

    function addStyle(styleString) {
        var style = document.createElement('style');
        style.textContent = styleString;
        document.head.append(style);
    }

    function getStylesToMakeImportant () {
        // gets all <span> that had custom text or background color set up in editor
        return document.querySelectorAll('.rooster-editor div:not(.rooster-command-bar) *[style]');
    }

    function getRoosterEditors() {
        // gets all Azure DevOps rich text editors on the page
        return document.querySelectorAll('.rooster-editor');
    }

    function runInterval (e) {
        // runs interval few times until all editors and its content is loaded
        if (needBlurEvent) {
            var roosterEditors = getRoosterEditors();
            if (roosterEditors.length) {
                applyBlurEvent(roosterEditors);
                needBlurEvent = false;
            }
        }
        var stylesToMakeImportant = getStylesToMakeImportant();
        if (stylesToMakeImportant.length > 0) {
            applyImportants(stylesToMakeImportant);
            window.clearInterval(checkInterval);
        }
    }

    function applyBlurEvent(roosterEditors) {
        // adds 'click anywhere outside editor' event listener that fakes 'blur' event on editors
        document.addEventListener('click', function (e) {
            // not really blur event
            var stylesToMakeImportant = getStylesToMakeImportant();
            applyImportants(stylesToMakeImportant);
        });
    }

    function applyImportants(stylesToMakeImportant) {
        // applies !importants to all inline 'color' and 'background-color' styles added in editors
        stylesToMakeImportant.forEach(function(element) {
            var newStyle = '';
            if (element.style.color && !element.style.color.endsWith('!important')) {
                newStyle += 'color: ' + element.style.color + ' !important; ';
            }
            if (element.style.backgroundColor && !element.style.backgroundColor.endsWith('!important')) {
                newStyle += 'background-color: ' + element.style.backgroundColor + ' !important; ';
            }
            element.setAttribute('style', newStyle);
            element.querySelectorAll('*').forEach(function (e) {
                e.setAttribute('style', newStyle);
            });
        });
    }

    // lines below keep editors dark when you click on them to edit
    addStyle('.form-dark-theme .html-editor .rooster-wrapper div.rooster-editor.edit-mode,'
             + 'div.lean-rooster.rooster-editor.propagate-keydown-event.text-element.edit-mode h1,'
             + 'div.lean-rooster.rooster-editor.propagate-keydown-event.text-element.edit-mode ol {'
             + 'background-color: var(--background-color,rgba(255, 255, 255, 1)) !important; color: var(--text-primary-color,rgba(0, 0, 0, .9)) !important; }');
    addStyle('.html-editor .rooster-wrapper .rooster-editor.view-mode~.rooster-command-bar { opacity: 0; }');

    var checkInterval = window.setInterval(runInterval, 500);

})();