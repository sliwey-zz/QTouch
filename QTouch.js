;(function(doc, win, undefined) {
    "use strict";

    var start = {},
        delta = {},
        startTime = 0,
        longTime = 200,
        target;


    function fireEvent(type, target) {
        var event = new CustomEvent(type, {});

        target.dispatchEvent(event)
    }

    function touchStart(event) {
        var touch = event.touches[0];

        target = event.target;

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
                // console.log("tap");
                fireEvent("tap", target);
            } else {
                // console.log("longTap");
                fireEvent("longTap", target);
            }
        }
    }

    document.addEventListener("touchstart", touchStart);
    document.addEventListener("touchmove", touchMove);
    document.addEventListener("touchend", touchEnd);

}(document, window));