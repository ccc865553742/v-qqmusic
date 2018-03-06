// eslint-disable-next-line
const ModalHelper = (function (bodyCls) {
  let scrollTop;
  return {
    afterOpen() {
      scrollTop = document.scrollingElement.scrollTop;
      document.body.classList.add(bodyCls);
      document.body.style.top = `${-scrollTop}px`;
    },
    beforeClose() {
      document.body.classList.remove(bodyCls);
      // scrollTop lost after set position:fixed, restore it back.
      document.scrollingElement.scrollTop = scrollTop;
    }
  };
}('modal-open'));

export default ModalHelper;
