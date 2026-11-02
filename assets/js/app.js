/* TRT4 TI — aplicação de estudos (SPA com rotas por hash). */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = MD.esc;
  var main = $('#main');
  var S = Store;
  var LETTERS = ['A', 'B', 'C', 'D', 'E'];
  var STATUS = ['Não estudado', 'Estudado', 'Revisado', 'Dominado'];

  /* ---------- índices ---------- */
  var discById = {};
  DATA.disciplines.forEach(function (d) { discById[d.id] = d; d.topics = []; });
  // ordem dos tópicos segue o edital verticalizado
  DATA.disciplines.forEach(function (d) {
    (DATA.edital[d.id] || []).forEach(function (it) {
      if (DATA.topics[it[1]] && d.topics.indexOf(it[1]) < 0) d.topics.push(it[1]);
    });
  });
  Object.keys(DATA.topics).forEach(function (id) {
    var t = DATA.topics[id];
    if (discById[t.disc] && discById[t.disc].topics.indexOf(id) < 0) discById[t.disc].topics.push(id);
  });
  var qByTopic = {}, qById = {};
  DATA.questions.forEach(function (q) {
    (qByTopic[q.topic] = qByTopic[q.topic] || []).push(q);
    qById[q.id] = q;
  });
  var allCards = [];
  DATA.disciplines.forEach(function (d) {
    d.topics.forEach(function (tid) {
      (DATA.topics[tid].cards || []).forEach(function (c, i) {
        allCards.push({ id: tid + '#' + i, topic: tid, disc: d.id, f: c[0], b: c[1] });
      });
    });
  });
  var GERAIS = ['port', 'mat', 'leg', 'dh'];
  function isGeral(disc) { return GERAIS.indexOf(disc) >= 0; }

  /* ---------- utilidades ---------- */
  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toast.tm); toast.tm = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function norm(s) { return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function pct(a, b) { return b ? Math.round(a * 100 / b) : 0; }
  function daysLeft() { return Math.ceil((new Date(DATA.exam.provaDate) - new Date()) / 864e5); }
  function topicStats(tid) {
    var qs = qByTopic[tid] || [], done = 0, ok = 0;
    qs.forEach(function (q) { var a = S.s.answers[q.id]; if (a) { done++; if (a.last) ok++; } });
    return { total: qs.length, done: done, ok: ok };
  }
  function discStats(did) {
    var d = discById[did], st = 0, q = 0, qd = 0, qok = 0;
    d.topics.forEach(function (tid) {
      if (S.topicStatus(tid) > 0) st++;
      var ts = topicStats(tid); q += ts.total; qd += ts.done; qok += ts.ok;
    });
    var items = DATA.edital[did] || [], ed = 0;
    items.forEach(function (_, i) { if (S.s.edital[did + ':' + i]) ed++; });
    return { topics: d.topics.length, studied: st, q: q, qd: qd, qok: qok, edital: items.length, editalDone: ed };
  }
  function globalStats() {
    var tot = { topics: 0, studied: 0, q: 0, qd: 0, qok: 0, edital: 0, editalDone: 0 };
    DATA.disciplines.forEach(function (d) { var s = discStats(d.id); Object.keys(tot).forEach(function (k) { tot[k] += s[k]; }); });
    var answered = 0, correct = 0;
    Object.keys(S.s.answers).forEach(function (k) { answered += S.s.answers[k].tries; correct += S.s.answers[k].correct; });
    tot.answered = answered; tot.correct = correct;
    return tot;
  }
  function bar(p) { return '<div class="progress" role="progressbar" aria-valuenow="' + p + '" aria-valuemin="0" aria-valuemax="100"><i style="width:' + p + '%"></i></div>'; }
  function set(html) { main.innerHTML = html; main.focus({ preventScroll: true }); window.scrollTo(0, 0); }
  function download(name, text, type) {
    var blob = new Blob([text], { type: type || 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ---------- diagramas SVG (inline para herdar o tema) ---------- */
  var svgCache = {};
  function loadDiagrams(root) {
    $$('[data-svg]', root).forEach(function (el) {
      var src = el.dataset.svg;
      var put = function (txt) { el.innerHTML = txt; };
      if (svgCache[src]) return put(svgCache[src]);
      fetch(src).then(function (r) { return r.text(); }).then(function (txt) {
        if (txt.indexOf('<svg') < 0) throw new Error('svg inválido');
        svgCache[src] = txt; put(txt);
      }).catch(function () { el.innerHTML = '<p class="muted small">Diagrama indisponível offline. Abra uma vez com internet para salvá-lo.</p>'; });
    });
  }
  function diagramsHtml(list) {
    return (list || []).map(function (d) {
      return '<figure class="diagram"><div data-svg="assets/img/' + d.src + '" role="img" aria-label="' + esc(d.cap) + '"></div><figcaption>' + esc(d.cap) + '</figcaption></figure>';
    }).join('');
  }

  /* ---------- componente de questão ---------- */
  function questionHtml(q, n, opts) {
    opts = opts || {};
    var t = DATA.topics[q.topic] || {};
    var d = discById[q.disc] || {};
    var a = S.s.answers[q.id];
    var badge = a ? (a.last ? '<span class="tag ok">Acertou da última vez</span>' : '<span class="tag bad">Errou da última vez</span>') : '';
    return '<article class="q" data-q="' + q.id + '">' +
      '<div class="q-head"><span class="tag blue">' + (n != null ? 'Questão ' + n : 'Questão') + '</span><span class="tag">' + esc(d.icon || '') + ' ' + esc(t.title || '') + '</span>' + (q.lvl ? '<span class="tag warn">' + esc(q.lvl) + '</span>' : '') + badge +
      '<span class="spacer"></span><button class="fav' + (S.s.favorites[q.id] ? ' on' : '') + '" data-fav="' + q.id + '" aria-label="Favoritar questão" title="Favoritar">⭐</button></div>' +
      '<div class="q-body">' + MD.render(q.q) + '</div>' +
      '<ul class="opts">' + q.o.map(function (o, i) {
        return '<li><button class="opt" data-i="' + i + '"><span class="l">' + LETTERS[i] + '</span><span>' + MD.inline(esc(o)) + '</span></button></li>';
      }).join('') + '</ul>' +
      '<div class="explain" hidden></div>' +
      (opts.noReveal ? '' : '<div class="row" style="margin-top:10px"><button class="btn small" data-act="confirm" disabled>Responder</button><span class="muted small">Dica: clique com o botão direito (ou toque longo) para riscar uma alternativa.</span></div>') +
      '</article>';
  }
  function reveal(card, q, choice) {
    var ok = choice === q.a;
    $$('.opt', card).forEach(function (b, i) {
      b.disabled = true;
      if (i === q.a) b.classList.add('right');
      else if (i === choice) b.classList.add('wrong');
    });
    var ex = $('.explain', card);
    ex.hidden = false;
    ex.innerHTML = '<p class="verdict ' + (ok ? 'ok' : 'bad') + '">' + (ok ? '✔ Correta!' : '✘ Incorreta.') + ' Gabarito: ' + LETTERS[q.a] + '</p>' + MD.render(q.e) +
      '<p class="small"><a href="#/topico/' + q.topic + '">📚 Revisar o resumo deste tópico</a></p>';
    var btn = $('[data-act="confirm"]', card); if (btn) btn.remove();
    return ok;
  }
  function bindQuestions(root, onAnswer) {
    root.addEventListener('click', function (e) {
      var fav = e.target.closest('[data-fav]');
      if (fav) { var on = S.toggleFav(fav.dataset.fav); fav.classList.toggle('on', on); toast(on ? 'Questão favoritada' : 'Removida dos favoritos'); return; }
      var opt = e.target.closest('.opt');
      var card = e.target.closest('.q');
      if (!card) return;
      var q = qById[card.dataset.q];
      if (opt && !opt.disabled) {
        if (opt.classList.contains('cut')) opt.classList.remove('cut');
        $$('.opt', card).forEach(function (b) { b.classList.remove('sel'); });
        opt.classList.add('sel');
        var cb = $('[data-act="confirm"]', card); if (cb) cb.disabled = false;
        if (card.dataset.instant) { doConfirm(); }
        return;
      }
      if (e.target.closest('[data-act="confirm"]')) doConfirm();
      function doConfirm() {
        var sel = $('.opt.sel', card); if (!sel) return;
        var choice = +sel.dataset.i;
        var ok = reveal(card, q, choice);
        S.answer(q.id, choice, ok);
        if (onAnswer) onAnswer(q, ok);
      }
    });
    root.addEventListener('contextmenu', function (e) {
      var opt = e.target.closest('.opt');
      if (opt && !opt.disabled) { e.preventDefault(); opt.classList.toggle('cut'); opt.classList.remove('sel'); }
    });
  }

  /* ---------- views ---------- */
  var views = {};

  views.inicio = function () {
    var g = globalStats();
    var dl = daysLeft();
    var td = S.s.days[S.today()] || { q: 0, c: 0 };
    var goal = S.s.goal || 30;
    var acc = pct(g.correct, g.answered);
    // próximo tópico a estudar
    var next = null;
    DATA.disciplines.some(function (d) { return d.topics.some(function (t) { if (S.topicStatus(t) === 0) { next = t; return true; } return false; }); });
    var due = allCards.filter(function (c) { var s = S.s.cards[c.id]; return s && s.due <= Date.now(); }).length;
    var wrong = Object.keys(S.s.answers).filter(function (k) { return S.s.answers[k].last === false && qById[k]; }).length;
    // heatmap 16 semanas
    var cells = [], d0 = new Date(); d0.setDate(d0.getDate() - 7 * 16 + 1);
    for (var i = 0; i < 7 * 16; i++) {
      var dd = new Date(d0); dd.setDate(d0.getDate() + i);
      var k = dd.getFullYear() + '-' + String(dd.getMonth() + 1).padStart(2, '0') + '-' + String(dd.getDate()).padStart(2, '0');
      var v = S.s.days[k] ? (S.s.days[k].q || 0) + (S.s.days[k].cards || 0) : 0;
      var l = v === 0 ? '' : v < 10 ? 'l1' : v < 25 ? 'l2' : v < 50 ? 'l3' : 'l4';
      cells.push('<i class="' + l + '" title="' + dd.toLocaleDateString('pt-BR') + ': ' + v + ' atividades"></i>');
    }
    set(
      '<section class="hero">' +
      '<svg class="hero-art" viewBox="0 0 200 200" aria-hidden="true"><g fill="none" stroke="#fff" stroke-width="6"><path d="M100 20 L180 60 L20 60 Z"/><path d="M35 70v80M70 70v80M130 70v80M165 70v80"/><path d="M20 160h160M10 180h180"/></g></svg>' +
      '<h1>Rumo ao TRT4 — Técnico Judiciário TI</h1>' +
      '<p>Plataforma completa e offline para a prova da FCC: resumos de todo o edital, mapas mentais, questões comentadas, simulados, flashcards e redação.</p>' +
      '<div class="hero-stats">' +
      '<div><b>' + (dl > 0 ? dl : 0) + '</b><span>dias para a prova (31/01/2027)</span></div>' +
      '<div><b>' + pct(g.studied, g.topics) + '%</b><span>do conteúdo estudado</span></div>' +
      '<div><b>' + g.answered + '</b><span>questões resolvidas</span></div>' +
      '<div><b>' + acc + '%</b><span>de acertos</span></div>' +
      '<div><b>' + S.streak() + '🔥</b><span>dias seguidos</span></div>' +
      '</div></section>' +
      '<div class="grid g3" style="margin-top:16px">' +
      '<div class="card"><h3>🎯 Meta de hoje</h3><div class="row"><div class="ring" style="--p:' + Math.min(100, pct(td.q, goal)) + '" data-label="' + td.q + '/' + goal + '"></div><div><p class="small muted" style="margin:0">questões resolvidas hoje</p><p style="margin:.3em 0 0"><a class="btn small" href="#/questoes">Resolver questões</a></p></div></div></div>' +
      '<div class="card"><h3>📚 Continue estudando</h3>' + (next ? '<p class="small muted" style="margin:0 0 8px">' + esc(discById[DATA.topics[next].disc].name) + '</p><p style="margin:0 0 10px"><strong>' + esc(DATA.topics[next].title) + '</strong></p><a class="btn small" href="#/topico/' + next + '">Abrir resumo</a>' : '<p>Você marcou todos os tópicos como estudados. Hora de revisar e fazer simulados!</p><a class="btn small" href="#/simulado">Fazer simulado</a>') + '</div>' +
      '<div class="card"><h3>🔁 Revisões pendentes</h3><p class="small" style="margin:0 0 6px"><b>' + due + '</b> flashcards para revisar</p><p class="small" style="margin:0 0 10px"><b>' + wrong + '</b> questões no caderno de erros</p><div class="row"><a class="btn small" href="#/flashcards">Revisar cards</a><a class="btn small ghost" href="#/erros">Refazer erros</a></div></div>' +
      '</div>' +
      '<div class="grid g2" style="margin-top:14px">' +
      '<div class="card"><h3>Progresso por disciplina</h3><div class="bars">' +
      DATA.disciplines.map(function (d) {
        var s = discStats(d.id);
        var p = Math.round((pct(s.studied, s.topics) + pct(s.editalDone, s.edital)) / 2);
        return '<div class="bar-row"><a href="#/disciplina/' + d.id + '" style="color:var(--text);text-decoration:none">' + d.icon + ' ' + esc(d.name.split(':')[0].split(',')[0]) + '</a>' + bar(p) + '<span class="small muted">' + p + '%</span></div>';
      }).join('') + '</div></div>' +
      '<div class="card"><h3>Atividade (16 semanas)</h3><div class="heat">' + cells.join('') + '</div><p class="small muted">Cada quadrado é um dia. Quanto mais escuro, mais questões e flashcards.</p>' +
      '<h3>Como é a prova</h3><table><tbody>' +
      '<tr><td>Conhecimentos Gerais</td><td>30 questões · peso 1</td></tr>' +
      '<tr><td>Conhecimentos Específicos</td><td>30 questões · peso 2</td></tr>' +
      '<tr><td>Redação</td><td>20–30 linhas · nota 0–10</td></tr>' +
      '<tr><td>Nota mínima</td><td>6,00 na objetiva e 6,00 na redação</td></tr>' +
      '<tr><td>Duração</td><td>4 horas (manhã)</td></tr></tbody></table></div>' +
      '</div>'
    );
  };

  views.edital = function () {
    var html = '<h1>Edital verticalizado</h1><p class="muted">Conteúdo programático oficial do cargo 22 (Anexo II do edital). Marque cada item quando dominá-lo. O link ao lado abre o resumo correspondente.</p>';
    var g = globalStats();
    html += '<div class="card"><div class="row"><strong>' + g.editalDone + ' de ' + g.edital + ' itens concluídos</strong><span class="spacer"></span><span class="muted">' + pct(g.editalDone, g.edital) + '%</span></div>' + bar(pct(g.editalDone, g.edital)) + '</div>';
    var lastGroup = '';
    DATA.disciplines.forEach(function (d) {
      if (d.group !== lastGroup) { html += '<h2>' + d.group + '</h2>'; lastGroup = d.group; }
      var s = discStats(d.id);
      html += '<details class="box"' + (s.editalDone < s.edital ? '' : '') + '><summary>' + d.icon + ' ' + esc(d.name) + ' <span class="tag">' + s.editalDone + '/' + s.edital + '</span></summary><div>' +
        DATA.edital[d.id].map(function (it, i) {
          var id = d.id + ':' + i, on = !!S.s.edital[id];
          return '<label class="edital-item' + (on ? ' done' : '') + '"><input type="checkbox" data-ed="' + id + '"' + (on ? ' checked' : '') + '><span>' + esc(it[0]) + '</span><span class="spacer"></span>' + (DATA.topics[it[1]] ? '<a href="#/topico/' + it[1] + '">resumo →</a>' : '') + '</label>';
        }).join('') + '</div></details>';
    });
    set(html);
    main.addEventListener('change', function onc(e) {
      if (!e.target.dataset.ed) return;
      var on = S.toggleEdital(e.target.dataset.ed);
      e.target.closest('.edital-item').classList.toggle('done', on);
    });
  };

  views.disciplinas = function () {
    var html = '<h1>Resumos, mapas mentais e diagramas</h1><p class="muted">Todo o conteúdo do edital organizado por disciplina. Cada tópico traz resumo, mapa mental interativo, flashcards e questões.</p>';
    var lastGroup = '';
    DATA.disciplines.forEach(function (d) {
      if (d.group !== lastGroup) { if (lastGroup) html += '</div>'; html += '<h2>' + d.group + (d.group.indexOf('Gerais') >= 0 ? ' <span class="tag">peso 1</span>' : ' <span class="tag blue">peso 2</span>') + '</h2><div class="grid g3">'; lastGroup = d.group; }
      var s = discStats(d.id);
      html += '<a class="card disc-card" style="--c:' + d.color + '" href="#/disciplina/' + d.id + '"><span class="ico">' + d.icon + '</span><h3>' + esc(d.name) + '</h3><span class="small muted">' + s.topics + ' tópicos · ' + s.q + ' questões</span>' + bar(pct(s.studied, s.topics)) + '<span class="small muted">' + s.studied + '/' + s.topics + ' estudados' + (s.qd ? ' · ' + pct(s.qok, s.qd) + '% de acerto' : '') + '</span></a>';
    });
    set(html + '</div>');
  };

  views.disciplina = function (id) {
    var d = discById[id]; if (!d) return views.notfound();
    var s = discStats(id);
    var html = '<div class="breadcrumb"><a href="#/disciplinas">Disciplinas</a> › ' + esc(d.group) + '</div><h1>' + d.icon + ' ' + esc(d.name) + '</h1>' +
      '<div class="grid g4"><div class="card stat"><b>' + s.studied + '/' + s.topics + '</b><span>tópicos estudados</span></div><div class="card stat"><b>' + s.qd + '/' + s.q + '</b><span>questões feitas</span></div><div class="card stat"><b>' + (s.qd ? pct(s.qok, s.qd) + '%' : '—') + '</b><span>acerto</span></div><div class="card stat"><b>' + s.editalDone + '/' + s.edital + '</b><span>itens do edital</span></div></div>' +
      '<div class="card" style="margin-top:14px"><h2>Tópicos</h2><ul class="topic-list">' +
      d.topics.map(function (tid) {
        var t = DATA.topics[tid], st = S.topicStatus(tid), ts = topicStats(tid);
        return '<li><span class="dot s' + st + '" title="' + STATUS[st] + '"></span><a href="#/topico/' + tid + '">' + esc(t.title) + '</a><span class="tag">' + STATUS[st] + '</span><span class="tag">' + ts.done + '/' + ts.total + ' q</span></li>';
      }).join('') + '</ul></div>' +
      '<div class="row" style="margin-top:14px"><a class="btn" href="#/questoes?d=' + id + '">📝 Questões desta disciplina</a><a class="btn ghost" href="#/flashcards?d=' + id + '">🃏 Flashcards</a><a class="btn ghost" href="#/simulado?d=' + id + '">⏱️ Mini-simulado</a></div>';
    set(html);
  };

  views.topico = function (id, params) {
    var t = DATA.topics[id]; if (!t) return views.notfound();
    var d = discById[t.disc];
    var idx = d.topics.indexOf(id);
    var prev = d.topics[idx - 1], next = d.topics[idx + 1];
    var st = S.topicStatus(id);
    var qs = qByTopic[id] || [];
    var tab = params.tab || 'resumo';
    var html = '<div class="breadcrumb"><a href="#/disciplinas">Disciplinas</a> › <a href="#/disciplina/' + d.id + '">' + esc(d.name) + '</a></div>' +
      '<h1>' + esc(t.title) + '</h1>' +
      '<div class="row"><label for="stSel" class="small muted">Status:</label><select id="stSel">' + STATUS.map(function (s, i) { return '<option value="' + i + '"' + (i === st ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select>' +
      (t.ref ? '<span class="tag">' + esc(t.ref) + '</span>' : '') + '</div>' +
      '<div class="tabs" role="tablist">' +
      [['resumo', '📄 Resumo'], ['mapa', '🧠 Mapa mental'], ['cards', '🃏 Flashcards (' + (t.cards || []).length + ')'], ['questoes', '📝 Questões (' + qs.length + ')'], ['notas', '🗒️ Minhas anotações']].map(function (x) {
        return '<button role="tab" data-tab="' + x[0] + '" class="' + (tab === x[0] ? 'active' : '') + '">' + x[1] + '</button>';
      }).join('') + '</div><div id="tabBody"></div>' +
      '<div class="row" style="margin-top:22px">' + (prev ? '<a class="btn ghost" href="#/topico/' + prev + '">← ' + esc(DATA.topics[prev].title) + '</a>' : '') + '<span class="spacer"></span>' + (next ? '<a class="btn ghost" href="#/topico/' + next + '">' + esc(DATA.topics[next].title) + ' →</a>' : '') + '</div>';
    set(html);
    $('#stSel').addEventListener('change', function () { S.setTopic(id, +this.value); toast('Status atualizado: ' + STATUS[+this.value]); });
    var body = $('#tabBody');
    function show(tb) {
      $$('.tabs button').forEach(function (b) { b.classList.toggle('active', b.dataset.tab === tb); });
      if (tb === 'resumo') {
        body.innerHTML = '<div class="prose">' + MD.render(t.summary) + diagramsHtml(t.diagrams) + '</div>' +
          (st === 0 ? '<div class="callout ok">Terminou a leitura? <button class="btn small ok" id="markDone">Marcar como estudado</button></div>' : '');
        loadDiagrams(body);
        var md = $('#markDone'); if (md) md.onclick = function () { S.setTopic(id, 1); $('#stSel').value = 1; md.parentNode.remove(); toast('Tópico marcado como estudado ✔'); };
      } else if (tb === 'mapa') {
        body.innerHTML = '<div class="mm" id="mm"></div>';
        if (t.mindmap) MindMap.render($('#mm'), t.mindmap); else body.innerHTML = '<p class="empty">Mapa mental em breve.</p>';
      } else if (tb === 'cards') {
        var cs = (t.cards || []);
        body.innerHTML = cs.length ? '<p class="muted">Clique em cada cartão para ver a resposta. Para revisão espaçada, use a <a href="#/flashcards?t=' + id + '">tela de flashcards</a>.</p><div class="grid g2">' + cs.map(function (c) {
          return '<details class="box"><summary>' + MD.inline(esc(c[0])) + '</summary><div>' + MD.inline(esc(c[1])) + '</div></details>';
        }).join('') + '</div>' : '<p class="empty">Sem flashcards.</p>';
      } else if (tb === 'questoes') {
        body.innerHTML = qs.length ? qs.map(function (q, i) { return questionHtml(q, i + 1); }).join('') : '<p class="empty">Sem questões para este tópico.</p>';
        bindQuestions(body);
      } else if (tb === 'notas') {
        body.innerHTML = '<p class="muted">Suas anotações ficam salvas neste dispositivo (e no backup exportado).</p><textarea id="note" rows="14" style="width:100%" placeholder="Escreva aqui seus macetes, dúvidas e resumos…"></textarea><p class="small muted" id="noteSaved"></p>';
        var ta = $('#note'); ta.value = S.s.notes[id] || '';
        ta.addEventListener('input', function () { S.setNote(id, ta.value); $('#noteSaved').textContent = 'Salvo às ' + new Date().toLocaleTimeString('pt-BR'); });
      }
    }
    $('.tabs').addEventListener('click', function (e) { var b = e.target.closest('[data-tab]'); if (b) show(b.dataset.tab); });
    show(tab);
  };

  views.questoes = function (_, params) {
    var dsel = params.d || '', tsel = params.t || '', fsel = params.f || 'todas';
    var html = '<h1>Banco de questões</h1><p class="muted">Questões inéditas no estilo FCC (5 alternativas), com gabarito comentado. Seu histórico fica salvo.</p>' +
      '<div class="card filters"><label>Disciplina<select id="fD"><option value="">Todas</option>' + DATA.disciplines.map(function (d) { return '<option value="' + d.id + '"' + (d.id === dsel ? ' selected' : '') + '>' + esc(d.name) + '</option>'; }).join('') + '</select></label>' +
      '<label>Tópico<select id="fT"><option value="">Todos</option></select></label>' +
      '<label>Mostrar<select id="fF">' + [['todas', 'Todas'], ['novas', 'Não resolvidas'], ['erradas', 'Errei'], ['certas', 'Acertei'], ['fav', 'Favoritas']].map(function (x) { return '<option value="' + x[0] + '"' + (x[0] === fsel ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></label>' +
      '<label>Ordem<select id="fO"><option value="seq">Sequencial</option><option value="rand">Aleatória</option></select></label>' +
      '<span class="spacer"></span><span class="muted small" id="qCount"></span></div><div id="qList" style="margin-top:14px"></div><div class="row" id="qMore"></div>';
    set(html);
    var fD = $('#fD'), fT = $('#fT'), fF = $('#fF'), fO = $('#fO');
    function fillTopics() {
      var ts = fD.value ? discById[fD.value].topics : Object.keys(DATA.topics);
      fT.innerHTML = '<option value="">Todos</option>' + ts.map(function (t) { return '<option value="' + t + '"' + (t === tsel ? ' selected' : '') + '>' + esc(DATA.topics[t].title) + '</option>'; }).join('');
    }
    fillTopics();
    var list = [], page = 0, PER = 10;
    function apply() {
      list = DATA.questions.filter(function (q) {
        if (fD.value && q.disc !== fD.value) return false;
        if (fT.value && q.topic !== fT.value) return false;
        var a = S.s.answers[q.id];
        if (fF.value === 'novas' && a) return false;
        if (fF.value === 'erradas' && !(a && a.last === false)) return false;
        if (fF.value === 'certas' && !(a && a.last)) return false;
        if (fF.value === 'fav' && !S.s.favorites[q.id]) return false;
        return true;
      });
      if (fO.value === 'rand') list = shuffle(list);
      page = 0; $('#qList').innerHTML = ''; $('#qCount').textContent = list.length + ' questões';
      more();
    }
    function more() {
      var slice = list.slice(page * PER, (page + 1) * PER);
      $('#qList').insertAdjacentHTML('beforeend', slice.length ? slice.map(function (q, i) { return questionHtml(q, page * PER + i + 1); }).join('') : (page === 0 ? '<p class="empty">Nenhuma questão com esses filtros.</p>' : ''));
      page++;
      $('#qMore').innerHTML = page * PER < list.length ? '<button class="btn ghost" id="moreBtn">Carregar mais questões (' + (list.length - page * PER) + ' restantes)</button>' : '';
      var mb = $('#moreBtn'); if (mb) mb.onclick = more;
    }
    fD.onchange = function () { tsel = ''; fillTopics(); apply(); };
    fT.onchange = fF.onchange = fO.onchange = apply;
    bindQuestions($('#qList'));
    apply();
  };

  views.erros = function () {
    var wrong = DATA.questions.filter(function (q) { var a = S.s.answers[q.id]; return a && a.last === false; });
    var favs = DATA.questions.filter(function (q) { return S.s.favorites[q.id]; });
    var html = '<h1>Caderno de erros</h1><p class="muted">Questões que você errou na última tentativa. Ao acertar, elas saem daqui automaticamente.</p>' +
      '<div class="row"><a class="btn ghost small" href="#/questoes?f=fav">⭐ Ver favoritas (' + favs.length + ')</a></div>';
    if (!wrong.length) html += '<div class="card empty" style="margin-top:14px">🎉 Nenhum erro pendente. Continue resolvendo questões!</div>';
    else {
      var byD = {};
      wrong.forEach(function (q) { byD[q.disc] = (byD[q.disc] || 0) + 1; });
      html += '<div class="card" style="margin-top:14px"><h3>Onde você mais erra</h3><div class="bars">' + Object.keys(byD).sort(function (a, b) { return byD[b] - byD[a]; }).map(function (k) {
        return '<div class="bar-row"><span>' + discById[k].icon + ' ' + esc(discById[k].name.split(':')[0].split(',')[0]) + '</span>' + bar(pct(byD[k], wrong.length)) + '<span class="small">' + byD[k] + '</span></div>';
      }).join('') + '</div></div><div id="qList" style="margin-top:14px">' + shuffle(wrong).map(function (q, i) { return questionHtml(q, i + 1); }).join('') + '</div>';
    }
    set(html);
    if (wrong.length) bindQuestions($('#qList'));
  };

  /* ---------- simulado ---------- */
  var sim = null;
  views.simulado = function (_, params) {
    if (sim && sim.running) return simRun();
    var html = '<h1>Simulado</h1><p class="muted">Monte uma prova no formato FCC, com cronômetro, e veja sua nota ponderada (gerais peso 1, específicos peso 2), como no edital.</p>' +
      '<div class="card"><div class="filters">' +
      '<label>Formato<select id="sF"><option value="prova">Como na prova (metade gerais / metade específicos)</option><option value="gerais">Só Conhecimentos Gerais</option><option value="esp">Só Conhecimentos Específicos</option>' + DATA.disciplines.map(function (d) { return '<option value="d:' + d.id + '"' + (params.d === d.id ? ' selected' : '') + '>Só ' + esc(d.name) + '</option>'; }).join('') + '</select></label>' +
      '<label>Nº de questões<select id="sN"><option>10</option><option selected>20</option><option>30</option><option value="60">60 (prova completa)</option></select></label>' +
      '<label>Prioridade<select id="sP"><option value="mix">Misturar tudo</option><option value="novas">Priorizar não resolvidas</option><option value="erradas">Priorizar as que errei</option></select></label>' +
      '<label>Tempo<select id="sT"><option value="3">3 min por questão (ritmo da prova)</option><option value="2">2 min por questão (treino forte)</option><option value="0">Sem limite</option></select></label>' +
      '</div><p class="small muted">Na prova real: 60 questões + redação em 4 horas. Reserve cerca de 1h10 para a redação.</p><button class="btn" id="sGo">▶ Iniciar simulado</button></div>';
    var hist = S.s.exams.slice(-8).reverse();
    if (hist.length) html += '<div class="card"><h3>Últimos simulados</h3><div class="table-wrap"><table><thead><tr><th>Data</th><th>Questões</th><th>Acertos</th><th>Nota ponderada</th><th>Tempo</th></tr></thead><tbody>' + hist.map(function (h) {
      return '<tr><td>' + new Date(h.at).toLocaleString('pt-BR') + '</td><td>' + h.total + '</td><td>' + h.correct + ' (' + pct(h.correct, h.total) + '%)</td><td><b>' + (h.nota != null ? h.nota.toFixed(2) : '—') + '</b></td><td>' + Math.round(h.secs / 60) + ' min</td></tr>';
    }).join('') + '</tbody></table></div></div>';
    set(html);
    $('#sGo').onclick = function () {
      var f = $('#sF').value, n = +$('#sN').value, pr = $('#sP').value;
      function pool(filter) {
        var p = DATA.questions.filter(filter);
        var score = function (q) { var a = S.s.answers[q.id]; if (pr === 'novas') return a ? 1 : 0; if (pr === 'erradas') return a && a.last === false ? 0 : 1; return 0; };
        p = shuffle(p); p.sort(function (a, b) { return score(a) - score(b); });
        return p;
      }
      var qs;
      if (f === 'prova') { var h = Math.ceil(n / 2); qs = pool(function (q) { return isGeral(q.disc); }).slice(0, h).concat(pool(function (q) { return !isGeral(q.disc); }).slice(0, n - h)); }
      else if (f === 'gerais') qs = pool(function (q) { return isGeral(q.disc); }).slice(0, n);
      else if (f === 'esp') qs = pool(function (q) { return !isGeral(q.disc); }).slice(0, n);
      else { var did = f.slice(2); qs = pool(function (q) { return q.disc === did; }).slice(0, n); }
      if (!qs.length) return toast('Sem questões suficientes para esse filtro.');
      var mins = +$('#sT').value;
      sim = { running: true, qs: qs, ans: {}, cur: 0, start: Date.now(), limit: mins ? mins * 60 * qs.length : 0 };
      simRun();
    };
  };
  function simRun() {
    var q = sim.qs[sim.cur];
    set('<div class="row"><h1 style="margin:0">Simulado</h1><span class="spacer"></span><span class="timer" id="simTimer">--:--</span><button class="btn small bad" id="simEnd">Encerrar e corrigir</button></div>' +
      '<div class="card" style="margin:14px 0"><div class="sim-nav" id="simNav">' + sim.qs.map(function (qq, i) {
        return '<button data-go="' + i + '" class="' + (sim.ans[qq.id] != null ? 'done' : '') + (i === sim.cur ? ' cur' : '') + '">' + (i + 1) + '</button>';
      }).join('') + '</div></div><div id="simQ">' + questionHtml(q, sim.cur + 1, { noReveal: true }) + '</div>' +
      '<div class="row"><button class="btn ghost" id="simPrev"' + (sim.cur === 0 ? ' disabled' : '') + '>← Anterior</button><span class="spacer"></span><button class="btn" id="simNext">' + (sim.cur === sim.qs.length - 1 ? 'Revisar e encerrar' : 'Próxima →') + '</button></div>');
    var card = $('.q', main);
    if (sim.ans[q.id] != null) $$('.opt', card)[sim.ans[q.id]].classList.add('sel');
    card.addEventListener('click', function (e) {
      var opt = e.target.closest('.opt'); if (!opt) return;
      $$('.opt', card).forEach(function (b) { b.classList.remove('sel'); });
      opt.classList.add('sel'); opt.classList.remove('cut'); sim.ans[q.id] = +opt.dataset.i;
      $('#simNav [data-go="' + sim.cur + '"]').classList.add('done');
    });
    card.addEventListener('contextmenu', function (e) { var opt = e.target.closest('.opt'); if (opt) { e.preventDefault(); opt.classList.toggle('cut'); } });
    $('#simNav').onclick = function (e) { var b = e.target.closest('[data-go]'); if (b) { sim.cur = +b.dataset.go; simRun(); } };
    $('#simPrev').onclick = function () { sim.cur--; simRun(); };
    $('#simNext').onclick = function () { if (sim.cur < sim.qs.length - 1) { sim.cur++; simRun(); } else simFinish(); };
    $('#simEnd').onclick = function () {
      var pend = sim.qs.length - Object.keys(sim.ans).length;
      if (!pend || confirm('Ainda há ' + pend + ' questão(ões) em branco. Encerrar mesmo assim?')) simFinish();
    };
    tick();
  }
  function tick() {
    clearInterval(tick.iv);
    var upd = function () {
      var el = $('#simTimer'); if (!el || !sim || !sim.running) return clearInterval(tick.iv);
      var el2 = Math.floor((Date.now() - sim.start) / 1000);
      var t = sim.limit ? sim.limit - el2 : el2;
      if (sim.limit && t <= 0) { clearInterval(tick.iv); toast('Tempo esgotado!'); return simFinish(); }
      el.textContent = (sim.limit ? '⏳ ' : '⏱ ') + String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0');
    };
    upd(); tick.iv = setInterval(upd, 1000);
  }
  function simFinish() {
    clearInterval(tick.iv);
    sim.running = false;
    var secs = Math.round((Date.now() - sim.start) / 1000);
    var correct = 0, by = {}, g = { t: 0, c: 0 }, e = { t: 0, c: 0 };
    sim.qs.forEach(function (q) {
      var ch = sim.ans[q.id], ok = ch === q.a;
      if (ch != null) S.answer(q.id, ch, ok);
      if (ok) correct++;
      by[q.disc] = by[q.disc] || { t: 0, c: 0 }; by[q.disc].t++; if (ok) by[q.disc].c++;
      var grp = isGeral(q.disc) ? g : e; grp.t++; if (ok) grp.c++;
    });
    var ng = g.t ? g.c / g.t * 10 : null, ne = e.t ? e.c / e.t * 10 : null;
    var nota = ng != null && ne != null ? (ng + 2 * ne) / 3 : (ng != null ? ng : ne);
    S.s.exams.push({ at: Date.now(), total: sim.qs.length, correct: correct, secs: secs, nota: nota, byDisc: by }); S.save();
    var passed = nota >= 6;
    set('<h1>Resultado do simulado</h1>' +
      '<div class="grid g4"><div class="card stat"><b>' + correct + '/' + sim.qs.length + '</b><span>acertos (' + pct(correct, sim.qs.length) + '%)</span></div>' +
      '<div class="card stat"><b style="color:' + (passed ? 'var(--ok)' : 'var(--bad)') + '">' + nota.toFixed(2) + '</b><span>nota ponderada (mín. 6,00)</span></div>' +
      (ng != null ? '<div class="card stat"><b>' + ng.toFixed(2) + '</b><span>Conhecimentos Gerais</span></div>' : '') +
      (ne != null ? '<div class="card stat"><b>' + ne.toFixed(2) + '</b><span>Conhecimentos Específicos</span></div>' : '') +
      '<div class="card stat"><b>' + Math.floor(secs / 60) + 'min ' + (secs % 60) + 's</b><span>tempo total</span></div></div>' +
      '<div class="callout ' + (passed ? 'ok' : 'fcc') + '" style="margin-top:14px">' + (passed ? 'Acima da nota de corte mínima do edital. Lembre: só as 400 melhores redações (ampla concorrência) são corrigidas, então mire bem acima de 6!' : 'Abaixo de 6,00. Revise os resumos dos tópicos em que errou e refaça pelo caderno de erros.') + '</div>' +
      '<div class="card"><h3>Desempenho por disciplina</h3><div class="bars">' + Object.keys(by).map(function (k) { return '<div class="bar-row"><span>' + discById[k].icon + ' ' + esc(discById[k].name.split(':')[0].split(',')[0]) + '</span>' + bar(pct(by[k].c, by[k].t)) + '<span class="small">' + by[k].c + '/' + by[k].t + '</span></div>'; }).join('') + '</div></div>' +
      '<h2>Correção comentada</h2><div id="simRev"></div><div class="row"><a class="btn" href="#/simulado">Novo simulado</a><a class="btn ghost" href="#/erros">Caderno de erros</a></div>');
    var rev = $('#simRev');
    rev.innerHTML = sim.qs.map(function (q, i) { return questionHtml(q, i + 1, { noReveal: true }); }).join('');
    $$('.q', rev).forEach(function (card, i) {
      var q = sim.qs[i], ch = sim.ans[q.id];
      reveal(card, q, ch == null ? -1 : ch);
      if (ch == null) $('.verdict', card).textContent = '— Em branco. Gabarito: ' + LETTERS[q.a];
    });
    bindQuestions(rev);
  }

  /* ---------- flashcards ---------- */
  views.flashcards = function (_, params) {
    var dsel = params.d || '', tsel = params.t || '';
    var html = '<h1>Flashcards com revisão espaçada</h1><p class="muted">Sistema Leitner de 5 caixas: acertou, o cartão sobe de caixa e volta mais tarde (1, 2, 4, 8, 16 dias); errou, volta para a caixa 1.</p>' +
      '<div class="card filters"><label>Disciplina<select id="cD"><option value="">Todas</option>' + DATA.disciplines.map(function (d) { return '<option value="' + d.id + '"' + (d.id === dsel ? ' selected' : '') + '>' + esc(d.name) + '</option>'; }).join('') + '</select></label>' +
      '<label>Modo<select id="cM"><option value="due">Revisões do dia + novos</option><option value="all">Todos (embaralhados)</option><option value="hard">Só os difíceis (caixa 1)</option></select></label><span class="spacer"></span><div class="boxes" id="cBoxes" style="min-width:260px"></div></div>' +
      '<div id="cArea" style="margin-top:18px"></div>';
    set(html);
    var deck = [], pos = 0;
    function build() {
      var src = allCards.filter(function (c) { return (!$('#cD').value || c.disc === $('#cD').value) && (!tsel || c.topic === tsel); });
      var counts = [0, 0, 0, 0, 0, 0];
      src.forEach(function (c) { var s = S.s.cards[c.id]; counts[s ? s.box : 0]++; });
      $('#cBoxes').innerHTML = ['Novos', 'Cx 1', 'Cx 2', 'Cx 3', 'Cx 4', 'Cx 5'].map(function (l, i) { return '<span><b>' + counts[i] + '</b>' + l + '</span>'; }).join('');
      var m = $('#cM').value, now = Date.now();
      if (m === 'due') {
        var due = src.filter(function (c) { var s = S.s.cards[c.id]; return s && s.due <= now; });
        var fresh = shuffle(src.filter(function (c) { return !S.s.cards[c.id]; })).slice(0, 20);
        deck = shuffle(due).concat(fresh);
      } else if (m === 'hard') deck = shuffle(src.filter(function (c) { var s = S.s.cards[c.id]; return s && s.box === 1; }));
      else deck = shuffle(src);
      pos = 0; show();
    }
    function show() {
      var area = $('#cArea');
      if (pos >= deck.length) {
        area.innerHTML = '<div class="card empty">✅ Sessão concluída! ' + (deck.length ? deck.length + ' cartões revisados.' : 'Nenhum cartão pendente agora.') + '<p><button class="btn" id="cAgain">Estudar todos os cartões</button></p></div>';
        $('#cAgain').onclick = function () { $('#cM').value = 'all'; build(); };
        return;
      }
      var c = deck[pos], t = DATA.topics[c.topic];
      area.innerHTML = '<p class="muted small" style="text-align:center">' + (pos + 1) + ' de ' + deck.length + ' · ' + esc(t.title) + '</p>' +
        '<div class="flash" id="fl"><div class="flash-inner" tabindex="0" role="button" aria-label="Virar cartão"><div class="flash-face"><small>Pergunta</small><div>' + MD.inline(esc(c.f)) + '</div></div><div class="flash-face back"><small>Resposta</small><div>' + MD.inline(esc(c.b)) + '</div></div></div></div>' +
        '<div class="row" style="justify-content:center;margin-top:16px"><button class="btn bad" id="cNo">✘ Errei</button><button class="btn ghost" id="cFlip">Virar <span class="kbd">espaço</span></button><button class="btn ok" id="cYes">✔ Acertei</button></div>';
      var fl = $('#fl');
      var flip = function () { fl.classList.toggle('flipped'); };
      $('.flash-inner').onclick = flip; $('#cFlip').onclick = flip;
      $('#cNo').onclick = function () { S.reviewCard(c.id, false); pos++; show(); };
      $('#cYes').onclick = function () { S.reviewCard(c.id, true); pos++; show(); };
    }
    $('#cD').onchange = build; $('#cM').onchange = build;
    build();
  };
  document.addEventListener('keydown', function (e) {
    if (location.hash.indexOf('#/flashcards') !== 0 || /input|textarea|select/i.test(e.target.tagName)) return;
    if (e.key === ' ') { e.preventDefault(); var b = $('#cFlip'); if (b) b.click(); }
    if (e.key === 'ArrowRight' || e.key === '2') { var y = $('#cYes'); if (y) y.click(); }
    if (e.key === 'ArrowLeft' || e.key === '1') { var n = $('#cNo'); if (n) n.click(); }
  });

  /* ---------- redação ---------- */
  views.redacao = function (_, params) {
    var tab = params.tab || 'criterios';
    var html = '<h1>Redação FCC</h1><p class="muted">Texto dissertativo-argumentativo, 20 a 30 linhas, nota de 0 a 10 (mínimo 6). Só as 400 melhores objetivas (ampla concorrência) têm a redação corrigida.</p>' +
      '<div class="tabs">' + [['criterios', '📏 Como a FCC corrige'], ['estrutura', '🧱 Estrutura e técnica'], ['repertorio', '🔗 Conectivos e repertório'], ['modelos', '🏆 Redações-modelo'], ['temas', '💡 Temas para treinar'], ['editor', '✍️ Escrever e avaliar']].map(function (x) {
        return '<button data-tab="' + x[0] + '" class="' + (tab === x[0] ? 'active' : '') + '">' + x[1] + '</button>';
      }).join('') + '</div><div id="rBody"></div>';
    set(html);
    var body = $('#rBody');
    function show(tb) {
      $$('.tabs button').forEach(function (b) { b.classList.toggle('active', b.dataset.tab === tb); });
      if (tb === 'modelos') {
        body.innerHTML = '<div class="callout fcc">O edital (item 14.9, “j”) dá nota ZERO a texto com cópia, total ou parcial, de modelos prontos de fontes públicas. Use estas redações para aprender estrutura, progressão e coesão, mas escreva sempre com suas palavras.</div><div class="grid g2">' + DATA.essays.map(function (e) {
          return '<a class="card disc-card" style="--c:var(--accent)" href="#/redacao-modelo/' + e.id + '"><span class="tag ok">Nota estimada ' + e.nota + '</span><h3>' + esc(e.tema) + '</h3><span class="small muted">' + esc(e.eixo) + ' · ' + e.paragraphs.length + ' parágrafos</span></a>';
        }).join('') + '</div>';
      } else if (tb === 'temas') {
        body.innerHTML = '<p class="muted">Propostas inéditas no formato FCC (tema + textos de apoio). Escolha uma, planeje em 10 minutos e escreva em até 1 hora.</p>' + DATA.themes.map(function (t, i) {
          return '<details class="box"><summary>' + (i + 1) + '. ' + esc(t.tema) + '</summary><div>' + MD.render(t.apoio) + '<button class="btn small" data-use="' + i + '">Escrever sobre este tema</button></div></details>';
        }).join('');
        body.onclick = function (e) { var b = e.target.closest('[data-use]'); if (!b) return; S.s.essayDraft.tema = DATA.themes[+b.dataset.use].tema; S.save(); show('editor'); };
      } else if (tb === 'editor') {
        editor(body);
      } else {
        body.innerHTML = '<div class="prose">' + MD.render(DATA.essayGuide[tb]) + '</div>';
      }
    }
    $('.tabs').addEventListener('click', function (e) { var b = e.target.closest('[data-tab]'); if (b) show(b.dataset.tab); });
    show(tab);
  };
  function editor(body) {
    var d = S.s.essayDraft;
    var cpl = +(localStorage.getItem('trt4:cpl') || 64);
    body.innerHTML = '<div class="grid g2" style="align-items:start"><div>' +
      '<label class="small muted" for="eTema">Tema</label><input type="text" id="eTema" style="width:100%;margin:4px 0 10px" placeholder="Digite ou escolha um tema na aba Temas">' +
      '<textarea id="eText" class="lined" placeholder="Escreva sua redação aqui. Separe parágrafos com uma linha em branco. Não é preciso marcar recuo (o edital pede que não se façam sinais de recuo)." spellcheck="true"></textarea>' +
      '<div class="row small muted" style="margin-top:6px"><span id="eLines"></span><span class="spacer"></span><label>caracteres por linha manuscrita: <input type="number" id="eCpl" min="45" max="90" value="' + cpl + '" style="width:70px"></label></div></div>' +
      '<div><div class="card"><h3>Autoavaliação pela grade FCC</h3><p class="small muted">Marque com honestidade. A pontuação é uma estimativa baseada nos critérios do item 14.5 do edital.</p><div class="checklist" id="eCheck">' +
      DATA.essayChecklist.map(function (c, i) { return '<label><input type="checkbox" data-ck="' + i + '"> <span>' + esc(c.t) + ' <span class="muted">(' + c.p.toFixed(2).replace('.', ',') + ')</span></span></label>'; }).join('') +
      '</div><p style="margin-top:10px"><strong>Nota estimada: <span id="eScore">0,00</span> / 10</strong></p><div id="eAuto" class="small"></div>' +
      '<div class="row" style="margin-top:10px"><button class="btn small" id="eSave">💾 Salvar no histórico</button><button class="btn small ghost" id="eDl">⬇ Baixar .txt</button><button class="btn small ghost" id="eNew">Nova redação</button></div></div>' +
      '<div class="card"><h3>Histórico</h3><div id="eHist"></div></div></div></div>';
    var ta = $('#eText'), tm = $('#eTema');
    ta.value = d.texto || ''; tm.value = d.tema || '';
    function lines() {
      cpl = +$('#eCpl').value || 64;
      var paras = ta.value.split(/\n\s*\n|\n/).filter(function (p) { return p.trim(); });
      var n = paras.reduce(function (a, p) { return a + Math.max(1, Math.ceil((p.trim().length + 6) / cpl)); }, 0);
      var words = (ta.value.match(/\S+/g) || []).length;
      var cls = n < 20 ? 'bad' : n > 30 ? 'bad' : 'ok';
      $('#eLines').innerHTML = '<span class="tag ' + cls + '">≈ ' + n + ' linhas</span> ' + words + ' palavras · ' + paras.length + ' parágrafos';
      // análise automática simples
      var txt = norm(ta.value);
      var conectivos = DATA.connectives.filter(function (c) { return txt.indexOf(norm(c)) >= 0; });
      var tips = [];
      if (n && n < 20) tips.push('⚠️ Abaixo de 20 linhas: perda de pontos (item 14.11). Até 7 linhas = nota zero.');
      if (n > 30) tips.push('⚠️ Acima de 30 linhas: o excedente não é considerado e há perda de pontos.');
      if (paras.length && paras.length < 4) tips.push('Use ao menos 4 parágrafos: introdução, 2 de desenvolvimento e conclusão.');
      if (conectivos.length < 5 && words > 80) tips.push('Poucos conectivos variados (' + conectivos.length + '). Coesão vale 1,60 ponto.');
      if (/\b(eu|meu|minha)\b/.test(txt)) tips.push('Evite 1ª pessoa do singular; prefira a impessoalidade.');
      if (/\b(voce|a gente|tipo assim|ne)\b/.test(txt)) tips.push('Há marcas de oralidade (“você”, “a gente”…). Use registro formal.');
      if (/\b(etc|coisa|coisas)\b/.test(txt)) tips.push('Evite “coisa” e “etc.”: prejudicam a propriedade vocabular.');
      $('#eAuto').innerHTML = (conectivos.length ? '<p>Conectivos usados: ' + conectivos.slice(0, 12).map(function (c) { return '<span class="tag blue">' + esc(c) + '</span>'; }).join(' ') + '</p>' : '') + tips.map(function (t) { return '<p style="margin:.3em 0">' + esc(t) + '</p>'; }).join('');
    }
    function score() {
      var s = 0; $$('[data-ck]', body).forEach(function (c) { if (c.checked) s += DATA.essayChecklist[+c.dataset.ck].p; });
      $('#eScore').textContent = s.toFixed(2).replace('.', ',');
      return s;
    }
    function hist() {
      var h = S.s.essays.slice().reverse();
      $('#eHist').innerHTML = h.length ? h.map(function (e, i) {
        return '<details class="box"><summary>' + esc(e.tema || 'Sem tema') + ' <span class="tag">' + (e.score != null ? e.score.toFixed(1) : '—') + '</span></summary><div><p class="small muted">' + new Date(e.at).toLocaleString('pt-BR') + '</p><div class="essay">' + e.texto.split(/\n+/).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div><button class="btn tiny" data-load="' + (h.length - 1 - i) + '">Abrir no editor</button> <button class="btn tiny" data-del="' + (h.length - 1 - i) + '">Excluir</button></div></details>';
      }).join('') : '<p class="muted small">Nenhuma redação salva ainda.</p>';
    }
    ta.addEventListener('input', function () { d.texto = ta.value; S.save(); lines(); });
    tm.addEventListener('input', function () { d.tema = tm.value; S.save(); });
    $('#eCpl').addEventListener('input', function () { localStorage.setItem('trt4:cpl', this.value); lines(); });
    $('#eCheck').addEventListener('change', score);
    $('#eSave').onclick = function () {
      if (!ta.value.trim()) return toast('Escreva algo antes de salvar.');
      S.s.essays.push({ id: Date.now(), tema: tm.value, texto: ta.value, at: Date.now(), score: score() }); S.save(); hist(); toast('Redação salva no histórico');
    };
    $('#eDl').onclick = function () { download('redacao-' + S.today() + '.txt', (tm.value ? 'TEMA: ' + tm.value + '\n\n' : '') + ta.value, 'text/plain'); };
    $('#eNew').onclick = function () { if (ta.value && !confirm('Limpar o editor? (salve antes no histórico se quiser guardar)')) return; ta.value = ''; tm.value = ''; d.texto = ''; d.tema = ''; S.save(); lines(); };
    $('#eHist').onclick = function (e) {
      var l = e.target.dataset.load, del = e.target.dataset.del;
      if (l != null) { var es = S.s.essays[+l]; ta.value = es.texto; tm.value = es.tema; d.texto = es.texto; d.tema = es.tema; S.save(); lines(); window.scrollTo(0, 0); }
      if (del != null && confirm('Excluir esta redação?')) { S.s.essays.splice(+del, 1); S.save(); hist(); }
    };
    lines(); score(); hist();
  }
  views['redacao-modelo'] = function (id) {
    var e = DATA.essays.filter(function (x) { return x.id === id; })[0]; if (!e) return views.notfound();
    var i = DATA.essays.indexOf(e);
    var html = '<div class="breadcrumb"><a href="#/redacao?tab=modelos">Redações-modelo</a></div><h1>' + esc(e.tema) + '</h1>' +
      '<div class="row"><span class="tag ok">Nota estimada ' + e.nota + ' / 10</span><span class="tag">' + esc(e.eixo) + '</span><span class="spacer"></span><label class="small"><input type="checkbox" id="showMarks"> Destacar estrutura</label></div>' +
      '<details class="box" open><summary>📄 Proposta (textos de apoio)</summary><div>' + MD.render(e.proposta) + '</div></details>' +
      '<div class="card essay" id="essayText"><h3>' + esc(e.titulo || '') + '</h3>' + e.paragraphs.map(function (p, k) {
        var role = k === 0 ? 'Introdução: contextualização + tese + projeto de texto' : k === e.paragraphs.length - 1 ? 'Conclusão: retomada da tese + fechamento articulado' : 'Desenvolvimento ' + k + ': tópico frasal + argumento + exemplo/dado + fechamento';
        return '<p data-role="' + esc(role) + '">' + MD.inline(esc(p)) + '</p>';
      }).join('') + '</div>' +
      '<div class="card"><h3>Por que esta redação tira nota alta</h3>' + MD.render(e.comentario) + '</div>' +
      '<div class="row" style="margin-top:14px">' + (DATA.essays[i - 1] ? '<a class="btn ghost" href="#/redacao-modelo/' + DATA.essays[i - 1].id + '">← Anterior</a>' : '') + '<span class="spacer"></span>' + (DATA.essays[i + 1] ? '<a class="btn ghost" href="#/redacao-modelo/' + DATA.essays[i + 1].id + '">Próxima →</a>' : '') + '</div>';
    set(html);
    $('#showMarks').onchange = function () {
      var on = this.checked;
      $$('#essayText p').forEach(function (p) {
        var old = p.previousElementSibling && p.previousElementSibling.classList.contains('tag-role') ? p.previousElementSibling : null;
        if (on && !old) p.insertAdjacentHTML('beforebegin', '<div class="tag-role tag blue" style="margin:8px 0 4px;text-indent:0">' + esc(p.dataset.role) + '</div>');
        if (!on && old) old.remove();
      });
    };
  };

  /* ---------- plano de estudos ---------- */
  views.plano = function () {
    var dl = daysLeft();
    var html = '<h1>Plano de estudos e cronograma</h1>' +
      '<div class="card"><h3>📅 Cronograma oficial (Anexo IV do edital)</h3><div class="table-wrap"><table><tbody>' + DATA.exam.timeline.map(function (r) { return '<tr><td style="white-space:nowrap"><b>' + r[0] + '</b></td><td>' + r[1] + '</td></tr>'; }).join('') + '</tbody></table></div><p class="small muted">Cronograma sujeito a alterações. Confira sempre o site da FCC.</p></div>' +
      '<div class="card"><h3>🧭 Gerador de ciclo de estudos</h3><p class="small muted">Distribui suas horas pela importância de cada disciplina: os Conhecimentos Específicos valem o dobro, e as disciplinas mais extensas do edital pesam mais.</p>' +
      '<div class="filters"><label>Horas por dia<input type="number" id="pH" min="1" max="14" value="3" style="width:90px"></label><label>Dias por semana<input type="number" id="pD" min="1" max="7" value="6" style="width:90px"></label><label>Meta de questões/dia<input type="number" id="pG" min="5" max="300" value="' + (S.s.goal || 30) + '" style="width:110px"></label></div><div id="pOut" style="margin-top:14px"></div></div>' +
      '<div class="card"><h3>🗺️ Estratégia sugerida até a prova (' + Math.max(0, dl) + ' dias)</h3>' + MD.render(DATA.strategy) + '</div>';
    set(html);
    var W = { port: 3, mat: 2, leg: 2, dh: 2, devops: 3, pdpj: 4, cont: 2, eng: 3, web: 3, redes: 3, seg: 4, norm: 2, ing: 1 };
    function calc() {
      var h = +$('#pH').value || 3, d = +$('#pD').value || 6;
      S.s.goal = +$('#pG').value || 30; S.save();
      var tot = Object.keys(W).reduce(function (a, k) { return a + W[k]; }, 0);
      var week = h * d * 60 - 60; // 1h semanal reservada à redação
      $('#pOut').innerHTML = '<div class="table-wrap"><table><thead><tr><th>Disciplina</th><th>Min/semana</th><th>Sessões de 50 min</th></tr></thead><tbody>' +
        DATA.disciplines.map(function (dd) { var m = Math.round(week * W[dd.id] / tot); return '<tr><td>' + dd.icon + ' ' + esc(dd.name) + '</td><td>' + m + '</td><td>' + Math.max(1, Math.round(m / 50)) + '</td></tr>'; }).join('') +
        '<tr><td>✍️ Redação (1 texto completo)</td><td>60</td><td>1</td></tr></tbody></table></div><p class="small muted">Siga as sessões em ciclo (não por dia fixo): terminou uma, passe para a próxima disciplina. Em cada sessão: 30 min de resumo/mapa + 20 min de questões.</p>';
    }
    $$('#pH,#pD,#pG').forEach(function (i) { i.addEventListener('input', calc); });
    calc();
  };

  /* ---------- configurações ---------- */
  views.config = function () {
    var g = globalStats();
    var html = '<h1>Progresso e backup</h1>' +
      '<div class="card"><h3>💾 Seu progresso</h3><p>Tudo fica salvo <strong>neste navegador</strong> (localStorage), sem conta e sem internet: ' + g.studied + ' tópicos estudados, ' + g.answered + ' respostas, ' + S.s.essays.length + ' redações e ' + Object.keys(S.s.cards).length + ' flashcards em revisão.</p>' +
      '<p class="small muted">Para usar em outro dispositivo (ou não perder nada ao limpar o navegador), exporte um backup e importe no outro aparelho.</p>' +
      '<div class="row"><button class="btn" id="cfgExp">⬇ Exportar backup (.json)</button><label class="btn ghost" style="cursor:pointer">⬆ Importar backup<input type="file" id="cfgImp" accept="application/json,.json" hidden></label><button class="btn bad" id="cfgReset">Apagar todo o progresso</button></div></div>' +
      '<div class="card"><h3>🎨 Aparência</h3><div class="row"><button class="btn ghost" data-th="light">☀️ Claro</button><button class="btn ghost" data-th="dark">🌙 Escuro</button><button class="btn ghost" data-th="">🖥️ Automático (sistema)</button></div></div>' +
      '<div class="card"><h3>📶 Uso offline</h3><p id="offInfo" class="small">Verificando…</p><p class="small muted">Após o primeiro acesso com internet, o site inteiro (resumos, mapas, questões, redações e diagramas) fica disponível sem conexão. No celular, use “Adicionar à tela inicial” para instalar como aplicativo.</p><button class="btn small ghost" id="cfgUpd">Procurar atualização do conteúdo</button></div>' +
      '<div class="card"><h3>ℹ️ Sobre o conteúdo</h3><p class="small">Conteúdo programático extraído do <a href="' + DATA.exam.editalUrl + '" target="_blank" rel="noopener">' + esc(DATA.exam.edital) + '</a>. Questões e redações são <strong>inéditas</strong>, escritas no estilo da FCC para treino; não são questões oficiais. Normas internas do TRT4 (Regimento, Código de Conduta, PDTIC) mudam com frequência: confira sempre o texto oficial vigente no site do Tribunal.</p>' +
      '<p class="small muted">' + Object.keys(DATA.topics).length + ' tópicos · ' + DATA.questions.length + ' questões · ' + allCards.length + ' flashcards · ' + DATA.essays.length + ' redações-modelo</p></div>';
    set(html);
    $('#cfgExp').onclick = function () { download('trt4-progresso-' + S.today() + '.json', S.export()); toast('Backup exportado'); };
    $('#cfgImp').onchange = function () {
      var f = this.files[0]; if (!f) return;
      f.text().then(function (txt) { try { S.import(txt); toast('Backup importado!'); route(); } catch (e) { toast('Arquivo inválido.'); } });
    };
    $('#cfgReset').onclick = function () { if (confirm('Apagar TODO o progresso deste dispositivo? Exporte um backup antes, se quiser guardar.')) { S.reset(); toast('Progresso apagado'); route(); } };
    $$('[data-th]').forEach(function (b) { b.onclick = function () { setTheme(b.dataset.th || null); }; });
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      caches.keys().then(function (k) { $('#offInfo').innerHTML = '✅ Pronto para uso offline (' + k.length + ' cache ativo).'; });
    } else $('#offInfo').textContent = 'Modo offline ainda não ativado (abra o site uma vez com internet, por HTTPS).';
    $('#cfgUpd').onclick = function () {
      if (!navigator.serviceWorker) return;
      navigator.serviceWorker.getRegistration().then(function (r) { if (r) r.update().then(function () { toast('Verificação concluída'); }); });
    };
  };

  views.notfound = function () { set('<div class="empty"><h1>Página não encontrada</h1><a class="btn" href="#/">Voltar ao painel</a></div>'); };

  /* ---------- roteador ---------- */
  function route() {
    var h = location.hash.replace(/^#\/?/, '');
    var qs = '';
    if (h.indexOf('?') >= 0) { qs = h.slice(h.indexOf('?') + 1); h = h.slice(0, h.indexOf('?')); }
    var params = {};
    qs.split('&').forEach(function (p) { if (p) { var kv = p.split('='); params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || ''); } });
    var parts = h.split('/').filter(Boolean);
    var name = parts[0] || 'inicio';
    if (name !== 'simulado' && sim && sim.running) { /* mantém simulado em memória */ }
    var nav = name === 'disciplina' || name === 'topico' ? 'disciplinas' : name === 'redacao-modelo' ? 'redacao' : name;
    $$('[data-nav]').forEach(function (a) { a.classList.toggle('active', a.dataset.nav === nav); });
    closeMenu();
    var v = views[name] || views.notfound;
    // reinicia ouvintes do main clonando-o
    var fresh = main.cloneNode(false); main.parentNode.replaceChild(fresh, main); main = fresh;
    v(parts[1], params);
    var titleEl = $('h1', main);
    document.title = (titleEl ? titleEl.textContent + ' · ' : '') + 'TRT4 TI — Estudos';
  }
  window.addEventListener('hashchange', route);

  /* ---------- menu, tema, busca, rede ---------- */
  function closeMenu() { $('#sidebar').classList.remove('open'); $('#scrim').hidden = true; $('#menuBtn').setAttribute('aria-expanded', 'false'); }
  $('#menuBtn').onclick = function () { var o = $('#sidebar').classList.toggle('open'); $('#scrim').hidden = !o; this.setAttribute('aria-expanded', String(o)); };
  $('#scrim').onclick = closeMenu;
  function setTheme(t) {
    S.s.theme = t; S.save();
    if (t) document.documentElement.setAttribute('data-theme', t); else document.documentElement.removeAttribute('data-theme');
    toast(t === 'dark' ? 'Tema escuro' : t === 'light' ? 'Tema claro' : 'Tema automático');
  }
  $('#themeBtn').onclick = function () {
    var cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(cur === 'dark' ? 'light' : 'dark');
  };
  // busca
  var index = [];
  Object.keys(DATA.topics).forEach(function (id) {
    var t = DATA.topics[id];
    index.push({ href: '#/topico/' + id, title: t.title, sub: (discById[t.disc] || {}).name, text: norm(t.title + ' ' + (t.summary || '').replace(/<[^>]+>/g, ' ') + ' ' + (t.mindmap || '')) , tt: norm(t.title) });
  });
  DATA.essays.forEach(function (e) { index.push({ href: '#/redacao-modelo/' + e.id, title: 'Redação: ' + e.tema, sub: 'Redação-modelo', text: norm(e.tema + ' ' + e.paragraphs.join(' ')), tt: norm(e.tema) }); });
  var sIn = $('#searchInput'), sOut = $('#searchResults');
  sIn.addEventListener('input', function () {
    var q = norm(sIn.value.trim());
    if (q.length < 2) { sOut.hidden = true; return; }
    var terms = q.split(/\s+/);
    var res = index.map(function (it) {
      var sc = 0;
      terms.forEach(function (t) { if (it.tt.indexOf(t) >= 0) sc += 5; var c = it.text.split(t).length - 1; sc += Math.min(c, 6); });
      var all = terms.every(function (t) { return it.text.indexOf(t) >= 0; });
      return { it: it, sc: all ? sc : 0 };
    }).filter(function (r) { return r.sc > 0; }).sort(function (a, b) { return b.sc - a.sc; }).slice(0, 10);
    sOut.innerHTML = res.length ? res.map(function (r) { return '<a href="' + r.it.href + '">' + esc(r.it.title) + '<small>' + esc(r.it.sub || '') + '</small></a>'; }).join('') : '<p class="muted small" style="padding:10px 14px;margin:0">Nada encontrado.</p>';
    sOut.hidden = false;
  });
  sOut.addEventListener('click', function () { sOut.hidden = true; sIn.value = ''; });
  $('#searchForm').addEventListener('submit', function (e) { e.preventDefault(); var a = $('a', sOut); if (a) { location.hash = a.getAttribute('href'); sOut.hidden = true; sIn.value = ''; } });
  document.addEventListener('click', function (e) { if (!e.target.closest('#searchForm')) sOut.hidden = true; });
  document.addEventListener('keydown', function (e) { if (e.key === '/' && !/input|textarea/i.test(e.target.tagName)) { e.preventDefault(); sIn.focus(); } if (e.key === 'Escape') { sOut.hidden = true; closeMenu(); } });

  function netStatus() { var n = $('#netStatus'); n.classList.toggle('off', !navigator.onLine); n.title = navigator.onLine ? 'Online' : 'Offline — usando conteúdo salvo'; }
  window.addEventListener('online', function () { netStatus(); toast('Conexão restabelecida'); });
  window.addEventListener('offline', function () { netStatus(); toast('Você está offline. O conteúdo continua disponível.'); });
  netStatus();
  var dl = daysLeft();
  $('#sideCountdown').innerHTML = '<b>' + Math.max(0, dl) + ' dias</b>até a prova · 31/01/2027';

  // instalação PWA
  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferred = e; $('#installBtn').hidden = false; });
  $('#installBtn').onclick = function () { if (deferred) { deferred.prompt(); deferred = null; $('#installBtn').hidden = true; } };

  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').then(function (reg) {
      reg.addEventListener('updatefound', function () {
        var w = reg.installing;
        w && w.addEventListener('statechange', function () { if (w.state === 'installed' && navigator.serviceWorker.controller) toast('Conteúdo atualizado! Recarregue para ver a nova versão.'); });
      });
    }).catch(function (e) { console.warn('SW', e); });
  }

  route();
})();
