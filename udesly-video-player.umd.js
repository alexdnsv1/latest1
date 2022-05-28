! function(a) {
    "function" == typeof define && define.amd ? define(a) : a()
}(function() {
    "use strict";

    function a(a) {
        void 0 === a && (a = 0);
        var b = Math.round(a % 60);
        return Math.floor(a / 60) + ":" + (b + "").padStart(2, "0")
    }

    function b(a) {
        return ("0" + a.toString(16)).substr(-2)
    }
    var c = function() {
        function c(c, e) {
            var f, g = this;
            this.id = (f = new Uint8Array(10), window.crypto.getRandomValues(f), Array.from(f, b).join("")), this._playing = !1, this._muted = !1;
            var h = e.split(","),
                i = c.querySelector("video");
            this.videoWrapper = i.closest(".w-background-video"), c.style.display = "none";
            var j = i.cloneNode(!0),
                d = !0;
            if (j.querySelectorAll("source").length) j.querySelectorAll("source").forEach(function(a) {
                a.removeAttribute("src"), d ? a.setAttribute("src", h[0]) : 1 == h.length ? a.remove() : a.setAttribute("src", h[1]), d = !1
            });
            else {
                var k = document.createElement("SOURCE");
                j.appendChild(k), j.querySelectorAll("source").forEach(function(a) {
                    a.removeAttribute("src"), d ? a.setAttribute("src", h[0]) : 1 == h.length ? a.remove() : a.setAttribute("src", h[1]), d = !1
                })
            }
            i.remove(), .setAttribute("muted"), .setAttribute("autoplay"), .setAttribute("loop"), .setAttribute("playsinline"), .setAttribute("data-wf-ignore"), this.injectStyle(c), this.videoWrapper.appendChild(j), this.video = j, this.video.onplaying = function() {
                return g.changePlayStatus()
            }, this.video.muted = !1, this.video.loop = !1, this.video.onended = function() {
                return g.handleEnd()
            }, this.video.onvolumechange = function() {
                return g.onVolumeChange()
            }, this.video.ondurationchange = function() {
                return g.handleDurationChange()
            }, this.video.ontimeupdate = function() {
                g.refreshCurrentTime(), g.refreshSeek()
            }, this.volumeSet(+c.getAttribute("volume")), "true" == c.getAttribute("mute") ? (this.muted = !0, this.video.muted = this.muted) : (this.muted = !1, this.video.muted = this.muted), c.querySelectorAll("[player]").forEach(function(a) {
                switch (a.getAttribute("player")) {
                    case "play":
                        a.addEventListener("click", function() {
                            return g.handlePlay()
                        });
                        break;
                    case "pause":
                        a.addEventListener("click", function() {
                            return g.handlePause()
                        });
                        break;
                    case "loop":
                        a.addEventListener("click", function() {
                            return g.toggleLoop()
                        });
                        break;
                    case "volume-up":
                        a.addEventListener("click", function() {
                            return g.handleVolumeChange(!0)
                        });
                        break;
                    case "volume-down":
                        a.addEventListener("click", function() {
                            return g.handleVolumeChange(!1)
                        });
                        break;
                    case "full-screen":
                        a.addEventListener("click", function() {
                            return g.requestFullscreen()
                        });
                        break;
                    case "restart":
                        a.addEventListener("click", function() {
                            return g.handleRestart()
                        });
                        break;
                    case "seek-bar":
                        a.addEventListener("click", function(a) {
                            return g.onClickSeek(a)
                        });
                        break;
                    case "volume-bar":
                        a.addEventListener("click", function(a) {
                            return g.onClickVolume(a)
                        });
                        break;
                    case "seek-active":
                        g.seekElement = a, g.seekElement.style.width = "0px";
                        break;
                    case "seek-value":
                        g.currentTimeElement = a, g.currentTimeElement.textContent = g.currentTime;
                        break;
                    case "volume-active":
                        g.volumeElement = a, g.volumeElement.style.width = g.volume + "%";
                        break;
                    case "duration":
                        g.durationElement = a;
                        break;
                    case "volume-mute":
                        a.addEventListener("click", function() {
                            return g.handleMute()
                        });
                }
            }), c.style.display = ""
        }
        return c.prototype.injectStyle = function(a) {
            a.setAttribute("udy-video-player", this.id);
            var b = document.createElement("style");
            b.textContent = "[udy-video-player=\"" + this.id + "\"] [show-if] {display: none}\n    body.video-" + this.id + "-playing [udy-video-player=\"" + this.id + "\"] [hide-if=playing], body.video-" + this.id + "-muted [udy-video-player=\"" + this.id + "\"] [hide-if=muted], body.video-" + this.id + "-loop [udy-video-player=\"" + this.id + "\"] [hide-if=loop] {\n      display: none;\n    }\n    body.video-" + this.id + "-playing [udy-video-player=\"" + this.id + "\"] [show-if=playing], body.video-" + this.id + "-muted [udy-video-player=\"" + this.id + "\"] [show-if=muted], body.video-" + this.id + "-loop [udy-video-player=\"" + this.id + "\"] [show-if=loop] {\n      display: inherit;\n    }\n    ", document.head.appendChild(b)
        }, Object.defineProperty(c.prototype, "currentTime", {
            get: function() {
                return a(this.video.currentTime)
            },
            enumerable: !0,
            configurable: !0
        }), c.prototype.changePlayStatus = function() {
            this.playing = !0
        }, Object.defineProperty(c.prototype, "playing", {
            get: function() {
                return this._playing
            },
            set: function(a) {
                this._playing = a, this.playing ? document.body.classList.add("video-" + this.id + "-playing") : document.body.classList.remove("video-" + this.id + "-playing")
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(c.prototype, "volume", {
            get: function() {
                return Math.round(100 * this.video.volume)
            },
            set: function(a) {
                this.video.volume = a
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(c.prototype, "muted", {
            get: function() {
                return this._muted
            },
            set: function(a) {
                this._muted = a, this.muted ? document.body.classList.add("video-" + this.id + "-muted") : document.body.classList.remove("video-" + this.id + "-muted")
            },
            enumerable: !0,
            configurable: !0
        }), c.prototype.handlePlay = function() {
            this.video.play(), this.playing = !0
        }, c.prototype.onVolumeChange = function() {
            var a = this;
            this.volumeElement && requestAnimationFrame(function() {
                return a.changeVolumeBar()
            })
        }, c.prototype.handleMute = function() {
            this.video.muted = !this.video.muted, this.muted = this.video.muted, 0 == this.video.volume && this.handleVolumeChange(!0)
        }, c.prototype.handleDurationChange = function() {
            this.durationElement && (this.durationElement.textContent = a(this.video.duration))
        }, c.prototype.changeVolumeBar = function() {
            this.volumeElement && (this.volumeElement.style.width = this.volume + "%")
        }, c.prototype.refreshSeek = function() {
            var a = this;
            this.seekElement && requestAnimationFrame(function() {
                return a._refreshSeek()
            })
        }, c.prototype._refreshSeek = function() {
            var a = this;
            this.seekElement && (this.seekElement.style.width = this.currentSeekPercentage + "%", requestAnimationFrame(function() {
                return a.refreshSeek()
            }))
        }, c.prototype.refreshCurrentTime = function() {
            var a = this;
            this.currentTimeElement && requestAnimationFrame(function() {
                return a._refreshCurrentTime()
            })
        }, c.prototype._refreshCurrentTime = function() {
            var a = this;
            this.currentTimeElement && (this.currentTimeElement.textContent = this.currentTime, requestAnimationFrame(function() {
                return a.refreshCurrentTime()
            }))
        }, Object.defineProperty(c.prototype, "currentSeekPercentage", {
            get: function() {
                return 100 * (this.video.currentTime / this.video.duration)
            },
            enumerable: !0,
            configurable: !0
        }), c.prototype.handleEnd = function() {
            this.playing = !1, this.video.currentTime = 0
        }, c.prototype.handlePause = function() {
            this.video.pause(), this.playing = !1
        }, c.prototype.handleRestart = function() {
            this.video.currentTime = 0, this.handlePlay()
        }, c.prototype.toggleLoop = function() {
            this.video.loop = !this.video.loop, this.video.loop ? document.body.classList.add("video-" + this.id + "-loop") : document.body.classList.remove("video-" + this.id + "-loop")
        }, c.prototype.handleVolumeChange = function(a, b) {
            void 0 === b && (b = .1);
            var c = this.video.volume;
            if (a) {
                var d = c + b;
                this.muted && this.handleMute(), this.video.volume = 1 <= d ? 1 : d
            } else d = c - b, this.muted && this.handleMute(), this.video.volume = 0 <= d ? d : 0, 0 == this.video.volume && (this.video.muted = !0, this.muted = !0)
        }, c.prototype.volumeSet = function(a) {
            this.video.volume = a
        }, c.prototype.requestFullscreen = function() {
            var isFullScreen = function() {
                return !!(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
             }
             if (isFullScreen()) {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
                else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
                else if (document.msExitFullscreen) document.msExitFullscreen();
             }
             else {
                if (this.video.requestFullscreen) this.video.requestFullscreen();
                else if (this.video.mozRequestFullScreen) this.video.mozRequestFullScreen();
                else if (this.video.webkitRequestFullScreen) this.video.webkitRequestFullScreen();
                else if (this.video.msRequestFullscreen) this.video.msRequestFullscreen();
             }
        }, c.prototype.onClickSeek = function(a) {
            var b = (a = a || window.event).target;
            a.preventDefault();
            var c = a.clientX,
                d = b.closest("[player=\"seek-bar\"]").getBoundingClientRect().width,
                f = (c -= b.getBoundingClientRect().left) * (100 / d);
            f = 100 <= f ? 100 : f, this.changeSeek(f)
        }, c.prototype.onClickVolume = function(a) {
            var b = (a = a || window.event).target;
            a.preventDefault();
            var c = a.clientX,
                d = b.closest("[player=\"volume-bar\"]").getBoundingClientRect().width,
                f = (c -= b.getBoundingClientRect().left) * (1 / d);
            f = 1 <= f ? 1 : f, this.volumeSet(f)
        }, c.prototype.changeSeek = function(a) {
            var b = this.video.duration / 100 * a;
            this.video.currentTime = b
        }, c
    }();
    document.querySelectorAll("[udesly-video-player]").forEach(function(a) {
        var b = a.getAttribute("udesly-video-player");
        a._vueEl = new c(a, b)
    })
});
