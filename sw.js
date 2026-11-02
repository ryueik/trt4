/* Service worker — TRT4 TI Estudos
   Pré-carrega todo o site para uso offline (resumos, mapas, questões, redação, diagramas).
   Estratégia: cache primeiro + atualização em segundo plano (stale-while-revalidate).
   Ao publicar conteúdo novo, aumente VERSION. */
const VERSION = 'trt4-v1.1.0';
const ASSETS = [
  'index.html',
  'manifest.webmanifest',
  './',
  'assets/css/style.css',
  'assets/data/questions-dev.js',
  'assets/data/questions-gerais.js',
  'assets/data/questions-infra.js',
  'assets/data/questions-seg.js',
  'assets/data/redacoes.js',
  'assets/data/syllabus.js',
  'assets/data/topics-dev.js',
  'assets/data/topics-gerais.js',
  'assets/data/topics-infra.js',
  'assets/data/topics-seg.js',
  'assets/data/aulas-gerais.js',
  'assets/data/aulas-dev.js',
  'assets/data/aulas-infra.js',
  'assets/data/aulas-seg.js',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/icon.svg',
  'assets/img/cicd.svg',
  'assets/img/cid.svg',
  'assets/img/cripto.svg',
  'assets/img/dmz.svg',
  'assets/img/gitflow.svg',
  'assets/img/kubernetes.svg',
  'assets/img/nuvem.svg',
  'assets/img/oauth2.svg',
  'assets/img/osi-tcpip.svg',
  'assets/img/pdpj-arq.svg',
  'assets/img/piramide-testes.svg',
  'assets/img/rabbitmq.svg',
  'assets/img/scrum.svg',
  'assets/js/app.js',
  'assets/js/markdown.js',
  'assets/js/mindmap.js',
  'assets/js/store.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // navegação: tenta a rede (conteúdo mais novo), cai para o index em cache quando offline
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put('index.html', copy)); return res; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cached) => {
      const net = fetch(req)
        .then((res) => {
          if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
          return res;
        })
        .catch(() => cached);
      return cached || net;
    })
  );
});

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});
