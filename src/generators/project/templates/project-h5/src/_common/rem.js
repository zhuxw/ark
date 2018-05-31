(function() {
  var win = window;
  var docElem = document.documentElement;
  var on = 'addEventListener';
  var timeoutId;

  function delaySetRem() {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(setRem, 300);
  }

  function setRem() {
    win.rem = docElem.getBoundingClientRect().width / 10;
    docElem.style.fontSize = win.rem + 'px';
  }

  setRem();
  docElem.setAttribute('data-dpr', win.devicePixelRatio);
  win[on]('resize', delaySetRem);
  win[on]('pageshow', function(e) {
    if (e.persisted) {
      delaySetRem();
    }
  });
})();