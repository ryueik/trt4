/* Conhecimentos Específicos — Segurança da Informação, Normativos PDPJ/CNJ, Governança e Inglês */

/* ======================= SEGURANÇA DA INFORMAÇÃO ======================= */
T({ id: 'seg-fund', disc: 'seg', title: 'Princípios, ISO/IEC 27001, 27002, 27701, 27005 e CIS Controls v8',
diagrams: [{ src: 'cid.svg', cap: 'Tríade CID e princípios complementares' }],
summary: `
## Princípios fundamentais (tríade CID / CIA)
- **Confidencialidade**: a informação só é acessada por quem é autorizado (criptografia, controle de acesso).
- **Integridade**: a informação não é alterada de forma indevida (hash, assinatura digital, controle de versões).
- **Disponibilidade**: a informação está acessível quando necessário (redundância, backup, proteção contra DoS).
Complementares: **autenticidade** (origem verdadeira), **não repúdio/irretratabilidade** (o autor não pode negar — assinatura digital), **responsabilização (accountability)**, **legalidade**, **privacidade**.
Segurança cibernética amplia o foco ao **ciberespaço** (proteção de sistemas, redes e dados contra ataques digitais).

## Conceitos de risco
**Ativo** (o que tem valor) · **ameaça** (causa potencial de incidente) · **vulnerabilidade** (fraqueza explorável) · **risco** = probabilidade × impacto · **controle** (medida que modifica o risco) · **incidente** (evento indesejado com probabilidade de comprometer o negócio).

## Família ISO/IEC 27000
| Norma | Conteúdo |
|---|---|
| **27000** | visão geral e vocabulário |
| **27001:2022** (ABNT NBR **ISO/IEC 27001:2024**) | **requisitos** de um **SGSI** — é a norma **certificável** |
| **27002:2022** | **código de prática**: orientações para implementar os controles |
| **27005:2022** (ABNT NBR 27005:2023) | **gestão de riscos** de segurança da informação |
| **27701:2019** | extensão para **gestão da privacidade (SGPI/PIMS)** — controladores e operadores de dados pessoais |
| 27017 / 27018 | segurança e privacidade em **nuvem** |
| 27035 | gestão de **incidentes** |

### ISO/IEC 27001 (SGSI)
- Estrutura harmonizada (**Anexo SL**): cláusulas **4 Contexto, 5 Liderança, 6 Planejamento, 7 Apoio, 8 Operação, 9 Avaliação de desempenho, 10 Melhoria**. As cláusulas 4–10 são obrigatórias para certificação.
- Ciclo **PDCA** (Plan-Do-Check-Act) de melhoria contínua.
- **Declaração de Aplicabilidade (SoA)**: lista os controles do Anexo A aplicáveis, justificativas de inclusão/exclusão e status.
- **Anexo A (versão 2022): 93 controles em 4 temas** — **Organizacionais (37)**, **Pessoas (8)**, **Físicos (14)**, **Tecnológicos (34)**. (A versão 2013 tinha 114 controles em 14 domínios.)
- **11 controles novos** em 2022, por exemplo: **inteligência de ameaças**, segurança da informação no uso de **serviços em nuvem**, prontidão de TIC para **continuidade de negócios**, **monitoramento da segurança física**, **gestão de configuração**, **exclusão de informações**, **mascaramento de dados**, **prevenção de vazamento de dados (DLP)**, **atividades de monitoramento**, **filtragem web** e **codificação segura**.
- A **27002:2022** acrescenta **atributos** a cada controle (tipo: preventivo, detectivo, corretivo; propriedades CID; conceitos de cibersegurança **Identificar, Proteger, Detectar, Responder, Recuperar**; capacidades operacionais; domínios).

### ISO/IEC 27005 (riscos)
Processo: **estabelecimento do contexto** → **avaliação de riscos** (= **identificação** + **análise** + **avaliação/“evaluation”**) → **tratamento** → **aceitação** · com **comunicação e consulta** e **monitoramento e análise crítica** contínuos. A versão 2022 alinha-se à **ISO 31000** e admite abordagens **baseadas em eventos** (cenários estratégicos) e **baseadas em ativos**.
**Opções de tratamento**: **modificar/mitigar** (aplicar controles), **reter/aceitar**, **evitar** (eliminar a atividade) e **compartilhar/transferir** (seguro, terceirização). **Risco residual** = o que sobra após o tratamento.

### ISO/IEC 27701 (privacidade)
Estende 27001/27002 com requisitos e controles para **PII**: papéis de **controlador** e **operador**, base para conformidade com **LGPD/GDPR** (anexos de mapeamento).

## CIS Controls v8 (Center for Internet Security, 2021)
**18 controles** priorizados, organizados por **atividades** (não por quem gerencia o dispositivo) e com **153 salvaguardas** divididas em **Implementation Groups**: **IG1** (“higiene cibernética essencial” — 56 salvaguardas, mínimo para qualquer organização), **IG2** e **IG3** (cumulativos, organizações mais complexas).
Os 18: 1 Inventário e controle de **ativos corporativos**; 2 Inventário e controle de **ativos de software**; 3 Proteção de **dados**; 4 **Configuração segura**; 5 Gestão de **contas**; 6 Gestão de **controle de acesso**; 7 Gestão contínua de **vulnerabilidades**; 8 Gestão de **logs de auditoria**; 9 Proteção de **e-mail e navegador**; 10 Defesas contra **malware**; 11 **Recuperação de dados**; 12 Gestão da **infraestrutura de rede**; 13 **Monitoramento e defesa da rede**; 14 **Conscientização** e treinamento; 15 Gestão de **provedores de serviço**; 16 Segurança de **software de aplicação**; 17 Gestão de **resposta a incidentes**; 18 **Testes de intrusão**.
`,
mindmap: `
Fundamentos de SI
  CID
    Confidencialidade
    Integridade
    Disponibilidade
    Autenticidade
    Não repúdio
  Risco
    Ativo
    Ameaça
    Vulnerabilidade
    Probabilidade × impacto
    Controle
  ISO 27001
    Requisitos do SGSI
    Certificável
    Cláusulas 4 a 10
    PDCA
    SoA
    Anexo A: 93 controles
      Organizacionais 37
      Pessoas 8
      Físicos 14
      Tecnológicos 34
  ISO 27002
    Guia de implementação
    Atributos dos controles
  ISO 27005
    Contexto
    Identificar, analisar, avaliar
    Tratar: mitigar, aceitar, evitar, transferir
    Risco residual
  ISO 27701
    Privacidade
    Controlador e operador
  CIS Controls v8
    18 controles
    153 salvaguardas
    IG1, IG2, IG3
`,
cards: [
  ['Qual norma da família 27000 é certificável?', 'A ISO/IEC 27001 (requisitos do SGSI).'],
  ['Quantos controles tem o Anexo A da ISO/IEC 27001:2022 e em quantos temas?', '93 controles em 4 temas: organizacionais, pessoas, físicos e tecnológicos.'],
  ['O que é a Declaração de Aplicabilidade (SoA)?', 'Documento que lista os controles do Anexo A aplicáveis e justifica inclusões e exclusões.'],
  ['Quatro opções de tratamento de riscos?', 'Modificar (mitigar), reter (aceitar), evitar e compartilhar (transferir).'],
  ['Foco da ISO/IEC 27701?', 'Gestão da privacidade de informações (extensão da 27001/27002 para dados pessoais).'],
  ['Quantos controles tem o CIS Controls v8?', '18 controles (153 salvaguardas).'],
  ['O que é o IG1 do CIS v8?', 'Implementation Group 1: higiene cibernética essencial, o mínimo para qualquer organização.'],
  ['Princípio garantido pela assinatura digital, além da integridade?', 'Autenticidade e não repúdio.']
]});

T({ id: 'seg-lgpd', disc: 'seg', title: 'LGPD — Lei Geral de Proteção de Dados (Lei nº 13.709/2018)',
summary: `
## Aplicação (arts. 1º a 4º)
Tratamento de **dados pessoais**, inclusive **nos meios digitais**, por **pessoa natural ou jurídica de direito público ou privado**, para proteger **liberdade, privacidade e livre desenvolvimento da personalidade**. Aplica-se se o tratamento ocorrer no Brasil, visar oferta de bens/serviços a pessoas no Brasil ou os dados forem coletados no país.
**Não se aplica** (art. 4º): uso **particular e não econômico** por pessoa natural; fins **exclusivamente jornalísticos, artísticos** ou **acadêmicos** (estes com ressalvas); **segurança pública, defesa nacional, segurança do Estado, investigação e repressão de infrações penais** (lei específica); dados vindos do exterior sem comunicação/compartilhamento com agentes brasileiros.

## Conceitos (art. 5º)
- **Dado pessoal**: informação relacionada a pessoa natural **identificada ou identificável**.
- **Dado pessoal sensível**: origem **racial ou étnica**, convicção **religiosa**, opinião **política**, filiação a **sindicato** ou organização religiosa, filosófica ou política, dado de **saúde** ou **vida sexual**, dado **genético** ou **biométrico**.
- **Dado anonimizado**: não permite identificação (com meios técnicos razoáveis) — **não é considerado dado pessoal**, salvo se o processo for revertido. **Pseudonimização**: só reidentifica com informação adicional mantida separadamente (continua sendo dado pessoal).
- **Titular** (a pessoa natural), **controlador** (**toma as decisões** sobre o tratamento), **operador** (realiza o tratamento **em nome do controlador**), **encarregado (DPO)** (canal de comunicação entre controlador, titulares e ANPD), **agentes de tratamento** = controlador + operador.
- **ANPD**: Autoridade Nacional de Proteção de Dados — hoje **autarquia de natureza especial** (Lei 14.460/2022).
- **Tratamento**: toda operação (coleta, produção, recepção, classificação, uso, acesso, reprodução, transmissão, armazenamento, eliminação…).

## Princípios (art. 6º) — boa-fé +
**Finalidade**, **adequação**, **necessidade** (minimização), **livre acesso**, **qualidade dos dados**, **transparência**, **segurança**, **prevenção**, **não discriminação**, **responsabilização e prestação de contas**.

## Bases legais (art. 7º — dados pessoais) — 10 hipóteses
1. **consentimento** do titular; 2. cumprimento de **obrigação legal ou regulatória**; 3. pela **administração pública**, para execução de **políticas públicas**; 4. **estudos por órgão de pesquisa** (anonimização sempre que possível); 5. execução de **contrato** ou procedimentos preliminares; 6. **exercício regular de direitos** em processo judicial, administrativo ou arbitral; 7. **proteção da vida** ou da incolumidade física; 8. **tutela da saúde** (por profissionais/serviços de saúde ou autoridade sanitária); 9. **legítimo interesse** do controlador ou de terceiro; 10. **proteção do crédito**.
> [!fcc] **Consentimento não é a única base legal** nem a principal para o poder público. Para dados **sensíveis** (art. 11) **não** existem as bases de **legítimo interesse** e **proteção do crédito**; há, em vez disso, a **garantia da prevenção à fraude e segurança do titular** em processos de identificação e autenticação.
- Consentimento: manifestação **livre, informada e inequívoca**, para finalidade **determinada**; por escrito deve constar em **cláusula destacada**; pode ser **revogado** a qualquer momento (gratuito e facilitado); ônus da prova é do controlador.
- **Crianças** (art. 14): consentimento **específico e em destaque** de pelo menos um dos pais/responsável, observando o **melhor interesse**.

## Direitos do titular (art. 18)
Confirmação da existência de tratamento; **acesso**; **correção**; **anonimização, bloqueio ou eliminação** de dados desnecessários/excessivos; **portabilidade**; eliminação dos dados tratados com consentimento; informação sobre compartilhamento; informação sobre a possibilidade de não consentir; **revogação do consentimento**. Art. 20: **revisão de decisões automatizadas**.

## Poder público (arts. 23 a 32)
Tratamento para atender sua **finalidade pública**, na persecução do **interesse público**, com o objetivo de executar competências legais; deve informar hipóteses de tratamento (transparência) e indicar encarregado. Os **serviços notariais e de registro** e **empresas públicas** em regime concorrencial seguem regras próprias.

## Segurança, incidentes e sanções
- Medidas de segurança técnicas e administrativas; **privacy by design/by default**; **Relatório de Impacto à Proteção de Dados (RIPD)**, especialmente para dados sensíveis.
- **Incidente de segurança** que possa acarretar **risco ou dano relevante** → comunicar à **ANPD e ao titular** em prazo razoável (Resolução CD/ANPD nº 15/2024: **3 dias úteis** em regra).
- **Sanções administrativas (art. 52)**: advertência; **multa simples de até 2% do faturamento** no Brasil, **limitada a R$ 50 milhões por infração**; multa diária; publicização; bloqueio; eliminação; suspensão parcial do banco de dados ou da atividade; proibição parcial ou total. As **multas não se aplicam a entidades e órgãos públicos** (que estão sujeitos às demais sanções).
- Responsabilidade **solidária** do operador quando descumprir a lei ou as instruções do controlador.
- **Transferência internacional** (art. 33): países com nível adequado, cláusulas contratuais padrão, normas corporativas globais, selos, consentimento específico etc.
`,
mindmap: `
LGPD
  Aplicação
    Público e privado
    Meios digitais e físicos
    Não se aplica
      Uso particular
      Jornalístico e artístico
      Segurança pública e defesa
  Conceitos
    Dado pessoal
    Dado sensível
    Anonimizado não é pessoal
    Pseudonimizado é pessoal
    Controlador: decide
    Operador: executa
    Encarregado (DPO)
    ANPD
  Princípios
    Finalidade e adequação
    Necessidade
    Transparência
    Segurança e prevenção
    Responsabilização
  Bases legais
    Consentimento
    Obrigação legal
    Políticas públicas
    Contrato
    Processo judicial
    Legítimo interesse
    Proteção do crédito
  Direitos do titular
    Acesso e correção
    Eliminação
    Portabilidade
    Revogação
    Revisão de decisão automatizada
  Incidentes e sanções
    Comunicar ANPD e titular
    Multa até 2%, máx. R$ 50 mi
    Órgãos públicos sem multa
    RIPD
`,
cards: [
  ['Controlador × operador na LGPD?', 'Controlador toma as decisões sobre o tratamento; operador trata os dados em nome do controlador.'],
  ['Dado anonimizado é dado pessoal?', 'Não, salvo se a anonimização puder ser revertida com esforços razoáveis.'],
  ['Cite três dados pessoais sensíveis.', 'Origem racial/étnica, convicção religiosa, opinião política, saúde, vida sexual, dados genéticos ou biométricos, filiação sindical.'],
  ['Limite da multa simples da LGPD?', 'Até 2% do faturamento no Brasil, limitada a R$ 50 milhões por infração.'],
  ['Órgãos públicos podem receber multa da ANPD?', 'Não; estão sujeitos às demais sanções, mas não às multas.'],
  ['Quais bases legais não existem para dados sensíveis?', 'Legítimo interesse e proteção do crédito.'],
  ['O consentimento pode ser revogado?', 'Sim, a qualquer momento, por procedimento gratuito e facilitado.'],
  ['Quem é o canal entre controlador, titulares e ANPD?', 'O encarregado (DPO).']
]});

T({ id: 'seg-riscos', disc: 'seg', title: 'Gestão de riscos, continuidade, incidentes e backup',
summary: `
## Gestão de riscos aplicada ao suporte e à operação
- Identificar ativos críticos (servidores, sistemas judiciais, bancos de dados), ameaças e vulnerabilidades; analisar probabilidade e impacto; priorizar com **matriz de riscos**.
- Análise **qualitativa** (escalas alto/médio/baixo) × **quantitativa**: **SLE** = valor do ativo × fator de exposição; **ALE** = SLE × **ARO** (taxa anual de ocorrência).
- Gestão de **mudanças**, de **configuração**, de **patches** e de **vulnerabilidades**; separação de ambientes; menor privilégio. Referências: ISO 27005, ISO 31000, NIST RMF, **ITIL 4** (práticas de gerenciamento de incidentes, problemas e mudanças).

## Continuidade de negócios (ISO 22301)
- **BIA** (*Business Impact Analysis*): identifica processos críticos, impactos da interrupção e define:
  - **RTO** (*Recovery Time Objective*): **tempo máximo** aceitável para restaurar o serviço;
  - **RPO** (*Recovery Point Objective*): **perda máxima de dados** tolerada, medida em tempo (define a **frequência de backup**);
  - **MTPD/MAO**: período máximo tolerável de interrupção.
- Planos: **PCN** (continuidade de negócios), **PRD/DRP** (recuperação de desastres — foco em TI), **PGC** (gerenciamento de crises), plano de contingência. Devem ser **testados** (mesa/tabletop, simulação, teste completo) e atualizados.
- **Sites alternativos**: **hot site** (pronto, dados replicados — recuperação em minutos/horas, caro), **warm site** (parcialmente equipado), **cold site** (só infraestrutura básica — mais barato e lento).
- Alta disponibilidade: redundância (RAID, clusters, *failover*), replicação, múltiplas zonas.

## Tratamento e resposta a incidentes
Ciclo **NIST SP 800-61**: **1) Preparação** → **2) Detecção e análise** → **3) Contenção, erradicação e recuperação** → **4) Atividades pós-incidente** (lições aprendidas).
(ISO 27035: planejar e preparar; detectar e reportar; avaliar e decidir; responder; lições aprendidas.)
- **ETIR / CSIRT**: Equipe de Tratamento e Resposta a Incidentes em Redes — no Judiciário, prevista pela **ENSEC-PJ** (Res. CNJ 396/2021).
- **Cadeia de custódia** e preservação de evidências (logs, imagens forenses, *hash* das evidências); ordem de volatilidade (memória antes do disco).
- Comunicação: à alta administração, ao **CNJ/CPTRIC-PJ**, à ANPD e aos titulares quando envolver dados pessoais (LGPD), às autoridades policiais quando houver crime.

## Backup e recuperação
| Tipo | Copia | Limpa o bit de arquivo? | Restauração |
|---|---|---|---|
| **Completo (full)** | tudo | sim | só o último completo |
| **Incremental** | alterações desde o **último backup de qualquer tipo** | sim | último completo + **todos** os incrementais seguintes (backup rápido, restauração lenta) |
| **Diferencial** | alterações desde o **último completo** | **não** | último completo + **o último** diferencial (cresce a cada dia; restauração mais rápida) |
| Sintético / incremental contínuo | consolida completos a partir de incrementais | — | — |
| Snapshot | imagem pontual (volume/VM) | — | rápida, mas **não substitui** backup externo |
- **Regra 3-2-1**: **3** cópias dos dados, em **2** mídias diferentes, **1** fora do local (*offsite*). Variante **3-2-1-1-0**: + 1 cópia **offline/imutável** (*air-gapped*, proteção contra **ransomware**) + **0** erros na verificação.
- **Testar a restauração** periodicamente; criptografar backups; controlar acesso; definir retenção (GFS: avô-pai-filho).
- Backup ≠ **replicação** (replicação também copia corrupções e exclusões) ≠ **RAID** (RAID protege contra falha de disco, não contra exclusão ou ransomware). RAID 0 (striping, sem redundância), 1 (espelhamento), 5 (paridade distribuída, tolera 1 disco), 6 (dupla paridade, tolera 2), 10 (espelho + striping).
`,
mindmap: `
Riscos e continuidade
  Gestão de riscos
    Matriz probabilidade × impacto
    Qualitativa × quantitativa
    SLE e ALE
    Mudanças e patches
  Continuidade
    ISO 22301
    BIA
    RTO: tempo para voltar
    RPO: dados que posso perder
    PCN, DRP, crises
    Testes
    Hot, warm, cold site
  Incidentes
    NIST 800-61
      Preparação
      Detecção e análise
      Contenção, erradicação, recuperação
      Pós-incidente
    ETIR/CSIRT
    Cadeia de custódia
    Comunicar ANPD
  Backup
    Completo
    Incremental: desde o último
    Diferencial: desde o completo
    3-2-1
    Imutável contra ransomware
    Testar restauração
  RAID
    0 sem redundância
    1 espelho
    5 paridade
    6 dupla paridade
    Não é backup
`,
cards: [
  ['RTO × RPO?', 'RTO: tempo máximo para restabelecer o serviço. RPO: quantidade máxima de dados (em tempo) que se pode perder.'],
  ['Restauração com backup completo + diferenciais exige quais conjuntos?', 'O último completo e o último diferencial.'],
  ['Restauração com backup completo + incrementais exige quais conjuntos?', 'O último completo e todos os incrementais posteriores, em ordem.'],
  ['O que diz a regra 3-2-1?', '3 cópias, em 2 mídias diferentes, 1 fora do local.'],
  ['Fases do ciclo de resposta a incidentes do NIST SP 800-61?', 'Preparação; detecção e análise; contenção, erradicação e recuperação; atividades pós-incidente.'],
  ['Hot site × cold site?', 'Hot site está pronto para operar quase imediatamente; cold site tem só a infraestrutura básica.'],
  ['RAID substitui backup?', 'Não; RAID protege contra falha de disco, não contra exclusão, corrupção ou ransomware.'],
  ['Qual análise define RTO e RPO?', 'A BIA (Análise de Impacto no Negócio).']
]});

T({ id: 'seg-cripto', disc: 'seg', title: 'Criptografia, hash, assinatura digital, ICP e TLS 1.2',
diagrams: [{ src: 'cripto.svg', cap: 'Criptografia simétrica, assimétrica e assinatura digital' }],
summary: `
## Criptografia simétrica (chave secreta)
A **mesma chave** cifra e decifra. Rápida, ideal para grandes volumes; problema: **distribuição segura da chave** (n participantes → n(n−1)/2 chaves).
| Algoritmo | Observações |
|---|---|
| **AES** (Rijndael) | padrão atual (NIST, 2001); **bloco de 128 bits**; chaves de **128, 192 ou 256 bits** (10, 12, 14 rodadas) |
| DES | bloco 64 bits, chave efetiva 56 bits — **inseguro** |
| 3DES | três aplicações do DES — legado, depreciado |
| Blowfish/Twofish, IDEA | outros cifradores de bloco |
| **ChaCha20** | cifrador de **fluxo** moderno (TLS 1.3); RC4 é fluxo **inseguro** |
**Modos de operação**: ECB (inseguro — blocos iguais geram cifras iguais), CBC (encadeado, usa IV), CTR, **GCM** (cifração **autenticada** — AEAD: confidencialidade + integridade).

## Criptografia assimétrica (chave pública)
Par de chaves: **pública** (divulgada) e **privada** (secreta).
- **Confidencialidade**: cifrar com a **pública do destinatário** → só a **privada do destinatário** decifra.
- **Assinatura**: assinar com a **privada do remetente** → qualquer um verifica com a **pública do remetente**.
- Algoritmos: **RSA** (fatoração de primos; chaves ≥ 2048 bits), **Diffie-Hellman** (**troca/acordo de chaves**, não cifra dados), **ECC** (curvas elípticas — chaves menores com segurança equivalente: ECDSA, ECDH), ElGamal, DSA.
- É **lenta** → na prática usa-se **criptografia híbrida**: assimétrica para trocar uma **chave de sessão** simétrica (TLS, PGP).

## Criptografia pós-quântica (PQC)
Computadores quânticos com o **algoritmo de Shor** quebrariam RSA, DH e ECC; o **algoritmo de Grover** reduz pela metade a segurança efetiva das chaves simétricas (por isso AES-256 é recomendado). Ameaça atual: **“colete agora, decifre depois”** (*harvest now, decrypt later*).
O **NIST** publicou (ago/2024) os primeiros padrões:
- **FIPS 203 — ML-KEM** (baseado no **CRYSTALS-Kyber**): **encapsulamento de chaves** (reticulados);
- **FIPS 204 — ML-DSA** (baseado no **CRYSTALS-Dilithium**): **assinatura digital** (reticulados);
- **FIPS 205 — SLH-DSA** (baseado no **SPHINCS+**): assinatura baseada em **hash**;
- **FN-DSA (Falcon)** em padronização e **HQC** selecionado (2025) como KEM alternativo.
Estratégia: **agilidade criptográfica** e modos **híbridos** (clássico + PQC — ex.: X25519MLKEM768 no TLS 1.3).

## Funções de hash
Geram um **resumo de tamanho fixo**, **unidirecional** (não reversível), determinístico; pequena alteração na entrada muda totalmente a saída (**efeito avalanche**). Propriedades: resistência à **pré-imagem**, à **segunda pré-imagem** e a **colisões**.
| Algoritmo | Saída | Situação |
|---|---|---|
| MD5 | 128 bits | **quebrado** (colisões) |
| SHA-1 | 160 bits | **depreciado** (colisão prática — SHAttered, 2017) |
| **SHA-256 / SHA-512** (SHA-2) | 256 / 512 bits | seguros, amplamente usados |
| **SHA-3** (Keccak) | variável | padrão alternativo |
- Usos: integridade de arquivos, assinatura digital, armazenamento de **senhas** (com **salt** e algoritmos lentos: **bcrypt, scrypt, Argon2, PBKDF2** — nunca hash simples), blockchain.
- **HMAC**: hash + chave secreta → **integridade e autenticidade** (não oferece não repúdio, pois a chave é compartilhada).

## Assinatura digital
1) Calcula-se o **hash** do documento; 2) o hash é **cifrado com a chave privada** do signatário; 3) o verificador decifra com a **chave pública** e compara com o hash que ele mesmo calcula.
Garante **autenticidade, integridade e não repúdio** — **não** garante confidencialidade.

## Certificado digital e ICP/PKI
- **Certificado X.509**: vincula uma **chave pública** a uma identidade; contém titular, chave pública, validade, número de série, emissor e **assinatura da AC** emissora.
- **ICP-Brasil** (MP 2.200-2/2001): **AC-Raiz** (operada pelo **ITI**) → **ACs** (Autoridades Certificadoras) → **ARs** (Autoridades de Registro, identificam o titular presencialmente ou por videoconferência). Documentos assinados com certificado ICP-Brasil têm **presunção de veracidade** (validade jurídica).
- Tipos: **A1** (gerado e armazenado em **software**, validade de **1 ano**), **A3** (gerado e armazenado em **hardware** criptográfico — token/cartão — validade de 1 a 5 anos); séries S (sigilo) e T (carimbo do tempo).
- **Revogação**: **LCR/CRL** (lista publicada periodicamente) e **OCSP** (consulta online em tempo real).
- No Judiciário: **PJe** usa certificados ICP-Brasil para assinatura de peças e atos (Lei 11.419/2006 — processo eletrônico).

## TLS 1.2 (RFC 5246)
Protocolo que protege a comunicação na camada de transporte/aplicação (**HTTPS** = HTTP sobre TLS, porta 443).
- **Handshake** (resumo): ClientHello (versões, **cipher suites**, aleatório) → ServerHello + **Certificado** do servidor → troca de chaves (**ECDHE** recomendado — garante **Perfect Forward Secrecy**; troca por RSA não tem PFS) → ChangeCipherSpec + Finished → dados cifrados com a **chave de sessão simétrica**.
- **Cipher suite** (ex.: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256): troca de chave (ECDHE) + autenticação (RSA) + cifra simétrica (AES-128-GCM) + hash/PRF (SHA-256).
- Boas práticas: desabilitar SSL 2/3, TLS 1.0/1.1, RC4, 3DES, modo CBC com SHA-1, compressão (CRIME); preferir **AEAD (GCM/ChaCha20-Poly1305)** e **ECDHE**; **HSTS**; certificados com chaves fortes.
- **TLS 1.3** (RFC 8446): handshake de 1-RTT (0-RTT opcional), somente cifras AEAD e troca com forward secrecy, remove RSA estático.
- **mTLS**: autenticação mútua (cliente também apresenta certificado).
`,
mindmap: `
Criptografia
  Simétrica
    Mesma chave
    AES: bloco 128, chaves 128/192/256
    DES e 3DES: legado
    ChaCha20
    Modos: ECB ruim, GCM autenticado
  Assimétrica
    Pública e privada
    Sigilo: pública do destino
    Assinatura: privada do remetente
    RSA, ECC
    Diffie-Hellman: troca de chaves
    Híbrida
  Pós-quântica
    Shor quebra RSA/ECC
    Grover: AES-256
    ML-KEM (Kyber)
    ML-DSA (Dilithium)
    SLH-DSA (SPHINCS+)
    Harvest now, decrypt later
  Hash
    Tamanho fixo
    Irreversível
    MD5 e SHA-1 quebrados
    SHA-256, SHA-3
    Senhas: bcrypt, Argon2 + salt
    HMAC
  Assinatura digital
    Hash + chave privada
    Autenticidade
    Integridade
    Não repúdio
  ICP-Brasil
    AC-Raiz: ITI
    AC e AR
    X.509
    A1 software, A3 hardware
    LCR e OCSP
  TLS 1.2
    Handshake
    Cipher suite
    ECDHE: forward secrecy
    AES-GCM
    TLS 1.3
`,
cards: [
  ['Para enviar mensagem sigilosa com criptografia assimétrica, cifra-se com…', 'A chave pública do destinatário.'],
  ['Assinatura digital usa qual chave para assinar?', 'A chave privada do signatário.'],
  ['Tamanho do bloco do AES?', '128 bits (chaves de 128, 192 ou 256 bits).'],
  ['O que a assinatura digital NÃO garante?', 'Confidencialidade.'],
  ['Padrão NIST pós-quântico para encapsulamento de chaves?', 'FIPS 203 — ML-KEM (baseado no CRYSTALS-Kyber).'],
  ['Certificado A1 × A3?', 'A1 fica em software (validade 1 ano); A3 em hardware criptográfico (token/cartão).'],
  ['Qual troca de chaves no TLS garante Perfect Forward Secrecy?', 'ECDHE/DHE (Diffie-Hellman efêmero).'],
  ['Quem opera a AC-Raiz da ICP-Brasil?', 'O ITI (Instituto Nacional de Tecnologia da Informação).'],
  ['Como armazenar senhas com segurança?', 'Com hash lento e salt: bcrypt, scrypt, Argon2 ou PBKDF2.']
]});

T({ id: 'seg-acesso', disc: 'seg', title: 'Controle de acesso: MFA, RBAC e auditoria',
summary: `
## Identificação, autenticação, autorização e auditoria (IAAA)
Identificação (alegar identidade: login) → **autenticação** (provar) → **autorização** (permissões) → **auditoria/responsabilização** (registrar e rastrear).

## Fatores de autenticação
| Fator | Exemplos |
|---|---|
| **Algo que você sabe** | senha, PIN, resposta secreta |
| **Algo que você tem** | token, smartphone (app autenticador TOTP), cartão/certificado A3, chave de segurança FIDO2 |
| **Algo que você é** | biometria (digital, face, íris, voz) |
| (Contextuais) | onde você está (geolocalização), comportamento |
- **MFA / autenticação forte**: combina **fatores de categorias diferentes** (senha + senha **não** é MFA; senha + código do app é).
- **OTP**: **HOTP** (baseado em contador, RFC 4226) e **TOTP** (baseado em tempo, 30 s, RFC 6238). SMS é considerado fraco (SIM swap).
- **FIDO2/WebAuthn (passkeys)**: autenticação por criptografia de chave pública, **resistente a phishing**.
- Biometria: **FAR** (taxa de falsa aceitação) × **FRR** (falsa rejeição); ponto de equilíbrio **CER/EER** — quanto menor, melhor.
- Boas práticas de senha (NIST SP 800-63B): priorizar **comprimento**, checar contra listas de senhas vazadas, **não forçar troca periódica** sem indício de comprometimento, bloquear após tentativas, sem dicas.

## Modelos de controle de acesso
| Modelo | Quem decide | Características |
|---|---|---|
| **DAC** (discricionário) | o **dono** do recurso | ACLs; permissões de arquivos do Windows/Linux |
| **MAC** (obrigatório) | política central baseada em **rótulos de classificação** (ultrassecreto, secreto…) e **habilitação** | ambientes militares/governamentais; modelos **Bell-LaPadula** (confidencialidade: *no read up, no write down*) e **Biba** (integridade: *no read down, no write up*); SELinux |
| **RBAC** (baseado em papéis) | permissões atribuídas a **papéis/funções**; usuários recebem papéis | facilita administração; Keycloak *roles*, grupos do AD; **RBAC no Kubernetes** |
| **ABAC** (baseado em atributos) | políticas sobre **atributos** do usuário, recurso, ação e ambiente (horário, local) | granular e dinâmico (XACML) |
| Rule-based | regras globais (ex.: firewall, horário) | |

**Princípios**: **menor privilégio**, **necessidade de conhecer** (*need to know*), **segregação/separação de funções** (*SoD* — ninguém executa sozinho uma transação crítica do início ao fim), **negação por padrão**, revisão periódica de acessos (recertificação), **gestão de contas privilegiadas (PAM)**, *just-in-time access*, desativação tempestiva de contas de desligados.

## Auditoria e registro
**Logs** de autenticação, acessos e alterações, com **sincronização de horário (NTP)**, **proteção contra adulteração** (integridade, armazenamento centralizado/WORM), retenção definida e **monitoramento** (SIEM). Trilhas de auditoria garantem **responsabilização** e apoiam investigação de incidentes.

## IAM e SSO
Gestão do ciclo de vida de identidades (**provisionamento → alteração → desprovisionamento**), diretórios (**LDAP**, Active Directory), federação (**SAML**, **OIDC**), SSO (Keycloak — ver tópico de autenticação).
`,
mindmap: `
Controle de acesso
  IAAA
    Identificação
    Autenticação
    Autorização
    Auditoria
  Fatores
    Sabe: senha
    Tem: token, celular
    É: biometria
    MFA: categorias diferentes
    TOTP e HOTP
    FIDO2 / passkeys
    FAR, FRR, CER
  Modelos
    DAC: dono decide
    MAC: rótulos
      Bell-LaPadula: sigilo
      Biba: integridade
    RBAC: papéis
    ABAC: atributos
  Princípios
    Menor privilégio
    Need to know
    Segregação de funções
    Negação por padrão
    Recertificação
    PAM
  Auditoria
    Logs com NTP
    Integridade dos logs
    SIEM
  IAM
    Ciclo de vida
    LDAP e AD
    SAML e OIDC
`,
cards: [
  ['Senha + PIN configura MFA?', 'Não; ambos são “algo que você sabe”. MFA exige fatores de categorias diferentes.'],
  ['No RBAC, a quem são atribuídas as permissões?', 'Aos papéis (funções); os usuários recebem papéis.'],
  ['Modelo em que o dono do recurso define quem acessa?', 'DAC (discricionário).'],
  ['Regras do modelo Bell-LaPadula?', 'No read up, no write down (foco em confidencialidade).'],
  ['TOTP × HOTP?', 'TOTP gera códigos baseados no tempo; HOTP, em um contador de eventos.'],
  ['O que é segregação de funções?', 'Dividir tarefas críticas entre pessoas diferentes para evitar fraude ou erro sem detecção.'],
  ['Métrica biométrica em que FAR = FRR?', 'CER/EER (Crossover/Equal Error Rate).']
]});

T({ id: 'seg-redes', disc: 'seg', title: 'Firewall, WAF, IDS/IPS, SIEM, NAC, DMZ, VPN e ZTNA',
diagrams: [{ src: 'dmz.svg', cap: 'Arquitetura com DMZ entre dois firewalls' }],
summary: `
## Firewalls
| Tipo | Como funciona |
|---|---|
| **Filtro de pacotes (stateless)** | regras por IP de origem/destino, porta, protocolo (camadas 3–4); analisa cada pacote isoladamente |
| **Stateful (inspeção de estado)** | mantém **tabela de estados** das conexões; permite respostas de conexões iniciadas internamente |
| **Gateway de aplicação / proxy** | atua na camada 7, intermediando a conexão |
| **NGFW (próxima geração)** | stateful + **inspeção profunda de pacotes (DPI)**, identificação de **aplicações e usuários**, IPS integrado, inspeção TLS, inteligência de ameaças |
- Regras avaliadas **em ordem** (*first match*); política padrão **“negar tudo”** (*default deny*) + liberações explícitas.
- **UTM** (*Unified Threat Management*): um único equipamento com **firewall, IPS, antivírus, antispam, filtro de conteúdo/web, VPN** — simples para médias empresas, mas é ponto único de falha/gargalo.

## WAF (Web Application Firewall)
Protege **aplicações web** na **camada 7** (HTTP/HTTPS), inspecionando requisições e respostas contra **SQL Injection, XSS, CSRF, path traversal**, bots, *virtual patching*; regras como o **OWASP Core Rule Set** (ModSecurity). Modelos **positivo** (*allowlist*) e **negativo** (*blocklist* de assinaturas). Geralmente posicionado como **proxy reverso**.

## IDS × IPS
| | **IDS** (detecção) | **IPS** (prevenção) |
|---|---|---|
| Posição | **fora de linha** (passivo — cópia do tráfego via *SPAN/mirror*/TAP) | **em linha** (*inline*) |
| Ação | **alerta** | **bloqueia**/descarta em tempo real |
| Risco | não impede o ataque | falso positivo bloqueia tráfego legítimo |
- **NIDS/NIPS** (rede) × **HIDS/HIPS** (host — monitora arquivos, logs, chamadas do SO; ex.: OSSEC, Wazuh).
- Métodos: **por assinatura** (padrões conhecidos — não detecta *zero-day*) × **por anomalia/comportamento** (desvios de um perfil normal — detecta desconhecidos, mais **falsos positivos**). Ferramentas: Snort, Suricata, Zeek.
- **Falso positivo** (alerta sem ataque) × **falso negativo** (ataque não detectado — o mais perigoso).

## SIEM e afins
**SIEM** (*Security Information and Event Management*): **coleta e centraliza logs** de várias fontes, **normaliza**, **correlaciona eventos**, gera **alertas** e relatórios, apoia investigação forense e conformidade (retenção). Ex.: Splunk, QRadar, Elastic Security, Wazuh. **SOC** (Centro de Operações de Segurança) opera o SIEM. **SOAR**: orquestração e automação da resposta. **EDR/XDR**: detecção e resposta em endpoints/estendida.

## Proxy, NAC, antivírus e antispam
- **Proxy de encaminhamento (web proxy)**: intermedia o acesso dos usuários à internet — **filtragem de conteúdo/URL**, cache, autenticação, registro de navegação. **Proxy transparente** dispensa configuração no cliente.
- **NAC** (*Network Access Control*): verifica **identidade e conformidade (postura)** do dispositivo — antivírus atualizado, patches — **antes de permitir acesso** à rede; pode colocar em **quarentena**/VLAN de remediação. Base: **802.1X** (suplicante, autenticador — switch/AP — e servidor de autenticação **RADIUS**).
- **Antivírus/antimalware**: assinaturas, heurística, análise comportamental, *sandbox*. **Antispam**: filtros de reputação (RBL), conteúdo (bayesiano), **SPF, DKIM e DMARC** (autenticação de remetente de e-mail).

## DMZ (zona desmilitarizada)
**Sub-rede de perímetro** entre a rede interna e a internet que hospeda **serviços expostos publicamente** (web, e-mail, DNS externo, proxy reverso). Se um servidor da DMZ for comprometido, o atacante **ainda não está na rede interna**.
Arquiteturas: firewall de **três interfaces** (*three-legged*) ou **dois firewalls** (externo e interno, idealmente de fabricantes diferentes — defesa em profundidade). Regra: a internet acessa só a DMZ; a DMZ **não** inicia conexões livres para a rede interna.

## Monitoramento e análise de pacotes (sniffer)
**Sniffers** (Wireshark, tcpdump) capturam pacotes colocando a interface em **modo promíscuo** (cabeado) ou **modo monitor** (Wi-Fi). Em redes comutadas, captura-se via **port mirroring (SPAN)** ou **TAP**. Uso legítimo: diagnóstico e análise de segurança; uso malicioso: capturar credenciais em protocolos **sem criptografia** (Telnet, FTP, HTTP). Defesa: criptografia (TLS, SSH, IPsec), segmentação, detecção de ARP spoofing.

## Segurança em redes sem fio
WEP (quebrado) → WPA/TKIP (legado) → **WPA2-AES/CCMP** → **WPA3-SAE**; Enterprise com **802.1X/EAP** (EAP-TLS, PEAP); ataques: *evil twin*/AP falso, *rogue AP*, deautenticação, KRACK, quebra de PSK por dicionário; WIPS (IPS sem fio).

## VPN e ZTNA
- **VPN**: túnel cifrado sobre rede pública. **Site a site** (gateways, geralmente **IPsec** em modo túnel) × **acesso remoto** (cliente → rede). **VPN SSL/TLS**: via navegador (*clientless*, portal web) ou cliente leve (OpenVPN, porta 443 — atravessa firewalls facilmente). **Split tunneling**: só o tráfego corporativo passa pelo túnel.
- **Zero Trust** (NIST SP 800-207): **“nunca confie, sempre verifique”** — não há confiança implícita baseada na localização de rede; **verificação contínua** de identidade, dispositivo e contexto; **menor privilégio**; **microssegmentação**; assumir que a violação já ocorreu. Componentes: PDP (*Policy Decision Point*: policy engine + administrator) e PEP (*Policy Enforcement Point*).
- **ZTNA** (*Zero Trust Network Access*): concede acesso **a aplicações específicas** (não à rede inteira) após verificar identidade e postura, a cada sessão; as aplicações ficam **invisíveis** para quem não está autorizado (*dark cloud*). Diferença essencial para a VPN tradicional, que dá **acesso amplo à rede** após autenticar. Faz parte do **SASE** (com SWG, CASB, FWaaS).
`,
mindmap: `
Segurança de redes
  Firewall
    Filtro de pacotes
    Stateful
    Proxy de aplicação
    NGFW: DPI e aplicações
    Default deny
    UTM: tudo em um
  WAF
    Camada 7
    SQLi e XSS
    OWASP CRS
  IDS × IPS
    IDS: passivo, alerta
    IPS: inline, bloqueia
    NIDS × HIDS
    Assinatura × anomalia
    Falso positivo × negativo
  SIEM
    Coleta e correlação
    SOC
    SOAR e EDR
  Controle
    Proxy web
    NAC + 802.1X
    Antivírus
    Antispam: SPF, DKIM, DMARC
  DMZ
    Serviços públicos
    Três interfaces ou 2 firewalls
  Sniffer
    Modo promíscuo
    SPAN e TAP
    Wireshark
  VPN
    Site a site: IPsec
    Acesso remoto
    SSL/TLS
    Split tunneling
  Zero Trust
    Nunca confie, sempre verifique
    Microssegmentação
    ZTNA: acesso por aplicação
    SASE
`,
cards: [
  ['IDS × IPS?', 'IDS fica fora de linha e alerta; IPS fica em linha e bloqueia em tempo real.'],
  ['Detecção por assinatura identifica ataques zero-day?', 'Não; detecção por anomalia tem mais chance, ao custo de mais falsos positivos.'],
  ['Função principal do SIEM?', 'Coletar, normalizar e correlacionar logs e eventos de segurança, gerando alertas.'],
  ['Para que serve a DMZ?', 'Isolar os serviços expostos à internet da rede interna.'],
  ['O que o NAC verifica antes de liberar o acesso?', 'Identidade e conformidade (postura) do dispositivo.'],
  ['ZTNA × VPN tradicional?', 'ZTNA libera acesso a aplicações específicas, verificando continuamente; a VPN dá acesso amplo à rede após autenticar.'],
  ['Que equipamento reúne firewall, IPS, antivírus, antispam e VPN?', 'UTM (Unified Threat Management).'],
  ['WAF atua em qual camada?', 'Camada 7 (aplicação, HTTP/HTTPS).'],
  ['Lema do Zero Trust?', '“Nunca confie, sempre verifique.”']
]});

T({ id: 'seg-ataques', disc: 'seg', title: 'Ataques, malwares, pentest, vulnerabilidades e hardening',
summary: `
## Ataques em redes e internet
| Ataque | Descrição |
|---|---|
| **Spoofing** | falsificação de identidade: **IP spoofing** (endereço de origem forjado), **ARP spoofing/poisoning** (associa o MAC do atacante ao IP de outro → *man-in-the-middle*), **DNS spoofing/cache poisoning**, e-mail spoofing |
| **DoS** | esgota recursos de um alvo a partir de **uma** origem |
| **DDoS** | a partir de **muitas** origens (geralmente **botnet**); volumétrico, de protocolo ou de aplicação (camada 7) |
| **SYN flood** | envia muitos SYN sem completar o *handshake*, esgotando a fila de conexões semiabertas (defesa: **SYN cookies**) |
| **UDP/ICMP flood**, **Ping of Death**, **Smurf** (ICMP para broadcast com IP da vítima forjado — amplificação) |
| **Amplificação/reflexão** | DNS, NTP, memcached: pequenas requisições com IP da vítima geram respostas grandes |
| **Man-in-the-middle (MitM)** | intercepta/altera a comunicação (ARP poisoning, Wi-Fi falso, SSL stripping) |
| **Session hijacking** | sequestro de sessão (roubo de cookie/token) |
| **Replay** | reenvio de mensagem capturada (defesa: nonces, timestamps) |
| **Força bruta / dicionário / credential stuffing / password spraying** | ataques a senhas (spraying: uma senha comum contra muitas contas) |
| **Engenharia social** | **phishing** (e-mail), **spear phishing** (direcionado), **whaling** (alta direção), **vishing** (voz), **smishing** (SMS), pretexting, baiting, tailgating |
| **Pharming** | redireciona para site falso alterando DNS/hosts, mesmo digitando o endereço correto |

## Malwares
| Tipo | Característica-chave |
|---|---|
| **Vírus** | infecta arquivos/programas e **depende de execução** do hospedeiro para se propagar |
| **Worm** | **autorreplicante** e se **propaga sozinho pela rede**, explorando vulnerabilidades, sem hospedeiro |
| **Trojan (cavalo de Troia)** | parece legítimo, mas executa funções maliciosas ocultas; não se autorreplica |
| **Spyware** | coleta informações do usuário (adware, keylogger, screenlogger) |
| **Keylogger** | registra as **teclas** digitadas (screenlogger: capturas de tela/cliques) |
| **Ransomware** | **criptografa** dados (ou bloqueia o sistema) e exige **resgate**; variantes de **dupla extorsão** (vazamento) |
| **Rootkit** | **esconde** a presença do invasor e de outros malwares, com privilégios elevados (inclusive no kernel/boot) |
| **Backdoor** | **porta dos fundos** que permite **retorno** do atacante sem autenticação normal |
| **Bot / botnet** | máquina **controlada remotamente** (C2) / rede de bots — usada em DDoS, spam |
| **Phishing** | (engenharia social) mensagem fraudulenta para roubar credenciais/dados |
| Fileless, cryptojacking, logic bomb, RAT | outros |

## Teste de intrusão e análise de vulnerabilidades
- **Análise/varredura de vulnerabilidades**: identifica e **prioriza** falhas conhecidas de forma automatizada (Nessus, OpenVAS, Qualys); não as explora. Classificação com **CVE** (identificador) e **CVSS** (pontuação 0–10).
- **Teste de intrusão (pentest)**: **explora** ativamente as vulnerabilidades, de forma **autorizada** (escopo e regras de engajamento formais), para demonstrar impacto real.
  - **Caixa preta** (sem informações), **caixa cinza** (parcial), **caixa branca** (acesso total a código e arquitetura).
  - Fases típicas (PTES): pré-engajamento → **reconhecimento** (passivo — OSINT; ativo) → **varredura/enumeração** (nmap) → **exploração** (Metasploit) → **pós-exploração** (escalação de privilégios, movimentação lateral, persistência) → **relatório**.
  - Metodologias: **OWASP WSTG** (aplicações web), PTES, OSSTMM, NIST SP 800-115. **Red team** (ataque) × **blue team** (defesa) × purple team.
- **Avaliação de segurança de aplicações**: SAST, DAST, IAST, revisão de código, *fuzzing*, *bug bounty*.

## Hardening (endurecimento)
Reduzir a **superfície de ataque** de sistemas operacionais, servidores, redes e aplicações:
- Remover/desabilitar **serviços, portas, softwares e contas desnecessários**; trocar **senhas e configurações padrão**;
- Aplicar **atualizações e patches**; configurações seguras de referência (**CIS Benchmarks**, guias STIG);
- **Menor privilégio**, contas administrativas separadas, desabilitar login remoto de root via SSH, autenticação por chave;
- Firewall local, criptografia de disco, **logs e auditoria** habilitados, NTP, SELinux/AppArmor;
- Em redes: desabilitar portas de switch não usadas, **port security**, protocolos de gerência seguros (SSH em vez de Telnet, SNMPv3), segmentação/VLANs, **desabilitar WPS e protocolos legados** (SMBv1, TLS antigo).
`,
mindmap: `
Ameaças
  Ataques de rede
    Spoofing: IP, ARP, DNS
    DoS e DDoS
    SYN flood: SYN cookies
    Amplificação
    MitM
    Session hijacking
    Replay
  Senhas
    Força bruta
    Dicionário
    Credential stuffing
    Password spraying
  Engenharia social
    Phishing
    Spear phishing e whaling
    Vishing e smishing
    Pharming
  Malwares
    Vírus: precisa de hospedeiro
    Worm: se propaga sozinho
    Trojan: disfarçado
    Spyware e keylogger
    Ransomware: sequestra dados
    Rootkit: se esconde
    Backdoor: retorno
    Botnet: controle remoto
  Testes
    Varredura: identifica
    Pentest: explora com autorização
    Caixa preta, cinza, branca
    CVE e CVSS
    OWASP WSTG
  Hardening
    Remover o desnecessário
    Trocar padrões
    Patches
    CIS Benchmarks
    Menor privilégio
`,
cards: [
  ['Vírus × worm?', 'Vírus precisa de um hospedeiro e de execução; worm se replica e se propaga sozinho pela rede.'],
  ['Malware que esconde a presença do invasor no sistema?', 'Rootkit.'],
  ['Malware que permite ao atacante retornar ao sistema comprometido?', 'Backdoor.'],
  ['Defesa clássica contra SYN flood?', 'SYN cookies (além de limites de taxa e proteção anti-DDoS).'],
  ['Ataque que associa o MAC do atacante ao IP do gateway?', 'ARP spoofing/poisoning.'],
  ['Pentest × varredura de vulnerabilidades?', 'A varredura identifica falhas; o pentest as explora de forma autorizada para demonstrar impacto.'],
  ['Phishing direcionado a altos executivos?', 'Whaling.'],
  ['DoS × DDoS?', 'DoS parte de uma origem; DDoS de muitas origens distribuídas (botnet).'],
  ['O que é hardening?', 'Reduzir a superfície de ataque removendo o desnecessário, aplicando patches e configurações seguras.']
]});

T({ id: 'seg-devsec', disc: 'seg', title: 'Desenvolvimento seguro: SDL, CLASP, codificação segura e OWASP Top 10:2025',
summary: `
## Microsoft SDL (Security Development Lifecycle)
Processo que incorpora segurança em **todas as fases** do desenvolvimento. Fases clássicas: **Treinamento** → **Requisitos** (requisitos de segurança e privacidade, *quality gates*/*bug bars*) → **Design** (**modelagem de ameaças** — **STRIDE**; redução da superfície de ataque) → **Implementação** (ferramentas aprovadas, funções inseguras proibidas, **análise estática**) → **Verificação** (análise dinâmica, *fuzzing*, revisão da superfície de ataque) → **Lançamento** (plano de resposta a incidentes, **revisão final de segurança**) → **Resposta**.
**STRIDE** (ameaça → propriedade violada): **S**poofing → autenticação; **T**ampering → integridade; **R**epudiation → não repúdio; **I**nformation disclosure → confidencialidade; **D**enial of service → disponibilidade; **E**levation of privilege → autorização. **DREAD** é um modelo de pontuação de risco.

## CLASP (Comprehensive, Lightweight Application Security Process) — OWASP
Conjunto de **componentes de processo** orientados a **papéis** e **atividades** para inserir segurança em ciclos de vida existentes. Organizado em **5 perspectivas (visões)**: **Conceitos**, **Papéis** (*Role-Based*), **Avaliação de atividades** (*Activity-Assessment*), **Implementação de atividades** (*Activity-Implementation*) e **Vulnerabilidades** (catálogo de causas, como erros de tipo/tamanho, problemas de ambiente, sincronização). Define **24 atividades** de segurança (ex.: educação, monitorar métricas, especificar requisitos de segurança, modelagem de ameaças, revisão de código) atribuídas a papéis como gerente de projeto, arquiteto, projetista, implementador, testador e auditor. O projeto CLASP foi descontinuado e seu conteúdo influenciou o **OWASP SAMM**.

## Codificação segura e programação defensiva
- **Validar toda entrada** no **servidor** (allowlist — lista de permitidos — é preferível a blocklist): tipo, tamanho, formato, faixa; canonicalizar antes de validar.
- **Codificar a saída** conforme o contexto (HTML, atributo, JavaScript, URL) → previne **XSS**.
- **Consultas parametrizadas**/*prepared statements*/ORM → previne **SQL Injection**.
- **Menor privilégio**, **defesa em profundidade**, **falhar de forma segura** (*fail secure/closed*), **negação por padrão**, **economia de mecanismo** (simplicidade), **mediação completa**, **design aberto** (sem segurança por obscuridade), **separação de privilégios** (princípios de Saltzer & Schroeder).
- **Tratamento de erros**: mensagens genéricas ao usuário, detalhes só em logs; nunca expor *stack traces*.
- Gerenciar **segredos** fora do código (cofres, variáveis protegidas); criptografia com bibliotecas consolidadas; senhas com hash lento + salt.
- **Programação defensiva**: assumir que entradas e chamadas podem falhar; verificar pré-condições, nulos, limites de arrays, *overflow*; usar asserções; tratar exceções; *timeouts*.
- Proteções web: tokens **anti-CSRF** e cookies **SameSite**; cookies **HttpOnly** e **Secure**; cabeçalhos **CSP**, **HSTS**, X-Content-Type-Options; CORS restritivo; *rate limiting*.

## OWASP Top 10:2025
| # | Categoria | Destaques |
|---|---|---|
| **A01** | **Broken Access Control** (Quebra de controle de acesso) | IDOR, escalação de privilégios, CORS mal configurado; agora inclui **SSRF** |
| **A02** | **Security Misconfiguration** (Configuração incorreta de segurança) | padrões inseguros, serviços desnecessários, mensagens de erro verbosas, XXE |
| **A03** | **Software Supply Chain Failures** (Falhas na cadeia de suprimentos de software) | **nova**; amplia “componentes vulneráveis e desatualizados”: dependências, build, pipelines, distribuição |
| **A04** | **Cryptographic Failures** (Falhas criptográficas) | dados sem criptografia, algoritmos fracos, chaves mal geridas |
| **A05** | **Injection** (Injeção) | SQL, NoSQL, OS command, LDAP e **XSS** |
| **A06** | **Insecure Design** (Design inseguro) | ausência de modelagem de ameaças e de padrões seguros |
| **A07** | **Authentication Failures** (Falhas de autenticação) | força bruta, credential stuffing, sessão mal gerida |
| **A08** | **Software or Data Integrity Failures** (Falhas de integridade de software ou dados) | desserialização insegura, atualizações sem assinatura |
| **A09** | **Security Logging and Alerting Failures** (Falhas de registro e alerta de segurança) | ênfase em **alertar**, não só registrar |
| **A10** | **Mishandling of Exceptional Conditions** (Tratamento inadequado de condições excepcionais) | **nova**: erros mal tratados, *fail open*, estados inconsistentes |
> [!fcc] Mudanças em relação à edição **2021**: **SSRF** (antes A10) foi incorporado ao **A01**; *Security Misconfiguration* subiu de A05 para **A02**; *Vulnerable and Outdated Components* virou **Software Supply Chain Failures (A03)**; *Injection* caiu de A03 para **A05**; surgiu **A10 Mishandling of Exceptional Conditions**. Broken Access Control continua em **1º lugar**.

Outros recursos OWASP: **ASVS** (padrão de verificação), **SAMM** (modelo de maturidade), **WSTG** (guia de testes), Cheat Sheets, ZAP (scanner DAST), Dependency-Check (SCA), Top 10 de APIs (2023) e de LLM.
`,
mindmap: `
Desenvolvimento seguro
  SDL Microsoft
    Treinamento
    Requisitos
    Design: modelagem de ameaças
    Implementação: SAST
    Verificação: fuzzing, DAST
    Lançamento
    Resposta
    STRIDE
  CLASP (OWASP)
    5 perspectivas
    Papéis
    24 atividades
    Vulnerabilidades
    Sucedido pelo SAMM
  Codificação segura
    Validar entrada (allowlist)
    Codificar saída: XSS
    Consultas parametrizadas
    Menor privilégio
    Fail secure
    Erros genéricos
    Segredos fora do código
    CSP, HSTS, HttpOnly
  Programação defensiva
    Pré-condições
    Nulos e limites
    Timeouts
  OWASP Top 10:2025
    A01 Broken Access Control (+SSRF)
    A02 Security Misconfiguration
    A03 Supply Chain Failures
    A04 Cryptographic Failures
    A05 Injection
    A06 Insecure Design
    A07 Authentication Failures
    A08 Integrity Failures
    A09 Logging and Alerting Failures
    A10 Exceptional Conditions
`,
cards: [
  ['Categoria A01 do OWASP Top 10:2025?', 'Broken Access Control (agora incorporando SSRF).'],
  ['Quais categorias são novas no OWASP Top 10:2025?', 'A03 Software Supply Chain Failures e A10 Mishandling of Exceptional Conditions.'],
  ['Em que posição ficou Injection no Top 10:2025?', 'A05.'],
  ['O que significa o “E” de STRIDE e que propriedade viola?', 'Elevation of privilege; viola a autorização.'],
  ['Em que fase do SDL ocorre a modelagem de ameaças?', 'Design.'],
  ['Quantas perspectivas (visões) tem o CLASP?', 'Cinco: conceitos, papéis, avaliação de atividades, implementação de atividades e vulnerabilidades.'],
  ['Principal defesa contra SQL Injection?', 'Consultas parametrizadas (prepared statements).'],
  ['Principal defesa contra XSS?', 'Codificação (escape) da saída conforme o contexto, aliada a CSP e validação de entrada.'],
  ['Validação por allowlist ou blocklist?', 'Allowlist (aceitar apenas o que é conhecido como válido).']
]});

/* ======================= NORMATIVOS PDPJ-Br, CNJ E GOVERNANÇA ======================= */
T({ id: 'norm-pdpj', disc: 'norm', title: 'PDPJ-Br: Res. CNJ 335/2020, 443/2022, 574/2024 e Portarias 252, 253, 284 e 131',
ref: 'Normas do CNJ — confira o texto consolidado em atos.cnj.jus.br',
summary: `
## O que é a PDPJ-Br
**Plataforma Digital do Poder Judiciário Brasileiro**, instituída pela **Resolução CNJ nº 335/2020** (política pública de governança e gestão do processo judicial eletrônico). Objetivos: **integrar** os tribunais em uma plataforma **única, colaborativa e em nuvem**, baseada em **microsserviços**, mantendo o **PJe** como sistema prioritário, permitindo que cada tribunal desenvolva **módulos** reutilizáveis por todos (desenvolvimento **comunitário/colaborativo**), com **marketplace** de soluções e **portal único** (Jus.br).
Princípios: **colaboração**, **padronização**, **interoperabilidade** (Modelo Nacional de Interoperabilidade — MNI), **reaproveitamento** de soluções, código **aberto/público** no repositório da PDPJ, segurança, LGPD, acessibilidade, **economicidade** (evitar que cada tribunal desenvolva o mesmo sistema).

## Portaria CNJ nº 252/2020 — Modelo de Governança e Gestão (alterada pela **Portaria 284/2021**)
Dispõe sobre o **modelo de governança e gestão da PDPJ-Br**: instâncias (comitê gestor, comitês técnicos, grupos de trabalho), papéis dos tribunais e do CNJ, regras para **propor, homologar e disponibilizar** módulos/serviços na plataforma, e o **marketplace**. A Portaria 284/2021 ajustou essa governança (composição e atribuições das instâncias, fluxos de submissão e aprovação).

## Portaria CNJ nº 253/2020 — Critérios e diretrizes técnicas
Estabelece os **critérios técnicos** para o desenvolvimento de **módulos e serviços** na PDPJ-Br. Diretrizes centrais (o que a prova costuma explorar):
- Arquitetura de **microsserviços**, **APIs REST** documentadas (OpenAPI/Swagger), comunicação assíncrona por **mensageria (RabbitMQ)**;
- Aplicações empacotadas em **contêineres (Docker)** e executadas na **nuvem da PDPJ** orquestrada por **Kubernetes/Rancher**;
- **Autenticação e autorização centralizadas** pelo **SSO da PDPJ (Keycloak/OAuth2/OIDC)**;
- Back-end preferencialmente em **Java/Spring Boot** e front-end em **Angular**; bancos como **PostgreSQL**; logs e monitoramento com **ELK**;
- **Código-fonte versionado no Git (GitLab) da PDPJ**, com **CI/CD**, testes automatizados e documentação;
- Licenciamento que permita o **reuso** por todo o Judiciário; aderência à **LGPD**, **acessibilidade** e segurança da informação.

## Portaria CNJ nº 131/2021 — Grupo Revisor de Código-Fonte
Institui o **Grupo Revisor de Código-Fonte** das soluções da PDPJ-Br e do **PJe**, responsável por **revisar o código** submetido pelos tribunais (qualidade, aderência às diretrizes técnicas, segurança, padrões) **antes da incorporação** à versão nacional/plataforma.

## Resolução CNJ nº 443/2022
Dispõe sobre a **aplicação e disseminação dos conhecimentos sobre a PDPJ-Br** nos **editais de concursos públicos**, seleções e **capacitações** para cargos de **TIC** dos órgãos do Poder Judiciário — é **por causa dela** que este edital cobra Java, Spring, Keycloak, RabbitMQ, Docker, Kubernetes etc. Busca formar quadros capazes de desenvolver e manter soluções da plataforma.

## Resolução CNJ nº 574/2024
- Dispõe sobre o **acesso a dados judiciais públicos consolidados pelo CNJ** (base nacional — **DataJud**/**Codex**), com regras de disponibilização, proteção de dados pessoais e uso por terceiros;
- Prevê a possibilidade de **depósito de serviços privados na PDPJ-Br** (soluções de empresas/entidades disponibilizadas na plataforma, observados requisitos de segurança, LGPD e governança);
- Institui o **portal unificado para usuários internos** do Judiciário (no contexto do **Jus.br**, porta de entrada única para os serviços da plataforma).

> [!lei] Os números e ementas acima conferem com o edital. Para detalhes de artigos (prazos, composição de comitês), leia os textos compilados no portal de atos do CNJ.
`,
mindmap: `
PDPJ-Br
  Res. CNJ 335/2020
    Plataforma única
    Nuvem e microsserviços
    PJe prioritário
    Colaboração entre tribunais
    Marketplace e Jus.br
  Portaria 252/2020
    Governança e gestão
    Alterada pela 284/2021
    Propor e homologar módulos
  Portaria 253/2020
    Diretrizes técnicas
    Microsserviços REST
    Docker e Kubernetes
    SSO Keycloak
    Java/Spring e Angular
    RabbitMQ, PostgreSQL, ELK
    Git da PDPJ e CI/CD
  Portaria 131/2021
    Grupo Revisor de Código-Fonte
    PDPJ-Br e PJe
  Res. CNJ 443/2022
    PDPJ nos editais de TI
    Capacitações
  Res. CNJ 574/2024
    Dados públicos consolidados
    Serviços privados na PDPJ
    Portal unificado interno
`,
cards: [
  ['Qual resolução instituiu a PDPJ-Br?', 'Resolução CNJ nº 335/2020.'],
  ['O que estabelece a Portaria CNJ nº 253/2020?', 'Critérios e diretrizes técnicas para desenvolver módulos e serviços na PDPJ-Br.'],
  ['O que institui a Portaria CNJ nº 131/2021?', 'O Grupo Revisor de Código-Fonte das soluções da PDPJ-Br e do PJe.'],
  ['Tema da Resolução CNJ nº 443/2022?', 'Aplicação e disseminação dos conhecimentos da PDPJ-Br em editais de concursos e capacitações de TIC.'],
  ['O que a Res. CNJ 574/2024 permite depositar na PDPJ-Br?', 'Serviços privados (além de tratar do acesso a dados judiciais públicos e do portal unificado interno).'],
  ['Qual portaria trata do modelo de governança da PDPJ-Br e qual a alterou?', 'Portaria 252/2020, alterada pela Portaria 284/2021.']
]});

T({ id: 'norm-moreq', disc: 'norm', title: 'MoReq-Jus 2ª edição e Resolução CNJ nº 522/2023',
ref: 'Res. CNJ 522/2023',
summary: `
## Resolução CNJ nº 522/2023
**Institui o Modelo de Requisitos para Sistemas Informatizados de Gestão de Processos e Documentos do Poder Judiciário (MoReq-Jus)** e disciplina a **obrigatoriedade** de sua utilização no **desenvolvimento e na manutenção** de sistemas informatizados para as atividades **judiciárias e administrativas** do Poder Judiciário. (Substituiu a disciplina anterior da Res. CNJ 91/2009, que havia instituído o primeiro MoReq-Jus.) Integra o **Proname** — Programa Nacional de Gestão Documental e Memória do Poder Judiciário (Res. CNJ 324/2020).

## O MoReq-Jus
Conjunto de **requisitos** (funcionais e não funcionais) e **metadados** que um **GestãoDoc** — Sistema Informatizado de Gestão de Processos e Documentos — deve atender para garantir que os documentos e processos digitais sejam **autênticos, íntegros, confiáveis, acessíveis e preservados** ao longo do tempo, com valor probatório. É baseado no **e-ARQ Brasil** (Conarq) e em modelos internacionais (MoReq europeu).

### Conceitos-chave
- **Documento arquivístico digital**: produzido/recebido no curso das atividades, com **organicidade** e vínculo arquivístico.
- **Gestão documental**: produção, tramitação, uso, avaliação e arquivamento, até a **eliminação** ou **guarda permanente**.
- **Plano de Classificação** e **Tabela de Temporalidade e Destinação** (TTD) — no Judiciário, alinhados às **Tabelas Processuais Unificadas (TPU)**.
- **Cadeia de custódia digital** e **RDC-Arq** (Repositório Arquivístico Digital Confiável) para **preservação de longo prazo** (ex.: Archivematica).
- **Metadados**: identificação, classificação, temporalidade, autoria, datas, formato, assinatura, eventos de gestão (trilhas de auditoria).

### Grupos de requisitos (visão geral)
Organização e **classificação** de documentos/processos; **captura** (registro, numeração única, metadados); **tramitação** e fluxo; **avaliação, temporalidade e destinação** (eliminação e transferência/recolhimento); **pesquisa e recuperação**; **segurança** (controle de acesso, **trilhas de auditoria**, cópias de segurança, **assinatura digital**, criptografia); **armazenamento**; **preservação** (formatos abertos, migração, conversão); **usabilidade**, **interoperabilidade**, **disponibilidade** e **desempenho**. Os requisitos têm graus de exigência (**obrigatório**, **altamente desejável**, **facultativo**).

> [!fcc] Questões típicas: (1) o MoReq-Jus é **obrigatório** no desenvolvimento **e** na manutenção de sistemas; (2) aplica-se a atividades **judiciárias e administrativas**; (3) seu objetivo é garantir **autenticidade, integridade, confiabilidade e preservação** dos documentos digitais; (4) relaciona-se à **gestão documental** (Proname), não a requisitos de interface gráfica.
`,
mindmap: `
MoReq-Jus
  Res. CNJ 522/2023
    Institui o modelo
    Obrigatório
    Desenvolvimento e manutenção
    Judicial e administrativo
    Proname
  Objetivo
    Autenticidade
    Integridade
    Confiabilidade
    Acesso e preservação
  Base
    e-ARQ Brasil
    MoReq europeu
  GestãoDoc
    Sistema de gestão de processos e documentos
  Conceitos
    Documento arquivístico
    Plano de classificação
    Tabela de temporalidade
    TPU
    RDC-Arq
    Metadados
  Requisitos
    Captura
    Tramitação
    Avaliação e destinação
    Segurança e auditoria
    Assinatura digital
    Preservação
    Interoperabilidade
`,
cards: [
  ['O que institui a Resolução CNJ nº 522/2023?', 'O MoReq-Jus — Modelo de Requisitos para Sistemas Informatizados de Gestão de Processos e Documentos do Poder Judiciário.'],
  ['O MoReq-Jus é obrigatório em quais situações?', 'No desenvolvimento e na manutenção de sistemas para atividades judiciárias e administrativas.'],
  ['Em que modelo nacional do Conarq o MoReq-Jus se inspira?', 'e-ARQ Brasil.'],
  ['Qual o objetivo central do MoReq-Jus?', 'Garantir autenticidade, integridade, confiabilidade, acesso e preservação dos documentos e processos digitais.'],
  ['Repositório para preservação digital de longo prazo citado na gestão documental?', 'RDC-Arq (Repositório Arquivístico Digital Confiável).']
]});

T({ id: 'norm-ensec', disc: 'norm', title: 'ENSEC-PJ (Res. CNJ 396/2021) e Portaria CNJ 162/2021',
ref: 'Res. CNJ 396/2021 · Portaria CNJ 162/2021',
summary: `
## Resolução CNJ nº 396/2021 — Estratégia Nacional de Segurança Cibernética do Poder Judiciário (ENSEC-PJ)
Institui a **ENSEC-PJ**, com objetivos de tornar o Judiciário mais **seguro e inclusivo no ambiente digital**, aumentar a **resiliência** às ameaças cibernéticas, estabelecer **governança** de segurança cibernética e **fortalecer a gestão e a coordenação** entre os órgãos, além de promover a **cultura e a educação** em segurança cibernética e a cooperação.

### Estruturas
- **Comitê Gestor de Segurança Cibernética do Poder Judiciário (CGSC-PJ)**: coordena a estratégia em nível nacional.
- **Rede de Cooperação do Judiciário na área de segurança cibernética**: troca de informações entre os órgãos.
- **Centro de Prevenção, Tratamento e Resposta a Incidentes Cibernéticos do Poder Judiciário (CPTRIC-PJ)**: coordena a prevenção e resposta a incidentes no âmbito nacional.
- Em cada órgão: **Comitê de Segurança da Informação** (ou equivalente), **gestor de segurança da informação**, e **Equipe de Tratamento e Resposta a Incidentes de Segurança Cibernética (ETIR)**.

### Diretrizes e obrigações típicas
- Elaborar **Política de Segurança da Informação** e normas complementares; **gestão de riscos**; **gestão de continuidade**; **gestão de incidentes** (com notificação ao CPTRIC-PJ); gestão de **vulnerabilidades**; **backup** e **cópias de segurança** (incluindo cópias offline); **MFA** para acessos; capacitação e **conscientização**; auditorias e **testes**; contratação de serviços com requisitos de segurança; alinhamento à **LGPD** e a padrões (ISO 27001, CIS).

## Portaria CNJ nº 162/2021 — Protocolos e Manuais da ENSEC-PJ
Aprova os **protocolos e manuais** previstos na Resolução 396/2021:
**Protocolos:**
1. **Protocolo de Prevenção de Incidentes Cibernéticos do Poder Judiciário (PPINC-PJ)** — medidas preventivas (inventário de ativos, configuração segura, gestão de vulnerabilidades, backup, MFA, segmentação…).
2. **Protocolo de Gerenciamento de Crises Cibernéticas do Poder Judiciário (PGCC-PJ)** — quando um incidente se torna **crise** (grave impacto à prestação jurisdicional ou à imagem): comitê de crise, comunicação, decisões.
3. **Protocolo de Investigação para Ilícitos Cibernéticos do Poder Judiciário (PIILC-PJ)** — coleta e **preservação de evidências**, cadeia de custódia, comunicação às autoridades.

**Manuais de referência:**
- **Proteção de Infraestruturas Críticas de TIC**;
- **Prevenção e Mitigação de Ameaças Cibernéticas e Confiança Digital**;
- **Gestão de Identidades** (controle de acesso, MFA, ciclo de vida das contas);
- **Política de Educação e Cultura em Segurança Cibernética**.

> [!dica] Memorize as siglas: **CGSC-PJ** (comitê gestor), **CPTRIC-PJ** (centro nacional de incidentes), **ETIR** (equipe do tribunal), **PPINC** (prevenção), **PGCC** (crises), **PIILC** (investigação).
`,
mindmap: `
ENSEC-PJ
  Res. CNJ 396/2021
    Estratégia nacional
    Resiliência cibernética
    Governança
    Cultura e educação
  Estruturas
    CGSC-PJ: comitê gestor
    Rede de Cooperação
    CPTRIC-PJ: centro de incidentes
    ETIR em cada órgão
  Diretrizes
    Política de SI
    Riscos e continuidade
    Incidentes e notificação
    Vulnerabilidades
    Backup offline
    MFA
    Capacitação
  Portaria 162/2021
    Protocolos
      PPINC-PJ: prevenção
      PGCC-PJ: crises
      PIILC-PJ: investigação
    Manuais
      Infraestruturas críticas
      Ameaças e confiança digital
      Gestão de identidades
      Educação e cultura
`,
cards: [
  ['O que institui a Resolução CNJ nº 396/2021?', 'A Estratégia Nacional de Segurança Cibernética do Poder Judiciário (ENSEC-PJ).'],
  ['O que aprova a Portaria CNJ nº 162/2021?', 'Os protocolos e manuais da ENSEC-PJ.'],
  ['Três protocolos da Portaria 162/2021?', 'Prevenção de Incidentes (PPINC-PJ), Gerenciamento de Crises (PGCC-PJ) e Investigação de Ilícitos Cibernéticos (PIILC-PJ).'],
  ['Qual equipe trata incidentes em cada tribunal?', 'A ETIR (Equipe de Tratamento e Resposta a Incidentes).'],
  ['Sigla do comitê gestor nacional de segurança cibernética do Judiciário?', 'CGSC-PJ.']
]});

T({ id: 'norm-gov', disc: 'norm', title: 'Governança de TIC no TRT4 e PDTIC 2024–2026',
ref: 'Modelo de Governança de TIC TRT4 · PDTIC 2024-2026',
summary: `
> [!lei] O edital cobra o **Modelo de Governança de TIC do TRT4** e o **PDTIC 2024–2026** do Tribunal. São documentos internos publicados no portal do TRT4 (Transparência → Tecnologia da Informação). Leia-os na íntegra; abaixo estão os **conceitos e marcos nacionais** que estruturam esses documentos e costumam ser cobrados.

## Governança × gestão de TI
- **Governança** (COBIT/ISO 38500): **avaliar, dirigir e monitorar** — define direção, prioridades e assegura que a TI gere valor e cumpra normas. Responsabilidade da **alta administração** (comitês).
- **Gestão**: **planejar, construir, executar e monitorar** as atividades alinhadas à direção definida pela governança.
- **ISO/IEC 38500**: princípios — responsabilidade, estratégia, aquisição, desempenho, conformidade e comportamento humano; modelo **Avaliar–Dirigir–Monitorar (EDM)**.
- **COBIT 2019**: objetivos de governança (domínio **EDM**) e de gestão (**APO** — alinhar, planejar e organizar; **BAI** — construir, adquirir e implementar; **DSS** — entregar, servir e suportar; **MEA** — monitorar, avaliar e analisar).
- **ITIL 4**: sistema de valor de serviço, cadeia de valor, práticas (incidentes, problemas, mudanças, central de serviços, nível de serviço).

## Marco nacional no Judiciário
- **Resolução CNJ nº 370/2021** — **Estratégia Nacional de TIC do Poder Judiciário (ENTIC-JUD) 2021–2026**: exige que cada órgão tenha **PETIC/PDTIC**, **Comitê de Governança de TIC** e **Comitê de Gestão de TIC**, políticas de gestão de pessoas de TIC, de segurança, de contratações, de serviços; prevê o índice **iGovTIC-JUD** (avaliação da maturidade de governança e gestão de TIC dos tribunais).
- Na Justiça do Trabalho, o **CSJT** coordena sistemas nacionais (PJe-JT, e-Gestão, sistemas administrativos) e diretrizes de TIC.

## PDTIC — Plano Diretor de TIC
Instrumento de **diagnóstico, planejamento e gestão** dos recursos e processos de TIC para um período (no TRT4, **2024–2026**), alinhado ao **Planejamento Estratégico Institucional** e à ENTIC-JUD. Conteúdo típico:
- **Referencial estratégico**: missão, visão, valores, objetivos estratégicos de TIC;
- **Diagnóstico** (análise **SWOT**, maturidade, inventário de necessidades);
- **Inventário de necessidades** priorizadas (matriz GUT ou critérios de priorização);
- **Plano de metas e ações**, com **indicadores** e responsáveis;
- **Plano de gestão de pessoas** de TIC, **plano orçamentário** e de **contratações**;
- **Plano de gestão de riscos** do PDTIC;
- **Processo de revisão** e acompanhamento (normalmente anual), aprovado pelo **Comitê de Governança de TIC**.

## Instâncias típicas de um modelo de governança de TIC em tribunal
- **Comitê de Governança de TIC** (estratégico, presidido por magistrado/alta administração): aprova PDTIC, prioriza o portfólio, monitora resultados.
- **Comitê de Gestão de TIC** (tático): coordena a execução.
- **Secretaria de TIC** (operacional): executa projetos e serviços.
- Comitês correlatos: **Segurança da Informação**, **Proteção de Dados (LGPD)**, Gestor de sistemas (PJe), **Gestão Documental**.
- Instrumentos: portfólio de projetos, catálogo de serviços, acordos de nível de serviço (ANS/SLA), indicadores, políticas (segurança, backup, contratações conforme **Res. CNJ 468/2022** e Lei 14.133/2021).
`,
mindmap: `
Governança de TIC
  Conceitos
    Governança: avaliar, dirigir, monitorar
    Gestão: planejar, construir, executar
    ISO 38500
    COBIT 2019: EDM, APO, BAI, DSS, MEA
    ITIL 4
  Marco nacional
    Res. CNJ 370/2021
    ENTIC-JUD 2021-2026
    iGovTIC-JUD
    Comitês de governança e gestão
  PDTIC TRT4 2024-2026
    Referencial estratégico
    Diagnóstico e SWOT
    Inventário de necessidades
    Metas, ações e indicadores
    Pessoas e orçamento
    Riscos
    Revisão anual
  Instâncias
    Comitê de Governança de TIC
    Comitê de Gestão de TIC
    Secretaria de TIC
    Comitê de SI e LGPD
  Instrumentos
    Portfólio
    Catálogo de serviços
    SLA
    Contratações de TIC
`,
cards: [
  ['Diferença entre governança e gestão de TI (COBIT)?', 'Governança avalia, dirige e monitora; gestão planeja, constrói, executa e monitora.'],
  ['Qual resolução instituiu a ENTIC-JUD?', 'Resolução CNJ nº 370/2021 (período 2021–2026).'],
  ['O que é o PDTIC?', 'Plano Diretor de TIC: diagnóstico, planejamento e gestão dos recursos de TIC para um período, alinhado à estratégia institucional.'],
  ['Índice nacional de maturidade de governança de TIC no Judiciário?', 'iGovTIC-JUD.'],
  ['Domínio de governança do COBIT 2019?', 'EDM (Evaluate, Direct and Monitor).']
]});

/* ======================= INGLÊS TÉCNICO ======================= */
T({ id: 'ing-tecnico', disc: 'ing', title: 'Inglês técnico para TI',
summary: `
## Estratégias de leitura (o que a FCC cobra)
- **Skimming**: leitura rápida para captar a **ideia geral** (título, primeira e última frases dos parágrafos).
- **Scanning**: busca de **informação específica** (números, nomes, termos).
- **Cognatos** (palavras parecidas com o português): *system, application, security, protocol*.
- **Falsos cognatos** (cuidado!): *actually* = na verdade; *eventually* = finalmente/por fim; *pretend* = fingir; *push* = empurrar; *library* = biblioteca (de código); *assume* = supor; *realize* = perceber; *support* = suportar no sentido de dar suporte/apoiar; *exquisite* = requintado; *data* = dados; *parents* = pais; *sensible* = sensato; *fabric* = tecido; *lunch* = almoço.
- **Inferência pelo contexto** e identificação da **referência pronominal** (*it, they, which, this, these*).
- Grupos nominais: em inglês o **núcleo vem por último** — *open source software license* = licença de software de código aberto.

## Conectivos (marcadores do discurso)
| Função | Conectivos |
|---|---|
| Adição | *and, also, moreover, furthermore, in addition, besides* |
| Contraste | *but, however, nevertheless, although, though, even though, whereas, while, on the other hand, yet, despite / in spite of* |
| Causa | *because, since, as, due to, owing to* |
| Consequência / conclusão | *so, therefore, thus, hence, consequently, as a result* |
| Condição | *if, unless (= a menos que), provided that, as long as, otherwise* |
| Exemplo | *for example, for instance, such as, e.g.* |
| Explicação | *that is, i.e., in other words, namely* |
| Sequência | *first, then, next, finally, afterwards, meanwhile* |

## Verbos modais (sentido)
*can* (capacidade/permissão), *could* (possibilidade, passado de can), *may/might* (possibilidade), ***must*** (obrigação/dedução forte), ***should*** (recomendação), *have to* (obrigação externa), *don’t have to* (não precisa) × ***mustn’t*** (proibido), *will* (futuro), *would* (condicional).
> [!dica] Em RFCs (RFC 2119): **MUST / REQUIRED / SHALL** = obrigatório; **MUST NOT / SHALL NOT** = proibido; **SHOULD / RECOMMENDED** = recomendado (exceções justificadas); **SHOULD NOT** = não recomendado; **MAY / OPTIONAL** = opcional. Muito útil na RFC 9700 do OAuth!

## Vocabulário de TI frequente
| Inglês | Português |
|---|---|
| *deploy / deployment* | implantar / implantação |
| *release* | versão liberada / lançamento |
| *rollback* | reversão |
| *bug / fix / patch* | defeito / correção / remendo |
| *branch / merge / commit* | ramo / mesclagem / confirmação |
| *pipeline / build* | esteira / compilação-empacotamento |
| *backlog* | lista de pendências |
| *threat / vulnerability / breach* | ameaça / vulnerabilidade / violação |
| *leak / leakage* | vazamento |
| *wireless / wired* | sem fio / com fio |
| *throughput / bandwidth / latency* | vazão / largura de banda / latência |
| *load balancer* | balanceador de carga |
| *outage / downtime* | interrupção / tempo fora do ar |
| *upgrade / downgrade* | atualização / rebaixamento de versão |
| *requirement* | requisito |
| *stakeholder* | parte interessada |
| *feature* | funcionalidade |
| *framework* | arcabouço |
| *however* | entretanto |
| *whereas* | enquanto (contraste) |
| *thereby* | desse modo |
| *likewise* | da mesma forma |

## Prefixos e sufixos úteis
*un-, in-, im-, dis-, non-* (negação: *unauthorized, insecure, disable*); *re-* (de novo: *reboot*); *pre-/post-*; *over-/under-* (excesso/insuficiência: *overflow, underflow*); *-less* (sem: *serverless, stateless, passwordless*); *-able* (possível: *scalable*); *-ize* (verbo: *virtualize*); *-ment/-tion* (substantivo).

## Tempos verbais em textos técnicos
Presente simples (fatos/definições: *The server stores…*), **voz passiva** (*Data is encrypted…*, *The token must be validated…*), presente perfeito (*has been deprecated* = foi depreciado), imperativo em instruções (*Run the command…*).
`,
mindmap: `
Inglês técnico
  Leitura
    Skimming: ideia geral
    Scanning: dado específico
    Cognatos
    Falsos cognatos
      actually = na verdade
      eventually = por fim
      pretend = fingir
    Referência pronominal
    Núcleo no fim do grupo nominal
  Conectivos
    Adição: moreover
    Contraste: however, whereas
    Causa: due to, since
    Conclusão: therefore, thus
    Condição: unless
  Modais
    must: obrigação
    should: recomendação
    may: possibilidade
    mustn’t × don’t have to
    RFC 2119
  Vocabulário
    deploy, release, rollback
    threat, breach, leak
    throughput, latency
  Afixos
    un-, dis-, non-
    -less: stateless
    -able: scalable
  Gramática
    Voz passiva
    Presente perfeito
`,
cards: [
  ['“Actually” significa…', 'Na verdade, de fato (não “atualmente”, que é currently).'],
  ['“Eventually” significa…', 'Finalmente, por fim, mais cedo ou mais tarde.'],
  ['“Unless” significa…', 'A menos que.'],
  ['Na RFC 2119, “SHOULD” indica…', 'Recomendação: deve ser seguido, salvo razões válidas para exceção.'],
  ['“Whereas” expressa qual relação?', 'Contraste (enquanto, ao passo que).'],
  ['Tradução de “data breach”?', 'Violação de dados / vazamento de dados.'],
  ['“Mustn’t” × “don’t have to”?', 'Mustn’t = proibido; don’t have to = não é necessário.'],
  ['“Thereby” significa…', 'Desse modo, assim, com isso.']
]});
