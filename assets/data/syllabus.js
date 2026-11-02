/* Estrutura do concurso e edital verticalizado.
   Fonte: Edital nº 01/2026 TRT4 (FCC), Anexo II — cargo 22 Técnico Judiciário – Apoio Especializado – TI. */
window.DATA = { disciplines: [], topics: {}, questions: [], essays: [], themes: [] };

DATA.exam = {
  cargo: 'Técnico Judiciário – Área Apoio Especializado – Especialidade Tecnologia da Informação (código 22)',
  banca: 'Fundação Carlos Chagas (FCC)',
  edital: 'Edital nº 01/2026 de Abertura de Inscrições (21/10/2026)',
  editalUrl: 'https://www.concursosfcc.com.br/concursos/trt4r125/trt4r125_edital_de_abertura_21_10_26__1___1__publicar.pdf',
  provaDate: '2027-01-31T08:00:00-03:00',
  remuneracao: 'R$ 9.776,71 (vencimento básico + GAJ)',
  vagas: 'Cadastro de reserva',
  timeline: [
    ['26/10/2026 a 25/11/2026', 'Período de inscrições (somente internet)'],
    ['26/11/2026', 'Último dia para pagamento da inscrição'],
    ['10/12/2026', 'Relação de candidatos(as) a vagas reservadas e solicitações especiais'],
    ['11/01/2027', 'Edital de convocação e cartão informativo'],
    ['31/01/2027 (manhã)', 'Provas objetivas e redação — Porto Alegre/RS'],
    ['01/02/2027', 'Gabarito e questões das provas objetivas'],
    ['23/03/2027', 'Resultado preliminar das provas'],
    ['30/04/2027', 'Resultado definitivo das provas'],
    ['05/07/2027', 'Resultado final (previsto)']
  ]
};

/* id, nome, grupo, ícone, cor, nº estimado de questões */
DATA.disciplines = [
  { id: 'port', name: 'Língua Portuguesa', group: 'Conhecimentos Gerais', icon: '📖', color: '#2563eb' },
  { id: 'mat', name: 'Matemática e Raciocínio Lógico', group: 'Conhecimentos Gerais', icon: '🧮', color: '#7c3aed' },
  { id: 'leg', name: 'Noções de Legislação', group: 'Conhecimentos Gerais', icon: '⚖️', color: '#0891b2' },
  { id: 'dh', name: 'Noções de Direitos Humanos', group: 'Conhecimentos Gerais', icon: '🕊️', color: '#db2777' },
  { id: 'devops', name: 'DevOps, Git, CI/CD, Autenticação e Mensageria', group: 'Conhecimentos Específicos', icon: '🔁', color: '#ea580c' },
  { id: 'pdpj', name: 'Arquitetura PDPJ-Br: Java, Spring e Persistência', group: 'Conhecimentos Específicos', icon: '☕', color: '#b45309' },
  { id: 'cont', name: 'Contêineres, Kubernetes e Nuvem', group: 'Conhecimentos Específicos', icon: '🐳', color: '#0284c7' },
  { id: 'eng', name: 'Engenharia, Qualidade e Testes de Software', group: 'Conhecimentos Específicos', icon: '🛠️', color: '#16a34a' },
  { id: 'web', name: 'Programação e Desenvolvimento Web', group: 'Conhecimentos Específicos', icon: '💻', color: '#9333ea' },
  { id: 'redes', name: 'Infraestrutura e Redes de Computadores', group: 'Conhecimentos Específicos', icon: '🌐', color: '#0d9488' },
  { id: 'seg', name: 'Segurança da Informação e Desenvolvimento Seguro', group: 'Conhecimentos Específicos', icon: '🔐', color: '#dc2626' },
  { id: 'norm', name: 'Normativos PDPJ-Br, CNJ e Governança de TIC', group: 'Conhecimentos Específicos', icon: '🏛️', color: '#4f46e5' },
  { id: 'ing', name: 'Inglês Técnico', group: 'Conhecimentos Específicos', icon: '🇬🇧', color: '#64748b' }
];

/* Edital verticalizado: [texto do item do edital, id do tópico de estudo] */
DATA.edital = {
  port: [
    ['Redação Oficial', 'port-redof'],
    ['Ortografia e acentuação', 'port-orto'],
    ['Emprego do sinal indicativo de crase', 'port-orto'],
    ['Compreensão e interpretação de textos de gêneros variados', 'port-interp'],
    ['Relação do texto com seu contexto histórico', 'port-interp'],
    ['Denotação e conotação', 'port-interp'],
    ['Discurso direto, discurso indireto e discurso indireto livre', 'port-interp'],
    ['Intertextualidade', 'port-interp'],
    ['Figuras de linguagem', 'port-interp'],
    ['Morfossintaxe', 'port-morfo'],
    ['Elementos estruturais e processos de formação de palavras', 'port-morfo'],
    ['Sinonímia e antonímia', 'port-morfo'],
    ['Pontuação', 'port-sintaxe'],
    ['Pronomes', 'port-morfo'],
    ['Concordância nominal e concordância verbal', 'port-concord'],
    ['Flexão nominal e flexão verbal', 'port-verbos'],
    ['Vozes do verbo', 'port-verbos'],
    ['Correlação de tempos e modos verbais', 'port-verbos'],
    ['Regência nominal e regência verbal', 'port-concord'],
    ['Coordenação e subordinação', 'port-sintaxe'],
    ['Conectivos', 'port-sintaxe'],
    ['Redação: confronto e reconhecimento de frases corretas e incorretas; organização e reorganização de orações e períodos; equivalência e transformação de estruturas', 'port-sintaxe']
  ],
  mat: [
    ['Estrutura lógica de relações arbitrárias entre pessoas, lugares, objetos ou eventos fictícios', 'mat-rl'],
    ['Raciocínio verbal, matemático, sequencial; orientação espacial e temporal; formação de conceitos; discriminação de elementos', 'mat-rl'],
    ['Processo lógico: de um conjunto de hipóteses a conclusões válidas', 'mat-logica'],
    ['Números inteiros e racionais: operações, expressões numéricas', 'mat-aritm'],
    ['Múltiplos e divisores de números naturais; problemas', 'mat-aritm'],
    ['Frações e operações com frações', 'mat-aritm'],
    ['Razões e proporções; divisão em partes proporcionais; regra de três', 'mat-prop'],
    ['Porcentagem, acréscimos e descontos', 'mat-prop'],
    ['Estatística: média, moda, mediana, média ponderada', 'mat-estat'],
    ['Dispersão: desvio médio, amplitude, variância, desvio padrão', 'mat-estat'],
    ['Leitura e interpretação de gráficos (histogramas, setores, infográficos) e tabelas', 'mat-estat']
  ],
  leg: [
    ['Resolução CNJ nº 400/2021 — Política de sustentabilidade do Poder Judiciário', 'leg-sust'],
    ['Código de Conduta e Valores Éticos do TRT4 (Portaria GP.TRT4 nº 4.573/2023, compilada com a Portaria nº 2.808/2025)', 'leg-conduta'],
    ['Regimento Interno do TRT4 (atualizado até a RA nº 31/2026 — Assento Regimental nº 04/2026)', 'leg-regimento'],
    ['Resolução CSJT nº 360/2023 — Prevenção e enfrentamento da violência, do assédio e da discriminação na JT', 'leg-assedio'],
    ['Resolução CNJ nº 351/2020 — Política de prevenção e enfrentamento do assédio moral, sexual e da discriminação', 'leg-assedio']
  ],
  dh: [
    ['Evolução histórica e fundamentos filosóficos dos Direitos Humanos', 'dh-teoria'],
    ['Fontes, classificação, princípios, características e gerações de direitos', 'dh-teoria'],
    ['Interpretação dos tratados; colisão entre direitos humanos', 'dh-teoria'],
    ['Tratados internacionais em face da CF/88; controle de convencionalidade', 'dh-tratados'],
    ['DUDH, PIDCP, PIDESC e protocolos facultativos', 'dh-onu'],
    ['Convenções: discriminação racial, mulher (CEDAW), criança, pessoa com deficiência', 'dh-onu'],
    ['Patrimônio mundial (Estocolmo), diversidade biológica, povos indígenas', 'dh-onu'],
    ['Tribunal Penal Internacional (Estatuto de Roma) e Carta da ONU / Estatuto da CIJ', 'dh-onu'],
    ['Sistema Interamericano: Declaração Americana, Convenção Americana, Protocolo de San Salvador, Comissão e Corte IDH', 'dh-oea'],
    ['Mecanismos de proteção na ordem nacional e internacional', 'dh-tratados'],
    ['Direitos humanos em espécie, grupos vulneráveis e minorias', 'dh-grupos'],
    ['Perspectiva de gênero (Res. CNJ 492/2023) e Programa de Equidade (Res. CSJT 368/2023)', 'dh-grupos']
  ],
  devops: [
    ['DevOps e DevSecOps; gestão de configuração', 'devops-cicd'],
    ['Modelo de versionamento, merge, branch, pipeline', 'devops-git'],
    ['Git; GitLab com Wiki; Gitflow; versionamento com Git e GitHub', 'devops-git'],
    ['Continuous Delivery e Continuous Integration (CI/CD); gerenciamento de tarefas; deploy de aplicações', 'devops-cicd'],
    ['Serviços de autenticação; SSO; Keycloak', 'devops-auth'],
    ['OAuth2 (RFC 6749) e boas práticas de segurança (RFC 9700); JWT', 'devops-auth'],
    ['Mensageria e webhooks; message broker; RabbitMQ; evento negocial; APIs reversas', 'devops-msg'],
    ['Proxy reverso; SSL offloading; balanceamento de carga', 'devops-msg']
  ],
  pdpj: [
    ['Linguagem de programação Java; fundamentos de programação', 'pdpj-java'],
    ['Orientação a objetos: classes, métodos, interfaces, herança, encapsulamento, pacotes, sobrescrita e sobrecarga', 'pdpj-oo'],
    ['Arquitetura distribuída de microsserviços; API RESTful; JSON; OpenAPI/Swagger', 'pdpj-micro'],
    ['Jakarta EE 8 (legado) e Jakarta EE 11', 'pdpj-micro'],
    ['Spring Framework, Spring Boot, Spring Cloud, Eureka, Zuul, Service Discovery, API Gateway, MapStruct', 'pdpj-spring'],
    ['Persistência: JPA 2.0, Hibernate 5+, Hibernate Envers, Flyway; Jakarta Persistence 3.2 e Hibernate ORM 7.x', 'pdpj-jpa'],
    ['Banco de dados: PostgreSQL e H2 Database; acesso a banco de dados', 'pdpj-jpa'],
    ['Serviços e aplicações: JBoss e WildFly', 'pdpj-servers'],
    ['Elasticsearch, Logstash e Kibana (ELK)', 'pdpj-servers']
  ],
  cont: [
    ['Docker', 'cont-docker'],
    ['Kubernetes; Rancher; ambiente de clusters; orquestração de contêineres', 'cont-k8s'],
    ['Arquitetura e computação em nuvem; nuvem pública e privada', 'cont-cloud'],
    ['IaaS, PaaS e SaaS; Serverless Framework; serverless computing', 'cont-cloud']
  ],
  eng: [
    ['Processo de desenvolvimento; ciclos de vida; engenharia de requisitos', 'eng-processo'],
    ['Low-code e no-code; uso de assistentes de IA no desenvolvimento', 'eng-processo'],
    ['CMMI v3.0 (domínio Development); ABNT NBR ISO/IEC/IEEE 12207:2021; MR-MPS-SW 2024', 'eng-qualidade'],
    ['Testes: cobertura, unitários, integração, funcionais; JUnit 6 (Jupiter, migração do JUnit 5); Mockito', 'eng-testes'],
    ['Metodologias ágeis (Scrum, XP etc.) e tradicionais; análise, projeto e implementação', 'eng-agil'],
    ['Modelagem de processos de negócio com BPMN; UML 2.5.1', 'eng-uml'],
    ['Arquiteturas: multicamadas, cliente-servidor, objetos distribuídos; padrões de projeto', 'eng-arq']
  ],
  web: [
    ['Java, Python, JavaScript, TypeScript, Angular', 'web-js'],
    ['Python', 'web-python'],
    ['HTML5, CSS3; linguagens de marcação XML e XML Schema', 'web-html'],
    ['JSF, jQuery, Node.js, React, Vue.js, Angular; Bootstrap, Angular Material', 'web-frameworks'],
    ['Progressive Web Apps', 'web-frameworks'],
    ['Manutenção de sistemas: relatórios, diagnóstico, depuração; Eclipse IDE e VS Code', 'web-manut']
  ],
  redes: [
    ['Modelo OSI; arquitetura TCP/IP', 'redes-modelos'],
    ['IPv4 e IPv6; endereçamento; CIDR; NAT', 'redes-ip'],
    ['Elementos de interconexão e equipamentos ativos; VLAN (802.1Q); topologias; cabeamento estruturado; fibras; codificação de sinal', 'redes-equip'],
    ['Redes sem fio: IEEE 802.11, 802.11ax (Wi-Fi 6/6E), WPA, WPA2 e WPA3', 'redes-wifi'],
    ['Gerenciamento, monitoramento e diagnóstico; AAA; IPSec', 'redes-gerencia']
  ],
  seg: [
    ['Princípios (CID); ISO/IEC 27001:2024, 27002:2022, 27701:2019, 27005:2023; CIS Controls v8', 'seg-fund'],
    ['Lei Geral de Proteção de Dados (LGPD)', 'seg-lgpd'],
    ['Gestão de riscos e incidentes; continuidade de negócios; backup e recuperação', 'seg-riscos'],
    ['Criptografia simétrica, assimétrica e pós-quântica; hash; assinatura digital; ICP/PKI; TLS 1.2', 'seg-cripto'],
    ['Controle de acesso: MFA, RBAC, auditoria', 'seg-acesso'],
    ['Firewall, WAF, UTM, IDS, IPS, SIEM, proxy, NAC, antivírus/antispam; DMZ; sniffer; VPN e ZTNA; segurança Wi-Fi/EAP', 'seg-redes'],
    ['Ataques (spoofing, DoS, DDoS, flood), malwares, teste de intrusão, análise de vulnerabilidades, hardening', 'seg-ataques'],
    ['Desenvolvimento seguro: SDL, CLASP, codificação segura, programação defensiva, OWASP Top 10:2025', 'seg-devsec']
  ],
  norm: [
    ['Resolução CNJ nº 443/2022; Resolução CNJ nº 574/2024; Portarias CNJ nº 252/2020, 284/2021, 253/2020 e 131/2021', 'norm-pdpj'],
    ['MoReq-Jus 2ª edição e Resolução CNJ nº 522/2023', 'norm-moreq'],
    ['Resolução CNJ nº 396/2021 (ENSEC-PJ) e Portaria CNJ nº 162/2021', 'norm-ensec'],
    ['Modelo de Governança de TIC do TRT4 e PDTIC 2024-2026', 'norm-gov']
  ],
  ing: [
    ['Inglês técnico', 'ing-tecnico']
  ]
};

/* utilitário para os arquivos de conteúdo */
window.T = function (t) { DATA.topics[t.id] = t; };
/* embaralha as alternativas de forma determinística (mesma ordem sempre, para o progresso salvo
   continuar válido) e atualiza as referências “(A)”…“(E)” do comentário */
function shuffle(q) {
  if (q.o.every(function (o) { return /^[\d\s.,;:%R$\/–-]+$/.test(o); })) return; /* alternativas numéricas ficam em ordem crescente, como na FCC */
  var h = 2166136261, i, L = 'ABCDE';
  for (i = 0; i < q.id.length; i++) { h ^= q.id.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  var idx = [0, 1, 2, 3, 4];
  for (i = 4; i > 0; i--) { h = (Math.imul(h, 1103515245) + 12345) >>> 0; var j = h % (i + 1), t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
  var pos = []; idx.forEach(function (old, n) { pos[old] = n; });
  q.o = idx.map(function (old) { return q.o[old]; });
  q.a = pos[q.a];
  q.e = q.e.replace(/\(([A-E])\)/g, function (_, l) { return '(' + L[pos[L.indexOf(l)]] + ')'; });
}
window.Q = function (disc, list) {
  Q.n = Q.n || {};
  list.forEach(function (q) {
    Q.n[q.topic] = (Q.n[q.topic] || 0) + 1;
    q.disc = disc; q.id = q.id || (q.topic + '-' + Q.n[q.topic]);
    shuffle(q);
    DATA.questions.push(q);
  });
};

/* aula completa (explicação didática) de um tópico — arquivos aulas-*.js */
window.A = function (id, md) {
  if (!DATA.topics[id]) { console.warn('Aula para tópico inexistente:', id); return; }
  DATA.topics[id].aula = md;
};
