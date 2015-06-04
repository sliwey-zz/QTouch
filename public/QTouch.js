;(function(doc, win, undefined) {
    "use strict";

    var start = {},
        delta = {
            x: 0,
            y: 0
        },
        startTime = 0,
        longTime = 200,
        target,
        minDelta = 50;


    function createEvent(type) {
        var event;
// alert(Object.prototype.toString.call(Event))
        try {
            event = new Event(type);
        } catch (e) {
            // if (e.message.toLowerCase() === "illegal constructor") {
            event = doc.createEvent("Event");
            event.initEvent(type, true, true);
            // }
        }

        return event;
    }

    function fireEvent(type, target) {
        var event = createEvent(type);

        target.dispatchEvent(event);
    }

    function touchStart(event) {
        var touch = event.touches[0];

        event.preventDefault();

        target = event.target;

        start.x = touch.pageX;
        start.y = touch.pageY;

        delta.x = 0;
        delta.y = 0;

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


        if (touch.pageX === start.x && touch.pageY === start.y) {
            if (deltaTime < longTime) {
                // console.log("tap");
                fireEvent("tap", target);
            } else {
                // console.log("longTap");
                fireEvent("longTap", target);
            }
        }

        if (Math.abs(delta.x) > minDelta || Math.abs(delta.y) > minDelta) {

            if (Math.abs(delta.x) > Math.abs(delta.y)) {
                if (delta.x > 0) {
                    // console.log("swipeRight")
                    fireEvent("swipeRight", target);
                } else {
                    // console.log("swipeLeft");
                    fireEvent("swipeLeft", target);
                }
            } else {
                if (delta.y > 0) {
                    // console.log("swipeDown");
                    fireEvent("swipeDown", target);
                } else {
                    // console.log("swipeUp");
                    fireEvent("swipeUp", target);
                }
            }
        }
    }

    doc.addEventListener("touchstart", touchStart);
    doc.addEventListener("touchmove", touchMove);
    doc.addEventListener("touchend", touchEnd);

}(document, window));