/* Renderizador de mapas mentais em SVG (offline, sem bibliotecas).
   Entrada: texto indentado (2 espaços por nível). A primeira linha é a raiz.
   Os ramos de 1º nível são distribuídos à direita e à esquerda da raiz. */
(function () {
  var PALETTE = ['#2563eb', '#0d9488', '#d97706', '#db2777', '#7c3aed', '#16a34a', '#dc2626', '#0891b2', '#9333ea', '#ca8a04'];
  var LINE_H = 30, CH_W = 6.9, PAD_X = 10, GAP_X = 38, MAX_CH = 34;

  function parse(text) {
    var lines = text.replace(/\r/g, '').split('\n').filter(function (l) { return l.trim(); });
    var base = lines.length ? lines[0].match(/^ */)[0].length : 0;
    var root = null, stack = [];
    lines.forEach(function (l) {
      var depth = Math.floor((l.match(/^ */)[0].length - base) / 2);
      var node = { t: l.trim(), c: [], open: true };
      if (!root) { root = node; stack = [node]; return; }
      depth = Math.max(1, Math.min(depth, stack.length));
      stack.length = depth;
      stack[depth - 1].c.push(node);
      stack.push(node);
    });
    return root;
  }
  function wrap(t) {
    var words = t.split(' '), lines = [], cur = '';
    words.forEach(function (w) {
      if ((cur + ' ' + w).trim().length > MAX_CH && cur) { lines.push(cur); cur = w; }
      else cur = (cur + ' ' + w).trim();
    });
    if (cur) lines.push(cur);
    return lines;
  }
  function measure(n, depth) {
    n.lines = wrap(n.t);
    var maxLen = Math.max.apply(null, n.lines.map(function (l) { return l.length; }));
    var fs = depth === 0 ? 1.25 : depth === 1 ? 1.08 : 1;
    n.w = Math.round(maxLen * CH_W * fs + PAD_X * 2);
    n.h = Math.round(n.lines.length * 16 * fs + 12);
    n.depth = depth;
    (n.open ? n.c : []).forEach(function (c) { measure(c, depth + 1); });
  }
  // altura ocupada pela subárvore
  function span(n) {
    var kids = n.open ? n.c : [];
    if (!kids.length) return Math.max(n.h + 8, LINE_H);
    var s = kids.reduce(function (a, c) { return a + span(c); }, 0);
    return Math.max(s, n.h + 8);
  }
  function place(n, x, yTop, dir) {
    var s = span(n);
    n.x = x; n.y = yTop + s / 2; n.dir = dir;
    var kids = n.open ? n.c : [];
    var colW = n.w;
    var cy = yTop + (s - kids.reduce(function (a, c) { return a + span(c); }, 0)) / 2;
    kids.forEach(function (c) {
      var cx = dir > 0 ? x + colW + GAP_X : x - GAP_X - c.w;
      place(c, cx, cy, dir);
      cy += span(c);
    });
  }
  function render(container, text, opts) {
    opts = opts || {};
    var root = typeof text === 'string' ? parse(text) : text;
    if (!root) return;
    var zoom = 1;
    function draw() {
      measure(root, 0);
      var kids = root.c;
      // distribui ramos equilibrando altura
      var right = [], left = [], hr = 0, hl = 0;
      kids.forEach(function (c, i) {
        c.color = PALETTE[i % PALETTE.length];
        var sp = span(c);
        if (hr <= hl) { right.push(c); hr += sp; } else { left.push(c); hl += sp; }
      });
      var H = Math.max(hr, hl, root.h + 20);
      root.x = 0; root.y = H / 2;
      var y = (H - hr) / 2;
      right.forEach(function (c) { place(c, root.w + GAP_X, y, 1); y += span(c); });
      y = (H - hl) / 2;
      left.forEach(function (c) { place(c, -GAP_X - c.w, y, -1); y += span(c); });
      // limites
      var minX = 0, maxX = root.w, minY = 0, maxY = H;
      var nodes = [];
      (function walk(n, color) {
        n.color = n.color || color;
        nodes.push(n);
        minX = Math.min(minX, n.x); maxX = Math.max(maxX, n.x + n.w);
        minY = Math.min(minY, n.y - n.h / 2); maxY = Math.max(maxY, n.y + n.h / 2);
        (n.open ? n.c : []).forEach(function (c) { walk(c, n.color); });
      })(root, '#334155');
      var m = 16, W = maxX - minX + 2 * m, HH = maxY - minY + 2 * m;
      var svg = ['<svg xmlns="http://www.w3.org/2000/svg" class="mm-svg" viewBox="' + (minX - m) + ' ' + (minY - m) + ' ' + W + ' ' + HH + '" width="' + Math.round(W * zoom) + '" height="' + Math.round(HH * zoom) + '" role="img" aria-label="Mapa mental: ' + MD.esc(root.t) + '">'];
      // ligações
      nodes.forEach(function (n) {
        (n.open ? n.c : []).forEach(function (c) {
          var x1 = n.dir === -1 || (n === root && c.dir === -1) ? n.x : n.x + n.w;
          var x2 = c.dir === -1 ? c.x + c.w : c.x;
          var y1 = n.y, y2 = c.y, mx = (x1 + x2) / 2;
          svg.push('<path d="M' + x1 + ' ' + y1 + ' C' + mx + ' ' + y1 + ' ' + mx + ' ' + y2 + ' ' + x2 + ' ' + y2 + '" fill="none" stroke="' + c.color + '" stroke-width="' + (n === root ? 3 : 1.8) + '" stroke-opacity=".75"/>');
        });
      });
      nodes.forEach(function (n, idx) {
        var isRoot = n === root, d1 = n.depth === 1;
        var fill = isRoot ? 'var(--mm-root)' : d1 ? n.color : 'var(--mm-node)';
        var stroke = isRoot ? 'none' : n.color;
        var tc = isRoot || d1 ? '#fff' : 'var(--text)';
        var fs = isRoot ? 15 : d1 ? 13.5 : 12.5;
        var hasKids = n.c.length > 0;
        svg.push('<g class="mm-node' + (hasKids ? ' has-kids' : '') + '" data-i="' + idx + '" tabindex="' + (hasKids ? 0 : -1) + '">');
        svg.push('<rect x="' + n.x + '" y="' + (n.y - n.h / 2) + '" width="' + n.w + '" height="' + n.h + '" rx="' + (isRoot ? 14 : 9) + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.5"/>');
        n.lines.forEach(function (l, li) {
          var ty = n.y - (n.lines.length - 1) * 8 * (fs / 12.5) + li * 16 * (fs / 12.5) + 4.5;
          svg.push('<text x="' + (n.x + n.w / 2) + '" y="' + ty + '" text-anchor="middle" font-size="' + fs + '" font-weight="' + (isRoot || d1 ? 700 : 500) + '" fill="' + tc + '">' + MD.esc(l) + '</text>');
        });
        if (hasKids && !n.open) {
          var bx = n.dir === -1 ? n.x - 9 : n.x + n.w + 9;
          svg.push('<circle cx="' + bx + '" cy="' + n.y + '" r="8" fill="' + n.color + '"/><text x="' + bx + '" y="' + (n.y + 4) + '" text-anchor="middle" font-size="11" fill="#fff" font-weight="700">' + n.c.length + '</text>');
        }
        svg.push('</g>');
      });
      svg.push('</svg>');
      stage.innerHTML = svg.join('');
      stage.querySelectorAll('.mm-node.has-kids').forEach(function (g) {
        var toggle = function () { var n = nodes[+g.dataset.i]; if (n === root) return; n.open = !n.open; draw(); };
        g.addEventListener('click', toggle);
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
      });
    }
    container.innerHTML = '<div class="mm-tools"><button class="btn tiny" data-z="-1" aria-label="Diminuir">−</button><button class="btn tiny" data-z="0">Ajustar</button><button class="btn tiny" data-z="1" aria-label="Aumentar">+</button><button class="btn tiny" data-z="c">Recolher/expandir</button><button class="btn tiny" data-z="f">Tela cheia</button></div><div class="mm-stage"></div><p class="mm-hint">Toque nos ramos para recolher/expandir. Arraste para navegar.</p>';
    var stage = container.querySelector('.mm-stage');
    var allOpen = true;
    container.querySelector('.mm-tools').addEventListener('click', function (e) {
      var z = e.target.dataset.z; if (z == null) return;
      if (z === '1') zoom = Math.min(2.5, zoom * 1.25);
      else if (z === '-1') zoom = Math.max(0.3, zoom / 1.25);
      else if (z === '0') { zoom = 1; fit(); return; }
      else if (z === 'c') { allOpen = !allOpen; root.c.forEach(function (c) { c.open = allOpen; }); }
      else if (z === 'f') { container.classList.toggle('mm-full'); fit(); return; }
      draw();
    });
    // arrastar para rolar (mouse)
    var drag = null;
    stage.addEventListener('mousedown', function (e) { drag = { x: e.clientX, y: e.clientY, l: stage.scrollLeft, t: stage.scrollTop }; stage.classList.add('dragging'); });
    window.addEventListener('mouseup', function () { drag = null; stage.classList.remove('dragging'); });
    stage.addEventListener('mousemove', function (e) { if (!drag) return; stage.scrollLeft = drag.l - (e.clientX - drag.x); stage.scrollTop = drag.t - (e.clientY - drag.y); });
    function fit() {
      draw();
      var svgEl = stage.querySelector('svg');
      var vb = svgEl.viewBox.baseVal;
      var avail = stage.clientWidth - 8;
      zoom = Math.max(0.45, Math.min(1.2, avail / vb.width));
      draw();
      stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2;
    }
    fit();
  }
  window.MindMap = { render: render, parse: parse };
})();
