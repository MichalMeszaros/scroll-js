/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function scrollTo(el, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var scroll, currentScrollPosition, scrollProperty;
        return __generator(this, function (_a) {
            if (!(el instanceof Element) && !(el instanceof Window)) {
                throw new Error("element passed to scrollTo() must be either the window or a DOM element, you passed " + el + "!");
            }
            options = sanitizeScrollOptions(options);
            scroll = function (from, to, prop, startTime, duration, easeFunc, callback) {
                if (duration === void 0) { duration = 300; }
                window.requestAnimationFrame(function () {
                    var currentTime = Date.now();
                    var time = Math.min(1, (currentTime - startTime) / duration);
                    if (from === to) {
                        return callback ? callback() : null;
                    }
                    setScrollPosition(el, easeFunc(time) * (to - from) + from);
                    /* prevent scrolling, if already there, or at end */
                    if (time < 1) {
                        scroll(from, to, prop, startTime, duration, easeFunc, callback);
                    }
                    else if (callback) {
                        callback();
                    }
                });
            };
            currentScrollPosition = getScrollPosition(el);
            scrollProperty = getScrollPropertyByElement(el);
            return [2 /*return*/, new Promise(function (resolve) {
                    scroll(currentScrollPosition, typeof options.top === 'number'
                        ? options.top
                        : currentScrollPosition, scrollProperty, Date.now(), options.duration, getEasing(options.easing), resolve);
                })];
        });
    });
}
function scrollIntoView(element, scroller, options) {
    validateElement(element);
    if (scroller && !(scroller instanceof Element)) {
        options = scroller;
        scroller = undefined;
    }
    var _a = sanitizeScrollOptions(options), duration = _a.duration, easing = _a.easing;
    scroller = scroller || utils.getDocument().body;
    var currentContainerScrollYPos = 0;
    var elementScrollYPos = element ? element.offsetTop : 0;
    var document = utils.getDocument();
    // if the container is the document body or document itself, we'll
    // need a different set of coordinates for accuracy
    if (scroller === document.body || scroller === document.documentElement) {
        // using pageYOffset for cross-browser compatibility
        currentContainerScrollYPos = window.pageYOffset;
        // must add containers scroll y position to ensure an absolute value that does not change
        elementScrollYPos =
            element.getBoundingClientRect().top + currentContainerScrollYPos;
    }
    return scrollTo(scroller, {
        top: elementScrollYPos,
        left: 0,
        duration: duration,
        easing: easing
    });
}
function validateElement(element) {
    if (element === undefined) {
        var errorMsg = 'The element passed to scrollIntoView() was undefined.';
        throw new Error(errorMsg);
    }
    if (!(element instanceof HTMLElement)) {
        throw new Error("The element passed to scrollIntoView() must be a valid element. You passed " + element + ".");
    }
}
function getScrollPropertyByElement(el) {
    var props = {
        window: {
            y: 'scrollY',
            x: 'scrollX'
        },
        element: {
            y: 'scrollTop',
            x: 'scrollLeft'
        }
    };
    var axis = 'y';
    if (el instanceof Window) {
        return props.window[axis];
    }
    else {
        return props.element[axis];
    }
}
function sanitizeScrollOptions(options) {
    if (options === void 0) { options = {}; }
    if (options.behavior === 'smooth') {
        options.easing = 'ease-in-out';
        options.duration = 300;
    }
    if (options.behavior === 'auto') {
        options.duration = 0;
        options.easing = 'linear';
    }
    return options;
}
function getScrollPosition(el) {
    var document = utils.getDocument();
    if (el === document.body ||
        el === document.documentElement ||
        el instanceof Window) {
        return document.body.scrollTop || document.documentElement.scrollTop;
    }
    else {
        return el.scrollTop;
    }
}
function setScrollPosition(el, value) {
    var document = utils.getDocument();
    if (el === document.body ||
        el === document.documentElement ||
        el instanceof Window) {
        document.body.scrollTop = value;
        document.documentElement.scrollTop = value;
    }
    else {
        el.scrollTop = value;
    }
}
var utils = {
    // we're really just exporting this so that tests can mock the document.documentElement
    getDocument: function () {
        return document;
    }
};
var easingMap = {
    linear: function (t) {
        return t;
    },
    'ease-in': function (t) {
        return t * t;
    },
    'ease-out': function (t) {
        return t * (2 - t);
    },
    'ease-in-out': function (t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
};
var getEasing = function (easing) {
    var defaultEasing = 'linear';
    var easeFunc = easingMap[easing || defaultEasing];
    if (!easeFunc) {
        var options = Object.keys(easingMap).join(',');
        throw new Error("Scroll error: scroller does not support an easing option of \"" + easing + "\". Supported options are " + options);
    }
    return easeFunc;
};

export { scrollTo, scrollIntoView, utils, easingMap };
