var swipeEvent = function() {
    return this.initialize();
};
swipeEvent.prototype = {
    mouseEvents : [
        'mousedown',
        'mouseup',
    ],
    touchEvents : [
        'touchend',
        'touchstart'
    ],
    moveEvents : [
        'mousemove',
        'touchmove'
    ],
    resetMoment : function() {
        return {
            baseX: 0,
            baseY: 0,
            x: 0,
            y: 0,
            p: 0,
            t: []
        };
    },
    checkAround : function(n, around) {
        if (n < around && (around * -1) < n) {
            return true;
        }
        return false;
    },
    moment : null,
    isDrag : false,
    events : null,
    context : null,
    initialize : function(context) {
        if (!context) {
            this.context = document;
        } else {
            this.context = context;
        }

        this.moment = this.resetMoment();
        this.isDrag = false;
        this.events = this.mouseEvents.slice().concat(this.touchEvents.slice(), this.moveEvents.slice());

        this.context.addEventListener('click', function(e) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        });

        this.events.map(function(eventType) {
            this.context.addEventListener(eventType, this.handler.bind(this), {
                'passive' : false
            });
        }.bind(this));
    },
    makeEvent : function(eventName, options) {
        var customEvent = new CustomEvent(eventName, options);
        return customEvent;
    },
    handler : function(event) {
        event.preventDefault();
        event.stopPropagation();
        if (0 <= this.events.indexOf(event.type)) {
            if (event.type == 'mousedown' || event.type == 'touchstart') {
                this.isDrag = true;
                this.moment.baseX = event.pageX;
                this.moment.baseY = event.pageY;
            } else if (event.type == 'mouseup' || event.type == 'touchend') {
                this.isDrag = false;
                var lastStopMoment = (event.timeStamp - this.moment.p) / 100;
                if (0.02 < lastStopMoment) {
                    if (!(this.checkAround(this.moment.x, 10) && this.checkAround(this.moment.y, 10))) {
                        var dragEvent = this.makeEvent('drag', {
                            detail : this.moment
                        })
                        this.context.dispatchEvent(dragEvent);
                    }
                } else {
                    var swipeEvent = this.makeEvent('swipe', {
                        detail : this.moment
                    })
                    this.context.dispatchEvent(swipeEvent);
                }
                this.moment = this.resetMoment();
            } else if (event.type == 'mousemove' || event.type == 'touchmove') {
                if (this.isDrag) {
                    this.moment.x = event.pageX - this.moment.baseX;
                    this.moment.y = this.moment.baseY - event.pageY;
                    if (this.moment.p) {
                        this.moment.t.push(event.timeStamp - this.moment.p);
                    }
                    this.moment.p =event.timeStamp;
                }
            }
        }
        return false;
    }
};
