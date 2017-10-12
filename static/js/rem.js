function getViewportSize() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
  };
}

(function (doc, win) {
  let docEl = doc.documentElement,
    resizeEvt = 'orientationchange',
    recalc = function () {
      const obj = getViewportSize();
      const clientWidth = obj.width;
      const clientHeight = obj.height;
      if (!clientWidth) return;

      docEl.style.fontSize = `${100 * (clientWidth / 750)}px`;
    };
  // AbortifbrowserdoesnotsupportaddEventListener
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
}(document, window));
