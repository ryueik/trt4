/* Conhecimentos Específicos — Contêineres/Nuvem e Redes */

/* ======================= CONTÊINERES E NUVEM ======================= */
T({ id: 'cont-docker', disc: 'cont', title: 'Docker',
summary: `
## Contêiner × máquina virtual
| | Máquina virtual | Contêiner |
|---|---|---|
| Isola | hardware virtualizado (hipervisor) | **processos** no mesmo kernel |
| SO convidado | **completo** em cada VM | **compartilha o kernel do host** |
| Tamanho/início | GBs / minutos | MBs / segundos |
| Isolamento | mais forte | mais leve |
Base técnica no Linux: **namespaces** (isolam PID, rede, mount, UTS, IPC, usuário) e **cgroups** (limitam CPU, memória, I/O); sistemas de arquivos em camadas (**OverlayFS**, *union FS*).
Hipervisores: **tipo 1 (bare metal)** — VMware ESXi, KVM, Hyper-V; **tipo 2 (hospedado)** — VirtualBox, VMware Workstation.

## Conceitos do Docker
- **Imagem**: modelo **somente leitura**, composta por **camadas** imutáveis (cada instrução do Dockerfile gera camada); identificada por \`repositório:tag\` (ex.: \`postgres:16\`; sem tag = \`latest\`).
- **Contêiner**: instância **em execução** de uma imagem, com uma **camada gravável** por cima (descartada ao remover o contêiner).
- **Registry**: repositório de imagens (Docker Hub, GitLab Container Registry, Harbor). \`docker pull/push\`.
- **Docker Engine**: *daemon* \`dockerd\` + API REST + CLI \`docker\`; usa **containerd** e **runc** (padrões **OCI**).
- **Volumes**: persistência gerenciada pelo Docker (\`-v dados:/var/lib/postgresql/data\`); **bind mounts** (pasta do host); **tmpfs** (memória).
- **Redes**: **bridge** (padrão; rede isolada no host com NAT), **host** (usa a pilha de rede do host), **none**, **overlay** (multi-host, Swarm). Publicar porta: \`-p 8080:80\` (**host:contêiner**).

## Dockerfile (instruções)
| Instrução | Função |
|---|---|
| \`FROM\` | imagem base (primeira instrução) |
| \`RUN\` | executa comando **na construção** da imagem (gera camada) |
| \`COPY\` / \`ADD\` | copia arquivos (ADD também descompacta tar e aceita URL) |
| \`WORKDIR\` | diretório de trabalho |
| \`ENV\` / \`ARG\` | variável de ambiente (build e execução) / variável **só de build** |
| \`EXPOSE\` | **documenta** a porta (não publica) |
| \`CMD\` | comando **padrão** ao iniciar o contêiner (substituível na linha de comando; só o último vale) |
| \`ENTRYPOINT\` | executável principal fixo (CMD vira argumentos) |
| \`USER\` | usuário de execução (evite root) |
| \`HEALTHCHECK\`, \`VOLUME\`, \`LABEL\` | saúde, ponto de montagem, metadados |

**Boas práticas**: imagens base pequenas (alpine, *distroless*), **multi-stage build** (compila em um estágio, copia só o artefato para a imagem final), ordenar instruções para aproveitar **cache** de camadas, \`.dockerignore\`, não guardar segredos na imagem, rodar como **não root**, varredura de vulnerabilidades (Trivy).

## Comandos
\`docker build -t app:1.0 .\` · \`docker run -d --name app -p 8080:8080 app:1.0\` (\`-d\` *detached*, \`-it\` interativo, \`--rm\` remove ao sair, \`-e\` variável) · \`docker ps\` (\`-a\` inclui parados) · \`docker logs -f\` · \`docker exec -it app sh\` · \`docker stop/start/rm\` · \`docker images\` / \`rmi\` · \`docker inspect\` · \`docker system prune\`.

## Docker Compose
Arquivo **\`compose.yaml\`/\`docker-compose.yml\`** define aplicações **multi-contêiner** (\`services\`, \`networks\`, \`volumes\`, \`depends_on\`, \`environment\`, \`ports\`); \`docker compose up -d\` / \`down\`. Serviços se encontram pelo **nome** na rede criada pelo Compose. Para orquestração em cluster usa-se **Kubernetes** (ou Docker Swarm).
`,
mindmap: `
Docker
  Contêiner × VM
    Compartilha kernel
    Namespaces: isolamento
    cgroups: limites
    VM: SO completo
    Hipervisor tipo 1 e 2
  Conceitos
    Imagem: camadas read-only
    Contêiner: camada gravável
    Registry
    Engine, containerd, runc
    OCI
  Dados
    Volumes
    Bind mounts
    tmpfs
  Redes
    bridge (padrão)
    host
    none
    overlay
    -p host:contêiner
  Dockerfile
    FROM
    RUN: build
    COPY e ADD
    CMD × ENTRYPOINT
    EXPOSE documenta
    ARG × ENV
    Multi-stage
  Comandos
    build, run, ps
    logs, exec
  Compose
    compose.yaml
    services
    up e down
`,
cards: [
  ['Contêiner × VM: o que o contêiner compartilha com o host?', 'O kernel do sistema operacional.'],
  ['RUN × CMD no Dockerfile?', 'RUN executa durante a construção da imagem; CMD define o comando padrão ao iniciar o contêiner.'],
  ['EXPOSE publica a porta?', 'Não; apenas documenta. A publicação é feita com -p no docker run.'],
  ['Em -p 8080:80, qual é a porta do host?', '8080 (formato host:contêiner).'],
  ['Mecanismos do kernel Linux usados pelos contêineres?', 'Namespaces (isolamento) e cgroups (limites de recursos).'],
  ['Para que serve um multi-stage build?', 'Gerar imagem final menor, copiando apenas os artefatos do estágio de compilação.'],
  ['ARG × ENV?', 'ARG existe só no build; ENV fica disponível também em tempo de execução.'],
  ['Rede padrão de um contêiner Docker?', 'bridge.']
]});

T({ id: 'cont-k8s', disc: 'cont', title: 'Kubernetes e Rancher',
diagrams: [{ src: 'kubernetes.svg', cap: 'Arquitetura do Kubernetes: control plane e nós de trabalho' }],
summary: `
## Kubernetes (K8s)
Plataforma de **orquestração de contêineres** de código aberto (origem Google/Borg, mantida pela **CNCF**): implantação, **escalonamento**, **autorrecuperação** (*self-healing*), balanceamento, *rollouts/rollbacks*, descoberta de serviços. Modelo **declarativo**: você descreve o **estado desejado** (YAML) e os *controllers* reconciliam o estado atual.

## Arquitetura do cluster
**Control plane (mestre):**
| Componente | Função |
|---|---|
| **kube-apiserver** | porta de entrada (API REST); todos os componentes e o \`kubectl\` conversam com ele |
| **etcd** | banco **chave-valor** distribuído e consistente que guarda **todo o estado** do cluster |
| **kube-scheduler** | escolhe **em qual nó** cada Pod novo vai rodar (recursos, afinidade, *taints/tolerations*) |
| **kube-controller-manager** | executa os controladores (ReplicaSet, Node, Job…) que levam o atual ao desejado |
| cloud-controller-manager | integra com o provedor de nuvem |

**Nós de trabalho (workers):**
| Componente | Função |
|---|---|
| **kubelet** | agente em cada nó; garante que os contêineres dos Pods estejam rodando e saudáveis |
| **kube-proxy** | regras de rede (iptables/IPVS) que implementam os Services |
| **Container runtime** | executa contêineres (**containerd**, CRI-O) via **CRI** — o *dockershim* foi removido na v1.24 |

## Objetos principais
- **Pod**: **menor unidade implantável**; um ou mais contêineres que compartilham **IP, rede e volumes**; efêmero.
- **ReplicaSet**: mantém N réplicas de um Pod. **Deployment**: gerencia ReplicaSets, com **rolling update** e **rollback** (\`kubectl rollout undo\`) — para apps **stateless**.
- **StatefulSet**: apps **com estado** (identidade de rede estável e volume por réplica — bancos). **DaemonSet**: um Pod **por nó** (agentes de log/monitoramento). **Job** / **CronJob**: tarefas finitas/agendadas.
- **Service**: IP/DNS **estável** e balanceamento para um conjunto de Pods (seleção por **labels**). Tipos: **ClusterIP** (padrão, interno), **NodePort** (porta 30000–32767 em cada nó), **LoadBalancer** (balanceador externo da nuvem), ExternalName.
- **Ingress**: regras HTTP/HTTPS (host/caminho, TLS) para expor Services — exige **Ingress Controller** (Nginx, Traefik) — atua como **proxy reverso**.
- **ConfigMap** (configuração não sensível) e **Secret** (dados sensíveis — apenas **codificados em Base64** por padrão; criptografia em repouso é opcional).
- **Volume**, **PersistentVolume (PV)**, **PersistentVolumeClaim (PVC)**, StorageClass.
- **Namespace**: isolamento lógico de recursos/nomes no cluster. **Labels/selectors**, **annotations**.
- **HorizontalPodAutoscaler (HPA)**: ajusta réplicas por CPU/memória/métricas.
- **Probes**: **liveness** (reinicia se travado), **readiness** (só recebe tráfego quando pronto), startup.
- **RBAC** (Role/ClusterRole + RoleBinding), ServiceAccount, **NetworkPolicy**, *requests/limits* de recursos.

**kubectl**: \`get pods\`, \`describe\`, \`logs\`, \`exec -it\`, \`apply -f arquivo.yaml\` (declarativo), \`scale deployment app --replicas=3\`, \`rollout status/undo\`, \`port-forward\`. **Helm** = gerenciador de pacotes (*charts*).

## Rancher
Plataforma (SUSE) de **gerenciamento multi-cluster de Kubernetes**: cria/importa clusters (em nuvem, *on-premises*, *edge*), **interface web** e API unificadas, **autenticação centralizada** (LDAP/AD, SAML, OIDC/Keycloak) e **RBAC** entre clusters, **catálogo de aplicações** (Helm charts), monitoramento (Prometheus/Grafana), políticas e projetos (agrupam namespaces). Distribuições da SUSE/Rancher: **RKE/RKE2** (Kubernetes certificado, foco em segurança) e **K3s** (Kubernetes leve, para *edge*/IoT). A **PDPJ-Br** usa Rancher para administrar os clusters onde rodam os microsserviços.
`,
mindmap: `
Kubernetes
  Conceito
    Orquestração
    Declarativo
    Self-healing
    CNCF
  Control plane
    kube-apiserver
    etcd: estado
    scheduler: escolhe nó
    controller-manager
  Workers
    kubelet
    kube-proxy
    containerd (CRI)
  Workloads
    Pod: menor unidade
    Deployment: stateless, rolling
    StatefulSet: com estado
    DaemonSet: um por nó
    Job e CronJob
  Rede
    Service
      ClusterIP
      NodePort
      LoadBalancer
    Ingress + controller
  Configuração
    ConfigMap
    Secret: Base64
    PV e PVC
    Namespace
  Operação
    HPA
    Probes liveness/readiness
    RBAC
    kubectl apply
    Helm
  Rancher
    Multi-cluster
    UI e RBAC central
    RKE2 e K3s
    Catálogo Helm
`,
cards: [
  ['Menor unidade implantável no Kubernetes?', 'O Pod.'],
  ['Onde o Kubernetes guarda o estado do cluster?', 'No etcd.'],
  ['Componente que decide em qual nó o Pod será executado?', 'kube-scheduler.'],
  ['Tipo de Service padrão?', 'ClusterIP (acesso interno ao cluster).'],
  ['Objeto adequado para executar um Pod em cada nó?', 'DaemonSet.'],
  ['Secrets do Kubernetes são criptografados por padrão?', 'Não; ficam codificados em Base64 (a criptografia em repouso no etcd é configuração adicional).'],
  ['Liveness × readiness probe?', 'Liveness reinicia o contêiner travado; readiness controla se o Pod recebe tráfego.'],
  ['O que é o Rancher?', 'Plataforma de gerenciamento centralizado de múltiplos clusters Kubernetes.'],
  ['Agente que roda em cada nó e gerencia os Pods?', 'kubelet.']
]});

T({ id: 'cont-cloud', disc: 'cont', title: 'Computação em nuvem, IaaS/PaaS/SaaS e serverless',
diagrams: [{ src: 'nuvem.svg', cap: 'Modelo de responsabilidade: on-premises, IaaS, PaaS e SaaS' }],
summary: `
## Definição (NIST SP 800-145)
Modelo que permite acesso **ubíquo, conveniente e sob demanda**, pela rede, a um conjunto **compartilhado** de recursos computacionais configuráveis, provisionados e liberados rapidamente com mínimo esforço de gerenciamento.

**5 características essenciais:**
1. **Autoatendimento sob demanda** (*on-demand self-service*);
2. **Amplo acesso à rede** (*broad network access*);
3. **Agrupamento de recursos** (*resource pooling*, multilocação/multi-tenant);
4. **Elasticidade rápida** (*rapid elasticity*) — escalar para cima/baixo, aparentando recursos ilimitados;
5. **Serviço mensurado** (*measured service*) — pagamento pelo uso.

## Modelos de serviço
| Modelo | O provedor gerencia | O cliente gerencia | Exemplos |
|---|---|---|---|
| **IaaS** | hardware, rede, virtualização | **SO**, middleware, runtime, dados, aplicação | AWS EC2, Azure VMs, Google Compute Engine, OpenStack |
| **PaaS** | + SO, middleware, runtime | **aplicação e dados** | Heroku, Google App Engine, Azure App Service, OpenShift |
| **SaaS** | tudo | apenas uso/configuração | Microsoft 365, Google Workspace, Gmail |
Outros “XaaS”: **CaaS** (contêineres como serviço — Kubernetes gerenciado: EKS, AKS, GKE), **FaaS** (funções — serverless), DBaaS, BaaS.

## Modelos de implantação
- **Pública**: infraestrutura do provedor, compartilhada por vários clientes.
- **Privada**: uso exclusivo de uma organização (no local ou hospedada).
- **Comunitária**: compartilhada por organizações com interesses comuns (ex.: órgãos do Judiciário).
- **Híbrida**: combinação de duas ou mais, com portabilidade de dados/aplicações (ex.: *cloud bursting*).
- **Multicloud**: uso de vários provedores públicos.

## Modelo de responsabilidade compartilhada
O provedor é responsável pela **segurança “da” nuvem** (infraestrutura física, hipervisor); o cliente pela segurança **“na” nuvem** (dados, identidades, configurações, aplicações). Quanto mais alto o modelo (IaaS → SaaS), mais responsabilidades ficam com o provedor — mas **dados e acessos** são sempre do cliente.

## Serverless
- O provedor gerencia **toda a infraestrutura**; o desenvolvedor foca em **código/funções**.
- **FaaS**: funções **disparadas por eventos** (HTTP, fila, upload de arquivo, agendamento), **efêmeras** e **stateless**, escalonamento **automático até zero**, cobrança **por invocação e tempo de execução**.
- Limitações: **cold start** (latência na primeira chamada), tempo máximo de execução, depuração mais difícil, *vendor lock-in*.
- **Serverless Framework**: ferramenta de código aberto (CLI) para **desenvolver e implantar** aplicações serverless em vários provedores, com o arquivo **\`serverless.yml\`** (define \`service\`, \`provider\`, \`functions\`, \`events\`, \`resources\`); \`serverless deploy\`, \`serverless invoke\`, plugins (ex.: *serverless-offline* para testes locais).

## Implantação e operação em nuvem e contêineres
Infraestrutura como código (Terraform, CloudFormation), *autoscaling*, balanceadores gerenciados, **observabilidade**, **12-Factor App** (configuração em variáveis de ambiente, processos stateless, logs como fluxo de eventos, paridade entre ambientes, *disposability*), *cloud native* (contêineres + microsserviços + orquestração + CI/CD), alta disponibilidade em **zonas de disponibilidade** e **regiões**.
`,
mindmap: `
Computação em nuvem
  NIST 5 características
    Autoatendimento
    Amplo acesso à rede
    Pool de recursos
    Elasticidade rápida
    Serviço mensurado
  Modelos de serviço
    IaaS: cliente cuida do SO
    PaaS: cliente cuida da app
    SaaS: só usa
    CaaS e FaaS
  Implantação
    Pública
    Privada
    Comunitária
    Híbrida
    Multicloud
  Responsabilidade compartilhada
    Provedor: da nuvem
    Cliente: na nuvem
  Serverless
    FaaS por eventos
    Stateless
    Escala a zero
    Cold start
    Serverless Framework
      serverless.yml
      deploy
  Cloud native
    12-Factor
    IaC
    Zonas e regiões
`,
cards: [
  ['Cinco características essenciais da nuvem (NIST)?', 'Autoatendimento sob demanda, amplo acesso à rede, agrupamento de recursos, elasticidade rápida e serviço mensurado.'],
  ['Em IaaS, quem gerencia o sistema operacional?', 'O cliente.'],
  ['Em PaaS, o cliente gerencia o quê?', 'Basicamente as aplicações e os dados.'],
  ['Nuvem compartilhada por órgãos com interesses comuns?', 'Nuvem comunitária.'],
  ['O que é cold start no serverless?', 'Atraso na primeira invocação, quando o provedor precisa inicializar o ambiente da função.'],
  ['Arquivo de configuração do Serverless Framework?', 'serverless.yml.'],
  ['Microsoft 365 é exemplo de qual modelo?', 'SaaS.']
]});

/* ======================= REDES ======================= */
T({ id: 'redes-modelos', disc: 'redes', title: 'Modelo OSI e arquitetura TCP/IP',
diagrams: [{ src: 'osi-tcpip.svg', cap: 'Camadas OSI × TCP/IP, protocolos e PDUs' }],
summary: `
## Modelo OSI (ISO 7498) — 7 camadas
| # | Camada | Função | PDU | Exemplos |
|---|---|---|---|---|
| 7 | **Aplicação** | serviços de rede ao usuário | dados | HTTP, DNS, SMTP, FTP, SSH |
| 6 | **Apresentação** | formato, **criptografia**, compressão, codificação | dados | TLS (parcialmente), JPEG, ASCII |
| 5 | **Sessão** | estabelece/mantém/encerra sessões, sincronização (checkpoints) | dados | RPC, NetBIOS |
| 4 | **Transporte** | comunicação **fim a fim**, segmentação, portas, controle de fluxo e erros | **segmento** (TCP) / datagrama (UDP) | TCP, UDP |
| 3 | **Rede** | **endereçamento lógico** e **roteamento** | **pacote** | IP, ICMP, OSPF, BGP, IPsec |
| 2 | **Enlace** | endereçamento **físico (MAC)**, quadros, detecção de erros (CRC), acesso ao meio | **quadro** | Ethernet, Wi-Fi (802.11), PPP, switches |
| 1 | **Física** | transmissão de **bits**, sinais, conectores, cabos | **bit** | hubs, repetidores, cabos, fibra |
Mnemônico (de 7 a 1): “**A**lguns **P**rofessores **S**ão **T**rabalhadores, **R**espeitosos, **E** **F**elizes”.

## TCP/IP
Modelo prático da Internet. Versões didáticas: **4 camadas** (Aplicação, Transporte, **Internet**, **Acesso à rede/Interface**) ou **5 camadas** (Aplicação, Transporte, Rede, Enlace, Física — Tanenbaum/Kurose). A camada de **aplicação** do TCP/IP engloba aplicação, apresentação e sessão do OSI.

## TCP × UDP
| | TCP | UDP |
|---|---|---|
| Conexão | **orientado a conexão** (*three-way handshake*: **SYN → SYN-ACK → ACK**) | sem conexão |
| Confiabilidade | entrega garantida, **ordenada**, retransmissão, ACKs | melhor esforço, sem garantia |
| Controle | **de fluxo** (janela deslizante) e **de congestionamento** | não |
| Cabeçalho | 20 bytes (mín.) | 8 bytes |
| Uso | HTTP/1.1–2, SSH, SMTP, FTP | DNS (consultas), DHCP, VoIP, streaming, SNMP, **QUIC/HTTP/3** |
Encerramento TCP: FIN/ACK em 4 etapas.

## Portas bem conhecidas (0–1023)
| Porta | Serviço |
|---|---|
| 20/21 | FTP (dados/controle) |
| 22 | SSH / SFTP |
| 23 | Telnet |
| 25 | SMTP (587 submissão, 465 SMTPS) |
| 53 | DNS (UDP e TCP) |
| 67/68 | DHCP (UDP) |
| 80 / 443 | HTTP / HTTPS |
| 110 / 995 | POP3 / POP3S |
| 143 / 993 | IMAP / IMAPS |
| 123 | NTP |
| 161/162 | SNMP / traps (UDP) |
| 389 / 636 | LDAP / LDAPS |
| 3389 | RDP |
| 5432 / 3306 / 1521 | PostgreSQL / MySQL / Oracle |
| 5672 | AMQP (RabbitMQ) |
Registradas: 1024–49151; dinâmicas/efêmeras: 49152–65535.

## Protocolos de aplicação importantes
- **DNS**: resolve nomes ↔ IPs; registros **A** (IPv4), **AAAA** (IPv6), **CNAME** (alias), **MX** (e-mail), **NS**, **PTR** (reverso), **TXT** (SPF, DKIM), **SOA**. Consultas recursivas × iterativas.
- **DHCP**: atribui IP automaticamente — **DORA**: *Discover, Offer, Request, Acknowledge*.
- **HTTP**: sem estado; HTTP/2 (multiplexação, binário), **HTTP/3** (sobre **QUIC/UDP**).
- **ARP** (IP → MAC, na fronteira rede/enlace), **ICMP** (mensagens de erro e \`ping\`/\`traceroute\` — camada de rede).
`,
mindmap: `
Modelos de referência
  OSI 7 camadas
    7 Aplicação: HTTP, DNS
    6 Apresentação: criptografia, formato
    5 Sessão: diálogo
    4 Transporte: segmento, portas
    3 Rede: pacote, IP, roteamento
    2 Enlace: quadro, MAC
    1 Física: bits
  TCP/IP
    Aplicação
    Transporte
    Internet
    Acesso à rede
  TCP
    Orientado a conexão
    SYN, SYN-ACK, ACK
    Confiável e ordenado
    Fluxo e congestionamento
  UDP
    Sem conexão
    DNS, DHCP, VoIP
    QUIC/HTTP3
  Portas
    22 SSH
    53 DNS
    80/443 HTTP/S
    25 SMTP
    3389 RDP
  Protocolos
    DNS: A, AAAA, MX, CNAME
    DHCP: DORA
    ARP: IP → MAC
    ICMP: ping
`,
cards: [
  ['Camada OSI responsável pelo roteamento?', 'Camada 3 — Rede.'],
  ['PDU da camada de enlace?', 'Quadro (frame).'],
  ['Etapas do three-way handshake?', 'SYN → SYN-ACK → ACK.'],
  ['Camada OSI de criptografia e formatação dos dados?', 'Apresentação (camada 6).'],
  ['Porta padrão do SSH?', '22.'],
  ['Registro DNS para servidor de e-mail?', 'MX.'],
  ['Processo DORA pertence a qual protocolo?', 'DHCP (Discover, Offer, Request, Acknowledge).'],
  ['HTTP/3 roda sobre qual protocolo de transporte?', 'QUIC, sobre UDP.']
]});

T({ id: 'redes-ip', disc: 'redes', title: 'IPv4, IPv6, sub-redes, CIDR e NAT',
summary: `
## IPv4
- **32 bits**, notação decimal pontuada (192.168.10.1), ~4,3 bilhões de endereços.
- **Classes (histórico)**: A 1–126 (/8), B 128–191 (/16), C 192–223 (/24), D 224–239 (**multicast**), E 240–255 (experimental). 127.0.0.0/8 = **loopback**.
- **Privados (RFC 1918)**: **10.0.0.0/8**, **172.16.0.0/12** (172.16–172.31), **192.168.0.0/16**. Outros: 169.254.0.0/16 (**APIPA/link-local**, quando o DHCP falha), 100.64.0.0/10 (CGNAT).
- Cabeçalho: 20–60 bytes; campos TTL (decrementado a cada roteador), protocolo, checksum, fragmentação.

## Sub-redes e CIDR
**CIDR** (*Classless Inter-Domain Routing*) substitui as classes pela notação **/prefixo** (bits de rede).
- **Hosts utilizáveis** = 2⁽³²⁻ᵖʳᵉᶠⁱˣᵒ⁾ − 2 (endereço de **rede** e de **broadcast** reservados).
| Prefixo | Máscara | Endereços | Hosts úteis |
|---|---|---|---|
| /24 | 255.255.255.0 | 256 | 254 |
| /25 | 255.255.255.128 | 128 | 126 |
| /26 | 255.255.255.192 | 64 | 62 |
| /27 | 255.255.255.224 | 32 | 30 |
| /28 | 255.255.255.240 | 16 | 14 |
| /29 | 255.255.255.248 | 8 | 6 |
| /30 | 255.255.255.252 | 4 | 2 (enlaces ponto a ponto) |
| /16 | 255.255.0.0 | 65.536 | 65.534 |
| /22 | 255.255.252.0 | 1.024 | 1.022 |

**Método rápido (“número mágico”)**: 256 − valor do octeto interessante da máscara = tamanho do bloco.
*Exemplo:* 192.168.1.77/27 → bloco 32 → redes 0, 32, **64**, 96… → rede **192.168.1.64**, broadcast **192.168.1.95**, hosts .65 a .94.
- **Sumarização (superrede)**: agrupar redes contíguas em um prefixo menor (ex.: 192.168.0.0/24 a 192.168.3.0/24 → 192.168.0.0/22).
- **VLSM**: máscaras de tamanhos diferentes na mesma rede para economizar endereços.

## IPv6
- **128 bits**, 8 grupos de 4 hexadecimais separados por “:” → 2001:0db8:0000:0000:0000:ff00:0042:8329.
- **Abreviação**: omitir **zeros à esquerda** em cada grupo e substituir **uma única** sequência de grupos zerados por **::** → 2001:db8::ff00:42:8329.
- **Tipos**: **unicast**, **multicast** (ff00::/8), **anycast** (entregue ao mais próximo). **Não existe broadcast**.
- Endereços especiais: **::1** (loopback), **::** (não especificado), **fe80::/10** (**link-local**, obrigatório em toda interface), **fc00::/7** (*unique local*, ≈ privado — fd00::/8 na prática), **2000::/3** (global unicast), 2001:db8::/32 (documentação).
- Prefixo típico de sub-rede: **/64** (64 bits de rede + 64 de identificador de interface; **EUI-64** ou aleatório).
- **Autoconfiguração SLAAC** (sem DHCP) e **DHCPv6**; **NDP** (*Neighbor Discovery Protocol*, sobre ICMPv6) substitui o **ARP**.
- Cabeçalho base fixo de **40 bytes**, com cabeçalhos de extensão; **sem checksum** no cabeçalho; fragmentação só na **origem**; campo *Hop Limit* (equivale ao TTL); **IPsec** nativamente previsto.
- Transição: **pilha dupla** (*dual stack*), **túneis** (6to4, Teredo), **tradução** (NAT64/DNS64).

## NAT (Network Address Translation)
Traduz endereços (geralmente privados ↔ público) no roteador/firewall.
- **NAT estático** (1:1 fixo), **NAT dinâmico** (pool de públicos), **PAT / NAT overload / masquerading** (muitos privados → **um IP público**, diferenciados por **porta**) — o mais comum.
- **SNAT** (origem — saída para internet) × **DNAT/port forwarding** (destino — publicar servidor interno).
- Vantagens: economia de IPv4, oculta a topologia interna. Desvantagens: quebra a comunicação fim a fim, dificulta alguns protocolos (IPsec AH, VoIP); **não é mecanismo de segurança** por si só.
`,
mindmap: `
Endereçamento IP
  IPv4
    32 bits
    Classes A, B, C, D, E
    Loopback 127/8
    Privados RFC 1918
      10/8
      172.16/12
      192.168/16
    APIPA 169.254
  CIDR
    /prefixo
    Hosts = 2^n − 2
    Número mágico
    Rede e broadcast
    Sumarização
    VLSM
  IPv6
    128 bits hexadecimal
    :: uma vez só
    Sem broadcast
    Unicast, multicast, anycast
    ::1 loopback
    fe80::/10 link-local
    fc00::/7 unique local
    /64 por sub-rede
    SLAAC e NDP
    Cabeçalho 40 bytes
  NAT
    Estático
    Dinâmico
    PAT / overload
    SNAT × DNAT
    Não é segurança
`,
cards: [
  ['Quantos hosts úteis em uma /26?', '62 (64 − 2).'],
  ['Rede e broadcast de 10.0.0.130/25?', 'Rede 10.0.0.128 e broadcast 10.0.0.255.'],
  ['Faixa privada da classe B (RFC 1918)?', '172.16.0.0/12 (172.16.0.0 a 172.31.255.255).'],
  ['IPv6 possui broadcast?', 'Não; usa multicast e anycast.'],
  ['Prefixo dos endereços link-local IPv6?', 'fe80::/10.'],
  ['Quantas vezes “::” pode aparecer em um endereço IPv6?', 'Apenas uma vez.'],
  ['Protocolo do IPv6 que substitui o ARP?', 'NDP (Neighbor Discovery Protocol), sobre ICMPv6.'],
  ['NAT que mapeia vários IPs privados para um único público usando portas?', 'PAT (NAT overload / masquerading).']
]});

T({ id: 'redes-equip', disc: 'redes', title: 'Equipamentos, VLAN, topologias, cabeamento, fibra e codificação',
summary: `
## Equipamentos de interconexão
| Equipamento | Camada OSI | Comportamento |
|---|---|---|
| **Repetidor** | 1 | regenera/amplifica o sinal |
| **Hub** | 1 | repete o sinal para **todas** as portas; **um único domínio de colisão** (half-duplex) |
| **Bridge (ponte)** | 2 | segmenta domínios de colisão por MAC (poucas portas, software) |
| **Switch** | 2 (L3 se multicamada) | encaminha quadros pelo **MAC** (tabela CAM); **cada porta é um domínio de colisão**; full-duplex; **um domínio de broadcast por VLAN** |
| **Roteador** | 3 | encaminha pacotes entre **redes diferentes** pelo **IP** (tabela de roteamento); **separa domínios de broadcast** |
| **Gateway** | 3 a 7 | interliga redes com **protocolos/arquiteturas diferentes** (tradução); também designa o “gateway padrão” (saída da sub-rede) |
| **Access Point** | 2 | ponte entre rede sem fio e cabeada |
| Modem | 1 | modula/demodula sinais |
Switch: aprende MACs pelos quadros recebidos; quadro com destino desconhecido ou broadcast → **inundação (flooding)**. **STP** (802.1D, *Spanning Tree*) evita **loops** de camada 2 bloqueando portas redundantes (RSTP 802.1w é mais rápido).
**Roteamento**: estático × dinâmico; vetor de distância (**RIP** — métrica saltos, máx. 15) × estado de enlace (**OSPF** — Dijkstra, custo) × vetor de caminho (**BGP** — entre sistemas autônomos, Internet).

## VLAN (IEEE 802.1Q)
Divide **logicamente** um switch em várias redes, cada uma um **domínio de broadcast** separado (segurança, desempenho, organização).
- **Porta de acesso** (*access*/untagged): pertence a uma VLAN; dispositivos finais.
- **Porta tronco** (*trunk*/tagged): transporta várias VLANs entre switches/roteadores, inserindo a **tag 802.1Q de 4 bytes** no quadro Ethernet (inclui **VLAN ID de 12 bits** → 4.094 VLANs úteis, 1–4094; e 3 bits de prioridade **802.1p**/PCP).
- **VLAN nativa**: tráfego **sem tag** no tronco (padrão VLAN 1 — boa prática: alterá-la).
- Comunicação **entre VLANs** exige **roteamento** (roteador *router-on-a-stick* ou switch L3).
- Ataques: *VLAN hopping* (switch spoofing, double tagging).

## Topologias
| Topologia | Características |
|---|---|
| **Barramento** | meio compartilhado; falha no cabo derruba tudo; terminadores |
| **Anel** | dados circulam em um sentido (token ring/FDDI); anel duplo dá redundância |
| **Estrela** | nós ligados a um concentrador central (switch) — **a mais usada em LANs**; falha de um cabo afeta só um nó; o centro é ponto único de falha |
| **Malha** (mesh) | múltiplos caminhos; alta redundância e custo; total: n(n−1)/2 enlaces |
| **Árvore/hierárquica** | estrelas interligadas (núcleo, distribuição, acesso) |
Física × lógica (ex.: estrela física com barramento lógico em redes com hub).
Por abrangência: **PAN, LAN, MAN, WAN**.

## Cabeamento estruturado (ABNT NBR 14565 / ANSI/TIA-568)
Subsistemas: **entrada de facilidades**, **sala de equipamentos**, **cabeamento de backbone** (vertical), **sala/armário de telecomunicações**, **cabeamento horizontal**, **área de trabalho**.
- Cabeamento horizontal em par trançado: **máximo 90 m** de cabo permanente + até 10 m de cordões = **100 m** de canal.
- **Par trançado**: UTP (sem blindagem), FTP/STP (blindado). Categorias: **Cat5e** (1 Gbps, 100 MHz), **Cat6** (1 Gbps; 10 Gbps até ~55 m; 250 MHz), **Cat6A** (10 Gbps a 100 m, 500 MHz), Cat8 (25/40 Gbps, até 30 m). Conector **RJ-45**; padrões de pinagem **T568A** e **T568B** (cabo direto: mesmo padrão nas pontas; cruzado: A em uma, B na outra — hoje dispensável por **Auto-MDIX**).

## Fibra óptica
Transmite **luz** (imune a interferência eletromagnética, maior alcance e banda, segura contra escuta).
| | **Multimodo (MMF)** | **Monomodo (SMF)** |
|---|---|---|
| Núcleo | **maior** (50 ou 62,5 µm) | **menor** (~8–10 µm) |
| Fonte | LED / VCSEL (850 nm) | **laser** (1310/1550 nm) |
| Modos de luz | vários (dispersão modal) | um único |
| Distância | curtas (centenas de metros) | **longas** (dezenas de km) |
| Custo | eletrônica mais barata | maior |
Tipos OM1–OM5 (multimodo) e OS1/OS2 (monomodo). Conectores LC, SC, ST, MPO. Equipamentos ópticos: transceptores **SFP/SFP+**.

## Técnicas de codificação de sinal (codificação de linha)
- **NRZ-L / NRZ-I**: sem retorno a zero; NRZ-I muda o nível ao transmitir “1”. Problema: longas sequências sem transição → perda de **sincronismo**.
- **RZ**: retorna a zero no meio do bit.
- **Manchester**: **transição no meio de cada bit** (autossincronizante); usado no Ethernet 10 Mbps (IEEE: 0 = alto→baixo, 1 = baixo→alto). **Manchester diferencial** (Token Ring).
- **AMI / bipolar**, **MLT-3** (Fast Ethernet 100BASE-TX), **PAM-5** (1000BASE-T), **PAM-16** (10GBASE-T).
- **Codificação de blocos**: **4B/5B**, **8B/10B** (Gigabit em fibra), **64B/66B** (10G) — garantem transições e detecção de erros.
- Modulação analógica: ASK, FSK, PSK, **QAM** (amplitude + fase — Wi-Fi, cabo).
`,
mindmap: `
Infraestrutura física
  Equipamentos
    Repetidor e hub: L1
    Hub: 1 domínio de colisão
    Bridge e switch: L2, MAC
    Switch: colisão por porta
    Roteador: L3, separa broadcast
    Gateway: traduz protocolos
    STP evita loops
  Roteamento
    RIP: saltos
    OSPF: estado de enlace
    BGP: entre ASs
  VLAN 802.1Q
    Domínio de broadcast lógico
    Access × trunk
    Tag 4 bytes
    VLAN ID 12 bits
    VLAN nativa sem tag
    Inter-VLAN exige roteamento
  Topologias
    Barramento
    Anel
    Estrela: mais comum
    Malha: redundância
    Árvore
  Cabeamento estruturado
    NBR 14565 / TIA-568
    Horizontal 90 m + 10 m
    Cat5e, Cat6, Cat6A
    T568A e T568B
  Fibra
    Multimodo: núcleo maior, curta
    Monomodo: laser, longa
    SFP
  Codificação
    NRZ
    Manchester: transição no meio
    MLT-3, PAM-5
    4B/5B, 8B/10B
`,
cards: [
  ['Equipamento que separa domínios de broadcast?', 'Roteador (ou switch L3 entre VLANs).'],
  ['Hub × switch quanto a domínios de colisão?', 'Hub forma um único domínio de colisão; no switch, cada porta é um domínio separado.'],
  ['Tamanho do campo VLAN ID no 802.1Q?', '12 bits (VLANs 1 a 4094).'],
  ['Comprimento máximo do canal horizontal em par trançado?', '100 m (90 m de enlace permanente + 10 m de cordões).'],
  ['Fibra para longas distâncias com laser?', 'Monomodo.'],
  ['Codificação com transição no meio de cada bit?', 'Manchester.'],
  ['Protocolo que evita loops em redes comutadas?', 'STP (Spanning Tree Protocol, 802.1D).'],
  ['Categoria de par trançado para 10 Gbps a 100 m?', 'Cat6A.']
]});

T({ id: 'redes-wifi', disc: 'redes', title: 'Redes sem fio: IEEE 802.11, Wi-Fi 6/6E e WPA2/WPA3',
summary: `
## Padrões IEEE 802.11
| Padrão | Nome Wi-Fi | Frequência | Taxa máx. teórica | Destaques |
|---|---|---|---|---|
| 802.11b | — | 2,4 GHz | 11 Mbps | DSSS |
| 802.11a | — | 5 GHz | 54 Mbps | OFDM |
| 802.11g | — | 2,4 GHz | 54 Mbps | OFDM |
| 802.11n | **Wi-Fi 4** | 2,4 e 5 GHz | 600 Mbps | **MIMO**, canais de 40 MHz |
| 802.11ac | **Wi-Fi 5** | 5 GHz | ~3,5–6,9 Gbps | **MU-MIMO no downlink**, canais de 80/160 MHz, 256-QAM |
| **802.11ax** | **Wi-Fi 6** | 2,4 e 5 GHz | ~9,6 Gbps | **OFDMA**, MU-MIMO (up e downlink), **1024-QAM**, **BSS Coloring**, **TWT** |
| **802.11ax** | **Wi-Fi 6E** | **+ 6 GHz** | ~9,6 Gbps | mesma tecnologia do Wi-Fi 6 estendida à faixa de **6 GHz** (mais canais, menos interferência) |
| 802.11be | Wi-Fi 7 | 2,4/5/6 GHz | ~46 Gbps | canais de 320 MHz, 4096-QAM, MLO |

## Recursos do Wi-Fi 6 (802.11ax) — muito cobrados
- **OFDMA** (*Orthogonal Frequency-Division Multiple Access*): divide o canal em **unidades de recurso (RUs)**, permitindo transmitir para **vários clientes simultaneamente** no mesmo canal — ganho de eficiência em ambientes **densos**.
- **MU-MIMO** bidirecional (até 8 fluxos espaciais).
- **1024-QAM**: mais bits por símbolo (10 bits) → ~25% mais taxa que 256-QAM.
- **BSS Coloring**: marca quadros de cada BSS para reduzir interferência de redes vizinhas no mesmo canal.
- **Target Wake Time (TWT)**: agenda quando o dispositivo acorda → **economia de bateria** (IoT).
- WPA3 obrigatório para certificação Wi-Fi 6.

## Conceitos
- **SSID** (nome da rede), **BSS** (um AP e seus clientes; BSSID = MAC do AP), **ESS** (vários APs com o mesmo SSID, *roaming*), **modo infraestrutura** × **ad hoc** (IBSS).
- Acesso ao meio: **CSMA/CA** (*collision avoidance*), com RTS/CTS opcional — no Wi-Fi não se detecta colisão (≠ CSMA/CD do Ethernet).
- **2,4 GHz**: maior alcance, mais interferência, apenas **3 canais não sobrepostos** (1, 6 e 11). **5 GHz**: mais canais, maior taxa, menor alcance. **6 GHz**: muito espectro limpo, alcance menor.
- Problema do **terminal oculto** (resolvido com RTS/CTS).

## Segurança sem fio
| Padrão | Criptografia | Observações |
|---|---|---|
| **WEP** | RC4 com IV de 24 bits | **quebrado** — não usar |
| **WPA** | **TKIP** (RC4) + MIC | transição; considerado inseguro |
| **WPA2** (802.11i) | **AES-CCMP** | vulnerável a **KRACK** (2017) e ataques de dicionário offline no PSK |
| **WPA3** (2018) | AES-CCMP/**GCMP-256** | **SAE** (*Simultaneous Authentication of Equals*, “Dragonfly”) substitui o PSK — resiste a dicionário offline e provê **sigilo direto (forward secrecy)**; **PMF obrigatório** (*Protected Management Frames*, 802.11w); modo **Enterprise 192 bits** (CNSA); **OWE / Enhanced Open** para redes abertas (criptografia sem senha) |
- Modos **Personal** (PSK/SAE — senha compartilhada) × **Enterprise** (**802.1X** com servidor **RADIUS** e **EAP**: EAP-TLS — certificados nos dois lados, o mais seguro; PEAP-MSCHAPv2; EAP-TTLS).
- **WPS** (PIN) é vulnerável a força bruta — desabilitar. Ocultar SSID e filtro de MAC **não** são proteções efetivas.
`,
mindmap: `
Wi-Fi
  Padrões
    802.11b/g: 2,4 GHz
    802.11a: 5 GHz
    Wi-Fi 4: 802.11n, MIMO
    Wi-Fi 5: 802.11ac, MU-MIMO down
    Wi-Fi 6: 802.11ax
    Wi-Fi 6E: + 6 GHz
    Wi-Fi 7: 802.11be
  Wi-Fi 6
    OFDMA
    MU-MIMO up e down
    1024-QAM
    BSS Coloring
    Target Wake Time
  Conceitos
    SSID, BSS, ESS
    CSMA/CA
    Canais 1, 6, 11
    Terminal oculto e RTS/CTS
  Segurança
    WEP: RC4 quebrado
    WPA: TKIP
    WPA2: AES-CCMP, KRACK
    WPA3
      SAE (Dragonfly)
      Forward secrecy
      PMF obrigatório
      OWE em redes abertas
    Personal × Enterprise
    802.1X + RADIUS + EAP
    WPS: desabilitar
`,
cards: [
  ['Qual tecnologia do 802.11ax permite atender vários clientes simultaneamente dividindo o canal em subportadoras?', 'OFDMA (unidades de recurso).'],
  ['O que diferencia o Wi-Fi 6E do Wi-Fi 6?', 'O suporte à faixa de 6 GHz.'],
  ['Mecanismo do WPA3-Personal que substitui o PSK?', 'SAE (Simultaneous Authentication of Equals).'],
  ['Algoritmo de criptografia do WPA2?', 'AES-CCMP.'],
  ['Protocolo de acesso ao meio no Wi-Fi?', 'CSMA/CA.'],
  ['Canais não sobrepostos em 2,4 GHz?', '1, 6 e 11.'],
  ['Recurso do Wi-Fi 6 que economiza bateria agendando despertares?', 'Target Wake Time (TWT).'],
  ['Método EAP mais seguro, com certificados no cliente e no servidor?', 'EAP-TLS.']
]});

T({ id: 'redes-gerencia', disc: 'redes', title: 'Gerenciamento e diagnóstico de redes, AAA e IPsec',
summary: `
## Gerenciamento de redes
**Modelo FCAPS (ISO)**: **F**alhas, **C**onfiguração, **C**ontabilização (*Accounting*), **D**esempenho (*Performance*) e **S**egurança.

**SNMP** (*Simple Network Management Protocol*, UDP **161** — consultas; **162** — *traps*):
- **Gerente** (NMS) ↔ **agentes** nos dispositivos; **MIB** (base de informações, objetos identificados por **OID**).
- Operações: **Get, GetNext, GetBulk** (v2), **Set**, **Trap** (notificação assíncrona do agente), **Inform** (trap com confirmação, v2c).
- Versões: v1 e **v2c** (autenticação por *community string* em texto claro), **v3** (**autenticação e criptografia**, modelo USM — recomendada).
- Outros: **NetFlow/IPFIX/sFlow** (fluxos de tráfego), **Syslog** (UDP 514), **RMON**, ferramentas Zabbix, Nagios, Prometheus/Grafana, PRTG.

## Ferramentas de diagnóstico
| Ferramenta | Uso |
|---|---|
| \`ping\` | conectividade e latência (ICMP Echo Request/Reply) |
| \`traceroute\` / \`tracert\` | caminho até o destino (usa **TTL** crescente e mensagens ICMP *Time Exceeded*) |
| \`ipconfig\` / \`ip addr\` (\`ifconfig\`) | configuração de interfaces (\`ipconfig /all\`, \`/release\`, \`/renew\`, \`/flushdns\`) |
| \`nslookup\` / \`dig\` | consultas DNS |
| \`netstat\` / \`ss\` | conexões e portas em escuta (\`-an\`, \`-tulpn\`) |
| \`arp -a\` | tabela ARP |
| \`route\` / \`ip route\` | tabela de roteamento |
| \`tcpdump\` / **Wireshark** | captura e análise de pacotes (*sniffer*) |
| \`nmap\` | varredura de portas e serviços |
| \`curl\` / \`telnet host porta\` | teste de serviços/portas TCP |
| \`mtr\`, \`pathping\` | combinação de ping + traceroute |
Metodologia: abordagem pelas camadas OSI (*bottom-up*, *top-down*, dividir para conquistar).

## AAA — Authentication, Authorization and Accounting
- **Autenticação**: quem é você? (senha, certificado, MFA).
- **Autorização**: o que pode fazer? (privilégios, VLAN, comandos).
- **Contabilização (accounting)**: registro do que foi feito (tempo, comandos, volume) — auditoria e cobrança.

| Protocolo | **RADIUS** | **TACACS+** |
|---|---|---|
| Transporte | **UDP** (1812 autenticação / 1813 accounting) | **TCP 49** |
| Criptografia | **só a senha** no pacote | **todo o corpo** do pacote |
| AAA | combina autenticação e autorização | **separa** A, A e A |
| Origem / uso típico | padrão aberto; acesso à rede (802.1X, VPN, Wi-Fi) | Cisco; **administração de dispositivos** (autorização por comando) |
**Diameter**: sucessor do RADIUS (TCP/SCTP, redes móveis 4G/5G). **Kerberos**: autenticação com tíquetes (KDC, TGT), base do Active Directory.

## IPsec — framework de segurança na camada de rede
Conjunto de protocolos que provê **confidencialidade, integridade, autenticação da origem e proteção contra replay** para pacotes IP.
- **AH** (*Authentication Header*, protocolo IP **51**): **integridade e autenticação**, inclusive de partes do cabeçalho IP — **sem criptografia** (sem confidencialidade); incompatível com NAT.
- **ESP** (*Encapsulating Security Payload*, protocolo IP **50**): **criptografia (confidencialidade)** + integridade/autenticação opcional — o mais usado.
- **Modos**:
  - **Transporte**: protege apenas a **carga útil**; o cabeçalho IP original é mantido — comunicação **host a host**.
  - **Túnel**: encapsula **todo o pacote IP original** em um novo pacote com novo cabeçalho — **VPN site a site** entre gateways.
- **IKE** (*Internet Key Exchange* — v1 e **IKEv2**, UDP **500**; **4500** com NAT-T) negocia as **SAs** (*Security Associations*, unidirecionais, identificadas pelo **SPI**) e chaves (Diffie-Hellman). IKEv1: fase 1 (Main/Aggressive mode, canal seguro) e fase 2 (Quick mode, SAs IPsec).
- **SAD** (banco de SAs) e **SPD** (políticas).
`,
mindmap: `
Gerência e segurança de rede
  FCAPS
    Falhas
    Configuração
    Contabilização
    Desempenho
    Segurança
  SNMP
    UDP 161 e 162
    Gerente, agente, MIB, OID
    Get, Set, Trap
    v2c: community
    v3: autenticação e criptografia
  Diagnóstico
    ping
    traceroute: TTL
    nslookup e dig
    netstat e ss
    Wireshark e tcpdump
    nmap
  AAA
    Autenticação
    Autorização
    Accounting
    RADIUS: UDP, só senha cifrada
    TACACS+: TCP 49, tudo cifrado
    Kerberos
  IPsec
    AH: integridade, sem sigilo
    ESP: criptografia
    Transporte: host a host
    Túnel: site a site
    IKE: UDP 500
    SA e SPI
`,
cards: [
  ['Qual versão do SNMP oferece autenticação e criptografia?', 'SNMPv3.'],
  ['Como o traceroute descobre os saltos?', 'Envia pacotes com TTL crescente e recebe ICMP Time Exceeded de cada roteador.'],
  ['RADIUS × TACACS+: qual cifra o pacote inteiro?', 'TACACS+ (TCP 49). O RADIUS cifra apenas a senha.'],
  ['O que significa o terceiro “A” de AAA?', 'Accounting (contabilização/registro das atividades).'],
  ['Protocolo IPsec que fornece confidencialidade?', 'ESP (Encapsulating Security Payload).'],
  ['Modo IPsec usado em VPN site a site entre gateways?', 'Modo túnel.'],
  ['Protocolo que negocia as SAs do IPsec?', 'IKE (UDP 500; 4500 com NAT-T).'],
  ['AH oferece criptografia?', 'Não; só integridade e autenticação.']
]});
