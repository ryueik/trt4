/* Aulas completas — DevOps, PDPJ (Java/Spring/JPA), Engenharia de Software e Desenvolvimento Web */

/* ============================ DEVOPS ============================ */
A('devops-git', `
## 1. O problema que o Git resolve
Imagine dez pessoas editando o mesmo sistema. Sem controle, alguém sobrescreve o trabalho do outro, ninguém sabe qual versão está em produção e voltar atrás é impossível. Um **sistema de controle de versão** guarda **todo o histórico** de alterações, permite trabalhar em paralelo e **juntar** as mudanças com segurança.

O **Git** (criado por Linus Torvalds em 2005) é **distribuído**: cada desenvolvedor tem uma **cópia completa** do repositório, com todo o histórico, e pode trabalhar **offline**. Sistemas antigos como o **SVN** eram **centralizados** (um servidor único com o histórico).

## 2. As três áreas do Git (entenda isso e o resto fica fácil)
| Área | O que é | Comando que leva até ela |
|---|---|---|
| **Working directory** (diretório de trabalho) | seus arquivos como estão no disco | você edita |
| **Staging area / index** (área de preparação) | o “carrinho de compras” do próximo commit | \`git add\` |
| **Repositório local** (.git) | o histórico de commits | \`git commit\` |
| **Repositório remoto** (GitLab/GitHub) | cópia compartilhada | \`git push\` |

Um **commit** é uma “foto” do projeto, identificada por um **hash SHA-1** (ex.: 3f9a2c1), com autor, data, mensagem e um ponteiro para o commit anterior (pai).

## 3. Comandos essenciais e o que cada um faz
| Comando | Para quê |
|---|---|
| \`git init\` | cria um repositório novo |
| \`git clone <url>\` | copia um repositório remoto (com todo o histórico) |
| \`git status\` | mostra o que mudou e o que está na staging |
| \`git add arquivo\` | coloca a mudança na staging |
| \`git commit -m "msg"\` | grava a foto no histórico local |
| \`git log\` | lista o histórico |
| \`git diff\` | mostra diferenças |
| \`git branch nome\` | cria um ramo |
| \`git checkout nome\` / \`git switch nome\` | muda de ramo |
| \`git merge ramo\` | junta outro ramo ao atual |
| \`git rebase base\` | reaplica seus commits sobre outra base (histórico linear) |
| \`git fetch\` | **baixa** novidades do remoto **sem** mexer no seu trabalho |
| \`git pull\` | **fetch + merge** (baixa e integra) |
| \`git push\` | envia seus commits ao remoto |
| \`git stash\` | guarda alterações não commitadas temporariamente |
| \`git tag v1.0\` | marca uma versão (release) |
| \`git cherry-pick <hash>\` | aplica **um commit específico** no ramo atual |

## 4. Desfazendo coisas — o que a FCC mais pergunta
| Situação | Comando | Reescreve histórico? |
|---|---|---|
| Desfazer um commit **já compartilhado** | **\`git revert <hash>\`** — cria um **novo commit** que inverte o anterior | **Não** (seguro) |
| Voltar o ponteiro do ramo, descartando commits locais | \`git reset --hard <hash>\` | **Sim** (perigoso em ramo compartilhado) |
| Tirar arquivo da staging sem perder a edição | \`git reset arquivo\` / \`git restore --staged\` | Não |
| Descartar alterações locais de um arquivo | \`git restore arquivo\` / \`git checkout -- arquivo\` | Não |
| Corrigir a mensagem do último commit | \`git commit --amend\` | Sim |
> [!fcc] Regra prática: **em ramo compartilhado, use revert**. reset, amend e rebase reescrevem o histórico e exigem push forçado, o que quebra o trabalho dos colegas.

### reset: soft × mixed × hard
- **--soft**: volta o ponteiro; mudanças ficam na **staging**.
- **--mixed** (padrão): volta o ponteiro; mudanças ficam no **diretório de trabalho**.
- **--hard**: volta tudo e **descarta** as mudanças.

## 5. Merge × rebase
- **Merge**: junta dois ramos criando (em geral) um **commit de merge**; preserva o histórico real. Se o ramo de destino não andou, ocorre **fast-forward** (o ponteiro só avança).
- **Rebase**: “recorta” seus commits e os reaplica sobre a ponta do outro ramo; histórico **linear**, mas reescreve commits. Regra de ouro: **não faça rebase de commits já publicados**.
- **Conflito**: quando as duas linhas mudaram o mesmo trecho; o Git marca com \`<<<<<<<\`, \`=======\`, \`>>>>>>>\` e você resolve manualmente, depois \`add\` e \`commit\`.

## 6. Gitflow (o modelo de ramificação mais cobrado)
| Ramo | Nasce de | Volta para | Para quê |
|---|---|---|---|
| **main/master** | — | — | código **em produção**, com tags de versão |
| **develop** | main | — | integração do próximo release |
| **feature/*** | develop | **develop** | novas funcionalidades |
| **release/*** | develop | **main e develop** | estabilizar uma versão (só correções) |
| **hotfix/*** | **main** | **main e develop** | correção **urgente** em produção |
Alternativas mais simples: **GitHub Flow** (main + ramos curtos + pull request) e **Trunk-Based Development** (todos integram no tronco várias vezes ao dia, com feature flags) — este favorece CI/CD.

## 7. GitLab e GitHub
Plataformas que hospedam repositórios Git e acrescentam colaboração:
- **Merge Request** (GitLab) = **Pull Request** (GitHub): proposta de integrar um ramo, com **revisão de código**, discussão e checagens automáticas.
- **Issues**, wikis, **CI/CD integrado** (**GitLab CI** com o arquivo \`.gitlab-ci.yml\`; **GitHub Actions** com arquivos em \`.github/workflows\`), **runners** que executam os jobs, registro de contêineres, proteção de ramos.
- A **PDPJ-Br** usa **GitLab** para hospedar o código colaborativo dos tribunais.

## 8. .gitignore e boas práticas
- \`.gitignore\`: lista arquivos que não devem ser versionados (builds, \`node_modules\`, **segredos e senhas**!).
- Commits pequenos, com mensagens claras; nunca versionar credenciais (se acontecer, **revogue** a credencial — apagar do histórico não basta).
`);

A('devops-cicd', `
## 1. O que é DevOps (de verdade)
DevOps não é uma ferramenta nem um cargo: é uma **cultura** que une **desenvolvimento (Dev)** e **operações (Ops)** para entregar software **com frequência, rapidez e confiabilidade**. Antes, o desenvolvedor “jogava o código por cima do muro” e a equipe de infraestrutura descobria os problemas em produção. Com DevOps, as duas áreas compartilham **responsabilidade**, **automação** e **métricas**.

O acrônimo **CALMS** resume os pilares: **C**ultura, **A**utomação, **L**ean (eliminar desperdício), **M**edição e **S**haring (compartilhamento).

## 2. CI, Entrega Contínua e Implantação Contínua — a diferença que sempre cai
Pense numa linha de montagem automatizada:
| Prática | O que acontece | Quem decide ir para produção |
|---|---|---|
| **Integração Contínua (CI)** | cada push dispara **build + testes automatizados**; desenvolvedores integram ao tronco **várias vezes ao dia** | — (não chega à produção) |
| **Entrega Contínua (Continuous Delivery)** | além da CI, o software é empacotado e implantado em ambientes de teste/homologação; fica **sempre pronto** para produção | **uma pessoa** (aprovação **manual**) |
| **Implantação Contínua (Continuous Deployment)** | tudo o que passa no pipeline vai **automaticamente** para produção | **ninguém** — é automático |
> [!fcc] Pegadinha clássica: a diferença entre **entrega** e **implantação** contínua é **só** a etapa manual antes da produção.

## 3. O pipeline típico
**Commit → Build → Testes unitários → Análise estática (qualidade e segurança) → Empacotamento (artefato/imagem Docker) → Deploy em homologação → Testes de integração/aceitação → (aprovação) → Produção → Monitoramento.**
Princípios: **falhar rápido** (testes mais baratos primeiro), **build uma vez** e promover o **mesmo artefato** entre ambientes, **ambientes parecidos** com produção, **tudo versionado**.

### Exemplo de pipeline no GitLab CI
\`\`\`
stages: [build, test, deploy]

build:
  stage: build
  script: mvn package

testes:
  stage: test
  script: mvn test

deploy-producao:
  stage: deploy
  script: ./deploy.sh
  when: manual        # entrega contínua: alguém clica para liberar
  only: [main]
\`\`\`
Os jobs do mesmo **stage** rodam em paralelo; os stages rodam em sequência. Quem executa é o **GitLab Runner**.

## 4. Estratégias de implantação (deploy)
| Estratégia | Como funciona | Vantagem |
|---|---|---|
| **Rolling update** | substitui instâncias aos poucos | sem indisponibilidade (padrão do Kubernetes) |
| **Blue-green** | dois ambientes idênticos; troca-se o tráfego de uma vez | rollback instantâneo |
| **Canary** | libera para uma **pequena parcela** dos usuários e observa | reduz o impacto de erros |
| **Feature flags** | código vai para produção “desligado” e é ativado por configuração | separa deploy de lançamento |

## 5. DevSecOps: segurança desde o início (“shift left”)
Colocar segurança **dentro** do pipeline, e não só no fim:
| Técnica | O que analisa | Quando |
|---|---|---|
| **SAST** (Static Application Security Testing) | **código-fonte** sem executar (caixa-branca) | cedo, a cada commit (ex.: SonarQube) |
| **SCA** (Software Composition Analysis) | **dependências/bibliotecas** com vulnerabilidades conhecidas (CVE) e licenças | no build (ex.: OWASP Dependency-Check) |
| **DAST** (Dynamic) | a **aplicação rodando**, de fora (caixa-preta) | em homologação (ex.: OWASP ZAP) |
| **IAST** | instrumentação durante os testes | testes |
| **Secret scanning** | senhas e tokens no código | commit |
| **Varredura de imagens/IaC** | contêineres e infraestrutura como código | build |

## 6. Infraestrutura como Código (IaC) e GitOps
- **IaC**: descrever servidores, redes e configurações em **arquivos versionados** (Terraform, Ansible, manifestos Kubernetes) em vez de configurar à mão. Ganho: reprodutibilidade, revisão, auditoria.
- **Declarativo** (descreve o estado desejado — Terraform, Kubernetes) × **imperativo** (descreve os passos — scripts).
- **GitOps**: o repositório Git é a **fonte da verdade**; uma ferramenta (Argo CD, Flux) sincroniza o cluster com o que está no Git.

## 7. Métricas DORA (como medir desempenho DevOps)
1. **Frequência de implantação**; 2. **Lead time para mudanças** (do commit à produção); 3. **Taxa de falha de mudanças**; 4. **Tempo de recuperação (MTTR)**. Times de alto desempenho implantam muito e se recuperam rápido.
`);

A('devops-auth', `
## 1. Autenticação × autorização
- **Autenticação**: provar **quem você é** (login e senha, certificado, biometria).
- **Autorização**: decidir **o que você pode fazer** (ler processos, assinar documentos).
Muitos erros de prova vêm de confundir os dois. O **OAuth 2.0** é, em essência, um protocolo de **autorização delegada**; o **OpenID Connect** acrescenta **autenticação** por cima dele.

## 2. SSO (Single Sign-On)
O usuário faz login **uma vez** num provedor de identidade (IdP) e acessa **vários sistemas** sem digitar a senha de novo. Na **PDPJ-Br**, o SSO é feito pelo **Keycloak**: o magistrado ou servidor entra uma vez e usa PJe e outros módulos.
Vantagens: menos senhas, **MFA centralizado**, desligamento de usuário em um só lugar. Risco: o IdP vira ponto crítico (precisa de alta disponibilidade e proteção forte).

## 3. Keycloak — vocabulário que cai
| Termo | Significado |
|---|---|
| **Realm** | “espaço” isolado com seus usuários, clientes, papéis e configurações (ex.: realm “pdpj”) |
| **Client** | aplicação que usa o Keycloak para autenticar (front-end, API) |
| **Roles** | papéis: **realm roles** (globais) e **client roles** (de uma aplicação) |
| **Groups** | agrupam usuários para herdar papéis |
| **Identity brokering / federation** | conectar a outros IdPs ou a **LDAP/Active Directory** |
| Protocolos | **OpenID Connect** e **SAML 2.0** |

## 4. OAuth 2.0 (RFC 6749) — os quatro papéis
Imagine um aplicativo que quer ler seus processos no tribunal **sem** saber sua senha:
1. **Resource Owner** (dono do recurso): **você**, o usuário.
2. **Client** (cliente): a **aplicação** que quer acessar.
3. **Authorization Server**: quem autentica você e **emite tokens** (o Keycloak).
4. **Resource Server**: a **API** que guarda os dados e aceita tokens.

O cliente recebe um **access token** — uma espécie de “crachá temporário” com **escopo** (o que pode fazer) e **validade** curta. Também pode receber um **refresh token** para obter novos access tokens sem pedir login de novo.

## 5. Os fluxos (grant types)
| Fluxo | Quando usar | Situação hoje |
|---|---|---|
| **Authorization Code + PKCE** | aplicações web, **SPA** e **mobile** (com usuário) | **recomendado para todos** |
| **Client Credentials** | **máquina a máquina** (um serviço chamando outro, sem usuário) | recomendado |
| **Device Code** | dispositivos sem teclado (TVs) | uso específico |
| **Refresh Token** | renovar o access token | usado com os demais |
| ~~Implicit~~ | antigo, para SPA | **não usar** (token exposto na URL) |
| ~~Resource Owner Password Credentials~~ | o cliente recebe a senha do usuário | **não usar** |

### Authorization Code com PKCE, passo a passo
1. O cliente gera um segredo aleatório (**code_verifier**) e calcula seu hash (**code_challenge**).
2. Redireciona o usuário ao servidor de autorização com o **code_challenge**.
3. O usuário faz login (e MFA) **no servidor de autorização**, não no cliente.
4. O servidor devolve um **código de autorização** de uso único para a **redirect_uri** cadastrada.
5. O cliente troca o código + **code_verifier** por **tokens** (no canal de trás, back-channel).
6. O servidor confere se o hash do verifier bate com o challenge → só quem iniciou o fluxo consegue os tokens. Isso impede que um atacante que intercepte o código o utilize.

## 6. RFC 9700 (2025) — melhores práticas atuais de segurança do OAuth 2.0
- Usar **PKCE** em **todos** os clientes (inclusive os confidenciais).
- **Não** usar o Implicit Grant nem o Password Grant.
- **Correspondência exata** da redirect_uri (sem curingas).
- Tokens com **escopo mínimo** e **audience** restrita; preferir tokens **vinculados ao remetente** (sender-constrained: mTLS ou DPoP).
- **Refresh tokens** rotacionados ou vinculados ao cliente.
- Proteção contra **CSRF** (parâmetro state ou PKCE) e contra open redirectors.

## 7. JWT (JSON Web Token)
Formato de token compacto: **header.payload.signature**, cada parte em **Base64URL**.
- **Header**: algoritmo (ex.: RS256) e tipo.
- **Payload**: **claims** — \`iss\` (emissor), \`sub\` (sujeito), \`aud\` (destinatário), \`exp\` (expiração), \`iat\` (emitido em), além de papéis e escopos.
- **Signature**: garante **integridade e autenticidade** (assinatura com chave privada do emissor — RS256 — ou HMAC compartilhado — HS256).
> [!fcc] Um JWT **assinado (JWS)** **não é criptografado**: qualquer um decodifica o Base64 e lê o conteúdo. Para sigilo existe o **JWE**. Por isso **nunca** coloque senhas ou dados sensíveis no payload. E a API deve **validar** assinatura, \`exp\`, \`iss\` e \`aud\` — e rejeitar \`alg: none\`.

## 8. OpenID Connect (OIDC)
Camada de **identidade** sobre o OAuth 2.0. Acrescenta o **ID Token** (sempre um **JWT**), destinado ao **cliente**, com informações sobre a **autenticação** do usuário, o escopo \`openid\`, o endpoint **UserInfo** e a descoberta automática (\`.well-known/openid-configuration\`).
Resumo: **access token → para a API**; **ID token → para o cliente saber quem logou**.
`);

A('devops-msg', `
## 1. Por que mensageria?
Em microsserviços, um serviço chamar o outro **diretamente e esperar a resposta** (síncrono, via REST) cria **acoplamento**: se o serviço de notificações cair, o cadastro de processos também trava. Com **mensageria**, o serviço **publica uma mensagem** numa fila e segue a vida; quem precisa **consome** quando puder. Isso traz **desacoplamento**, **resiliência** (mensagens esperam na fila se o consumidor cair), **absorção de picos** e **escalabilidade** (vários consumidores em paralelo).

Analogia: REST é um **telefonema** (os dois precisam estar disponíveis ao mesmo tempo); mensageria é **deixar um recado na caixa postal**.

## 2. Padrões de comunicação
- **Ponto a ponto (fila)**: cada mensagem é processada por **um** consumidor (competição entre consumidores → balanceamento).
- **Publish/subscribe (tópico)**: cada mensagem vai para **todos** os interessados.
- **Request/reply** assíncrono, **eventos de domínio**, **event-driven architecture**.

## 3. RabbitMQ e o modelo AMQP
O RabbitMQ é um **message broker** que implementa o protocolo **AMQP 0-9-1** (também suporta MQTT e STOMP). É usado na **PDPJ-Br** para comunicação assíncrona entre módulos.
O fluxo é: **Producer → Exchange → (bindings) → Queue → Consumer**.
- O produtor **não** publica direto na fila: publica numa **exchange**, com uma **routing key**.
- A exchange decide em quais filas colocar a mensagem, conforme as **bindings** (regras de ligação exchange→fila, com uma **binding key**).

### Tipos de exchange (sempre cai)
| Tipo | Regra de roteamento | Exemplo |
|---|---|---|
| **Direct** | routing key **igual** à binding key | “processo.novo” → fila de processos novos |
| **Topic** | padrões com curingas: **\\*** = exatamente **uma** palavra; **#** = **zero ou mais** palavras | binding “tribunal.*.erro” recebe “tribunal.vara.erro”, mas não “tribunal.vara.civel.erro” |
| **Fanout** | **ignora** a routing key; manda para **todas** as filas ligadas (broadcast) | notificar todos os serviços |
| **Headers** | usa atributos do **cabeçalho** em vez da routing key | |
| Default (nameless) | direct implícita: a routing key é o **nome da fila** | |

### Confiabilidade
- **Ack (acknowledgement)**: o consumidor confirma que processou; sem ack, a mensagem volta para a fila (ou para outro consumidor). **nack/reject** devolvem ou descartam.
- **Filas duráveis** + **mensagens persistentes**: sobrevivem a reinício do broker.
- **Dead Letter Exchange (DLX)**: destino de mensagens rejeitadas, expiradas (TTL) ou que excederam o tamanho da fila — para análise posterior.
- **Prefetch (QoS)**: limita quantas mensagens um consumidor recebe sem confirmar.
- Entrega “**pelo menos uma vez**” → consumidores devem ser **idempotentes** (processar a mesma mensagem duas vezes sem efeito duplicado).

## 4. RabbitMQ × Kafka (comparação comum)
| | RabbitMQ | Apache Kafka |
|---|---|---|
| Modelo | **broker** de filas; mensagem sai da fila ao ser consumida | **log distribuído** de eventos; mensagens **retidas** por tempo configurado e relidas |
| Roteamento | rico (exchanges) | por tópico e partição |
| Ponto forte | tarefas, roteamento flexível | **altíssimo volume**, streaming, replay |

## 5. Webhooks
Um **webhook** é um **callback HTTP**: quando algo acontece no sistema A, ele faz um **POST** para uma URL cadastrada pelo sistema B. É o contrário de B ficar perguntando a todo momento (**polling**). Ex.: o GitLab chama um webhook a cada push para disparar um pipeline externo.
Boas práticas: validar a **assinatura** (HMAC com segredo compartilhado), usar **HTTPS**, responder rápido (processar em fila), lidar com **reenvios** (idempotência).

## 6. Proxy reverso
Um **proxy reverso** fica **na frente dos servidores** e recebe as requisições dos clientes em nome deles (ex.: **Nginx**, Apache, HAProxy, Traefik). Funções: **terminação TLS** (HTTPS), **balanceamento de carga**, **cache**, compressão, roteamento por caminho/host, proteção (esconde os servidores internos, pode ter **WAF**).
- **Proxy de encaminhamento (forward)**: fica do lado do **cliente** (os usuários da rede interna saem à internet por ele).
- **Proxy reverso**: fica do lado do **servidor**.

## 7. Balanceamento de carga
Distribui requisições entre várias instâncias para **escalabilidade** e **alta disponibilidade**.
- **Algoritmos**: **round robin** (rodízio), **weighted round robin** (com pesos), **least connections** (menos conexões ativas), **IP hash** (mesmo cliente → mesmo servidor), least response time.
- **Camada 4** (transporte: IP e porta, mais rápido) × **camada 7** (aplicação: olha URL, cabeçalhos, cookies — mais inteligente).
- **Health checks**: retira do pool servidores que não respondem.
- **Sticky session (afinidade)**: prende o usuário a um servidor; evite quando possível (prefira aplicações **stateless** com sessão em cache distribuído/token).
`);

/* ============================ PDPJ — JAVA ============================ */
A('pdpj-java', `
## 1. Como o Java funciona por dentro
Você escreve código em arquivos **.java** → o compilador **javac** gera **bytecode** (arquivos **.class**) → a **JVM (Java Virtual Machine)** executa esse bytecode em qualquer sistema operacional. Daí o lema **“write once, run anywhere”**.
- **JDK** (Java Development Kit): ferramentas de desenvolvimento (javac, jar, javadoc) + JRE.
- **JRE** (Java Runtime Environment): JVM + bibliotecas para **executar**.
- **JVM**: interpreta e compila em tempo de execução (**JIT — Just-In-Time**) o bytecode; gerencia a memória com o **Garbage Collector**.
- Versões **LTS** recentes: Java 17, **21** e 25.

## 2. Tipos de dados
**8 tipos primitivos** (guardam o valor diretamente):
| Tipo | Tamanho | Exemplo |
|---|---|---|
| byte | 8 bits | -128 a 127 |
| short | 16 bits | |
| **int** | 32 bits | 42 |
| **long** | 64 bits | 42L |
| float | 32 bits | 3.14f |
| **double** | 64 bits | 3.14 |
| char | 16 bits (Unicode) | 'A' |
| **boolean** | true/false | |
Todo o resto são **tipos por referência** (objetos): String, arrays, classes. Cada primitivo tem uma **classe wrapper** (Integer, Double...), com **autoboxing/unboxing** automático.

## 3. == × equals (a pegadinha nº 1)
- \`==\` compara **referências** (é o mesmo objeto na memória?) — para primitivos, compara valores.
- \`equals()\` compara **conteúdo** (se a classe o sobrescrever, como String faz).
\`\`\`
String a = "TRT4";              // vai para o pool de Strings
String b = new String("TRT4");  // objeto novo
a == b        // false
a.equals(b)   // true
\`\`\`
- **String é imutável**: cada “alteração” cria outro objeto. Para concatenar em laço, use **StringBuilder**.
- Ao sobrescrever \`equals\`, sobrescreva também **hashCode** (objetos iguais devem ter o mesmo hash — senão HashMap e HashSet falham).

## 4. Estruturas de controle
\`if/else\`, \`switch\` (inclusive **switch expressions** com \`->\`, Java 14+), \`for\`, **for-each** (\`for (String s : lista)\`), \`while\`, \`do-while\` (executa **ao menos uma vez**), \`break\`, \`continue\`.
Operadores lógicos de curto-circuito: \`&&\` e \`||\` (não avaliam o segundo lado se não for necessário).

## 5. Collections Framework
| Interface | Características | Implementações |
|---|---|---|
| **List** | **ordenada por índice**, **permite duplicatas** | **ArrayList** (acesso rápido por índice), **LinkedList** (inserção/remoção rápida nas pontas) |
| **Set** | **não permite duplicatas** | **HashSet** (sem ordem), **LinkedHashSet** (ordem de inserção), **TreeSet** (ordenado; não aceita null) |
| **Map** | pares **chave → valor**, **chaves únicas** | **HashMap** (aceita uma chave null), **LinkedHashMap**, **TreeMap** (ordenado por chave) |
| **Queue/Deque** | fila / fila dupla | ArrayDeque, PriorityQueue |
> [!dica] Map **não** herda de Collection. HashMap não é sincronizado; para concorrência use **ConcurrentHashMap**.

## 6. Exceções
- **Checked** (verificadas): o compilador **obriga** a tratar (try/catch) ou declarar (\`throws\`). Ex.: IOException, SQLException.
- **Unchecked** (RuntimeException e filhas): não obrigatórias. Ex.: NullPointerException, IllegalArgumentException, ArithmeticException.
- **Error**: problemas graves da JVM (OutOfMemoryError) — não se trata.
- \`finally\` sempre executa; **try-with-resources** fecha automaticamente recursos que implementam AutoCloseable.

## 7. Recursos modernos (Java 8 em diante)
- **Lambdas**: \`x -> x * 2\`; **interfaces funcionais** (um só método abstrato): Predicate, Function, Consumer, Supplier.
- **Streams**: processamento declarativo de coleções.
\`\`\`
int soma = lista.stream()
    .filter(x -> x % 2 == 0)   // intermediária: mantém pares
    .map(x -> x * x)           // intermediária: eleva ao quadrado
    .reduce(0, Integer::sum);  // terminal: soma
\`\`\`
  Operações **intermediárias** (filter, map, sorted) são **preguiçosas**: só executam quando há uma **terminal** (collect, forEach, reduce, count).
- **Optional**: evita null explícito. **var** (Java 10): inferência de tipo local. **Records** (Java 16): classes imutáveis de dados (\`record Processo(String numero, String vara) {}\`). **Text blocks**, **pattern matching** para instanceof e switch, **sealed classes**, **virtual threads** (Java 21).

## 8. Modificadores de acesso
| Modificador | Mesma classe | Mesmo pacote | Subclasse | Todos |
|---|---|---|---|---|
| **private** | ✔ | | | |
| (default/package) | ✔ | ✔ | | |
| **protected** | ✔ | ✔ | ✔ | |
| **public** | ✔ | ✔ | ✔ | ✔ |
\`static\`: pertence à **classe**, não ao objeto. \`final\`: variável não muda; método não pode ser sobrescrito; classe não pode ser herdada.
`);

A('pdpj-oo', `
## 1. A ideia da orientação a objetos
Em vez de pensar o programa como uma lista de instruções, pensamos em **objetos** que representam coisas do mundo (um Processo, uma Parte, um Juiz), cada um com **estado** (atributos) e **comportamento** (métodos).
- **Classe** = a planta da casa (o molde).
- **Objeto** = a casa construída (a instância). \`Processo p = new Processo();\`
- **Construtor**: método especial chamado no \`new\`, que inicializa o objeto.

## 2. Os quatro pilares
### Abstração
Representar só o que importa para o problema. Um Processo, no sistema judicial, tem número, classe, partes — não tem “cor da capa”.

### Encapsulamento
**Esconder** os detalhes internos e expor só o necessário: atributos **private** + métodos públicos (getters/setters ou, melhor, métodos de negócio). Protege a consistência: ninguém altera o saldo de uma conta sem passar pela regra de validação.

### Herança
Uma classe (**subclasse**) **herda** atributos e métodos de outra (**superclasse**) — relação **“é um”**: \`class Juiz extends Servidor\`.
- Java tem **herança simples** de classes (uma só superclasse), mas uma classe pode **implementar várias interfaces**.
- Cuidado: herança cria **acoplamento forte**. Prefira **composição** (“tem um”) quando possível.

### Polimorfismo
“Muitas formas”: a mesma chamada se comporta de modo diferente conforme o objeto.
| Tipo | Como | Resolvido em |
|---|---|---|
| **Sobrescrita (overriding)** | subclasse redefine um método da superclasse (**mesma assinatura**) | **tempo de execução** (ligação dinâmica) |
| **Sobrecarga (overloading)** | vários métodos com **mesmo nome** e **parâmetros diferentes** na mesma classe | **tempo de compilação** |
\`\`\`
Servidor s = new Juiz();   // variável do tipo da superclasse
s.calcularRemuneracao();  // executa a versão de Juiz (sobrescrita)
\`\`\`

## 3. Classe abstrata × interface
| | **Classe abstrata** | **Interface** |
|---|---|---|
| Instanciável? | não | não |
| Atributos de instância | sim | não (só constantes) |
| Métodos com corpo | sim | sim, como **default** e **static** (Java 8+) |
| Construtor | sim | não |
| Herança | uma só (\`extends\`) | várias (\`implements\`) |
| Ideia | “**é um**” com código comum | “**sabe fazer**” (contrato) |

## 4. Associação, agregação e composição
- **Associação**: um objeto usa ou conhece outro.
- **Agregação** (todo-parte **fraco**): a parte **existe sem** o todo (Departamento — Servidor).
- **Composição** (todo-parte **forte**): a parte **não existe sem** o todo; morre junto (Processo — Movimentação).

## 5. Acoplamento e coesão
- **Baixo acoplamento** (classes pouco dependentes entre si) e **alta coesão** (cada classe com uma responsabilidade bem definida) = código fácil de manter. É o objetivo de todos os princípios abaixo.

## 6. SOLID (cobrança frequente)
| Letra | Princípio | Em uma frase |
|---|---|---|
| **S** | Single Responsibility | uma classe deve ter **um único motivo para mudar** |
| **O** | Open/Closed | aberta para **extensão**, fechada para **modificação** |
| **L** | Liskov Substitution | subclasses devem poder **substituir** a superclasse sem quebrar o programa |
| **I** | Interface Segregation | várias interfaces **específicas** são melhores que uma interface “gorda” |
| **D** | Dependency Inversion | dependa de **abstrações**, não de implementações concretas |
O **D** é a base da **injeção de dependências** do Spring.

## 7. Outros conceitos que caem
- **this** (o próprio objeto) e **super** (a superclasse).
- **Imutabilidade**: objetos cujo estado não muda após criados (String, records) — mais seguros em concorrência.
- **Generics**: \`List<Processo>\` — segurança de tipos em tempo de compilação.
- **Lei de Demeter**: “fale só com seus amigos próximos” — evite cadeias como \`a.getB().getC().fazer()\`.
`);

A('pdpj-micro', `
## 1. Do monólito aos microsserviços
- **Monólito**: toda a aplicação em **um único artefato** implantado de uma vez. Simples no início; com o crescimento, qualquer mudança exige reimplantar tudo, uma falha pode derrubar o sistema inteiro e escalar significa escalar tudo.
- **Microsserviços**: o sistema é dividido em **serviços pequenos e independentes**, cada um responsável por uma **capacidade de negócio**, com **seu próprio banco de dados**, implantado e escalado **separadamente**, comunicando-se por **APIs** (REST) ou **mensagens**.
É a arquitetura da **PDPJ-Br**: cada tribunal pode desenvolver um módulo (um microsserviço) e disponibilizá-lo para todos.

### Vantagens e custos
| Vantagens | Desafios |
|---|---|
| deploy independente e frequente | complexidade de rede e de operação |
| escalabilidade seletiva | **consistência de dados** distribuída |
| isolamento de falhas | observabilidade (logs, métricas, rastreamento distribuído) |
| liberdade tecnológica por serviço | testes de integração mais difíceis |

## 2. Padrões que você precisa conhecer
| Padrão | Problema que resolve |
|---|---|
| **API Gateway** | ponto **único de entrada**: roteamento, autenticação, rate limiting, agregação (ex.: Spring Cloud Gateway, antigo Zuul) |
| **Service Discovery** | serviços se encontram dinamicamente pelo nome (ex.: **Eureka**, DNS do Kubernetes) |
| **Circuit Breaker** | se um serviço falha repetidamente, “abre o disjuntor” e para de chamá-lo por um tempo, evitando **falhas em cascata** (ex.: Resilience4j) |
| **Database per Service** | cada serviço é dono dos seus dados |
| **Saga** | transações que envolvem vários serviços: sequência de **transações locais** com **compensações** em caso de falha (coreografada por eventos ou orquestrada) |
| **CQRS** | separar modelo de escrita e de leitura |
| **Strangler Fig** | migrar um monólito **aos poucos**, substituindo funcionalidades |
| **Sidecar** | componente auxiliar ao lado do serviço (proxy de service mesh) |
| **Config Server** | configuração centralizada |

## 3. REST — o estilo de API mais usado
REST (**Representational State Transfer**, Roy Fielding) é um **estilo arquitetural** sobre HTTP. Restrições: **cliente-servidor**, **stateless** (cada requisição traz tudo o que é necessário), **cacheável**, **interface uniforme** (recursos identificados por URIs), **sistema em camadas**, código sob demanda (opcional).

### Verbos HTTP
| Verbo | Uso | Seguro? | Idempotente? |
|---|---|---|---|
| **GET** | ler | sim | sim |
| **POST** | criar / processar | não | **não** |
| **PUT** | substituir por completo | não | **sim** |
| **PATCH** | alterar parcialmente | não | não (em geral) |
| **DELETE** | remover | não | **sim** |
**Idempotente**: repetir a requisição produz o mesmo efeito que fazê-la uma vez.

### Códigos de status
**2xx** sucesso (200 OK, **201 Created**, 204 No Content) · **3xx** redirecionamento (301, 304) · **4xx** erro do **cliente** (400 Bad Request, **401 Unauthorized** = não autenticado, **403 Forbidden** = autenticado mas sem permissão, 404 Not Found, 409 Conflict, 422, 429 Too Many Requests) · **5xx** erro do **servidor** (500, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout).

### Boas práticas de URI
Substantivos no plural, sem verbos: \`GET /processos/123/movimentacoes\`; filtros por query string: \`?vara=5&page=2\`; versionamento (\`/v1/\`). **HATEOAS**: respostas com links para próximas ações (nível máximo do modelo de maturidade de Richardson).

## 4. JSON
Formato leve de troca de dados: objetos \`{ }\`, arrays \`[ ]\`, strings entre **aspas duplas**, números, true/false, **null**. Não aceita comentários nem vírgula sobrando.
\`\`\`
{ "numero": "0001234-56.2026.5.04.0001", "urgente": true, "partes": ["Ana", "Empresa X"] }
\`\`\`

## 5. OpenAPI (antigo Swagger)
Especificação (YAML/JSON) que **descreve a API**: caminhos, parâmetros, corpos, respostas, esquemas e segurança. Permite gerar **documentação interativa** (Swagger UI), clientes e testes. Abordagens: **design-first** (escreve o contrato antes) ou **code-first** (gera a partir do código, ex.: springdoc-openapi). A PDPJ exige APIs documentadas.

## 6. Jakarta EE (antigo Java EE)
Conjunto de **especificações** para aplicações corporativas Java, hoje mantido pela **Eclipse Foundation** (o pacote mudou de \`javax.*\` para \`jakarta.*\`). Principais: **Servlets**, **JAX-RS / Jakarta RESTful Web Services** (APIs REST), **CDI** (injeção de dependências), **JPA / Jakarta Persistence**, **Bean Validation**, **JSF / Jakarta Faces**, **EJB**, **JMS / Jakarta Messaging**, **JTA** (transações). Servidores como **WildFly** implementam essas especificações. O **MicroProfile** adapta o Jakarta EE para microsserviços.
`);

A('pdpj-spring', `
## 1. O que é o Spring e por que ele domina o Java corporativo
O **Spring Framework** é um framework que cuida da “infraestrutura” da aplicação para que você foque na regra de negócio. Seu coração é o **contêiner IoC (Inversion of Control)**: em vez de você criar os objetos com \`new\`, o Spring **cria, configura e entrega** os objetos (chamados **beans**) onde forem necessários. Isso é a **Injeção de Dependências (DI)**.

Analogia: em vez de cada servidor comprar seu próprio computador, o almoxarifado (Spring) entrega o equipamento certo a cada um.

## 2. Injeção de dependências na prática
\`\`\`
@Service
public class ProcessoService {
    private final ProcessoRepository repo;

    public ProcessoService(ProcessoRepository repo) { // injeção por construtor
        this.repo = repo;
    }
}
\`\`\`
- Formas: por **construtor** (**recomendada**: dependências obrigatórias, imutáveis, fácil de testar), por **setter** (opcionais) e por **campo** (@Autowired no atributo — desaconselhada).
- Com um único construtor, o @Autowired é **opcional** (Spring 4.3+).
- Se houver várias implementações de uma interface, desempate com **@Qualifier** ou **@Primary**.

## 3. Estereótipos (anotações de componente)
| Anotação | Camada |
|---|---|
| **@Component** | componente genérico |
| **@Service** | regras de negócio |
| **@Repository** | acesso a dados (traduz exceções de persistência) |
| **@Controller** | controlador web MVC (retorna views) |
| **@RestController** | = **@Controller + @ResponseBody** → retorna dados (JSON) |
| **@Configuration** + **@Bean** | classe de configuração com métodos que produzem beans |

### Escopos de bean
**singleton** (padrão: uma instância por contêiner), **prototype** (nova a cada injeção), **request**, **session**, **application**.

## 4. Spring Boot — “convenção sobre configuração”
O Spring Boot elimina a configuração manual:
- **Starters**: dependências agrupadas (\`spring-boot-starter-web\`, \`-data-jpa\`, \`-security\`, \`-test\`).
- **Autoconfiguração**: detecta o que está no classpath e configura sozinho (achou o driver do PostgreSQL? configura um DataSource).
- **Servidor embutido** (Tomcat por padrão; Jetty ou Undertow) → gera um **JAR executável**: \`java -jar app.jar\`.
- **@SpringBootApplication** = @Configuration + @EnableAutoConfiguration + @ComponentScan.
- Configuração em **application.properties / application.yml**, com **profiles** (dev, hom, prod).
- **Actuator**: endpoints de saúde e métricas (\`/actuator/health\`), essenciais para o Kubernetes.

### Um endpoint REST completo
\`\`\`
@RestController
@RequestMapping("/api/processos")
public class ProcessoController {
    private final ProcessoService service;
    public ProcessoController(ProcessoService service) { this.service = service; }

    @GetMapping("/{id}")
    public ProcessoDTO buscar(@PathVariable Long id) { return service.buscar(id); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProcessoDTO criar(@RequestBody @Valid ProcessoDTO dto) { return service.criar(dto); }
}
\`\`\`
Outras anotações: @PutMapping, @DeleteMapping, **@RequestParam** (query string), **@PathVariable** (parte da URL), **@RequestBody** (corpo JSON), **@Valid** (Bean Validation), **@ExceptionHandler/@ControllerAdvice** (tratamento global de erros), **@Transactional** (transações).

## 5. Spring Data JPA
Você escreve só a **interface**; o Spring gera a implementação:
\`\`\`
public interface ProcessoRepository extends JpaRepository<Processo, Long> {
    List<Processo> findByVaraAndUrgenteTrue(String vara); // query derivada do nome
}
\`\`\`
Hierarquia: Repository → CrudRepository → PagingAndSortingRepository → **JpaRepository**. Consultas: **derivadas do nome do método**, **@Query** (JPQL ou SQL nativo), paginação com **Pageable**.

## 6. Spring Security
Autenticação e autorização por meio de uma **cadeia de filtros**. Na PDPJ, a aplicação atua como **Resource Server OAuth2**: valida o **JWT** emitido pelo Keycloak e aplica regras por papel (\`@PreAuthorize("hasRole('MAGISTRADO')")\`).

## 7. Spring Cloud — ferramentas para microsserviços
| Componente | Função |
|---|---|
| **Eureka** (Netflix) | **service discovery**: servidor de registro; os serviços se registram e se descobrem pelo nome |
| **Zuul** (Netflix) | **API Gateway** e roteamento — hoje em **modo de manutenção**, substituído pelo **Spring Cloud Gateway** |
| **Spring Cloud Config** | configuração centralizada (por exemplo, num repositório Git) |
| **OpenFeign** | cliente HTTP **declarativo** (interface anotada) |
| **Spring Cloud LoadBalancer** | balanceamento no lado do cliente (substituiu o Ribbon) |
| **Resilience4j** | circuit breaker, retry, rate limiter (substituiu o Hystrix) |
| Spring Cloud Stream | integração com brokers (RabbitMQ, Kafka) |

## 8. MapStruct
Gerador de **mapeadores** entre objetos (ex.: **Entity ↔ DTO**) em **tempo de compilação** (annotation processor): você declara uma interface com @Mapper e ele gera o código. Vantagens: **sem reflexão** (rápido), **tipagem segura**, erros detectados na compilação.
\`\`\`
@Mapper(componentModel = "spring")
public interface ProcessoMapper {
    ProcessoDTO toDto(Processo entidade);
}
\`\`\`
Por que usar DTOs? Para não expor a entidade JPA na API (evita vazamento de dados, problemas de lazy loading e acoplamento entre banco e contrato).
`);

A('pdpj-jpa', `
## 1. O problema: objetos × tabelas
Java trabalha com **objetos**; bancos relacionais, com **tabelas**. Converter um no outro à mão (JDBC puro, com SQL e ResultSet) é trabalhoso e repetitivo. Um **ORM (Object-Relational Mapping)** faz essa ponte automaticamente.
- **JPA (Jakarta Persistence)**: a **especificação** (as regras e anotações).
- **Hibernate**: a **implementação** mais usada (também há EclipseLink). Spring Data JPA usa o Hibernate por baixo.

## 2. Mapeando uma entidade
\`\`\`
@Entity
@Table(name = "processo")
public class Processo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 25)
    private String numero;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vara_id")      // chave estrangeira
    private Vara vara;

    @OneToMany(mappedBy = "processo", cascade = CascadeType.ALL)
    private List<Movimentacao> movimentacoes;
}
\`\`\`
Estratégias de @GeneratedValue: **IDENTITY** (autoincremento do banco), **SEQUENCE** (sequência — padrão no PostgreSQL), **TABLE**, **AUTO**.

## 3. Relacionamentos — entenda o “dono”
| Anotação | Exemplo | Observação |
|---|---|---|
| **@OneToOne** | Servidor — Crachá | |
| **@ManyToOne** | muitos Processos → uma Vara | lado que tem a **FK**; é o **dono** |
| **@OneToMany** | uma Vara → muitos Processos | lado inverso, usa **mappedBy** |
| **@ManyToMany** | Processo — Assuntos | usa **tabela de junção** (@JoinTable) |
- O lado **dono** é o que tem a chave estrangeira (@JoinColumn); o outro usa \`mappedBy\`.
- **Fetch**: **LAZY** (carrega só quando acessar) × **EAGER** (carrega junto). Padrões: \`*ToOne\` = **EAGER**; \`*ToMany\` = **LAZY**. Boa prática: deixar quase tudo LAZY.
- **Cascade**: propaga operações (PERSIST, MERGE, REMOVE, ALL) do pai para os filhos. **orphanRemoval**: apaga filhos removidos da coleção.

## 4. Ciclo de vida da entidade e o EntityManager
| Estado | Significado |
|---|---|
| **New / transient** | criada com new, não associada ao banco |
| **Managed / persistent** | gerenciada pelo contexto de persistência: **mudanças são sincronizadas automaticamente** no commit (dirty checking) |
| **Detached** | já foi gerenciada, mas o contexto fechou |
| **Removed** | marcada para remoção |
Métodos do **EntityManager**: \`persist\`, \`merge\`, \`remove\`, \`find\`, \`createQuery\`, \`flush\`. O **contexto de persistência** funciona como **cache de primeiro nível**.

## 5. Consultas
- **JPQL**: parecida com SQL, mas sobre **entidades e atributos**: \`SELECT p FROM Processo p WHERE p.vara.nome = :nome\`.
- **Criteria API**: consultas montadas por código (tipadas).
- **SQL nativo**: quando necessário.

### O problema N+1 (cai muito!)
Buscar 100 processos (1 consulta) e, para cada um, acessar \`processo.getVara()\` LAZY → 100 consultas extras = **N+1**. Soluções: **JOIN FETCH** na JPQL, **@EntityGraph**, **@BatchSize** / batch fetching, ou consultar direto um **DTO/projeção**.

## 6. Transações
**@Transactional** (Spring) delimita a transação. Propriedades **ACID**: **Atomicidade** (tudo ou nada), **Consistência**, **Isolamento**, **Durabilidade**. Níveis de isolamento (do mais fraco ao mais forte): READ UNCOMMITTED, **READ COMMITTED** (padrão do PostgreSQL), REPEATABLE READ, SERIALIZABLE — evitando, respectivamente, leitura suja, leitura não repetível e leitura fantasma.

## 7. Hibernate Envers — auditoria
Com **@Audited** na entidade, o Envers grava automaticamente **cada versão** dos registros em tabelas de auditoria (\`*_AUD\`) e uma tabela de **revisões** (REVINFO, com número e data da revisão). Permite saber **quem mudou o quê e quando** e consultar o estado de um registro em uma revisão passada — essencial no Judiciário (rastreabilidade, MoReq-Jus).

## 8. Flyway — versionamento do banco
Controla a **evolução do esquema** como se fosse código:
- Scripts versionados: \`V1__cria_tabela_processo.sql\`, \`V2__adiciona_coluna.sql\` (**V + versão + dois sublinhados + descrição**).
- Tabela de controle **flyway_schema_history** guarda o que já foi aplicado (com checksum).
- Ao subir a aplicação, aplica **só as migrações pendentes**, em ordem. Migrações **repetíveis** começam com **R__**. Nunca altere uma migração já aplicada: crie outra.
- Alternativa: **Liquibase**.

## 9. PostgreSQL e H2
- **PostgreSQL**: SGBD relacional **open source**, robusto, compatível com **ACID**, com **MVCC** (controle de concorrência por múltiplas versões: leituras não bloqueiam escritas), tipos avançados (**JSONB**, arrays), índices (**B-tree** padrão, Hash, **GIN** para JSONB/texto, GiST, BRIN), **sequences**, extensões, replicação. É o banco preferido na PDPJ.
- **H2**: banco **em memória** escrito em Java — leve e rápido, usado em **testes** e desenvolvimento (modo de compatibilidade com PostgreSQL). Não é para produção.
`);

A('pdpj-servers', `
## 1. Servidor de aplicação × contêiner web
- **Contêiner de servlets / servidor web Java** (**Apache Tomcat**, Jetty, Undertow): executa **Servlets/JSP** e aplicações web; **não** implementa toda a plataforma Jakarta EE (não tem EJB, por exemplo).
- **Servidor de aplicação completo** (**WildFly**, **JBoss EAP**, Payara, Open Liberty): implementa o **perfil completo** do **Jakarta EE** — EJB, JMS, JTA (transações distribuídas), JPA, CDI, JAX-RS, segurança, pools de conexão.

## 2. JBoss e WildFly
- **WildFly** é a versão **comunitária** (gratuita, evolui rápido). **JBoss EAP** (Enterprise Application Platform) é a versão **comercial** da **Red Hat**, com suporte, baseada no WildFly.
- O **PJe** historicamente roda em JBoss/WildFly.
### Conceitos de administração
- **Modo standalone**: cada instância gerenciada isoladamente (configuração em \`standalone.xml\`, variações como \`standalone-full.xml\` e \`standalone-ha.xml\` para cluster).
- **Modo domain**: várias instâncias gerenciadas centralmente por um **Domain Controller** (\`domain.xml\`, \`host.xml\`).
- **Subsistemas**: configuração modular (datasources, logging, messaging, undertow).
- **Undertow**: o servidor web embutido do WildFly.
- **Deploy**: copiar o artefato para a pasta \`deployments\`, ou via **CLI** (\`jboss-cli.sh\`) ou **console web** de gerenciamento.
- Artefatos: **JAR** (biblioteca/aplicação), **WAR** (aplicação web), **EAR** (aplicação corporativa com vários módulos).
- **Datasource**: pool de conexões com o banco configurado no servidor e acessado via **JNDI**.

## 3. Elastic Stack (ELK) — observabilidade de logs
Com dezenas de microsserviços, procurar erros em arquivos de log de cada servidor é impossível. A **Elastic Stack** **centraliza, indexa e visualiza** os logs.
| Componente | Papel |
|---|---|
| **Elasticsearch** | motor de **busca e análise** distribuído (baseado no Apache Lucene); armazena os dados como **documentos JSON** em **índices**, divididos em **shards** (com réplicas); busca textual muito rápida (**índice invertido**) |
| **Logstash** | **pipeline de ingestão**: **input → filter → output**; coleta, transforma (ex.: filtro **grok** para extrair campos de um log textual) e envia ao Elasticsearch |
| **Kibana** | **interface de visualização**: buscas, dashboards, gráficos, alertas |
| **Beats** | agentes leves de coleta instalados nos servidores (**Filebeat** para arquivos de log, **Metricbeat** para métricas) |
Com os Beats, a sigla às vezes vira **“Elastic Stack”** ou **ELK + B**. Fluxo típico: **Filebeat → (Logstash) → Elasticsearch → Kibana**.

## 4. Os três pilares da observabilidade
1. **Logs**: registros de eventos (ELK).
2. **Métricas**: números ao longo do tempo — CPU, latência, requisições por segundo (Prometheus + Grafana).
3. **Traces** (rastreamento distribuído): acompanhar uma requisição atravessando vários microsserviços (OpenTelemetry, Jaeger), usando um **trace id** propagado entre os serviços.
> [!dica] Boa prática: logs **estruturados** (JSON), com **id de correlação**, sem dados sensíveis (senhas, dados pessoais desnecessários — LGPD).
`);

/* ============================ ENGENHARIA DE SOFTWARE ============================ */
A('eng-processo', `
## 1. O que é processo de software
É o conjunto organizado de atividades para produzir software: **especificação** (o que construir), **projeto e implementação** (como), **validação** (está certo?) e **evolução** (manutenção). Um **modelo de ciclo de vida** define **em que ordem** essas atividades acontecem.

## 2. Modelos de ciclo de vida
| Modelo | Como funciona | Quando usar | Ponto fraco |
|---|---|---|---|
| **Cascata (waterfall)** | fases **sequenciais**: requisitos → projeto → implementação → testes → implantação; cada uma termina antes da próxima | requisitos **estáveis** e bem conhecidos | o cliente só vê o produto no fim; mudanças são caras |
| **Modelo em V** | cascata em que cada fase de desenvolvimento tem uma fase de **teste correspondente** (requisitos ↔ aceitação; projeto ↔ integração; código ↔ unidade) | sistemas críticos | rigidez |
| **Incremental** | entrega o sistema em **partes funcionais** (incrementos), cada uma somando funcionalidades | valor cedo ao usuário | arquitetura precisa prever o crescimento |
| **Iterativo** | repete ciclos refinando o produto | requisitos que evoluem | |
| **Prototipação** | constrói **protótipos** para **descobrir e validar requisitos** | requisitos pouco claros | o protótipo virar produto final “às pressas” |
| **Espiral (Boehm)** | ciclos com **análise de riscos** explícita em cada volta (planejar → analisar riscos → engenharia → avaliar) | projetos grandes e **arriscados** | complexo |
| **RUP (Processo Unificado)** | iterativo e incremental, guiado por casos de uso, centrado na arquitetura; **fases**: **Concepção, Elaboração, Construção, Transição** | | pesado |
| **Ágeis** | ciclos curtos, entregas frequentes, colaboração (Scrum, XP, Kanban) | ambientes de mudança | |
> [!fcc] Associação clássica: **espiral ↔ riscos**; **prototipação ↔ requisitos incertos**; **cascata ↔ requisitos estáveis**; **RUP ↔ 4 fases**.

## 3. Engenharia de requisitos
**Requisito** é uma condição ou capacidade que o sistema deve ter.
| Tipo | Descreve | Exemplo |
|---|---|---|
| **Funcional** | **o que** o sistema faz | “O sistema deve permitir protocolar petições.” |
| **Não funcional** | **qualidades e restrições** | “Responder em até 2 s”, “disponibilidade de 99,9%”, “cumprir a LGPD”, “ser acessível (WCAG)” |
| **Regra de negócio** | política do domínio | “Prazo recursal de 8 dias úteis.” |
| Requisito de domínio | características da área | |

### Atividades
1. **Elicitação (levantamento)**: entrevistas, questionários, **workshops/JAD**, observação (etnografia), **brainstorming**, análise de documentos, **prototipação**, **histórias de usuário**.
2. **Análise e negociação**: resolver conflitos, priorizar (**MoSCoW**: Must, Should, Could, Won’t).
3. **Especificação/documentação**: documento de requisitos, casos de uso, histórias.
4. **Validação**: revisões, inspeções, protótipos, testes de aceitação — “estamos construindo **o produto certo**?”
5. **Gerenciamento**: rastreabilidade (matriz de rastreabilidade), controle de mudanças.
> [!dica] **Verificação** = “construímos **o produto corretamente**?” (conforme a especificação). **Validação** = “construímos **o produto certo**?” (atende ao usuário).

### Histórias de usuário
Formato: “**Como** [papel], **quero** [ação], **para** [benefício].” Critérios de qualidade **INVEST**: Independente, Negociável, Valiosa, Estimável, Pequena (Small), Testável. Acompanhadas de **critérios de aceitação** (muitas vezes em Gherkin: *Dado / Quando / Então*).

## 4. Low-code e no-code
Plataformas que permitem criar aplicações com **componentes visuais** e pouca (low-code) ou nenhuma (no-code) programação. Vantagens: velocidade, participação de áreas de negócio (**desenvolvedores cidadãos**). Riscos: **dependência do fornecedor (lock-in)**, limites de personalização, governança e segurança (“TI invisível”), escalabilidade.

## 5. IA no desenvolvimento de software
- **Assistentes de código** baseados em **LLMs** (modelos de linguagem de grande porte) geram, explicam e revisam código, escrevem testes e documentação.
- **Riscos**: código incorreto ou inseguro (“alucinações”), dependências inexistentes, vazamento de dados sensíveis em prompts, questões de licença, viés.
- **Boas práticas**: **revisão humana** obrigatória, testes automatizados, análise de segurança (SAST/SCA) também sobre o código gerado, não enviar dados sigilosos a serviços externos. No Judiciário, o uso de IA é regulado pelo CNJ (**Resolução CNJ nº 615/2025**), com supervisão humana, transparência e gestão de riscos.
`);

A('eng-agil', `
## 1. O Manifesto Ágil (2001)
Valorizamos:
- **Indivíduos e interações** mais que processos e ferramentas;
- **Software em funcionamento** mais que documentação abrangente;
- **Colaboração com o cliente** mais que negociação de contratos;
- **Responder a mudanças** mais que seguir um plano.
“Mais que” **não** significa “em vez de”: os itens da direita têm valor, mas os da esquerda valem **mais**. São **12 princípios**, como entregar software funcionando com frequência, acolher mudanças, ter ritmo sustentável e fazer reflexões regulares para melhorar.

## 2. Scrum (Guia 2020) — a estrutura completa
O Scrum é um **framework leve** baseado no **empirismo** (**transparência, inspeção e adaptação**) e no pensamento **lean**. Valores: **compromisso, foco, abertura, respeito e coragem**.

### Responsabilidades (o Guia 2020 não fala mais em “papéis”; existe um **Scrum Team** sem hierarquias nem subtimes, em geral com **10 pessoas ou menos**)
| Responsabilidade | O que faz |
|---|---|
| **Product Owner** | **maximiza o valor** do produto; **gerencia o Product Backlog** (meta do produto, criação, **ordenação** e transparência dos itens). É **uma pessoa**, não um comitê |
| **Scrum Master** | responsável pela **eficácia** do time; ensina o Scrum, **remove impedimentos**, facilita eventos; é um **líder que serve** |
| **Developers** | criam o Incremento a cada Sprint; elaboram o **Sprint Backlog**, garantem a qualidade (Definição de Pronto) e se adaptam diariamente |

### Eventos
| Evento | Duração máxima (Sprint de 1 mês) | Objetivo |
|---|---|---|
| **Sprint** | **até 1 mês** (duração fixa) | contêiner de todos os eventos; uma nova começa logo após a anterior |
| **Sprint Planning** | 8 h | responde **por quê** (Meta da Sprint), **o quê** (itens selecionados) e **como** (plano) |
| **Daily Scrum** | **15 min** | evento **dos Developers** para inspecionar o progresso rumo à Meta da Sprint e adaptar o plano |
| **Sprint Review** | 4 h | inspecionar o **resultado** com os stakeholders e adaptar o Product Backlog (não é só uma “demo”) |
| **Sprint Retrospective** | 3 h | melhorar **qualidade e eficácia** (pessoas, processos, ferramentas); encerra a Sprint |
Para Sprints mais curtas, os eventos costumam ser mais curtos.

### Artefatos e seus compromissos
| Artefato | Compromisso |
|---|---|
| **Product Backlog** (lista ordenada e emergente do que é necessário) | **Meta do Produto** |
| **Sprint Backlog** (Meta da Sprint + itens + plano) | **Meta da Sprint** |
| **Incremento** (passo concreto rumo à Meta do Produto; vários podem ser criados numa Sprint) | **Definição de Pronto** |
- **Refinamento** do Product Backlog é uma **atividade contínua**, não um evento.
- Uma Sprint só pode ser **cancelada pelo Product Owner**, se a Meta da Sprint se tornar obsoleta.

## 3. XP (Extreme Programming)
Foco em **práticas de engenharia**. Valores: **comunicação, simplicidade, feedback, coragem e respeito**. Práticas: **programação em par**, **TDD** (teste antes do código), **integração contínua**, **refatoração**, **design simples**, **propriedade coletiva do código**, **padrões de codificação**, **releases pequenos**, **cliente presente**, **ritmo sustentável** (semana de 40 h), **jogo do planejamento**, **metáfora**.

## 4. Kanban
Método de **gestão de fluxo** de trabalho (de origem no Sistema Toyota de Produção):
- **Visualizar** o trabalho no quadro (colunas: A fazer → Em andamento → Feito);
- **Limitar o WIP** (trabalho em progresso) por coluna → “**pare de começar, comece a terminar**”, expõe **gargalos**;
- **Gerenciar o fluxo**, tornar as políticas **explícitas**, implementar ciclos de **feedback**, **melhorar colaborativamente**.
- Sistema **puxado** (pull): só se puxa um item quando há capacidade.
- **Sem iterações fixas** nem papéis obrigatórios. Métricas: **lead time** (do pedido à entrega), **cycle time** (do início do trabalho à entrega), **throughput** (vazão), diagrama de fluxo cumulativo (CFD).

## 5. Outros termos ágeis
- **Burndown chart**: trabalho restante × tempo. **Velocidade**: quanto o time entrega por Sprint.
- **Planning poker** com **story points** (estimativa relativa, sequência de Fibonacci).
- **MVP** (produto mínimo viável), **Lean** (eliminar desperdícios), **Scrumban**, **SAFe** e **LeSS** (escala).

## 6. Tradicional × ágil
| | Tradicional (preditivo) | Ágil (adaptativo) |
|---|---|---|
| Planejamento | detalhado no início | contínuo |
| Escopo | fixo; prazo e custo variam | prazo e custo fixos por iteração; escopo varia |
| Entrega | no fim | incremental e frequente |
| Documentação | extensa | suficiente |
| Referências | PMBOK (versões anteriores), cascata, RUP | Scrum, XP, Kanban |
`);

A('eng-qualidade', `
## 1. Qualidade de produto × qualidade de processo
- **Produto**: o software tem as características desejadas? (ISO/IEC **25010**)
- **Processo**: a organização trabalha de forma madura e repetível? (**CMMI**, **MPS.BR**, ISO/IEC/IEEE **12207**)
A premissa dos modelos de processo: **processos melhores tendem a gerar produtos melhores**.

## 2. ISO/IEC 25010 — características de qualidade do produto
Na versão clássica (2011) são **8 características**: **adequação funcional**, **eficiência de desempenho**, **compatibilidade**, **usabilidade**, **confiabilidade**, **segurança**, **manutenibilidade** e **portabilidade**. (A revisão de 2023 reorganizou o modelo, renomeando usabilidade para **capacidade de interação**, portabilidade para **flexibilidade** e acrescentando **proteção/safety**.)
- **Manutenibilidade**: modularidade, reusabilidade, analisabilidade, modificabilidade, **testabilidade**.
- **Confiabilidade**: maturidade, disponibilidade, tolerância a falhas, recuperabilidade.
- **Segurança**: confidencialidade, integridade, não repúdio, responsabilização, autenticidade.

## 3. CMMI (Capability Maturity Model Integration) — versão 3.0 (2023)
Modelo do **ISACA** (antes CMMI Institute) que descreve **práticas** para melhorar o desempenho. A versão 3.0 abrange desenvolvimento, serviços, fornecedores, pessoas, dados, **segurança**, **segurança (safety)** e **virtual**.

### Níveis de maturidade (representação por estágios)
| Nível | Nome | Característica |
|---|---|---|
| 0 | **Incompleto** | abordagem incompleta |
| 1 | **Inicial** | processos imprevisíveis, reativos; sucesso depende de heróis |
| 2 | **Gerenciado** | gestão de **projetos**: planejamento, monitoramento, requisitos, configuração |
| 3 | **Definido** | processos **padronizados** na organização |
| 4 | **Quantitativamente gerenciado** | controle **estatístico/quantitativo** |
| 5 | **Em otimização** | **melhoria contínua** baseada em dados |
- Há também **níveis de capacidade** (0 a 3), aplicados a **áreas de prática** individualmente (representação contínua).
- Na versão 2.0/3.0, o modelo é organizado em **áreas de prática** (antes “áreas de processo”), agrupadas em **capacidades** e **categorias**; a avaliação oficial é o **benchmark appraisal**.

## 4. MR-MPS-SW (Melhoria de Processo do Software Brasileiro) — Softex
Modelo **brasileiro**, compatível com o CMMI, pensado para ser **acessível a pequenas e médias empresas** (avaliação mais barata, níveis mais granulares). Guias: **MR-MPS-SW** (software), MR-MPS-SV (serviços), MR-MPS-RH (pessoas).
### Níveis (do **G**, menos maduro, ao **A**, mais maduro)
| Nível | Nome |
|---|---|
| **G** | Parcialmente gerenciado |
| **F** | Gerenciado |
| **E** | Parcialmente definido |
| **D** | Largamente definido |
| **C** | Definido |
| **B** | Gerenciado quantitativamente |
| **A** | Em otimização |
São **7 níveis** (contra 5 do CMMI), o que permite uma evolução **mais gradual**. A versão de 2024 (guia atualizado) mantém essa escala e organiza os processos com resultados esperados.
> [!fcc] Pegadinha: no MPS a escala é **alfabética invertida** — **G** é o início e **A** o topo.

## 5. ISO/IEC/IEEE 12207:2017 (adotada no Brasil como NBR em 2021) — processos de ciclo de vida
Estabelece uma **estrutura comum de processos** para o ciclo de vida do software (aquisição, fornecimento, desenvolvimento, operação, manutenção, descarte). Na versão 2017 os processos se dividem em **4 grupos**:
1. **Processos de acordo** (aquisição e fornecimento);
2. **Processos organizacionais habilitadores do projeto** (gestão de modelo de ciclo de vida, infraestrutura, portfólio, recursos humanos, qualidade, conhecimento);
3. **Processos de gestão técnica** (planejamento, avaliação e controle, decisão, riscos, configuração, informação, medição, garantia da qualidade);
4. **Processos técnicos** (análise de negócio, requisitos, arquitetura, projeto, implementação, integração, verificação, transição, validação, operação, manutenção, descarte).
A norma é **harmonizada** com a ISO/IEC/IEEE **15288** (processos de ciclo de vida de **sistemas**). Ela **não** impõe um modelo de ciclo de vida específico: a organização **adapta** (tailoring) os processos.

## 6. Garantia × controle da qualidade
- **Garantia da qualidade (QA)**: foca no **processo** — prevenir defeitos (auditorias de processo, padrões).
- **Controle da qualidade (QC)**: foca no **produto** — detectar defeitos (testes, inspeções).
`);

A('eng-testes', `
## 1. Por que testar
Testar é executar o software com a intenção de **encontrar defeitos** e ganhar **confiança** de que ele atende aos requisitos. Testes **mostram a presença** de defeitos, **nunca provam sua ausência** (um dos 7 princípios do ISTQB).

### Vocabulário (ISTQB)
**Engano/erro** (ação humana) → gera um **defeito** (bug, no código) → que, executado, pode causar uma **falha** (comportamento errado observado).

### Os 7 princípios do teste (ISTQB)
1. O teste mostra a presença de defeitos, não a ausência. 2. **Teste exaustivo é impossível**. 3. **Testar cedo** economiza tempo e dinheiro (shift left). 4. Defeitos se **agrupam** (poucos módulos concentram a maioria). 5. **Paradoxo do pesticida**: repetir os mesmos testes deixa de achar defeitos novos. 6. O teste **depende do contexto**. 7. **Falácia da ausência de erros**: sem defeitos não significa útil.

## 2. Níveis de teste
| Nível | O que testa |
|---|---|
| **Unidade (componente)** | a menor parte isolada (um método, uma classe) |
| **Integração** | a comunicação entre componentes/serviços |
| **Sistema** | o sistema completo contra os requisitos |
| **Aceitação** | se atende ao **usuário/negócio** (UAT, alfa — no ambiente do desenvolvedor, beta — no ambiente do cliente) |

## 3. Técnicas
### Caixa-preta (funcional) — baseadas na **especificação**
- **Particionamento em classes de equivalência**: divide as entradas em grupos que devem ser tratados igual; testa **um representante** de cada classe (válida e inválida).
- **Análise de valor-limite**: os defeitos se concentram nas **fronteiras**. Campo de 18 a 65 → testar **17, 18, 65 e 66** (abordagem de 2 valores) ou 17, 18, 19, 64, 65, 66 (3 valores).
- **Tabela de decisão**: combinações de condições e ações.
- **Transição de estados**; **casos de uso**.

### Caixa-branca (estrutural) — baseadas no **código**
- **Cobertura de comandos (statements)**: todas as linhas executadas.
- **Cobertura de decisões (branches/desvios)**: cada if com resultado verdadeiro e falso. 100% de decisão garante 100% de comandos (o contrário não).
- Cobertura de condições, de caminhos; **complexidade ciclomática** (número de caminhos independentes = decisões + 1).

### Baseadas na experiência
**Teste exploratório**, suposição de erro (error guessing).

## 4. Tipos de teste
**Funcional**, **não funcional** (desempenho, **carga**, **estresse**, usabilidade, segurança), **regressão** (garantir que mudanças não quebraram o que funcionava — ótimo candidato à automação), **fumaça (smoke)**, **confirmação/reteste**.

## 5. Pirâmide de testes
Muitos testes de **unidade** (rápidos e baratos) na base, menos de **integração/serviço** no meio e poucos **E2E/UI** (lentos, caros e frágeis) no topo. O antipadrão é o “cone de sorvete” (muitos testes manuais e de UI).

## 6. TDD e BDD
- **TDD (Test-Driven Development)**: ciclo **Red → Green → Refactor**: escreva um teste que **falha**, escreva o **mínimo** de código para passar, **refatore**.
- **BDD (Behavior-Driven Development)**: comportamento descrito em linguagem de negócio (**Gherkin**: *Given/Dado, When/Quando, Then/Então*), ferramentas como Cucumber.

## 7. JUnit (versões 5 e 6) — o framework de testes do Java
O **JUnit 5** é formado por **JUnit Platform** (base para executar testes), **JUnit Jupiter** (o novo modelo de programação e extensões) e **JUnit Vintage** (roda testes JUnit 3/4). O **JUnit 6** (2025) mantém o modelo Jupiter, passa a exigir **Java 17+** e unifica a numeração de versões dos módulos.
| Anotação | Função |
|---|---|
| **@Test** | marca um método de teste |
| **@BeforeEach / @AfterEach** | antes/depois de **cada** teste (no JUnit 4: @Before/@After) |
| **@BeforeAll / @AfterAll** | uma vez antes/depois de **todos** (métodos static; no JUnit 4: @BeforeClass/@AfterClass) |
| **@DisplayName** | nome legível |
| **@Disabled** | desativa (JUnit 4: @Ignore) |
| **@ParameterizedTest** + **@ValueSource / @CsvSource / @MethodSource** | mesmo teste com vários dados |
| **@Nested** | agrupa testes em classes internas |
| **@Tag** | categoriza |
| **@ExtendWith** | registra extensões (ex.: MockitoExtension; no JUnit 4 era @RunWith) |
Asserções: \`assertEquals\`, \`assertTrue\`, \`assertNotNull\`, **\`assertThrows\`** (verifica exceção), \`assertAll\` (agrupa), \`assertTimeout\`.
\`\`\`
@Test
void deveRejeitarNumeroInvalido() {
    assertThrows(IllegalArgumentException.class, () -> new Processo("123"));
}
\`\`\`

## 8. Mockito — dublês de teste
Para testar uma classe **isoladamente**, substituímos suas dependências por **dublês**.
| Dublê | O que é |
|---|---|
| **Dummy** | só preenche parâmetro |
| **Stub** | devolve respostas prontas |
| **Spy** | objeto real parcialmente observado/alterado |
| **Mock** | dublê programado com expectativas e que permite **verificar interações** |
| **Fake** | implementação simplificada que funciona (ex.: banco em memória) |
\`\`\`
@ExtendWith(MockitoExtension.class)
class ProcessoServiceTest {
    @Mock ProcessoRepository repo;          // dependência falsa
    @InjectMocks ProcessoService service;   // classe testada, recebe os mocks

    @Test
    void buscaProcesso() {
        when(repo.findById(1L)).thenReturn(Optional.of(new Processo()));  // stubbing
        service.buscar(1L);
        verify(repo, times(1)).findById(1L);  // verificação de interação
    }
}
\`\`\`
Outros recursos: \`any()\`, \`eq()\` (matchers), \`doThrow\`, \`@Spy\`, \`@Captor\` / ArgumentCaptor, \`verifyNoMoreInteractions\`.
`);

A('eng-uml', `
## 1. O que é a UML
A **Unified Modeling Language** (versão atual **2.5.1**, mantida pela **OMG**) é uma **linguagem visual** para especificar, visualizar e documentar sistemas. **Não é** uma metodologia nem um processo: é uma notação. Tem **14 diagramas**, divididos em dois grandes grupos.

## 2. Os 14 diagramas
| Estruturais (estáticos — 7) | Comportamentais (dinâmicos — 7) |
|---|---|
| **Classes** | **Casos de uso** |
| **Objetos** | **Atividades** |
| **Componentes** | **Máquina de estados** |
| **Implantação** | **Sequência** (interação) |
| **Pacotes** | **Comunicação** (interação) |
| Estrutura composta | Visão geral de interação (interação) |
| Perfil | Tempo/temporização (interação) |
Os **4 diagramas de interação** são um subgrupo dos comportamentais: **sequência, comunicação, visão geral de interação e tempo**.

## 3. Diagrama de classes (o mais cobrado)
Cada classe é um retângulo com **nome**, **atributos** e **operações**. Visibilidade: **+ público**, **- privado**, **# protegido**, **~ pacote**. Atributos/operações **sublinhados** são estáticos; nomes em *itálico* indicam classe/operação **abstrata**.
### Relacionamentos
| Relacionamento | Notação | Significado |
|---|---|---|
| **Associação** | linha simples (com multiplicidades: 1, 0..1, *, 1..*) | uma classe conhece/usa a outra |
| **Agregação** | linha com **losango vazio** no lado do todo | todo-parte fraco: a parte **sobrevive** sem o todo |
| **Composição** | linha com **losango cheio** no lado do todo | todo-parte forte: a parte **morre** com o todo |
| **Generalização (herança)** | linha com **triângulo vazado** apontando para a superclasse | “é um” |
| **Realização** | linha **tracejada** com triângulo vazado | classe implementa interface |
| **Dependência** | linha **tracejada** com seta aberta | uso temporário |

## 4. Diagrama de casos de uso
Mostra **o que** o sistema faz do ponto de vista dos **atores** (pessoas ou sistemas externos).
- **«include»**: comportamento **obrigatório**, sempre executado (seta do caso base **para** o incluído). Ex.: “Emitir certidão” inclui “Autenticar usuário”.
- **«extend»**: comportamento **opcional/condicional**, em **pontos de extensão** (seta do caso de extensão **para** o base). Ex.: “Aplicar multa” estende “Pagar boleto” se houver atraso.
- **Generalização** entre atores ou entre casos de uso.

## 5. Diagrama de sequência
Mostra a **troca de mensagens** entre objetos **ao longo do tempo** (eixo vertical). Elementos: **linhas de vida**, **barras de ativação**, mensagens **síncronas** (seta cheia), **assíncronas** (seta aberta), **retorno** (tracejada), **fragmentos combinados**: **alt** (alternativa — if/else), **opt** (opcional), **loop**, **par** (paralelo), **ref**.

## 6. Atividades e máquina de estados
- **Atividades**: fluxo de trabalho (como um fluxograma avançado): nó inicial, ações, **decisão/merge** (losango), **fork/join** (barras — paralelismo), **raias (swimlanes)** que indicam responsáveis.
- **Máquina de estados**: estados de **um objeto** e as **transições** disparadas por eventos (ex.: Processo: Distribuído → Concluso → Julgado → Arquivado), com guardas [condição] e ações.

## 7. Implantação e componentes
- **Implantação**: **nós** físicos (servidores, contêineres) e os **artefatos** implantados neles.
- **Componentes**: partes modulares do sistema e suas **interfaces** fornecidas (pirulito) e requeridas (soquete).

## 8. BPMN (Business Process Model and Notation) — versão 2.0
Notação para modelar **processos de negócio** (também da OMG), entendida por negócio e TI.
| Categoria | Elementos |
|---|---|
| **Objetos de fluxo** | **Eventos** (círculos: **início** — borda fina; **intermediário** — borda dupla; **fim** — borda grossa), **Atividades** (retângulos arredondados: **tarefa** ou **subprocesso**), **Gateways** (losangos) |
| **Objetos de conexão** | **fluxo de sequência** (linha cheia — dentro de um pool), **fluxo de mensagem** (linha tracejada — **entre pools** diferentes), **associação** (pontilhada) |
| **Raias (swimlanes)** | **Pool** (participante/organização) e **Lane** (papel/departamento dentro do pool) |
| **Artefatos** | objeto de dados, grupo, anotação de texto |
### Gateways (sempre cai)
| Gateway | Símbolo | Comportamento |
|---|---|---|
| **Exclusivo (XOR)** | losango vazio ou com **X** | **só um** caminho é seguido |
| **Paralelo (AND)** | losango com **+** | **todos** os caminhos (divisão) / espera **todos** (junção) |
| **Inclusivo (OR)** | losango com **O** (círculo) | **um ou mais** caminhos |
| **Baseado em eventos** | losango com pentágono | segue o caminho do **primeiro evento** que ocorrer |
| Complexo | asterisco | regras complexas |
Tipos de tarefa: de usuário, de serviço, manual, de script, de envio/recebimento, regra de negócio.
`);

A('eng-arq', `
## 1. O que é arquitetura de software
É a **estrutura fundamental** do sistema: seus **componentes**, como se **relacionam** e os **princípios** que guiam sua evolução. Decisões arquiteturais são as **difíceis de mudar** depois (linguagem, banco, divisão em serviços) e são guiadas por **atributos de qualidade**: desempenho, escalabilidade, disponibilidade, segurança, manutenibilidade.

## 2. Estilos e padrões arquiteturais
| Estilo | Ideia | Exemplo |
|---|---|---|
| **Camadas (layers)** | cada camada só usa a de baixo: **apresentação → negócio → persistência** | aplicações Spring tradicionais |
| **Cliente-servidor** | clientes pedem, servidor atende | web |
| **MVC** | separa **Model** (dados e regras), **View** (apresentação) e **Controller** (recebe a entrada e coordena) | Spring MVC, JSF |
| **MVP / MVVM** | variações para interfaces (MVVM com data binding — Angular, Vue) | |
| **Microsserviços** | serviços pequenos e independentes | PDPJ-Br |
| **Orientada a serviços (SOA)** | serviços corporativos reutilizáveis, muitas vezes com **ESB** | |
| **Orientada a eventos (EDA)** | componentes reagem a eventos publicados | RabbitMQ, Kafka |
| **Hexagonal (portas e adaptadores)** | o **domínio** fica no centro, isolado; a infraestrutura conecta-se por **portas** (interfaces) e **adaptadores** | facilita testes e troca de tecnologia |
| **Clean Architecture** | dependências apontam **para dentro** (entidades → casos de uso → adaptadores → frameworks) | |
| **Pipes and filters** | dados passam por uma série de filtros | Logstash |
| **Serverless** | funções acionadas por eventos, sem gerenciar servidores | |
| **Monólito modular** | um só deploy, mas módulos bem separados | |

## 3. Padrões de projeto GoF (Gang of Four, 1994) — 23 padrões em 3 grupos
### Criacionais (como criar objetos)
| Padrão | Intenção |
|---|---|
| **Singleton** | garantir **uma única instância** com acesso global |
| **Factory Method** | subclasses decidem **qual classe instanciar** |
| **Abstract Factory** | criar **famílias** de objetos relacionados |
| **Builder** | construir objetos complexos **passo a passo** |
| **Prototype** | criar objetos **clonando** um protótipo |

### Estruturais (como compor objetos)
| Padrão | Intenção |
|---|---|
| **Adapter** | **converter a interface** de uma classe em outra esperada (“tomada adaptadora”) |
| **Facade** | oferecer uma **interface simplificada** para um subsistema complexo |
| **Decorator** | **acrescentar responsabilidades** dinamicamente, sem herança |
| **Proxy** | **substituto** que controla o acesso a outro objeto (lazy loading, segurança, remoto) |
| **Composite** | tratar objetos individuais e **composições (árvores)** de modo uniforme |
| **Bridge** | separar abstração de implementação |
| **Flyweight** | compartilhar objetos para economizar memória |

### Comportamentais (como objetos interagem)
| Padrão | Intenção |
|---|---|
| **Observer** | quando um objeto muda, **notifica** os dependentes (publish/subscribe) |
| **Strategy** | encapsular **algoritmos intercambiáveis** |
| **Template Method** | define o **esqueleto** de um algoritmo; subclasses preenchem passos |
| **Command** | encapsular uma **requisição como objeto** (desfazer, filas) |
| **Iterator** | percorrer coleções sem expor sua estrutura |
| **State** | o comportamento muda conforme o **estado** interno |
| **Chain of Responsibility** | passar a requisição por uma **cadeia** de tratadores (filtros do Spring Security) |
| **Mediator**, **Memento**, **Visitor**, **Interpreter** | |
> [!dica] Como memorizar: **criacionais** respondem “como nasce?”; **estruturais**, “como se encaixa?”; **comportamentais**, “como conversa?”.

## 4. Padrões corporativos e outros
- **DAO / Repository**: isolar o acesso a dados.
- **DTO**: objeto só para transportar dados entre camadas/rede.
- **Injeção de dependências / IoC**.
- **Service Layer**, **Unit of Work**, **Active Record**.

## 5. DDD (Domain-Driven Design) em resumo
Modelar o software a partir do **domínio de negócio**: **linguagem ubíqua** (mesmos termos para negócio e código), **contextos delimitados (bounded contexts)** — ótima referência para definir as fronteiras dos microsserviços —, **entidades**, **objetos de valor**, **agregados**, **repositórios**, **eventos de domínio**.

## 6. Antipadrões
**God object/classe Deus** (faz tudo), **código espaguete**, **lava flow** (código morto que ninguém ousa tirar), **golden hammer** (usar a mesma solução para tudo), **monólito distribuído** (microsserviços acoplados que precisam ser implantados juntos).
`);

/* ============================ DESENVOLVIMENTO WEB ============================ */
A('web-js', `
## 1. JavaScript: a linguagem da web
Criado em 1995 para dar interatividade às páginas, padronizado como **ECMAScript** (versões anuais: ES2015/ES6 foi a grande revolução). Características: **interpretado/compilado JIT**, **tipagem dinâmica e fraca**, **multiparadigma** (funcional, orientado a objetos baseado em **protótipos**), **single-thread** com **event loop**.

## 2. Variáveis: var, let e const
| | var | let | const |
|---|---|---|---|
| Escopo | **função** | **bloco** | **bloco** |
| Redeclarar no mesmo escopo | sim | não | não |
| Reatribuir | sim | sim | **não** (mas o conteúdo de objetos/arrays pode mudar) |
| Hoisting | içada e inicializada com **undefined** | içada, mas na **zona morta temporal** (erro se usada antes) | idem |
Boa prática moderna: **const por padrão**, let quando precisar reatribuir, **nunca var**.

## 3. Tipos e as famosas coerções
Primitivos: **string, number, boolean, undefined, null, symbol, bigint**. O resto é **object** (inclusive arrays e funções).
- \`typeof null\` → **"object"** (bug histórico!); \`typeof []\` → "object"; \`typeof function(){}\` → "function"; \`Array.isArray([])\` → true.
- **==** compara **com coerção** de tipos: \`0 == '0'\` → true; \`null == undefined\` → true; \`'' == 0\` → true.
- **===** compara **valor e tipo** (estrito): \`0 === '0'\` → false. **Use sempre ===**.
- Valores **falsy**: \`false, 0, -0, 0n, '', null, undefined, NaN\`. Todo o resto é truthy (inclusive \`'0'\`, \`[]\` e \`{}\`).
- \`NaN === NaN\` → false (use \`Number.isNaN\`).
- \`'5' + 3\` → "53" (concatena); \`'5' - 3\` → 2 (converte).

## 4. Funções e escopo
- Declaração (\`function f(){}\`, içada por completo), expressão, **arrow function** (\`(a, b) => a + b\` — **não tem this próprio**: herda do escopo em volta).
- **Closure**: a função “lembra” das variáveis do escopo onde foi criada, mesmo depois que ele terminou.
- **this** depende de **como** a função é chamada (método, new, call/apply/bind, arrow).

## 5. Assincronia e o event loop (cai muito!)
JavaScript executa uma coisa por vez. Operações demoradas (rede, timers) são delegadas, e seus **callbacks** entram em **filas**:
1. Executa todo o **código síncrono** (call stack).
2. Esvazia a fila de **microtarefas** (**Promises** — then/catch, await, queueMicrotask).
3. Executa **uma macrotarefa** (setTimeout, setInterval, eventos de I/O) e volta ao passo 2.
\`\`\`
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
// Saída: A, D, C, B
\`\`\`
- **Promise**: estados **pending → fulfilled** ou **rejected**. \`Promise.all\` (espera todas; falha se uma falhar), \`Promise.allSettled\`, \`Promise.race\`, \`Promise.any\`.
- **async/await**: açúcar sintático sobre Promises; \`await\` só dentro de função \`async\` (ou no topo de módulos); erros com try/catch.

## 6. Recursos modernos (ES6+)
Template literals (crases com \${variavel}), **desestruturação** (\`const { nome } = obj\`), **spread/rest** (\`...\`), parâmetros padrão, **módulos** (\`import/export\`), **classes** (açúcar sobre protótipos), Map/Set, **optional chaining** (\`obj?.a?.b\`), **nullish coalescing** (\`a ?? b\` — usa b só se a for null/undefined, diferente de \`||\`).
Métodos de array: \`map\` (transforma), \`filter\` (filtra), \`reduce\` (acumula), \`find\`, \`some\`, \`every\`, \`forEach\` (não retorna nada), \`includes\`.

## 7. DOM e eventos
O **DOM** é a árvore de objetos que representa a página. \`document.querySelector\`, \`getElementById\`, \`addEventListener('click', fn)\`. **Propagação**: captura → alvo → **borbulhamento (bubbling)**; \`event.preventDefault()\` impede a ação padrão; \`stopPropagation()\` interrompe a propagação. **Delegação de eventos**: um único listener no pai trata cliques dos filhos.
> [!fcc] Segurança: inserir texto do usuário com **innerHTML** abre brecha para **XSS**; use **textContent**.

## 8. TypeScript
**Superconjunto** do JavaScript (todo JS válido é TS válido) criado pela Microsoft que adiciona **tipagem estática** opcional. O código é **transpilado** para JS (o navegador não executa TS diretamente). Recursos: tipos (\`string\`, \`number\`, \`boolean\`, \`any\`, **\`unknown\`** — mais seguro que any —, \`never\`, \`void\`), **interfaces**, **type aliases**, **union** (\`string | number\`), **generics**, **enums**, modificadores de acesso, **inferência de tipos**, arquivo **tsconfig.json** (\`strict\`). Base do **Angular**.

## 9. Node.js
Ambiente de execução de JavaScript **no servidor**, baseado no motor **V8** (do Chrome), com **I/O não bloqueante** e orientado a eventos (biblioteca **libuv**) — ótimo para muitas conexões simultâneas (APIs, tempo real), ruim para processamento pesado de CPU na thread principal (use worker threads).
- **npm**: gerenciador de pacotes; **package.json** (dependências, scripts) e **package-lock.json** (versões exatas — garante builds reprodutíveis). \`npm install\`, \`npm ci\` (instalação limpa para CI), \`npm run\`.
- Módulos **CommonJS** (\`require\`) e **ES Modules** (\`import\`). Frameworks: **Express**, NestJS.
- Versionamento semântico (**SemVer**): **MAJOR.MINOR.PATCH** — \`^1.2.3\` aceita atualizações minor/patch; \`~1.2.3\`, só patch.

## 10. jQuery
Biblioteca (2006) que simplificou manipulação do DOM, eventos e AJAX com compatibilidade entre navegadores: \`$('#id')\`, \`$('.classe').hide()\`, \`$(document).ready(fn)\`, \`$.ajax()\`. Hoje é considerada **legada** (as APIs nativas — querySelector, fetch — e os frameworks a substituíram), mas ainda aparece em sistemas antigos.
`);

A('web-html', `
## 1. HTML5 — a estrutura
O **HTML** descreve a **estrutura e o significado** do conteúdo (não a aparência). O HTML5 trouxe **elementos semânticos**, multimídia nativa e APIs.
### Elementos semânticos
| Elemento | Uso |
|---|---|
| **<header>** | cabeçalho de página ou seção |
| **<nav>** | bloco de navegação principal |
| **<main>** | conteúdo **principal e único** da página (um por página) |
| **<article>** | conteúdo **independente** e reutilizável (notícia, post) |
| **<section>** | seção temática, normalmente com título |
| **<aside>** | conteúdo **complementar** (barra lateral) |
| **<footer>** | rodapé |
| **<figure>/<figcaption>** | figura com legenda |
| **<time>**, **<mark>**, **<details>/<summary>**, **<dialog>** | |
Por que semântica importa? **Acessibilidade** (leitores de tela navegam por regiões), **SEO** e manutenção.

### Formulários HTML5
Novos tipos de input: **email, url, tel, number, range, date, time, color, search**. Atributos: **required**, **placeholder**, **pattern** (regex), **min/max**, **autofocus**, **autocomplete**. Validação no navegador **não substitui** a validação no **servidor**.

### Outras novidades
**<audio>/<video>** nativos, **<canvas>** (desenho via JS) e **SVG** inline, **Web Storage** (localStorage — persistente; sessionStorage — até fechar a aba), **IndexedDB**, Geolocation, Web Workers, WebSockets, **Service Workers** (base das PWAs), \`<!DOCTYPE html>\` simplificado, atributos **data-*** e **ARIA**.

## 2. CSS3 — a apresentação
### Especificidade (quem vence quando há conflito)
Ordem de força: **!important** > **estilo inline** > **ID** (1,0,0) > **classe, atributo, pseudo-classe** (0,1,0) > **elemento, pseudo-elemento** (0,0,1). Em empate, vence a **última** regra declarada. Herança e cascata completam o quadro.
Ex.: \`#menu a\` (1,0,1) vence \`.nav a\` (0,1,1), que vence \`a\` (0,0,1).

### Box model
Cada elemento é uma caixa: **content → padding → border → margin**. Com \`box-sizing: border-box\`, a largura definida **inclui** padding e borda (mais previsível).

### Layout moderno
- **Flexbox**: layout em **uma dimensão** (linha ou coluna): \`display:flex\`, \`justify-content\` (eixo principal), \`align-items\` (eixo cruzado), \`flex-wrap\`, \`gap\`.
- **Grid**: layout em **duas dimensões**: \`display:grid\`, \`grid-template-columns: repeat(3, 1fr)\`, áreas nomeadas.
- **position**: static, relative, absolute (relativo ao ancestral posicionado), fixed (à janela), sticky.
- **Design responsivo**: \`<meta name="viewport">\`, **media queries** (\`@media (max-width: 600px)\`), unidades relativas (**rem, em, %, vw, vh**), **mobile first**.
- Recursos CSS3: transições, animações (@keyframes), transform, gradientes, sombras, **variáveis CSS** (\`--cor: #123\` e \`var(--cor)\`), pseudo-classes (\`:hover\`, \`:nth-child()\`, \`:focus-visible\`), pseudo-elementos (\`::before\`, \`::after\`).

## 3. Acessibilidade (WCAG)
Princípios **POUR**: **Perceptível, Operável, Compreensível, Robusto**. Na prática: **texto alternativo (alt)** em imagens informativas (\`alt=""\` nas decorativas), **contraste** adequado, navegação por **teclado**, **rótulos** em campos (\`<label for>\`), estrutura de títulos coerente, ARIA só quando o HTML nativo não basta. No Brasil, o **eMAG** orienta os sites do governo.

## 4. XML
**eXtensible Markup Language**: linguagem para **armazenar e trocar dados** com marcação definida pelo usuário.
- **Bem-formado** (regras de sintaxe): um **único elemento raiz**, todas as tags **fechadas**, **aninhamento correto**, **case-sensitive**, valores de atributos **entre aspas**, caracteres especiais escapados (\`&lt;\`, \`&amp;\`).
- **Válido**: bem-formado **e** de acordo com um **esquema** (DTD ou XSD).
- Tecnologias: **Namespaces** (evitar conflito de nomes), **XPath** (navegar/consultar nós: \`/processo/partes/parte[1]\`), **XSLT** (transformar XML em outro formato), **DOM** (carrega a árvore inteira na memória) × **SAX** (leitura sequencial por eventos, pouca memória), **StAX**.

## 5. XML Schema (XSD)
Define a **estrutura e os tipos** de um documento XML — é escrito **em XML**, ao contrário da DTD.
- **Tipos simples** (\`xs:string\`, \`xs:int\`, \`xs:date\`, \`xs:boolean\`) e **complexos** (\`xs:complexType\` com elementos filhos e atributos).
- Compositores: **xs:sequence** (filhos em **ordem**), **xs:choice** (**um** entre vários), **xs:all** (todos, em qualquer ordem).
- Cardinalidade: **minOccurs** e **maxOccurs** (padrão **1**; \`unbounded\` = ilimitado).
- **Restrições (facets)**: \`xs:restriction\` com \`minLength\`, \`maxLength\`, \`pattern\`, \`enumeration\`, \`minInclusive\`.
- Atributos: \`xs:attribute\` com \`use="required"\`.
**XSD × DTD**: o XSD tem **tipos de dados**, suporta **namespaces**, é extensível e escrito em XML; a DTD é mais simples e antiga.
`);

A('web-frameworks', `
## 1. Por que frameworks de front-end
Aplicações modernas são **SPAs (Single Page Applications)**: a página carrega uma vez e o JavaScript atualiza a tela conforme o usuário navega, buscando dados por APIs. Fazer isso “na mão” vira caos; os frameworks organizam o código em **componentes** reutilizáveis e mantêm a interface **sincronizada com os dados**.

## 2. Angular (Google) — o padrão da PDPJ
**Framework completo** em **TypeScript** (não confundir com o antigo **AngularJS**, versão 1.x em JavaScript).
| Conceito | O que é |
|---|---|
| **Componente** | classe com \`@Component\` + **template** HTML + estilos; bloco básico da tela |
| **Template e data binding** | interpolação \`{{ valor }}\`; property binding \`[prop]\`; event binding \`(click)\`; **two-way** \`[(ngModel)]\` (“banana na caixa”) |
| **Diretivas** | **estruturais** alteram o DOM (\`*ngIf\`, \`*ngFor\` ou o novo **control flow** \`@if\`, \`@for\`); **de atributo** alteram aparência (\`ngClass\`) |
| **Services + injeção de dependências** | lógica e acesso a dados reutilizáveis (\`@Injectable\`) |
| **Pipes** | transformam valores no template (\`date\`, \`currency\`, \`uppercase\`) |
| **Router** | navegação entre telas, **guards** (proteger rotas), **lazy loading** |
| **HttpClient** + **interceptors** | chamadas REST; interceptors adicionam o token JWT a toda requisição |
| **RxJS / Observables** | programação reativa (fluxos de dados assíncronos) |
| **Signals** (versões recentes) | reatividade granular |
| **Standalone components** | dispensam NgModule (padrão nas versões atuais) |
| **Angular CLI** | \`ng new\`, \`ng generate component\`, \`ng build\`, \`ng serve\` |
Ciclo de vida: **ngOnInit** (inicialização — buscar dados), ngOnChanges, ngOnDestroy (liberar inscrições).

## 3. React (Meta)
**Biblioteca** (não framework completo) para interfaces, baseada em **componentes funcionais** e **JSX** (HTML dentro do JS). Usa o **Virtual DOM**: calcula as diferenças e atualiza só o necessário. Fluxo de dados **unidirecional** (props descem do pai para o filho).
**Hooks**: **useState** (estado), **useEffect** (efeitos colaterais: buscar dados, assinaturas — com array de dependências), **useContext**, **useMemo/useCallback** (memorização), **useRef**, **useReducer**. Ecossistema: React Router, Redux, Next.js.

## 4. Vue.js
Framework **progressivo** (pode ser adotado aos poucos), com **Single File Components** (.vue: template + script + style), reatividade automática, diretivas \`v-if\`, \`v-for\`, \`v-model\`, \`v-bind\` (:), \`v-on\` (@). Composition API e Options API.

## 5. JSF (Jakarta Faces)
Framework Java **do lado do servidor**, **baseado em componentes** e orientado a eventos, padrão do Jakarta EE. Páginas em **Facelets (XHTML)**, ligadas a **Managed Beans/CDI beans** por **Expression Language** (\`#{processoBean.numero}\`). Ciclo de vida de **6 fases**: Restore View → Apply Request Values → Process Validations → Update Model Values → Invoke Application → Render Response. Bibliotecas de componentes: **PrimeFaces**, RichFaces. O PJe 1.x usa JSF.

## 6. Bootstrap e Angular Material
- **Bootstrap**: framework CSS com **grid responsivo de 12 colunas** (container → row → col), breakpoints (\`sm, md, lg, xl, xxl\`), componentes prontos (navbar, modal, cards, botões), utilitários, abordagem **mobile first**.
- **Angular Material**: biblioteca de componentes de interface para Angular que implementa o **Material Design** do Google (botões, tabelas com paginação e ordenação, formulários, diálogos, datepicker), com acessibilidade e temas.

## 7. PWA (Progressive Web App) — como este site!
Aplicação web que se comporta como **aplicativo nativo**:
- **Service Worker**: script que roda em segundo plano, **intercepta requisições** e permite **funcionar offline** (cache), notificações push e sincronização em segundo plano.
- **Web App Manifest** (JSON): nome, ícones, cores, \`display: standalone\` → permite **instalar** na tela inicial.
- **HTTPS obrigatório** (exceto localhost).
- Estratégias de cache: **cache first**, **network first**, **stale-while-revalidate**.
- Vantagens: uma base de código, sem loja de aplicativos, atualização instantânea, leve.
`);

A('web-python', `
## 1. Por que Python
Linguagem **interpretada**, de **tipagem dinâmica e forte**, multiparadigma, com sintaxe limpa. Muito usada em **automação**, scripts de infraestrutura, ciência de dados, IA e APIs (Django, Flask, FastAPI). Versão atual: **Python 3** (o Python 2 foi descontinuado em 2020).

## 2. A indentação é a sintaxe
Python **não usa chaves**: os blocos são definidos pela **indentação** (por convenção, 4 espaços — PEP 8). Indentação errada causa **IndentationError**.
\`\`\`
def classificar(nota):
    if nota >= 6:
        return "aprovado"
    elif nota >= 4:
        return "recuperação"
    else:
        return "reprovado"
\`\`\`

## 3. Tipos e estruturas de dados
| Tipo | Mutável? | Ordenado? | Duplicatas? | Exemplo |
|---|---|---|---|---|
| **list** | **sim** | sim | sim | \`[1, 2, 2]\` |
| **tuple** | **não** | sim | sim | \`(1, 2)\` |
| **set** | sim | **não** | **não** | \`{1, 2}\` |
| **dict** | sim | **sim** (ordem de inserção, desde 3.7) | chaves únicas | \`{"vara": 5}\` |
| **str** | **não** | sim | | \`"TRT4"\` |
- Chaves de dicionário devem ser **imutáveis/hashable** (str, int, tuple de imutáveis) — **lista não pode** ser chave.
- \`{}\` cria um **dict** vazio; set vazio é \`set()\`.
- Tipagem **forte**: \`"5" + 3\` gera **TypeError** (diferente do JavaScript).
- Divisão: \`7 / 2\` = 3.5; \`7 // 2\` = 3 (inteira); \`7 % 2\` = 1; \`2 ** 3\` = 8.

## 4. Fatiamento (slicing) — cai muito
\`lista[início:fim:passo]\` → o **fim não é incluído**. Índices negativos contam do fim.
\`\`\`
n = [10, 20, 30, 40, 50]
n[1:3]    # [20, 30]
n[:2]     # [10, 20]
n[-1]     # 50
n[::-1]   # [50, 40, 30, 20, 10]  (inverte)
n[::2]    # [10, 30, 50]
\`\`\`

## 5. Laços e compreensões
\`\`\`
for i in range(3):        # 0, 1, 2  (range(fim) não inclui o fim)
    print(i)

quadrados = [x ** 2 for x in range(5) if x % 2 == 0]   # [0, 4, 16]
idades = {nome: len(nome) for nome in ["Ana", "Bia"]}  # dict comprehension
\`\`\`
\`range(início, fim, passo)\`; \`enumerate(lista)\` dá índice e valor; \`zip(a, b)\` combina listas; \`while\`, \`break\`, \`continue\`, e o \`else\` de laços (executa se não houve break).

## 6. Funções
- \`def f(a, b=2, *args, **kwargs)\`: parâmetro com valor padrão, \`*args\` (tupla de posicionais extras), \`**kwargs\` (dict de nomeados extras).
- **lambda**: função anônima de uma expressão: \`lambda x: x * 2\`.
- Funções de primeira classe; \`map\`, \`filter\`, \`sorted(lista, key=...)\`.
- **Decorators** (\`@decorador\`): envolvem funções acrescentando comportamento (muito usado em Flask/FastAPI para rotas).
- Cuidado: valor padrão **mutável** (\`def f(x=[])\`) é compartilhado entre chamadas.

## 7. Orientação a objetos
\`\`\`
class Processo:
    def __init__(self, numero):   # construtor
        self.numero = numero        # self = o próprio objeto

    def __str__(self):
        return f"Processo {self.numero}"

class ProcessoEletronico(Processo):  # herança (Python permite herança múltipla)
    pass
\`\`\`
Convenções: \`_atributo\` (uso interno), \`__atributo\` (name mangling). **Métodos mágicos (dunder)**: \`__init__\`, \`__str__\`, \`__len__\`, \`__eq__\`.

## 8. Exceções, arquivos e módulos
- \`try / except TipoErro / else / finally\`; \`raise\` lança exceções.
- \`with open("arq.txt") as f:\` — **gerenciador de contexto** fecha o arquivo automaticamente.
- \`import modulo\`, \`from pacote import nome\`; **pip** instala pacotes; **ambientes virtuais** (\`venv\`) isolam dependências; \`requirements.txt\`.
- \`if __name__ == "__main__":\` → executa só quando o arquivo é rodado diretamente.
- **f-strings**: \`f"Olá, {nome}"\`.
- Tipagem opcional (type hints): \`def soma(a: int, b: int) -> int:\`.
`);

A('web-manut', `
## 1. Manutenção é a maior parte da vida do software
Estudos clássicos mostram que a **maior parte do custo** de um sistema está na **manutenção**, não no desenvolvimento inicial. Como técnico de TI no Tribunal, você vai manter sistemas por anos.

## 2. Tipos de manutenção (ISO/IEC 14764 e literatura)
| Tipo | O que faz | Exemplo |
|---|---|---|
| **Corretiva** | corrige **defeitos** encontrados | erro no cálculo de prazos |
| **Adaptativa** | ajusta o sistema a mudanças no **ambiente** (SO, banco, legislação, integrações) | migrar para Java 21; nova versão do navegador |
| **Perfectiva** | **melhora** desempenho, usabilidade ou acrescenta funcionalidades pedidas | novo relatório |
| **Preventiva** | melhora a **manutenibilidade** para evitar problemas futuros | refatoração, atualizar documentação |
> [!fcc] Alguns autores agrupam adaptativa e perfectiva como “**evolutiva**”. A FCC cobra muito a diferença entre **adaptativa** (ambiente mudou) e **perfectiva** (melhoria/novo requisito).

## 3. Leis de Lehman (evolução de software)
- **Mudança contínua**: um sistema usado no mundo real precisa mudar ou se torna progressivamente menos útil.
- **Complexidade crescente**: à medida que evolui, sua estrutura se degrada, a menos que se trabalhe para reduzi-la.

## 4. Dívida técnica, refatoração e legado
- **Dívida técnica**: atalhos tomados hoje (código apressado, sem testes) que cobram “juros” depois (dificuldade de mudar).
- **Refatoração** (Martin Fowler): mudar a **estrutura interna** **sem alterar o comportamento externo**, em passos pequenos e **protegidos por testes**. Gatilhos: **code smells** (método longo, classe grande, código duplicado, nomes ruins).
- **Sistemas legados**: estratégias — manter, **encapsular** com APIs, **migrar aos poucos (strangler fig)**, reescrever.
- **Engenharia reversa** (recuperar documentação/projeto a partir do código) e **reengenharia** (reestruturar o sistema).

## 5. Depuração (debugging) passo a passo
1. **Reproduzir** o problema de forma consistente.
2. **Isolar**: reduzir o caso ao mínimo; usar busca binária (inclusive no histórico: \`git bisect\`).
3. **Formular hipóteses** e testá-las.
4. **Corrigir** a causa raiz (não o sintoma).
5. **Criar um teste** que falhava antes e passa depois (evita regressão).
6. Verificar efeitos colaterais.
### Ferramentas do depurador
- **Breakpoint**: pausa a execução numa linha. **Breakpoint condicional**: só pausa se uma condição for verdadeira.
- **Step over** (executa a linha sem entrar na função), **step into** (entra na função chamada), **step out** (termina a função atual e volta), **resume/continue**.
- **Watch** (acompanhar variáveis/expressões), **call stack** (pilha de chamadas), avaliação de expressões.
- **Logs** com níveis (TRACE, DEBUG, INFO, WARN, ERROR), **stack traces** (ler de cima para baixo: a primeira linha do seu código costuma indicar a origem), **profilers** (desempenho e memória), depuração **remota** (JDWP no Java).

## 6. IDEs (Ambientes de Desenvolvimento Integrado)
Reúnem **editor**, **compilador/build**, **depurador**, integração com **Git**, **refatoração automatizada**, autocompletar e testes.
| IDE | Destaques |
|---|---|
| **Eclipse** | open source (Eclipse Foundation), extensível por plugins, tradicional no Java |
| **IntelliJ IDEA** (JetBrains) | Community (gratuita) e Ultimate; forte em Java/Spring |
| **Visual Studio Code** (Microsoft) | **editor** leve e extensível (extensões para quase toda linguagem), muito usado em front-end |
| **NetBeans** (Apache) | Java |
| Spring Tool Suite | Eclipse/VS Code voltados ao Spring |
Ferramentas de build Java: **Maven** (\`pom.xml\`, ciclo **validate → compile → test → package → verify → install → deploy**, repositório central) e **Gradle** (\`build.gradle\`, scripts em Groovy/Kotlin, builds incrementais).
`);
