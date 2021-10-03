// 首页布局引用rem
(function (docs, win) {
    var docEls = docs.documentElement,
    resizeEvts = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalcs = function () {
        //getBoundingClientRect()这个方法返回一个矩形对象 
        window.rem = docEls.getBoundingClientRect().width / 1920 * 100
        docEls.style.fontSize = window.rem + 'px'
    }
    recalcs()
    if (!docs.addEventListener) return;
    win.addEventListener(resizeEvts, recalcs, false)}
)(document, window)
