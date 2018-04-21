/*eslint-disable*/
import * as $ from 'jQuery'

var channel_code = "",
  user_id = "",
  room_id = "",
  token = "",
  roomList = null,
  player = null,
  target_room = null,
  play_id = null,
  eventCallback = null,
  ws_connect = null,
  currentView = 0,
  eventHandler = null,
  APP_NAME = "cootek.coindozer.h5.public",
  APP_VER = "1",
  GENERAL_ACCESS_URL = "http://wawaji.cootekservice.com",
  ACCESS_URL = "http://coindozer.cootekservice.com",
  ROOM_STATUS_READY = 0,
  ROOM_STATUS_PLAYING = 1,
  ROOM_MAINTENANCE = 2,
  seq_num = 0;

function activate(t, e) {
  var i = 0;
  return $.ajax({
    url: GENERAL_ACCESS_URL + "/doll_oem/user/activate",
    type: "post",
    dataType: "json",
    async: !1,
    data: JSON.stringify({
      app_name: APP_NAME,
      app_version: APP_VER,
      channel_code: t,
      activate_type: "new",
      identifier: t + "_" + e
    }),
    success: function(t) {
      2e3 == t.result_code && 0 == t.result.error_code || (console.log(JSON.stringify(t)), i = -3), null != t.result.user_id && (user_id = t.result.user_id), null != t.result.token && (token = t.result.token), i = 0
    },
    fail: function(t) {
      console.log(JSON.stringify(t)), i = -2
    }
  }), i
}

function initialize(t, e, i) {
  return "" == t || "" == e ? (console.log("please check your parameter"), null) : ($.ajax({
    url: GENERAL_ACCESS_URL + "/doll/management/get_channel_code",
    type: "POST",
    dataType: "json",
    async: !1,
    data: JSON.stringify({
      app_id: t,
      app_secret: e
    }),
    success: function(t) {
      if (console.log(JSON.stringify(t)), null == t || null == t.channel_code) return null;
      null != t.channel_code && (channel_code = t.channel_code);
      if (0 != activate(channel_code, i)) return console.log("activate failed"), null;
      i = user_id
    },
    fail: function(t) {
      return console.log(JSON.stringify(t)), null
    }
  }), token)
}

function getRoomList(t) {
  if (null == t || "" == t) return console.log("Invalid parameter"), null;
  var e = $.now(),
    i = null;
  return $.ajax({
    url: ACCESS_URL + "/dozer/rooms?_token=" + t + "&_ts=" + e + "&_v=1",
    type: "get",
    async: !1,
    success: function(t) {
      2e3 != t.result_code && (console.log(JSON.stringify(t)), i = null), roomList = t.result, i = roomList
    },
    fail: function(t) {
      console.log(JSON.stringify(t)), i = null
    }
  }), i
}

function joinRoom(t, e, s, r) {
  if (null == t || null == s || null == e || null == r || "" == t || "" == s || "" == e) return console.log("please check your parameter"), -1;
  if (room_id = parseInt(t), token = e, null == (roomList = getRoomList(token)) || 0 == roomList.length) return console.log("please get room list first"), -1;
  for (var i = 0; i < roomList.length; i++)
    if (roomList[i].room_id == room_id) {
      target_room = roomList[i];
      break
    }
  if (i == roomList.length) return console.log("the room id is wrong"), -2;
  try {
    eventHandler = r;
    var o = target_room.pull_url,
      n = target_room.pull_url;
    player = new CKPlayer.Player(o, n, {
      canvas: s
    }), (ws_connect = new WebSocket(target_room.ws_server_url + "/ws/websocket?no=" + target_room.room_id)).onmessage = function(t) {
      "coin_add" == JSON.parse(t.data).type ? (gotCoin = JSON.parse(t.data).coin_delta, eventHandler.prototype.onEarnedCoin(gotCoin)) : JSON.parse(t.data).type
      console.log('ws_connect', t)
    }
  } catch (t) {
    return console.log(t), -3
  }
}

function quitRoom() {
  if (null == token || "" == token) return console.log("invalid token"), -1;
  if (null == target_room.room_id || "" == target_room.room_id) return console.log("invalid room id, please check"), -1;
  if (null == play_id || "" == play_id) return console.log("invalid play_id"), -1;
  var t = $.now();
  $.ajax({
    url: ACCESS_URL + "/dozer/leave?_token=" + token + "&_ts=" + t + "&_v=1",
    type: "post",
    async: !1,
    dataType: "json",
    data: JSON.stringify({
      room_id: parseInt(target_room.room_id),
      leave_type: 2,
      play_id: play_id
    }),
    success: function(t) {
      2e3 == t.result_code ? console.log("leave room successfully") : console.log("leave room failed")
    },
    fail: function(t) {
      console.log("leave room failed")
    }
  }), null != ws_connect ? ws_connect.close() : console.log("not in the room now")
}

function dropCoin(callback) {
  seq_num += 1;
  var bev = {
    sequence: seq_num,
    action: "put"
  };
  var t = {
    type: "play",
    play_id: play_id,
    action: bev
  };
  try {
    ws_connect.send(JSON.stringify(t))
    callback && callback(true)
  } catch (t) {
    callback && callback(false)
    return console.log(e), -2
  }
}

function startPlay() {
  if (null == token || "" == token) return console.log("invalid token"), -1;
  if (null == target_room.room_id || "" == target_room.room_id) return console.log("invalid room id, please check"), -1;
  if (null == eventHandler) return console.log("EventHandler is null"), -1;
  var t = $.now();
  $.ajax({
    url: ACCESS_URL + "/dozer/apply?_token=" + token + "&_ts=" + t + "&_v=1",
    type: "post",
    dataType: "json",
    data: JSON.stringify({
      room_id: parseInt(target_room.room_id)
    }),
    success: function(t) {
      2e3 == t.result_code ? (eventHandler.prototype.onPlaySucceed(t), play_id = t.result.play_id, console.log("play_id = ", JSON.stringify(t.result))) : eventHandler.prototype.onPlayFailed(t)
    },
    fail: function(t) {
      eventHandler.prototype.onPlayFailed(t)
    }
  })
}
var CKPlayer = {
  Player: null,
  VideoElement: null,
  BitBuffer: null,
  Source: {},
  Demuxer: {},
  Decoder: {},
  Renderer: {},
  AudioOutput: {},
  Now: function() {
    return window.performance ? window.performance.now() / 1e3 : Date.now() / 1e3
  },
  CreateVideoElements: function() {
    for (var t = document.querySelectorAll(".jsmpeg"), e = 0; e < t.length; e++) new CKPlayer.VideoElement(t[e])
  },
  Fill: function(t, e) {
    if (t.fill) t.fill(e);
    else
      for (var i = 0; i < t.length; i++) t[i] = e
  }
};
"complete" === document.readyState ? CKPlayer.CreateVideoElements() : document.addEventListener("DOMContentLoaded", CKPlayer.CreateVideoElements), CKPlayer.VideoElement = function() {
  "use strict";
  var t = function(e) {
    var i = e.dataset.url;
    if (!i) throw "VideoElement has no `data-url` attribute";
    var s = function(t, e) {
      for (var i in e) t.style[i] = e[i]
    };
    this.container = e, s(this.container, {
      display: "inline-block",
      position: "relative",
      minWidth: "80px",
      minHeight: "80px"
    }), this.canvas = document.createElement("canvas"), this.canvas.width = 960, this.canvas.height = 540, s(this.canvas, {
      display: "block",
      width: "100%"
    }), this.container.appendChild(this.canvas), this.playButton = document.createElement("div"), this.playButton.innerHTML = t.PLAY_BUTTON, s(this.playButton, {
      zIndex: 2,
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      maxWidth: "75px",
      maxHeight: "75px",
      margin: "auto",
      opacity: "0.7",
      cursor: "pointer"
    }), this.container.appendChild(this.playButton);
    var r = {
      canvas: this.canvas
    };
    for (var o in e.dataset) try {
      r[o] = JSON.parse(e.dataset[o])
    } catch (t) {
      r[o] = e.dataset[o]
    }
    if (this.player = new CKPlayer.Player(i, r), e.playerInstance = this.player, !r.poster || r.autoplay || this.player.options.streaming || (r.decodeFirstFrame = !1, this.poster = new Image, this.poster.src = r.poster, this.poster.addEventListener("load", this.posterLoaded), s(this.poster, {
        display: "block",
        zIndex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }), this.container.appendChild(this.poster)), this.player.options.streaming || this.container.addEventListener("click", this.onClick.bind(this)), (r.autoplay || this.player.options.streaming) && (this.playButton.style.display = "none"), this.player.audioOut && !this.player.audioOut.unlocked) {
      var n = this.container;
      (r.autoplay || this.player.options.streaming) && (this.unmuteButton = document.createElement("div"), this.unmuteButton.innerHTML = t.UNMUTE_BUTTON, s(this.unmuteButton, {
        zIndex: 2,
        position: "absolute",
        bottom: "10px",
        right: "20px",
        width: "75px",
        height: "75px",
        margin: "auto",
        opacity: "0.7",
        cursor: "pointer"
      }), this.container.appendChild(this.unmuteButton), n = this.unmuteButton), this.unlockAudioBound = this.onUnlockAudio.bind(this, n), n.addEventListener("touchstart", this.unlockAudioBound, !1), n.addEventListener("click", this.unlockAudioBound, !0)
    }
  };
  return t.prototype.onUnlockAudio = function(t, e) {
    this.unmuteButton && (e.preventDefault(), e.stopPropagation()), this.player.audioOut.unlock(function() {
      this.unmuteButton && (this.unmuteButton.style.display = "none"), t.removeEventListener("touchstart", this.unlockAudioBound), t.removeEventListener("click", this.unlockAudioBound)
    }.bind(this))
  }, t.prototype.onClick = function(t) {
    this.player.isPlaying ? (this.player.pause(), this.playButton.style.display = "block") : (this.player.play(), this.playButton.style.display = "none", this.poster && (this.poster.style.display = "none"))
  }, t.PLAY_BUTTON = '<svg style="max-width: 75px; max-height: 75px;" viewBox="0 0 200 200" alt="Play video"><circle cx="100" cy="100" r="90" fill="none" stroke-width="15" stroke="#fff"/><polygon points="70, 55 70, 145 145, 100" fill="#fff"/></svg>', t.UNMUTE_BUTTON = '<svg style="max-width: 75px; max-height: 75px;" viewBox="0 0 75 75"><polygon class="audio-speaker" stroke="none" fill="#fff" points="39,13 22,28 6,28 6,47 21,47 39,62 39,13"/><g stroke="#fff" stroke-width="5"><path d="M 49,50 69,26"/><path d="M 69,50 49,26"/></g></svg>', t
}(), CKPlayer.Player = function() {
  "use strict";
  var t = function(t, e, i) {
    this.options = i || {}, i.source ? (this.source = new i.source(t, i), i.streaming = !!this.source.streaming) : t.match(/^wss?:\/\//) && e.match(/^wss?:\/\//) ? (this.source = new CKPlayer.Source.WebSocket(t, i), this.source2 = new CKPlayer.Source.WebSocket(e, i), i.streaming = !0) : !1 !== i.progressive ? (this.source = new CKPlayer.Source.AjaxProgressive(t, i), i.streaming = !1) : (this.source = new CKPlayer.Source.Ajax(t, i), i.streaming = !1), this.maxAudioLag = i.maxAudioLag || .25, this.loop = !1 !== i.loop, this.autoplay = !!i.autoplay || i.streaming, this.demuxer = new CKPlayer.Demuxer.TS(i), this.source.connect(this.demuxer), !1 !== i.video && (this.video = new CKPlayer.Decoder.MPEG1Video(i), this.renderer = !i.disableGl && CKPlayer.Renderer.WebGL.IsSupported() ? new CKPlayer.Renderer.WebGL(i) : new CKPlayer.Renderer.Canvas2D(i), this.demuxer.connect(CKPlayer.Demuxer.TS.STREAM.VIDEO_1, this.video), this.video.connect(this.renderer)), !1 !== i.audio && CKPlayer.AudioOutput.WebAudio.IsSupported() && (this.audio = new CKPlayer.Decoder.MP2Audio(i), this.audioOut = new CKPlayer.AudioOutput.WebAudio(i), this.demuxer.connect(CKPlayer.Demuxer.TS.STREAM.AUDIO_1, this.audio), this.audio.connect(this.audioOut)), Object.defineProperty(this, "currentTime", {
      get: this.getCurrentTime,
      set: this.setCurrentTime
    }), Object.defineProperty(this, "volume", {
      get: this.getVolume,
      set: this.setVolume
    }), this.unpauseOnShow = !1, !1 !== i.pauseWhenHidden && document.addEventListener("visibilitychange", this.showHide.bind(this)), this.source.start(), this.source2.start(), this.autoplay && this.play()
  };
  return t.prototype.changeCamera = function() {
    null == this.source2.destination ? (this.source.disconnect(), this.source2.connect(this.demuxer)) : null == this.source.destination && (this.source2.disconnect(), this.source.connect(this.demuxer))
  }, t.prototype.showHide = function(t) {
    "hidden" === document.visibilityState ? (this.unpauseOnShow = this.wantsToPlay, this.pause()) : this.unpauseOnShow && this.play()
  }, t.prototype.play = function(t) {
    this.animationId = requestAnimationFrame(this.update.bind(this)), this.wantsToPlay = !0
  }, t.prototype.pause = function(t) {
    cancelAnimationFrame(this.animationId), this.wantsToPlay = !1, this.isPlaying = !1, this.audio && this.audio.canPlay && (this.audioOut.stop(), this.seek(this.currentTime))
  }, t.prototype.getVolume = function() {
    return this.audioOut ? this.audioOut.volume : 0
  }, t.prototype.setVolume = function(t) {
    this.audioOut && (this.audioOut.volume = t)
  }, t.prototype.stop = function(t) {
    this.pause(), this.seek(0), this.video && !1 !== this.options.decodeFirstFrame && this.video.decode()
  }, t.prototype.destroy = function() {
    this.pause(), this.source.destroy(), this.renderer.destroy(), this.audioOut.destroy()
  }, t.prototype.seek = function(t) {
    var e = this.audio && this.audio.canPlay ? this.audio.startTime : this.video.startTime;
    this.video && this.video.seek(t + e), this.audio && this.audio.seek(t + e), this.startTime = CKPlayer.Now() - t
  }, t.prototype.getCurrentTime = function() {
    return this.audio && this.audio.canPlay ? this.audio.currentTime - this.audio.startTime : this.video.currentTime - this.video.startTime
  }, t.prototype.setCurrentTime = function(t) {
    this.seek(t)
  }, t.prototype.update = function() {
    this.animationId = requestAnimationFrame(this.update.bind(this)), this.source.established ? (this.isPlaying || (this.isPlaying = !0, this.startTime = CKPlayer.Now() - this.currentTime), this.options.streaming ? this.updateForStreaming() : this.updateForStaticFile()) : this.renderer && this.renderer.renderProgress(this.source.progress)
  }, t.prototype.updateForStreaming = function() {
    if (this.video && this.video.decode(), this.audio) {
      var t = !1;
      do {
        this.audioOut.enqueuedTime > this.maxAudioLag && (this.audioOut.resetEnqueuedTime(), this.audioOut.enabled = !1), t = this.audio.decode()
      } while (t);
      this.audioOut.enabled = !0
    }
  }, t.prototype.updateForStaticFile = function() {
    var t = !1,
      e = 0;
    if (this.audio && this.audio.canPlay) {
      for (; !t && this.audio.decodedTime - this.audio.currentTime < .25;) t = !this.audio.decode();
      this.video && this.video.currentTime < this.audio.currentTime && (t = !this.video.decode()), e = this.demuxer.currentTime - this.audio.currentTime
    } else if (this.video) {
      var i = CKPlayer.Now() - this.startTime + this.video.startTime,
        s = i - this.video.currentTime,
        r = 1 / this.video.frameRate;
      this.video && s > 0 && (s > 2 * r && (this.startTime += s), t = !this.video.decode()), e = this.demuxer.currentTime - i
    }
    this.source.resume(e), t && this.source.completed && (this.loop ? this.seek(0) : this.pause())
  }, t
}(), CKPlayer.BitBuffer = function() {
  "use strict";
  var t = function(e, i) {
    "object" == typeof e ? (this.bytes = e instanceof Uint8Array ? e : new Uint8Array(e), this.byteLength = this.bytes.length) : (this.bytes = new Uint8Array(e || 1048576), this.byteLength = 0), this.mode = i || t.MODE.EXPAND, this.index = 0
  };
  return t.prototype.resize = function(t) {
    var e = new Uint8Array(t);
    0 !== this.byteLength && (this.byteLength = Math.min(this.byteLength, t), e.set(this.bytes, 0, this.byteLength)), this.bytes = e, this.index = Math.min(this.index, this.byteLength << 3)
  }, t.prototype.evict = function(t) {
    var e = this.index >> 3,
      i = this.bytes.length - this.byteLength;
    if (this.index === this.byteLength << 3 || t > i + e) return this.byteLength = 0, void(this.index = 0);
    0 !== e && (this.bytes.copyWithin ? this.bytes.copyWithin(0, e, this.byteLength) : this.bytes.set(this.bytes.subarray(e, this.byteLength)), this.byteLength = this.byteLength - e, this.index -= e << 3)
  }, t.prototype.write = function(e) {
    var i = "object" == typeof e[0],
      s = 0,
      r = this.bytes.length - this.byteLength;
    if (i) {
      s = 0;
      for (var o = 0; o < e.length; o++) s += e[o].byteLength
    } else s = e.byteLength;
    if (s > r)
      if (this.mode === t.MODE.EXPAND) {
        var n = Math.max(2 * this.bytes.length, s - r);
        this.resize(n)
      } else this.evict(s);
    if (i)
      for (o = 0; o < e.length; o++) this.appendSingleBuffer(e[o]);
    else this.appendSingleBuffer(e)
  }, t.prototype.appendSingleBuffer = function(t) {
    t = t instanceof Uint8Array ? t : new Uint8Array(t), this.bytes.set(t, this.byteLength), this.byteLength += t.length
  }, t.prototype.findNextStartCode = function() {
    for (var t = this.index + 7 >> 3; t < this.byteLength; t++)
      if (0 == this.bytes[t] && 0 == this.bytes[t + 1] && 1 == this.bytes[t + 2]) return this.index = t + 4 << 3, this.bytes[t + 3];
    return this.index = this.byteLength << 3, -1
  }, t.prototype.findStartCode = function(t) {
    for (var e = 0;;)
      if ((e = this.findNextStartCode()) === t || -1 === e) return e;
    return -1
  }, t.prototype.nextBytesAreStartCode = function() {
    var t = this.index + 7 >> 3;
    return t >= this.byteLength || 0 == this.bytes[t] && 0 == this.bytes[t + 1] && 1 == this.bytes[t + 2]
  }, t.prototype.peek = function(t) {
    for (var e = this.index, i = 0; t;) {
      var s = this.bytes[e >> 3],
        r = 8 - (7 & e),
        o = r < t ? r : t,
        n = r - o;
      i = i << o | (s & 255 >> 8 - o << n) >> n, e += o, t -= o
    }
    return i
  }, t.prototype.read = function(t) {
    var e = this.peek(t);
    return this.index += t, e
  }, t.prototype.skip = function(t) {
    return this.index += t
  }, t.prototype.rewind = function(t) {
    this.index = Math.max(this.index - t, 0)
  }, t.prototype.has = function(t) {
    return (this.byteLength << 3) - this.index >= t
  }, t.MODE = {
    EVICT: 1,
    EXPAND: 2
  }, t
}(), CKPlayer.Source.Ajax = function() {
  "use strict";
  var t = function(t, e) {
    this.url = t, this.destination = null, this.request = null, this.completed = !1, this.established = !1, this.progress = 0
  };
  return t.prototype.connect = function(t) {
    this.destination = t
  }, t.prototype.start = function() {
    this.request = new XMLHttpRequest, this.request.onreadystatechange = function() {
      this.request.readyState === this.request.DONE && 200 === this.request.status && this.onLoad(this.request.response)
    }.bind(this), this.request.onprogress = this.onProgress.bind(this), this.request.open("GET", this.url), this.request.responseType = "arraybuffer", this.request.send()
  }, t.prototype.resume = function(t) {}, t.prototype.destroy = function() {
    this.request.abort()
  }, t.prototype.onProgress = function(t) {
    this.progress = t.loaded / t.total
  }, t.prototype.onLoad = function(t) {
    this.established = !0, this.completed = !0, this.progress = 1, this.destination && this.destination.write(t)
  }, t
}(), CKPlayer.Source.AjaxProgressive = function() {
  "use strict";
  var t = function(t, e) {
    this.url = t, this.destination = null, this.request = null, this.completed = !1, this.established = !1, this.progress = 0, this.fileSize = 0, this.loadedSize = 0, this.chunkSize = e.chunkSize || 1048576, this.isLoading = !1, this.loadStartTime = 0, this.throttled = !1 !== e.throttled, this.aborted = !1
  };
  return t.prototype.connect = function(t) {
    this.destination = t
  }, t.prototype.start = function() {
    this.request = new XMLHttpRequest, this.request.onreadystatechange = function() {
      this.request.readyState === this.request.DONE && (this.fileSize = parseInt(this.request.getResponseHeader("Content-Length")), this.loadNextChunk())
    }.bind(this), this.request.onprogress = this.onProgress.bind(this), this.request.open("HEAD", this.url), this.request.send()
  }, t.prototype.resume = function(t) {
    if (!this.isLoading && this.throttled) {
      8 * this.loadTime + 2 > t && this.loadNextChunk()
    }
  }, t.prototype.destroy = function() {
    this.request.abort(), this.aborted = !0
  }, t.prototype.loadNextChunk = function() {
    var t = this.loadedSize,
      e = Math.min(this.loadedSize + this.chunkSize - 1, this.fileSize - 1);
    t >= this.fileSize || this.aborted ? this.completed = !0 : (this.isLoading = !0, this.loadStartTime = JSMpeg.Now(), this.request = new XMLHttpRequest, this.request.onreadystatechange = function() {
      this.request.readyState === this.request.DONE && this.request.status >= 200 && this.request.status < 300 ? this.onChunkLoad(this.request.response) : this.request.readyState === this.request.DONE && this.loadFails++ < 3 && this.loadNextChunk()
    }.bind(this), 0 === t && (this.request.onprogress = this.onProgress.bind(this)), this.request.open("GET", this.url + "?" + t + "-" + e), this.request.setRequestHeader("Range", "bytes=" + t + "-" + e), this.request.responseType = "arraybuffer", this.request.send())
  }, t.prototype.onProgress = function(t) {
    this.progress = t.loaded / t.total
  }, t.prototype.onChunkLoad = function(t) {
    this.established = !0, this.progress = 1, this.loadedSize += t.byteLength, this.loadFails = 0, this.isLoading = !1, this.destination && this.destination.write(t), this.loadTime = JSMpeg.Now() - this.loadStartTime, this.throttled || this.loadNextChunk()
  }, t
}(), CKPlayer.Source.WebSocket = function() {
  "use strict";
  var t = function(t, e) {
    this.url = t, this.options = e, this.socket = null, this.callbacks = {
      connect: [],
      data: []
    }, this.destination = null, this.reconnectInterval = void 0 !== e.reconnectInterval ? e.reconnectInterval : 5, this.shouldAttemptReconnect = !!this.reconnectInterval, this.completed = !1, this.established = !1, this.progress = 0, this.reconnectTimeoutId = 0
  };
  return t.prototype.connect = function(t) {
    this.destination = t
  }, t.prototype.disconnect = function() {
    this.destination = null
  }, t.prototype.destroy = function() {
    clearTimeout(this.reconnectTimeoutId), this.shouldAttemptReconnect = !1, this.socket.close()
  }, t.prototype.start = function() {
    this.shouldAttemptReconnect = !!this.reconnectInterval, this.progress = 0, this.established = !1, this.socket = new WebSocket(this.url, this.options.protocols || null), this.socket.binaryType = "arraybuffer", this.socket.onmessage = this.onMessage.bind(this), this.socket.onopen = this.onOpen.bind(this), this.socket.onerror = this.onClose.bind(this), this.socket.onclose = this.onClose.bind(this)
  }, t.prototype.resume = function(t) {}, t.prototype.onOpen = function() {
    this.progress = 1, this.established = !0
  }, t.prototype.onClose = function() {
    this.shouldAttemptReconnect && (clearTimeout(this.reconnectTimeoutId), this.reconnectTimeoutId = setTimeout(function() {
      this.start()
    }.bind(this), 1e3 * this.reconnectInterval))
  }, t.prototype.onMessage = function(t) {
    // console.log('socketmessage', t)
    this.destination && this.destination.write(t.data)
  }, t
}(), CKPlayer.Demuxer.TS = function() {
  "use strict";
  var t = function(t) {
    this.bits = null, this.leftoverBytes = null, this.guessVideoFrameEnd = !0, this.pidsToStreamIds = {}, this.pesPacketInfo = {}, this.startTime = 0, this.currentTime = 0
  };
  return t.prototype.connect = function(t, e) {
    this.pesPacketInfo[t] = {
      destination: e,
      currentLength: 0,
      totalLength: 0,
      pts: 0,
      buffers: []
    }
  }, t.prototype.write = function(t) {
    if (this.leftoverBytes) {
      var e = t.byteLength + this.leftoverBytes.byteLength;
      this.bits = new CKPlayer.BitBuffer(e), this.bits.write([this.leftoverBytes, t])
    } else this.bits = new CKPlayer.BitBuffer(t);
    for (; this.bits.has(1504) && this.parsePacket(););
    var i = this.bits.byteLength - (this.bits.index >> 3);
    this.leftoverBytes = i > 0 ? this.bits.bytes.subarray(this.bits.index >> 3) : null
  }, t.prototype.parsePacket = function() {
    if (71 !== this.bits.read(8) && !this.resync()) return !1;
    var t = 187 + (this.bits.index >> 3),
      e = (this.bits.read(1), this.bits.read(1)),
      i = (this.bits.read(1), this.bits.read(13)),
      s = (this.bits.read(2), this.bits.read(2)),
      r = (this.bits.read(4), this.pidsToStreamIds[i]);
    if (e && r) {
      (m = this.pesPacketInfo[r]) && m.currentLength && this.packetComplete(m)
    }
    if (1 & s) {
      if (2 & s) {
        var o = this.bits.read(8);
        this.bits.skip(o << 3)
      }
      if (e && this.bits.nextBytesAreStartCode()) {
        this.bits.skip(24), r = this.bits.read(8), this.pidsToStreamIds[i] = r;
        var n = this.bits.read(16);
        this.bits.skip(8);
        var a = this.bits.read(2);
        this.bits.skip(6);
        var h = this.bits.read(8),
          c = this.bits.index + (h << 3);
        if (m = this.pesPacketInfo[r]) {
          var d = 0;
          if (2 & a) {
            this.bits.skip(4);
            var l = this.bits.read(3);
            this.bits.skip(1);
            var u = this.bits.read(15);
            this.bits.skip(1);
            var p = this.bits.read(15);
            this.bits.skip(1), d = (1073741824 * l + 32768 * u + p) / 9e4, this.currentTime = d, -1 === this.startTime && (this.startTime = d)
          }
          var f = n ? n - h - 3 : 0;
          this.packetStart(m, d, f)
        }
        this.bits.index = c
      }
      if (r) {
        var m;
        if (m = this.pesPacketInfo[r]) {
          var y = this.bits.index >> 3,
            b = this.packetAddData(m, y, t),
            T = !e && 2 & s;
          (b || this.guessVideoFrameEnd && T) && this.packetComplete(m)
        }
      }
    }
    return this.bits.index = t << 3, !0
  }, t.prototype.resync = function() {
    if (!this.bits.has(9024)) return !1;
    for (var t = this.bits.index >> 3, e = 0; e < 187; e++)
      if (71 === this.bits.bytes[t + e]) {
        for (var i = !0, s = 1; s < 5; s++)
          if (71 !== this.bits.bytes[t + e + 188 * s]) {
            i = !1;
            break
          }
        if (i) return this.bits.index = t + e + 1 << 3, !0
      }
    return console.warn("CKPlayer: Possible garbage data. Skipping."), this.bits.skip(1496), !1
  }, t.prototype.packetStart = function(t, e, i) {
    t.totalLength = i, t.currentLength = 0, t.pts = e
  }, t.prototype.packetAddData = function(t, e, i) {
    t.buffers.push(this.bits.bytes.subarray(e, i)), t.currentLength += i - e;
    return 0 !== t.totalLength && t.currentLength >= t.totalLength
  }, t.prototype.packetComplete = function(t) {
    t.destination.write(t.pts, t.buffers), t.totalLength = 0, t.currentLength = 0, t.buffers = []
  }, t.STREAM = {
    PACK_HEADER: 186,
    SYSTEM_HEADER: 187,
    PROGRAM_MAP: 188,
    PRIVATE_1: 189,
    PADDING: 190,
    PRIVATE_2: 191,
    AUDIO_1: 192,
    VIDEO_1: 224,
    DIRECTORY: 255
  }, t
}(), CKPlayer.Decoder.Base = function() {
  "use strict";
  var t = function(t) {
    this.destination = null, this.canPlay = !1, this.collectTimestamps = !t.streaming, this.timestamps = [], this.timestampIndex = 0, this.startTime = 0, this.decodedTime = 0, Object.defineProperty(this, "currentTime", {
      get: this.getCurrentTime
    })
  };
  return t.prototype.connect = function(t) {
    this.destination = t
  }, t.prototype.disconnect = function() {
    this.destination = null
  }, t.prototype.write = function(t, e) {
    this.collectTimestamps && (0 === this.timestamps.length && (this.startTime = t, this.decodedTime = t), this.timestamps.push({
      index: this.bits.byteLength << 3,
      time: t
    })), this.bits.write(e), this.canPlay = !0
  }, t.prototype.seek = function(t) {
    if (this.collectTimestamps) {
      this.timestampIndex = 0;
      for (var e = 0; e < this.timestamps.length && !(this.timestamps[e].time > t); e++) this.timestampIndex = e;
      var i = this.timestamps[this.timestampIndex];
      i ? (this.bits.index = i.index, this.decodedTime = i.time) : (this.bits.index = 0, this.decodedTime = this.startTime)
    }
  }, t.prototype.decode = function() {
    this.advanceDecodedTime(0)
  }, t.prototype.advanceDecodedTime = function(t) {
    if (this.collectTimestamps) {
      for (var e = -1, i = this.timestampIndex; i < this.timestamps.length && !(this.timestamps[i].index > this.bits.index); i++) e = i;
      if (-1 !== e && e !== this.timestampIndex) return this.timestampIndex = e, void(this.decodedTime = this.timestamps[this.timestampIndex].time)
    }
    this.decodedTime += t
  }, t.prototype.getCurrentTime = function() {
    return this.decodedTime
  }, t
}(), CKPlayer.Decoder.MPEG1Video = function() {
  "use strict";
  var t = function(t) {
    CKPlayer.Decoder.Base.call(this, t);
    var e = t.videoBufferSize || 524288,
      i = t.streaming ? CKPlayer.BitBuffer.MODE.EVICT : CKPlayer.BitBuffer.MODE.EXPAND;
    this.bits = new CKPlayer.BitBuffer(e, i), this.customIntraQuantMatrix = new Uint8Array(64), this.customNonIntraQuantMatrix = new Uint8Array(64), this.blockData = new Int32Array(64), this.currentFrame = 0, this.decodeFirstFrame = !1 !== t.decodeFirstFrame
  };
  return t.prototype = Object.create(CKPlayer.Decoder.Base.prototype), t.prototype.constructor = t, t.prototype.write = function(e, i) {
    if (CKPlayer.Decoder.Base.prototype.write.call(this, e, i), !this.hasSequenceHeader) {
      if (-1 === this.bits.findStartCode(t.START.SEQUENCE)) return !1;
      this.decodeSequenceHeader(), this.decodeFirstFrame && this.decode()
    }
  }, t.prototype.decode = function() {
    if (!this.hasSequenceHeader) return !1;
    if (-1 === this.bits.findStartCode(t.START.PICTURE)) {
      this.bits.byteLength, this.bits.index;
      return !1
    }
    return this.decodePicture(), this.advanceDecodedTime(1 / this.frameRate), !0
  }, t.prototype.readHuffman = function(t) {
    var e = 0;
    do {
      e = t[e + this.bits.read(1)]
    } while (e >= 0 && 0 !== t[e]);
    return t[e + 2]
  }, t.prototype.frameRate = 30, t.prototype.decodeSequenceHeader = function() {
    var e = this.bits.read(12),
      i = this.bits.read(12);
    if (this.bits.skip(4), this.frameRate = t.PICTURE_RATE[this.bits.read(4)], this.bits.skip(30), e === this.width && i === this.height || (this.width = e, this.height = i, this.initBuffers(), this.destination && this.destination.resize(e, i)), this.bits.read(1)) {
      for (var s = 0; s < 64; s++) this.customIntraQuantMatrix[t.ZIG_ZAG[s]] = this.bits.read(8);
      this.intraQuantMatrix = this.customIntraQuantMatrix
    }
    if (this.bits.read(1)) {
      for (s = 0; s < 64; s++) {
        var r = t.ZIG_ZAG[s];
        this.customNonIntraQuantMatrix[r] = this.bits.read(8)
      }
      this.nonIntraQuantMatrix = this.customNonIntraQuantMatrix
    }
    this.hasSequenceHeader = !0
  }, t.prototype.initBuffers = function() {
    this.intraQuantMatrix = t.DEFAULT_INTRA_QUANT_MATRIX, this.nonIntraQuantMatrix = t.DEFAULT_NON_INTRA_QUANT_MATRIX, this.mbWidth = this.width + 15 >> 4, this.mbHeight = this.height + 15 >> 4, this.mbSize = this.mbWidth * this.mbHeight, this.codedWidth = this.mbWidth << 4, this.codedHeight = this.mbHeight << 4, this.codedSize = this.codedWidth * this.codedHeight, this.halfWidth = this.mbWidth << 3, this.halfHeight = this.mbHeight << 3, this.currentY = new Uint8ClampedArray(this.codedSize), this.currentY32 = new Uint32Array(this.currentY.buffer), this.currentCr = new Uint8ClampedArray(this.codedSize >> 2), this.currentCr32 = new Uint32Array(this.currentCr.buffer), this.currentCb = new Uint8ClampedArray(this.codedSize >> 2), this.currentCb32 = new Uint32Array(this.currentCb.buffer), this.forwardY = new Uint8ClampedArray(this.codedSize), this.forwardY32 = new Uint32Array(this.forwardY.buffer), this.forwardCr = new Uint8ClampedArray(this.codedSize >> 2), this.forwardCr32 = new Uint32Array(this.forwardCr.buffer), this.forwardCb = new Uint8ClampedArray(this.codedSize >> 2), this.forwardCb32 = new Uint32Array(this.forwardCb.buffer)
  }, t.prototype.currentY = null, t.prototype.currentCr = null, t.prototype.currentCb = null, t.prototype.pictureType = 0, t.prototype.forwardY = null, t.prototype.forwardCr = null, t.prototype.forwardCb = null, t.prototype.fullPelForward = !1, t.prototype.forwardFCode = 0, t.prototype.forwardRSize = 0, t.prototype.forwardF = 0, t.prototype.decodePicture = function(e) {
    if (this.currentFrame++, this.bits.skip(10), this.pictureType = this.bits.read(3), this.bits.skip(16), !(this.pictureType <= 0 || this.pictureType >= t.PICTURE_TYPE.B)) {
      if (this.pictureType === t.PICTURE_TYPE.PREDICTIVE) {
        if (this.fullPelForward = this.bits.read(1), this.forwardFCode = this.bits.read(3), 0 === this.forwardFCode) return;
        this.forwardRSize = this.forwardFCode - 1, this.forwardF = 1 << this.forwardRSize
      }
      var i = 0;
      do {
        i = this.bits.findNextStartCode()
      } while (i === t.START.EXTENSION || i === t.START.USER_DATA);
      for (; i >= t.START.SLICE_FIRST && i <= t.START.SLICE_LAST;) this.decodeSlice(255 & i), i = this.bits.findNextStartCode();
      if (-1 !== i && this.bits.rewind(32), this.destination && this.destination.render(this.currentY, this.currentCr, this.currentCb), this.pictureType === t.PICTURE_TYPE.INTRA || this.pictureType === t.PICTURE_TYPE.PREDICTIVE) {
        var s = this.forwardY,
          r = this.forwardY32,
          o = this.forwardCr,
          n = this.forwardCr32,
          a = this.forwardCb,
          h = this.forwardCb32;
        this.forwardY = this.currentY, this.forwardY32 = this.currentY32, this.forwardCr = this.currentCr, this.forwardCr32 = this.currentCr32, this.forwardCb = this.currentCb, this.forwardCb32 = this.currentCb32, this.currentY = s, this.currentY32 = r, this.currentCr = o, this.currentCr32 = n, this.currentCb = a, this.currentCb32 = h
      }
    }
  }, t.prototype.quantizerScale = 0, t.prototype.sliceBegin = !1, t.prototype.decodeSlice = function(t) {
    for (this.sliceBegin = !0, this.macroblockAddress = (t - 1) * this.mbWidth - 1, this.motionFwH = this.motionFwHPrev = 0, this.motionFwV = this.motionFwVPrev = 0, this.dcPredictorY = 128, this.dcPredictorCr = 128, this.dcPredictorCb = 128, this.quantizerScale = this.bits.read(5); this.bits.read(1);) this.bits.skip(8);
    do {
      this.decodeMacroblock()
    } while (!this.bits.nextBytesAreStartCode())
  }, t.prototype.macroblockAddress = 0, t.prototype.mbRow = 0, t.prototype.mbCol = 0, t.prototype.macroblockType = 0, t.prototype.macroblockIntra = !1, t.prototype.macroblockMotFw = !1, t.prototype.motionFwH = 0, t.prototype.motionFwV = 0, t.prototype.motionFwHPrev = 0, t.prototype.motionFwVPrev = 0, t.prototype.decodeMacroblock = function() {
    for (var e = 0, i = this.readHuffman(t.MACROBLOCK_ADDRESS_INCREMENT); 34 === i;) i = this.readHuffman(t.MACROBLOCK_ADDRESS_INCREMENT);
    for (; 35 === i;) e += 33, i = this.readHuffman(t.MACROBLOCK_ADDRESS_INCREMENT);
    if (e += i, this.sliceBegin) this.sliceBegin = !1, this.macroblockAddress += e;
    else {
      if (this.macroblockAddress + e >= this.mbSize) return;
      for (e > 1 && (this.dcPredictorY = 128, this.dcPredictorCr = 128, this.dcPredictorCb = 128, this.pictureType === t.PICTURE_TYPE.PREDICTIVE && (this.motionFwH = this.motionFwHPrev = 0, this.motionFwV = this.motionFwVPrev = 0)); e > 1;) this.macroblockAddress++, this.mbRow = this.macroblockAddress / this.mbWidth | 0, this.mbCol = this.macroblockAddress % this.mbWidth, this.copyMacroblock(this.motionFwH, this.motionFwV, this.forwardY, this.forwardCr, this.forwardCb), e--;
      this.macroblockAddress++
    }
    this.mbRow = this.macroblockAddress / this.mbWidth | 0, this.mbCol = this.macroblockAddress % this.mbWidth;
    var s = t.MACROBLOCK_TYPE[this.pictureType];
    this.macroblockType = this.readHuffman(s), this.macroblockIntra = 1 & this.macroblockType, this.macroblockMotFw = 8 & this.macroblockType, 0 != (16 & this.macroblockType) && (this.quantizerScale = this.bits.read(5)), this.macroblockIntra ? (this.motionFwH = this.motionFwHPrev = 0, this.motionFwV = this.motionFwVPrev = 0) : (this.dcPredictorY = 128, this.dcPredictorCr = 128, this.dcPredictorCb = 128, this.decodeMotionVectors(), this.copyMacroblock(this.motionFwH, this.motionFwV, this.forwardY, this.forwardCr, this.forwardCb));
    for (var r = 0 != (2 & this.macroblockType) ? this.readHuffman(t.CODE_BLOCK_PATTERN) : this.macroblockIntra ? 63 : 0, o = 0, n = 32; o < 6; o++) 0 != (r & n) && this.decodeBlock(o), n >>= 1
  }, t.prototype.decodeMotionVectors = function() {
    var e, i, s = 0;
    this.macroblockMotFw ? (0 !== (e = this.readHuffman(t.MOTION)) && 1 !== this.forwardF ? (s = this.bits.read(this.forwardRSize), i = (Math.abs(e) - 1 << this.forwardRSize) + s + 1, e < 0 && (i = -i)) : i = e, this.motionFwHPrev += i, this.motionFwHPrev > (this.forwardF << 4) - 1 ? this.motionFwHPrev -= this.forwardF << 5 : this.motionFwHPrev < -this.forwardF << 4 && (this.motionFwHPrev += this.forwardF << 5), this.motionFwH = this.motionFwHPrev, this.fullPelForward && (this.motionFwH <<= 1), 0 !== (e = this.readHuffman(t.MOTION)) && 1 !== this.forwardF ? (s = this.bits.read(this.forwardRSize), i = (Math.abs(e) - 1 << this.forwardRSize) + s + 1, e < 0 && (i = -i)) : i = e, this.motionFwVPrev += i, this.motionFwVPrev > (this.forwardF << 4) - 1 ? this.motionFwVPrev -= this.forwardF << 5 : this.motionFwVPrev < -this.forwardF << 4 && (this.motionFwVPrev += this.forwardF << 5), this.motionFwV = this.motionFwVPrev, this.fullPelForward && (this.motionFwV <<= 1)) : this.pictureType === t.PICTURE_TYPE.PREDICTIVE && (this.motionFwH = this.motionFwHPrev = 0, this.motionFwV = this.motionFwVPrev = 0)
  }, t.prototype.copyMacroblock = function(t, e, i, s, r) {
    var o, n, a, h, c, d, l, u, p, f = this.currentY32,
      m = this.currentCb32,
      y = this.currentCr32;
    n = (o = this.codedWidth) - 16, a = t >> 1, h = e >> 1, c = 1 == (1 & t), d = 1 == (1 & e), l = ((this.mbRow << 4) + h) * o + (this.mbCol << 4) + a, p = (u = this.mbRow * o + this.mbCol << 2) + (o << 2);
    var b, T, g, C;
    if (c)
      if (d)
        for (; u < p;) {
          for (T = i[l] + i[l + o], l++, b = 0; b < 4; b++) C = T + (g = i[l] + i[l + o]) + 2 >> 2 & 255, C |= (T = i[++l] + i[l + o]) + g + 2 << 6 & 65280, C |= T + (g = i[++l] + i[l + o]) + 2 << 14 & 16711680, T = i[++l] + i[l + o], l++, C |= T + g + 2 << 22 & 4278190080, f[u++] = C;
          u += n >> 2, l += n - 1
        } else
          for (; u < p;) {
            for (T = i[l++], b = 0; b < 4; b++) C = T + (g = i[l++]) + 1 >> 1 & 255, C |= (T = i[l++]) + g + 1 << 7 & 65280, C |= T + (g = i[l++]) + 1 << 15 & 16711680, C |= (T = i[l++]) + g + 1 << 23 & 4278190080, f[u++] = C;
            u += n >> 2, l += n - 1
          } else if (d)
            for (; u < p;) {
              for (b = 0; b < 4; b++) C = i[l] + i[l + o] + 1 >> 1 & 255, C |= i[++l] + i[l + o] + 1 << 7 & 65280, C |= i[++l] + i[l + o] + 1 << 15 & 16711680, C |= i[++l] + i[l + o] + 1 << 23 & 4278190080, l++, f[u++] = C;
              u += n >> 2, l += n
            } else
              for (; u < p;) {
                for (b = 0; b < 4; b++) C = i[l], C |= i[++l] << 8, C |= i[++l] << 16, C |= i[++l] << 24, l++, f[u++] = C;
                u += n >> 2, l += n
              }
    n = (o = this.halfWidth) - 8, a = t / 2 >> 1, h = e / 2 >> 1, c = 1 == (t / 2 & 1), d = 1 == (e / 2 & 1), l = ((this.mbRow << 3) + h) * o + (this.mbCol << 3) + a, p = (u = this.mbRow * o + this.mbCol << 1) + (o << 1);
    var v, A, w, E, _, P;
    if (c)
      if (d)
        for (; u < p;) {
          for (v = s[l] + s[l + o], E = r[l] + r[l + o], l++, b = 0; b < 2; b++) w = v + (A = s[l] + s[l + o]) + 2 >> 2 & 255, P = E + (_ = r[l] + r[l + o]) + 2 >> 2 & 255, w |= (v = s[++l] + s[l + o]) + A + 2 << 6 & 65280, P |= (E = r[l] + r[l + o]) + _ + 2 << 6 & 65280, w |= v + (A = s[++l] + s[l + o]) + 2 << 14 & 16711680, P |= E + (_ = r[l] + r[l + o]) + 2 << 14 & 16711680, v = s[++l] + s[l + o], E = r[l] + r[l + o], l++, w |= v + A + 2 << 22 & 4278190080, P |= E + _ + 2 << 22 & 4278190080, y[u] = w, m[u] = P, u++;
          u += n >> 2, l += n - 1
        } else
          for (; u < p;) {
            for (v = s[l], E = r[l], l++, b = 0; b < 2; b++) w = v + (A = s[l]) + 1 >> 1 & 255, P = E + (_ = r[l++]) + 1 >> 1 & 255, w |= (v = s[l]) + A + 1 << 7 & 65280, P |= (E = r[l++]) + _ + 1 << 7 & 65280, w |= v + (A = s[l]) + 1 << 15 & 16711680, P |= E + (_ = r[l++]) + 1 << 15 & 16711680, w |= (v = s[l]) + A + 1 << 23 & 4278190080, P |= (E = r[l++]) + _ + 1 << 23 & 4278190080, y[u] = w, m[u] = P, u++;
            u += n >> 2, l += n - 1
          } else if (d)
            for (; u < p;) {
              for (b = 0; b < 2; b++) w = s[l] + s[l + o] + 1 >> 1 & 255, P = r[l] + r[l + o] + 1 >> 1 & 255, w |= s[++l] + s[l + o] + 1 << 7 & 65280, P |= r[l] + r[l + o] + 1 << 7 & 65280, w |= s[++l] + s[l + o] + 1 << 15 & 16711680, P |= r[l] + r[l + o] + 1 << 15 & 16711680, w |= s[++l] + s[l + o] + 1 << 23 & 4278190080, P |= r[l] + r[l + o] + 1 << 23 & 4278190080, l++, y[u] = w, m[u] = P, u++;
              u += n >> 2, l += n
            } else
              for (; u < p;) {
                for (b = 0; b < 2; b++) w = s[l], P = r[l], w |= s[++l] << 8, P |= r[l] << 8, w |= s[++l] << 16, P |= r[l] << 16, w |= s[++l] << 24, P |= r[l] << 24, l++, y[u] = w, m[u] = P, u++;
                u += n >> 2, l += n
              }
  }, t.prototype.dcPredictorY = 0, t.prototype.dcPredictorCr = 0, t.prototype.dcPredictorCb = 0, t.prototype.blockData = null, t.prototype.decodeBlock = function(e) {
    var i, s = 0;
    if (this.macroblockIntra) {
      var r, o;
      if (e < 4 ? (r = this.dcPredictorY, o = this.readHuffman(t.DCT_DC_SIZE_LUMINANCE)) : (r = 4 === e ? this.dcPredictorCr : this.dcPredictorCb, o = this.readHuffman(t.DCT_DC_SIZE_CHROMINANCE)), o > 0) {
        var n = this.bits.read(o);
        this.blockData[0] = 0 != (n & 1 << o - 1) ? r + n : r + (-1 << o | n + 1)
      } else this.blockData[0] = r;
      e < 4 ? this.dcPredictorY = this.blockData[0] : 4 === e ? this.dcPredictorCr = this.blockData[0] : this.dcPredictorCb = this.blockData[0], this.blockData[0] <<= 8, i = this.intraQuantMatrix, s = 1
    } else i = this.nonIntraQuantMatrix;
    for (var a = 0;;) {
      var h = 0,
        c = this.readHuffman(t.DCT_COEFF);
      if (1 === c && s > 0 && 0 === this.bits.read(1)) break;
      65535 === c ? (h = this.bits.read(6), 0 === (a = this.bits.read(8)) ? a = this.bits.read(8) : 128 === a ? a = this.bits.read(8) - 256 : a > 128 && (a -= 256)) : (h = c >> 8, a = 255 & c, this.bits.read(1) && (a = -a));
      var d = t.ZIG_ZAG[s += h];
      s++, a <<= 1, this.macroblockIntra || (a += a < 0 ? -1 : 1), 0 == (1 & (a = a * this.quantizerScale * i[d] >> 4)) && (a -= a > 0 ? 1 : -1), a > 2047 ? a = 2047 : a < -2048 && (a = -2048), this.blockData[d] = a * t.PREMULTIPLIER_MATRIX[d]
    }
    var l, u, p;
    e < 4 ? (l = this.currentY, p = this.codedWidth - 8, u = this.mbRow * this.codedWidth + this.mbCol << 4, 0 != (1 & e) && (u += 8), 0 != (2 & e) && (u += this.codedWidth << 3)) : (l = 4 === e ? this.currentCb : this.currentCr, p = (this.codedWidth >> 1) - 8, u = (this.mbRow * this.codedWidth << 2) + (this.mbCol << 3)), this.macroblockIntra ? 1 === s ? (t.CopyValueToDestination(this.blockData[0] + 128 >> 8, l, u, p), this.blockData[0] = 0) : (t.IDCT(this.blockData), t.CopyBlockToDestination(this.blockData, l, u, p), CKPlayer.Fill(this.blockData, 0)) : 1 === s ? (t.AddValueToDestination(this.blockData[0] + 128 >> 8, l, u, p), this.blockData[0] = 0) : (t.IDCT(this.blockData), t.AddBlockToDestination(this.blockData, l, u, p), CKPlayer.Fill(this.blockData, 0)), s = 0
  }, t.CopyBlockToDestination = function(t, e, i, s) {
    for (var r = 0; r < 64; r += 8, i += s + 8) e[i + 0] = t[r + 0], e[i + 1] = t[r + 1], e[i + 2] = t[r + 2], e[i + 3] = t[r + 3], e[i + 4] = t[r + 4], e[i + 5] = t[r + 5], e[i + 6] = t[r + 6], e[i + 7] = t[r + 7]
  }, t.AddBlockToDestination = function(t, e, i, s) {
    for (var r = 0; r < 64; r += 8, i += s + 8) e[i + 0] += t[r + 0], e[i + 1] += t[r + 1], e[i + 2] += t[r + 2], e[i + 3] += t[r + 3], e[i + 4] += t[r + 4], e[i + 5] += t[r + 5], e[i + 6] += t[r + 6], e[i + 7] += t[r + 7]
  }, t.CopyValueToDestination = function(t, e, i, s) {
    for (var r = 0; r < 64; r += 8, i += s + 8) e[i + 0] = t, e[i + 1] = t, e[i + 2] = t, e[i + 3] = t, e[i + 4] = t, e[i + 5] = t, e[i + 6] = t, e[i + 7] = t
  }, t.AddValueToDestination = function(t, e, i, s) {
    for (var r = 0; r < 64; r += 8, i += s + 8) e[i + 0] += t, e[i + 1] += t, e[i + 2] += t, e[i + 3] += t, e[i + 4] += t, e[i + 5] += t, e[i + 6] += t, e[i + 7] += t
  }, t.IDCT = function(t) {
    for (var e, i, s, r, o, n, a, h, c, d, l, u, p, f, m, y, b, T, g = 0; g < 8; ++g) e = t[32 + g], i = t[16 + g] + t[48 + g], s = t[40 + g] - t[24 + g], n = t[8 + g] + t[56 + g], a = t[24 + g] + t[40 + g], c = (p = (473 * (r = t[8 + g] - t[56 + g]) - 196 * s + 128 >> 8) - (o = n + a)) - (362 * (n - a) + 128 >> 8), f = (d = (h = t[0 + g]) - e) + (l = (362 * (t[16 + g] - t[48 + g]) + 128 >> 8) - i), m = (u = h + e) + i, y = d - l, b = u - i, T = -c - (473 * s + 196 * r + 128 >> 8), t[0 + g] = o + m, t[8 + g] = p + f, t[16 + g] = y - c, t[24 + g] = b - T, t[32 + g] = b + T, t[40 + g] = c + y, t[48 + g] = f - p, t[56 + g] = m - o;
    for (g = 0; g < 64; g += 8) e = t[4 + g], i = t[2 + g] + t[6 + g], s = t[5 + g] - t[3 + g], n = t[1 + g] + t[7 + g], a = t[3 + g] + t[5 + g], c = (p = (473 * (r = t[1 + g] - t[7 + g]) - 196 * s + 128 >> 8) - (o = n + a)) - (362 * (n - a) + 128 >> 8), f = (d = (h = t[0 + g]) - e) + (l = (362 * (t[2 + g] - t[6 + g]) + 128 >> 8) - i), m = (u = h + e) + i, y = d - l, b = u - i, T = -c - (473 * s + 196 * r + 128 >> 8), t[0 + g] = o + m + 128 >> 8, t[1 + g] = p + f + 128 >> 8, t[2 + g] = y - c + 128 >> 8, t[3 + g] = b - T + 128 >> 8, t[4 + g] = b + T + 128 >> 8, t[5 + g] = c + y + 128 >> 8, t[6 + g] = f - p + 128 >> 8, t[7 + g] = m - o + 128 >> 8
  }, t.PICTURE_RATE = [0, 23.976, 24, 25, 29.97, 30, 50, 59.94, 60, 0, 0, 0, 0, 0, 0, 0], t.ZIG_ZAG = new Uint8Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]), t.DEFAULT_INTRA_QUANT_MATRIX = new Uint8Array([8, 16, 19, 22, 26, 27, 29, 34, 16, 16, 22, 24, 27, 29, 34, 37, 19, 22, 26, 27, 29, 34, 34, 38, 22, 22, 26, 27, 29, 34, 37, 40, 22, 26, 27, 29, 32, 35, 40, 48, 26, 27, 29, 32, 35, 40, 48, 58, 26, 27, 29, 34, 38, 46, 56, 69, 27, 29, 35, 38, 46, 56, 69, 83]), t.DEFAULT_NON_INTRA_QUANT_MATRIX = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16]), t.PREMULTIPLIER_MATRIX = new Uint8Array([32, 44, 42, 38, 32, 25, 17, 9, 44, 62, 58, 52, 44, 35, 24, 12, 42, 58, 55, 49, 42, 33, 23, 12, 38, 52, 49, 44, 38, 30, 20, 10, 32, 44, 42, 38, 32, 25, 17, 9, 25, 35, 33, 30, 25, 20, 14, 7, 17, 24, 23, 20, 17, 14, 9, 5, 9, 12, 12, 10, 9, 7, 5, 2]), t.MACROBLOCK_ADDRESS_INCREMENT = new Int16Array([3, 6, 0, 9, 12, 0, 0, 0, 1, 15, 18, 0, 21, 24, 0, 27, 30, 0, 33, 36, 0, 0, 0, 3, 0, 0, 2, 39, 42, 0, 45, 48, 0, 0, 0, 5, 0, 0, 4, 51, 54, 0, 57, 60, 0, 0, 0, 7, 0, 0, 6, 63, 66, 0, 69, 72, 0, 75, 78, 0, 81, 84, 0, -1, 87, 0, -1, 90, 0, 93, 96, 0, 99, 102, 0, 105, 108, 0, 111, 114, 0, 0, 0, 9, 0, 0, 8, 117, 120, 0, 123, 126, 0, 129, 132, 0, 135, 138, 0, 0, 0, 15, 0, 0, 14, 0, 0, 13, 0, 0, 12, 0, 0, 11, 0, 0, 10, 141, -1, 0, -1, 144, 0, 147, 150, 0, 153, 156, 0, 159, 162, 0, 165, 168, 0, 171, 174, 0, 177, 180, 0, 183, -1, 0, -1, 186, 0, 189, 192, 0, 195, 198, 0, 201, 204, 0, 207, 210, 0, 213, 216, 0, 219, 222, 0, 0, 0, 21, 0, 0, 20, 0, 0, 19, 0, 0, 18, 0, 0, 17, 0, 0, 16, 0, 0, 35, 0, 0, 34, 0, 0, 33, 0, 0, 32, 0, 0, 31, 0, 0, 30, 0, 0, 29, 0, 0, 28, 0, 0, 27, 0, 0, 26, 0, 0, 25, 0, 0, 24, 0, 0, 23, 0, 0, 22]), t.MACROBLOCK_TYPE_INTRA = new Int8Array([3, 6, 0, -1, 9, 0, 0, 0, 1, 0, 0, 17]), t.MACROBLOCK_TYPE_PREDICTIVE = new Int8Array([3, 6, 0, 9, 12, 0, 0, 0, 10, 15, 18, 0, 0, 0, 2, 21, 24, 0, 0, 0, 8, 27, 30, 0, 33, 36, 0, -1, 39, 0, 0, 0, 18, 0, 0, 26, 0, 0, 1, 0, 0, 17]), t.MACROBLOCK_TYPE_B = new Int8Array([3, 6, 0, 9, 15, 0, 12, 18, 0, 24, 21, 0, 0, 0, 12, 27, 30, 0, 0, 0, 14, 39, 42, 0, 36, 33, 0, 0, 0, 4, 0, 0, 6, 54, 48, 0, 45, 51, 0, 0, 0, 8, 0, 0, 10, -1, 57, 0, 0, 0, 1, 60, 63, 0, 0, 0, 30, 0, 0, 17, 0, 0, 22, 0, 0, 26]), t.MACROBLOCK_TYPE = [null, t.MACROBLOCK_TYPE_INTRA, t.MACROBLOCK_TYPE_PREDICTIVE, t.MACROBLOCK_TYPE_B], t.CODE_BLOCK_PATTERN = new Int16Array([6, 3, 0, 9, 18, 0, 12, 15, 0, 24, 33, 0, 36, 39, 0, 27, 21, 0, 30, 42, 0, 60, 57, 0, 54, 48, 0, 69, 51, 0, 81, 75, 0, 63, 84, 0, 45, 66, 0, 72, 78, 0, 0, 0, 60, 105, 120, 0, 132, 144, 0, 114, 108, 0, 126, 141, 0, 87, 93, 0, 117, 96, 0, 0, 0, 32, 135, 138, 0, 99, 123, 0, 129, 102, 0, 0, 0, 4, 90, 111, 0, 0, 0, 8, 0, 0, 16, 0, 0, 44, 150, 168, 0, 0, 0, 28, 0, 0, 52, 0, 0, 62, 183, 177, 0, 156, 180, 0, 0, 0, 1, 165, 162, 0, 0, 0, 61, 0, 0, 56, 171, 174, 0, 0, 0, 2, 0, 0, 40, 153, 186, 0, 0, 0, 48, 192, 189, 0, 147, 159, 0, 0, 0, 20, 0, 0, 12, 240, 249, 0, 0, 0, 63, 231, 225, 0, 195, 219, 0, 252, 198, 0, 0, 0, 24, 0, 0, 36, 0, 0, 3, 207, 261, 0, 243, 237, 0, 204, 213, 0, 210, 234, 0, 201, 228, 0, 216, 222, 0, 258, 255, 0, 264, 246, 0, -1, 282, 0, 285, 291, 0, 0, 0, 33, 0, 0, 9, 318, 330, 0, 306, 348, 0, 0, 0, 5, 0, 0, 10, 279, 267, 0, 0, 0, 6, 0, 0, 18, 0, 0, 17, 0, 0, 34, 339, 357, 0, 309, 312, 0, 270, 276, 0, 327, 321, 0, 351, 354, 0, 303, 297, 0, 294, 288, 0, 300, 273, 0, 342, 345, 0, 315, 324, 0, 336, 333, 0, 363, 375, 0, 0, 0, 41, 0, 0, 14, 0, 0, 21, 372, 366, 0, 360, 369, 0, 0, 0, 11, 0, 0, 19, 0, 0, 7, 0, 0, 35, 0, 0, 13, 0, 0, 50, 0, 0, 49, 0, 0, 58, 0, 0, 37, 0, 0, 25, 0, 0, 45, 0, 0, 57, 0, 0, 26, 0, 0, 29, 0, 0, 38, 0, 0, 53, 0, 0, 23, 0, 0, 43, 0, 0, 46, 0, 0, 42, 0, 0, 22, 0, 0, 54, 0, 0, 51, 0, 0, 15, 0, 0, 30, 0, 0, 39, 0, 0, 47, 0, 0, 55, 0, 0, 27, 0, 0, 59, 0, 0, 31]), t.MOTION = new Int16Array([3, 6, 0, 12, 9, 0, 0, 0, 0, 18, 15, 0, 24, 21, 0, 0, 0, -1, 0, 0, 1, 27, 30, 0, 36, 33, 0, 0, 0, 2, 0, 0, -2, 42, 45, 0, 48, 39, 0, 60, 54, 0, 0, 0, 3, 0, 0, -3, 51, 57, 0, -1, 69, 0, 81, 75, 0, 78, 63, 0, 72, 66, 0, 96, 84, 0, 87, 93, 0, -1, 99, 0, 108, 105, 0, 0, 0, -4, 90, 102, 0, 0, 0, 4, 0, 0, -7, 0, 0, 5, 111, 123, 0, 0, 0, -5, 0, 0, 7, 114, 120, 0, 126, 117, 0, 0, 0, -6, 0, 0, 6, 153, 162, 0, 150, 147, 0, 135, 138, 0, 156, 141, 0, 129, 159, 0, 132, 144, 0, 0, 0, 10, 0, 0, 9, 0, 0, 8, 0, 0, -8, 171, 198, 0, 0, 0, -9, 180, 192, 0, 168, 183, 0, 165, 186, 0, 174, 189, 0, 0, 0, -10, 177, 195, 0, 0, 0, 12, 0, 0, 16, 0, 0, 13, 0, 0, 14, 0, 0, 11, 0, 0, 15, 0, 0, -16, 0, 0, -12, 0, 0, -14, 0, 0, -15, 0, 0, -11, 0, 0, -13]), t.DCT_DC_SIZE_LUMINANCE = new Int8Array([6, 3, 0, 18, 15, 0, 9, 12, 0, 0, 0, 1, 0, 0, 2, 27, 24, 0, 21, 30, 0, 0, 0, 0, 36, 33, 0, 0, 0, 4, 0, 0, 3, 39, 42, 0, 0, 0, 5, 0, 0, 6, 48, 45, 0, 51, -1, 0, 0, 0, 7, 0, 0, 8]), t.DCT_DC_SIZE_CHROMINANCE = new Int8Array([6, 3, 0, 12, 9, 0, 18, 15, 0, 24, 21, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 30, 27, 0, 0, 0, 3, 36, 33, 0, 0, 0, 4, 42, 39, 0, 0, 0, 5, 48, 45, 0, 0, 0, 6, 51, -1, 0, 0, 0, 7, 0, 0, 8]), t.DCT_COEFF = new Int32Array([3, 6, 0, 12, 9, 0, 0, 0, 1, 21, 24, 0, 18, 15, 0, 39, 27, 0, 33, 30, 0, 42, 36, 0, 0, 0, 257, 60, 66, 0, 54, 63, 0, 48, 57, 0, 0, 0, 513, 51, 45, 0, 0, 0, 2, 0, 0, 3, 81, 75, 0, 87, 93, 0, 72, 78, 0, 96, 90, 0, 0, 0, 1025, 69, 84, 0, 0, 0, 769, 0, 0, 258, 0, 0, 1793, 0, 0, 65535, 0, 0, 1537, 111, 108, 0, 0, 0, 1281, 105, 102, 0, 117, 114, 0, 99, 126, 0, 120, 123, 0, 156, 150, 0, 162, 159, 0, 144, 147, 0, 129, 135, 0, 138, 132, 0, 0, 0, 2049, 0, 0, 4, 0, 0, 514, 0, 0, 2305, 153, 141, 0, 165, 171, 0, 180, 168, 0, 177, 174, 0, 183, 186, 0, 0, 0, 2561, 0, 0, 3329, 0, 0, 6, 0, 0, 259, 0, 0, 5, 0, 0, 770, 0, 0, 2817, 0, 0, 3073, 228, 225, 0, 201, 210, 0, 219, 213, 0, 234, 222, 0, 216, 231, 0, 207, 192, 0, 204, 189, 0, 198, 195, 0, 243, 261, 0, 273, 240, 0, 246, 237, 0, 249, 258, 0, 279, 276, 0, 252, 255, 0, 270, 282, 0, 264, 267, 0, 0, 0, 515, 0, 0, 260, 0, 0, 7, 0, 0, 1026, 0, 0, 1282, 0, 0, 4097, 0, 0, 3841, 0, 0, 3585, 315, 321, 0, 333, 342, 0, 312, 291, 0, 375, 357, 0, 288, 294, 0, -1, 369, 0, 285, 303, 0, 318, 363, 0, 297, 306, 0, 339, 309, 0, 336, 348, 0, 330, 300, 0, 372, 345, 0, 351, 366, 0, 327, 354, 0, 360, 324, 0, 381, 408, 0, 417, 420, 0, 390, 378, 0, 435, 438, 0, 384, 387, 0, 0, 0, 2050, 396, 402, 0, 465, 462, 0, 0, 0, 8, 411, 399, 0, 429, 432, 0, 453, 414, 0, 426, 423, 0, 0, 0, 10, 0, 0, 9, 0, 0, 11, 0, 0, 5377, 0, 0, 1538, 0, 0, 771, 0, 0, 5121, 0, 0, 1794, 0, 0, 4353, 0, 0, 4609, 0, 0, 4865, 444, 456, 0, 0, 0, 1027, 459, 450, 0, 0, 0, 261, 393, 405, 0, 0, 0, 516, 447, 441, 0, 516, 519, 0, 486, 474, 0, 510, 483, 0, 504, 498, 0, 471, 537, 0, 507, 501, 0, 522, 513, 0, 534, 531, 0, 468, 477, 0, 492, 495, 0, 549, 546, 0, 525, 528, 0, 0, 0, 263, 0, 0, 2562, 0, 0, 2306, 0, 0, 5633, 0, 0, 5889, 0, 0, 6401, 0, 0, 6145, 0, 0, 1283, 0, 0, 772, 0, 0, 13, 0, 0, 12, 0, 0, 14, 0, 0, 15, 0, 0, 517, 0, 0, 6657, 0, 0, 262, 540, 543, 0, 480, 489, 0, 588, 597, 0, 0, 0, 27, 609, 555, 0, 606, 603, 0, 0, 0, 19, 0, 0, 22, 591, 621, 0, 0, 0, 18, 573, 576, 0, 564, 570, 0, 0, 0, 20, 552, 582, 0, 0, 0, 21, 558, 579, 0, 0, 0, 23, 612, 594, 0, 0, 0, 25, 0, 0, 24, 600, 615, 0, 0, 0, 31, 0, 0, 30, 0, 0, 28, 0, 0, 29, 0, 0, 26, 0, 0, 17, 0, 0, 16, 567, 618, 0, 561, 585, 0, 654, 633, 0, 0, 0, 37, 645, 648, 0, 0, 0, 36, 630, 636, 0, 0, 0, 34, 639, 627, 0, 663, 666, 0, 657, 624, 0, 651, 642, 0, 669, 660, 0, 0, 0, 35, 0, 0, 267, 0, 0, 40, 0, 0, 268, 0, 0, 266, 0, 0, 32, 0, 0, 264, 0, 0, 265, 0, 0, 38, 0, 0, 269, 0, 0, 270, 0, 0, 33, 0, 0, 39, 0, 0, 7937, 0, 0, 6913, 0, 0, 7681, 0, 0, 4098, 0, 0, 7425, 0, 0, 7169, 0, 0, 271, 0, 0, 274, 0, 0, 273, 0, 0, 272, 0, 0, 1539, 0, 0, 2818, 0, 0, 3586, 0, 0, 3330, 0, 0, 3074, 0, 0, 3842]), t.PICTURE_TYPE = {
    INTRA: 1,
    PREDICTIVE: 2,
    B: 3
  }, t.START = {
    SEQUENCE: 179,
    SLICE_FIRST: 1,
    SLICE_LAST: 175,
    PICTURE: 0,
    EXTENSION: 181,
    USER_DATA: 178
  }, t
}(), CKPlayer.Decoder.MP2Audio = function() {
  "use strict";
  var t = function(e) {
    CKPlayer.Decoder.Base.call(this, e);
    var i = e.audioBufferSize || 131072,
      s = e.streaming ? CKPlayer.BitBuffer.MODE.EVICT : CKPlayer.BitBuffer.MODE.EXPAND;
    this.bits = new CKPlayer.BitBuffer(i, s), this.left = new Float32Array(1152), this.right = new Float32Array(1152), this.sampleRate = 44100, this.D = new Float32Array(1024), this.D.set(t.SYNTHESIS_WINDOW, 0), this.D.set(t.SYNTHESIS_WINDOW, 512), this.V = new Float32Array(1024), this.U = new Int32Array(32), this.VPos = 0, this.allocation = [new Array(32), new Array(32)], this.scaleFactorInfo = [new Uint8Array(32), new Uint8Array(32)], this.scaleFactor = [new Array(32), new Array(32)], this.sample = [new Array(32), new Array(32)];
    for (var r = 0; r < 2; r++)
      for (var o = 0; o < 32; o++) this.scaleFactor[r][o] = [0, 0, 0], this.sample[r][o] = [0, 0, 0]
  };
  return t.prototype = Object.create(CKPlayer.Decoder.Base.prototype), t.prototype.constructor = t, t.prototype.decode = function() {
    var t = this.bits.index >> 3;
    if (t >= this.bits.byteLength) return !1;
    var e = this.decodeFrame(this.left, this.right);
    return this.bits.index = t + e << 3, !!e && (this.destination && this.destination.play(this.sampleRate, this.left, this.right), this.advanceDecodedTime(this.left.length / this.sampleRate), !0)
  }, t.prototype.getCurrentTime = function() {
    var t = this.destination ? this.destination.enqueuedTime : 0;
    return this.decodedTime - t
  }, t.prototype.decodeFrame = function(e, i) {
    var s = this.bits.read(11),
      r = this.bits.read(2),
      o = this.bits.read(2),
      n = !this.bits.read(1);
    if (s !== t.FRAME_SYNC || r !== t.VERSION.MPEG_1 || o !== t.LAYER.II) return 0;
    var a = this.bits.read(4) - 1;
    if (a > 13) return 0;
    var h = this.bits.read(2),
      c = t.SAMPLE_RATE[h];
    if (3 === h) return 0;
    r === t.VERSION.MPEG_2 && (h += 4, a += 14);
    var d = this.bits.read(1),
      l = (this.bits.read(1), this.bits.read(2)),
      u = 0;
    l === t.MODE.JOINT_STEREO ? u = this.bits.read(2) + 1 << 2 : (this.bits.skip(2), u = l === t.MODE.MONO ? 0 : 32), this.bits.skip(4), n && this.bits.skip(16);
    var p = 144e3 * t.BIT_RATE[a] / (c = t.SAMPLE_RATE[h]) + d | 0,
      f = 0,
      m = 0;
    if (r === t.VERSION.MPEG_2) f = 2, m = 30;
    else {
      var y = l === t.MODE.MONO ? 0 : 1,
        b = t.QUANT_LUT_STEP_1[y][a];
      m = 63 & (f = t.QUANT_LUT_STEP_2[b][h]), f >>= 6
    }
    u > m && (u = m);
    for (var T = 0; T < u; T++) this.allocation[0][T] = this.readAllocation(T, f), this.allocation[1][T] = this.readAllocation(T, f);
    for (T = u; T < m; T++) this.allocation[0][T] = this.allocation[1][T] = this.readAllocation(T, f);
    var g = l === t.MODE.MONO ? 1 : 2;
    for (T = 0; T < m; T++) {
      for (C = 0; C < g; C++) this.allocation[C][T] && (this.scaleFactorInfo[C][T] = this.bits.read(2));
      l === t.MODE.MONO && (this.scaleFactorInfo[1][T] = this.scaleFactorInfo[0][T])
    }
    for (T = 0; T < m; T++) {
      for (var C = 0; C < g; C++)
        if (this.allocation[C][T]) {
          var v = this.scaleFactor[C][T];
          switch (this.scaleFactorInfo[C][T]) {
            case 0:
              v[0] = this.bits.read(6), v[1] = this.bits.read(6), v[2] = this.bits.read(6);
              break;
            case 1:
              v[0] = v[1] = this.bits.read(6), v[2] = this.bits.read(6);
              break;
            case 2:
              v[0] = v[1] = v[2] = this.bits.read(6);
              break;
            case 3:
              v[0] = this.bits.read(6), v[1] = v[2] = this.bits.read(6)
          }
        }
      l === t.MODE.MONO && (this.scaleFactor[1][T][0] = this.scaleFactor[0][T][0], this.scaleFactor[1][T][1] = this.scaleFactor[0][T][1], this.scaleFactor[1][T][2] = this.scaleFactor[0][T][2])
    }
    for (var A = 0, w = 0; w < 3; w++)
      for (var E = 0; E < 4; E++) {
        for (T = 0; T < u; T++) this.readSamples(0, T, w), this.readSamples(1, T, w);
        for (T = u; T < m; T++) this.readSamples(0, T, w), this.sample[1][T][0] = this.sample[0][T][0], this.sample[1][T][1] = this.sample[0][T][1], this.sample[1][T][2] = this.sample[0][T][2];
        for (T = m; T < 32; T++) this.sample[0][T][0] = 0, this.sample[0][T][1] = 0, this.sample[0][T][2] = 0, this.sample[1][T][0] = 0, this.sample[1][T][1] = 0, this.sample[1][T][2] = 0;
        for (var _ = 0; _ < 3; _++) {
          this.VPos = this.VPos - 64 & 1023;
          for (C = 0; C < 2; C++) {
            t.MatrixTransform(this.sample[C], _, this.V, this.VPos), CKPlayer.Fill(this.U, 0);
            for (var P = 512 - (this.VPos >> 1), S = this.VPos % 128 >> 1; S < 1024;) {
              for (var x = 0; x < 32; ++x) this.U[x] += this.D[P++] * this.V[S++];
              S += 96, P += 32
            }
            for (S = 1120 - S, P -= 480; S < 1024;) {
              for (x = 0; x < 32; ++x) this.U[x] += this.D[P++] * this.V[S++];
              S += 96, P += 32
            }
            for (var R = 0 === C ? e : i, I = 0; I < 32; I++) R[A + I] = this.U[I] / 2147418112
          }
          A += 32
        }
      }
    return this.sampleRate = c, p
  }, t.prototype.readAllocation = function(e, i) {
    var s = t.QUANT_LUT_STEP_3[i][e],
      r = t.QUANT_LUT_STEP4[15 & s][this.bits.read(s >> 4)];
    return r ? t.QUANT_TAB[r - 1] : 0
  }, t.prototype.readSamples = function(e, i, s) {
    var r = this.allocation[e][i],
      o = this.scaleFactor[e][i][s],
      n = this.sample[e][i],
      a = 0;
    if (r) {
      if (63 === o) o = 0;
      else {
        var h = o / 3 | 0;
        o = t.SCALEFACTOR_BASE[o % 3] + (1 << h >> 1) >> h
      }
      var c = r.levels;
      r.group ? (a = this.bits.read(r.bits), n[0] = a % c, a = a / c | 0, n[1] = a % c, n[2] = a / c | 0) : (n[0] = this.bits.read(r.bits), n[1] = this.bits.read(r.bits), n[2] = this.bits.read(r.bits));
      var d = 65536 / (c + 1) | 0;
      a = ((c = (c + 1 >> 1) - 1) - n[0]) * d, n[0] = a * (o >> 12) + (a * (4095 & o) + 2048 >> 12) >> 12, a = (c - n[1]) * d, n[1] = a * (o >> 12) + (a * (4095 & o) + 2048 >> 12) >> 12, a = (c - n[2]) * d, n[2] = a * (o >> 12) + (a * (4095 & o) + 2048 >> 12) >> 12
    } else n[0] = n[1] = n[2] = 0
  }, t.MatrixTransform = function(t, e, i, s) {
    var r, o, n, a, h, c, d, l, u, p, f, m, y, b, T, g, C, v, A, w, E, _, P, S, x, R, I, k, D, N, L, O, F;
    r = t[0][e] + t[31][e], o = .500602998235 * (t[0][e] - t[31][e]), n = t[1][e] + t[30][e], a = .505470959898 * (t[1][e] - t[30][e]), h = t[2][e] + t[29][e], c = .515447309923 * (t[2][e] - t[29][e]), d = t[3][e] + t[28][e], l = .53104259109 * (t[3][e] - t[28][e]), u = t[4][e] + t[27][e], p = .553103896034 * (t[4][e] - t[27][e]), f = t[5][e] + t[26][e], m = .582934968206 * (t[5][e] - t[26][e]), y = t[6][e] + t[25][e], b = .622504123036 * (t[6][e] - t[25][e]), T = t[7][e] + t[24][e], g = .674808341455 * (t[7][e] - t[24][e]), C = t[8][e] + t[23][e], v = .744536271002 * (t[8][e] - t[23][e]), A = t[9][e] + t[22][e], w = .839349645416 * (t[9][e] - t[22][e]), E = t[10][e] + t[21][e], _ = .972568237862 * (t[10][e] - t[21][e]), P = t[11][e] + t[20][e], S = 1.16943993343 * (t[11][e] - t[20][e]), x = t[12][e] + t[19][e], R = 1.48416461631 * (t[12][e] - t[19][e]), I = t[13][e] + t[18][e], k = 2.05778100995 * (t[13][e] - t[18][e]), D = t[14][e] + t[17][e], N = 3.40760841847 * (t[14][e] - t[17][e]), F = r + (L = t[15][e] + t[16][e]), L = .502419286188 * (r - L), r = n + D, D = .52249861494 * (n - D), n = h + I, I = .566944034816 * (h - I), h = d + x, x = .64682178336 * (d - x), d = u + P, P = .788154623451 * (u - P), u = f + E, E = 1.06067768599 * (f - E), f = y + A, A = 1.72244709824 * (y - A), y = T + C, C = 5.10114861869 * (T - C), T = F + y, y = .509795579104 * (F - y), F = r + f, r = .601344886935 * (r - f), f = n + u, u = .899976223136 * (n - u), n = h + d, d = 2.56291544774 * (h - d), h = T + n, T = .541196100146 * (T - n), n = F + f, f = 1.30656296488 * (F - f), F = h + n, h = .707106781187 * (h - n), n = T + f, n += T = .707106781187 * (T - f), f = y + d, y = .541196100146 * (y - d), d = r + u, u = 1.30656296488 * (r - u), r = f + d, d = .707106781187 * (f - d), f = y + u, r += f += y = .707106781187 * (y - u), f += d, d += y, u = L + C, L = .509795579104 * (L - C), C = D + A, D = .601344886935 * (D - A), A = I + E, E = .899976223136 * (I - E), I = x + P, P = 2.56291544774 * (x - P), x = u + I, u = .541196100146 * (u - I), I = C + A, A = 1.30656296488 * (C - A), C = x + I, I = .707106781187 * (x - I), x = u + A, A = .707106781187 * (u - A), u = L + P, L = .541196100146 * (L - P), P = D + E, E = 1.30656296488 * (D - E), D = u + P, P = .707106781187 * (u - P), u = L + E, C += D += u += L = .707106781187 * (L - E), D += x += A, x += u += P, u += I, I += P += L, P += A, A += L, E = o + (O = 10.1900081235 * (t[15][e] - t[16][e])), o = .502419286188 * (o - O), O = a + N, a = .52249861494 * (a - N), N = c + k, k = .566944034816 * (c - k), c = l + R, l = .64682178336 * (l - R), R = p + S, p = .788154623451 * (p - S), S = m + _, _ = 1.06067768599 * (m - _), m = b + w, w = 1.72244709824 * (b - w), b = g + v, g = 5.10114861869 * (g - v), v = E + b, b = .509795579104 * (E - b), E = O + m, O = .601344886935 * (O - m), m = N + S, S = .899976223136 * (N - S), N = c + R, R = 2.56291544774 * (c - R), c = v + N, v = .541196100146 * (v - N), N = E + m, m = 1.30656296488 * (E - m), E = c + N, N = .707106781187 * (c - N), c = v + m, m = .707106781187 * (v - m), v = b + R, R = .541196100146 * (b - R), b = O + S, S = 1.30656296488 * (O - S), O = v + b, b = .707106781187 * (v - b), v = R + S, O += v += S = .707106781187 * (R - S), v += b, R = b + S, b = o + g, o = .509795579104 * (o - g), g = a + w, a = .601344886935 * (a - w), w = k + _, _ = .899976223136 * (k - _), k = l + p, p = 2.56291544774 * (l - p), l = b + k, b = .541196100146 * (b - k), k = g + w, w = 1.30656296488 * (g - w), g = l + k, k = .707106781187 * (l - k), l = b + w, w = .707106781187 * (b - w), b = o + p, o = .541196100146 * (o - p), p = a + _, _ = 1.30656296488 * (a - _), a = b + p, p = .707106781187 * (b - p), b = o + _, E += g += a += b += o = .707106781187 * (o - _), g += O, O += a += l += w, a += c += m, c += l += b += p, l += v, v += b += k, b += N, N += k += p += o, k += R, R += p += w, p += m, m += w += o, w += S, S += o, i[s + 48] = -F, i[s + 49] = i[s + 47] = -E, i[s + 50] = i[s + 46] = -C, i[s + 51] = i[s + 45] = -g, i[s + 52] = i[s + 44] = -r, i[s + 53] = i[s + 43] = -O, i[s + 54] = i[s + 42] = -D, i[s + 55] = i[s + 41] = -a, i[s + 56] = i[s + 40] = -n, i[s + 57] = i[s + 39] = -c, i[s + 58] = i[s + 38] = -x, i[s + 59] = i[s + 37] = -l, i[s + 60] = i[s + 36] = -f, i[s + 61] = i[s + 35] = -v, i[s + 62] = i[s + 34] = -u, i[s + 63] = i[s + 33] = -b, i[s + 32] = -h, i[s + 0] = h, i[s + 31] = -N, i[s + 1] = N, i[s + 30] = -I, i[s + 2] = I, i[s + 29] = -k, i[s + 3] = k, i[s + 28] = -d, i[s + 4] = d, i[s + 27] = -R, i[s + 5] = R, i[s + 26] = -P, i[s + 6] = P, i[s + 25] = -p, i[s + 7] = p, i[s + 24] = -T, i[s + 8] = T, i[s + 23] = -m, i[s + 9] = m, i[s + 22] = -A, i[s + 10] = A, i[s + 21] = -w, i[s + 11] = w, i[s + 20] = -y, i[s + 12] = y, i[s + 19] = -S, i[s + 13] = S, i[s + 18] = -L, i[s + 14] = L, i[s + 17] = -o, i[s + 15] = o, i[s + 16] = 0
  }, t.FRAME_SYNC = 2047, t.VERSION = {
    MPEG_2_5: 0,
    MPEG_2: 2,
    MPEG_1: 3
  }, t.LAYER = {
    III: 1,
    II: 2,
    I: 3
  }, t.MODE = {
    STEREO: 0,
    JOINT_STEREO: 1,
    DUAL_CHANNEL: 2,
    MONO: 3
  }, t.SAMPLE_RATE = new Uint16Array([44100, 48e3, 32e3, 0, 22050, 24e3, 16e3, 0]), t.BIT_RATE = new Uint16Array([32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160]), t.SCALEFACTOR_BASE = new Uint32Array([33554432, 26632170, 21137968]), t.SYNTHESIS_WINDOW = new Float32Array([0, -.5, -.5, -.5, -.5, -.5, -.5, -1, -1, -1, -1, -1.5, -1.5, -2, -2, -2.5, -2.5, -3, -3.5, -3.5, -4, -4.5, -5, -5.5, -6.5, -7, -8, -8.5, -9.5, -10.5, -12, -13, -14.5, -15.5, -17.5, -19, -20.5, -22.5, -24.5, -26.5, -29, -31.5, -34, -36.5, -39.5, -42.5, -45.5, -48.5, -52, -55.5, -58.5, -62.5, -66, -69.5, -73.5, -77, -80.5, -84.5, -88, -91.5, -95, -98, -101, -104, 106.5, 109, 111, 112.5, 113.5, 114, 114, 113.5, 112, 110.5, 107.5, 104, 100, 94.5, 88.5, 81.5, 73, 63.5, 53, 41.5, 28.5, 14.5, -1, -18, -36, -55.5, -76.5, -98.5, -122, -147, -173.5, -200.5, -229.5, -259.5, -290.5, -322.5, -355.5, -389.5, -424, -459.5, -495.5, -532, -568.5, -605, -641.5, -678, -714, -749, -783.5, -817, -849, -879.5, -908.5, -935, -959.5, -981, -1000.5, -1016, -1028.5, -1037.5, -1042.5, -1043.5, -1040, -1031.5, 1018.5, 1e3, 976, 946.5, 911, 869.5, 822, 767.5, 707, 640, 565.5, 485, 397, 302.5, 201, 92.5, -22.5, -144, -272.5, -407, -547.5, -694, -846, -1003, -1165, -1331.5, -1502, -1675.5, -1852.5, -2031.5, -2212.5, -2394, -2576.5, -2758.5, -2939.5, -3118.5, -3294.5, -3467.5, -3635.5, -3798.5, -3955, -4104.5, -4245.5, -4377.5, -4499, -4609.5, -4708, -4792.5, -4863.5, -4919, -4958, -4979.5, -4983, -4967.5, -4931.5, -4875, -4796, -4694.5, -4569.5, -4420, -4246, -4046, -3820, -3567, 3287, 2979.5, 2644, 2280.5, 1888, 1467.5, 1018.5, 541, 35, -499, -1061, -1650, -2266.5, -2909, -3577, -4270, -4987.5, -5727.5, -6490, -7274, -8077.5, -8899.5, -9739, -10594.5, -11464.5, -12347, -13241, -14144.5, -15056, -15973.5, -16895.5, -17820, -18744.5, -19668, -20588, -21503, -22410.5, -23308.5, -24195, -25068.5, -25926.5, -26767, -27589, -28389, -29166.5, -29919, -30644.5, -31342, -32009.5, -32645, -33247, -33814.5, -34346, -34839.5, -35295, -35710, -36084.5, -36417.5, -36707.5, -36954, -37156.5, -37315, -37428, -37496, 37519, 37496, 37428, 37315, 37156.5, 36954, 36707.5, 36417.5, 36084.5, 35710, 35295, 34839.5, 34346, 33814.5, 33247, 32645, 32009.5, 31342, 30644.5, 29919, 29166.5, 28389, 27589, 26767, 25926.5, 25068.5, 24195, 23308.5, 22410.5, 21503, 20588, 19668, 18744.5, 17820, 16895.5, 15973.5, 15056, 14144.5, 13241, 12347, 11464.5, 10594.5, 9739, 8899.5, 8077.5, 7274, 6490, 5727.5, 4987.5, 4270, 3577, 2909, 2266.5, 1650, 1061, 499, -35, -541, -1018.5, -1467.5, -1888, -2280.5, -2644, -2979.5, 3287, 3567, 3820, 4046, 4246, 4420, 4569.5, 4694.5, 4796, 4875, 4931.5, 4967.5, 4983, 4979.5, 4958, 4919, 4863.5, 4792.5, 4708, 4609.5, 4499, 4377.5, 4245.5, 4104.5, 3955, 3798.5, 3635.5, 3467.5, 3294.5, 3118.5, 2939.5, 2758.5, 2576.5, 2394, 2212.5, 2031.5, 1852.5, 1675.5, 1502, 1331.5, 1165, 1003, 846, 694, 547.5, 407, 272.5, 144, 22.5, -92.5, -201, -302.5, -397, -485, -565.5, -640, -707, -767.5, -822, -869.5, -911, -946.5, -976, -1e3, 1018.5, 1031.5, 1040, 1043.5, 1042.5, 1037.5, 1028.5, 1016, 1000.5, 981, 959.5, 935, 908.5, 879.5, 849, 817, 783.5, 749, 714, 678, 641.5, 605, 568.5, 532, 495.5, 459.5, 424, 389.5, 355.5, 322.5, 290.5, 259.5, 229.5, 200.5, 173.5, 147, 122, 98.5, 76.5, 55.5, 36, 18, 1, -14.5, -28.5, -41.5, -53, -63.5, -73, -81.5, -88.5, -94.5, -100, -104, -107.5, -110.5, -112, -113.5, -114, -114, -113.5, -112.5, -111, -109, 106.5, 104, 101, 98, 95, 91.5, 88, 84.5, 80.5, 77, 73.5, 69.5, 66, 62.5, 58.5, 55.5, 52, 48.5, 45.5, 42.5, 39.5, 36.5, 34, 31.5, 29, 26.5, 24.5, 22.5, 20.5, 19, 17.5, 15.5, 14.5, 13, 12, 10.5, 9.5, 8.5, 8, 7, 6.5, 5.5, 5, 4.5, 4, 3.5, 3.5, 3, 2.5, 2.5, 2, 2, 1.5, 1.5, 1, 1, 1, 1, .5, .5, .5, .5, .5, .5]), t.QUANT_LUT_STEP_1 = [
    [0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2]
  ], t.QUANT_TAB = {
    A: 91,
    B: 94,
    C: 8,
    D: 12
  }, t.QUANT_LUT_STEP_2 = [
    [t.QUANT_TAB.C, t.QUANT_TAB.C, t.QUANT_TAB.D],
    [t.QUANT_TAB.A, t.QUANT_TAB.A, t.QUANT_TAB.A],
    [t.QUANT_TAB.B, t.QUANT_TAB.A, t.QUANT_TAB.B]
  ], t.QUANT_LUT_STEP_3 = [
    [68, 68, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52],
    [67, 67, 67, 66, 66, 66, 66, 66, 66, 66, 66, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 49, 32, 32, 32, 32, 32, 32, 32],
    [69, 69, 69, 69, 52, 52, 52, 52, 52, 52, 52, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36]
  ], t.QUANT_LUT_STEP4 = [
    [0, 1, 2, 17],
    [0, 1, 2, 3, 4, 5, 6, 17],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17],
    [0, 1, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  ], t.QUANT_TAB = [{
    levels: 3,
    group: 1,
    bits: 5
  }, {
    levels: 5,
    group: 1,
    bits: 7
  }, {
    levels: 7,
    group: 0,
    bits: 3
  }, {
    levels: 9,
    group: 1,
    bits: 10
  }, {
    levels: 15,
    group: 0,
    bits: 4
  }, {
    levels: 31,
    group: 0,
    bits: 5
  }, {
    levels: 63,
    group: 0,
    bits: 6
  }, {
    levels: 127,
    group: 0,
    bits: 7
  }, {
    levels: 255,
    group: 0,
    bits: 8
  }, {
    levels: 511,
    group: 0,
    bits: 9
  }, {
    levels: 1023,
    group: 0,
    bits: 10
  }, {
    levels: 2047,
    group: 0,
    bits: 11
  }, {
    levels: 4095,
    group: 0,
    bits: 12
  }, {
    levels: 8191,
    group: 0,
    bits: 13
  }, {
    levels: 16383,
    group: 0,
    bits: 14
  }, {
    levels: 32767,
    group: 0,
    bits: 15
  }, {
    levels: 65535,
    group: 0,
    bits: 16
  }], t
}(), CKPlayer.Renderer.WebGL = function() {
  "use strict";
  var t = function(e) {
    this.canvas = e.canvas || document.createElement("canvas"), this.width = this.canvas.width, this.height = this.canvas.height, this.enabled = !0;
    var i = {
      preserveDrawingBuffer: !!e.preserveDrawingBuffer,
      alpha: !1,
      depth: !1,
      stencil: !1,
      antialias: !1
    };
    if (this.gl = this.canvas.getContext("webgl", i) || this.canvas.getContext("experimental-webgl", i), !this.gl) throw new Error("Failed to get WebGL Context");
    var s = this.gl,
      r = null;
    this.vertexBuffer = s.createBuffer();
    var o = new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]);
    s.bindBuffer(s.ARRAY_BUFFER, this.vertexBuffer), s.bufferData(s.ARRAY_BUFFER, o, s.STATIC_DRAW), this.program = this.createProgram(t.SHADER.VERTEX_IDENTITY, t.SHADER.FRAGMENT_YCRCB_TO_RGBA), r = s.getAttribLocation(this.program, "vertex"), s.enableVertexAttribArray(r), s.vertexAttribPointer(r, 2, s.FLOAT, !1, 0, 0), this.textureY = this.createTexture(0, "textureY"), this.textureCb = this.createTexture(1, "textureCb"), this.textureCr = this.createTexture(2, "textureCr"), this.loadingProgram = this.createProgram(t.SHADER.VERTEX_IDENTITY, t.SHADER.FRAGMENT_LOADING), r = s.getAttribLocation(this.loadingProgram, "vertex"), s.enableVertexAttribArray(r), s.vertexAttribPointer(r, 2, s.FLOAT, !1, 0, 0), this.shouldCreateUnclampedViews = !this.allowsClampedTextureData()
  };
  return t.prototype.destroy = function() {
    var t = this.gl;
    t.deleteTexture(this.textureY), t.deleteTexture(this.textureCb), t.deleteTexture(this.textureCr), t.deleteProgram(this.program), t.deleteProgram(this.loadingProgram), t.deleteBuffer(this.vertexBuffer)
  }, t.prototype.resize = function(t, e) {
    this.width = 0 | t, this.height = 0 | e, this.canvas.width = this.width, this.canvas.height = this.height, this.gl.useProgram(this.program), this.gl.viewport(0, 0, this.width, this.height)
  }, t.prototype.createTexture = function(t, e) {
    var i = this.gl,
      s = i.createTexture();
    return i.bindTexture(i.TEXTURE_2D, s), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), i.uniform1i(i.getUniformLocation(this.program, e), t), s
  }, t.prototype.createProgram = function(t, e) {
    var i = this.gl,
      s = i.createProgram();
    return i.attachShader(s, this.compileShader(i.VERTEX_SHADER, t)), i.attachShader(s, this.compileShader(i.FRAGMENT_SHADER, e)), i.linkProgram(s), i.useProgram(s), s
  }, t.prototype.compileShader = function(t, e) {
    var i = this.gl,
      s = i.createShader(t);
    if (i.shaderSource(s, e), i.compileShader(s), !i.getShaderParameter(s, i.COMPILE_STATUS)) throw new Error(i.getShaderInfoLog(s));
    return s
  }, t.prototype.allowsClampedTextureData = function() {
    var t = this.gl,
      e = t.createTexture();
    return t.bindTexture(t.TEXTURE_2D, e), t.texImage2D(t.TEXTURE_2D, 0, t.LUMINANCE, 1, 1, 0, t.LUMINANCE, t.UNSIGNED_BYTE, new Uint8ClampedArray([0])), 0 === t.getError()
  }, t.prototype.renderProgress = function(t) {
    var e = this.gl;
    e.useProgram(this.loadingProgram);
    var i = e.getUniformLocation(this.loadingProgram, "progress");
    e.uniform1f(i, t), e.drawArrays(e.TRIANGLE_STRIP, 0, 4)
  }, t.prototype.render = function(t, e, i) {
    if (this.enabled) {
      var s = this.gl,
        r = this.width + 15 >> 4 << 4,
        o = this.height,
        n = r >> 1,
        a = o >> 1;
      this.shouldCreateUnclampedViews && (t = new Uint8Array(t.buffer), e = new Uint8Array(e.buffer), i = new Uint8Array(i.buffer)), s.useProgram(this.program), this.updateTexture(s.TEXTURE0, this.textureY, r, o, t), this.updateTexture(s.TEXTURE1, this.textureCb, n, a, e), this.updateTexture(s.TEXTURE2, this.textureCr, n, a, i), s.drawArrays(s.TRIANGLE_STRIP, 0, 4)
    }
  }, t.prototype.updateTexture = function(t, e, i, s, r) {
    var o = this.gl;
    o.activeTexture(t), o.bindTexture(o.TEXTURE_2D, e), o.texImage2D(o.TEXTURE_2D, 0, o.LUMINANCE, i, s, 0, o.LUMINANCE, o.UNSIGNED_BYTE, r)
  }, t.IsSupported = function() {
    try {
      if (!window.WebGLRenderingContext) return !1;
      var t = document.createElement("canvas");
      return !(!t.getContext("webgl") && !t.getContext("experimental-webgl"))
    } catch (t) {
      return !1
    }
  }, t.SHADER = {
    FRAGMENT_YCRCB_TO_RGBA: ["precision mediump float;", "uniform sampler2D textureY;", "uniform sampler2D textureCb;", "uniform sampler2D textureCr;", "varying vec2 texCoord;", "mat4 rec601 = mat4(", "1.16438,  0.00000,  1.59603, -0.87079,", "1.16438, -0.39176, -0.81297,  0.52959,", "1.16438,  2.01723,  0.00000, -1.08139,", "0, 0, 0, 1", ");", "void main() {", "float y = texture2D(textureY, texCoord).r;", "float cb = texture2D(textureCb, texCoord).r;", "float cr = texture2D(textureCr, texCoord).r;", "gl_FragColor = vec4(y, cr, cb, 1.0) * rec601;", "}"].join("\n"),
    FRAGMENT_LOADING: ["precision mediump float;", "uniform float progress;", "varying vec2 texCoord;", "void main() {", "float c = ceil(progress-(1.0-texCoord.y));", "gl_FragColor = vec4(c,c,c,1);", "}"].join("\n"),
    VERTEX_IDENTITY: ["attribute vec2 vertex;", "varying vec2 texCoord;", "void main() {", "texCoord = vertex;", "gl_Position = vec4((vertex * 2.0 - 1.0) * vec2(1, -1), 0.0, 1.0);", "}"].join("\n")
  }, t
}(), CKPlayer.Renderer.Canvas2D = function() {
  "use strict";
  var t = function(t) {
    this.canvas = t.canvas || document.createElement("canvas"), this.width = this.canvas.width, this.height = this.canvas.height, this.enabled = !0, this.context = this.canvas.getContext("2d")
  };
  return t.prototype.destroy = function() {}, t.prototype.resize = function(t, e) {
    this.width = 0 | t, this.height = 0 | e, this.canvas.width = this.width, this.canvas.height = this.height, this.imageData = this.context.getImageData(0, 0, this.width, this.height), CKPlayer.Fill(this.imageData.data, 255)
  }, t.prototype.renderProgress = function(t) {
    var e = this.canvas.width,
      i = this.canvas.height,
      s = this.context;
    s.fillStyle = "#222", s.fillRect(0, 0, e, i), s.fillStyle = "#fff", s.fillRect(0, i - i * t, e, i * t)
  }, t.prototype.render = function(t, e, i) {
    this.YCbCrToRGBA(t, e, i, this.imageData.data), this.context.putImageData(this.imageData, 0, 0)
  }, t.prototype.YCbCrToRGBA = function(t, e, i, s) {
    if (this.enabled)
      for (var r, o, n, a, h, c = this.width + 15 >> 4 << 4, d = c >> 1, l = 0, u = c, p = c + (c - this.width), f = 0, m = d - (this.width >> 1), y = 0, b = 4 * this.width, T = 4 * this.width, g = this.width >> 1, C = this.height >> 1, v = 0; v < C; v++) {
        for (var A = 0; A < g; A++) {
          r = e[f], o = i[f], f++, n = r + (103 * r >> 8) - 179, a = (88 * o >> 8) - 44 + (183 * r >> 8) - 91, h = o + (198 * o >> 8) - 227;
          var w = t[l++],
            E = t[l++];
          s[y] = w + n, s[y + 1] = w - a, s[y + 2] = w + h, s[y + 4] = E + n, s[y + 5] = E - a, s[y + 6] = E + h, y += 8;
          var _ = t[u++],
            P = t[u++];
          s[b] = _ + n, s[b + 1] = _ - a, s[b + 2] = _ + h, s[b + 4] = P + n, s[b + 5] = P - a, s[b + 6] = P + h, b += 8
        }
        l += p, u += p, y += T, b += T, f += m
      }
  }, t
}(), CKPlayer.AudioOutput.WebAudio = function() {
  "use strict";
  var t = function(e) {
    this.context = t.CachedContext = t.CachedContext || new(window.AudioContext || window.webkitAudioContext), this.gain = this.context.createGain(), this.destination = this.gain, this.gain.connect(this.context.destination), this.context._connections = (this.context._connections || 0) + 1, this.startTime = 0, this.buffer = null, this.wallclockStartTime = 0, this.volume = 1, this.enabled = !0, this.unlocked = !t.NeedsUnlocking(), Object.defineProperty(this, "enqueuedTime", {
      get: this.getEnqueuedTime
    })
  };
  return t.prototype.destroy = function() {
    this.gain.disconnect(), this.context._connections--, 0 === this.context._connections && (this.context.close(), t.CachedContext = null)
  }, t.prototype.play = function(t, e, i) {
    if (this.enabled) {
      if (!this.unlocked) {
        var s = CKPlayer.Now();
        return this.wallclockStartTime < s && (this.wallclockStartTime = s), void(this.wallclockStartTime += e.length / t)
      }
      this.gain.gain.value = this.volume;
      var r = this.context.createBuffer(2, e.length, t);
      r.getChannelData(0).set(e), r.getChannelData(1).set(i);
      var o = this.context.createBufferSource();
      o.buffer = r, o.connect(this.destination);
      var n = this.context.currentTime,
        a = r.duration;
      this.startTime < n && (this.startTime = n, this.wallclockStartTime = CKPlayer.Now()), o.start(this.startTime), this.startTime += a, this.wallclockStartTime += a
    }
  }, t.prototype.stop = function() {
    this.gain.gain.value = 0
  }, t.prototype.getEnqueuedTime = function() {
    return Math.max(this.wallclockStartTime - CKPlayer.Now(), 0)
  }, t.prototype.resetEnqueuedTime = function() {
    this.startTime = this.context.currentTime, this.wallclockStartTime = CKPlayer.Now()
  }, t.prototype.unlock = function(t) {
    if (this.unlocked) t && t();
    else {
      this.unlockCallback = t;
      var e = this.context.createBuffer(1, 1, 22050),
        i = this.context.createBufferSource();
      i.buffer = e, i.connect(this.destination), i.start(0), setTimeout(this.checkIfUnlocked.bind(this, i, 0), 0)
    }
  }, t.prototype.checkIfUnlocked = function(t, e) {
    t.playbackState === t.PLAYING_STATE || t.playbackState === t.FINISHED_STATE ? (this.unlocked = !0, this.unlockCallback && (this.unlockCallback(), this.unlockCallback = null)) : e < 10 && setTimeout(this.checkIfUnlocked.bind(this, t, e + 1), 100)
  }, t.NeedsUnlocking = function() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent)
  }, t.IsSupported = function() {
    return window.AudioContext || window.webkitAudioContext
  }, t.CachedContext = null, t
}();
/*eslint-enable*/

export { initialize, getRoomList, joinRoom, startPlay, dropCoin, quitRoom }
