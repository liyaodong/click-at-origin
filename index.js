'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clickAtOrigin;

var _mdetect = require('mdetect');

var IS_MOBILE = (0, _mdetect.isMobileUA)();
var eventName = IS_MOBILE ? 'touchstart' : 'click';

var waitListen = [];

document.addEventListener(eventName, function (e) {
  waitListen.forEach(function (x) {
    var dom = x[0];
    if (dom === undefined || !(dom instanceof HTMLElement)) return;
    if (!dom.contains(e.target)) {
      x[1]();
      document.body.style.cursor = 'auto';
    };
  });
});

function cancle(dom) {
  waitListen = waitListen.filter(function (x) {
    return x[0] !== dom;
  });
}

function clickAtOrigin(dom, cb) {
  waitListen.push([dom, cb]);

  return function () {
    return cancle(dom);
  };
}

