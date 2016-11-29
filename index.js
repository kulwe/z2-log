'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

window.SHOWDEBUG = {
    json: false,
    type: 1 };
var _console = window.console;
var safeJson = function safeJson(json) {
    if (typeof json != 'string') {
        return json;
    }
    try {
        json = JSON.parse(json);
    } catch (ex) {
        console.log('safeJson失败:');
        console.log(json);
    }
    return json;
};
var getLog = function getLog(fn) {
    return function () {
        fn.apply(_console, arguments);
    };
};
var _log = function _log() {
    for (var _len = arguments.length, objs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        objs[_key - 2] = arguments[_key];
    }

    var type = arguments.length <= 0 || arguments[0] === undefined ? 'log' : arguments[0];
    var tip = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

    var enable = window.SHOWDEBUG;
    var fn = getLog(_console[type]);
    if (objs.length < 1) {
        fn(tip);
        return;
    }
    if (enable.json) {
        var _ret = function () {
            var index = 0;
            tip = tip.replace(_log.regJson, function () {
                return safeJson(objs[index]);
            });
            fn(tip);
            return {
                v: void 0
            };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    if (tip.match(_log.regFormatFlag)) {
        fn.apply(undefined, [tip].concat(objs));
        return;
    }
    fn('' + tip);
    _console.log('--------------');
    for (var i = 0, il = objs.length; i < il; i++) {
        fn(objs[i]);
    }
    _console.log('--------------');
};
_log.regFormatFlag = /%[oOdisfc]/g;
_log.regJson = /%j/g;

var log = function log() {
    var enable = window.SHOWDEBUG;
    if (!enable.type || enable.type > 1) return;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    _log.apply(null, ['log'].concat(args));
};
log.warn = function () {
    var enable = window.SHOWDEBUG;
    if (!enable.type || enable.type > 2) return;

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    _log.apply(null, ['warn'].concat(args));
};
log.error = function () {
    var enable = window.SHOWDEBUG;
    if (!enable.type || enable.type > 3) return;

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
    }

    _log.apply(null, ['error'].concat(args));
};

var console = {
    log: log,
    warn: log.warn,
    error: log.error
};
for (var k in _console) {
    if (k == 'log' || k == 'warn' || k == 'error') continue;
    console[k] = _console[k];
}

exports.default = log;
exports.log = log;
exports.console = console;