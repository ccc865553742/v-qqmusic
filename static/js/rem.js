/* const _ = {};

_.throttle = function (func, wait, options) {
  let context,
    args,
    result;
  let timeout = null;
  let previous = 0;
  if (!options) options = {};
  const later = function () {
    previous = options.leading === false ? 0 : _.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    const now = _.now();
    if (!previous && options.leading === false) previous = now;
    // 计算剩余时间
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 剩余时间小于等于0或者剩余时间大于等待时间(本地时间变动出现)
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};

function getViewportSize() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  };
}

function resize(doc, win) {
  console.log('aaaaaaaaa');
  let docEl = doc.documentElement,
    resizeEvt = 'orientationchange',
    recalc = function () {
      const obj = getViewportSize();
      let clientWidth = obj.width;
      const clientHeight = obj.height;
      if (!clientWidth) return;
      clientWidth = clientWidth > 640 ? 640 : clientWidth;
      docEl.style.fontSize = `${100 * (clientWidth / 750)}px`;
    };
  // AbortifbrowserdoesnotsupportaddEventListener
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
}

// resize()
window.onresize = _.throttle(resize(document, window), 2000); */
!(function (e) {
  let t = e.document,
    n = t.documentElement,
    i = "orientationchange" in e ? "orientationchange" : "resize",
    a = (function e() {
      var t = n.getBoundingClientRect().width;
      return n.style.fontSize = 5 * Math.max(Math.min(t / 750 * 20, 11.2), 8.55) + "px",
        e
    }());
  n.setAttribute("data-dpr", e.navigator.appVersion.match(/iphone/gi) ? e.devicePixelRatio : 1),
    /iP(hone|od|ad)/.test(e.navigator.userAgent) && (t.documentElement.classList.add("ios"), parseInt(e.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8 && t.documentElement.classList.add("hairline")),
    t.addEventListener && (e.addEventListener(i, a, !1), t.addEventListener("DOMContentLoaded", a, !1));
}(window));

