/* Conhecimentos Específicos — DevOps, PDPJ-Br/Java, Engenharia de Software, Programação Web */

/* ======================= DEVOPS ======================= */
T({ id: 'devops-git', disc: 'devops', title: 'Git, GitLab, GitHub e Gitflow',
diagrams: [{ src: 'gitflow.svg', cap: 'Gitflow: main, develop, feature, release e hotfix' }],
summary: `
## Conceitos de versionamento
- **VCS centralizado** (SVN, CVS): um servidor central guarda o histórico. **Distribuído (DVCS)** (Git, Mercurial): **cada clone tem o histórico completo**, permitindo commits offline.
- **Gestão de configuração**: identificar itens de configuração, controlar mudanças, registrar status e auditar versões/baselines.

## As três áreas do Git
**Working directory** (arquivos editados) → \`git add\` → **staging area / index** → \`git commit\` → **repositório local** (.git) → \`git push\` → **remoto**.

## Comandos essenciais
| Comando | Função |
|---|---|
| \`git init\` / \`git clone url\` | cria repositório / copia um remoto com todo o histórico |
| \`git status\`, \`git diff\` | situação dos arquivos / diferenças não preparadas (\`--staged\` para preparadas) |
| \`git add\`, \`git commit -m\` | prepara / grava snapshot |
| \`git commit --amend\` | refaz o último commit (não use em commit já publicado) |
| \`git log --oneline --graph\` | histórico |
| \`git branch nome\` / \`git switch -c nome\` (ou \`checkout -b\`) | cria ramo / cria e muda |
| \`git merge ramo\` | integra ramo ao atual (fast-forward ou merge commit) |
| \`git rebase base\` | reaplica commits sobre outra base (histórico linear; **não reescreva histórico público**) |
| \`git cherry-pick hash\` | aplica um commit específico |
| \`git fetch\` | baixa do remoto **sem** integrar |
| \`git pull\` | \`fetch\` + \`merge\` (ou rebase com \`--rebase\`) |
| \`git push origin ramo\` | envia commits |
| \`git stash\` / \`stash pop\` | guarda alterações temporariamente |
| \`git reset --soft/--mixed/--hard\` | move HEAD: mantém staging / mantém working dir / descarta tudo |
| \`git revert hash\` | cria **novo commit** que desfaz outro (seguro para histórico público) |
| \`git tag v1.0\` | marca versão (release) |
| \`git blame\`, \`git bisect\` | autoria por linha / busca binária do commit que introduziu bug |

**Arquivos**: \`.gitignore\` (ignorar), \`.gitattributes\`. **HEAD** aponta para o commit/ramo atual; *detached HEAD* = HEAD apontando direto para um commit.

## Merge × rebase
- **Merge** preserva o histórico real, pode criar **merge commit**; **fast-forward** quando o ramo-alvo não divergiu.
- **Rebase** reescreve commits, deixando histórico linear. Regra de ouro: **não faça rebase de commits já compartilhados**.
- **Squash**: junta vários commits em um (comum em *merge requests*).
- **Conflito**: editar arquivo com marcadores \`<<<<<<<\`, \`=======\`, \`>>>>>>>\`, depois \`add\` + \`commit\` (ou \`rebase --continue\`).

## Modelos de ramificação
- **Gitflow** (Vincent Driessen): ramos permanentes **main/master** (produção) e **develop** (integração); temporários **feature/** (saem e voltam para develop), **release/** (saem de develop, preparam versão, vão para main **e** develop), **hotfix/** (saem de **main**, corrigem produção, voltam para main e develop). Tags em main a cada versão.
- **GitHub Flow**: main sempre implantável + feature branches + pull request.
- **GitLab Flow**: adiciona ramos de **ambiente** (staging, production) ou de release.
- **Trunk-based development**: commits pequenos e frequentes no tronco, *feature flags*; favorece CI contínua.

## GitLab
Plataforma DevOps completa: repositórios Git, **Merge Requests** (equivalente ao Pull Request do GitHub), **Issues**, **Boards** (kanban), **Milestones**, **Wiki** (documentação versionada do projeto — também um repositório Git), **CI/CD** nativo via arquivo **\`.gitlab-ci.yml\`** e **GitLab Runners**, Container Registry, controle de acesso por papéis (Guest, Reporter, Developer, Maintainer, Owner), *protected branches*. A PDPJ-Br hospeda seus códigos em GitLab (git.cloud.pje.jus.br).

## GitHub
Pull Requests, Actions (\`.github/workflows/*.yml\`), Issues, Projects, forks, GitHub Pages, Dependabot.
`,
mindmap: `
Git e versionamento
  Conceitos
    Distribuído: histórico completo
    Gestão de configuração
    Baseline e tag
  Áreas
    Working directory
    Staging (index)
    Repositório local
    Remoto
  Comandos
    add, commit, push
    fetch × pull
    branch, switch, merge
    rebase, cherry-pick
    stash
    reset × revert
    bisect, blame
  Integração
    Fast-forward
    Merge commit
    Rebase: não reescrever público
    Squash
    Conflitos
  Modelos
    Gitflow
      main e develop
      feature → develop
      release → main + develop
      hotfix ← main
    GitHub Flow
    GitLab Flow
    Trunk-based
  GitLab
    Merge Request
    Issues e Boards
    Wiki
    .gitlab-ci.yml e Runners
`,
cards: [
  ['Diferença entre git fetch e git pull?', 'fetch apenas baixa os objetos do remoto; pull faz fetch + merge (ou rebase).'],
  ['Qual comando desfaz um commit já publicado sem reescrever histórico?', 'git revert (cria um novo commit inverso).'],
  ['No Gitflow, de onde sai um hotfix e para onde volta?', 'Sai de main e é integrado em main e em develop.'],
  ['git reset --hard faz o quê?', 'Move o HEAD e descarta alterações do staging e do working directory.'],
  ['Arquivo de pipeline do GitLab?', '.gitlab-ci.yml, executado por GitLab Runners.'],
  ['Comando para encontrar, por busca binária, o commit que introduziu um bug?', 'git bisect.'],
  ['Equivalente do Pull Request no GitLab?', 'Merge Request.']
]});

T({ id: 'devops-cicd', disc: 'devops', title: 'DevOps, DevSecOps e CI/CD',
diagrams: [{ src: 'cicd.svg', cap: 'Pipeline CI/CD com etapas de segurança (DevSecOps)' }],
summary: `
## DevOps
Cultura e práticas que integram **desenvolvimento (Dev)** e **operações (Ops)** para entregar software com **rapidez, qualidade e confiabilidade**.
- **CALMS**: *Culture, Automation, Lean, Measurement, Sharing*.
- **Três caminhos** (The Phoenix Project): fluxo (esquerda → direita), feedback (direita → esquerda), aprendizado contínuo/experimentação.
- **Métricas DORA**: frequência de deploy, *lead time* para mudanças, taxa de falha de mudanças e tempo de restauração (MTTR).
- Práticas: **infraestrutura como código** (Terraform, Ansible), monitoramento/observabilidade (logs, métricas, traces), *feature flags*, pequenos lotes.

## DevSecOps
Segurança **integrada em todo o ciclo** (*shift left*): responsabilidade compartilhada e verificações automatizadas no pipeline.
| Prática | O que faz |
|---|---|
| **SAST** | análise estática do código-fonte (caixa branca), sem executar |
| **DAST** | testa a aplicação **em execução** (caixa preta) |
| **IAST** | instrumenta a aplicação durante testes (híbrido) |
| **SCA** | análise de **dependências** de terceiros/bibliotecas vulneráveis; SBOM |
| *Secret scanning* | detecta credenciais no repositório |
| *Container/IaC scanning* | imagens e scripts de infraestrutura |
| RASP | proteção em tempo de execução, dentro da aplicação |

## CI/CD
- **Integração Contínua (CI)**: integrar o código ao ramo principal **várias vezes ao dia**, com **build e testes automatizados** a cada commit; feedback rápido e detecção precoce de conflitos.
- **Entrega Contínua (Continuous Delivery)**: o software está **sempre pronto** para produção; o deploy em produção é uma decisão de negócio (**aprovação manual**).
- **Implantação Contínua (Continuous Deployment)**: toda mudança que passa no pipeline vai **automaticamente** para produção, sem intervenção humana.

> [!fcc] Delivery × Deployment: a diferença está no **gatilho manual** para produção (Delivery) × **automático** (Deployment).

## Pipeline típico
**commit → build/compilação → testes unitários → análise estática (SAST, qualidade — ex.: SonarQube) → empacotamento (artefato/imagem Docker) → publicação no registry → deploy em homologação → testes de integração/aceitação/DAST → aprovação → deploy em produção → monitoramento.**

No GitLab CI: o \`.gitlab-ci.yml\` define **stages** (ex.: build, test, deploy) e **jobs**; jobs do mesmo stage rodam em paralelo; **artifacts**, **cache**, **variables**, **rules/only**, **environments** e ambientes de revisão; executados por **Runners**.

## Estratégias de deploy
| Estratégia | Ideia |
|---|---|
| **Blue-green** | dois ambientes idênticos; troca o tráfego de uma vez; rollback instantâneo |
| **Canary** | libera para pequena parcela de usuários e amplia gradualmente |
| **Rolling update** | substitui instâncias aos poucos (padrão do Kubernetes Deployment) |
| **Recreate** | derruba a versão antiga e sobe a nova (há indisponibilidade) |
| **Feature toggle** | código novo desligado por configuração |
| **A/B testing** | versões diferentes para medir comportamento |

## Gerenciamento de tarefas
Issues, quadros Kanban (To do / Doing / Done), *milestones*, rastreabilidade commit ↔ issue (ex.: “Closes #42” na mensagem).
`,
mindmap: `
DevOps e CI/CD
  DevOps
    Cultura Dev + Ops
    CALMS
    Três caminhos
    Métricas DORA
    Infraestrutura como código
    Observabilidade
  DevSecOps
    Shift left
    SAST: código estático
    DAST: app em execução
    IAST e RASP
    SCA: dependências
    Secret scanning
  CI
    Integra várias vezes ao dia
    Build e testes automáticos
  CD
    Delivery: produção manual
    Deployment: produção automática
  Pipeline
    Build
    Testes
    Análise de qualidade
    Artefato e registry
    Deploy e monitoramento
  Estratégias de deploy
    Blue-green
    Canary
    Rolling update
    Feature flags
`,
cards: [
  ['Continuous Delivery × Continuous Deployment?', 'Delivery: sempre pronto, com aprovação manual para produção. Deployment: vai para produção automaticamente.'],
  ['SAST × DAST?', 'SAST analisa o código-fonte sem executar (caixa branca); DAST testa a aplicação em execução (caixa preta).'],
  ['O que é SCA?', 'Software Composition Analysis: identifica vulnerabilidades e licenças em dependências de terceiros.'],
  ['Estratégia que libera a nova versão para uma pequena fração dos usuários?', 'Canary release.'],
  ['Quais são as quatro métricas DORA?', 'Frequência de deploy, lead time de mudanças, taxa de falha de mudanças e tempo de restauração.'],
  ['O que significa “shift left” em DevSecOps?', 'Antecipar as atividades de segurança para as fases iniciais do ciclo de desenvolvimento.']
]});

T({ id: 'devops-auth', disc: 'devops', title: 'SSO, Keycloak, OAuth 2.0 (RFC 6749 e RFC 9700) e JWT',
diagrams: [{ src: 'oauth2.svg', cap: 'Fluxo Authorization Code com PKCE (recomendado pela RFC 9700)' }],
summary: `
## Autenticação × autorização
**Autenticação**: provar quem você é. **Autorização**: o que você pode fazer. **SSO (Single Sign-On)**: um login dá acesso a vários sistemas confiáveis; **SLO**: logout único.

## Keycloak
Servidor de **gestão de identidade e acesso (IAM)** de código aberto (Red Hat/CNCF), usado como **SSO da PDPJ-Br** (sso.cloud.pje.jus.br).
- **Realm**: espaço isolado de usuários, clientes e configurações.
- **Client**: aplicação que usa o Keycloak (pública ou confidencial; *client id/secret*).
- **Users, Groups, Roles** (realm roles e client roles) → base para **RBAC**.
- Protocolos: **OpenID Connect**, **OAuth 2.0** e **SAML 2.0**.
- **Identity brokering** (login via provedores externos, ex.: gov.br, certificado digital), **user federation** (LDAP/Active Directory), MFA/OTP, temas de login.
- Emite **tokens JWT** (access token, ID token, refresh token).

## OAuth 2.0 (RFC 6749) — *framework de autorização delegada*
**Papéis:**
| Papel | Quem é |
|---|---|
| **Resource Owner** | o usuário dono dos dados |
| **Client** | a aplicação que quer acessar em nome do usuário |
| **Authorization Server** | emite tokens (ex.: Keycloak) |
| **Resource Server** | a API protegida que aceita o access token |

**Grants (fluxos) da RFC 6749:** *Authorization Code*, *Implicit*, *Resource Owner Password Credentials*, *Client Credentials* (máquina-a-máquina, sem usuário) + *Refresh Token*. Endpoints: **/authorize** (interação no navegador) e **/token** (back-channel).

**Authorization Code (passo a passo):** 1) cliente redireciona o usuário ao /authorize com client_id, redirect_uri, scope, state (e code_challenge no PKCE); 2) usuário autentica e consente; 3) servidor redireciona de volta com um **code**; 4) cliente troca o code por **access token** no /token (com code_verifier no PKCE); 5) cliente chama a API com \`Authorization: Bearer <token>\`.

> [!fcc] OAuth 2.0 é de **autorização**. A camada de **autenticação** (identidade do usuário, **ID Token**) é o **OpenID Connect (OIDC)**, construído sobre o OAuth 2.0.

## RFC 9700 — OAuth 2.0 Security Best Current Practice (jan/2025)
- **PKCE** (RFC 7636) **recomendado para todos os clientes** e obrigatório para clientes públicos; usar \`code_challenge_method=S256\`. Também protege contra injeção de *authorization code* e CSRF.
- **Implicit grant não deve ser usado** (token exposto na URL/histórico); use Authorization Code + PKCE.
- **Resource Owner Password Credentials NÃO DEVE ser usado** (MUST NOT).
- **Correspondência exata** de \`redirect_uri\` (sem curingas) — evita *open redirect* e roubo de code.
- Proteção contra **CSRF** com PKCE, \`state\` de uso único ou \`nonce\` do OIDC.
- **Refresh tokens** de clientes públicos devem ser *sender-constrained* ou usar **rotação** (detecção de reuso).
- **Tokens sender-constrained** (mTLS — RFC 8705 — ou **DPoP** — RFC 9449) para evitar replay de tokens roubados.
- **Privilégio mínimo**: restringir *scope* e *audience* do access token.
- Não enviar tokens em query string; usar TLS em tudo; atenção a *mix-up attacks* (parâmetro \`iss\`).

## JWT — JSON Web Token (RFC 7519)
Formato compacto: \`header.payload.signature\` em **Base64URL**.
- **Header**: \`alg\` (HS256, RS256, ES256…) e \`typ\`.
- **Payload** (*claims*): \`iss\` (emissor), \`sub\` (sujeito), \`aud\` (audiência), \`exp\` (expiração), \`nbf\`, \`iat\`, \`jti\`; claims privadas (roles…).
- **Signature**: garante **integridade e autenticidade** (JWS). O payload **não é criptografado** — é apenas codificado; para sigilo usa-se **JWE**.
- HS256 = HMAC com segredo compartilhado (simétrico); RS256 = RSA com chave privada para assinar e **pública** para validar (o Keycloak publica as chaves em JWKS).
- Boas práticas: validar assinatura, \`exp\`, \`iss\`, \`aud\`; rejeitar \`alg: none\`; tokens de curta duração.
`,
mindmap: `
Autenticação PDPJ
  Conceitos
    Autenticação × autorização
    SSO e SLO
  Keycloak
    Realm
    Clients
    Users, Groups, Roles
    OIDC, OAuth2, SAML
    Federação LDAP/AD
    Identity brokering
  OAuth 2.0 RFC 6749
    Papéis
      Resource Owner
      Client
      Authorization Server
      Resource Server
    Grants
      Authorization Code
      Client Credentials
      Refresh Token
      Implicit (obsoleto)
      Password (proibido)
  RFC 9700
    PKCE para todos
    Sem Implicit
    Sem ROPC
    redirect_uri exato
    Rotação de refresh token
    mTLS e DPoP
    Privilégio mínimo
  OIDC
    ID Token
    Autenticação
  JWT
    header.payload.signature
    Base64URL, não cifrado
    Claims iss, sub, aud, exp
    HS256 × RS256
`,
cards: [
  ['OAuth 2.0 serve para autenticação ou autorização?', 'Autorização delegada. A autenticação padronizada sobre ele é o OpenID Connect.'],
  ['Quais são os quatro papéis do OAuth 2.0?', 'Resource Owner, Client, Authorization Server e Resource Server.'],
  ['Segundo a RFC 9700, o Implicit Grant deve ser usado?', 'Não; deve ser substituído por Authorization Code com PKCE.'],
  ['Grant adequado para comunicação serviço-a-serviço sem usuário?', 'Client Credentials.'],
  ['O payload de um JWT assinado é sigiloso?', 'Não; é apenas codificado em Base64URL. Para sigilo, usa-se JWE.'],
  ['Para que serve o PKCE?', 'Vincular a requisição de autorização à troca do code (code_verifier/code_challenge), impedindo interceptação e injeção do code.'],
  ['No Keycloak, o que é um realm?', 'Um espaço isolado que agrupa usuários, clientes, papéis e configurações.'],
  ['Diferença entre HS256 e RS256?', 'HS256 usa segredo compartilhado (HMAC); RS256 assina com chave privada RSA e valida com a pública.']
]});

T({ id: 'devops-msg', disc: 'devops', title: 'Mensageria, RabbitMQ, webhooks, proxy reverso e balanceamento',
diagrams: [{ src: 'rabbitmq.svg', cap: 'RabbitMQ: produtor → exchange → bindings → filas → consumidores' }],
summary: `
## Comunicação síncrona × assíncrona
- **Síncrona** (REST/HTTP): o chamador espera a resposta; acoplamento temporal.
- **Assíncrona** (mensageria): produtor publica e segue; o consumidor processa depois. Vantagens: **desacoplamento**, absorção de picos (*buffer*), resiliência, escalabilidade.
- **Evento negocial (de negócio)**: fato relevante do domínio já ocorrido, nomeado no passado (*ProcessoDistribuído*, *PeticaoProtocolada*), publicado para que outros serviços reajam — base da **arquitetura orientada a eventos** e do padrão **Saga**.

## Message Broker
Intermediário que recebe, armazena e encaminha mensagens. Modelos: **ponto a ponto (fila)** — cada mensagem é consumida por **um** consumidor; **publish/subscribe (tópico)** — cada assinante recebe sua cópia. Exemplos: RabbitMQ, Apache Kafka, ActiveMQ.

## RabbitMQ (broker da PDPJ-Br)
Implementa principalmente o **AMQP 0-9-1** (também MQTT, STOMP via plugins).
- **Producer** publica em uma **exchange** (nunca diretamente na fila), com uma **routing key**.
- **Exchange** roteia para **queues** conforme **bindings**:
| Tipo de exchange | Roteamento |
|---|---|
| **direct** | routing key **exatamente igual** à binding key |
| **fanout** | **todas** as filas ligadas (broadcast), ignora a key |
| **topic** | padrão com curingas: \`*\` = exatamente uma palavra, \`#\` = zero ou mais (ex.: \`processo.*.criado\`) |
| **headers** | atributos do cabeçalho em vez da key |
- **Default exchange** (direct, sem nome): roteia para a fila de nome igual à routing key.
- **Consumer** recebe por *push* e confirma com **ack**; sem ack, a mensagem volta à fila (*redelivery*). **nack/reject** pode enviar para **DLX/DLQ** (*dead letter exchange/queue*).
- **Durabilidade**: fila *durable* + mensagem *persistent* sobrevivem a reinício. **Prefetch (QoS)** limita mensagens não confirmadas por consumidor. Filas **quorum** (replicação Raft) para alta disponibilidade.
- Garantias usuais: entrega **at-least-once** → consumidores devem ser **idempotentes**.

## Webhook e “APIs reversas”
- **Webhook**: callback HTTP — o **servidor de origem chama a URL do cliente** (normalmente via POST com JSON) quando um evento acontece. É chamado de **API reversa** porque inverte o sentido usual (em vez do cliente fazer *polling*, o provedor empurra a notificação).
- Boas práticas: assinar a carga (HMAC em cabeçalho), HTTPS, retentativas com *backoff*, idempotência, responder rápido (2xx) e processar assíncrono.

## Proxy reverso
Fica **na frente dos servidores** de aplicação e recebe as requisições dos clientes em nome deles (o **proxy de encaminhamento/forward** fica na frente dos **clientes**).
Funções: **balanceamento de carga**, **SSL/TLS termination (offloading)**, cache, compressão, roteamento por caminho/host, ocultação da topologia interna, WAF, *rate limiting*. Exemplos: **Nginx**, **HAProxy**, Apache httpd (mod_proxy), Traefik, Envoy; no Kubernetes, o **Ingress Controller**.

## SSL offloading
O proxy/balanceador **termina a conexão TLS** (descriptografa) e repassa ao backend em HTTP (ou recriptografa — *SSL bridging*/re-encryption). Benefícios: alivia a CPU dos servidores, **centraliza certificados**, permite inspeção (WAF) e cache. Risco: tráfego interno em claro se não houver recriptografia. **SSL passthrough**: o balanceador não descriptografa (camada 4).

## Balanceamento de carga
- **Camada 4** (transporte — IP/porta) × **camada 7** (aplicação — URL, cabeçalhos, cookies).
- Algoritmos: **round robin**, *weighted round robin*, **least connections**, *least response time*, **IP hash** (afinidade), aleatório.
- **Sessão persistente (sticky session)**: mesmo cliente → mesmo servidor (cookie/IP). Em microsserviços prefere-se aplicação **stateless** (sessão em JWT/Redis).
- **Health checks** retiram servidores com falha do pool. Alta disponibilidade: ativo-ativo / ativo-passivo.
`,
mindmap: `
Integração e tráfego
  Comunicação
    Síncrona: REST
    Assíncrona: mensageria
    Evento negocial
  Message broker
    Fila: ponto a ponto
    Pub/Sub
    RabbitMQ, Kafka
  RabbitMQ
    AMQP 0-9-1
    Producer → exchange
    Exchanges
      direct
      fanout
      topic: * e #
      headers
    Bindings e routing key
    ack, nack, DLQ
    Durable e persistent
    Consumidor idempotente
  Webhook
    Callback HTTP POST
    API reversa
    Assinatura HMAC
  Proxy reverso
    Na frente dos servidores
    Nginx, HAProxy
    Ingress no K8s
  SSL offloading
    Termina TLS no proxy
    Centraliza certificados
    Passthrough
  Balanceamento
    L4 × L7
    Round robin
    Least connections
    IP hash e sticky
    Health check
`,
cards: [
  ['Exchange do RabbitMQ que entrega a todas as filas ligadas?', 'fanout.'],
  ['No exchange topic, o que significam * e #?', '* casa exatamente uma palavra; # casa zero ou mais palavras.'],
  ['Por que webhook é chamado de “API reversa”?', 'Porque o provedor chama o endpoint do cliente quando ocorre o evento, em vez de o cliente consultar (polling).'],
  ['Proxy reverso × proxy de encaminhamento?', 'Reverso fica na frente dos servidores; forward fica na frente dos clientes.'],
  ['O que é SSL offloading?', 'Terminar a criptografia TLS no proxy/balanceador, aliviando os servidores de aplicação.'],
  ['Algoritmo que envia ao servidor com menos conexões ativas?', 'Least connections.'],
  ['Para onde vão mensagens rejeitadas ou expiradas no RabbitMQ?', 'Para uma Dead Letter Exchange/Queue (DLX/DLQ), se configurada.']
]});

/* ======================= PDPJ-Br / JAVA ======================= */
T({ id: 'pdpj-java', disc: 'pdpj', title: 'Java e fundamentos de programação',
summary: `
## Plataforma Java
- **Código-fonte (.java)** → \`javac\` → **bytecode (.class)** → executado pela **JVM** (interpretação + compilação **JIT**). “Write once, run anywhere”.
- **JDK** (ferramentas de desenvolvimento) ⊃ **JRE** (execução) ⊃ **JVM**. Versões LTS recentes: 17, **21** (virtual threads, record patterns), 25.
- Ponto de entrada: \`public static void main(String[] args)\`.
- **Garbage Collector** libera objetos sem referência (não há \`free\`/\`delete\`).

## Tipos de dados
| Primitivo | Tamanho | Padrão (atributo) |
|---|---|---|
| byte | 8 bits | 0 |
| short | 16 bits | 0 |
| int | 32 bits | 0 |
| long | 64 bits (\`10L\`) | 0L |
| float | 32 bits (\`1.5f\`) | 0.0f |
| double | 64 bits | 0.0 |
| char | 16 bits (Unicode) | '\\u0000' |
| boolean | — | false |
- **Tipos de referência**: classes, interfaces, arrays, enums, records. Padrão: \`null\`.
- **Wrappers** (Integer, Double…) e **autoboxing**. Cuidado: \`Integer a = 127, b = 127; a == b\` → true (cache −128..127); com 128 → false. Compare objetos com \`equals\`.
- **String** é **imutável**; \`==\` compara referência, \`equals\` compara conteúdo. Para concatenação intensa use \`StringBuilder\`.
- Variáveis locais **não** têm valor padrão (devem ser inicializadas). \`var\` (Java 10+) infere tipo local.
- \`final\`: variável não pode ser reatribuída; método não pode ser sobrescrito; classe não pode ser herdada.

## Operadores e precedência (da maior para a menor)
pós-fixos (\`x++\`) → unários (\`++x\`, \`!\`, \`-\`) → multiplicativos (\`* / %\`) → aditivos (\`+ -\`) → deslocamento (\`<< >> >>>\`) → relacionais (\`< > <= >= instanceof\`) → igualdade (\`== !=\`) → \`&\` → \`^\` → \`|\` → \`&&\` → \`||\` → ternário (\`?:\`) → atribuição (\`= += -=\`).
- **Divisão inteira**: \`7 / 2 = 3\`; \`7 % 2 = 1\`; \`7 / 2.0 = 3.5\`.
- \`&&\` e \`||\` são de **curto-circuito**; \`&\` e \`|\` avaliam ambos os lados.
- \`i++\` usa e depois incrementa; \`++i\` incrementa e depois usa.

## Controle de fluxo
\`if/else\`, \`switch\` (com \`break\`; *fall-through* sem ele; **switch expressions** com \`->\` e \`yield\` no Java 14+), \`while\`, \`do-while\` (executa **ao menos uma vez**), \`for\`, *enhanced for* (\`for (T x : colecao)\`), \`break\`, \`continue\`, rótulos.

## Estruturas de dados (Collections Framework)
| Interface | Implementações | Característica |
|---|---|---|
| **List** | ArrayList, LinkedList | ordenada, permite duplicatas, acesso por índice |
| **Set** | HashSet, LinkedHashSet, TreeSet | **sem duplicatas** (TreeSet ordenado) |
| **Queue/Deque** | ArrayDeque, PriorityQueue | FIFO / prioridade / pilha |
| **Map** | HashMap, LinkedHashMap, TreeMap | pares chave-valor, chaves únicas (não estende Collection) |
- Arrays têm tamanho fixo (\`int[] v = new int[5]\`; \`v.length\`). Índice inválido → \`ArrayIndexOutOfBoundsException\`.
- **Generics**: \`List<String>\`; **Streams** (Java 8): \`lista.stream().filter(...).map(...).collect(...)\`; **lambdas** e **Optional**.

## Exceções
- \`Throwable\` → **Error** (falhas graves da JVM: OutOfMemoryError) e **Exception**.
- **Checked** (verificadas em compilação; devem ser tratadas ou declaradas com \`throws\`): IOException, SQLException.
- **Unchecked** (\`RuntimeException\` e subclasses): NullPointerException, ArithmeticException (divisão inteira por zero), IllegalArgumentException, ClassCastException.
- \`try / catch / finally\` (**finally sempre executa**, exceto \`System.exit\`); **try-with-resources** fecha automaticamente objetos \`AutoCloseable\`; *multi-catch* \`catch (A | B e)\`; \`throw\` lança, \`throws\` declara.

## Acesso a banco de dados (JDBC)
\`DriverManager.getConnection(url)\` → \`Connection\` → **\`PreparedStatement\`** (parâmetros \`?\`, **previne SQL Injection** e é pré-compilado) → \`executeQuery()\` (SELECT, retorna \`ResultSet\`) / \`executeUpdate()\` (INSERT/UPDATE/DELETE, retorna nº de linhas) → fechar recursos. Transações: \`setAutoCommit(false)\`, \`commit()\`, \`rollback()\`. Em aplicações Spring usa-se **pool de conexões** (HikariCP) e JPA.
`,
mindmap: `
Java e fundamentos
  Plataforma
    javac → bytecode
    JVM e JIT
    JDK ⊃ JRE ⊃ JVM
    Garbage Collector
  Tipos
    8 primitivos
    Referência: null
    Wrappers e autoboxing
    String imutável
    equals × ==
    final
  Operadores
    Precedência
    Divisão inteira e %
    Curto-circuito && ||
    i++ × ++i
  Controle
    if, switch
    while, do-while
    for e for-each
  Coleções
    List: ordem, duplicatas
    Set: sem duplicatas
    Map: chave-valor
    Queue
    Streams e lambdas
  Exceções
    Checked: IOException
    Unchecked: RuntimeException
    finally sempre executa
    try-with-resources
  JDBC
    Connection
    PreparedStatement: evita injection
    ResultSet
    commit e rollback
`,
cards: [
  ['Resultado de 7 / 2 em Java (int)?', '3 (divisão inteira).'],
  ['Checked × unchecked exception?', 'Checked deve ser tratada ou declarada (ex.: IOException); unchecked herda de RuntimeException (ex.: NullPointerException).'],
  ['Qual estrutura não permite elementos duplicados?', 'Set (HashSet, TreeSet…).'],
  ['Por que usar PreparedStatement?', 'Parâmetros vinculados previnem SQL Injection, e a instrução é pré-compilada.'],
  ['O bloco finally executa se houver return no try?', 'Sim (exceto em System.exit ou falha da JVM).'],
  ['Comparar conteúdo de duas Strings em Java?', 'Com equals(); == compara referências.'],
  ['Laço que executa pelo menos uma vez?', 'do-while.'],
  ['Tamanho do tipo long?', '64 bits.']
]});

T({ id: 'pdpj-oo', disc: 'pdpj', title: 'Orientação a objetos',
summary: `
## Conceitos
- **Classe**: molde (atributos + métodos). **Objeto**: instância (\`new\`). **Construtor**: inicializa o objeto (mesmo nome da classe, sem retorno); se nenhum for declarado, o compilador cria o **padrão** (sem argumentos).
- \`this\` (o próprio objeto), \`super\` (superclasse), \`static\` (pertence à classe, não à instância).

## Os 4 pilares
1. **Abstração**: modelar o essencial do domínio.
2. **Encapsulamento**: ocultar o estado interno (atributos \`private\`) e expor comportamento via métodos (getters/setters, regras de negócio).
3. **Herança**: \`class B extends A\` — reuso e especialização (“é um”). Java tem **herança simples de classes** e **múltipla de interfaces**. Toda classe herda de \`Object\`.
4. **Polimorfismo**: o mesmo método com comportamentos diferentes.
   - **Sobrecarga (overloading)**: mesmo nome, **parâmetros diferentes** (quantidade/tipo/ordem), na mesma classe — resolvida em **tempo de compilação** (estático). Só mudar o tipo de retorno **não** é sobrecarga.
   - **Sobrescrita (overriding)**: subclasse redefine método herdado com **mesma assinatura** — resolvida em **tempo de execução** (dinâmico). Não pode reduzir visibilidade; pode usar retorno covariante; \`@Override\` ajuda o compilador.

## Modificadores de acesso
| Modificador | Classe | Pacote | Subclasse | Todos |
|---|---|---|---|---|
| \`private\` | ✔ | | | |
| *(default/package)* | ✔ | ✔ | | |
| \`protected\` | ✔ | ✔ | ✔ | |
| \`public\` | ✔ | ✔ | ✔ | ✔ |

## Classes abstratas × interfaces
| | Classe abstrata | Interface |
|---|---|---|
| Instanciável | não | não |
| Construtor | sim | não |
| Atributos | qualquer | apenas constantes (\`public static final\`) |
| Métodos | abstratos e concretos | abstratos; \`default\` e \`static\` (Java 8), \`private\` (Java 9) |
| Herança | \`extends\` (uma só) | \`implements\` (várias) |
- **Classe concreta** que estende abstrata deve implementar todos os métodos abstratos.
- **Sealed classes** (Java 17) restringem quem pode estender; **records** (Java 16) são classes imutáveis de dados.

## Pacotes
Organizam classes em namespaces (\`br.jus.trt4.sistema\`); \`import\` traz classes de outros pacotes; \`java.lang\` é importado automaticamente.

## Relações entre classes
**Associação**, **agregação** (todo-parte, parte existe sozinha), **composição** (parte depende do todo), **dependência**, **generalização**. Princípio: “**prefira composição a herança**”.

## SOLID
**S**ingle Responsibility, **O**pen/Closed (aberto à extensão, fechado à modificação), **L**iskov Substitution (subtipo substitui o tipo-base), **I**nterface Segregation, **D**ependency Inversion (depender de abstrações — base da **injeção de dependência** do Spring).
`,
mindmap: `
Orientação a objetos
  Fundamentos
    Classe e objeto
    Construtor
    this, super, static
  Pilares
    Abstração
    Encapsulamento: private
    Herança: extends, simples
    Polimorfismo
      Sobrecarga: compilação
      Sobrescrita: execução
  Acesso
    private
    default: pacote
    protected: subclasse
    public
  Abstração
    Classe abstrata: extends
    Interface: implements várias
    default methods
    records e sealed
  Pacotes
    import
    java.lang automático
  Relações
    Agregação
    Composição
    Prefira composição
  SOLID
    SRP, OCP, LSP
    ISP, DIP
`,
cards: [
  ['Sobrecarga × sobrescrita?', 'Sobrecarga: mesmo nome, parâmetros diferentes (compilação). Sobrescrita: subclasse redefine a mesma assinatura (execução).'],
  ['Mudar só o tipo de retorno caracteriza sobrecarga?', 'Não; gera erro de compilação.'],
  ['Visibilidade do modificador default (sem palavra-chave)?', 'Apenas classes do mesmo pacote.'],
  ['Java permite herança múltipla?', 'De classes, não; de interfaces, sim.'],
  ['Interface pode ter métodos com corpo?', 'Sim: métodos default e static (Java 8) e private (Java 9).'],
  ['O que diz o princípio de Liskov?', 'Objetos de uma subclasse devem poder substituir os da superclasse sem quebrar o comportamento.'],
  ['protected permite acesso a quem?', 'À própria classe, ao pacote e às subclasses (mesmo em outros pacotes).']
]});

T({ id: 'pdpj-micro', disc: 'pdpj', title: 'Microsserviços, REST, JSON, OpenAPI e Jakarta EE',
diagrams: [{ src: 'pdpj-arq.svg', cap: 'Arquitetura de referência de microsserviços da PDPJ-Br' }],
summary: `
## Monólito × microsserviços
| | Monólito | Microsserviços |
|---|---|---|
| Implantação | única unidade | serviços **independentes** |
| Escala | a aplicação inteira | cada serviço separadamente |
| Dados | banco compartilhado | **banco por serviço** (*database per service*) |
| Tecnologia | única | poliglota possível |
| Falhas | podem derrubar tudo | isoladas (com resiliência) |
| Complexidade | no código | na **distribuição** (rede, observabilidade, consistência) |

**Características**: serviços pequenos, alinhados a **contextos delimitados (DDD)**, comunicação por APIs leves (REST) ou mensagens, implantação automatizada, governança descentralizada, *design for failure*.

**Padrões**: **API Gateway**, **Service Discovery**, **Circuit Breaker** (Resilience4j), **Config Server** centralizado, **Saga** (transações distribuídas com compensação), **CQRS**, **Event Sourcing**, *Strangler Fig* (migração gradual do legado), **observabilidade** (logs centralizados — ELK; tracing distribuído).

> [!dica] A **PDPJ-Br** (Plataforma Digital do Poder Judiciário, Res. CNJ 335/2020) adota microsserviços **Java/Spring Boot**, em **contêineres Docker** orquestrados por **Kubernetes/Rancher**, com **SSO Keycloak**, **RabbitMQ**, **PostgreSQL** e **ELK**, e APIs documentadas em **OpenAPI** (Portaria CNJ 253/2020).

## REST (Roy Fielding, 2000)
Estilo arquitetural sobre HTTP. Restrições: **cliente-servidor**, **stateless** (cada requisição contém tudo o que é necessário), **cacheável**, **interface uniforme** (recursos identificados por URI, manipulação por representações, mensagens autodescritivas, **HATEOAS**), **sistema em camadas** e *code on demand* (opcional).

| Método | Uso | Seguro | Idempotente |
|---|---|---|---|
| GET | ler | ✔ | ✔ |
| POST | criar / processar | ✘ | ✘ |
| PUT | substituir recurso inteiro | ✘ | ✔ |
| PATCH | alteração parcial | ✘ | ✘ (em geral) |
| DELETE | remover | ✘ | ✔ |
| HEAD / OPTIONS | metadados / métodos permitidos (CORS preflight) | ✔ | ✔ |

**Códigos de status:** 200 OK, **201 Created** (com \`Location\`), 204 No Content, 301/302 redirecionamento, 304 Not Modified, **400** Bad Request, **401** Unauthorized (não autenticado), **403** Forbidden (autenticado sem permissão), **404** Not Found, 405 Method Not Allowed, 409 Conflict, 415 Unsupported Media Type, 422 Unprocessable Content, **429** Too Many Requests, **500** Internal Server Error, 502 Bad Gateway, **503** Service Unavailable, 504 Gateway Timeout.

Boas práticas de URI: substantivos no plural (\`/processos/123/documentos\`), versionamento (\`/v1/\`), filtros/paginação em query string.

## JSON
Formato texto leve (RFC 8259). Tipos: **string** (aspas duplas), **number**, **boolean**, **null**, **object** \`{}\`, **array** \`[]\`. Não aceita comentários, aspas simples nem vírgula final. Em Java: Jackson/JSON-B.

## OpenAPI / Swagger
**OpenAPI Specification** (antigo Swagger Specification; versões 3.0/3.1) descreve APIs REST em YAML/JSON: \`openapi\`, \`info\`, \`servers\`, \`paths\`, \`components\` (schemas, securitySchemes), \`security\`. Ferramentas **Swagger**: Swagger UI (documentação interativa), Swagger Editor, Codegen. No Spring: **springdoc-openapi** gera a especificação a partir das anotações. Abordagens *code-first* × *design/contract-first*.

## Jakarta EE
Sucessor do **Java EE** após a transferência para a **Eclipse Foundation**.
- **Jakarta EE 8** (2019): mesmo conteúdo do Java EE 8, ainda com pacotes **\`javax.*\`** — contexto **legado**.
- **Jakarta EE 9**: mudança de namespace para **\`jakarta.*\`** (*big bang*).
- **Jakarta EE 10** (2022) e **Jakarta EE 11** (2025): Java 17+ (Java 21 suportado), **Jakarta Data**, records, virtual threads em Concurrency, Jakarta Persistence 3.2; remoção do Security Manager.
- Especificações principais: **CDI** (injeção de dependência), **JAX-RS / Jakarta REST** (APIs REST), **JPA / Jakarta Persistence**, **Bean Validation**, **Servlet**, **JSF / Jakarta Faces**, **EJB**, JSON-B/JSON-P, JMS/Jakarta Messaging, Jakarta Security.
- Perfis: **Platform**, **Web Profile** e **Core Profile** (microsserviços/cloud-native). Servidores: WildFly, JBoss EAP, Payara, Open Liberty.
`,
mindmap: `
Microsserviços e APIs
  Arquitetura
    Serviços independentes
    Banco por serviço
    DDD: contexto delimitado
    Design for failure
  Padrões
    API Gateway
    Service Discovery
    Circuit Breaker
    Config Server
    Saga e CQRS
    Strangler Fig
  REST
    Stateless
    Cacheável
    Interface uniforme e HATEOAS
    Camadas
  HTTP
    GET, PUT, DELETE idempotentes
    POST não idempotente
    201, 204, 400, 401, 403, 404
    429, 500, 503
  JSON
    object e array
    sem comentários
  OpenAPI
    paths e components
    Swagger UI
    springdoc
  Jakarta EE
    EE 8: javax legado
    EE 9: jakarta.*
    EE 11: Java 21, Jakarta Data
    CDI, JAX-RS, JPA
`,
cards: [
  ['401 × 403?', '401: não autenticado (credenciais ausentes/inválidas). 403: autenticado, mas sem permissão.'],
  ['Quais métodos HTTP são idempotentes?', 'GET, HEAD, OPTIONS, PUT e DELETE.'],
  ['O que mudou do Jakarta EE 8 para o 9?', 'O namespace dos pacotes passou de javax.* para jakarta.*.'],
  ['Restrição REST que proíbe guardar sessão no servidor?', 'Stateless.'],
  ['Padrão que interrompe chamadas a um serviço com falhas sucessivas?', 'Circuit Breaker.'],
  ['Para que serve a especificação OpenAPI?', 'Descrever de forma padronizada (YAML/JSON) os endpoints, parâmetros, esquemas e segurança de APIs REST.'],
  ['Código HTTP para recurso criado?', '201 Created (com cabeçalho Location).'],
  ['Padrão para transações distribuídas com compensação?', 'Saga.']
]});

T({ id: 'pdpj-spring', disc: 'pdpj', title: 'Spring Framework, Spring Boot, Spring Cloud, Eureka, Zuul e MapStruct',
summary: `
## Spring Framework
- **IoC (Inversão de Controle)** e **DI (Injeção de Dependência)**: o **contêiner Spring** (ApplicationContext) cria e injeta os **beans**.
- Estereótipos: \`@Component\`, \`@Service\`, \`@Repository\` (traduz exceções de persistência), \`@Controller\` / \`@RestController\` (= @Controller + @ResponseBody).
- Injeção: **por construtor** (recomendada, permite \`final\` e testes), por setter ou campo (\`@Autowired\`). \`@Qualifier\`/\`@Primary\` resolvem ambiguidade.
- \`@Configuration\` + \`@Bean\` para declarar beans manualmente. Escopos: **singleton** (padrão), prototype, request, session.
- **AOP**: aspectos transversais (\`@Transactional\`, segurança, logs).
- Módulos: Spring MVC/WebFlux, **Spring Data JPA** (\`JpaRepository\` gera CRUD e *query methods* como \`findByNome\`), **Spring Security** (filtros, OAuth2 Resource Server para validar JWT do Keycloak), Spring Batch.

## Spring Boot
Torna aplicações Spring **prontas para produção** com mínima configuração:
- **Starters** (\`spring-boot-starter-web\`, \`-data-jpa\`, \`-security\`, \`-test\`, \`-actuator\`) agregam dependências.
- **Autoconfiguração** (\`@EnableAutoConfiguration\`) conforme o *classpath*.
- \`@SpringBootApplication\` = \`@Configuration\` + \`@EnableAutoConfiguration\` + \`@ComponentScan\`.
- **Servidor embutido** (Tomcat por padrão; Jetty/Undertow) → *fat jar* executável (\`java -jar\`).
- **Configuração externa**: \`application.properties\`/\`application.yml\`, **profiles** (\`application-dev.yml\`, \`spring.profiles.active\`), variáveis de ambiente.
- **Actuator**: endpoints de monitoramento (\`/actuator/health\`, \`/metrics\`, \`/info\`) — usados em *liveness/readiness probes* do Kubernetes.
- Anotações web: \`@GetMapping\`, \`@PostMapping\`, \`@PathVariable\`, \`@RequestParam\`, \`@RequestBody\`, \`@ResponseStatus\`, \`@ControllerAdvice\`/\`@ExceptionHandler\`; validação com \`@Valid\`.

## Spring Cloud (padrões para sistemas distribuídos)
| Componente | Função |
|---|---|
| **Spring Cloud Netflix Eureka** | **Service Discovery/Registry**: serviços se registram (\`@EnableEurekaServer\` no servidor; clientes registram-se e enviam *heartbeats*) e localizam outros pelo **nome lógico** |
| **Zuul** (Netflix) | **API Gateway**/roteador de borda (*edge service*) com filtros pre, route, post e error. Zuul 1 está em **modo de manutenção**; o sucessor no ecossistema é o **Spring Cloud Gateway** (reativo) |
| Spring Cloud Gateway | gateway moderno: *routes*, *predicates*, *filters* |
| **Spring Cloud Config** | configuração centralizada (repositório Git) |
| **Spring Cloud LoadBalancer** (sucessor do Ribbon) | balanceamento no lado do cliente |
| **OpenFeign** | cliente HTTP declarativo por interface (\`@FeignClient\`) |
| Resilience4j (sucessor do Hystrix) | circuit breaker, retry, rate limiter, bulkhead |
| Micrometer Tracing / Sleuth | tracing distribuído |

**Service Discovery**: *client-side* (o cliente consulta o registro — Eureka) × *server-side* (balanceador consulta — ex.: Service do Kubernetes).
**API Gateway**: ponto único de entrada — roteamento, autenticação (valida o token do Keycloak), *rate limiting*, CORS, agregação, logging.

## MapStruct
**Gerador de código** em **tempo de compilação** (*annotation processor*) para mapear objetos (ex.: **Entity ↔ DTO**) sem reflexão — mais rápido e *type-safe* que mapeadores por reflexão (ModelMapper).
- Interface anotada com \`@Mapper\` (ex.: \`@Mapper(componentModel = "spring")\` para injetar como bean); métodos abstratos como \`ProcessoDTO toDto(Processo p)\`.
- \`@Mapping(source = "numeroCnj", target = "numero")\` para nomes diferentes; \`ignore = true\`; \`@MappingTarget\` para atualizar instância existente.
- Erros de mapeamento aparecem **na compilação** (*unmapped target properties* geram aviso).
`,
mindmap: `
Ecossistema Spring
  Spring Framework
    IoC e DI
    Beans singleton
    @Component, @Service, @Repository
    @RestController
    Injeção por construtor
    AOP e @Transactional
    Spring Data JPA
    Spring Security
  Spring Boot
    Starters
    Autoconfiguração
    @SpringBootApplication
    Tomcat embutido
    application.yml e profiles
    Actuator: health
  Spring Cloud
    Eureka: service discovery
    Zuul: API Gateway (manutenção)
    Spring Cloud Gateway
    Config Server
    OpenFeign
    LoadBalancer
    Resilience4j
  MapStruct
    Annotation processor
    Entity ↔ DTO
    @Mapper e @Mapping
    Sem reflexão
    Erros em compilação
`,
cards: [
  ['@SpringBootApplication combina quais anotações?', '@Configuration, @EnableAutoConfiguration e @ComponentScan.'],
  ['Qual a função do Eureka?', 'Service Discovery/Registry: os microsserviços se registram e se localizam pelo nome.'],
  ['Qual o papel do Zuul?', 'API Gateway (edge service) com roteamento e filtros; hoje substituído pelo Spring Cloud Gateway.'],
  ['Como o MapStruct gera os mapeamentos?', 'Em tempo de compilação, via annotation processor, sem reflexão.'],
  ['Escopo padrão de um bean Spring?', 'Singleton.'],
  ['Forma de injeção de dependência recomendada?', 'Por construtor.'],
  ['Endpoint do Actuator usado em health checks?', '/actuator/health.'],
  ['@RestController equivale a…', '@Controller + @ResponseBody.']
]});

T({ id: 'pdpj-jpa', disc: 'pdpj', title: 'JPA, Hibernate, Envers, Flyway, PostgreSQL e H2',
summary: `
## ORM e JPA
**ORM** (*Object-Relational Mapping*) mapeia classes ↔ tabelas. **JPA** (Java/Jakarta Persistence API) é a **especificação**; **Hibernate** é a implementação mais usada (outras: EclipseLink).
- **JPA 2.0** (2009, Java EE 6): Criteria API, \`@ElementCollection\`, *orphanRemoval*, cache de 2º nível padronizado. Pacote \`javax.persistence\`.
- **Jakarta Persistence 3.x**: pacote \`jakarta.persistence\`; a **3.2** (Jakarta EE 11) traz suporte a **records** como embeddables, novas funções em JPQL, \`EntityManagerFactory.runInTransaction\`, etc. **Hibernate ORM 7.x** implementa a Jakarta Persistence 3.2 (Hibernate 6 implementa a 3.0/3.1; Hibernate 5 ainda usa \`javax\`).

## Mapeamento
\`@Entity\`, \`@Table(name=...)\`, \`@Id\`, \`@GeneratedValue(strategy = IDENTITY | SEQUENCE | TABLE | AUTO)\`, \`@Column\`, \`@Transient\` (não persiste), \`@Enumerated(EnumType.STRING)\`, \`@Embedded/@Embeddable\`, \`@Version\` (*optimistic locking*), \`@Lob\`.

**Relacionamentos**: \`@OneToOne\`, \`@OneToMany\`, \`@ManyToOne\`, \`@ManyToMany\`, \`@JoinColumn\`, \`mappedBy\` (lado inverso, não dono da FK), \`cascade\`.
| Associação | *Fetch* padrão |
|---|---|
| @ManyToOne, @OneToOne | **EAGER** |
| @OneToMany, @ManyToMany | **LAZY** |
> [!fcc] Acessar coleção LAZY fora da sessão/transação → **LazyInitializationException**. Carregar coleção em laço gera o problema **N+1 selects** (resolver com \`JOIN FETCH\`, *EntityGraph* ou *batch fetching*).

## EntityManager e ciclo de vida
Estados: **new/transient** → \`persist()\` → **managed** (sincronizado no *flush/commit*) → \`detach()\`/fim do contexto → **detached** → \`merge()\` → managed; \`remove()\` → **removed**.
Métodos: \`persist\`, \`find\` (busca imediata), \`getReference\` (proxy *lazy*), \`merge\`, \`remove\`, \`flush\`, \`createQuery\` (**JPQL**, orientada a entidades: \`SELECT p FROM Processo p WHERE p.classe = :c\`), \`createNativeQuery\` (SQL nativo). **Cache de 1º nível** = contexto de persistência (obrigatório); 2º nível = opcional, compartilhado.

## Hibernate Envers
Módulo de **auditoria e versionamento de entidades**: anotando a entidade com **\`@Audited\`**, cada alteração gera registro em tabela **\`<entidade>_AUD\`** com o número da revisão (**REV**) e o tipo (**REVTYPE**: 0 = inclusão, 1 = alteração, 2 = exclusão), além da tabela **REVINFO** (número e timestamp da revisão; customizável com \`@RevisionEntity\`). Consultas históricas via **\`AuditReader\`** (\`AuditReaderFactory.get(em)\`). \`@NotAudited\` exclui atributos.

## Flyway
Ferramenta de **migração/versionamento do esquema** do banco (*database migrations*).
- Scripts em \`db/migration\` nomeados **\`V<versão>__<descrição>.sql\`** (dois *underscores*): \`V1__cria_tabela_processo.sql\`.
- **Repeatable**: \`R__nome.sql\` (reexecutado quando o checksum muda); **undo** \`U\` (edição paga).
- Tabela de controle **\`flyway_schema_history\`** registra versão, checksum e sucesso.
- Comandos: \`migrate\`, \`info\`, \`validate\` (checksums), \`baseline\` (bancos existentes), \`repair\`, \`clean\` (apaga tudo — desabilitar em produção).
- Migrações aplicadas **não devem ser editadas** (checksum diverge → falha na validação). Integra-se ao Spring Boot automaticamente na inicialização.

## PostgreSQL
SGBD relacional **objeto-relacional**, livre, com **MVCC** (controle de concorrência multiversão: leitores não bloqueiam escritores), conformidade ACID, **WAL** (*write-ahead log*), tipos avançados (**JSON/JSONB**, arrays, UUID, hstore), índices B-tree (padrão), Hash, **GIN** (JSONB, *full-text*), GiST, BRIN; *sequences* e \`SERIAL\`/\`IDENTITY\`; extensões (PostGIS); replicação por *streaming*; ferramentas \`psql\`, \`pg_dump\`/\`pg_restore\`; \`VACUUM\` (recupera espaço de tuplas mortas) e \`ANALYZE\` (estatísticas); \`EXPLAIN ANALYZE\`. Porta padrão **5432**.

## H2 Database
Banco **Java**, leve, que roda **em memória** (\`jdbc:h2:mem:testdb\`) ou em arquivo, embutido na aplicação ou como servidor; possui **console web**; modos de compatibilidade (ex.: \`MODE=PostgreSQL\`). Muito usado em **testes automatizados** e protótipos — dados em memória somem ao encerrar a aplicação.

## SQL e transações (revisão)
DDL (CREATE, ALTER, DROP), DML (SELECT, INSERT, UPDATE, DELETE), DCL (GRANT, REVOKE), TCL (COMMIT, ROLLBACK). Propriedades **ACID**: Atomicidade, Consistência, Isolamento, Durabilidade. Níveis de isolamento: *read uncommitted*, *read committed* (padrão do PostgreSQL), *repeatable read*, *serializable*. No Spring: \`@Transactional\` (rollback padrão apenas para exceções **unchecked**).
`,
mindmap: `
Persistência
  JPA
    Especificação
    JPA 2.0: javax
    Jakarta Persistence 3.2
  Hibernate
    Implementação JPA
    Hibernate 5: javax
    Hibernate ORM 7: JP 3.2
  Mapeamento
    @Entity, @Id
    @GeneratedValue
    Relacionamentos
    ToOne: EAGER
    ToMany: LAZY
    N+1 e JOIN FETCH
  EntityManager
    persist, merge, remove
    find × getReference
    Estados: new, managed, detached
    JPQL × nativo
  Envers
    @Audited
    Tabela _AUD
    REVINFO
    REVTYPE 0/1/2
    AuditReader
  Flyway
    V1__desc.sql
    R__ repeatable
    flyway_schema_history
    migrate, validate, baseline
  Bancos
    PostgreSQL: MVCC, JSONB, 5432
    H2: memória, testes
  Transações
    ACID
    @Transactional
`,
cards: [
  ['JPA × Hibernate?', 'JPA é a especificação; Hibernate é uma implementação.'],
  ['Fetch padrão de @OneToMany?', 'LAZY. (@ManyToOne e @OneToOne são EAGER.)'],
  ['Como habilitar auditoria de uma entidade com Envers?', 'Anotar com @Audited; as versões vão para a tabela <entidade>_AUD com revisões em REVINFO.'],
  ['Padrão de nome de migração versionada do Flyway?', 'V<versão>__<descrição>.sql (dois underscores).'],
  ['Tabela de controle do Flyway?', 'flyway_schema_history.'],
  ['Por que não editar uma migração Flyway já aplicada?', 'O checksum muda e o validate/migrate falha.'],
  ['Mecanismo de concorrência do PostgreSQL?', 'MVCC (controle de concorrência multiversão).'],
  ['Uso típico do H2 Database?', 'Banco em memória para testes automatizados e protótipos.'],
  ['O que é o problema N+1?', 'Uma consulta para a lista e mais uma por item ao acessar associações lazy em laço.']
]});

T({ id: 'pdpj-servers', disc: 'pdpj', title: 'JBoss/WildFly e Elastic Stack (ELK)',
summary: `
## JBoss e WildFly
- **WildFly** (antigo JBoss AS) é o **servidor de aplicações Jakarta EE** de código aberto da Red Hat; **JBoss EAP** é a versão comercial com suporte, baseada no WildFly.
- Implementa a plataforma completa (EJB, CDI, JPA com Hibernate, JAX-RS com RESTEasy, JMS com ActiveMQ Artemis, Undertow como servidor web).
- **Modos de operação**: **standalone** (instância independente; \`standalone.xml\`, perfis \`standalone-full.xml\`, \`-ha.xml\`) e **domain** (gerência centralizada de várias instâncias por um *domain controller* e *host controllers*).
- **Subsistemas** configuráveis (datasources, logging, messaging, security/Elytron, undertow).
- Implantação: copiar **WAR/EAR** em \`standalone/deployments\` (*hot deploy* — marcadores \`.dodeploy\`, \`.deployed\`, \`.failed\`), pela **CLI** (\`jboss-cli.sh\`) ou pelo **console de administração** (porta **9990**). Aplicações em **8080**.
- **Datasources** e drivers JDBC configurados como módulos; **JNDI** para localizar recursos.
- Muitos sistemas legados do Judiciário (como versões do **PJe 1.x**) rodam em JBoss/WildFly.

## Elastic Stack (ELK)
| Componente | Papel |
|---|---|
| **Elasticsearch** | mecanismo distribuído de **busca e análise**, baseado no **Apache Lucene**; armazena documentos **JSON** em **índices**, com **índice invertido**; API REST (porta 9200); escala por **shards** (primários e **réplicas**) em um **cluster** de **nós** |
| **Logstash** | **pipeline de ingestão**: **input → filter → output** (ex.: filtros **grok** para extrair campos de logs, mutate, date, geoip) |
| **Kibana** | **visualização**: dashboards, Discover, gráficos, alertas; consultas KQL/Lucene |
| **Beats** | agentes leves de coleta (**Filebeat** para arquivos de log, Metricbeat para métricas) — com eles, “Elastic Stack” |

**Fluxo típico**: aplicações → Filebeat → Logstash (parse) → Elasticsearch (indexa) → Kibana (visualiza). Usos: **logs centralizados** de microsserviços, observabilidade, busca textual (ex.: jurisprudência), SIEM.

Conceitos: **índice** ≈ “banco”; **documento** ≈ “registro” (JSON); **mapping** ≈ esquema (tipos \`text\` analisado × \`keyword\` exato); **Query DSL** (\`match\`, \`term\`, \`bool\` com \`must/should/filter\`); *analyzers* (tokenização, *stemming*); **ILM** (gestão do ciclo de vida de índices).
`,
mindmap: `
Servidores e observabilidade
  WildFly / JBoss
    Servidor Jakarta EE
    JBoss EAP: comercial
    Standalone × Domain
    standalone.xml
    Subsistemas
    Deploy WAR/EAR
    CLI e console 9990
    Datasource e JNDI
  ELK
    Elasticsearch
      Lucene
      Índice invertido
      Shards e réplicas
      API REST 9200
    Logstash
      input → filter → output
      grok
    Kibana
      Dashboards
      Discover
    Beats
      Filebeat
  Conceitos
    Índice e documento
    Mapping: text × keyword
    Query DSL
`,
cards: [
  ['O que é o JBoss EAP em relação ao WildFly?', 'A distribuição comercial com suporte da Red Hat, baseada no WildFly.'],
  ['Dois modos de operação do WildFly?', 'Standalone e Domain (gestão centralizada).'],
  ['Estrutura do pipeline do Logstash?', 'input → filter → output.'],
  ['Em que biblioteca o Elasticsearch se baseia?', 'Apache Lucene.'],
  ['Qual componente do ELK faz visualização?', 'Kibana.'],
  ['Como o Elasticsearch escala horizontalmente?', 'Dividindo índices em shards distribuídos entre nós, com réplicas.'],
  ['text × keyword no Elasticsearch?', 'text é analisado (busca textual); keyword guarda valor exato (filtros, agregações).']
]});

/* ======================= ENGENHARIA DE SOFTWARE ======================= */
T({ id: 'eng-processo', disc: 'eng', title: 'Processo de software, ciclos de vida, requisitos, low-code e IA',
summary: `
## Processo de software
Atividades fundamentais (Sommerville): **especificação**, **projeto e implementação**, **validação** e **evolução**.

## Modelos de ciclo de vida
| Modelo | Características |
|---|---|
| **Cascata (waterfall)** | fases sequenciais (requisitos → projeto → implementação → testes → manutenção); documentação forte; mudanças caras; indicado para requisitos estáveis |
| **Modelo em V** | cascata com cada fase de desenvolvimento associada a um nível de teste (requisitos ↔ aceitação, projeto ↔ integração, código ↔ unidade) |
| **Incremental** | entrega em incrementos funcionais, cada um agregando funcionalidades |
| **Iterativo** | repete ciclos refinando o produto |
| **Prototipação** | protótipo para elicitar/validar requisitos (descartável ou evolutivo) |
| **Espiral (Boehm)** | iterativo **orientado a riscos**; quadrantes: objetivos, **análise de riscos**, desenvolvimento/testes, planejamento |
| **RAD** | desenvolvimento rápido com componentes e ciclos curtos |
| **RUP / Processo Unificado** | **fases**: Concepção (Iniciação), Elaboração, Construção, Transição; **iterativo e incremental, guiado por casos de uso, centrado na arquitetura**; disciplinas ao longo das fases |
| **Ágeis** | Scrum, XP, Kanban (ver tópico próprio) |

## Engenharia de requisitos
- **Requisitos funcionais**: o que o sistema faz (ex.: “emitir certidão”).
- **Não funcionais**: qualidades e restrições — desempenho, segurança, usabilidade, disponibilidade, portabilidade (ISO/IEC 25010 classifica características de qualidade).
- **Requisitos de domínio**, de usuário (alto nível) × de sistema (detalhados).
- **Processo**: **elicitação** (entrevistas, workshops, JAD, observação/etnografia, questionários, brainstorming, prototipação, análise de documentos) → **análise e negociação** → **especificação** (documento SRS, casos de uso, **histórias de usuário** “Como <papel>, quero <ação> para <benefício>”, critérios de aceitação/**INVEST**) → **validação** (revisões, protótipos, testes) → **gerenciamento** (rastreabilidade, controle de mudanças).
- Requisito bom: claro, **verificável/testável**, consistente, completo, rastreável, não ambíguo.

## Low-code e no-code
- **Low-code**: plataformas visuais (arrastar e soltar, modelos) com possibilidade de **escrever código** para extensões; voltado a desenvolvedores e equipes de TI para acelerar entregas (ex.: OutSystems, Mendix, Power Apps).
- **No-code**: **sem programação**, para usuários de negócio (*citizen developers*), com menos flexibilidade.
- Benefícios: velocidade, redução de backlog, prototipação. Riscos: **aprisionamento ao fornecedor (lock-in)**, **shadow IT**, governança, segurança e escalabilidade, dificuldade de versionamento/testes.

## Assistentes de IA no desenvolvimento
Ferramentas baseadas em **LLMs** (ex.: GitHub Copilot, Claude, assistentes nas IDEs) que sugerem código, testes, documentação, refatorações e explicações.
- Boas práticas: **revisão humana obrigatória**, testes automatizados, não inserir **dados sigilosos/pessoais** em ferramentas externas (LGPD e políticas do órgão), verificar **licenças** do código sugerido, checar **alucinações** (APIs inexistentes) e vulnerabilidades, registrar o uso conforme normas internas.
- No Judiciário, a **Resolução CNJ nº 615/2025** disciplina o uso de IA (governança, transparência, supervisão humana, categorização de riscos).
`,
mindmap: `
Processo de software
  Atividades
    Especificação
    Projeto e implementação
    Validação
    Evolução
  Ciclos de vida
    Cascata
    Modelo em V
    Incremental e iterativo
    Prototipação
    Espiral: riscos
    RUP: concepção, elaboração, construção, transição
    Ágil
  Requisitos
    Funcionais
    Não funcionais
    Elicitação
      Entrevistas
      JAD e workshops
      Prototipação
    Especificação
      Casos de uso
      Histórias de usuário
      INVEST
    Validação
    Rastreabilidade
  Low-code / No-code
    Low-code: devs, aceita código
    No-code: usuário de negócio
    Riscos: lock-in, shadow IT
  IA no desenvolvimento
    LLMs e Copilot
    Revisão humana
    Sigilo e LGPD
    Res. CNJ 615/2025
`,
cards: [
  ['Modelo de ciclo de vida orientado a riscos?', 'Espiral (Boehm).'],
  ['Quatro fases do RUP?', 'Concepção (Iniciação), Elaboração, Construção e Transição.'],
  ['Requisito não funcional: exemplo?', '“O sistema deve responder em até 2 s para 95% das requisições” (desempenho).'],
  ['Low-code × no-code?', 'Low-code permite escrever código e mira desenvolvedores; no-code dispensa programação e mira usuários de negócio.'],
  ['Formato típico de história de usuário?', '“Como <papel>, quero <ação>, para <benefício>”.'],
  ['No modelo em V, os requisitos se relacionam a qual teste?', 'Teste de aceitação.'],
  ['Cuidado essencial ao usar assistente de IA para gerar código?', 'Revisão humana e testes, sem expor dados sigilosos, verificando licenças e vulnerabilidades.']
]});

T({ id: 'eng-agil', disc: 'eng', title: 'Metodologias ágeis (Scrum, XP, Kanban) e tradicionais',
diagrams: [{ src: 'scrum.svg', cap: 'Ciclo do Scrum (Guia 2020)' }],
summary: `
## Manifesto Ágil (2001) — 4 valores
**Indivíduos e interações** mais que processos e ferramentas; **software em funcionamento** mais que documentação abrangente; **colaboração com o cliente** mais que negociação de contratos; **responder a mudanças** mais que seguir um plano. (Os itens à direita têm valor, mas os da esquerda valem **mais**.) São **12 princípios**, como entregas frequentes (semanas a meses), mudanças bem-vindas mesmo tarde, ritmo sustentável, simplicidade, equipes auto-organizáveis.

## Scrum (Guia 2020)
*Framework* leve, **empírico** (pilares: **transparência, inspeção e adaptação**) e *lean*.
- **Valores**: compromisso, foco, abertura, respeito e coragem.
- **Scrum Team** (normalmente **10 pessoas ou menos**), sem sub-equipes nem hierarquia, **autogerenciável** e multifuncional:
  - **Product Owner**: maximiza o valor do produto; **único responsável** pelo Product Backlog (é uma pessoa, não um comitê).
  - **Scrum Master**: responsável pela **eficácia** do time; líder que serve; remove impedimentos e ensina Scrum.
  - **Developers**: criam o incremento; responsáveis pelo Sprint Backlog e pela qualidade (Definição de Pronto).
- **Eventos** (todos *timeboxed*, para Sprint de 1 mês):
| Evento | Duração máx. | Propósito |
|---|---|---|
| **Sprint** | ≤ 1 mês | contêiner dos demais eventos |
| **Sprint Planning** | 8 h | por quê (Meta da Sprint), o quê e como |
| **Daily Scrum** | 15 min | inspecionar progresso rumo à Meta; para os Developers |
| **Sprint Review** | 4 h | inspecionar o incremento com *stakeholders* e adaptar o backlog |
| **Sprint Retrospective** | 3 h | melhorar qualidade e eficácia (pessoas, processos, ferramentas) |
- **Artefatos e compromissos**: **Product Backlog → Meta do Produto**; **Sprint Backlog → Meta da Sprint**; **Incremento → Definição de Pronto (DoD)**.
- Só o **PO** pode cancelar a Sprint (se a Meta da Sprint ficar obsoleta).

> [!fcc] O Guia 2020 trocou “time de desenvolvimento” por **Developers**, “auto-organizado” por **autogerenciável** e incluiu a **Meta do Produto**. Daily é **dos Developers** — o PO e o SM participam se estiverem trabalhando em itens do Sprint Backlog.

## XP — Extreme Programming (Kent Beck)
- **Valores**: comunicação, simplicidade, feedback, coragem e respeito.
- **Práticas**: **programação em par**, **TDD** (teste antes do código: *red → green → refactor*), **refatoração**, **integração contínua**, **releases pequenas**, **design simples** (YAGNI), **propriedade coletiva do código**, padrões de codificação, **ritmo sustentável** (40 h semanais), **cliente presente**, **jogo do planejamento**, metáfora, *spikes*.

## Kanban
Método de gestão visual do fluxo (origem Toyota/*lean*): **visualizar o fluxo** (quadro), **limitar o WIP** (trabalho em progresso), gerenciar o fluxo, tornar as políticas explícitas, *feedback loops*, melhorar colaborativamente. Sistema **puxado** (*pull*). Métricas: **lead time**, **cycle time**, *throughput*, diagrama de fluxo cumulativo (CFD). Não prescreve papéis nem iterações.

## Outros
- **Lean software** (Poppendieck): eliminar desperdício, entregar rápido, decidir o mais tarde possível…
- **FDD** (*Feature-Driven Development*), **DSDM**, **Crystal**, **SAFe** (escala).
- **BDD**: comportamento em linguagem natural (*Given-When-Then*, Gherkin).

## Metodologias tradicionais (preditivas)
Planejamento detalhado antecipado, escopo fixo, forte documentação, ciclo em cascata, gerenciamento por fases (PMBOK); adequadas a requisitos estáveis, contratos fechados e contextos regulados.
`,
mindmap: `
Métodos ágeis
  Manifesto
    Indivíduos e interações
    Software funcionando
    Colaboração com cliente
    Responder a mudanças
    12 princípios
  Scrum
    Pilares: transparência, inspeção, adaptação
    Papéis
      Product Owner
      Scrum Master
      Developers
    Eventos
      Sprint ≤ 1 mês
      Planning 8 h
      Daily 15 min
      Review 4 h
      Retrospective 3 h
    Artefatos
      Product Backlog → Meta do Produto
      Sprint Backlog → Meta da Sprint
      Incremento → Definição de Pronto
  XP
    Programação em par
    TDD
    Refatoração
    Integração contínua
    Design simples
    Ritmo sustentável
  Kanban
    Visualizar fluxo
    Limitar WIP
    Sistema puxado
    Lead e cycle time
  Tradicionais
    Preditivas
    Cascata e PMBOK
`,
cards: [
  ['Quais são os três pilares do Scrum?', 'Transparência, inspeção e adaptação.'],
  ['Quem é responsável pelo Product Backlog?', 'O Product Owner.'],
  ['Timebox da Daily Scrum?', '15 minutos.'],
  ['Compromisso associado ao Incremento?', 'Definição de Pronto (Definition of Done).'],
  ['Quem pode cancelar uma Sprint?', 'Somente o Product Owner.'],
  ['Prática central do Kanban para evitar sobrecarga?', 'Limitar o WIP (trabalho em progresso).'],
  ['Ciclo do TDD?', 'Red (teste falha) → Green (código mínimo passa) → Refactor.'],
  ['Valores do XP?', 'Comunicação, simplicidade, feedback, coragem e respeito.']
]});

T({ id: 'eng-qualidade', disc: 'eng', title: 'Qualidade: CMMI v3.0, ISO/IEC/IEEE 12207:2021 e MR-MPS-SW 2024',
summary: `
## CMMI v3.0 (ISACA, 2023)
*Capability Maturity Model Integration* — modelo de melhoria de desempenho de processos. A v3.0 é organizada em **domínios/views** (ex.: **Development**, Services, Supplier Management, People, Safety, Security, Data, Virtual) e **áreas práticas** (*Practice Areas*), agrupadas em **capacidades** (*capability areas*) e categorias (Doing, Managing, Enabling, Improving).

**Níveis de maturidade (representação por estágios)**:
| Nível | Nome | Ideia |
|---|---|---|
| 0 | Incompleto | abordagem ad hoc, incompleta |
| 1 | **Inicial** | trabalho é feito, mas de forma imprevisível/reativa |
| 2 | **Gerenciado** | projetos planejados, executados, medidos e controlados |
| 3 | **Definido** | processos padronizados na organização, adaptados aos projetos |
| 4 | **Quantitativamente gerenciado** | controle estatístico e objetivos quantitativos |
| 5 | **Em otimização** | melhoria contínua baseada em dados |

**Níveis de capacidade** (por área prática): 0 a 3. **Avaliações** (*appraisals*): Benchmark (gera nível oficial), Sustainment, Evaluation.

**Áreas práticas do domínio Development (exemplos)**: Requirements Development and Management (**RDM**), Technical Solution (**TS**), Product Integration (**PI**), **Verification and Validation (VV)**, **Peer Reviews (PR)**, Planning (PLAN), Monitor and Control (MC), Configuration Management (**CM**), Process Quality Assurance (**PQA**), Risk and Opportunity Management (RSK), Estimating (EST), Decision Analysis and Resolution (DAR), Causal Analysis and Resolution (CAR), Managing Performance and Measurement (MPM), Governance (GOV), Implementation Infrastructure (II).

## ABNT NBR ISO/IEC/IEEE 12207:2021 (adoção brasileira da ISO/IEC/IEEE 12207:2017)
Norma de **processos do ciclo de vida de software**, harmonizada com a ISO/IEC/IEEE 15288 (sistemas). Organiza **30 processos** em **4 grupos**:
1. **Processos de acordo** (*agreement*): aquisição e fornecimento.
2. **Processos organizacionais habilitadores de projeto**: modelo de ciclo de vida, infraestrutura, portfólio, recursos humanos, qualidade, conhecimento.
3. **Processos de gestão técnica**: planejamento do projeto, avaliação e controle, gestão de decisão, de riscos, de **configuração**, de informação, medição e garantia da qualidade.
4. **Processos técnicos**: análise do negócio/missão, definição de necessidades e requisitos das partes interessadas, definição de requisitos do sistema/software, definição da arquitetura, definição do projeto, análise de sistema, **implementação**, **integração**, **verificação**, **transição**, **validação**, **operação**, **manutenção** e **descarte**.
> [!fcc] A norma **não prescreve** um modelo de ciclo de vida específico nem método de desenvolvimento: define **o quê** (propósito e resultados dos processos), não **como**. Admite **adaptação** (*tailoring*).

## MR-MPS-SW (Softex) — Guia Geral 2024
Modelo de Referência **brasileiro** para Melhoria de Processo de Software (programa **MPS.BR**), compatível com CMMI e ISO 12207, pensado também para **micro, pequenas e médias empresas** (custo acessível, níveis graduais).

**7 níveis de maturidade** (de G, o mais baixo, a A):
| Nível | Nome |
|---|---|
| **G** | Parcialmente Gerenciado |
| **F** | Gerenciado |
| **E** | Parcialmente Definido |
| **D** | Largamente Definido |
| **C** | Definido |
| **B** | Gerenciado Quantitativamente |
| **A** | Em Otimização |

Processos do modelo (versões recentes): **Gerência de Projetos (GPR)**, **Engenharia de Requisitos (REQ)**, **Projeto e Construção do Produto (PCP)**, **Integração do Produto (ITP)**, **Verificação e Validação (VV)**, além de processos organizacionais como Gerência de Configuração (GCO), Garantia da Qualidade (GQA), Medição (MED), Aquisição (AQU), Gerência de Recursos Humanos (GRH), Gerência de Decisões (GDE), Gerência de Riscos, Gerência de Processos/Definição do Processo Organizacional, Gerência de Reutilização. Avaliação pelo **MA-MPS** (Método de Avaliação), com validade de **3 anos**. Os **atributos de processo (AP)** medem a capacidade.

> [!dica] Memorize a ordem **G → F → E → D → C → B → A** (crescente) e a correspondência aproximada: **F ≈ CMMI 2**, **C ≈ CMMI 3**, **A ≈ CMMI 5**.
`,
mindmap: `
Qualidade de processo
  CMMI v3.0
    ISACA 2023
    Domínios: Development, Services…
    Áreas práticas
      RDM, TS, PI
      VV e Peer Reviews
      CM e PQA
      PLAN e MC
    Maturidade 0 a 5
      1 Inicial
      2 Gerenciado
      3 Definido
      4 Quantitativo
      5 Otimização
    Capacidade 0 a 3
  ISO/IEC/IEEE 12207:2021
    30 processos
    Acordo
    Organizacionais
    Gestão técnica
    Técnicos
    Não prescreve ciclo de vida
    Tailoring
  MR-MPS-SW 2024
    Softex / MPS.BR
    7 níveis G → A
    G Parcialmente Gerenciado
    F Gerenciado
    C Definido
    A Em Otimização
    Processos GPR, REQ, PCP, ITP, VV
    Avaliação MA-MPS 3 anos
`,
cards: [
  ['Nível 3 do CMMI?', 'Definido: processos padronizados na organização e adaptados aos projetos.'],
  ['Quantos níveis de maturidade tem o MR-MPS-SW e qual o mais baixo?', 'Sete, de G (Parcialmente Gerenciado) até A (Em Otimização).'],
  ['Nível C do MPS-SW?', 'Definido.'],
  ['Quatro grupos de processos da ISO/IEC/IEEE 12207?', 'Acordo, organizacionais habilitadores de projeto, gestão técnica e técnicos.'],
  ['A ISO 12207 impõe um modelo de ciclo de vida?', 'Não; descreve propósitos e resultados de processos e permite adaptação.'],
  ['Quem mantém o CMMI atualmente?', 'ISACA (CMMI Institute).'],
  ['Validade de uma avaliação MPS?', 'Três anos.']
]});

T({ id: 'eng-testes', disc: 'eng', title: 'Testes de software, JUnit 6 e Mockito',
diagrams: [{ src: 'piramide-testes.svg', cap: 'Pirâmide de testes' }],
summary: `
## Conceitos
- **Erro** (engano humano) → **defeito/falha no código (bug, fault)** → **falha** (comportamento incorreto observado em execução).
- **Verificação**: “construímos o produto **corretamente**?” (conforme especificação). **Validação**: “construímos o produto **certo**?” (atende ao usuário).
- Teste **mostra a presença** de defeitos, não sua ausência (Dijkstra). Teste exaustivo é impossível; defeitos se agrupam; **paradoxo do pesticida** (testes repetidos deixam de achar defeitos).

## Níveis de teste
| Nível | Foco |
|---|---|
| **Unitário** | menor unidade (método/classe), isolada com dublês (mocks) |
| **Integração** | interação entre módulos/serviços, banco, APIs |
| **Sistema** | sistema completo contra requisitos (funcionais e não funcionais) |
| **Aceitação** | validação pelo usuário/cliente (UAT, alfa, beta) |
**Testes funcionais** verificam *o que* o sistema faz (requisitos funcionais, caixa preta); **não funcionais**: desempenho, carga, estresse, segurança, usabilidade. **Regressão**: reexecutar testes após mudanças. **Smoke test**: verificação rápida básica após build/deploy.

## Técnicas
- **Caixa preta** (baseada na especificação): **partição de equivalência**, **análise de valor-limite**, tabela de decisão, transição de estados, casos de uso.
- **Caixa branca** (baseada na estrutura): cobertura de **comandos (statement)**, **decisão/ramos (branch)**, condição, caminhos; **complexidade ciclomática** (V(G) = E − N + 2 = nº de decisões + 1) = nº mínimo de caminhos independentes.
- **Pirâmide de testes**: muitos unitários (rápidos, baratos), menos integração, poucos E2E/UI.

## Cobertura de código
Percentual do código exercitado pelos testes (linhas, ramos, métodos). Ferramenta comum em Java: **JaCoCo** (integrado ao SonarQube). 100% de cobertura de comandos **não** garante 100% de ramos nem ausência de defeitos. Cobertura de ramos (decisão) **implica** cobertura de comandos, mas não o contrário.

## JUnit 5 (Jupiter) e JUnit 6
- JUnit 5 = **Platform** (executa testes) + **Jupiter** (modelo de programação e extensões) + **Vintage** (rodar testes JUnit 3/4).
- Anotações Jupiter: \`@Test\`, \`@BeforeEach\`/\`@AfterEach\` (antes/depois de **cada** teste), \`@BeforeAll\`/\`@AfterAll\` (uma vez; métodos **static**, salvo \`@TestInstance(PER_CLASS)\`), \`@DisplayName\`, \`@Disabled\`, \`@Nested\`, \`@Tag\`, \`@ParameterizedTest\` (+ \`@ValueSource\`, \`@CsvSource\`, \`@MethodSource\`), \`@RepeatedTest\`, \`@Timeout\`, \`@ExtendWith\` (extensões, substitui \`@RunWith\` do JUnit 4).
- Asserções (\`org.junit.jupiter.api.Assertions\`): \`assertEquals(esperado, atual)\`, \`assertTrue\`, \`assertNull\`, \`assertThrows(Excecao.class, () -> ...)\`, \`assertAll\` (agrupa e reporta todas), \`assertTimeout\`. **Assumptions** (\`assumeTrue\`) abortam o teste em vez de falhar.
- Classes e métodos de teste podem ser *package-private* (não precisam ser \`public\`).
- **JUnit 6** (lançado em **setembro de 2025**): **versão unificada** para Platform, Jupiter e Vintage (todas 6.x); **exige Java 17+** (Kotlin 2.2+); **anotações de nulidade JSpecify** na API; suporte a funções *suspend* de Kotlin; **remove APIs depreciadas**; o **Vintage** foi **depreciado** e o executor \`junit-platform-runner\` (JUnit 4 *runner*) foi removido; melhorias em \`@CsvSource\` (novo parser, FastCSV) e cancelamento de execução. **Migração do JUnit 5**: atualizar para Java 17, trocar o BOM/dependências para 6.x, eliminar uso de APIs depreciadas; o modelo Jupiter (anotações e asserções) **permanece o mesmo**.

## Mockito
Framework de **dublês de teste** (*test doubles*) para isolar a unidade.
- Criar: \`mock(Classe.class)\` ou \`@Mock\` (com \`@ExtendWith(MockitoExtension.class)\`); \`@InjectMocks\` injeta os mocks na classe testada; \`@Spy\`/\`spy()\` = objeto real parcialmente simulado; \`@Captor\`/\`ArgumentCaptor\` captura argumentos.
- **Stubbing**: \`when(repo.findById(1L)).thenReturn(Optional.of(p))\`; \`thenThrow\`; \`doReturn/doThrow().when(mock).metodo()\` (para *void* e *spies*).
- **Verificação**: \`verify(mock).salvar(any())\`, \`verify(mock, times(2))\`, \`never()\`, \`atLeastOnce()\`, \`verifyNoMoreInteractions\`.
- *Matchers*: \`any()\`, \`eq()\`, \`anyString()\` — se usar um matcher, todos os argumentos devem ser matchers.
- Tipos de dublês (Meszaros): **dummy**, **stub** (respostas prontas), **spy**, **mock** (verifica interações), **fake** (implementação simplificada, ex.: banco H2 em memória).
- Mocks padrão retornam valores “vazios” (null, 0, false, coleções vazias).
`,
mindmap: `
Testes de software
  Conceitos
    Erro → defeito → falha
    Verificação × validação
    Presença, não ausência
  Níveis
    Unitário
    Integração
    Sistema
    Aceitação
  Tipos
    Funcional
    Não funcional
    Regressão
    Smoke
  Técnicas
    Caixa preta
      Partição de equivalência
      Valor-limite
    Caixa branca
      Comandos
      Ramos
      Complexidade ciclomática
  Cobertura
    JaCoCo
    Ramos ⇒ comandos
  JUnit
    Platform, Jupiter, Vintage
    @Test, @BeforeEach
    @BeforeAll static
    @ParameterizedTest
    assertThrows, assertAll
    JUnit 6
      Java 17+
      Versão unificada
      JSpecify
      Vintage depreciado
  Mockito
    @Mock e @InjectMocks
    when…thenReturn
    verify, times, never
    Spy e Captor
    Dublês: stub, mock, fake
`,
cards: [
  ['Verificação × validação?', 'Verificação: construímos o produto corretamente? Validação: construímos o produto certo?'],
  ['@BeforeEach × @BeforeAll?', '@BeforeEach roda antes de cada teste; @BeforeAll uma vez antes de todos (método static por padrão).'],
  ['Requisito mínimo de Java do JUnit 6?', 'Java 17.'],
  ['Como verificar no Mockito que um método foi chamado duas vezes?', 'verify(mock, times(2)).metodo(...).'],
  ['Para que serve @InjectMocks?', 'Cria a instância da classe testada e injeta nela os mocks declarados.'],
  ['Cobertura de comandos 100% garante cobertura de ramos 100%?', 'Não. Cobertura de ramos implica a de comandos, mas não o contrário.'],
  ['Complexidade ciclomática de um método com 3 ifs simples?', '4 (decisões + 1).'],
  ['Técnica que testa as fronteiras das partições?', 'Análise de valor-limite.']
]});

T({ id: 'eng-uml', disc: 'eng', title: 'UML 2.5.1 e BPMN',
summary: `
## UML 2.5.1 (OMG, 2017)
Linguagem **de modelagem** (não é método nem processo). **14 diagramas** em dois grupos:

**Estruturais (7):** **classes**, **objetos**, **componentes**, **implantação** (*deployment*: nós de hardware/software e artefatos), **pacotes**, **estrutura composta**, **perfil**.

**Comportamentais (7):** **casos de uso**, **atividades**, **máquina de estados**, e os **de interação**: **sequência** (ordem temporal das mensagens; linhas de vida, fragmentos *alt/opt/loop*), **comunicação** (antigo colaboração; ênfase nos vínculos), **visão geral de interação** e **tempo** (*timing*).

## Diagrama de classes
- Visibilidade: \`+\` público, \`-\` privado, \`#\` protegido, \`~\` pacote. Atributo/método **estático** = sublinhado; **abstrato** = itálico.
- Relações:
| Relação | Notação | Sentido |
|---|---|---|
| Associação | linha simples (com multiplicidade 1, 0..1, *, 1..*) | vínculo estrutural |
| **Agregação** | losango **vazio** no todo | todo-parte fraco (parte existe sem o todo) |
| **Composição** | losango **cheio** no todo | todo-parte forte (parte morre com o todo) |
| **Generalização** | seta com triângulo vazio | herança (“é um”) |
| **Realização** | linha tracejada + triângulo vazio | classe implementa interface |
| **Dependência** | linha tracejada + seta aberta | uso temporário |

## Diagrama de casos de uso
**Atores** (bonecos; papéis externos — pessoas ou sistemas), **casos de uso** (elipses), fronteira do sistema.
- **\`<<include>>\`**: comportamento **obrigatório** reutilizado — seta do caso **base para o incluído**.
- **\`<<extend>>\`**: comportamento **opcional/condicional** — seta do caso **extensor para o base** (em *pontos de extensão*).
- Generalização entre atores e entre casos de uso.

## Outros
- **Atividades**: fluxo de controle (nó inicial ●, final ◉, decisão/merge ◇, **fork/join** — barras — para paralelismo, raias/*swimlanes*). Útil para processos e algoritmos.
- **Máquina de estados**: estados de um objeto e transições \`evento [guarda] / ação\`.

## BPMN 2.0 (OMG) — Modelagem de processos de negócio
**Categorias de elementos:**
1. **Objetos de fluxo**: **eventos** (círculos — **início** borda fina, **intermediário** borda dupla, **fim** borda grossa; tipos: mensagem, temporizador, erro, sinal, condicional…), **atividades** (retângulos arredondados: **tarefa** — de usuário, serviço, manual, script, envio/recebimento, regra de negócio — e **subprocesso**) e **gateways** (losangos).
2. **Objetos de conexão**: **fluxo de sequência** (linha cheia, dentro de um pool), **fluxo de mensagem** (linha tracejada, **entre pools**), **associação** (pontilhada, liga artefatos).
3. **Raias (swimlanes)**: **pool** (participante/organização) e **lanes** (papéis/unidades dentro do pool).
4. **Artefatos**: objeto de dados, grupo, anotação de texto.

**Gateways:**
| Gateway | Símbolo | Comportamento |
|---|---|---|
| **Exclusivo (XOR)** | ◇ com X (ou vazio) | **apenas um** caminho segue (decisão) |
| **Paralelo (AND)** | ◇ com **+** | **todos** os caminhos em paralelo; na junção, espera todos |
| **Inclusivo (OR)** | ◇ com **○** | **um ou mais** caminhos conforme condições |
| **Baseado em eventos** | ◇ com pentágono | segue o caminho do **primeiro evento** que ocorrer |
| Complexo | ◇ com * | regras complexas |
> [!fcc] Fluxo de **sequência não cruza** a fronteira do pool; entre pools usa-se **fluxo de mensagem**.
`,
mindmap: `
Modelagem
  UML 2.5.1
    14 diagramas
    Estruturais
      Classes
      Objetos
      Componentes
      Implantação
      Pacotes
    Comportamentais
      Casos de uso
      Atividades
      Máquina de estados
      Sequência
      Comunicação
  Classes
    + - # ~
    Agregação: losango vazio
    Composição: losango cheio
    Generalização
    Realização
  Casos de uso
    Ator
    include: obrigatório
    extend: opcional
  BPMN 2.0
    Eventos: início, intermediário, fim
    Atividades: tarefa, subprocesso
    Gateways
      XOR: um caminho
      AND: todos
      OR: um ou mais
      Baseado em eventos
    Pool e lanes
    Sequência × mensagem
`,
cards: [
  ['Quantos diagramas tem a UML 2.5.1?', '14 (7 estruturais e 7 comportamentais).'],
  ['Losango cheio no diagrama de classes indica…', 'Composição (a parte não existe sem o todo).'],
  ['<<include>> × <<extend>>?', 'include: comportamento obrigatório reutilizado; extend: comportamento opcional/condicional que estende o caso base.'],
  ['Diagrama UML que enfatiza a ordem temporal das mensagens?', 'Diagrama de sequência.'],
  ['Gateway BPMN em que todos os caminhos são seguidos em paralelo?', 'Paralelo (AND), com símbolo +.'],
  ['Como representar comunicação entre dois pools no BPMN?', 'Com fluxo de mensagem (linha tracejada).'],
  ['Visibilidade “#” na UML?', 'Protegida (protected).']
]});

T({ id: 'eng-arq', disc: 'eng', title: 'Arquiteturas de software e padrões de projeto',
summary: `
## Estilos arquiteturais
- **Cliente-servidor**: clientes solicitam serviços a servidores pela rede. Cliente “gordo” × “magro”.
- **Multicamadas (n-tier)**: separação em **apresentação**, **negócio (lógica)** e **dados/persistência** — cada camada só conversa com a adjacente; facilita manutenção e escalabilidade. Em 3 camadas, a lógica fica no servidor de aplicação.
- **MVC**: **Model** (dados e regras), **View** (apresentação), **Controller** (recebe entradas e coordena). Variações: MVP, MVVM (Angular/Vue).
- **Objetos distribuídos**: objetos em máquinas diferentes invocando métodos remotamente como se fossem locais — **CORBA** (ORB, IDL), **Java RMI** (stubs/skeletons), DCOM; base histórica de EJB remotos.
- **SOA** (arquitetura orientada a serviços): serviços de negócio reutilizáveis, contratos (WSDL), barramento **ESB**, SOAP/XML.
- **Microsserviços**, **orientada a eventos**, **hexagonal (ports and adapters)**, **Clean Architecture**, **pipes and filters**, **P2P**.

## Cloud computing e serverless (noções)
- **Serverless**: o provedor gerencia servidores; o desenvolvedor publica **funções** (FaaS — AWS Lambda, Azure Functions, Google Cloud Functions) executadas **sob demanda por eventos**, com **escalonamento automático** (inclusive a zero) e cobrança **por execução**. Limitações: *cold start*, tempo máximo de execução, *vendor lock-in*, funções **stateless**. Ver também o tópico de nuvem.

## Padrões de projeto (GoF — 23 padrões)
**Criacionais (5):** **Singleton** (uma única instância com acesso global), **Factory Method** (subclasses decidem qual classe instanciar), **Abstract Factory** (famílias de objetos relacionados), **Builder** (construção passo a passo de objeto complexo), **Prototype** (clonagem).

**Estruturais (7):** **Adapter** (converte interface incompatível), **Bridge** (separa abstração da implementação), **Composite** (árvore parte-todo tratada uniformemente), **Decorator** (adiciona responsabilidades dinamicamente — ex.: streams de I/O do Java), **Facade** (interface simplificada para subsistema), **Flyweight** (compartilha objetos para economizar memória), **Proxy** (substituto que controla acesso — lazy loading do Hibernate, proxies do Spring AOP).

**Comportamentais (11):** **Observer** (notifica dependentes quando o estado muda — pub/sub), **Strategy** (algoritmos intercambiáveis), **Template Method** (esqueleto do algoritmo na superclasse), **Command** (encapsula requisição como objeto — desfazer/filas), **Iterator**, **State** (comportamento muda com o estado), **Chain of Responsibility** (cadeia de tratadores — filtros de servlet/Spring Security), **Mediator**, **Memento** (salvar/restaurar estado), **Visitor**, **Interpreter**.

## Padrões corporativos e de microsserviços
**DTO**, **DAO/Repository**, **Service Layer**, **Dependency Injection**, **API Gateway**, **Circuit Breaker**, **Saga**, **CQRS**, **Event Sourcing**, **Strangler Fig**, **Sidecar**, **Backend for Frontend (BFF)**.
`,
mindmap: `
Arquitetura de software
  Estilos
    Cliente-servidor
    Multicamadas
      Apresentação
      Negócio
      Dados
    MVC, MVVM
    Objetos distribuídos
      CORBA
      Java RMI
    SOA e ESB
    Microsserviços
    Eventos
    Hexagonal
  Nuvem
    Serverless e FaaS
    Cold start
    Stateless
  GoF Criacionais
    Singleton
    Factory Method
    Abstract Factory
    Builder
    Prototype
  GoF Estruturais
    Adapter
    Decorator
    Facade
    Proxy
    Composite
    Bridge, Flyweight
  GoF Comportamentais
    Observer
    Strategy
    Template Method
    Command
    State
    Chain of Responsibility
  Corporativos
    DTO, DAO, Repository
    Circuit Breaker, Saga
`,
cards: [
  ['Padrão que garante uma única instância?', 'Singleton.'],
  ['Padrão que converte a interface de uma classe em outra esperada pelo cliente?', 'Adapter.'],
  ['Padrão que adiciona responsabilidades dinamicamente a um objeto?', 'Decorator.'],
  ['Padrão que notifica dependentes quando um objeto muda de estado?', 'Observer.'],
  ['Padrão que oferece interface simplificada para um subsistema complexo?', 'Facade.'],
  ['Tecnologias clássicas de objetos distribuídos?', 'CORBA, Java RMI e DCOM.'],
  ['Três camadas clássicas da arquitetura multicamadas?', 'Apresentação, negócio (lógica) e dados.'],
  ['Padrão que define algoritmos intercambiáveis encapsulados?', 'Strategy.']
]});

/* ======================= PROGRAMAÇÃO E WEB ======================= */
T({ id: 'web-js', disc: 'web', title: 'JavaScript, TypeScript, Node.js e jQuery',
summary: `
## JavaScript (ECMAScript)
- Linguagem **interpretada/JIT**, **dinamicamente tipada**, multiparadigma, *single-threaded* com **event loop** (pilha de chamadas, fila de tarefas e de *microtasks* — Promises têm prioridade sobre \`setTimeout\`).
- **Declarações**: \`var\` (escopo de **função**, *hoisting* com \`undefined\`), \`let\` e \`const\` (escopo de **bloco**, *temporal dead zone*). \`const\` impede reatribuição, não mutação do objeto.
- **Tipos primitivos**: string, number, bigint, boolean, undefined, null, symbol; demais são **objetos** (arrays e funções inclusive). \`typeof null === "object"\` (bug histórico); \`typeof []\` → "object" (use \`Array.isArray\`).
- **Igualdade**: \`==\` faz coerção (\`"5" == 5\` → true; \`null == undefined\` → true); \`===\` estrita, sem coerção. \`NaN !== NaN\`.
- *Falsy*: \`false, 0, -0, 0n, "", null, undefined, NaN\`.
- Funções: declaração (sofre *hoisting*), expressão, **arrow functions** (sem \`this\` próprio — herdam do escopo léxico; não servem como construtor). **Closures**: função lembra o escopo em que foi criada.
- ES6+: *template literals*, desestruturação, *spread/rest* (\`...\`), classes, módulos (\`import/export\`), \`Map/Set\`, *optional chaining* (\`?.\`), *nullish coalescing* (\`??\`).
- Arrays: \`map\` (transforma), \`filter\` (seleciona), \`reduce\` (acumula), \`forEach\` (itera, retorna undefined), \`find\`, \`some/every\`, \`push/pop\` (fim), \`shift/unshift\` (início), \`splice\` (altera o original), \`slice\` (cópia).
- **Assíncrono**: callbacks → **Promises** (\`then/catch/finally\`, \`Promise.all\`, \`allSettled\`, \`race\`, \`any\`) → **async/await**. \`fetch()\` retorna Promise.
- **DOM**: \`document.querySelector\`, \`addEventListener\`, propagação (captura → alvo → *bubbling*), \`event.preventDefault()\`, \`stopPropagation()\`. Use \`textContent\` em vez de \`innerHTML\` para dados não confiáveis (XSS).

## TypeScript
Superconjunto **tipado** do JavaScript (Microsoft); **compilado/transpilado** (\`tsc\`) para JS — os tipos **somem em tempo de execução** (*type erasure*).
- Tipagem **estática e estrutural** (*duck typing*), inferência de tipos.
- Tipos: \`string, number, boolean, any\` (desliga checagem), **\`unknown\`** (seguro: exige verificação antes do uso), \`never\`, \`void\`, tuplas, \`enum\`, **union** (\`A | B\`), **intersection** (\`A & B\`), literais, *type guards*.
- \`interface\` × \`type\` (alias); **generics** (\`function id<T>(x: T): T\`); modificadores \`public/private/protected/readonly\`; utilitários \`Partial<T>\`, \`Readonly<T>\`, \`Pick\`, \`Omit\`, \`Record\`.
- \`tsconfig.json\`; opção **\`strict\`** ativa \`strictNullChecks\`, \`noImplicitAny\` etc. Decorators usados pelo Angular.

## Node.js
Ambiente de execução JavaScript **no servidor**, sobre o motor **V8**; modelo **orientado a eventos** e **I/O não bloqueante** (libuv) — ótimo para aplicações I/O-intensivas, menos para CPU-intensivas (use *worker threads*).
- Gerenciador **npm** (\`package.json\`, \`package-lock.json\`, \`node_modules\`, \`npm install\`, \`npm run\`); scripts; dependências × *devDependencies*; versionamento **semântico** (MAJOR.MINOR.PATCH; \`^\` aceita minor/patch, \`~\` só patch).
- Módulos: **CommonJS** (\`require/module.exports\`) e **ES Modules** (\`import/export\`).
- Frameworks: **Express** (middlewares \`(req, res, next)\`), NestJS. Também serve de ferramenta de build para Angular/React (CLI, bundlers).

## jQuery
Biblioteca JS (2006) para manipular **DOM**, eventos, animações e **AJAX** com sintaxe concisa e compatibilidade entre navegadores.
- \`$(seletor)\` seleciona; \`$(document).ready(fn)\` ou \`$(fn)\` executa após o DOM carregar.
- \`.text()\`, \`.html()\`, \`.val()\`, \`.attr()\`, \`.css()\`, \`.addClass()\`, \`.hide()/.show()\`, \`.on("click", fn)\` (delegação de eventos), encadeamento (*chaining*).
- AJAX: \`$.ajax({url, method, data, success, error})\`, \`$.get\`, \`$.post\`, \`$.getJSON\`.
- Ainda presente em sistemas legados (JSF/PrimeFaces, Bootstrap ≤ 4).
`,
mindmap: `
JavaScript e cia.
  JavaScript
    Dinamicamente tipado
    Event loop
    var × let × const
    == × ===
    Falsy
    Arrow functions e this
    Closures
    map, filter, reduce
    Promises e async/await
    DOM e eventos
  TypeScript
    Superset tipado
    Transpila para JS
    Tipagem estrutural
    any × unknown
    Union e intersection
    Generics
    strict
  Node.js
    V8
    I/O não bloqueante
    npm e package.json
    SemVer ^ ~
    CommonJS × ESM
    Express
  jQuery
    $(seletor)
    document.ready
    .on() e encadeamento
    $.ajax
`,
cards: [
  ['Diferença entre == e === em JS?', '== compara com coerção de tipos; === compara valor e tipo, sem coerção.'],
  ['Escopo de var × let?', 'var tem escopo de função; let e const têm escopo de bloco.'],
  ['TypeScript: any × unknown?', 'any desliga a checagem; unknown exige verificação de tipo antes do uso.'],
  ['Os tipos do TypeScript existem em tempo de execução?', 'Não; são apagados na transpilação para JavaScript.'],
  ['Qual motor executa JavaScript no Node.js?', 'V8 (Google).'],
  ['No npm, o que aceita "^1.2.3"?', 'Atualizações compatíveis de minor e patch (>=1.2.3 <2.0.0).'],
  ['Em jQuery, como executar código após o DOM carregar?', '$(document).ready(function(){…}) ou $(function(){…}).'],
  ['O que retorna typeof null?', '"object" (comportamento histórico da linguagem).']
]});

T({ id: 'web-html', disc: 'web', title: 'HTML5, CSS3, XML e XML Schema',
summary: `
## HTML5
- \`<!DOCTYPE html>\`; estrutura \`html > head + body\`; \`<meta charset="utf-8">\`; \`<meta name="viewport" content="width=device-width, initial-scale=1">\` (responsividade).
- **Elementos semânticos**: \`header\`, \`nav\`, \`main\` (único por página), \`article\` (conteúdo independente), \`section\`, \`aside\`, \`footer\`, \`figure/figcaption\`, \`time\`, \`mark\`.
- **Mídia**: \`<audio>\`, \`<video>\` (nativos, sem plugin), \`<canvas>\` (desenho via JS, bitmap), **SVG** (vetorial).
- **Formulários**: novos tipos \`email, url, tel, number, range, date, color, search\`; atributos \`required, placeholder, pattern, min/max, autofocus\`; validação nativa. \`<datalist>\`, \`<output>\`.
- **APIs**: **Web Storage** (\`localStorage\` persiste sem expirar; \`sessionStorage\` dura a sessão da aba; ~5 MB; só strings), **IndexedDB**, Geolocation, **Web Workers** (JS em segundo plano), **WebSocket** (comunicação bidirecional), Drag and Drop, History API, **Service Workers** (offline/PWA), Fetch.
- **Acessibilidade**: \`alt\` em imagens, \`<label for>\`, **ARIA** (\`role\`, \`aria-label\`), hierarquia de títulos; e-MAG/WCAG.
- Elementos obsoletos: \`<font>\`, \`<center>\`, \`<frame>\`.

## CSS3
- Sintaxe \`seletor { propriedade: valor; }\`. **Cascata**: origem/importância → **especificidade** → ordem. Especificidade: inline (1,0,0,0) > **id** (0,1,0,0) > **classe/atributo/pseudo-classe** (0,0,1,0) > **elemento/pseudo-elemento** (0,0,0,1). \`!important\` sobrepõe.
- **Box model**: content + padding + border + margin; \`box-sizing: border-box\` inclui padding e borda na largura.
- \`display\`: block, inline, inline-block, none, **flex**, **grid**. \`position\`: static (padrão), relative, absolute (relativo ao ancestral posicionado), fixed (à janela), sticky.
- **Flexbox** (unidimensional): \`justify-content\` (eixo principal), \`align-items\` (eixo cruzado), \`flex-direction\`, \`flex-wrap\`, \`flex: 1\`.
- **Grid** (bidimensional): \`grid-template-columns: repeat(3, 1fr)\`, \`gap\`, áreas nomeadas.
- **Responsividade**: **media queries** (\`@media (max-width: 600px) {…}\`), *mobile first*, unidades relativas (\`em\`, \`rem\` — relativa ao root, \`%\`, \`vw/vh\`), imagens fluidas.
- Seletores: descendente (\`a b\`), filho (\`a > b\`), irmão adjacente (\`a + b\`), irmãos gerais (\`a ~ b\`), atributo (\`[type="text"]\`), pseudo-classes (\`:hover, :focus, :nth-child(2n), :not()\`), pseudo-elementos (\`::before, ::after\`).
- Recursos: \`border-radius\`, \`box-shadow\`, gradientes, \`transition\`, \`transform\`, \`@keyframes\`/animation, variáveis (\`--cor: …; var(--cor)\`), \`@font-face\`.

## XML
Linguagem de **marcação extensível** (W3C) para **estruturar e transportar dados** (o HTML apresenta).
- **Bem formado** (regras sintáticas): um único **elemento raiz**; toda tag aberta deve ser **fechada** (ou autofechada \`<x/>\`); aninhamento correto; **case-sensitive**; valores de atributo **entre aspas**; atributos não repetidos; caracteres especiais escapados (\`&lt; &gt; &amp; &quot; &apos;\`) ou em \`CDATA\`.
- **Válido**: bem formado **e** conforme a um esquema (**DTD** ou **XML Schema**).
- Prólogo \`<?xml version="1.0" encoding="UTF-8"?>\`; **namespaces** (\`xmlns:prefixo="URI"\`) evitam conflitos de nomes.
- Tecnologias: **XPath** (navegar/selecionar nós: \`/processo/parte[@tipo='autor']\`), **XSLT** (transformar XML), XQuery, **DOM** (árvore em memória) × **SAX** (eventos, *streaming*, pouca memória) × StAX; JAXB (Java ↔ XML).

## XML Schema (XSD)
Linguagem (escrita **em XML**) para definir estrutura e **tipos de dados** de documentos XML — mais expressiva que a DTD.
- Raiz \`<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">\`.
- \`<xs:element name="numero" type="xs:string"/>\`; tipos embutidos: \`xs:string, xs:integer, xs:decimal, xs:boolean, xs:date, xs:dateTime\`…
- **simpleType** (só texto; restrições com **facets**: \`minLength, maxLength, pattern, enumeration, minInclusive, totalDigits\`) × **complexType** (elementos filhos e/ou atributos).
- Compositores: **\`xs:sequence\`** (ordem fixa), **\`xs:choice\`** (um dentre vários), **\`xs:all\`** (qualquer ordem, cada um no máximo uma vez).
- Ocorrências: \`minOccurs\` / \`maxOccurs\` (padrão **1**; \`unbounded\` = ilimitado). Atributos: \`<xs:attribute use="required"/>\`.
- \`targetNamespace\`, \`elementFormDefault\`; reutilização com \`xs:import\`/\`xs:include\`.
- **DTD × XSD**: DTD não é XML, não tem tipos de dados ricos nem namespaces; XSD tem.
`,
mindmap: `
Marcação e estilo
  HTML5
    DOCTYPE html
    Semântica
      header, nav, main
      article, section, aside
    audio, video, canvas
    Formulários nativos
    APIs
      localStorage
      IndexedDB
      Web Workers
      WebSocket
      Service Worker
    Acessibilidade: alt, ARIA
  CSS3
    Especificidade
    Box model
    Flexbox: 1D
    Grid: 2D
    Media queries
    position
    rem × em
    Variáveis CSS
  XML
    Bem formado
    Válido: DTD/XSD
    Namespaces
    XPath e XSLT
    DOM × SAX
  XML Schema
    Escrito em XML
    simpleType e facets
    complexType
    sequence, choice, all
    minOccurs, maxOccurs = 1
`,
cards: [
  ['localStorage × sessionStorage?', 'localStorage persiste sem expiração; sessionStorage dura apenas enquanto a aba/sessão estiver aberta.'],
  ['Flexbox × Grid?', 'Flexbox organiza em uma dimensão; Grid em duas (linhas e colunas).'],
  ['Seletor mais específico entre id, classe e elemento?', 'id.'],
  ['XML bem formado × válido?', 'Bem formado segue a sintaxe; válido também obedece a um esquema (DTD/XSD).'],
  ['Valor padrão de minOccurs e maxOccurs no XSD?', '1.'],
  ['Compositor XSD que exige ordem fixa dos elementos filhos?', 'xs:sequence.'],
  ['DOM × SAX?', 'DOM carrega a árvore inteira em memória; SAX processa por eventos em fluxo, com pouca memória.'],
  ['box-sizing: border-box faz o quê?', 'Inclui padding e borda na largura/altura declaradas.']
]});

T({ id: 'web-frameworks', disc: 'web', title: 'Angular, React, Vue, JSF, Bootstrap, Angular Material e PWA',
summary: `
## Angular (Google)
Framework **completo**, em **TypeScript**, baseado em **componentes**.
- **Componente** = classe (\`@Component\` com \`selector\`, \`template/templateUrl\`, \`styleUrls\`) + template + estilos. Desde a v17/19, **standalone components** são o padrão (sem NgModule obrigatório).
- **Data binding**: interpolação \`{{ valor }}\`; *property binding* \`[prop]="expr"\`; *event binding* \`(click)="metodo()"\`; **two-way** \`[(ngModel)]="campo"\` (“banana in a box”).
- **Diretivas**: estruturais (\`*ngIf\`, \`*ngFor\` — e o novo *control flow* \`@if\`, \`@for\`) e de atributo (\`ngClass\`, \`ngStyle\`).
- **Serviços** com \`@Injectable\` e **injeção de dependência**; **RxJS/Observables** (\`HttpClient\` retorna Observable; \`subscribe\`, operadores \`map\`, \`switchMap\`); **Signals** (reatividade moderna).
- **Pipes** (\`{{ data | date:'dd/MM/yyyy' }}\`), **Router** (rotas, *guards*, *lazy loading*), formulários *template-driven* × **reativos** (\`FormGroup\`, \`FormControl\`, *Validators*).
- Ciclo de vida: \`ngOnInit\`, \`ngOnChanges\`, \`ngOnDestroy\`…; comunicação \`@Input()\`/\`@Output()\` + \`EventEmitter\`.
- **Angular CLI**: \`ng new\`, \`ng serve\`, \`ng generate component\`, \`ng build\`, \`ng test\`.

## React (Meta)
**Biblioteca** para interfaces; componentes **funcionais** com **JSX**; **Virtual DOM** e reconciliação; fluxo de dados **unidirecional** (props de pai para filho, imutáveis no filho).
- **Hooks**: \`useState\` (estado), \`useEffect\` (efeitos colaterais; array de dependências), \`useContext\`, \`useMemo\`, \`useCallback\`, \`useRef\`, \`useReducer\`. Regras: chamar apenas no topo de componentes/hooks.
- Listas exigem \`key\` única. Ecossistema: React Router, Redux/Zustand, Next.js.

## Vue.js
Framework **progressivo** (adoção incremental). **Single File Components** (\`.vue\`: template, script, style). Diretivas: \`v-bind\` (\`:\`), \`v-on\` (\`@\`), \`v-model\` (two-way), \`v-if\`, \`v-show\` (alterna CSS display), \`v-for\`. **Options API** × **Composition API** (\`ref\`, \`reactive\`, \`computed\`, \`watch\`). Pinia (estado), Vue Router.

## JSF — Jakarta Faces
Framework **MVC baseado em componentes, do lado do servidor** (Jakarta EE). Páginas **Facelets** (\`.xhtml\`), **Managed/Backing Beans** (CDI \`@Named\` + escopos \`@RequestScoped\`, \`@ViewScoped\`, \`@SessionScoped\`), **Expression Language** \`#{bean.propriedade}\`, componentes \`h:\` e \`f:\`, validadores/conversores, AJAX (\`f:ajax\`). **Ciclo de vida (6 fases)**: Restore View → Apply Request Values → Process Validations → Update Model Values → Invoke Application → Render Response. Bibliotecas: **PrimeFaces**, RichFaces. Usado no **PJe 1.x**.

## Bibliotecas de componentes de UI
- **Bootstrap**: framework CSS/JS responsivo; **grid de 12 colunas** com *breakpoints* (\`xs\`, \`sm\` ≥ 576px, \`md\` ≥ 768, \`lg\` ≥ 992, \`xl\` ≥ 1200, \`xxl\` ≥ 1400): \`.container > .row > .col-md-6\`; componentes (navbar, modal, card, alert); utilitários (\`d-flex\`, \`mt-3\`). Bootstrap 5 **removeu a dependência de jQuery**. *Mobile first*.
- **Angular Material**: componentes do **Material Design** (Google) para Angular — \`mat-button\`, \`mat-table\`, \`mat-form-field\`, \`mat-dialog\`, temas, CDK, acessibilidade.
- **jQuery UI**: widgets (datepicker, dialog, autocomplete) e interações sobre jQuery.

## Progressive Web Apps (PWA)
Aplicações web com experiência de **app nativo**: **instaláveis**, funcionam **offline**, rápidas e confiáveis. Requisitos:
1. **HTTPS** (exceto localhost);
2. **Web App Manifest** (\`manifest.json\`/\`.webmanifest\`: \`name\`, \`short_name\`, \`icons\`, \`start_url\`, \`display: standalone\`, \`theme_color\`, \`background_color\`);
3. **Service Worker**: script em segundo plano que atua como **proxy de rede programável** — intercepta \`fetch\`, gerencia a **Cache API**, permite **push notifications** e *background sync*. Ciclo: \`register\` → **install** (pré-cache) → **activate** (limpa caches antigos) → **fetch**. Não acessa o DOM diretamente.

**Estratégias de cache**: *cache first* (ativos estáticos), *network first* (dados que mudam), *stale-while-revalidate* (responde do cache e atualiza em segundo plano), *cache only*, *network only*. **Este site de estudos é um PWA** — por isso funciona offline!
`,
mindmap: `
Front-end
  Angular
    TypeScript
    Componentes standalone
    Bindings
      {{ }}
      [prop]
      (evento)
      [(ngModel)]
    Diretivas *ngIf, *ngFor
    Serviços e DI
    RxJS e Signals
    Router e guards
    Angular CLI
  React
    Biblioteca
    JSX e Virtual DOM
    Props unidirecionais
    Hooks: useState, useEffect
  Vue
    Progressivo
    SFC .vue
    v-model, v-if, v-for
    Composition API
  JSF
    Componentes no servidor
    Facelets .xhtml
    Managed beans
    6 fases do ciclo
    PrimeFaces
  UI
    Bootstrap: 12 colunas
    Angular Material
    jQuery UI
  PWA
    HTTPS
    Manifest
    Service Worker
    Cache API
    Estratégias de cache
`,
cards: [
  ['Sintaxe do two-way data binding no Angular?', '[(ngModel)]="propriedade" (banana in a box).'],
  ['React é framework completo ou biblioteca?', 'Biblioteca para construção de interfaces.'],
  ['Hook do React para efeitos colaterais?', 'useEffect.'],
  ['Quantas colunas tem o grid do Bootstrap?', '12.'],
  ['Três requisitos básicos de um PWA?', 'HTTPS, Web App Manifest e Service Worker.'],
  ['Primeira e última fases do ciclo de vida JSF?', 'Restore View e Render Response.'],
  ['v-if × v-show no Vue?', 'v-if cria/remove o elemento do DOM; v-show apenas alterna a visibilidade via CSS.'],
  ['Estratégia de cache que responde do cache e atualiza em segundo plano?', 'Stale-while-revalidate.']
]});

T({ id: 'web-python', disc: 'web', title: 'Python',
summary: `
## Características
Linguagem **interpretada**, de alto nível, **tipagem dinâmica e forte** (não converte implicitamente \`"1" + 1\` → **TypeError**), multiparadigma; **indentação define blocos** (não há chaves); tudo é objeto. Implementação de referência: **CPython** (compila para *bytecode* .pyc). PEP 8 = guia de estilo.

## Tipos e estruturas
| Tipo | Exemplo | Mutável? |
|---|---|---|
| int, float, complex, bool | \`10, 3.14, 2j, True\` | não |
| str | \`'texto'\` | **não** |
| **list** | \`[1, 2, 3]\` | **sim** (ordenada) |
| **tuple** | \`(1, 2)\` | **não** |
| **dict** | \`{'chave': 'valor'}\` | sim (chaves únicas e imutáveis; mantém ordem de inserção desde 3.7) |
| **set** | \`{1, 2, 3}\` | sim (sem duplicatas, sem ordem); \`frozenset\` imutável |
| None | \`None\` | — |
- \`{}\` cria **dict vazio** (set vazio = \`set()\`).
- Operadores: \`/\` divisão real (\`7/2 = 3.5\`), **\`//\` divisão inteira** (\`7//2 = 3\`), \`%\` resto, \`**\` potência, \`and/or/not\`, \`in\`, \`is\` (identidade) × \`==\` (igualdade).
- **Fatiamento**: \`lista[início:fim:passo]\` (fim exclusivo); \`s[::-1]\` inverte; índices negativos (\`s[-1]\` = último).
- **Compreensões**: \`[x*x for x in range(5) if x % 2 == 0]\` → \`[0, 4, 16]\`; também de dict e set; *generator expressions* \`( … )\`.
- \`range(início, fim, passo)\` — fim exclusivo: \`range(3)\` → 0, 1, 2.

## Controle e funções
- \`if / elif / else\`, \`for x in iterável\`, \`while\`, \`break\`, \`continue\`, \`else\` em laços (executa se não houve break), \`match/case\` (3.10+).
- \`def f(a, b=2, *args, **kwargs):\` — parâmetros padrão, posicionais variáveis (tupla) e nomeados variáveis (dict). \`lambda x: x + 1\`. **Cuidado**: valor padrão mutável (\`def f(l=[])\`) é compartilhado entre chamadas.
- Escopo **LEGB** (Local, Enclosing, Global, Built-in); \`global\`, \`nonlocal\`.
- *Built-ins*: \`len, type, isinstance, sorted\` (nova lista) × \`list.sort()\` (in-place, retorna None), \`enumerate, zip, map, filter, sum, min, max, any, all\`.

## Orientação a objetos
\`class Processo:\` com \`def __init__(self, numero):\` (construtor); \`self\` explícito; herança \`class Filho(Pai):\` (**herança múltipla** permitida, MRO); \`super().__init__()\`; métodos especiais (\`__str__\`, \`__repr__\`, \`__len__\`, \`__eq__\`); \`@staticmethod\`, \`@classmethod\`, \`@property\`; convenção \`_privado\` e *name mangling* \`__atributo\`.

## Exceções e arquivos
\`try / except TipoErro as e / else (se não houve exceção) / finally\`; \`raise\`. **Context manager**: \`with open('a.txt', encoding='utf-8') as f:\` fecha o arquivo automaticamente. Exceções comuns: \`ValueError, TypeError, KeyError, IndexError, ZeroDivisionError, FileNotFoundError\`.

## Ecossistema
**pip** e ambientes virtuais (\`venv\`); bibliotecas: \`requests\` (HTTP), **pandas/NumPy** (dados), Django/Flask/FastAPI (web), pytest/unittest (testes), SQLAlchemy (ORM). Módulos: \`import os\`, \`from datetime import date\`; \`if __name__ == "__main__":\`.
`,
mindmap: `
Python
  Características
    Interpretado
    Dinâmica e forte
    Indentação = bloco
    CPython, PEP 8
  Tipos
    list: mutável
    tuple: imutável
    dict: chave-valor
    set: sem duplicatas
    str: imutável
    {} é dict
  Operadores
    / real
    // inteira
    ** potência
    is × ==
  Fatiamento
    [início:fim:passo]
    [::-1] inverte
  Compreensões
    [x for x in … if …]
  Funções
    *args e **kwargs
    lambda
    Padrão mutável: cuidado
    LEGB
  POO
    __init__ e self
    Herança múltipla
    @property
  Exceções
    try/except/else/finally
    with open
  Ecossistema
    pip e venv
    pandas, Django, pytest
`,
cards: [
  ['Resultado de 7 // 2 em Python?', '3 (divisão inteira).'],
  ['O que {} cria em Python?', 'Um dicionário vazio (set vazio é set()).'],
  ['Lista × tupla?', 'Lista é mutável; tupla é imutável.'],
  ['"abc"[::-1] resulta em…', '"cba".'],
  ['[x*2 for x in range(3)] resulta em…', '[0, 2, 4].'],
  ['Python tem tipagem fraca?', 'Não: é dinâmica, porém forte ("1" + 1 gera TypeError).'],
  ['sorted(lista) × lista.sort()?', 'sorted retorna nova lista; sort ordena in-place e retorna None.'],
  ['Para que serve o bloco else em try/except?', 'Executa apenas se nenhuma exceção ocorreu no try.']
]});

T({ id: 'web-manut', disc: 'web', title: 'Manutenção de sistemas, depuração e IDEs',
summary: `
## Tipos de manutenção (ISO/IEC 14764)
| Tipo | Objetivo |
|---|---|
| **Corretiva** | corrigir defeitos descobertos |
| **Adaptativa** | adaptar a mudanças no ambiente (novo SO, nova lei, nova versão do Java) |
| **Perfectiva** | melhorar desempenho, manutenibilidade, adicionar melhorias solicitadas |
| **Preventiva** | evitar problemas futuros (refatoração, atualização de bibliotecas) |
Leis de **Lehman**: software em uso precisa mudar continuamente; a complexidade cresce se não houver esforço para reduzi-la. **Dívida técnica**: atalhos que cobram “juros” em manutenção futura. **Reengenharia** e **engenharia reversa** para sistemas legados.

## Diagnóstico de problemas e depuração
1. **Reproduzir** o problema de forma consistente (ambiente, dados, passos).
2. Coletar evidências: **logs** (níveis TRACE < DEBUG < INFO < WARN < ERROR), **stack trace** (leia de cima para baixo: a primeira linha mostra a exceção; procure a primeira linha do **seu** código; “Caused by” indica a causa raiz), métricas, *dumps* (thread dump, heap dump).
3. **Isolar** (dividir para conquistar, \`git bisect\`, testes mínimos), formular hipótese, **corrigir**, criar **teste de regressão**.
4. Análise de **causa raiz** (5 porquês, Ishikawa).

**Recursos do depurador (debugger):** **breakpoint** (pausa a execução em uma linha), **breakpoint condicional** (pausa quando expressão é verdadeira), *watch/expressions*, inspeção de variáveis, **pilha de chamadas**, e passos: **Step Over** (executa a linha, sem entrar nos métodos chamados), **Step Into** (entra no método chamado), **Step Out/Return** (termina o método atual e volta ao chamador), **Resume** (continua até o próximo breakpoint). **Depuração remota** de JVM: \`-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005\`.

## Eclipse IDE
IDE da **Eclipse Foundation**, extensível por **plugins**; conceitos de **workspace** (pasta com projetos e metadados), **perspectivas** (Java, Debug, Git) e **views**. Atalhos clássicos: **Ctrl+Shift+O** (organizar imports), **Ctrl+Shift+F** (formatar), **Ctrl+Space** (autocompletar), **Ctrl+1** (*quick fix*), **Ctrl+Shift+R** (abrir recurso), **F3** (ir para declaração), **Alt+Shift+R** (renomear/refatorar). No modo debug: **F5** (step into), **F6** (step over), **F7** (step return), **F8** (resume). Integração com Maven (m2e), Git (EGit), servidores (WildFly).

## Visual Studio Code
Editor de código **leve e gratuito** da Microsoft (base Electron/código aberto “Code – OSS”), extensível por **extensões** (marketplace), com **Language Server Protocol** (LSP), terminal integrado, controle de versão Git nativo, **IntelliSense**, depuração (arquivo **\`.vscode/launch.json\`**), *tasks* (\`tasks.json\`), configurações em \`settings.json\`, **Command Palette** (**Ctrl+Shift+P**), *Quick Open* (**Ctrl+P**), Remote/Dev Containers e Live Share. F5 inicia depuração; F10 *step over*; F11 *step into*; Shift+F11 *step out*.

## Geração de relatórios
Ferramentas como **JasperReports** (modelo \`.jrxml\` compilado para \`.jasper\`, desenhado no Jaspersoft Studio; preenchido com dados via JDBC/coleções e exportado para PDF, XLS, HTML), BIRT, relatórios em Kibana ou Power BI. Boas práticas: consultas otimizadas (índices, paginação), parâmetros, controle de acesso aos dados (LGPD).

## Metodologias de teste na manutenção
Testes de **regressão** automatizados, testes de caracterização (registram o comportamento atual de código legado antes de refatorar), revisão de código (*code review*/*merge request*), análise estática (SonarQube: *bugs*, *code smells*, vulnerabilidades, duplicação, cobertura).
`,
mindmap: `
Manutenção e depuração
  Tipos de manutenção
    Corretiva
    Adaptativa
    Perfectiva
    Preventiva
    Dívida técnica
  Diagnóstico
    Reproduzir
    Logs e níveis
    Stack trace e Caused by
    Isolar e bisect
    Causa raiz
  Debugger
    Breakpoint
    Condicional
    Step Over
    Step Into
    Step Out
    Depuração remota JDWP
  Eclipse
    Workspace e perspectivas
    Plugins
    F5 into, F6 over, F7 return
    Ctrl+Shift+O imports
  VS Code
    Extensões
    LSP
    launch.json
    Ctrl+Shift+P
    F10 over, F11 into
  Relatórios
    JasperReports
    jrxml → jasper
  Testes
    Regressão
    Caracterização
    SonarQube
`,
cards: [
  ['Manutenção para adaptar o sistema a uma nova versão do sistema operacional?', 'Adaptativa.'],
  ['Step Over × Step Into?', 'Step Over executa a linha sem entrar nos métodos chamados; Step Into entra no método chamado.'],
  ['Atalhos de depuração no Eclipse (F5, F6, F7, F8)?', 'F5 step into, F6 step over, F7 step return, F8 resume.'],
  ['Arquivo de configuração de depuração do VS Code?', '.vscode/launch.json.'],
  ['Atalho da Command Palette no VS Code?', 'Ctrl+Shift+P.'],
  ['Em um stack trace, onde está a causa raiz?', 'No último bloco “Caused by”.'],
  ['Formato-fonte de relatório do JasperReports?', '.jrxml (compilado para .jasper).']
]});
