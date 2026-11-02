/* Mini-renderizador Markdown (subset) — sem dependências, funciona offline.
   Suporta: # títulos, listas (- e 1.), **negrito**, *itálico*, `código`, blocos ``` ,
   tabelas | a | b |, > citações/dicas, [texto](url), HTML bruto e linhas em branco. */
(function () {
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function inline(s) {
    // protege trechos de código
    var codes = [];
    s = s.replace(/`([^`]+)`/g, function (_, c) { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
    s = s.replace(/==([^=]+)==/g, '<mark>$1</mark>');
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    s = s.replace(/\u0000(\d+)\u0000/g, function (_, i) { return '<code>' + esc(codes[+i]) + '</code>'; });
    return s;
  }
  function render(md) {
    if (!md) return '';
    var lines = md.replace(/\r/g, '').split('\n');
    // remove indentação comum
    var minIndent = Infinity;
    lines.forEach(function (l) { if (l.trim()) { var m = l.match(/^ */)[0].length; if (m < minIndent) minIndent = m; } });
    if (minIndent !== Infinity && minIndent > 0) lines = lines.map(function (l) { return l.slice(minIndent); });
    var out = [], i = 0;
    while (i < lines.length) {
      var line = lines[i];
      if (!line.trim()) { i++; continue; }
      if (/^```/.test(line)) {
        var lang = line.slice(3).trim(), buf = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++;
        out.push('<pre class="code"' + (lang ? ' data-lang="' + lang + '"' : '') + '><code>' + esc(buf.join('\n')) + '</code></pre>');
        continue;
      }
      var h = line.match(/^(#{1,4})\s+(.*)$/);
      if (h) { var lv = h[1].length + 1; out.push('<h' + lv + '>' + inline(h[2]) + '</h' + lv + '>'); i++; continue; }
      if (/^\s*\|/.test(line)) {
        var rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) { rows.push(lines[i].trim()); i++; }
        var cells = function (r) { return r.replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); }); };
        var html = '<div class="table-wrap"><table>';
        var head = cells(rows[0]);
        var start = 1;
        if (rows[1] && /^\|?\s*:?-+/.test(rows[1])) { html += '<thead><tr>' + head.map(function (c) { return '<th>' + inline(c) + '</th>'; }).join('') + '</tr></thead>'; start = 2; }
        else start = 0;
        html += '<tbody>';
        for (var r = start; r < rows.length; r++) html += '<tr>' + cells(rows[r]).map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>';
        out.push(html + '</tbody></table></div>');
        continue;
      }
      if (/^>\s?/.test(line)) {
        var q = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) { q.push(lines[i].replace(/^>\s?/, '')); i++; }
        var txt = q.join(' ');
        var cls = 'callout';
        var m = txt.match(/^\[!(\w+)\]\s*/);
        if (m) { cls += ' ' + m[1].toLowerCase(); txt = txt.slice(m[0].length); }
        out.push('<div class="' + cls + '">' + inline(txt) + '</div>');
        continue;
      }
      if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
        // listas aninhadas por indentação (2 espaços)
        var stack = [];
        while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
          var lm = lines[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
          var depth = Math.floor(lm[1].length / 2);
          var tag = /\d/.test(lm[2]) ? 'ol' : 'ul';
          while (stack.length > depth + 1) { out.push('</li></' + stack.pop() + '>'); }
          if (stack.length === depth + 1) out.push('</li>');
          while (stack.length < depth + 1) { out.push('<' + tag + '>'); stack.push(tag); }
          out.push('<li>' + inline(lm[3]));
          i++;
        }
        while (stack.length) out.push('</li></' + stack.pop() + '>');
        continue;
      }
      if (/^\s*</.test(line)) { // HTML bruto
        var hb = [];
        while (i < lines.length && lines[i].trim()) { hb.push(lines[i]); i++; }
        out.push(hb.join('\n'));
        continue;
      }
      var p = [];
      while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|>|\s*\||\s*([-*]|\d+\.)\s+)/.test(lines[i])) { p.push(lines[i].trim()); i++; }
      out.push('<p>' + inline(p.join(' ')) + '</p>');
    }
    return out.join('\n');
  }
  window.MD = { render: render, inline: inline, esc: esc };
})();
