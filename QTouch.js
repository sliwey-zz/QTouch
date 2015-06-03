;(function(doc, win, undefined) {
    "use strict";

    var start = {},
        delta = {},
        startTime = 0,
        longTime = 800;

    function touchStart(event) {
        var touch = event.touches[0];

        start.x = touch.pageX;
        start.y = touch.pageY;

        startTime = +new Date();
    }

    function touchMove(event) {
        var touch = event.touches[0];

        delta.x = touch.pageX - start.x;
        delta.y = touch.pageY - start.y;
    }

    function touchEnd(event) {
        var touch = event.changedTouches[0],
            deltaTime = +new Date() - startTime;

        delta.x = touch.pageX - start.x;
        delta.y = touch.pageY - start.y;

        if (touch.pageX === start.x && touch.pageY === start.y) {
            if (deltaTime < longTime) {
                console.log("tap");
            } else {
                console.log("longTap");
            }
        }
    }


    document.addEventListener("touchstart", touchStart);
    document.addEventListener("touchmove", touchMove);
    document.addEventListener("touchend", touchEnd);

}(document, window));