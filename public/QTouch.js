;(function(doc, win, undefined) {
    "use strict";

    var start = {
            x: 0,
            y: 0
        },
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

        try {
            event = new Event(type);
        } catch (e) {
            event = doc.createEvent("Event");
            event.initEvent(type, true, true);
        }

        return event;
    }

    function fireEvent(type, target) {
        var event = createEvent(type);

        target.dispatchEvent(event);
    }

    function onTouchStart(event) {
        var touch = event.touches[0];

        event.preventDefault();

        target = event.target;

        start.x = touch.pageX;
        start.y = touch.pageY;

        delta.x = 0;
        delta.y = 0;

        startTime = +new Date();
    }

    function onTouchMove(event) {
        var touch = event.touches[0];

        delta.x = touch.pageX - start.x;
        delta.y = touch.pageY - start.y;
    }

    function onTouchEnd(event) {
        var touch = event.changedTouches[0],
            deltaTime = +new Date() - startTime,
            deltaX = Math.abs(delta.x),
            deltaY = Math.abs(delta.y);


        if (touch.pageX === start.x && touch.pageY === start.y) {
            if (deltaTime < longTime) {
                fireEvent("tap", target);
            } else {
                fireEvent("longTap", target);
            }
        }

        if (deltaX > minDelta || deltaY > minDelta) {

            if (deltaX > deltaY) {
                if (delta.x > 0) {
                    fireEvent("swipeRight", target);
                } else {
                    fireEvent("swipeLeft", target);
                }
            } else {
                if (delta.y > 0) {
                    fireEvent("swipeDown", target);
                } else {
                    fireEvent("swipeUp", target);
                }
            }
        }
    }

    doc.addEventListener("touchstart", onTouchStart);
    doc.addEventListener("touchmove", onTouchMove);
    doc.addEventListener("touchend", onTouchEnd);

}(document, window));