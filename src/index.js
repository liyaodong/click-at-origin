import { isMobileUA } from 'mdetect';

const IS_MOBILE = isMobileUA();
const eventName = IS_MOBILE ? 'touchstart' : 'click';

let waitListen = [];

document.addEventListener(eventName, e => {
  waitListen.forEach(x => {
    const dom = x[0];
    if (dom === undefined || !(dom instanceof HTMLElement)) return;
    if (!dom.contains(e.target)) {
      x[1]();
      document.body.style.cursor = 'auto';
    };
  });
});

function cancle(dom) {
  waitListen = waitListen.filter(x => x[0] !== dom);
}

export default function clickAtOrigin(dom, cb) {
  waitListen.push([dom, cb]);

  return (() => cancle(dom));
}
