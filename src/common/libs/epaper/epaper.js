// 拷贝版
/*eslint-disable*/
import { isWeixin } from '@/common/utils.js'
export function getVersion() {
  return "3.0.0.3"
}
export function setCurrentLanguageType(a) {
  var d = ["Cancel", "Done"],
    b = ["\u53d6\u6d88", "\u5b8c\u6210"],
    c = ["Green", "Yellow", "Blue", "Black", "Red"],
    f = ["\u7eff\u8272", "\u9ec4\u8272", "\u84dd\u8272", "\u9ed1\u8272", "\u7ea2\u8272"],
    e = ["\u7da0\u8272", "\u9ec3\u8272", "\u85cd\u8272", "\u9ed1\u8272", "\u7d05\u8272"],
    m = ["Ultra Thick", "Thick", "Mid", "Thin", "Ultra Thin"],
    g = ["\u7279\u7c97", "\u7c97", " \u4e2d ", " \u7ec6 ", "\u7279\u7ec6"],
    n = ["0.9em", "0.9em", "0.9em", "0.9em", "0.9em"],
    l = ["1em", "1em", "1em", "1em", "1em"],
    q = document.getElementById("writingDiv").querySelectorAll("input"),
    k = document.getElementById("palette").children,
    h = document.getElementById("penSize").children;
  if ("en" === a) {
    for (a = 0; 2 > a; a++) q[a].value = d[a];
    d = k.length;
    g = document.body.clientWidth;
    for (a = 0; a < d; a++) k[a].innerHTML = c[a],
      320 >= g && (k[a].style.fontSize = "0.7em");
    c = h.length;
    for (a = 0; a < c; a++) k = h[a].childElementCount,
      3 == k ? (h[a].children[1].style.fontSize = n[a], h[a].children[2].style.fontSize = n[a], 0 == a ? (h[a].children[1].innerHTML = "Ultra", h[a].children[2].innerHTML = "Thick") : 4 == a && (h[a].children[1].innerHTML = "Ultra", h[a].children[2].innerHTML = "Thin")) : 2 == k && (h[a].children[1].style.fontSize = n[a], h[a].children[1].innerHTML = m[a])
  } else if ("zh-Hans" === a) {
    for (a = 0; 2 > a; a++) q[a].value = b[a];
    d = k.length;
    for (a = 0; a < d; a++) k[a].innerHTML = f[a];
    c = h.length;
    for (a = 0; a < c; a++) k = h[a].childElementCount,
      3 == k ? (h[a].children[1].style.fontSize = l[a], h[a].children[2].style.fontSize = l[a], 0 == a ? (h[a].children[1].innerHTML = "\u7279", h[a].children[2].innerHTML = "\u7c97") : 4 == a && (h[a].children[1].innerHTML = "\u7279", h[a].children[2].innerHTML = "\u7ec6")) : 2 == k && (h[a].children[1].style.fontSize = l[a], h[a].children[1].innerHTML = g[a])
  } else if ("zh-Hant" === a) {
    for (a = 0; 2 > a; a++) q[a].value = b[a];
    d = k.length;
    for (a = 0; a < d; a++) k[a].innerHTML = e[a];
    c = h.length;
    for (a = 0; a < c; a++) k = h[a].childElementCount,
      3 == k ? (h[a].children[1].style.fontSize = l[a], h[a].children[2].style.fontSize = l[a], 0 == a ? (h[a].children[1].innerHTML = "\u7279", h[a].children[2].innerHTML = "\u7c97") : 4 == a && (h[a].children[1].innerHTML = "\u7279", h[a].children[2].innerHTML = "\u7d30")) : 2 == k && (h[a].children[1].style.fontSize = l[a], h[a].children[1].innerHTML = g[a])
  }
}

function init(a) {
  var writingDiv = document.getElementById("writingDiv")
  var inputs = writingDiv.querySelectorAll("input")
  var palette = document.getElementById("palette")
  var penSize = document.getElementById("penSize")
  var f = 0;
  var e = 0;
  // a.cancelButton = doucment;
  a.doneButton = writingDiv.querySelector('.textButton_Done');
  a.checkAgreementButton = writingDiv.querySelector('.textButton_Check_Agreement');
  a.undo = inputs[0];
  a.redo = inputs[1];
  a.clear = inputs[2];
  a.color = inputs[3];
  a.stoke = inputs[4];
  // a.cancelButton.onmousedown = function() {
  //   a.I(a.checkAgreementButton.getAttribute('action') || null, {})
  // };
  a.checkAgreementButton.onmousedown = function() {
    a.I(a.checkAgreementButton.getAttribute('action') || null, {})
  }
  a.doneButton.onmousedown = function() {
    var b;
    if (0 >= a.b.length) b = null;
    else {
      a.c = [-1, -1, -1, -1];
      for (b = 0; b < a.b.length; b++)
        for (var c = 0; c < a.b[b].points.length; c++) {
          var d = a.b[b].points[c],
            e = a,
            f = d.x,
            d = d.y,
            k = 0 > f - 16 ? 0 : f - 16,
            h = 0 > d - 16 ? 0 : d - 16;
          e.c[0] = 0 > e.c[0] ? k : e.c[0];
          e.c[0] = e.c[0] > k ? k : e.c[0];
          e.c[1] = e.c[1] < f + 16 ? f + 16 : e.c[1];
          e.c[2] = 0 > e.c[2] ? h : e.c[2];
          e.c[2] = e.c[2] > h ? h : e.c[2];
          e.c[3] = e.c[3] < d + 16 ? d + 16 : e.c[3]
        }
      b = a.canvas.getContext("2d").getImageData(a.c[0], a.c[2], a.c[1] - a.c[0], a.c[3] - a.c[2]);
      c = document.createElement("CANVAS");
      e = c.getContext("2d");
      c.height = b.height;
      c.width = b.width;
      e.putImageData(b, 0, 0);
      b = c.toDataURL("image/png")
    }
    c = '{"version":"' + getVersion() + '","strokes":[';
    for (f = 0; f < a.b.length; f++) {
      0 != f && (c += ",");
      c += '{"time":' + a.b[f].time + ",";
      c += '"color":"' + a.b[f].color + '",';
      c += '"penSize":"' + a.b[f].penSize + '",';
      c += '"points":[';
      for (d = 0; d < a.b[f].points.length; d++) e = a.b[f].points[d],
        0 != d && (c += ","),
        c += '{"x":' + Math.round(100 * e.x) / 100 + ',"y":' + Math.round(100 * e.y) / 100 + ',"t":' + (e.t || 0) + "}";
      c += "]}"
    }
    a.I('signdone', { pngData: b, pointsData: c + "]}" })
  };
  a.undo.onmousedown = function() {
    if ("edit" === a.status)
      if (a.u && a.u.length) a.b = a.u,
        a.u = null,
        y(a);
      else if (a.b.length) {
      var b = a.b.pop();
      a.B.push([b]);
      y(a)
    }
  };
  a.redo.onmousedown = function() {
    "edit" === a.status && a.B.length && (a.b = a.b.concat(a.B.pop()), y(a))
  };
  a.clear.onmousedown = function() {
    B(a)
  };
  a.color.onmousedown = function() {
    f ? (f = e = 0, penSize.style.display = "none", palette.style.display = "none") : (f = 1, palette.style.display = "inline", e = 0, penSize.style.display = "none")
  };
  a.stoke.onmousedown = function() {
    e ? (f = e = 0, penSize.style.display = "none") : (e = 1, penSize.style.display = "inline", f = 0);
    palette.style.display = "none"
  };
  palette.onclick = function(d) {
    d = d.target;
    "LI" == d.tagName && (a.color = d.getAttribute("value"), f = e = 0, penSize.style.display = "none", palette.style.display = "none")
  };
  penSize.onclick = function(d) {
    d = d.target;
    "DIV" == d.tagName && (a.h = parseInt(d.getAttribute("value")), f = e = 0, penSize.style.display = "none", palette.style.display = "none")
  }
}

function EPaper(a, d) {
  if (a.nodeType) this.canvas = a;
  else if ("string" == typeof a) this.canvas = document.getElementById(a);
  else return;
  var b = document.getElementById(d),
    c = b.offsetHeight;
  this.canvas.width = b.offsetWidth;
  this.canvas.height = c - 44 - 45;
  E(this);
  this.b = [];
  this.B = [];
  init(this)
}

EPaper.init = function(a, data = {}) {
  const headerShow = !isWeixin() && (process.env.NODE_ENV.indexOf('app') > -1 || process.env.NODE_ENV === 'development')
  document.getElementById(a).innerHTML = `<div id='writingDiv' class='writingDiv ${!headerShow ? "no-header" : ""}'>
                                            <div class='topBar'>
                                              <label>请在下方手写您的姓名</label>
                                              <button class='textButton textButton_Check_Agreement' action="agreement">查看合同</button>
                                            </div>
                                            <div class='paperCanvas'>
                                              <canvas id='ePaperCanvas' height='100%' width='100%' class='ePaperCanvas'></canvas>
                                            </div>
                                            <button class="textButton_Done">完成</button>
                                            <div class='bottomBar'>
                                              <div class='bottomCol'><input class='bottomButton undo' type='button'/></div>
                                              <div class='bottomCol'><input class='bottomButton redo' type='button'/></div>
                                              <div class='bottomCol'><input class='bottomButton clear' type='button'/></div>
                                              <div class='bottomCol'><input class='bottomButton color' type='button'/></div>
                                              <div class='bottomCol'><input class='bottomButton stroke' type='button'/></div>
                                            </div>
                                            <ol class='palette' id='palette'>
                                              <li value='rgba(111,138,37,1)' style='background:rgb(111,138,37)'>\u7eff\u8272</li>
                                              <li value='rgba(255,198,2,1)' style='background:rgb(255,198,2)'>\u9ec4\u8272</li>
                                              <li value='rgba(51,111,172,1)' style='background:rgb(51,111,172)'>\u84dd\u8272</li>
                                              <li value='rgba(0,0,0,1)' style='background:rgb(0,0,0)'>\u9ed1\u8272</li>
                                              <li value='rgba(255,0,0,1)' style='background:rgb(255,0,0)'>\u7ea2\u8272</li>
                                            </ol>
                                            <ol class='penSize' id='penSize'>
                                              <li><input type='radio' name='fSize' value='18'/><div value='18'>\u7279</div><div>\u7c97</div></li>
                                              <li><input type='radio' name='fSize' value='12'/><div style='margin-top:14px;' value='12'>\u7c97</div></li>
                                              <li><input type='radio' name='fSize' value='8' checked/><div style='margin-top:14px;' value='8'>\u4e2d</div></li>
                                              <li><input type='radio' name='fSize' value='6'/><div style='margin-top:14px;' value='6'>\u7ec6</div></li>
                                              <li><input type='radio' name='fSize' value='3'/><div value='3'>\u7279</div><div>\u7ec6</div></li>
                                            </ol>
                                          </div>`
  return new EPaper("ePaperCanvas", a)
}

// goog.exportProperty(D, "init", EPaper.C);
const r = EPaper.prototype;
r.i = 1;
r.color = "rgba(0,0,0,1)";
r.h = 8;
r.width = 320;
r.j = null;
r.u = null;
r.status = "edit";
r.c = [-1, -1, -1, -1];
r.J = .4;

function E(a) {
  if (a.canvas.getContext) {
    a.a = a.canvas.getContext("2d");
    a.a.strokeStyle = a.color;
    a.a.fillStyle = a.color;
    F(a.canvas, "selectstart",
      function() {
        return !1
      });
    var d = function(b) {
      if ("edit" === a.status) {
        var c, f;
        if ("touchstart" == b.type) {
          if (2 <= b.touches.length) return;
          c = b.touches[0].pageX;
          f = b.touches[0].pageY;
          G(a.canvas, "mousedown", d)
        } else c = b.pageX,
          f = b.pageY;
        a.m = a.canvas.getBoundingClientRect();
        a.m = {
          left: a.m.left + (window.scrollX || window.pageXOffset),
          top: a.m.top + (window.scrollY || window.pageYOffset)
        };
        c -= a.m.left;
        f -= a.m.top;
        a.j = {
          time: new Date,
          points: [{
            x: c,
            y: f,
            La: 0
          }],
          color: a.color,
          penSize: a.h
        };
        H(a, c, f, b.type);
        b.preventDefault()
      }
    };
    F(a.canvas, "touchstart", d);
    F(a.canvas, "mousedown", d)
  }
}

function H(a, d, b, c) {
  window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty();
  a.a.save();
  a.a.moveTo(d, b);
  a.g = null;
  a.o = null;
  a.f = [];
  a.D = 0;
  a.i = a.h / 2 * (a.width / 320);
  a.s && (G(document, "mousemove", a.s), G(document, "touchmove", a.s), G(document, "mouseup", a.v), G(document, "touchend", a.v));
  a.s = function(b) {
    if ("edit" === a.status) {
      var c, d;
      if ("touchmove" == b.type) {
        if (2 <= b.touches.length) return;
        c = b.touches[0].pageX;
        d = b.touches[0].pageY
      } else c = b.pageX,
        d = b.pageY;
      c -= a.m.left;
      d -= a.m.top;
      a.j.points.push({
        x: c,
        y: d,
        t: new Date - a.j.time
      });
      I(a, c, d);
      b.preventDefault()
    }
  };
  a.v = function() {
    "edit" === a.status && (J(a), a.b.length ? a.j.time -= a.M : (a.M = a.j.time, a.j.time = a.j.time.getTime()), a.b.push(a.j), a.u = null, a.B = [], a.j = null)
  };
  "touchstart" == c ? (F(document, "touchmove", a.s), F(document, "touchend", a.v)) : (F(document, "mousemove", a.s), F(document, "mouseup", a.v));
  a.g = null;
  I(a, d, b)
}

function I(a, d, b) {
  var c, f;
  if (a.f.length && (c = a.f[a.f.length - 1], f = Math.sqrt((c.x - d) * (c.x - d) + (c.y - b) * (c.y - b)), 0 == f)) return;
  navigator.userAgent.match(/ OS (\d+).*? Mac OS/) && !a.D && 2 == a.f.length && 4 * c < a.f[1].w && (a.f[0].x -= 2 / 3 * (a.f[0].x - a.f[1].x), a.f[0].y -= 2 / 3 * (a.f[0].y - a.f[1].y), a.f[1].w /= 2 / 3 * a.f[1].w);
  c = {
    x: d,
    y: b,
    w: f
  };
  a.f.push(c);
  3 <= a.f.length && (c = a.f.shift(), K(a, c))
}

function K(a, d, b) {
  var c = d.x,
    f = d.y,
    e = d.w;
  if (!a.g || 0 !== e) {
    a.G = a.f.length ? a.f[0] : null;
    if (e) {
      a.a.moveTo(a.g.x, a.g.y);
      var m;
      !a.D && a.G && e > 3 * a.G.w && (e /= 4, m = 1);
      a.D = 1;
      var g = a.width / 320 * a.h;
      b || (b = e < .003125 * a.width ? 1.625 * g : e < .00625 * a.width ? 1.375 * g : e < .009375 * a.width ? 1.25 * g : e < .015625 * a.width ? 1.125 * g : e < .021875 * a.width ? g : e < .028125 * a.width ? .875 * g : e < .034375 * a.width ? .75 * g : e < .046875 * a.width ? .625 * g : e < .0625 * a.width ? .5 * g : .375 * g);
      a.F = b;
      if (m)
        for (m = 1; 3 >= m; m++) L(a, c + m / 3 * (a.g.x - c), f + m / 3 * (a.g.y - f), e)
    }
    L(a, c, f, e);
    a.g = d
  }
}

function J(a) {
  G(document, "mousemove", a.s);
  G(document, "touchmove", a.s);
  G(document, "mouseup", a.v);
  G(document, "touchend", a.v);
  --a.a.i;
  for (var d; a.f.length;) d = a.f.shift(),
    K(a, d, a.width / 320 * a.h / 8)
}

function B(a) {
  "edit" === a.status && (a.g = null, a.c = [-1, -1, -1, -1], a.b.length && (a.u = a.b), a.b = [], a.a.beginPath(), a.a.clearRect(0, 0, a.canvas.width, a.canvas.height), a.a.closePath())
}

function M(a) {
  function d() {
    b.color = c;
    b.h = f;
    b.l >= b.b.length ? b.status = b.H : (clearTimeout(b.A), b.A = setTimeout(function() {
        M(b)
      },
      300))
  }
  var b = a,
    c = a.color,
    f = a.h,
    e = a.b[a.l];
  if (e && "play" == a.status) {
    a.color = e.color;
    a.h = e.penSize;
    H(a, e.points[0].x, e.points[0].y);
    1 == e.points.length && (J(b), d());
    var m = 1,
      g, n = 0;
    g = e.points[m];
    (function() {
      g && (I(b, g.x, g.y), m >= e.points.length - 1 && (J(b), d()), m++, g = e.points[m]) && (clearTimeout(b.A), b.A = setTimeout(arguments.callee, g.t - n), n = g.t)
    })();
    a.l++
  }
}

function y(a) {
  function d() {
    b.color = c;
    b.h = f;
    b.l >= b.b.length && (b.status = "edit")
  }
  var b = a,
    c = a.color,
    f = a.h;
  a.a.clearRect(0, 0, a.canvas.width, a.canvas.height);
  a.a.beginPath();
  a.l = 0;
  for (var e = a.b[a.l]; e;) {
    a.color = e.color;
    a.h = e.penSize;
    H(a, e.points[0].x, e.points[0].y);
    1 == e.points.length && (J(a), d());
    for (var m = 1,
        g = 1; m < e.points.length; m++) {
      var n = e.points[g];
      g++;
      I(a, n.x, n.y);
      g >= e.points.length && (J(a), d())
    }
    a.l++;
    e = a.b[a.l]
  }
}

function L(a, d, b, c) {
  var f = {
      x: d,
      y: b
    },
    e = 8,
    m = a.i;
  a.a.fillStyle = a.color;
  a.a.strokeStyle = a.color;
  if (a.g) {
    e = Math.floor(Math.abs(c) / (a.i / 3));
    if (1 < e)
      for (m = a.i, c = 0; c < e; c++) m -= (m - a.F) / (8 < e ? e : 8);
    else Math.abs(a.i - a.F) > a.width / 320 * a.h * .025 && (m = a.i - (a.i - a.F) / 8);
    d = null;
    if (0 < a.f.length) {
      d = a.g;
      b = a.f[0];
      var e = a.J,
        g = b.x - d.x,
        n = b.y - d.y,
        l = N(d, f),
        q = N(f, b),
        k = l + q;
      d = 0 == l || 0 == q || (f.x - d.x) / (f.y - d.y) == (f.x - b.x) / (f.y - b.y) ? null : [{
        x: f.x - g * e * l / k,
        y: f.y - n * e * l / k
      }, {
        x: f.x + g * e * q / k,
        y: f.y + n * e * q / k
      }]
    }
    b = [a.g];
    if ((a.o || d) && c > 2 * m) {
      e = d ? d[0] : f;
      a.o = null == a.o ? a.g : a.o;
      g = a.g;
      n = a.o;
      c = c / (2 * m);
      l = [];
      for (q = 0; q < c; q++) {
        var k = (q + 1) / (c + 1),
          h,
          A,
          v,
          z,
          x,
          p,
          w,
          C;
        v = 3 * (n.x - g.x);
        A = 3 * (e.x - n.x) - v;
        h = f.x - g.x - v - A;
        p = 3 * (n.y - g.y);
        x = 3 * (e.y - n.y) - p;
        z = f.y - g.y - p - x;
        w = k * k;
        C = w * k;
        l.push({
          x: h * C + A * w + v * k + g.x,
          y: z * C + x * w + p * k + g.y
        })
      }
      b = b.concat(l)
    }
    b.push(f);
    f = b;
    b = a.i;
    e = m;
    q = b;
    for (g = 1; g < f.length; g++) n = (e - b) / (f.length - 1) + q,
      c = a,
      p = f[g - 1],
      l = f[g],
      k = n,
      z = q * Math.sin(Math.atan((l.y - p.y) / (l.x - p.x))),
      w = q * Math.cos(Math.atan((l.y - p.y) / (l.x - p.x))),
      x = k * Math.sin(Math.atan((l.y - p.y) / (l.x - p.x))),
      v = k * Math.cos(Math.atan((l.y - p.y) / (l.x - p.x))),
      h = p.x + z,
      A = p.y - w,
      z = p.x - z,
      p = p.y + w,
      w = l.x + x,
      C = l.y - v,
      x = l.x - x,
      v = l.y + v,
      c.a.beginPath(),
      c.a.moveTo(h, A),
      c.a.lineTo(w, C),
      c.a.lineTo(x, v),
      c.a.lineTo(z, p),
      c.a.lineTo(h, A),
      c.a.fill(),
      c.a.closePath(),
      c.a.lineWidth = q,
      c.a.beginPath(),
      c.a.arc(l.x, l.y, k, 0, 2 * Math.PI),
      c.a.fill(),
      c.a.closePath(),
      q = n;
    a.a.lineWidth = a.i = m;
    !d || 1 >= d.length ? a.o = null : a.o = d[1]
  } else a.a.beginPath(),
    a.a.fillStyle = a.color,
    a.a.arc(d, b, a.i, 0, 2 * Math.PI),
    a.a.fill(),
    a.a.closePath()
}

function N(a, d) {
  return Math.sqrt(Math.pow(d.x - a.x, 2) + Math.pow(d.y - a.y, 2))
}

r.playWithJsonN = function(a) {
  a = eval("(" + a + ")").strokes;
  if (!(0 >= a.length)) {
    B(this);
    for (var d = [], b = 0; b < a.length; b++) {
      for (var c = [], f = 0; f < a[b].points.length; f++) c.push({
        x: a[b].points[f].x,
        y: a[b].points[f].y,
        t: a[b].points[f].t
      });
      d.push({
        time: a[b].time,
        points: c,
        color: a[b].color,
        penSize: a[b].penSize
      })
    }
    this.b = d;
    0 != this.b.length && ("play" == this.status ? (this.status = this.H, clearTimeout(this.A), y(this)) : (this.H = this.status, this.status = "play", this.a.clearRect(0, 0, this.canvas.width, this.canvas.height), this.a.beginPath(), this.l = 0, M(this)))
  }
}

function F(a, d, b) {
  a.attachEvent ? a.attachEvent("on" + d, b) : a.addEventListener(d, b, !1)
}

function G(a, d, b) {
  a.detachEvent ? a.detachEvent("on" + d, b) : a.removeEventListener(d, b, !1)
}

r.setCallback = function(a) {
  "function" === typeof a && (this.I = a)
}

export default EPaper
/*eslint-enable*/
