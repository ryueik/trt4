/* Questões inéditas no estilo FCC — DevOps, PDPJ/Java, Engenharia de Software e Web */

/* ======================= DEVOPS ======================= */
Q('devops', [
{ topic: 'devops-cicd', lvl: 'fácil',
q: `Em uma esteira DevOps, a prática em que cada alteração que passa por todos os estágios automatizados do pipeline é **automaticamente implantada em produção**, sem aprovação manual, denomina-se`,
o: ['Integração Contínua.', 'Entrega Contínua.', 'Implantação Contínua (Continuous Deployment).', 'Infraestrutura como Código.', 'Gerência de Configuração.'],
a: 2,
e: `- **CI**: integrar e testar o código frequentemente (build + testes automatizados).
- **Entrega contínua**: o software está **sempre pronto** para ir a produção, mas a liberação depende de **decisão manual**.
- **Implantação contínua**: a ida a produção é **automática**.` },

{ topic: 'devops-cicd', lvl: 'médio',
q: `Considere o trecho de um arquivo \`.gitlab-ci.yml\`:

\`\`\`
stages: [build, test, deploy]
deploy-prod:
  stage: deploy
  script: ./deploy.sh
  when: manual
  only: [main]
\`\`\`

É correto afirmar que o job \`deploy-prod\``,
o: ['é executado antes dos jobs do estágio test.',
    'é executado automaticamente em todos os branches.',
    'só aparece para pipelines do branch main e precisa ser disparado manualmente, caracterizando entrega contínua.',
    'caracteriza implantação contínua, pois roda sem intervenção humana.',
    'é ignorado porque o estágio deploy não pode conter scripts.'],
a: 2,
e: `\`only: [main]\` restringe ao branch **main**; \`when: manual\` exige **acionamento humano** — típico de **entrega contínua**. Os estágios rodam na ordem declarada (build → test → deploy).` },

{ topic: 'devops-git', lvl: 'médio',
q: `Um desenvolvedor deseja desfazer, em um branch **compartilhado** já enviado ao repositório remoto, as alterações de um commit específico, **preservando o histórico**. O comando mais adequado é`,
o: ['git reset --hard <commit>', 'git revert <commit>', 'git checkout -- .', 'git stash drop', 'git rebase -i <commit> e remover o commit'],
a: 1,
e: `**git revert** cria um **novo commit** que inverte as mudanças, sem reescrever o histórico — seguro para branches compartilhados. **reset --hard** e **rebase** reescrevem o histórico (exigem push forçado e afetam colegas).` },

{ topic: 'devops-git', lvl: 'médio',
q: `No modelo **Git Flow**, correções urgentes em produção são feitas em branches do tipo`,
o: ['feature, criados a partir de develop e integrados apenas em develop.',
    'release, criados a partir de main e integrados apenas em main.',
    'hotfix, criados a partir de main e integrados em main e em develop.',
    'bugfix, criados a partir de develop e integrados em main.',
    'support, criados a partir de feature.'],
a: 2,
e: `**hotfix/*** nasce de **main** (master) e, ao final, é mesclado em **main** (com tag de versão) **e em develop**, para que a correção não se perca.` },

{ topic: 'devops-git', lvl: 'fácil',
q: `O comando Git que **baixa** as alterações do repositório remoto **e as integra** ao branch local atual é`,
o: ['git fetch', 'git push', 'git pull', 'git clone', 'git commit'],
a: 2,
e: `**git pull** = **git fetch** (baixa) + **git merge** (ou rebase, se configurado). O fetch sozinho apenas atualiza as referências remotas.` },

{ topic: 'devops-auth', lvl: 'médio',
q: `No OAuth 2.0, o fluxo recomendado para aplicações **SPA e móveis** (clientes públicos), segundo as boas práticas atuais (RFC 9700), é o`,
o: ['Implicit Grant.', 'Resource Owner Password Credentials.', 'Authorization Code com PKCE.', 'Client Credentials.', 'Device Code sem verificação.'],
a: 2,
e: `A RFC 9700 (BCP de segurança do OAuth 2.0) **desaconselha o Implicit e o Password Grant** e recomenda **Authorization Code + PKCE** para todos os clientes, especialmente os públicos. **Client Credentials** serve para comunicação máquina a máquina, sem usuário.` },

{ topic: 'devops-auth', lvl: 'médio',
q: `Sobre OpenID Connect (OIDC) e Keycloak, é correto afirmar:`,
o: ['O OIDC substitui o OAuth 2.0 e dispensa tokens de acesso.',
    'O ID Token, em formato JWT, carrega informações sobre a autenticação do usuário e é destinado ao cliente.',
    'O Keycloak só suporta o protocolo SAML.',
    'O access token deve ser usado pelo cliente para obter a identidade do usuário, dispensando o ID Token.',
    'No Keycloak, um realm corresponde a um único usuário.'],
a: 1,
e: `O OIDC é uma **camada de identidade sobre o OAuth 2.0** que adiciona o **ID Token (JWT)**, destinado ao **cliente**, com claims sobre a autenticação. O **access token** destina-se ao **resource server**. O Keycloak suporta **OIDC e SAML**; um **realm** é um espaço isolado de usuários, clientes e papéis.` },

{ topic: 'devops-msg', lvl: 'médio',
q: `No RabbitMQ, a exchange que encaminha uma cópia da mensagem para **todas** as filas a ela vinculadas, **ignorando** a routing key, é do tipo`,
o: ['direct.', 'topic.', 'fanout.', 'headers.', 'default.'],
a: 2,
e: `- **fanout**: broadcast para todas as filas vinculadas.
- **direct**: routing key **exata**.
- **topic**: padrões com curingas (\`*\` uma palavra, \`#\` zero ou mais).
- **headers**: atributos do cabeçalho.` },

{ topic: 'devops-msg', lvl: 'difícil',
q: `Em uma exchange do tipo **topic**, uma fila vinculada com a binding key \`tribunal.*.erro\` receberá a mensagem publicada com a routing key`,
o: ['tribunal.erro', 'tribunal.vara.erro', 'tribunal.vara.civel.erro', 'tribunal.vara.alerta', 'vara.tribunal.erro'],
a: 1,
e: `\`*\` substitui **exatamente uma** palavra: \`tribunal.vara.erro\` ✔. (C) tem duas palavras no meio (exigiria \`#\`). (A) não tem palavra no meio.` }
]);

/* ======================= PDPJ — JAVA, SPRING, JPA ======================= */
Q('pdpj', [
{ topic: 'pdpj-java', lvl: 'médio',
q: `Considere o código Java:

\`\`\`
String a = "TRT4";
String b = new String("TRT4");
System.out.println(a == b);
System.out.println(a.equals(b));
\`\`\`

A saída será`,
o: ['true e true', 'false e true', 'true e false', 'false e false', 'erro de compilação'],
a: 1,
e: `\`==\` compara **referências**: \`new String\` cria outro objeto → **false**. \`equals\` compara **conteúdo** → **true**.` },

{ topic: 'pdpj-java', lvl: 'médio',
q: `Sobre as coleções do Java, é correto afirmar:`,
o: ['ArrayList não permite elementos duplicados.',
    'HashSet mantém os elementos na ordem de inserção.',
    'HashMap armazena pares chave-valor e não permite chaves duplicadas.',
    'TreeSet aceita elementos nulos sem restrições e não os ordena.',
    'LinkedList não implementa a interface List.'],
a: 2,
e: `**HashMap**: chave única (inserir com a mesma chave substitui o valor). **ArrayList** permite duplicados; **HashSet** não garante ordem (LinkedHashSet mantém inserção); **TreeSet** ordena; **LinkedList** implementa List e Deque.` },

{ topic: 'pdpj-java', lvl: 'difícil',
q: `Analise o trecho com a API de Streams:

\`\`\`
List<Integer> n = List.of(1, 2, 3, 4, 5, 6);
int r = n.stream().filter(x -> x % 2 == 0).map(x -> x * x).reduce(0, Integer::sum);
\`\`\`

O valor de \`r\` é`,
o: ['12', '21', '56', '91', '36'],
a: 2,
e: `Pares: 2, 4, 6 → quadrados 4, 16, 36 → soma **56**.` },

{ topic: 'pdpj-oo', lvl: 'médio',
q: `Em orientação a objetos, a possibilidade de uma variável do tipo de uma superclasse referenciar objetos de subclasses, com o método executado sendo determinado em tempo de execução pelo tipo real do objeto, denomina-se`,
o: ['encapsulamento.', 'sobrecarga (overloading).', 'polimorfismo de sobrescrita (ligação dinâmica).', 'agregação.', 'acoplamento.'],
a: 2,
e: `É o **polimorfismo** por **sobrescrita (overriding)**, resolvido em **tempo de execução** (dynamic dispatch). A **sobrecarga** é resolvida em tempo de compilação, pela assinatura.` },

{ topic: 'pdpj-oo', lvl: 'médio',
q: `O princípio SOLID segundo o qual “**objetos de uma subclasse devem poder substituir objetos da superclasse sem alterar a correção do programa**” é o`,
o: ['Single Responsibility Principle.', 'Open/Closed Principle.', 'Liskov Substitution Principle.', 'Interface Segregation Principle.', 'Dependency Inversion Principle.'],
a: 2,
e: `**LSP — Princípio da Substituição de Liskov**. O **OCP** fala em aberto para extensão e fechado para modificação; o **DIP**, em depender de abstrações.` },

{ topic: 'pdpj-micro', lvl: 'médio',
q: `Em uma arquitetura de microsserviços, o padrão que oferece um **ponto único de entrada** para os clientes, roteando requisições, centralizando autenticação, limitação de taxa e agregação de respostas, é o`,
o: ['Circuit Breaker.', 'API Gateway.', 'Saga.', 'Database per Service.', 'Strangler Fig.'],
a: 1,
e: `**API Gateway**.
- **Circuit Breaker**: evita falhas em cascata, interrompendo chamadas a um serviço que falha.
- **Saga**: transações distribuídas com compensações.
- **Strangler Fig**: migração gradual de monólito.` },

{ topic: 'pdpj-micro', lvl: 'difícil',
q: `Para manter a consistência de dados em uma operação que envolve vários microsserviços, cada um com seu próprio banco, sem usar transações distribuídas com two-phase commit, utiliza-se o padrão`,
o: ['Singleton.', 'Saga, com transações locais e ações compensatórias.', 'Shared Database.', 'Sidecar.', 'Backend for Frontend.'],
a: 1,
e: `O **Saga** encadeia **transações locais**; se uma etapa falha, executam-se **transações compensatórias**. Pode ser **coreografada** (eventos) ou **orquestrada** (coordenador central).` },

{ topic: 'pdpj-spring', lvl: 'médio',
q: `No Spring, a anotação que combina \`@Controller\` e \`@ResponseBody\`, sendo usada para criar endpoints REST que retornam dados serializados (por exemplo, JSON), é`,
o: ['@Service', '@Repository', '@RestController', '@Component', '@Configuration'],
a: 2,
e: `**@RestController** = @Controller + @ResponseBody. @Service, @Repository e @Component são estereótipos de beans; @Configuration declara classes de configuração com métodos @Bean.` },

{ topic: 'pdpj-spring', lvl: 'médio',
q: `Sobre injeção de dependências no Spring, considera-se boa prática`,
o: ['instanciar dependências manualmente com new dentro dos serviços.',
    'usar injeção via construtor, que favorece imutabilidade e facilita testes.',
    'usar apenas campos estáticos para compartilhar dependências.',
    'evitar interfaces para reduzir o número de classes.',
    'declarar todos os beans com escopo prototype.'],
a: 1,
e: `A **injeção por construtor** é a recomendada: dependências **obrigatórias** e **final**, facilidade de testes (mocks) e detecção de ciclos. Desde o Spring 4.3, com um único construtor, @Autowired é opcional.` },

{ topic: 'pdpj-jpa', lvl: 'médio',
q: `Em JPA, a anotação usada para mapear um relacionamento em que **muitos** registros de uma entidade se associam a **um** registro de outra (por exemplo, vários processos de uma mesma vara), no lado que contém a chave estrangeira, é`,
o: ['@OneToMany', '@ManyToOne', '@OneToOne', '@ManyToMany', '@Embedded'],
a: 1,
e: `O lado “muitos” (Processo → Vara) usa **@ManyToOne** e é o **dono** do relacionamento (contém a FK, via @JoinColumn). O lado inverso usaria @OneToMany(mappedBy = "vara").` },

{ topic: 'pdpj-jpa', lvl: 'difícil',
q: `O problema de desempenho em que, ao carregar uma lista de N entidades, o ORM dispara **uma consulta adicional para cada entidade** a fim de buscar uma associação carregada de forma *lazy* é conhecido como`,
o: ['deadlock.', 'N+1 selects.', 'phantom read.', 'lost update.', 'cache stampede.'],
a: 1,
e: `É o **problema N+1**. Soluções: **JOIN FETCH** em JPQL, **@EntityGraph**, *batch fetching* (@BatchSize) ou projeções/DTOs.` },

{ topic: 'pdpj-servers', lvl: 'médio',
q: `Sobre servidores de aplicação Java, é correto afirmar:`,
o: ['O Apache Tomcat é um servidor Jakarta EE completo, com suporte nativo a EJB.',
    'O WildFly e o JBoss EAP são servidores de aplicação com suporte ao perfil completo do Jakarta EE.',
    'O Spring Boot não pode embutir um servidor web.',
    'O Undertow é um banco de dados em memória.',
    'Aplicações Spring Boot só podem ser implantadas como arquivos EAR.'],
a: 1,
e: `**WildFly** (comunitário) e **JBoss EAP** (Red Hat) implementam o Jakarta EE completo. O **Tomcat** é um **contêiner de servlets** (sem EJB). O Spring Boot **embute** Tomcat, Jetty ou Undertow e gera **JAR executável** (ou WAR).` }
]);

/* ======================= ENGENHARIA DE SOFTWARE ======================= */
Q('eng', [
{ topic: 'eng-processo', lvl: 'médio',
q: `O modelo de processo de software que organiza o desenvolvimento em ciclos sucessivos, cada um com análise de **riscos** explícita e representado graficamente por voltas crescentes, foi proposto por Boehm e é denominado`,
o: ['cascata.', 'espiral.', 'incremental.', 'V-model.', 'RAD.'],
a: 1,
e: `O **modelo espiral** (Boehm, 1988) combina prototipação com aspectos sistemáticos do cascata e coloca a **análise de riscos** no centro de cada ciclo.` },

{ topic: 'eng-processo', lvl: 'fácil',
q: `Requisitos que descrevem **restrições** sobre os serviços do sistema, como desempenho, segurança, disponibilidade e usabilidade, são classificados como`,
o: ['requisitos funcionais.', 'requisitos não funcionais.', 'regras de negócio.', 'casos de uso.', 'histórias de usuário.'],
a: 1,
e: `**Requisitos não funcionais** tratam de **qualidades e restrições** (o “como”). Os **funcionais** descrevem **o que** o sistema deve fazer.` },

{ topic: 'eng-qualidade', lvl: 'médio',
q: `Na norma ISO/IEC 25010 (modelo de qualidade do produto), a característica relacionada ao grau em que o produto pode ser modificado de forma eficaz e eficiente sem introduzir defeitos, incluindo modularidade, reusabilidade e testabilidade, é a`,
o: ['usabilidade.', 'confiabilidade.', 'manutenibilidade.', 'portabilidade.', 'adequação funcional.'],
a: 2,
e: `**Manutenibilidade**: modularidade, reusabilidade, analisabilidade, modificabilidade e testabilidade.` },

{ topic: 'eng-testes', lvl: 'médio',
q: `A técnica de teste que deriva casos de teste **a partir da especificação**, sem considerar a estrutura interna do código, e que inclui particionamento em classes de equivalência e análise de valor-limite, é o teste`,
o: ['de caixa-branca.', 'de caixa-preta.', 'de mutação.', 'de cobertura de caminhos.', 'estrutural.'],
a: 1,
e: `**Caixa-preta (funcional)**: classes de equivalência, valor-limite, tabela de decisão, transição de estados. **Caixa-branca (estrutural)**: cobertura de comandos, desvios e caminhos.` },

{ topic: 'eng-testes', lvl: 'médio',
q: `Um campo aceita valores inteiros de 18 a 65. Pela análise de **valor-limite** (abordagem de dois valores), os valores a testar são`,
o: ['18 e 65.', '17, 18, 65 e 66.', '0, 18, 65 e 100.', '19 e 64.', '17 e 66.'],
a: 1,
e: `Testa-se **cada fronteira e o valor imediatamente fora dela**: 17 (inválido), 18 (válido), 65 (válido) e 66 (inválido).` },

{ topic: 'eng-testes', lvl: 'médio',
q: `Na pirâmide de testes, a camada que deve conter a **maior quantidade** de testes, por serem rápidos, baratos e isolados, é a de testes`,
o: ['de ponta a ponta (E2E).', 'de interface gráfica.', 'de unidade.', 'de aceitação manuais.', 'exploratórios.'],
a: 2,
e: `Base larga: **unidade**; meio: **integração/serviço**; topo estreito: **E2E/UI** (lentos, caros e frágeis).` },

{ topic: 'eng-agil', lvl: 'médio',
q: `No Scrum (Guia de 2020), é responsabilidade do **Product Owner**`,
o: ['remover impedimentos do time e facilitar eventos.',
    'gerenciar o Product Backlog, ordenando seus itens para maximizar o valor do produto.',
    'definir sozinho como o trabalho da Sprint será executado.',
    'aprovar individualmente cada commit do time.',
    'conduzir a Daily Scrum como gerente do time.'],
a: 1,
e: `O **PO** é responsável por **maximizar o valor** e **gerenciar o Product Backlog** (meta do produto, itens, ordenação, transparência). O **Scrum Master** remove impedimentos; os **Developers** decidem como executar o trabalho; a Daily é dos Developers.` },

{ topic: 'eng-agil', lvl: 'médio',
q: `Segundo o Guia do Scrum 2020, os três **compromissos** associados, respectivamente, ao Product Backlog, ao Sprint Backlog e ao Incremento são`,
o: ['Visão, Plano e Entrega.', 'Meta do Produto, Meta da Sprint e Definição de Pronto.', 'Roadmap, Burndown e Release.', 'Épico, História e Tarefa.', 'Velocidade, Capacidade e Qualidade.'],
a: 1,
e: `Artefato → compromisso: **Product Backlog → Meta do Produto**; **Sprint Backlog → Meta da Sprint**; **Incremento → Definição de Pronto**.` },

{ topic: 'eng-agil', lvl: 'fácil',
q: `No Kanban, a prática de limitar a quantidade de itens em cada etapa do fluxo tem como principal objetivo`,
o: ['aumentar o número de tarefas iniciadas simultaneamente.', 'reduzir o trabalho em progresso (WIP), evidenciar gargalos e melhorar o fluxo.', 'eliminar a necessidade de quadro visual.', 'fixar a duração das iterações.', 'substituir o Product Owner.'],
a: 1,
e: `Os **limites de WIP** forçam a **terminar antes de começar**, expõem **gargalos** e reduzem o **lead time**.` },

{ topic: 'eng-uml', lvl: 'médio',
q: `Na UML, o relacionamento entre classes em que a parte **não existe** independentemente do todo, sendo destruída junto com ele, e que é representado por um losango **preenchido**, é a`,
o: ['associação simples.', 'agregação.', 'composição.', 'generalização.', 'dependência.'],
a: 2,
e: `**Composição** (losango cheio): ciclo de vida dependente. **Agregação** (losango vazio): a parte pode existir sem o todo. **Generalização**: seta com triângulo vazado (herança).` },

{ topic: 'eng-uml', lvl: 'médio',
q: `Em um diagrama de casos de uso, o relacionamento em que um caso de uso **sempre** incorpora o comportamento de outro (por exemplo, “Emitir certidão” sempre executa “Autenticar usuário”) é o`,
o: ['«extend»', '«include»', 'generalização entre atores', 'associação', '«realize»'],
a: 1,
e: `**«include»**: inclusão **obrigatória**. **«extend»**: comportamento **opcional/condicional**, acionado em pontos de extensão.` },

{ topic: 'eng-arq', lvl: 'médio',
q: `O padrão de projeto **GoF** que garante que uma classe tenha **uma única instância** e fornece um ponto global de acesso a ela é o`,
o: ['Factory Method.', 'Singleton.', 'Observer.', 'Adapter.', 'Strategy.'],
a: 1,
e: `**Singleton** (criacional). **Observer** (comportamental) notifica dependentes; **Adapter** (estrutural) compatibiliza interfaces; **Strategy** encapsula algoritmos intercambiáveis.` },

{ topic: 'eng-arq', lvl: 'médio',
q: `No padrão arquitetural MVC, o componente responsável por receber as interações do usuário, acionar a lógica de negócio e selecionar a visão de resposta é o`,
o: ['Model.', 'View.', 'Controller.', 'Repository.', 'DTO.'],
a: 2,
e: `**Controller** intermedeia: recebe a entrada, aciona o **Model** (dados e regras) e escolhe a **View** (apresentação).` }
]);

/* ======================= DESENVOLVIMENTO WEB ======================= */
Q('web', [
{ topic: 'web-js', lvl: 'médio',
q: `Considere o código JavaScript:

\`\`\`
console.log(typeof null);
console.log(0 == '0');
console.log(0 === '0');
\`\`\`

A saída é`,
o: ['null, true, true', 'object, true, false', 'object, false, false', 'undefined, true, false', 'null, false, false'],
a: 1,
e: `\`typeof null\` retorna **"object"** (peculiaridade histórica). \`==\` faz **coerção** → true. \`===\` compara tipo e valor → false.` },

{ topic: 'web-js', lvl: 'difícil',
q: `Analise:

\`\`\`
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
\`\`\`

A ordem de impressão é`,
o: ['A, B, C, D', 'A, D, B, C', 'A, D, C, B', 'A, C, D, B', 'D, A, C, B'],
a: 2,
e: `Primeiro o código síncrono (**A, D**). Depois a fila de **microtarefas** (Promises → **C**) e só então as **macrotarefas** (setTimeout → **B**).` },

{ topic: 'web-js', lvl: 'médio',
q: `Em JavaScript, a diferença entre \`let\` e \`var\` é que`,
o: ['let tem escopo de função e var tem escopo de bloco.',
    'let tem escopo de bloco e não pode ser redeclarada no mesmo escopo; var tem escopo de função.',
    'var não sofre hoisting.',
    'let cria constantes imutáveis.',
    'não há diferença prática.'],
a: 1,
e: `**let/const**: escopo de **bloco**, sem redeclaração, sujeitos à *temporal dead zone*. **var**: escopo de **função**, permite redeclaração e é içada (hoisting) com valor undefined.` },

{ topic: 'web-python', lvl: 'médio',
q: `Considere o código Python:

\`\`\`
nums = [3, 1, 4, 1, 5]
print(sorted(set(nums))[1:3])
\`\`\`

A saída é`,
o: ['[1, 3]', '[3, 4]', '[1, 4]', '[3, 4, 5]', '[1, 1, 3]'],
a: 1,
e: `\`set\` elimina duplicatas → {1, 3, 4, 5}; \`sorted\` → [1, 3, 4, 5]; fatiamento \`[1:3]\` (índices 1 e 2) → **[3, 4]**.` },

{ topic: 'web-python', lvl: 'médio',
q: `Em Python, é correto afirmar:`,
o: ['Tuplas são mutáveis e listas imutáveis.',
    'Dicionários aceitam listas como chaves.',
    'Listas são mutáveis; tuplas são imutáveis e podem ser chaves de dicionário se seus elementos forem imutáveis.',
    'A indentação é opcional, usada só por estética.',
    'Strings são mutáveis.'],
a: 2,
e: `**Listas**: mutáveis. **Tuplas**: imutáveis (hashable se os elementos também forem) → podem ser chaves. Chaves de dict devem ser **hashable**. A indentação é **sintática** em Python; strings são **imutáveis**.` },

{ topic: 'web-html', lvl: 'fácil',
q: `No HTML5, o elemento semântico adequado para representar o **conteúdo principal e único** de uma página é`,
o: ['<section>', '<article>', '<main>', '<div>', '<aside>'],
a: 2,
e: `**<main>**: conteúdo principal (um por página visível). **<article>**: conteúdo independente; **<section>**: seção temática; **<aside>**: conteúdo complementar.` },

{ topic: 'web-html', lvl: 'médio',
q: `Em CSS, considerando as regras \`#menu a { color: red; }\`, \`.nav a { color: blue; }\` e \`a { color: green; }\` aplicadas ao mesmo link (que está em \`<nav id="menu" class="nav">\`), a cor resultante é`,
o: ['verde, pois é a regra mais genérica.', 'azul, pois classes têm prioridade sobre IDs.', 'vermelha, pois o seletor com ID tem maior especificidade.', 'a da última regra declarada, independentemente do seletor.', 'preta, por conflito entre regras.'],
a: 2,
e: `Especificidade: **ID (1,0,0)** > **classe (0,1,0)** > **elemento (0,0,1)**. \`#menu a\` = (1,0,1) vence. A ordem de declaração só desempata especificidades iguais.` },

{ topic: 'web-html', lvl: 'médio',
q: `Para atender às diretrizes de acessibilidade (WCAG) em uma imagem informativa, deve-se`,
o: ['omitir o atributo alt para não poluir a leitura.', 'usar o atributo alt com descrição equivalente ao conteúdo da imagem.', 'usar apenas o atributo title.', 'inserir o texto dentro da própria imagem.', 'usar alt="imagem" em todas as imagens.'],
a: 1,
e: `Imagens **informativas** precisam de **texto alternativo** equivalente; imagens **decorativas** usam \`alt=""\` para serem ignoradas por leitores de tela.` },

{ topic: 'web-frameworks', lvl: 'médio',
q: `No Angular, o recurso que permite **injetar** uma classe com lógica reutilizável (por exemplo, chamadas HTTP) em vários componentes é o`,
o: ['Pipe.', 'Service, com injeção de dependências.', 'Diretiva estrutural.', 'Template reference variable.', 'Módulo de rotas.'],
a: 1,
e: `**Services** (\`@Injectable\`) concentram lógica e acesso a dados e são fornecidos pelo **injetor de dependências**. **Pipes** transformam valores no template; **diretivas estruturais** (\`*ngIf\`, \`@if\`) alteram o DOM.` },

{ topic: 'web-frameworks', lvl: 'médio',
q: `No React, o hook utilizado para executar **efeitos colaterais** (como buscar dados após a renderização) é`,
o: ['useState', 'useEffect', 'useMemo', 'useRef', 'useContext'],
a: 1,
e: `**useEffect** executa efeitos após a renderização, com array de dependências controlando quando reexecutar. **useState** guarda estado; **useMemo** memoriza valores; **useRef** guarda referências mutáveis; **useContext** consome contexto.` },

{ topic: 'web-manut', lvl: 'médio',
q: `A atividade de manutenção que adapta um sistema a mudanças no **ambiente** (por exemplo, nova versão do sistema operacional ou do banco de dados), sem alterar sua funcionalidade, é a manutenção`,
o: ['corretiva.', 'adaptativa.', 'perfectiva.', 'preventiva.', 'emergencial.'],
a: 1,
e: `- **Corretiva**: corrige defeitos.
- **Adaptativa**: ajusta a **mudanças de ambiente**.
- **Perfectiva**: melhora ou acrescenta funcionalidades e desempenho.
- **Preventiva**: melhora a manutenibilidade futura (refatoração).` },

{ topic: 'web-manut', lvl: 'médio',
q: `A técnica que altera a **estrutura interna** do código para torná-lo mais legível e fácil de manter, **sem alterar seu comportamento externo**, chama-se`,
o: ['reengenharia reversa.', 'refatoração.', 'ofuscação.', 'depuração.', 'compilação incremental.'],
a: 1,
e: `**Refatoração** (Fowler), apoiada por testes automatizados para garantir que o comportamento se mantenha.` }
]);
