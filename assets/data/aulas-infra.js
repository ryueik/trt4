/* Aulas completas — Contêineres, Nuvem e Redes */

/* ============================ CONTÊINERES ============================ */
A('cont-docker', `
## 1. O problema: “na minha máquina funciona”
Um sistema depende de uma versão exata do Java, de bibliotecas, de variáveis de ambiente e de configurações do sistema operacional. Quando ele sai do computador do desenvolvedor para homologação e produção, algo sempre é diferente — e quebra. O **contêiner** resolve isso **empacotando a aplicação junto com tudo de que ela precisa** (runtime, bibliotecas, configuração) num pacote padronizado que roda igual em qualquer lugar.

Analogia: antes dos contêineres de navio, cada carga tinha um formato e o porto precisava de um procedimento para cada uma. O contêiner padronizou a caixa; o navio não precisa saber o que vai dentro.

## 2. Contêiner × máquina virtual (a comparação mais cobrada)
| | **Máquina virtual (VM)** | **Contêiner** |
|---|---|---|
| O que virtualiza | o **hardware** (via **hypervisor**) | o **sistema operacional** |
| Sistema operacional | cada VM tem um **SO convidado completo**, com kernel próprio | todos **compartilham o kernel do host** |
| Tamanho | gigabytes | megabytes |
| Inicialização | minutos | **segundos ou menos** |
| Isolamento | **mais forte** | mais fraco (o kernel é compartilhado) |
| Densidade | poucas por servidor | muitas por servidor |
- **Hypervisor tipo 1 (bare metal)**: roda direto no hardware (VMware ESXi, Hyper-V, KVM, Xen).
- **Hypervisor tipo 2 (hospedado)**: roda sobre um SO (VirtualBox, VMware Workstation).
- Contêineres e VMs **não são excludentes**: na nuvem, é comum rodar contêineres **dentro** de VMs.

### Como o Linux isola contêineres
- **Namespaces**: dão a cada contêiner sua **própria visão** do sistema — processos (PID), rede (NET), sistema de arquivos (MNT), usuários (USER), hostname (UTS), IPC. É o **isolamento** (“o que o contêiner enxerga”).
- **cgroups (control groups)**: **limitam e contabilizam recursos** — CPU, memória, I/O. É o **controle** (“quanto o contêiner pode usar”).
- **Union filesystem** (OverlayFS): sobrepõe camadas de arquivos.
> [!fcc] Memorize: **namespaces = isolamento**; **cgroups = limitação de recursos**.

## 3. Imagem × contêiner
- **Imagem**: um **modelo somente leitura**, formado por **camadas** empilhadas (cada instrução do Dockerfile gera uma camada). É como a **classe** em orientação a objetos.
- **Contêiner**: uma **instância em execução** de uma imagem, com uma **camada gravável** fina por cima. É como o **objeto**. Uma imagem pode gerar muitos contêineres.
- A camada gravável é **efêmera**: removeu o contêiner, perdeu os dados — por isso existem os **volumes**.
- **Camadas são compartilhadas e cacheadas**: se 10 imagens usam a mesma base, ela é baixada uma vez.

## 4. Arquitetura do Docker
- **Docker Engine**: o **daemon** (\`dockerd\`), que gerencia imagens, contêineres, redes e volumes, e o **cliente** (\`docker\` CLI), que conversa com ele via API REST.
- Por baixo: **containerd** e **runc** (padrões da **OCI — Open Container Initiative**, que padronizou o formato de imagem e o runtime; por isso imagens Docker rodam em Podman, Kubernetes etc.).
- **Registry**: repositório de imagens — **Docker Hub** (público), GitLab Container Registry, Harbor (privado). Imagens são identificadas por **repositório:tag** (ex.: \`postgres:16\`). A tag padrão é **latest** (evite em produção: não é fixa).

## 5. O Dockerfile — instrução por instrução
\`\`\`
FROM eclipse-temurin:21-jre          # imagem base (sempre a primeira instrução)
WORKDIR /app                          # diretório de trabalho
COPY target/app.jar app.jar           # copia do contexto de build para a imagem
ENV SPRING_PROFILES_ACTIVE=prod       # variável de ambiente
EXPOSE 8080                           # documenta a porta (não publica!)
USER 1001                             # não rodar como root
HEALTHCHECK CMD curl -f http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`
| Instrução | Quando age | Função |
|---|---|---|
| **FROM** | build | define a imagem base |
| **RUN** | **build** | executa comandos e **cria uma camada** (instalar pacotes) |
| **COPY** | build | copia arquivos locais |
| **ADD** | build | como COPY, mas também aceita **URL** e **extrai .tar** automaticamente (prefira COPY) |
| **WORKDIR**, **ENV**, **ARG** | build | diretório, variável de ambiente (persiste no contêiner), argumento **só de build** |
| **EXPOSE** | — | **apenas documenta** a porta; quem publica é o \`-p\` |
| **CMD** | **execução** | comando/argumentos **padrão**, **substituível** pelos argumentos do \`docker run\` |
| **ENTRYPOINT** | **execução** | o **executável fixo** do contêiner; os argumentos do run (ou o CMD) são **acrescentados** a ele |
| **VOLUME**, **USER**, **HEALTHCHECK**, **LABEL** | | |
> [!fcc] A tríade que mais cai: **RUN** age no **build**; **CMD** e **ENTRYPOINT** agem na **execução**. Combinação comum: ENTRYPOINT define o programa e CMD os argumentos padrão.

### Boas práticas
- **Multi-stage build**: uma etapa compila (com JDK, Maven) e outra só copia o artefato para uma imagem enxuta (só JRE) → imagem menor e com menos superfície de ataque.
- Imagens base **mínimas e oficiais** (alpine, distroless), com versão fixa.
- Ordenar instruções do que **muda menos** para o que **muda mais** (aproveita o cache).
- **.dockerignore** para não enviar lixo ao contexto. **Nunca** colocar segredos na imagem.
- Rodar como usuário **não root**; um processo por contêiner.

## 6. Comandos essenciais
| Comando | Função |
|---|---|
| \`docker build -t app:1.0 .\` | constrói imagem a partir do Dockerfile do diretório atual |
| \`docker run -d -p 8080:80 --name web nginx\` | cria e inicia contêiner em segundo plano (**-d**), publicando porta **host:contêiner** (**-p**) |
| \`docker ps\` / \`docker ps -a\` | lista contêineres em execução / todos |
| \`docker images\` | lista imagens |
| \`docker exec -it web bash\` | executa um comando **dentro** de um contêiner em execução |
| \`docker logs -f web\` | mostra os logs |
| \`docker stop\` / \`start\` / \`rm\` / \`rmi\` | para / inicia / remove contêiner / remove imagem |
| \`docker pull\` / \`push\` | baixa / envia imagens ao registry |
| \`docker inspect\` | detalhes em JSON |
Opções do run: **-e** (variável), **-v** (volume), **--rm** (remove ao parar), **--network**, **-it** (interativo com terminal), **--restart**.

## 7. Armazenamento
| Tipo | Onde fica | Uso |
|---|---|---|
| **Volume** | área **gerenciada pelo Docker** (/var/lib/docker/volumes) | **forma preferida** de persistir dados (bancos) |
| **Bind mount** | qualquer pasta do **host** | desenvolvimento (montar código-fonte) |
| **tmpfs** | **memória** | dados temporários/sensíveis que não devem ir ao disco |

## 8. Redes
| Driver | Comportamento |
|---|---|
| **bridge** | **padrão**: rede privada no host; contêineres na mesma rede bridge **definida pelo usuário** se acham **pelo nome** (DNS interno) |
| **host** | o contêiner usa **diretamente a rede do host** (sem isolamento de rede) |
| **none** | sem rede |
| **overlay** | conecta contêineres em **vários hosts** (Swarm) |
| macvlan | dá ao contêiner um MAC próprio na rede física |

## 9. Docker Compose
Define **aplicações com vários contêineres** num arquivo YAML (\`compose.yaml\`/\`docker-compose.yml\`) e sobe tudo com \`docker compose up -d\`.
\`\`\`
services:
  api:
    build: .
    ports: ["8080:8080"]
    depends_on: [db]
    environment:
      DB_URL: jdbc:postgresql://db:5432/trt
  db:
    image: postgres:16
    volumes: [dados:/var/lib/postgresql/data]
volumes:
  dados:
\`\`\`
Repare: a API acessa o banco pelo **nome do serviço** (\`db\`). O Compose é ótimo para desenvolvimento e ambientes de um único host; para produção em escala usa-se um **orquestrador** (Kubernetes).
`);

A('cont-k8s', `
## 1. Por que precisamos de um orquestrador
Rodar um contêiner é fácil. Rodar **centenas**, em **dezenas de servidores**, garantindo que se um cair outro suba no lugar, que a carga seja distribuída, que versões novas entrem sem derrubar o sistema e que os serviços se encontrem — isso exige um **orquestrador**. O **Kubernetes (K8s)**, criado pelo Google e mantido pela **CNCF**, é o padrão de mercado.

A ideia central é o **modelo declarativo**: você **declara o estado desejado** (“quero 3 réplicas da API, versão 2.1”) num arquivo YAML, e o Kubernetes trabalha continuamente para que o **estado atual** fique igual ao desejado (**loop de reconciliação**). Se um Pod morre, ele cria outro — isso é a **autorrecuperação (self-healing)**.

## 2. Arquitetura do cluster
Um cluster tem o **plano de controle (control plane)** — o “cérebro” — e os **nós de trabalho (worker nodes)** — os “braços”.
### Componentes do control plane
| Componente | Função |
|---|---|
| **kube-apiserver** | a **porta de entrada**: toda comunicação (kubectl, nós, componentes) passa por essa API REST |
| **etcd** | banco **chave-valor distribuído** que guarda **todo o estado do cluster** (faça backup dele!) |
| **kube-scheduler** | decide **em qual nó** cada Pod novo vai rodar (recursos, afinidades, taints) |
| **kube-controller-manager** | executa os **controladores** que reconciliam o estado (réplicas, nós, endpoints) |
| cloud-controller-manager | integra com o provedor de nuvem (balanceadores, discos) |
### Componentes de cada nó
| Componente | Função |
|---|---|
| **kubelet** | **agente** do nó: garante que os contêineres dos Pods designados estejam rodando e saudáveis |
| **kube-proxy** | regras de **rede** que implementam os Services |
| **container runtime** | quem efetivamente roda os contêineres (**containerd**, CRI-O) via interface **CRI** |
> [!dica] Desde a versão 1.24, o Kubernetes **removeu o dockershim**: não usa mais o Docker Engine diretamente como runtime. Mas **imagens Docker continuam funcionando**, porque seguem o padrão OCI.

## 3. Objetos fundamentais
| Objeto | Para que serve |
|---|---|
| **Pod** | **menor unidade implantável**: um ou mais contêineres que **compartilham IP, rede e volumes** e são agendados juntos. Pods são **efêmeros** (morrem e renascem com outro IP) |
| **ReplicaSet** | garante que **N réplicas** de um Pod estejam rodando |
| **Deployment** | gerencia ReplicaSets para aplicações **sem estado (stateless)**: **rolling update** e **rollback** de versões |
| **StatefulSet** | aplicações **com estado** (bancos): identidade **estável** (nome fixo, ordem de criação) e armazenamento persistente por Pod |
| **DaemonSet** | roda **um Pod em cada nó** (agentes de log como Filebeat, monitoramento) |
| **Job** / **CronJob** | tarefas que **terminam** / tarefas **agendadas** |
| **Service** | **endereço estável** (IP virtual + nome DNS) e **balanceamento** para um conjunto de Pods selecionados por **labels** |
| **Ingress** | roteamento **HTTP/HTTPS** de fora para dentro do cluster por **host e caminho**, com TLS (precisa de um **Ingress Controller**, como Nginx). O sucessor moderno é a **Gateway API** |
| **ConfigMap** | configurações **não sensíveis** |
| **Secret** | dados **sensíveis** — atenção: por padrão só codificados em **Base64**, não criptografados |
| **PersistentVolume (PV)** / **PersistentVolumeClaim (PVC)** | armazenamento: o PV é o disco; o PVC é o **pedido** de armazenamento feito pela aplicação; **StorageClass** provisiona dinamicamente |
| **Namespace** | **divisão lógica** do cluster (por equipe, ambiente), com cotas e permissões próprias |
| **HorizontalPodAutoscaler (HPA)** | aumenta/reduz o número de réplicas conforme CPU, memória ou métricas |

### Labels e selectors
Os objetos se conectam por **rótulos (labels)**: o Service encontra seus Pods porque seleciona \`app: api\`. Não há ligação “fixa” por nome.

## 4. Tipos de Service
| Tipo | Acesso |
|---|---|
| **ClusterIP** (padrão) | **só dentro** do cluster |
| **NodePort** | abre uma porta (faixa **30000–32767**) em **todos os nós** |
| **LoadBalancer** | provisiona um **balanceador externo** do provedor de nuvem |
| **ExternalName** | apelido DNS (CNAME) para um nome externo |

## 5. Um Deployment em YAML (leia devagar)
\`\`\`
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-processos
spec:
  replicas: 3                     # estado desejado: 3 Pods
  selector:
    matchLabels: { app: api }
  template:                       # o “molde” dos Pods
    metadata:
      labels: { app: api }
    spec:
      containers:
      - name: api
        image: registry.trt4/api:2.1
        ports: [{ containerPort: 8080 }]
        resources:
          requests: { cpu: 250m, memory: 256Mi }   # reserva usada pelo scheduler
          limits:   { cpu: 500m, memory: 512Mi }   # teto (passou de memória → OOMKilled)
        readinessProbe:
          httpGet: { path: /actuator/health/readiness, port: 8080 }
        livenessProbe:
          httpGet: { path: /actuator/health/liveness, port: 8080 }
\`\`\`
### Probes (sondas de saúde)
- **Liveness**: “o contêiner está vivo?” Se falhar, o kubelet **reinicia** o contêiner.
- **Readiness**: “está pronto para receber tráfego?” Se falhar, o Pod é **retirado do Service** (sem reiniciar).
- **Startup**: protege aplicações de inicialização lenta.

## 6. kubectl — comandos que caem
\`kubectl apply -f arquivo.yaml\` (cria/atualiza de forma declarativa) · \`kubectl get pods -n namespace\` · \`kubectl describe pod x\` (eventos — ótimo para diagnosticar) · \`kubectl logs x\` · \`kubectl exec -it x -- sh\` · \`kubectl scale deployment api --replicas=5\` · \`kubectl rollout status/undo deployment api\` · \`kubectl delete\`.
Estados de erro comuns: **CrashLoopBackOff** (o contêiner inicia e cai repetidamente), **ImagePullBackOff** (não consegue baixar a imagem), **Pending** (sem nó com recursos), **OOMKilled** (estourou o limite de memória).

## 7. Segurança no Kubernetes
**RBAC** (Role/ClusterRole + RoleBinding — permissões mínimas), **ServiceAccounts** para os Pods, **NetworkPolicies** (firewall entre Pods; por padrão todos se falam), **Pod Security Standards** (privileged, baseline, restricted), criptografia do etcd em repouso, imagens assinadas e escaneadas.

## 8. Rancher
Plataforma **open source** (SUSE) de **gerenciamento de múltiplos clusters Kubernetes** por uma interface web única: cria e importa clusters (em datacenter próprio ou em nuvens), centraliza **autenticação** (integração com AD/LDAP, SSO) e **RBAC**, aplica políticas, oferece catálogo de aplicações (Helm), monitoramento e logs. Distribuições ligadas a ele: **RKE2** (Kubernetes com foco em segurança/conformidade) e **K3s** (Kubernetes leve, para edge e ambientes pequenos).
- **Helm**: o “gerenciador de pacotes” do Kubernetes — **charts** são pacotes de manifestos parametrizados (values.yaml).
`);

A('cont-cloud', `
## 1. O que é computação em nuvem (definição do NIST SP 800-145)
Modelo que permite **acesso pela rede, sob demanda e conveniente**, a um **conjunto compartilhado de recursos computacionais configuráveis** (redes, servidores, armazenamento, aplicações), que podem ser **rapidamente provisionados e liberados** com mínimo esforço de gerenciamento. Em vez de comprar servidores, você **aluga capacidade** e paga pelo uso — trocando **CAPEX** (investimento) por **OPEX** (despesa operacional).

## 2. As 5 características essenciais (decore!)
| Característica | Em palavras simples |
|---|---|
| **Autoatendimento sob demanda** | você mesmo provisiona recursos, sem falar com ninguém do provedor |
| **Amplo acesso à rede** | acessível pela rede, a partir de diversos dispositivos |
| **Agrupamento (pool) de recursos** | o provedor atende vários clientes (**multilocação/multi-tenant**) com recursos físicos compartilhados; você não sabe exatamente onde estão |
| **Elasticidade rápida** | aumentar e reduzir recursos rapidamente, às vezes automaticamente — parece **ilimitado** |
| **Serviço medido** | uso **monitorado e cobrado** (pay-as-you-go), com transparência |
> [!dica] **Escalabilidade** = capacidade de crescer para atender mais carga. **Elasticidade** = crescer **e encolher** automaticamente conforme a demanda. **Vertical** (scale up: máquina maior) × **horizontal** (scale out: mais máquinas).

## 3. Modelos de serviço — quem gerencia o quê
Pense na analogia da pizza: fazer em casa (on-premises), comprar congelada e assar (IaaS), pedir delivery (PaaS) ou comer na pizzaria (SaaS).
| Camada | On-premises | **IaaS** | **PaaS** | **SaaS** |
|---|---|---|---|---|
| Aplicação e dados | cliente | cliente | cliente | **provedor** |
| Runtime e middleware | cliente | cliente | **provedor** | provedor |
| Sistema operacional | cliente | **cliente** | provedor | provedor |
| Virtualização, servidores, rede, armazenamento | cliente | **provedor** | provedor | provedor |
| Exemplos | datacenter próprio | AWS EC2, Azure VMs, Google Compute Engine | Heroku, Azure App Service, Google App Engine, bancos gerenciados | Microsoft 365, Gmail, Salesforce |
Outros “as a Service”: **CaaS** (contêineres — Kubernetes gerenciado: EKS, AKS, GKE), **FaaS** (funções — serverless), DBaaS, BaaS (backend).

## 4. Modelos de implantação
| Modelo | Descrição |
|---|---|
| **Pública** | infraestrutura do provedor, compartilhada com o público em geral |
| **Privada** | **exclusiva de uma organização** (pode estar no próprio datacenter ou num terceiro) |
| **Comunitária** | compartilhada por organizações com interesses comuns (ex.: órgãos do Judiciário) |
| **Híbrida** | **combinação** de duas ou mais nuvens distintas, conectadas e com portabilidade de dados/aplicações |
**Multicloud**: usar **vários provedores públicos** (evita dependência de um só — lock-in).

## 5. Modelo de responsabilidade compartilhada
Segurança na nuvem é **dividida**: o provedor cuida da segurança **da** nuvem (datacenter físico, hardware, hypervisor); o cliente cuida da segurança **na** nuvem (dados, identidades e acessos, configuração, aplicações). Quanto mais se sobe de IaaS para SaaS, **mais** responsabilidade passa ao provedor — mas **dados e acessos são sempre do cliente**. A maioria dos incidentes em nuvem vem de **configuração errada** do cliente (ex.: bucket público).

## 6. Serverless (sem servidor) — o tema do edital
“Serverless” **não significa que não há servidores**: significa que **você não os gerencia**. O provedor provisiona, escala e mantém tudo; você só fornece o código.
### FaaS — Function as a Service
- Você escreve **funções** pequenas que são executadas **em resposta a eventos** (requisição HTTP, arquivo enviado, mensagem numa fila, agendamento). Exemplos: **AWS Lambda**, **Azure Functions**, **Google Cloud Functions/Cloud Run functions**.
- **Escala automática**, inclusive **até zero** (nada rodando = nada pago).
- **Cobrança por execução** (número de invocações e tempo × memória), não por servidor ligado.
- Funções devem ser **stateless** (sem estado entre execuções: estado vai para banco ou cache) e **de curta duração** (há tempo máximo de execução).
### Vantagens e desvantagens
| Vantagens | Desvantagens |
|---|---|
| nada de gerenciar servidores/SO/patches | **cold start**: latência na primeira execução após ociosidade |
| escala automática e fina | **limites** de tempo de execução e recursos |
| paga só pelo uso | **dependência do fornecedor (lock-in)** |
| ótimo para cargas **intermitentes** e orientadas a eventos | depuração e observabilidade mais difíceis; custo pode subir com uso contínuo e intenso |
Também são serverless: bancos (DynamoDB, Aurora Serverless), filas, armazenamento de objetos (S3), API gateways gerenciados — o conceito amplo é “**serviços gerenciados com cobrança por uso e sem provisionamento de capacidade**”.

## 7. Outros conceitos de nuvem
- **Regiões** (áreas geográficas) e **zonas de disponibilidade** (datacenters isolados dentro da região) → alta disponibilidade.
- **Armazenamento**: **objetos** (S3 — arquivos com metadados, acesso via HTTP), **blocos** (discos de VMs), **arquivos** (compartilhamentos NFS/SMB).
- **SLA** (acordo de nível de serviço): 99,9% de disponibilidade ≈ 8,76 h de indisponibilidade por ano; 99,99% ≈ 52 min.
- **Edge computing**: processar perto de onde os dados são gerados. **Cloud native**: aplicações pensadas para a nuvem (contêineres, microsserviços, CI/CD, serviços gerenciados).
`);

/* ============================ REDES ============================ */
A('redes-modelos', `
## 1. Por que modelos em camadas
Enviar uma mensagem pela rede envolve muitos problemas diferentes: transformar bits em sinais elétricos, endereçar o computador certo, achar o caminho entre redes, garantir que nada se perdeu, entender o formato dos dados. Os modelos em camadas **dividem o problema**: cada camada resolve uma parte e **oferece serviços à camada de cima**, usando os serviços da de baixo. Assim é possível trocar uma tecnologia (por exemplo, cabo por Wi-Fi) sem mudar as outras.

## 2. Modelo OSI (ISO) — 7 camadas
Modelo **de referência** (teórico), muito usado para ensinar e para diagnosticar problemas. Frase para decorar de baixo para cima: **“Física, Enlace, Rede, Transporte, Sessão, Apresentação, Aplicação”** (“**F**ui **E**m **R**ecife **T**omar **S**orvete **A**o **A**noitecer”).
| Nº | Camada | Função | PDU (unidade de dados) | Exemplos | Equipamento |
|---|---|---|---|---|---|
| 7 | **Aplicação** | interface com as aplicações do usuário | dados | HTTP, DNS, SMTP, FTP, SSH | gateway de aplicação, WAF |
| 6 | **Apresentação** | formato, **codificação**, **criptografia**, **compressão** | dados | TLS (didaticamente), JPEG, ASCII | |
| 5 | **Sessão** | abrir, manter, sincronizar e encerrar **sessões** (diálogo) | dados | RPC, NetBIOS | |
| 4 | **Transporte** | comunicação **fim a fim** entre processos; **portas**; confiabilidade, controle de fluxo, segmentação | **segmento** (TCP) / datagrama (UDP) | **TCP, UDP** | firewall de estado |
| 3 | **Rede** | **endereçamento lógico (IP)** e **roteamento** entre redes | **pacote** | **IP**, ICMP, OSPF, BGP | **roteador**, switch L3 |
| 2 | **Enlace** | entrega no **mesmo segmento**; **endereço físico (MAC)**; detecção de erros (CRC); controle de acesso ao meio | **quadro (frame)** | Ethernet, Wi-Fi (802.11), PPP, ARP* | **switch**, bridge, placa de rede |
| 1 | **Física** | transmissão de **bits** como sinais elétricos, ópticos ou de rádio; conectores, cabos | **bit** | RJ-45, fibra, codificação | **hub**, repetidor, cabos |
*O **ARP** fica “entre” as camadas 2 e 3 (resolve IP → MAC).
### Encapsulamento
Ao descer, cada camada **acrescenta seu cabeçalho** aos dados de cima: dados → segmento (+ cabeçalho TCP com portas) → pacote (+ cabeçalho IP com endereços) → quadro (+ cabeçalho e trailer Ethernet com MACs) → bits. No destino, o processo inverso é o **desencapsulamento**.

## 3. Arquitetura TCP/IP — o modelo que a internet usa
| TCP/IP (4 camadas) | Corresponde no OSI a |
|---|---|
| **Aplicação** | Aplicação + Apresentação + Sessão (7, 6, 5) |
| **Transporte** | Transporte (4) |
| **Internet** (Rede) | Rede (3) |
| **Acesso à rede** (Enlace/Interface de rede) | Enlace + Física (2, 1) |
Alguns autores (Tanenbaum, Kurose) usam um modelo **híbrido de 5 camadas**: aplicação, transporte, rede, enlace e física.

## 4. TCP × UDP — a comparação obrigatória
| | **TCP** | **UDP** |
|---|---|---|
| Conexão | **orientado à conexão** (three-way handshake) | **sem conexão** |
| Confiabilidade | **confiável**: confirmações (ACK), **retransmissão**, **ordenação** | **não confiável**: sem garantia de entrega nem de ordem |
| Controle | **de fluxo** (janela deslizante) e **de congestionamento** | nenhum |
| Cabeçalho | 20 bytes ou mais | **8 bytes** |
| Velocidade | maior overhead | **mais leve e rápido** |
| Uso típico | web (HTTP/1.1 e 2), e-mail, SSH, transferência de arquivos | **DNS** (consultas), **VoIP**, **streaming**, jogos, DHCP, SNMP, **QUIC/HTTP/3** |

### Three-way handshake (estabelecimento da conexão TCP)
1. Cliente → servidor: **SYN** (“quero conversar; meu número de sequência é x”).
2. Servidor → cliente: **SYN-ACK** (“aceito; o meu é y; recebi x”).
3. Cliente → servidor: **ACK** (“recebi y”). Conexão estabelecida.
O encerramento usa **FIN/ACK** (four-way). Um ataque clássico, o **SYN flood**, envia muitos SYN sem completar o handshake, esgotando recursos do servidor.

## 5. Protocolos de aplicação e portas (sempre cai)
| Protocolo | Porta | Transporte | Função |
|---|---|---|---|
| FTP | **20** (dados) / **21** (controle) | TCP | transferência de arquivos (texto claro) |
| **SSH** / SFTP / SCP | **22** | TCP | acesso remoto **seguro** |
| Telnet | **23** | TCP | acesso remoto **inseguro** (texto claro) |
| **SMTP** | **25** (587 submissão com STARTTLS; 465 SMTPS) | TCP | **envio** de e-mail |
| **DNS** | **53** | **UDP** (consultas) e **TCP** (transferência de zona/respostas grandes) | nomes → IPs |
| DHCP | **67** (servidor) / **68** (cliente) | UDP | configuração automática de IP |
| TFTP | 69 | UDP | transferência simples |
| **HTTP** | **80** | TCP | web |
| POP3 | **110** (995 seguro) | TCP | **baixar** e-mail |
| NTP | 123 | UDP | sincronizar relógios |
| IMAP | **143** (993 seguro) | TCP | **acessar** e-mail no servidor (sincroniza pastas) |
| SNMP | **161** (agente) / **162** (traps) | UDP | gerenciamento de rede |
| LDAP / LDAPS | **389** / **636** | TCP | diretório (Active Directory) |
| **HTTPS** | **443** | TCP (HTTP/3 usa UDP com QUIC) | web segura |
| SMB | 445 | TCP | compartilhamento Windows |
| Syslog | 514 | UDP | logs |
| MySQL / PostgreSQL | 3306 / **5432** | TCP | bancos |
| **RDP** | **3389** | TCP | área de trabalho remota Windows |
Portas **0–1023** são as **bem conhecidas**; 1024–49151, registradas; 49152–65535, dinâmicas/efêmeras (usadas pelo lado cliente).

## 6. Outros protocolos essenciais
- **ICMP** (camada de rede): mensagens de **erro e diagnóstico** — usado por **ping** (echo request/reply) e **traceroute**. Não tem portas.
- **ARP**: descobre o **MAC** a partir do **IP** na rede local (envia um broadcast “quem tem o IP x?”). No IPv6, essa função é do **NDP** (Neighbor Discovery).
- **DNS**: hierarquia (raiz → TLD .br → gov.br → trt4.jus.br). Registros: **A** (nome → IPv4), **AAAA** (→ IPv6), **CNAME** (apelido), **MX** (servidor de e-mail), **NS** (servidor de nomes), **PTR** (reverso: IP → nome), **TXT** (texto, SPF/DKIM/DMARC), **SOA**. Consultas **recursivas** (o resolvedor faz todo o trabalho) e **iterativas**. **DNSSEC** garante autenticidade das respostas.
- **HTTP**: sem estado; versões 1.1 (texto, conexões persistentes), **2** (binário, **multiplexação**, compressão de cabeçalhos) e **3** (sobre **QUIC/UDP**).
`);

A('redes-ip', `
## 1. O endereço IPv4
Um endereço IPv4 tem **32 bits**, escritos como **4 octetos** decimais (0 a 255) separados por pontos: \`192.168.10.70\`. Ele tem duas partes:
- **Parte de rede**: identifica **a rede** (como o nome da rua);
- **Parte de host**: identifica **o equipamento** dentro dela (como o número da casa).
Quem diz onde termina uma e começa a outra é a **máscara de sub-rede**: bits **1** marcam a rede; bits **0**, o host. Na notação **CIDR**, escrevemos só a quantidade de bits 1: \`/24\` = 255.255.255.0.

## 2. Classes (histórico) e endereços especiais
| Classe | 1º octeto | Máscara padrão |
|---|---|---|
| A | 1–126 | /8 |
| B | 128–191 | /16 |
| C | 192–223 | /24 |
| D | 224–239 | multicast |
| E | 240–255 | experimental |
O **CIDR** (Classless Inter-Domain Routing) **aboliu as classes**: hoje qualquer tamanho de prefixo é possível. Mas as faixas abaixo continuam cobradíssimas:
| Faixa | Significado |
|---|---|
| **10.0.0.0/8**, **172.16.0.0/12** (172.16 a 172.31), **192.168.0.0/16** | **privados** (RFC 1918) — não roteáveis na internet |
| **127.0.0.0/8** | **loopback** (127.0.0.1 = a própria máquina) |
| **169.254.0.0/16** | **APIPA/link-local** — atribuído quando o DHCP falha |
| **100.64.0.0/10** | CGNAT (NAT da operadora) |
| 0.0.0.0 | “qualquer endereço” / rota padrão |
| 255.255.255.255 | broadcast limitado |
> [!fcc] Pegadinha: **172.32.0.1 não é privado** (a faixa privada vai só até 172.31.255.255).

## 3. Sub-redes passo a passo — o método do “número mágico”
Este é o tipo de questão que mais aparece. Vamos resolver **172.16.5.70/27**.
1. **Bits de host** = 32 − prefixo = 32 − 27 = **5**.
2. **Tamanho do bloco** = 2^5 = **32** endereços por sub-rede.
3. **Hosts utilizáveis** = 32 − 2 = **30** (tira o endereço de **rede** e o de **broadcast**).
4. **Em que octeto o bloco se repete?** O /27 está no 4º octeto (/25 a /32 → 4º; /17 a /24 → 3º; /9 a /16 → 2º).
5. **Liste os múltiplos do bloco** no octeto: 0, 32, **64**, 96, 128...
6. 70 está entre **64** e 95 → **rede = 172.16.5.64**; **broadcast = 172.16.5.95** (próxima rede − 1); hosts válidos: **.65 a .94**; máscara: 255.255.255.**224** (256 − 32).

### Tabela de consulta rápida (último octeto)
| Prefixo | Máscara | Bloco | Hosts úteis |
|---|---|---|---|
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | .128 | 128 | 126 |
| /26 | .192 | 64 | 62 |
| /27 | .224 | 32 | 30 |
| /28 | .240 | 16 | 14 |
| /29 | .248 | 8 | 6 |
| /30 | .252 | 4 | **2** (enlaces ponto a ponto) |
| /31 | .254 | 2 | 2 (ponto a ponto, RFC 3021) |
| /32 | .255 | 1 | um host só |
**Truque**: máscara do octeto = **256 − bloco**. Fórmula geral: **hosts = 2^h − 2**; **número de sub-redes** ao emprestar n bits = **2^n**.

### Exemplo inverso: dimensionar
“Preciso de sub-redes com **50 hosts** cada.” Menor potência de 2 tal que 2^h − 2 ≥ 50 → 2^6 − 2 = 62 → h = 6 → prefixo **/26**.

### Exemplo com prefixo no 3º octeto
**10.20.37.9/20** → bloco no 3º octeto = 2^(24−20) = **16** → múltiplos: 0, 16, **32**, 48 → rede **10.20.32.0**, broadcast **10.20.47.255**, hosts: 2^12 − 2 = **4094**.

### Sumarização (super-rede)
Agrupar redes contíguas numa só rota: 192.168.0.0/24 + 192.168.1.0/24 + 192.168.2.0/24 + 192.168.3.0/24 = **192.168.0.0/22**.

## 4. NAT (Network Address Translation)
Os endereços IPv4 acabaram. O NAT permite que **muitos equipamentos com IP privado** saiam para a internet **compartilhando um ou poucos IPs públicos**: o roteador troca o endereço de origem e guarda uma tabela para devolver as respostas.
| Tipo | Funcionamento |
|---|---|
| **Estático** | 1 privado ↔ 1 público, fixo (publicar um servidor) |
| **Dinâmico** | privados usam um **pool** de públicos |
| **PAT / NAPT / overload / masquerading** | **muitos privados → um público**, diferenciados por **porta** — o mais comum (roteador doméstico) |
| **Port forwarding (DNAT)** | encaminha uma porta pública para um servidor interno |
Efeitos colaterais: quebra a comunicação **fim a fim** e complica alguns protocolos; NAT **não é** um mecanismo de segurança em si (embora esconda a rede interna).

## 5. IPv6 — o sucessor
| Característica | IPv6 |
|---|---|
| Tamanho | **128 bits**, em **8 grupos de 4 hexadecimais** separados por **dois-pontos** |
| Broadcast | **não existe**: usa **multicast** e **anycast** |
| Configuração | **SLAAC** (autoconfiguração sem estado, via mensagens de anúncio do roteador) ou **DHCPv6** |
| Cabeçalho | **fixo de 40 bytes**, simplificado, com **cabeçalhos de extensão**; sem checksum |
| Fragmentação | **só na origem** (roteadores não fragmentam; usa-se Path MTU Discovery) |
| NAT | **desnecessário** (há endereços de sobra) |
| IPsec | suporte previsto na especificação (originalmente obrigatório, hoje recomendado) |
| ARP | substituído pelo **NDP** (Neighbor Discovery, sobre **ICMPv6**) |

### Regras de abreviação
\`2001:0db8:0000:0000:0000:ff00:0042:8329\`
1. Omitir **zeros à esquerda** de cada grupo: \`2001:db8:0:0:0:ff00:42:8329\`
2. Substituir **uma única** sequência de grupos zerados por **::**: \`2001:db8::ff00:42:8329\`
> [!fcc] O **::** só pode aparecer **uma vez** no endereço (senão seria impossível saber quantos zeros há em cada lugar).

### Tipos de endereço IPv6
| Endereço | Significado |
|---|---|
| **::1/128** | **loopback** |
| **::/128** | não especificado |
| **fe80::/10** | **link-local** (válido só no enlace; toda interface tem um) |
| **fc00::/7** (na prática fd00::/8) | **ULA — unique local** (equivale aos privados) |
| **2000::/3** | **global unicast** (públicos) |
| **ff00::/8** | **multicast** |
O tamanho padrão de uma sub-rede IPv6 é **/64** (64 bits de rede + 64 de identificador de interface).

### Transição IPv4 → IPv6
**Pilha dupla (dual stack)** — os dois protocolos ao mesmo tempo (o mais usado); **túneis** (6to4, 6in4 — IPv6 encapsulado em IPv4); **tradução** (NAT64/DNS64).
`);

A('redes-equip', `
## 1. Equipamentos de rede por camada
| Equipamento | Camada | O que faz | Domínio de colisão | Domínio de broadcast |
|---|---|---|---|---|
| **Hub** | 1 (física) | repete o sinal para **todas** as portas (half-duplex) | **um só** para todas as portas | um só |
| **Repetidor** | 1 | regenera o sinal para alcançar distâncias maiores | — | — |
| **Bridge (ponte)** | 2 | separa segmentos usando MAC | separa | um só |
| **Switch (L2)** | 2 (enlace) | encaminha quadros **só para a porta do destino**, usando a **tabela MAC** | **cada porta é um domínio** | **um só** (exceto com VLANs) |
| **Roteador** | 3 (rede) | encaminha **pacotes entre redes** pelo **IP**, usando a **tabela de roteamento** | separa | **separa** (cada interface é um domínio) |
| **Switch L3 (multicamada)** | 2 e 3 | comutação + roteamento (entre VLANs) em hardware | separa | separa por VLAN |
| **Access point (AP)** | 2 | ponte entre a rede sem fio e a cabeada | | |
| **Modem** | 1 | modula/demodula sinais (DSL, cabo) | | |
| **Firewall**, balanceador, proxy | 3 a 7 | segurança e distribuição | | |
> [!fcc] Frase-chave: **switch separa domínios de colisão; roteador separa domínios de broadcast**. Um hub de 8 portas = 1 domínio de colisão; um switch de 8 portas = 8 domínios de colisão e 1 de broadcast.

### Como o switch aprende
1. Chega um quadro na porta 3, vindo do MAC AA → o switch **anota** “AA está na porta 3” (aprende pela **origem**).
2. O destino BB está na tabela? Envia **só pela porta** dele. Não está? **Inunda (flooding)** todas as portas menos a de origem.
3. Broadcast (FF:FF:FF:FF:FF:FF) sempre vai para todas as portas da VLAN.
Métodos de comutação: **store-and-forward** (recebe o quadro inteiro e confere o CRC — padrão), **cut-through** (começa a enviar ao ler o MAC de destino — menor latência), **fragment-free**.

### Endereço MAC
**48 bits** em hexadecimal (\`00:1A:2B:3C:4D:5E\`): os **24 primeiros** bits são o **OUI** (identificam o fabricante); os 24 seguintes, a placa.

## 2. VLAN (Virtual LAN) — IEEE 802.1Q
Uma VLAN divide **logicamente** um switch (ou vários) em **redes separadas**, como se fossem switches diferentes — **cada VLAN é um domínio de broadcast próprio**. Ex.: VLAN 10 = gabinetes; VLAN 20 = servidores; VLAN 30 = visitantes.
Benefícios: **segurança** (isolamento), **redução de broadcast**, organização por função e não por localização física.
- **Porta de acesso (access)**: pertence a **uma** VLAN; liga computadores; quadros **sem tag**.
- **Porta tronco (trunk)**: transporta **várias VLANs** entre switches; os quadros recebem uma **tag 802.1Q de 4 bytes** com o **VLAN ID (12 bits → até 4094 VLANs)** e a prioridade (802.1p).
- **VLAN nativa**: a que trafega **sem tag** no tronco.
- Para VLANs diferentes conversarem é preciso **roteamento** (roteador ou switch L3 — “router on a stick” com subinterfaces).

## 3. Protocolos de camada 2 importantes
- **STP (Spanning Tree Protocol, 802.1D)**: redes com redundância formam **laços (loops)**, causando **tempestades de broadcast**. O STP **bloqueia portas** redundantes formando uma árvore sem laços, e as reativa se um enlace cair. Elege uma **root bridge** (menor bridge ID). Versões mais rápidas: **RSTP (802.1w)** e **MSTP (802.1s)**.
- **Agregação de enlaces (LACP, 802.3ad/802.1AX)**: junta vários cabos físicos num enlace lógico (mais banda e redundância).
- **802.1X**: autenticação na porta antes de liberar o acesso (com RADIUS).
- **PoE (802.3af/at/bt)**: energia pelo cabo de rede (APs, câmeras, telefones IP).

## 4. Topologias
| Topologia | Como é | Prós e contras |
|---|---|---|
| **Barramento** | todos num único cabo | barata; uma falha no cabo derruba tudo; colisões |
| **Anel** | cada nó ligado a dois vizinhos, formando um círculo | uma falha pode interromper o anel (salvo anel duplo) |
| **Estrela** | todos ligados a um **ponto central** (switch) | **a mais usada** em LANs; fácil de gerenciar; o centro é ponto único de falha |
| **Malha (mesh)** | cada nó ligado a vários (total ou parcial) | **alta redundância**; cara (malha completa com n nós = **n(n−1)/2** enlaces) |
| **Árvore (hierárquica)** | estrelas interligadas | |
| **Híbrida** | combinação | |
**Topologia física** (como os cabos estão) × **lógica** (como os dados circulam): um hub tem topologia física em estrela, mas lógica em barramento.
Classificação por alcance: **PAN** (pessoal), **LAN** (local), **MAN** (metropolitana), **WAN** (longa distância).

## 5. Cabeamento metálico (par trançado)
| Categoria | Velocidade típica | Frequência |
|---|---|---|
| Cat5e | 1 Gbit/s | 100 MHz |
| **Cat6** | 1 Gbit/s (10 Gbit/s até **55 m**) | 250 MHz |
| **Cat6A** | **10 Gbit/s até 100 m** | 500 MHz |
| Cat8 | 25/40 Gbit/s até 30 m (data centers) | 2000 MHz |
- **Distância máxima** do canal Ethernet em par trançado: **100 metros** (90 m de cabo fixo + 10 m de cordões).
- **UTP** (sem blindagem) × **STP/FTP/S/FTP** (blindados — ambientes com interferência eletromagnética).
- Conector **RJ-45**; padrões de crimpagem **T568A** e **T568B**. Cabo **direto** (mesmo padrão nas duas pontas) e **cruzado (crossover)** (A numa ponta, B na outra) — hoje as portas com **Auto-MDIX** dispensam o cruzado.
- **Cabeamento estruturado** (normas **ANSI/TIA-568** e **ABNT NBR 14565**): subsistemas como entrada do edifício, sala de equipamentos, **backbone** (cabeamento vertical, entre andares) e **cabeamento horizontal** (do rack até a tomada da área de trabalho), patch panels, identificação e documentação.
- Padrões Ethernet: **10BASE-T**, **100BASE-TX** (Fast Ethernet), **1000BASE-T** (Gigabit, usa os 4 pares), **10GBASE-T**. Leitura: velocidade + BASE (banda base) + meio.

## 6. Fibra óptica
Transmite **luz** em vez de eletricidade → **imune a interferência eletromagnética**, grandes distâncias, altíssima banda, mais segura (difícil de grampear).
| | **Monomodo (SMF)** | **Multimodo (MMF)** |
|---|---|---|
| Núcleo | **fino (~9 µm)** | **grosso (50 ou 62,5 µm)** |
| Propagação | **um único modo** (feixe quase reto) | **vários modos** (vários caminhos → **dispersão modal**) |
| Fonte de luz | **laser** | LED ou VCSEL |
| Distância | **dezenas de km** | centenas de metros |
| Custo dos equipamentos | maior | menor |
| Uso | **backbones**, WAN, ligações entre prédios | dentro de data centers e prédios |
| Cor típica | amarela | laranja (OM1/OM2), aqua (OM3/OM4), verde-limão (OM5) |
Conectores: **LC** (pequeno, o mais comum hoje), **SC**, ST, MPO. Transceivers **SFP/SFP+/QSFP**. Padrões: 1000BASE-SX (multimodo, curta) e 1000BASE-LX (longa).
> [!dica] Memorize pela lógica: núcleo **mono = fino = um caminho = longe**; **multi = grosso = muitos caminhos = perto**.

## 7. Codificação de sinais (linha)
Como transformar bits em sinais no meio físico:
| Codificação | Regra | Observação |
|---|---|---|
| **NRZ-L** | nível alto = 1, baixo = 0 (por exemplo) | longas sequências iguais perdem a **sincronização** |
| **NRZ-I** | **inverte** o nível quando o bit é **1** | |
| **Manchester** | **transição no meio de cada bit** (ex.: baixo→alto = 1, alto→baixo = 0) | **autossincronizante**; usa o dobro da banda; **Ethernet 10 Mbit/s** |
| **Manchester diferencial** | sempre transição no meio; **transição no início** indica 0 | Token Ring |
| **AMI / bipolar** | 0 = zero volt; 1 = alterna +V e −V | |
| **4B/5B**, 8B/10B, 64B/66B | **codificação de blocos**: grupos de bits mapeados em códigos maiores para garantir transições | Fast Ethernet (4B/5B + MLT-3), Gigabit em fibra (8B/10B), 10G (64B/66B) |
| **PAM-5**, PAM-4 | múltiplos níveis de amplitude por símbolo | Gigabit em cobre (PAM-5) |
Conceitos ligados: **modulação** (ASK — amplitude; FSK — frequência; PSK — fase; **QAM** — amplitude + fase, usada em Wi-Fi e cabo), **multiplexação** (FDM — por frequência; TDM — por tempo; **WDM** — por comprimento de onda, na fibra).
`);

A('redes-wifi', `
## 1. Como funciona uma rede sem fio
Redes sem fio (WLAN) seguem a família **IEEE 802.11** (o nome comercial “Wi-Fi” é da Wi-Fi Alliance). Os dispositivos (**estações**) se comunicam por rádio com um **ponto de acesso (AP)**, que os liga à rede cabeada.
- **SSID**: o **nome da rede**. **BSSID**: o MAC do AP. **BSS** (um AP e seus clientes), **ESS** (vários APs com o mesmo SSID, permitindo **roaming**).
- **Modo infraestrutura** (com AP — o comum) × **ad hoc/IBSS** (dispositivos direto entre si).
- O meio é **compartilhado e half-duplex**, então o Wi-Fi usa **CSMA/CA** (Carrier Sense Multiple Access with **Collision Avoidance**): escuta o meio, espera um tempo aleatório e envia; o receptor confirma com ACK. Pode usar **RTS/CTS** para resolver o problema do **terminal oculto**. (A Ethernet clássica usava **CSMA/CD** — Collision **Detection** —, que não funciona bem no rádio.)

## 2. Faixas de frequência e canais
| Faixa | Características |
|---|---|
| **2,4 GHz** | **maior alcance** e atravessa melhor paredes; **mais interferência** (micro-ondas, Bluetooth) e poucos canais: só **1, 6 e 11** não se sobrepõem (canais de 20 MHz) |
| **5 GHz** | **mais canais** e mais velocidade; **menor alcance**; canais largos (40, 80, 160 MHz); alguns exigem **DFS** (evitar radares) |
| **6 GHz** | só **Wi-Fi 6E e 7**: muito espectro limpo, canais de 160 (e 320 no Wi-Fi 7) MHz, baixa interferência, alcance menor |
Regra física: **frequência maior → mais banda, menos alcance e penetração**.

## 3. Os padrões — tabela que precisa estar na ponta da língua
| Padrão | Nome comercial | Ano | Faixa | Velocidade máx. teórica | Destaques |
|---|---|---|---|---|---|
| 802.11b | (Wi-Fi 1) | 1999 | 2,4 GHz | 11 Mbit/s | DSSS |
| 802.11a | (Wi-Fi 2) | 1999 | 5 GHz | 54 Mbit/s | OFDM |
| 802.11g | (Wi-Fi 3) | 2003 | 2,4 GHz | 54 Mbit/s | OFDM |
| **802.11n** | **Wi-Fi 4** | 2009 | 2,4 e 5 GHz | 600 Mbit/s | **MIMO** (várias antenas), canais de 40 MHz |
| **802.11ac** | **Wi-Fi 5** | 2013 | **só 5 GHz** | ~6,9 Gbit/s | **MU-MIMO no downlink**, canais de 80/160 MHz, 256-QAM |
| **802.11ax** | **Wi-Fi 6** | 2019/2021 | 2,4 e 5 GHz | ~9,6 Gbit/s | **OFDMA**, MU-MIMO **up e downlink**, **1024-QAM**, **BSS Coloring**, **Target Wake Time (TWT)** |
| **802.11ax** | **Wi-Fi 6E** | 2021 | **+ 6 GHz** | ~9,6 Gbit/s | mesmo padrão, **estendido para 6 GHz** |
| **802.11be** | **Wi-Fi 7** | 2024 | 2,4, 5 e 6 GHz | ~46 Gbit/s | canais de **320 MHz**, **4096-QAM**, **MLO (Multi-Link Operation)** |

### Entendendo as tecnologias do Wi-Fi 6 (cai muito)
- **OFDMA** (Orthogonal Frequency Division **Multiple Access**): divide o canal em **sub-portadoras (Resource Units)** e atende **vários clientes ao mesmo tempo** numa mesma transmissão — como um caminhão de entregas que leva encomendas de vários destinatários na mesma viagem, em vez de uma viagem por pacote. Ganho principal: **eficiência em ambientes densos** (muitos dispositivos), menor latência.
- **MU-MIMO** (Multi-User MIMO): várias **antenas** transmitem fluxos espaciais para **vários usuários simultaneamente**.
- **1024-QAM**: cada símbolo carrega **10 bits** (contra 8 do 256-QAM) → ~25% mais velocidade em boas condições de sinal.
- **BSS Coloring**: “pinta” os quadros de cada AP para reduzir interferência entre redes vizinhas no mesmo canal.
- **TWT (Target Wake Time)**: agenda quando cada dispositivo acorda → **economia de bateria** (IoT).
> [!fcc] O foco do Wi-Fi 6 é **eficiência e capacidade em ambientes densos**, não apenas velocidade máxima. E o **Wi-Fi 6E** = Wi-Fi 6 + **faixa de 6 GHz**.

## 4. Segurança em redes sem fio — a evolução
| Protocolo | Criptografia | Situação |
|---|---|---|
| **WEP** | RC4 com IV de 24 bits | **quebrado** — nunca usar |
| **WPA** | **TKIP** (RC4 “remendado”) | obsoleto, inseguro |
| **WPA2** (802.11i) | **AES-CCMP** | ainda muito usado; vulnerável ao ataque **KRACK** (corrigido por atualização) e a **ataques de dicionário offline** contra senhas fracas no modo PSK |
| **WPA3** (2018) | **AES** (CCMP-128; **GCMP-256** no modo Enterprise 192 bits) | **o atual e recomendado** |

### Modos de autenticação
- **Personal (PSK — Pre-Shared Key)**: uma **senha compartilhada** por todos. Ok para casa.
- **Enterprise (802.1X/EAP)**: cada usuário se autentica com **credenciais próprias** (login de rede ou certificado) num servidor **RADIUS**. **É o adequado para órgãos públicos**: revogação individual, auditoria, chaves de sessão diferentes por usuário. Métodos EAP: **EAP-TLS** (certificados nos dois lados — o mais forte), **PEAP** e EAP-TTLS (túnel TLS + senha).

### O que o WPA3 trouxe
- **SAE (Simultaneous Authentication of Equals)**, também chamado **Dragonfly**: substitui o PSK no modo Personal. Protege contra **ataques de dicionário offline** (o atacante não consegue capturar o handshake e testar senhas em casa: cada tentativa exige interagir com o AP) e oferece **sigilo de encaminhamento (forward secrecy)**: capturar o tráfego hoje e descobrir a senha amanhã não permite decifrar o passado.
- **PMF (Protected Management Frames, 802.11w)** **obrigatório**: impede ataques de **desautenticação** forjada.
- **WPA3-Enterprise modo 192 bits** (suíte CNSA) para ambientes de alta segurança.
- **OWE (Opportunistic Wireless Encryption / Wi-Fi Enhanced Open)**: **criptografa redes abertas** (cafés, visitantes) mesmo sem senha.
- **Modo de transição WPA2/WPA3** para compatibilidade com dispositivos antigos.

### Boas práticas e ameaças
**Desabilitar WPS** (o PIN é quebrável por força bruta), senhas fortes, WPA3 ou WPA2-AES (nunca TKIP/WEP), rede de **visitantes isolada** (VLAN separada), detecção de **APs falsos (rogue AP / evil twin)** com **WIPS**, atualizar firmware. **Esconder o SSID** e **filtrar MAC** **não são** proteções eficazes (o SSID aparece nos quadros e o MAC é facilmente falsificado).
`);

A('redes-gerencia', `
## 1. Gerenciamento de redes — o modelo FCAPS (ISO)
As cinco áreas funcionais do gerenciamento:
| Área | Pergunta |
|---|---|
| **F**alhas (Fault) | o que está quebrado? (detectar, isolar, corrigir) |
| **C**onfiguração | como os equipamentos estão configurados? (inventário, versões, backup de configuração) |
| **C**ontabilização (Accounting) | quem usou quanto? |
| **D**esempenho (**P**erformance) | a rede está rápida? (latência, perda, utilização) |
| **S**egurança | quem pode acessar o quê? |

## 2. SNMP (Simple Network Management Protocol)
Protocolo para **monitorar e configurar** equipamentos (switches, roteadores, servidores, impressoras).
- **Gerente (NMS)**: o sistema de monitoramento (Zabbix, PRTG, Nagios) que **pergunta**.
- **Agente**: software no equipamento que **responde**.
- **MIB (Management Information Base)**: o “catálogo” das informações disponíveis, organizadas em árvore; cada item é identificado por um **OID** (ex.: 1.3.6.1.2.1.1.5 = nome do sistema).
- Operações: **GET** (ler), **GETNEXT/GETBULK** (percorrer), **SET** (alterar), **TRAP** (o agente **avisa espontaneamente** o gerente sobre um evento) e **INFORM** (trap com confirmação).
- Portas: **UDP 161** (consultas ao agente) e **UDP 162** (traps para o gerente).
| Versão | Segurança |
|---|---|
| **SNMPv1** | **community string** em **texto claro** |
| **SNMPv2c** | community string em texto claro; acrescentou GETBULK e INFORM |
| **SNMPv3** | **USM (User-based Security Model)**: **autenticação** (HMAC-SHA) e **privacidade/criptografia** (AES); controle de acesso **VACM**; níveis noAuthNoPriv, authNoPriv, **authPriv** |
> [!fcc] Para segurança, **só o SNMPv3**. E troque as communities padrão “public/private”.

## 3. Outras ferramentas de gerência
- **Syslog** (UDP **514**; TLS na 6514): envio centralizado de logs; severidades de **0 (emergência)** a **7 (debug)**.
- **NetFlow/IPFIX/sFlow**: estatísticas de **fluxos** de tráfego (quem fala com quem, quanto) — análise de consumo e de anomalias.
- **NTP** (UDP 123): **sincronizar relógios** — essencial para correlacionar logs, certificados e Kerberos. Hierarquia por **stratum** (0 = relógio de referência).
- **Port mirroring (SPAN)**: copia o tráfego de uma porta para outra, onde um analisador ou IDS captura.

## 4. Diagnóstico — comandos e quando usar cada um
Siga o método de **baixo para cima** no modelo OSI: cabo e luzes (física) → endereço IP e gateway → ping no gateway → ping em IP externo → resolução de nomes → aplicação.
| Comando (Windows / Linux) | O que faz | Exemplo de uso |
|---|---|---|
| **ipconfig** / **ip addr** (antigo ifconfig) | mostra IP, máscara, gateway, MAC | “tenho IP 169.254.x.x?” → o DHCP falhou |
| \`ipconfig /all\`, \`/release\`, \`/renew\`, **\`/flushdns\`** | detalhes; renovar DHCP; limpar cache DNS | |
| **ping** | testa **alcançabilidade** e mede **latência** (ICMP echo) | ping no gateway; perdas de pacote |
| **tracert** / **traceroute** | mostra **cada salto (roteador)** até o destino, usando o **TTL** crescente (cada roteador que descarta o pacote com TTL 0 devolve um ICMP “time exceeded”) | descobrir **onde** a conexão para |
| **pathping** (Win) / **mtr** (Linux) | combina ping e traceroute com estatísticas por salto | |
| **nslookup** / **dig** | consulta **DNS** | “o nome resolve para o IP certo?” |
| **netstat** / **ss** | conexões ativas e **portas em escuta** | \`netstat -an\`, \`ss -tulpn\` |
| **arp -a** / **ip neigh** | tabela ARP (IP ↔ MAC) | detectar ARP spoofing |
| **route print** / **ip route** | tabela de roteamento | |
| **tcpdump** / **Wireshark** | **captura e análise de pacotes** | inspecionar o protocolo em detalhe |
| **nmap** | varredura de hosts e **portas abertas** | inventário e auditoria |
| **telnet host porta** / **nc** / \`Test-NetConnection\` | testa se uma porta TCP aceita conexão | |
| **curl** | testa requisições HTTP | |
> [!dica] Ping falhar **não prova** que o host está fora: firewalls costumam bloquear ICMP. Teste a porta do serviço.

## 5. AAA — Autenticação, Autorização e Contabilização (Accounting)
- **Autenticação**: quem é você?
- **Autorização**: o que você pode fazer?
- **Accounting (contabilização/auditoria)**: o que você fez, quando, por quanto tempo?
| | **RADIUS** | **TACACS+** |
|---|---|---|
| Origem | padrão aberto (IETF) | Cisco (hoje documentado em RFC 8907) |
| Transporte | **UDP** (1812 autenticação / 1813 accounting) | **TCP 49** |
| Criptografia | **apenas a senha** | **todo o corpo do pacote** |
| AAA | **une autenticação e autorização** | **separa** as três funções (autorização por **comando**) |
| Uso típico | **acesso de usuários à rede**: Wi-Fi Enterprise, **802.1X**, VPN | **administração de equipamentos** (quem pode executar qual comando no roteador) |
O **Diameter** é o sucessor do RADIUS (usado em redes de telefonia móvel). O **Kerberos** (tickets, KDC) faz autenticação em domínios Windows/Active Directory.

## 6. IPsec — segurança na camada de rede
Conjunto de protocolos que protege pacotes **IP** (camada 3), sendo a base de muitas **VPNs**, especialmente **site a site** (ligar a sede a um fórum do interior pela internet, com segurança).
### Os dois protocolos de segurança
| | **AH (Authentication Header)** | **ESP (Encapsulating Security Payload)** |
|---|---|---|
| Integridade e autenticidade da origem | **sim** (inclusive de partes do cabeçalho IP) | sim (do payload) |
| **Confidencialidade (criptografia)** | **não** | **sim** |
| Proteção contra repetição (anti-replay) | sim | sim |
| Funciona com NAT? | **não** (o NAT altera o cabeçalho que o AH protege) | **sim** (com NAT-Traversal, encapsulado em UDP 4500) |
| Protocolo IP nº | 51 | 50 |
Na prática usa-se quase sempre o **ESP**.

### Os dois modos
| Modo | O que protege | Uso |
|---|---|---|
| **Transporte** | **só o payload**; o cabeçalho IP original é mantido | comunicação **host a host** |
| **Túnel** | **o pacote IP inteiro**, que é encapsulado num **novo** pacote IP | **VPN gateway a gateway (site a site)** |

### IKE — a negociação das chaves
O **IKE (Internet Key Exchange)**, hoje **IKEv2**, usa **UDP 500** (e 4500 com NAT-T) para autenticar os pares (chave pré-compartilhada ou **certificados**), negociar algoritmos e trocar chaves com **Diffie-Hellman**, criando as **Associações de Segurança (SAs)** — acordos unidirecionais sobre algoritmos e chaves, identificados pelo **SPI**. O IKEv1 tinha **Fase 1** (canal seguro de gerência) e **Fase 2** (SAs para os dados).

### IPsec × TLS/SSL VPN
- **IPsec**: camada **3**, protege todo o tráfego IP; ideal para **site a site**.
- **VPN SSL/TLS**: camada de aplicação/transporte, acessada muitas vezes pelo navegador ou cliente leve, porta 443 (passa por firewalls com facilidade); ideal para **acesso remoto** de usuários. Alternativa moderna: **WireGuard**.
- Tendência atual: **ZTNA (Zero Trust Network Access)** — acesso por aplicação, com verificação contínua, em vez de “colocar o usuário dentro da rede”.
`);
