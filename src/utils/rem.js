// (function (doc, win) {
//     var docEl = doc.documentElement,
//       resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//       recalc = function () {
//         var clientWidth = docEl.clientWidth;
//         if (!clientWidth) return;
//           docEl.style.fontSize = 1000 * (clientWidth / 1920) + 'px'; 
//         };
//         if (!doc.addEventListener) return;
//         win.addEventListener(resizeEvt, recalc, false);
//         doc.addEventListener('DOMContentLoaded', recalc, false);
//       })(document, window);
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      if (clientWidth < 1024) {
        docEl.style.fontSize = 100 * (1024 / 1920) + 'px';
      } else {
        docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
