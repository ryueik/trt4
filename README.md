# TRT4 TI — Plataforma de Estudos

Site de estudos para o concurso do **TRT da 4ª Região (FCC)**, cargo **Técnico Judiciário – Apoio Especializado – Tecnologia da Informação (código 22)**. Prova objetiva e redação em **31/01/2027**.

Funciona no computador e no celular, pode ser **instalado como aplicativo** (PWA) e funciona **offline** depois do primeiro acesso.

## O que tem
- **Edital verticalizado** com checklist de tudo o que cai.
- **63 tópicos**, cada um com uma **aula completa** (explicação do zero, passo a passo, exemplos resolvidos e “como a FCC cobra”) e um resumo para revisão, **mapa mental interativo**, flashcards e anotações próprias, cobrindo Conhecimentos Gerais e Específicos (DevOps, PDPJ-Br/Java/Spring, contêineres, engenharia de software, web, redes, segurança, LGPD, normativos do CNJ e inglês técnico).
- **13 diagramas** (Git Flow, CI/CD, OAuth 2.0 + PKCE, RabbitMQ, arquitetura PDPJ-Br, Scrum, pirâmide de testes, Kubernetes, IaaS/PaaS/SaaS, OSI × TCP/IP, CID, criptografia e DMZ).
- **151 questões inéditas no estilo FCC**, todas com gabarito comentado, filtros, caderno de erros e favoritos.
- **Simulado cronometrado** com a nota ponderada do edital: (Gerais + 2 × Específicos) ÷ 3.
- **Flashcards** com repetição espaçada (sistema Leitner).
- **Redação**: critérios de correção do edital, estrutura, conectivos e repertório, **10 redações-modelo originais**, 10 propostas para treinar e um editor com contador de linhas, grade de autoavaliação e histórico.
- **Painel** com contagem regressiva, meta diária, sequência de dias, mapa de atividade e progresso por disciplina.
- **Progresso salvo no navegador**, com exportação e importação em JSON (para levar de um aparelho para outro).
- Tema claro e escuro.

> **Atenção (item 14.9 “j” do edital):** a FCC dá nota zero à redação com cópia, total ou parcial, de modelos prontos de fontes públicas. As redações-modelo servem para estudar técnica, não para decorar.

## Como usar
**Online:** ative o GitHub Pages em *Settings → Pages → Source: GitHub Actions*. O workflow `.github/workflows/pages.yml` publica o site a cada push na `main`.

**No computador, sem publicar:**
```bash
python3 -m http.server 8000
# abra http://localhost:8000
```
(O modo offline precisa de `http://` ou `https://`; abrir o `index.html` direto do disco funciona, mas sem service worker.)

## Estrutura
```
index.html              casca da aplicação
sw.js                   service worker (cache offline; aumente VERSION ao publicar conteúdo novo)
manifest.webmanifest    instalação como app
assets/css/style.css    visual, tema claro/escuro, responsivo
assets/js/              app.js (telas), store.js (progresso), markdown.js, mindmap.js
assets/data/            syllabus.js (edital), topics-*.js (resumos), aulas-*.js (aulas completas), questions-*.js (questões), redacoes.js
assets/img/             diagramas SVG
```
Para adicionar uma questão, inclua um objeto em `assets/data/questions-*.js` no formato `{ topic, q, o: [5 alternativas], a: índice correto, e: comentário }`. As alternativas são embaralhadas de forma fixa por questão.

## Fontes
Conteúdo programático, datas e critérios retirados do edital de abertura do concurso (FCC, 21/10/2026). Normas internas do TRT4 (Regimento, Código de Conduta, PDTIC) são resumidas em linhas gerais: leia o texto oficial no site do Tribunal.
