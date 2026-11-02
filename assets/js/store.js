/* Persistência local do progresso (localStorage), com exportação/importação. */
(function () {
  var KEY = 'trt4:v1';
  var defaults = function () {
    return {
      version: 1,
      createdAt: Date.now(),
      theme: null,
      topics: {},      // id -> { status: 0|1|2|3 (não visto, estudado, revisado, dominado), at }
      edital: {},      // itemId -> true
      answers: {},     // questionId -> { tries, correct, last, lastChoice, at }
      favorites: {},   // questionId -> true
      notes: {},       // topicId -> texto
      cards: {},       // cardId -> { box: 1..5, due: timestamp }
      essays: [],      // { id, tema, texto, at, auto: {...} }
      essayDraft: { tema: '', texto: '' },
      exams: [],       // { at, total, correct, secs, byDisc }
      days: {},        // 'YYYY-MM-DD' -> { q: n, c: n, min: n }
      goal: 30
    };
  };
  var state;
  function load() {
    try { state = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch (e) { state = defaults(); }
    return state;
  }
  var saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(flush, 150);
  }
  function flush() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { console.warn('Falha ao salvar progresso', e); }
  }
  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function bumpDay(field, n) {
    var t = today();
    state.days[t] = state.days[t] || { q: 0, c: 0, cards: 0 };
    state.days[t][field] = (state.days[t][field] || 0) + (n || 1);
  }
  function streak() {
    var s = 0, d = new Date();
    for (;;) {
      var k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      if (state.days[k]) { s++; d.setDate(d.getDate() - 1); }
      else if (s === 0 && k === today()) { d.setDate(d.getDate() - 1); }
      else break;
    }
    return s;
  }
  var api = {
    get s() { return state; },
    load: load,
    save: save,
    flush: flush,
    today: today,
    streak: streak,
    setTopic: function (id, status) { state.topics[id] = { status: status, at: Date.now() }; bumpDay('t', 0); save(); },
    topicStatus: function (id) { return (state.topics[id] && state.topics[id].status) || 0; },
    toggleEdital: function (id) { if (state.edital[id]) delete state.edital[id]; else state.edital[id] = true; save(); return !!state.edital[id]; },
    answer: function (qid, choice, correct) {
      var a = state.answers[qid] || { tries: 0, correct: 0 };
      a.tries++; if (correct) a.correct++;
      a.last = correct; a.lastChoice = choice; a.at = Date.now();
      state.answers[qid] = a;
      bumpDay('q'); if (correct) bumpDay('c');
      save();
    },
    toggleFav: function (qid) { if (state.favorites[qid]) delete state.favorites[qid]; else state.favorites[qid] = true; save(); return !!state.favorites[qid]; },
    setNote: function (tid, txt) { if (txt) state.notes[tid] = txt; else delete state.notes[tid]; save(); },
    reviewCard: function (cid, ok) {
      var c = state.cards[cid] || { box: 1 };
      c.box = ok ? Math.min(5, c.box + 1) : 1;
      var days = [0, 1, 2, 4, 8, 16][c.box];
      c.due = Date.now() + days * 864e5 - 36e5; // pequena folga
      c.seen = (c.seen || 0) + 1;
      state.cards[cid] = c; bumpDay('cards'); save();
    },
    export: function () { return JSON.stringify(state, null, 1); },
    import: function (json) {
      var obj = JSON.parse(json);
      if (!obj || typeof obj !== 'object' || !obj.answers) throw new Error('Arquivo inválido');
      state = Object.assign(defaults(), obj); flush();
    },
    reset: function () { var th = state.theme; state = defaults(); state.theme = th; flush(); }
  };
  load();
  window.addEventListener('pagehide', flush);
  window.Store = api;
})();
