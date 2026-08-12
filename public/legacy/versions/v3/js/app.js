/* ============================================================
   IC Design Mentoring — Version 3 · app.js
   Engine dùng chung cho 12 tuần: quiz, checklist, tiến độ,
   mentor mode, highlighter SystemVerilog, widget tương tác.
   Không phụ thuộc thư viện ngoài. Hoạt động offline (file://).
   ============================================================ */
(function () {
  'use strict';

  /* ---------- storage an toàn (localStorage có thể bị chặn) ---------- */
  var mem = {};
  var store = {
    get: function (k, d) {
      try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); }
      catch (e) { return (k in mem) ? mem[k] : d; }
    },
    set: function (k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { mem[k] = v; }
    },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) { delete mem[k]; } }
  };
  var WEEK = document.body.getAttribute('data-week') || '00';
  var NS = 'licv3:w' + WEEK + ':';
  window.LICV3 = { store: store, ns: NS };

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- mentor mode ---------- */
  function initMentor() {
    var sw = $('.mentor-sw'); if (!sw) return;
    function apply(on) {
      document.body.classList.toggle('mentor-on', !!on);
      store.set('licv3:mentor', !!on);
    }
    apply(store.get('licv3:mentor', false));
    sw.addEventListener('click', function () {
      apply(!document.body.classList.contains('mentor-on'));
    });
  }

  /* ---------- thanh tiến độ cuộn + scrollspy layer chips ---------- */
  function initScroll() {
    var bar = $('.scrollbar > div');
    var chips = $$('.layer-chips .chip[href^="#"]');
    var secs = chips.map(function (c) { return $(c.getAttribute('href')); });
    function onScroll() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      if (bar) bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
      var cur = -1, y = h.scrollTop + 130;
      secs.forEach(function (s, i) { if (s && s.offsetTop <= y) cur = i; });
      chips.forEach(function (c, i) { c.classList.toggle('active', i === cur); });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- checklist (persist) ---------- */
  function initChecklists() {
    $$('.ck').forEach(function (list, li) {
      var key = NS + 'ck:' + (list.id || li);
      var saved = store.get(key, {});
      var boxes = $$('input[type="checkbox"]', list);
      var badge = list.getAttribute('data-count') ? $(list.getAttribute('data-count')) : null;
      function update() {
        var st = {}, done = 0;
        boxes.forEach(function (b, i) { st[i] = b.checked; if (b.checked) done++; });
        store.set(key, st);
        if (badge) badge.textContent = done + '/' + boxes.length;
      }
      boxes.forEach(function (b, i) {
        if (saved[i]) b.checked = true;
        b.addEventListener('change', update);
      });
      update();
    });
  }

  /* ---------- QUIZ ENGINE (duy nhất, dùng cho mọi tuần) ----------
     Markup:
     <div class="quiz" id="quiz">
       <div class="qz-item" data-answer="B">
         <p class="qz-q">…</p>
         <button class="qz-opt" data-key="A">…</button> …
         <div class="qz-expl">…</div>
       </div>…
       <div class="qz-bar"><span class="qz-score"></span>
         <span class="qz-verdict"></span>
         <button class="qz-reset">Làm lại</button></div>
     </div> */
  function initQuiz() {
    $$('.quiz').forEach(function (qz, qi) {
      var key = NS + 'quiz:' + (qz.id || qi);
      var items = $$('.qz-item', qz);
      var scoreEl = $('.qz-score', qz), verdictEl = $('.qz-verdict', qz);
      var saved = store.get(key, {});

      function grade(item, chosenKey, persist) {
        var ans = item.getAttribute('data-answer');
        var opts = $$('.qz-opt', item);
        item.classList.add('answered');
        opts.forEach(function (o) {
          var k = o.getAttribute('data-key');
          o.disabled = true;
          if (k === ans) o.classList.add('correct');
          else if (k === chosenKey) o.classList.add('wrong');
          else o.classList.add('dim');
        });
        if (persist) { saved[itemsIdx(item)] = chosenKey; store.set(key, saved); }
      }
      function itemsIdx(item) { return items.indexOf(item); }
      function refresh() {
        var done = 0, ok = 0;
        items.forEach(function (it, i) {
          if (saved[i] !== undefined) { done++; if (saved[i] === it.getAttribute('data-answer')) ok++; }
        });
        if (scoreEl) scoreEl.textContent = 'Đúng ' + ok + '/' + items.length + ' · đã trả lời ' + done;
        if (verdictEl) {
          if (done < items.length) verdictEl.textContent = '';
          else if (ok === items.length) verdictEl.textContent = 'Trọn vẹn — bạn sẵn sàng cho tuần kế tiếp.';
          else if (ok >= Math.ceil(items.length * 0.6)) verdictEl.textContent = 'Khá vững. Đọc lại phần giải thích của câu sai trước khi làm bài tập.';
          else verdictEl.textContent = 'Nên quay lại Layer C (mục tương ứng) rồi làm lại quiz.';
        }
        store.set(NS + 'quizscore:' + (qz.id || qi), { ok: ok, total: items.length, done: done });
      }
      items.forEach(function (item, i) {
        $$('.qz-opt', item).forEach(function (o) {
          o.addEventListener('click', function () {
            if (item.classList.contains('answered')) return;
            grade(item, o.getAttribute('data-key'), true);
            refresh();
          });
        });
        if (saved[i] !== undefined) grade(item, saved[i], false);
      });
      var rs = $('.qz-reset', qz);
      if (rs) rs.addEventListener('click', function () {
        saved = {}; store.del(key);
        items.forEach(function (item) {
          item.classList.remove('answered');
          $$('.qz-opt', item).forEach(function (o) {
            o.disabled = false; o.classList.remove('correct', 'wrong', 'dim');
          });
        });
        refresh();
      });
      refresh();
    });
  }

  /* ---------- reflection textarea (persist) ---------- */
  function initReflect() {
    $$('textarea.reflect').forEach(function (t, i) {
      var key = NS + 'reflect:' + (t.id || i);
      t.value = store.get(key, '');
      t.addEventListener('input', function () { store.set(key, t.value); });
    });
  }

  /* ---------- deep-dive tools ---------- */
  function initDD() {
    $$('.dd-tools').forEach(function (bar) {
      var scope = bar.parentElement;
      var open = $('[data-dd="open"]', bar), close = $('[data-dd="close"]', bar);
      if (open) open.addEventListener('click', function () { $$('details.dd', scope).forEach(function (d) { d.open = true; }); });
      if (close) close.addEventListener('click', function () { $$('details.dd', scope).forEach(function (d) { d.open = false; }); });
    });
  }

  /* ---------- SystemVerilog highlighter ---------- */
  var SV_KW = ['module', 'endmodule', 'input', 'output', 'inout', 'assign', 'always_ff', 'always_comb', 'always_latch', 'always', 'posedge', 'negedge', 'if', 'else', 'case', 'casez', 'casex', 'endcase', 'unique', 'priority', 'begin', 'end', 'typedef', 'enum', 'parameter', 'localparam', 'generate', 'endgenerate', 'genvar', 'for', 'while', 'repeat', 'forever', 'initial', 'final', 'function', 'endfunction', 'task', 'endtask', 'return', 'default', 'timeunit', 'timeprecision', 'package', 'endpackage', 'import', 'struct', 'packed', 'interface', 'endinterface', 'modport', 'wait', 'fork', 'join', 'disable', 'deassign', 'force', 'release'];
  var SV_TP = ['logic', 'wire', 'reg', 'bit', 'byte', 'int', 'integer', 'shortint', 'longint', 'time', 'real', 'signed', 'unsigned', 'string', 'void'];
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function highlightSV(src) {
    var out = '';
    var re = /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*")|(\$[A-Za-z_][\w$]*)|((?:\b\d[\d_]*)?'s?[bBoOdDhH][0-9a-fA-FxXzZ_?]+|'0\b|'1\b|\b\d[\d_]*(?:\.\d[\d_]*)?\b)|(\b[A-Za-z_][\w$]*\b)|(\n)|(.)/g;
    var m;
    while ((m = re.exec(src)) !== null) {
      if (m[1]) out += '<span class="cm">' + esc(m[1]) + '</span>';
      else if (m[2]) out += '<span class="st">' + esc(m[2]) + '</span>';
      else if (m[3]) out += '<span class="sys">' + esc(m[3]) + '</span>';
      else if (m[4]) out += '<span class="nb">' + esc(m[4]) + '</span>';
      else if (m[5]) {
        var w = m[5];
        if (SV_KW.indexOf(w) >= 0) out += '<span class="kw">' + w + '</span>';
        else if (SV_TP.indexOf(w) >= 0) out += '<span class="tp">' + w + '</span>';
        else {
          // tên module/instance sau từ khóa module hoặc trước dấu ( ở ngữ cảnh khai báo — đơn giản: tô tên sau "module"
          out += w;
        }
      }
      else out += esc(m[6] || m[7] || '');
    }
    return out;
  }
  function initCode() {
    $$('pre.code').forEach(function (pre) {
      if (pre.getAttribute('data-nohl') !== null && pre.getAttribute('data-nohl') !== undefined) return;
      if (pre.classList.contains('bughunt')) return; // bughunt tự xử lý
      var codeEl = pre.querySelector('code') || pre;
      var txt = codeEl.textContent;
      var html = highlightSV(txt);
      // tô tên sau "module "
      html = html.replace(/(<span class="kw">module<\/span>\s+)([A-Za-z_][\w$]*)/g, '$1<span class="fn">$2</span>');
      codeEl.innerHTML = html;
    });
  }

  /* ---------- widget: counter stepper ----------
     <div class="widget" data-widget="counter" data-bits="4" data-mod="16"> */
  function initCounter() {
    $$('[data-widget="counter"]').forEach(function (w) {
      var bits = parseInt(w.getAttribute('data-bits') || '4', 10);
      var mod = parseInt(w.getAttribute('data-mod') || String(Math.pow(2, bits)), 10);
      var val = 0, en = true;
      var row = document.createElement('div'); row.className = 'wrow';
      var bitsWrap = document.createElement('div'); bitsWrap.className = 'wrow';
      var stat = document.createElement('span'); stat.className = 'wstat';
      var wrapMsg = document.createElement('span'); wrapMsg.className = 'small muted';
      var boxes = [];
      for (var i = bits - 1; i >= 0; i--) {
        var bb = document.createElement('div'); bb.className = 'bitbox';
        bb.innerHTML = '<div class="b">0</div><small>Q' + i + '</small>';
        bitsWrap.appendChild(bb); boxes.push(bb);
      }
      var btnClk = document.createElement('button'); btnClk.className = 'wbtn'; btnClk.textContent = '⬆ cạnh clock';
      var btnRst = document.createElement('button'); btnRst.className = 'wbtn alt'; btnRst.textContent = 'rst_n = 0';
      var btnEn = document.createElement('button'); btnEn.className = 'wbtn alt'; btnEn.textContent = 'enable: ON';
      function render(wrapped) {
        for (var i = 0; i < bits; i++) {
          var bit = (val >> (bits - 1 - i)) & 1;
          var b = boxes[i].querySelector('.b');
          b.textContent = bit; b.classList.toggle('on', bit === 1);
        }
        stat.textContent = 'count = ' + String(val) + ' (dec)';
        wrapMsg.textContent = wrapped ? '↩ wrap: ' + (mod - 1) + ' → 0 (so sánh == ' + (mod - 1) + ' rồi nạp 0)' : '';
      }
      btnClk.addEventListener('click', function () {
        if (!en) { render(false); return; }
        var wrapped = (val === mod - 1);
        val = wrapped ? 0 : val + 1; render(wrapped);
      });
      btnRst.addEventListener('click', function () { val = 0; render(false); });
      btnEn.addEventListener('click', function () { en = !en; btnEn.textContent = 'enable: ' + (en ? 'ON' : 'OFF'); });
      row.appendChild(btnClk); row.appendChild(btnRst); row.appendChild(btnEn); row.appendChild(stat); row.appendChild(wrapMsg);
      w.appendChild(bitsWrap); w.appendChild(row);
      render(false);
    });
  }

  /* ---------- widget: 7-segment ---------- */
  var SEG_MAP = [0x3F, 0x06, 0x5B, 0x4F, 0x66, 0x6D, 0x7D, 0x07, 0x7F, 0x6F]; // gfedcba, active-high
  function seg7svg(scale) {
    var s = scale || 1;
    // segment polygons (a..g) trên lưới 100x170
    var P = {
      a: '20,10 80,10 70,22 30,22', b: '82,12 94,24 94,72 82,80 76,68 76,28',
      c: '82,90 94,98 94,146 82,158 76,140 76,100', d: '30,148 70,148 80,160 20,160',
      e: '6,98 18,90 24,100 24,140 18,158 6,146', f: '6,24 18,12 24,28 24,68 18,80 6,72',
      g: '22,79 30,73 70,73 78,79 70,97 30,97'
    };
    var svg = '<svg class="seg7" width="' + (100 * s) + '" height="' + (170 * s) + '" viewBox="0 0 100 170">';
    ['a', 'b', 'c', 'd', 'e', 'f', 'g'].forEach(function (k, i) {
      svg += '<polygon data-seg="' + i + '" points="' + P[k] + '"/>';
    });
    return svg + '</svg>';
  }
  function seg7set(el, mask) {
    $$('polygon', el).forEach(function (p) {
      var i = parseInt(p.getAttribute('data-seg'), 10);
      p.classList.toggle('on', ((mask >> i) & 1) === 1);
    });
  }
  /* <div class="widget" data-widget="seg7"> — digit stepper 0-9 + hiển thị mask */
  function initSeg7() {
    $$('[data-widget="seg7"]').forEach(function (w) {
      var d = 0;
      var holder = document.createElement('div'); holder.className = 'wrow';
      var segWrap = document.createElement('div'); segWrap.innerHTML = seg7svg(0.72);
      var stat = document.createElement('span'); stat.className = 'wstat';
      var btn = document.createElement('button'); btn.className = 'wbtn'; btn.textContent = 'bcd + 1';
      function render() {
        seg7set(segWrap, SEG_MAP[d]);
        var bin = ('0000' + d.toString(2)).slice(-4);
        var m = ('0000000' + SEG_MAP[d].toString(2)).slice(-7);
        stat.innerHTML = 'bcd = ' + bin + ' (' + d + ') → seg[6:0] = ' + m + ' <small>(g f e d c b a)</small>';
      }
      btn.addEventListener('click', function () { d = (d + 1) % 10; render(); });
      holder.appendChild(segWrap); holder.appendChild(stat); holder.appendChild(btn);
      w.appendChild(holder); render();
    });
  }

  /* ---------- widget: FSM stepper (config JSON) ----------
     <div class="widget" data-widget="fsm">
       <script type="application/json">{"initial":"S0",
         "states":{"S0":{"label":"S0","out":"0"},…},
         "inputs":["0","1"],
         "next":{"S0":{"0":"S0","1":"S1"},…}}</script></div> */
  function initFSM() {
    $$('[data-widget="fsm"]').forEach(function (w) {
      var cfgEl = w.querySelector('script[type="application/json"]');
      if (!cfgEl) return;
      var cfg; try { cfg = JSON.parse(cfgEl.textContent); } catch (e) { return; }
      var cur = cfg.initial, hist = '';
      var stWrap = document.createElement('div'); stWrap.className = 'fsm-states';
      var pills = {};
      Object.keys(cfg.states).forEach(function (id) {
        var p = document.createElement('span'); p.className = 'fsm-st';
        p.textContent = cfg.states[id].label || id;
        stWrap.appendChild(p); pills[id] = p;
      });
      var row = document.createElement('div'); row.className = 'wrow';
      var outStat = document.createElement('span'); outStat.className = 'wstat';
      cfg.inputs.forEach(function (inp) {
        var b = document.createElement('button'); b.className = 'wbtn';
        b.textContent = 'din = ' + inp + ' rồi ⬆clk';
        b.addEventListener('click', function () {
          cur = (cfg.next[cur] && cfg.next[cur][inp] !== undefined) ? cfg.next[cur][inp] : cur;
          hist += inp; render();
        });
        row.appendChild(b);
      });
      var rst = document.createElement('button'); rst.className = 'wbtn alt'; rst.textContent = 'rst_n = 0';
      rst.addEventListener('click', function () { cur = cfg.initial; hist = ''; render(); });
      row.appendChild(rst); row.appendChild(outStat);
      var log = document.createElement('div'); log.className = 'fsm-log';
      function render() {
        Object.keys(pills).forEach(function (id) {
          pills[id].classList.toggle('cur', id === cur);
          pills[id].classList.toggle('out1', id === cur && cfg.states[id].out === '1');
        });
        outStat.textContent = 'state = ' + cur + ' · output = ' + (cfg.states[cur].out || '0');
        log.textContent = hist ? 'chuỗi đã nhập: ' + hist : 'chưa nhập bit nào (đang ở trạng thái reset)';
      }
      w.appendChild(stWrap); w.appendChild(row); w.appendChild(log);
      render();
    });
  }

  /* ---------- widget: traffic phase stepper ----------
     <div class="widget" data-widget="traffic" data-green="6" data-yellow="2" data-seg="0"> */
  function initTraffic() {
    $$('[data-widget="traffic"]').forEach(function (w) {
      var G = parseInt(w.getAttribute('data-green') || '6', 10);
      var Y = parseInt(w.getAttribute('data-yellow') || '2', 10);
      var useSeg = w.getAttribute('data-seg') === '1';
      var phases = [
        { id: 'GREEN_NS', ns: 'g', ew: 'r', dur: G },
        { id: 'YELLOW_NS', ns: 'y', ew: 'r', dur: Y },
        { id: 'GREEN_EW', ns: 'r', ew: 'g', dur: G },
        { id: 'YELLOW_EW', ns: 'r', ew: 'y', dur: Y }
      ];
      var pi = 0, t = phases[0].dur - 1, timerId = null;
      var lights = document.createElement('div'); lights.className = 'tl-lights';
      function lampCol(name) {
        var col = document.createElement('div'); col.className = 'tl-col';
        col.innerHTML = '<div class="lamp-set"><div class="lamp r"></div><div class="lamp y"></div><div class="lamp g"></div></div><small>' + name + '</small>';
        return col;
      }
      var nsCol = lampCol('Bắc–Nam (NS)'), ewCol = lampCol('Đông–Tây (EW)');
      lights.appendChild(nsCol); lights.appendChild(ewCol);
      var segWrap = null;
      if (useSeg) { segWrap = document.createElement('div'); segWrap.innerHTML = seg7svg(0.6); segWrap.className = ''; lights.appendChild(segWrap); }
      var stat = document.createElement('span'); stat.className = 'wstat';
      var row = document.createElement('div'); row.className = 'wrow';
      var btnTick = document.createElement('button'); btnTick.className = 'wbtn'; btnTick.textContent = 'tick (1 giây)';
      var btnRun = document.createElement('button'); btnRun.className = 'wbtn alt'; btnRun.textContent = '▶ tự chạy';
      var btnRst = document.createElement('button'); btnRst.className = 'wbtn alt'; btnRst.textContent = 'rst_n = 0';
      function setLamp(col, color) {
        ['r', 'y', 'g'].forEach(function (c) {
          col.querySelector('.lamp.' + c).classList.toggle('on', c === color);
        });
      }
      function render() {
        var ph = phases[pi];
        setLamp(nsCol, ph.ns); setLamp(ewCol, ph.ew);
        stat.textContent = 'state = ' + ph.id + ' · time_left = ' + t;
        if (segWrap) seg7set(segWrap, SEG_MAP[Math.min(t, 9)]);
      }
      function tick() {
        if (t === 0) { pi = (pi + 1) % 4; t = phases[pi].dur - 1; }
        else t--;
        render();
      }
      btnTick.addEventListener('click', tick);
      btnRst.addEventListener('click', function () { pi = 0; t = phases[0].dur - 1; render(); });
      btnRun.addEventListener('click', function () {
        if (timerId) { clearInterval(timerId); timerId = null; btnRun.textContent = '▶ tự chạy'; }
        else { timerId = setInterval(tick, 700); btnRun.textContent = '⏸ dừng'; }
      });
      row.appendChild(btnTick); row.appendChild(btnRun); row.appendChild(btnRst); row.appendChild(stat);
      w.appendChild(lights); w.appendChild(row);
      render();
    });
  }

  /* ---------- widget: truth-table điền ô ----------
     td.tt-cell data-exp="0|1" ; nút .tt-check trong cùng .widget */
  function initTT() {
    $$('[data-widget="tt"]').forEach(function (w) {
      var cells = $$('.tt-cell', w);
      cells.forEach(function (c) {
        c.classList.add('unk'); c.textContent = '?';
        c.addEventListener('click', function () {
          c.classList.remove('ok', 'bad');
          var v = c.textContent;
          c.textContent = v === '?' ? '0' : (v === '0' ? '1' : '?');
          c.classList.toggle('unk', c.textContent === '?');
        });
      });
      var btn = $('.tt-check', w), out = $('.tt-out', w);
      if (btn) btn.addEventListener('click', function () {
        var ok = 0;
        cells.forEach(function (c) {
          var good = c.textContent === c.getAttribute('data-exp');
          c.classList.toggle('ok', good); c.classList.toggle('bad', !good);
          if (good) ok++;
        });
        if (out) out.textContent = 'Đúng ' + ok + '/' + cells.length + (ok === cells.length ? ' — chuẩn!' : ' — ô đỏ là ô sai, thử suy luận lại.');
      });
    });
  }

  /* ---------- widget: wave reveal ---------- */
  function initWaveReveal() {
    $$('.wr').forEach(function (w) {
      var btn = $('.wr-btn', w);
      if (btn) btn.addEventListener('click', function () {
        w.classList.toggle('open');
        btn.textContent = w.classList.contains('open') ? 'Ẩn đáp án' : (btn.getAttribute('data-label') || 'Hiện đáp án');
      });
    });
  }

  /* ---------- widget: bug hunt ----------
     pre.code.bughunt > span.bh-line[data-bug][data-msg] ; .bh-out ; data-total tự tính */
  function initBugHunt() {
    $$('.bughunt').forEach(function (pre) {
      var out = pre.parentElement.querySelector('.bh-out');
      var bugs = $$('.bh-line[data-bug]', pre).length;
      var found = 0;
      $$('.bh-line', pre).forEach(function (ln) {
        ln.addEventListener('click', function () {
          if (ln.getAttribute('data-bug') !== null && ln.getAttribute('data-bug') !== undefined) {
            if (!ln.classList.contains('hit')) { ln.classList.add('hit'); found++; }
            if (out) {
              out.classList.add('good');
              out.textContent = '🐞 Trúng (' + found + '/' + bugs + '): ' + (ln.getAttribute('data-msg') || '');
            }
          } else {
            ln.classList.add('miss');
            setTimeout(function () { ln.classList.remove('miss'); }, 600);
            if (out) { out.classList.remove('good'); out.textContent = 'Dòng này không có lỗi — đọc kỹ lại phần gán và reset.'; }
          }
        });
      });
    });
  }

  /* ---------- widget: UART frame ----------
     <div class="widget" data-widget="uart" data-default="A"> */
  function initUART() {
    $$('[data-widget="uart"]').forEach(function (w) {
      var row = document.createElement('div'); row.className = 'wrow';
      var inp = document.createElement('input'); inp.className = 'winput'; inp.maxLength = 1;
      inp.value = w.getAttribute('data-default') || 'A';
      var sel = document.createElement('select'); sel.className = 'winput';
      [9600, 19200, 38400, 115200].forEach(function (b) {
        var o = document.createElement('option'); o.value = b; o.textContent = b + ' baud'; sel.appendChild(o);
      });
      var stat = document.createElement('span'); stat.className = 'wstat';
      var bits = document.createElement('div'); bits.className = 'uf-bits';
      function render() {
        var ch = inp.value || 'A'; var code = ch.charCodeAt(0) & 0xFF;
        var baud = parseInt(sel.value, 10);
        var btime = 1e6 / baud;
        var frame = [{ v: 1, l: 'idle', c: 'hi' }, { v: 0, l: 'START', c: 'lo start' }];
        for (var i = 0; i < 8; i++) {
          var b = (code >> i) & 1; // LSB first
          frame.push({ v: b, l: 'D' + i, c: b ? 'hi' : 'lo' });
        }
        frame.push({ v: 1, l: 'STOP', c: 'hi stop' });
        frame.push({ v: 1, l: 'idle', c: 'hi' });
        bits.innerHTML = '';
        frame.forEach(function (f) {
          var d = document.createElement('div'); d.className = 'uf-bit ' + f.c;
          d.innerHTML = '<div class="v">' + f.v + '</div><small>' + f.l + '</small>';
          bits.appendChild(d);
        });
        var bin = ('00000000' + code.toString(2)).slice(-8);
        stat.innerHTML = "'" + ch + "' = 0x" + code.toString(16).toUpperCase() + ' = ' + bin +
          ' · bit time ≈ ' + (btime >= 100 ? btime.toFixed(1) : btime.toFixed(2)) + ' µs · khung 10 bit ≈ ' + (btime * 10 / 1000).toFixed(2) + ' ms';
      }
      inp.addEventListener('input', render); sel.addEventListener('change', render);
      row.appendChild(inp); row.appendChild(sel); row.appendChild(stat);
      w.appendChild(row); w.appendChild(bits);
      render();
    });
  }

  /* ---------- init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initMentor(); initScroll(); initChecklists(); initQuiz(); initReflect(); initDD();
    initCode(); initCounter(); initSeg7(); initFSM(); initTraffic(); initTT();
    initWaveReveal(); initBugHunt(); initUART();
  });
})();
