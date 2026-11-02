/* Aulas completas — Segurança da Informação, LGPD, Normativos do CNJ/TRT4 e Inglês técnico */

/* ============================ SEGURANÇA ============================ */
A('seg-fund', `
## 1. O que estamos protegendo
**Informação** é um ativo: tem valor para a organização e, portanto, precisa de proteção. Num tribunal, isso inclui processos sigilosos, dados pessoais de partes, decisões ainda não publicadas e os próprios sistemas que garantem a prestação jurisdicional. **Segurança da informação** é a preservação das propriedades abaixo, por meio de **controles** (técnicos, físicos e organizacionais).

## 2. Os pilares — a tríade CID e seus complementos
| Propriedade | Pergunta | Ataque/falha que a viola | Controle típico |
|---|---|---|---|
| **Confidencialidade** | só quem tem **autorização** acessa? | vazamento, interceptação, espionagem | **criptografia**, controle de acesso |
| **Integridade** | a informação está **exata e completa**, sem alteração indevida? | adulteração de uma sentença no banco | **hash**, assinatura digital, controle de versões |
| **Disponibilidade** | está **acessível quando necessário**? | **DDoS**, ransomware, falha de hardware | redundância, **backup**, plano de continuidade |
| **Autenticidade** | a origem/identidade é **verdadeira**? | phishing, falsificação de remetente | autenticação forte, certificados |
| **Não repúdio (irretratabilidade)** | o autor **não pode negar** a autoria? | “não fui eu que assinei” | **assinatura digital** com certificado ICP-Brasil |
| Responsabilização (accountability) | conseguimos saber **quem fez o quê**? | ações anônimas | **logs** e trilhas de auditoria |
> [!fcc] Associações clássicas: **criptografia → confidencialidade**; **hash → integridade**; **assinatura digital → integridade + autenticidade + não repúdio** (assinatura **não** garante confidencialidade!); **backup e redundância → disponibilidade**.

### Vocabulário de risco
- **Ativo**: tudo que tem valor (informação, sistemas, pessoas, imagem).
- **Vulnerabilidade**: **fraqueza** que pode ser explorada (software desatualizado, senha fraca).
- **Ameaça**: **causa potencial** de um incidente (hacker, enchente, erro humano).
- **Risco**: **probabilidade** de uma ameaça explorar uma vulnerabilidade × **impacto** resultante.
- **Incidente**: evento indesejado que **compromete** ou pode comprometer a segurança.
- **Controle**: medida que **modifica o risco** (preventivo, detectivo, corretivo).

## 3. A família ISO/IEC 27000
| Norma | Papel |
|---|---|
| **27000** | visão geral e **vocabulário** |
| **27001** | **requisitos** de um **SGSI** (Sistema de Gestão de Segurança da Informação) — **é a única certificável** |
| **27002** | **código de prática**: orientações detalhadas para implementar os **controles** |
| **27005** | **gestão de riscos** de segurança da informação |
| **27701** | extensão para **privacidade** — **SGPI** (Sistema de Gestão da Privacidade da Informação), muito ligada à LGPD |
| 27017 / 27018 | controles para **nuvem** / proteção de dados pessoais em nuvem pública |
| 27035 | gestão de **incidentes** |
| 22301 | continuidade de negócios (não é da família 27000, mas anda junto) |

### ISO/IEC 27001:2022 — o SGSI
O SGSI é um **sistema de gestão** (como a ISO 9001 é para qualidade): a organização define **escopo**, **política de segurança**, **avalia e trata os riscos**, implementa controles, mede e melhora continuamente. Segue o ciclo **PDCA** (Plan–Do–Check–Act) e a estrutura comum das normas de gestão (cláusulas 4 a 10: contexto, liderança, planejamento, apoio, operação, avaliação de desempenho, melhoria).
- Documento-chave: **Declaração de Aplicabilidade (SoA — Statement of Applicability)**: lista **todos os controles do Anexo A**, dizendo **quais se aplicam**, por quê, e se estão implementados — e justificando as exclusões.
- O **Anexo A** traz os controles de referência.

### ISO/IEC 27002:2022 — os 93 controles em 4 temas
A versão 2022 reorganizou os antigos 114 controles (14 seções) em **93 controles** agrupados em **4 temas**:
| Tema | Nº de controles | Exemplos |
|---|---|---|
| **Organizacionais** | 37 | políticas, papéis, inventário de ativos, classificação, fornecedores, nuvem, incidentes, continuidade |
| **Pessoas** | 8 | seleção, termos de contratação, **conscientização e treinamento**, processo disciplinar, trabalho remoto |
| **Físicos** | 14 | perímetros, controle de entrada, **mesa limpa e tela limpa**, equipamentos, descarte seguro |
| **Tecnológicos** | 34 | autenticação, malware, **backup**, logs, criptografia, desenvolvimento seguro, gestão de vulnerabilidades |
Foram criados **11 controles novos**, entre eles: **inteligência de ameaças**, **segurança no uso de serviços em nuvem**, **prontidão de TIC para continuidade**, **monitoramento da segurança física**, **gestão de configuração**, **exclusão de informações**, **mascaramento de dados**, **prevenção de vazamento de dados (DLP)**, **atividades de monitoramento**, **filtragem web** e **codificação segura**.
Cada controle recebe **atributos** (tipo de controle — preventivo/detectivo/corretivo —, propriedades CID, conceitos de cibersegurança — **Identificar, Proteger, Detectar, Responder, Recuperar** —, capacidades operacionais e domínios de segurança).

### ISO/IEC 27005 — gestão de riscos
Processo: **estabelecer o contexto** → **avaliação de riscos** (= **identificação** + **análise** + **avaliação/valoração**) → **tratamento** → aceitação → comunicação e consulta, **monitoramento e análise crítica** contínuos. (Detalhes na aula de gestão de riscos.)

### ISO/IEC 27701 — privacidade
Estende a 27001/27002 com requisitos para **controladores** e **operadores** de dados pessoais (mesmos papéis da LGPD). Uma organização pode demonstrar boas práticas de proteção de dados implementando um **SGPI**.

## 4. CIS Controls v8 (Center for Internet Security)
Conjunto **priorizado e prático** de **18 controles** (com 153 salvaguardas) para defesa contra os ataques mais comuns. A ordem importa: começa pelo básico.
1. **Inventário e controle de ativos corporativos** (hardware) · 2. **Inventário e controle de ativos de software** · 3. Proteção de dados · 4. **Configuração segura** · 5. Gestão de contas · 6. Gestão de controle de acesso · 7. **Gestão contínua de vulnerabilidades** · 8. Gestão de logs de auditoria · 9. Proteção de e-mail e navegador · 10. Defesas contra malware · 11. **Recuperação de dados** · 12. Gestão da infraestrutura de rede · 13. Monitoramento e defesa da rede · 14. **Conscientização e treinamento** · 15. Gestão de provedores de serviço · 16. Segurança de software de aplicação · 17. Gestão de resposta a incidentes · 18. **Testes de invasão**.
### Grupos de Implementação (IG)
- **IG1**: **“higiene cibernética essencial”** — o mínimo que **toda** organização deve ter (56 salvaguardas).
- **IG2**: organizações com mais recursos e dados sensíveis (acrescenta salvaguardas).
- **IG3**: organizações com dados muito sensíveis e alvos de ataques sofisticados (todas as salvaguardas).
> [!dica] Lógica do CIS: **você não protege o que não sabe que tem** — por isso os controles 1 e 2 são inventários.

## 5. Princípios de projeto seguro que caem em qualquer tópico
**Menor privilégio**, **necessidade de conhecer (need to know)**, **segregação de funções** (quem solicita não aprova), **defesa em profundidade** (várias camadas de controle), **falha segura (fail-safe)**, **segurança por padrão (secure by default)**, **economia de mecanismo** (simplicidade), **mediação completa** (verificar toda requisição), **design aberto** (segurança não depende do segredo do algoritmo — princípio de Kerckhoffs) e **Zero Trust** (“nunca confie, sempre verifique”).
`);

A('seg-lgpd', `
## 1. Para que serve a LGPD (Lei nº 13.709/2018)
A LGPD regula o **tratamento de dados pessoais**, **inclusive nos meios digitais**, por **pessoa natural ou jurídica, de direito público ou privado**, para proteger os **direitos fundamentais de liberdade, privacidade e o livre desenvolvimento da personalidade**. Desde a **EC 115/2022**, a proteção de dados pessoais é **direito fundamental** (art. 5º, LXXIX, da CF) e a competência para legislar sobre o tema é **privativa da União**.

## 2. Conceitos (art. 5º) — a base de tudo
| Termo | Significado | Exemplo |
|---|---|---|
| **Dado pessoal** | informação relacionada a pessoa natural **identificada ou identificável** | nome, CPF, e-mail, IP, geolocalização |
| **Dado pessoal sensível** | origem racial ou étnica, convicção **religiosa**, opinião **política**, filiação a **sindicato** ou organização religiosa/filosófica/política, dado referente à **saúde** ou à **vida sexual**, dado **genético** ou **biométrico** | biometria facial, prontuário |
| **Dado anonimizado** | dado que **não permite identificar** o titular, considerando meios técnicos razoáveis | estatísticas agregadas |
| **Pseudonimização** | o dado perde a associação direta, **salvo** por informação adicional mantida separadamente — **continua sendo dado pessoal** | trocar o CPF por um código, com tabela guardada à parte |
| **Titular** | a **pessoa natural** a quem os dados se referem | |
| **Controlador** | quem **toma as decisões** sobre o tratamento | o TRT4, em relação aos dados dos jurisdicionados |
| **Operador** | quem **realiza o tratamento em nome** do controlador | empresa contratada para hospedar um sistema |
| **Encarregado (DPO)** | **canal de comunicação** entre controlador, titulares e ANPD | |
| **Agentes de tratamento** | **controlador e operador** (o encarregado **não** é agente de tratamento) | |
| **Tratamento** | **toda operação** com dados: coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, **eliminação**... | até consultar ou guardar já é tratamento |
| **ANPD** | Autoridade Nacional de Proteção de Dados — **fiscaliza e regula**; hoje é **autarquia de natureza especial** | |
> [!fcc] Dado **anonimizado não é** dado pessoal para a LGPD (salvo se a anonimização puder ser revertida). Dado **pseudonimizado continua sendo** dado pessoal.

## 3. Onde a LGPD **não** se aplica (art. 4º)
Tratamento feito por **pessoa natural para fins exclusivamente particulares e não econômicos**; para fins **exclusivamente jornalísticos, artísticos** ou **acadêmicos** (nestes, aplicam-se as bases dos arts. 7º e 11); para fins exclusivos de **segurança pública, defesa nacional, segurança do Estado** ou **investigação e repressão de infrações penais** (que terão lei específica); e dados vindos **de fora do Brasil** que não sejam compartilhados com agentes brasileiros nem objeto de transferência internacional com outro país.

## 4. Os 10 princípios (art. 6º) — além da **boa-fé**
| Princípio | Ideia |
|---|---|
| **Finalidade** | propósitos **legítimos, específicos, explícitos** e informados ao titular |
| **Adequação** | tratamento **compatível** com a finalidade informada |
| **Necessidade** | **mínimo necessário** (minimização de dados) |
| **Livre acesso** | consulta **facilitada e gratuita** sobre o tratamento |
| **Qualidade dos dados** | dados **exatos, claros, relevantes e atualizados** |
| **Transparência** | informações claras e acessíveis sobre o tratamento e os agentes |
| **Segurança** | medidas técnicas e administrativas contra acessos não autorizados e incidentes |
| **Prevenção** | medidas para **prevenir danos** |
| **Não discriminação** | proibido tratar para fins discriminatórios **ilícitos ou abusivos** |
| **Responsabilização e prestação de contas** | demonstrar a adoção de medidas **eficazes** |
Truque para memorizar: “**F**ui **A**o **N**orte **L**er **Q**uadrinhos **T**odo **S**ábado **P**ara **N**ão **R**elaxar”.

## 5. Bases legais — quando é permitido tratar dados
### Dados pessoais comuns (art. 7º — 10 hipóteses)
1. **Consentimento** do titular; 2. **cumprimento de obrigação legal ou regulatória**; 3. pela **administração pública**, para **execução de políticas públicas**; 4. **estudos por órgão de pesquisa** (com anonimização, sempre que possível); 5. **execução de contrato** ou procedimentos preliminares a pedido do titular; 6. **exercício regular de direitos** em processo judicial, administrativo ou arbitral; 7. **proteção da vida** ou da incolumidade física; 8. **tutela da saúde** (por profissionais de saúde ou autoridade sanitária); 9. **legítimo interesse** do controlador ou de terceiro (exceto se prevalecerem direitos do titular); 10. **proteção do crédito**.
### Dados sensíveis (art. 11)
Com **consentimento específico e destacado** para finalidades específicas, **ou sem consentimento** em hipóteses mais restritas: obrigação legal, políticas públicas, pesquisa, **exercício regular de direitos**, proteção da vida, tutela da saúde e **garantia da prevenção à fraude e à segurança do titular** em processos de identificação e autenticação (ex.: biometria). **Não há legítimo interesse nem proteção do crédito** para dados sensíveis.
> [!fcc] O **consentimento não é a única** base legal, nem a principal para o poder público. Tribunais tratam dados sobretudo por **obrigação legal**, **execução de políticas públicas** e **exercício de direitos em processo judicial**.

### Consentimento — requisitos
Manifestação **livre, informada e inequívoca**, para **finalidades determinadas** (autorizações genéricas são **nulas**); por escrito (em cláusula destacada) ou outro meio que demonstre a vontade; o **ônus da prova** é do controlador; pode ser **revogado a qualquer momento**, de forma gratuita e facilitada.

### Crianças e adolescentes (art. 14)
Tratamento no **melhor interesse**; para **crianças**, consentimento **específico e em destaque de pelo menos um dos pais ou responsável** (salvo para contatar os pais ou para proteção, uma única vez e sem armazenamento).

## 6. Direitos do titular (art. 18)
Confirmação da existência de tratamento; **acesso**; **correção** de dados incompletos, inexatos ou desatualizados; **anonimização, bloqueio ou eliminação** de dados desnecessários, excessivos ou tratados em desconformidade; **portabilidade**; **eliminação** dos dados tratados com consentimento; informação sobre **compartilhamento**; informação sobre a possibilidade de **não consentir** e suas consequências; **revogação** do consentimento. Também: **revisão de decisões automatizadas** (art. 20) que afetem seus interesses (perfil pessoal, profissional, de crédito).

## 7. Poder público (arts. 23 a 32)
Órgãos públicos tratam dados para atender sua **finalidade pública**, na **persecução do interesse público**, com o objetivo de executar **competências legais**, devendo **informar** as hipóteses de tratamento (preferencialmente nos sites) e **indicar um encarregado**. Os **serviços notariais e de registro** recebem o mesmo tratamento das pessoas jurídicas de direito público. O compartilhamento entre órgãos deve atender a finalidades específicas de políticas públicas. No Judiciário, a **Resolução CNJ nº 363/2021** estabelece medidas para adequação à LGPD.

## 8. Segurança, incidentes e boas práticas
- Agentes devem adotar medidas de segurança desde a **concepção** do produto ou serviço até a execução (**privacy by design** e **by default**).
- **Incidente de segurança** que possa acarretar **risco ou dano relevante** aos titulares deve ser comunicado à **ANPD e ao titular**. O **Regulamento de Comunicação de Incidente** (Resolução CD/ANPD nº 15/2024) fixa o prazo de **3 dias úteis** a partir do conhecimento.
- **Relatório de Impacto à Proteção de Dados Pessoais (RIPD)**: documentação do controlador que descreve os processos que podem gerar **riscos às liberdades civis e direitos fundamentais**, com medidas de mitigação — pode ser exigido pela ANPD (especialmente para dados sensíveis e legítimo interesse).
- **Registro das operações de tratamento** (controlador e operador).
- **Transferência internacional** só nas hipóteses do art. 33 (países com nível adequado, cláusulas contratuais padrão, normas corporativas globais, consentimento específico etc.).

## 9. Responsabilidade e sanções
- Controlador ou operador que causar dano, em violação à lei, deve **repará-lo**; o operador responde **solidariamente** quando descumprir a lei ou as instruções do controlador.
- **Sanções administrativas** da ANPD (art. 52): **advertência**; **multa simples** de até **2% do faturamento** da empresa no Brasil no último exercício, limitada a **R$ 50 milhões por infração**; multa diária; **publicização** da infração; **bloqueio** e **eliminação** dos dados; suspensão parcial do banco de dados; suspensão e **proibição** das atividades de tratamento.
> [!fcc] Órgãos e entidades **públicos não** estão sujeitos às **multas** (simples e diária); recebem as demais sanções (sem prejuízo das leis de improbidade, de acesso à informação e de servidores).
`);

A('seg-riscos', `
## 1. Por que gerir riscos
Não existe risco zero e os recursos são limitados. A gestão de riscos permite **priorizar**: proteger primeiro o que é mais provável e mais danoso. Referências: **ISO 31000** (gestão de riscos em geral), **ISO/IEC 27005** (riscos de segurança da informação), **NIST SP 800-30**.

## 2. O processo (ISO/IEC 27005 e ISO 31000)
1. **Estabelecer o contexto**: escopo, critérios de risco (o que é alto, médio, baixo), **apetite** e **tolerância** a risco.
2. **Avaliação de riscos (risk assessment)**, que tem três etapas:
   - **Identificação**: ativos, ameaças, vulnerabilidades, controles existentes, consequências;
   - **Análise**: estimar **probabilidade** e **impacto** → **nível de risco**;
   - **Avaliação (valoração)**: comparar com os critérios e **priorizar**.
3. **Tratamento**: escolher a resposta e implementar controles.
4. **Aceitação** do risco residual pelos gestores.
5. **Comunicação e consulta** e **monitoramento e análise crítica** — contínuos, em todas as etapas.

### Análise qualitativa × quantitativa
- **Qualitativa**: escalas descritivas (baixo/médio/alto) e **matriz de probabilidade × impacto** (mapa de calor). Mais comum e rápida.
- **Quantitativa**: valores monetários. Fórmulas clássicas:
  - **SLE** (Single Loss Expectancy — perda esperada por ocorrência) = **valor do ativo × fator de exposição**;
  - **ARO** (Annualized Rate of Occurrence) = ocorrências esperadas por ano;
  - **ALE** (Annualized Loss Expectancy) = **SLE × ARO**.
  Exemplo: servidor de R$ 200.000, um incêndio destruiria 50% (EF = 0,5) → SLE = R$ 100.000; ocorre uma vez a cada 10 anos (ARO = 0,1) → **ALE = R$ 10.000/ano**. Um controle que custe mais que isso por ano não se justifica só financeiramente.

## 3. Opções de tratamento
| Opção | O que é | Exemplo |
|---|---|---|
| **Mitigar / reduzir / modificar** | aplicar **controles** para baixar probabilidade ou impacto | MFA, patches, backup |
| **Transferir / compartilhar** | passar parte do risco a **terceiros** | **seguro**, contrato com SLA, nuvem |
| **Evitar / eliminar** | **deixar de realizar** a atividade que gera o risco | desligar um serviço legado inseguro |
| **Aceitar / reter** | conviver conscientemente com o risco (custo do controle > benefício), **formalmente** | |
- **Risco inerente**: antes dos controles. **Risco residual**: o que **sobra** depois dos controles — precisa ser aceito formalmente.

## 4. Continuidade de negócios (ISO 22301)
Garantir que **os serviços críticos continuem** (ou voltem rapidamente) diante de desastres: incêndio, ransomware, falta de energia prolongada.
- **BIA (Business Impact Analysis — Análise de Impacto nos Negócios)**: identifica os **processos críticos**, os impactos de sua interrupção ao longo do tempo e define os parâmetros de recuperação. É a **base** do plano.
- **PCN (Plano de Continuidade de Negócios)**, que inclui: **plano de gerenciamento de crises/incidentes**, **plano de continuidade operacional** (como continuar operando, mesmo de forma degradada) e **plano de recuperação de desastres (PRD/DRP)** — focado em **restaurar a TI**.
- **Testes e exercícios** periódicos (simulação de mesa, testes de restauração) — plano não testado é só um documento.

### As métricas que mais caem
| Sigla | Significado | Pergunta | Relacionado a |
|---|---|---|---|
| **RPO** (Recovery Point Objective) | **ponto de recuperação** | **quanto de dados** posso perder? (volta até quando) | **frequência do backup/replicação** |
| **RTO** (Recovery Time Objective) | **tempo de recuperação** | **em quanto tempo** o serviço tem de voltar? | estratégia de recuperação (site, automação) |
| **MTPD/MTPO** | período máximo tolerável de interrupção | a partir de quando o dano é inaceitável? | RTO deve ser **menor** que ele |
| MTBF / MTTR | tempo médio entre falhas / tempo médio de reparo | confiabilidade | |
Exemplo: RPO de 1 hora → preciso de backup ou replicação **pelo menos a cada hora**. RTO de 4 horas → o sistema deve estar no ar em até 4 horas após o desastre.
> [!dica] Truque: **RPO = Pontos no passado (dados)**; **RTO = Tempo para voltar (futuro)**.

### Sites alternativos
| Tipo | Prontidão | Custo |
|---|---|---|
| **Hot site** | equipamentos e **dados atualizados**, pronto em minutos/horas | alto |
| **Warm site** | equipamentos prontos, dados precisam ser restaurados | médio |
| **Cold site** | só o espaço físico, energia e refrigeração | baixo; recuperação em dias/semanas |

## 5. Gestão de incidentes
**Evento** (qualquer ocorrência observável) → **incidente** (evento que compromete ou ameaça a segurança). Fases do ciclo (**NIST SP 800-61**):
1. **Preparação** (equipe — **ETIR/CSIRT** —, ferramentas, playbooks);
2. **Detecção e análise** (SIEM, alertas, triagem, classificação de severidade);
3. **Contenção, erradicação e recuperação** (isolar a máquina, remover o malware, restaurar);
4. **Atividades pós-incidente** (**lições aprendidas**, ajustes de controles).
Ponto importante: **preservar evidências** (cadeia de custódia) antes de “limpar” — e **notificar** quem deve ser notificado (ANPD em caso de dados pessoais; CPTRIC-PJ no Judiciário).

## 6. Backup — o que você precisa saber
### Tipos
| Tipo | O que copia | Backup | Restauração | Atributo de arquivamento |
|---|---|---|---|---|
| **Completo (full)** | **tudo** | mais lento, mais espaço | **mais simples** (só ele) | **desmarca** |
| **Incremental** | o que mudou desde o **último backup de qualquer tipo** | **mais rápido**, menos espaço | **mais lenta**: último completo **+ todos** os incrementais em ordem | **desmarca** |
| **Diferencial** | o que mudou desde o **último completo** | cresce a cada dia | último completo **+ o último diferencial** | **não desmarca** |
Exemplo: completo no domingo, falha na quinta. Com **incrementais** diários, restauro domingo + seg + ter + qua. Com **diferenciais**, restauro domingo + **só** o de quarta.
- **Sintético**: um completo montado a partir do completo anterior + incrementais (sem ler de novo a origem). **Contínuo (CDP)**: registra cada mudança.
- **Snapshot** **não é backup** completo: fica no mesmo sistema de armazenamento; se o storage falha, perde-se tudo.

### Regra 3-2-1 (e a evolução 3-2-1-1-0)
**3** cópias dos dados, em **2** mídias/tipos diferentes, com **1** cópia **fora do local** (offsite). Contra **ransomware**: **+1** cópia **offline, imutável ou isolada (air-gapped)** e **0** erros na verificação (**testar restauração** regularmente).
> [!fcc] **Backup não testado não é backup.** E **RAID não é backup**: RAID protege contra falha de disco (disponibilidade), não contra exclusão acidental, corrupção ou ransomware (o RAID replica o estrago).

### RAID em uma tabela
| Nível | Técnica | Mínimo de discos | Tolera falhas |
|---|---|---|---|
| **RAID 0** | **striping** (divisão) — desempenho | 2 | **nenhuma** |
| **RAID 1** | **espelhamento** | 2 | 1 disco |
| **RAID 5** | striping com **paridade distribuída** | **3** | **1** disco |
| **RAID 6** | **dupla paridade** | **4** | **2** discos |
| **RAID 10 (1+0)** | espelhamento + striping | 4 | 1 por par espelhado |
`);

A('seg-cripto', `
## 1. A ideia da criptografia
Criptografar é transformar uma mensagem legível (**texto claro**) em algo ininteligível (**texto cifrado**) usando um **algoritmo** e uma **chave**; só quem tem a chave correta consegue **decifrar**. Pelo **princípio de Kerckhoffs**, a segurança deve depender **apenas do segredo da chave**, não do segredo do algoritmo (que pode e deve ser público e testado).

## 2. Criptografia simétrica — uma chave só
A **mesma chave** cifra e decifra. É como um cofre cuja chave os dois lados precisam ter.
- **Vantagem**: **muito rápida** — ideal para grandes volumes de dados.
- **Problema**: **distribuir a chave** com segurança e o **número de chaves** — para n pessoas conversarem em pares são necessárias **n(n−1)/2** chaves (100 pessoas → 4.950 chaves).
- Algoritmos: **AES** (o padrão atual; blocos de 128 bits; chaves de **128, 192 ou 256** bits), **ChaCha20** (de fluxo, rápido em celulares); obsoletos: **DES** (chave de 56 bits — quebrado), **3DES**, **RC4**.
- Cifras **de bloco** (AES) × **de fluxo** (ChaCha20, RC4). Modos de operação de bloco: **ECB** (inseguro: blocos iguais geram cifrados iguais — revela padrões), **CBC**, **CTR**, **GCM** (preferido: cifra **e** autentica — **AEAD**).

## 3. Criptografia assimétrica — par de chaves
Cada pessoa tem **duas chaves matematicamente relacionadas**: uma **pública** (divulgada a todos) e uma **privada** (guardada em segredo). O que uma cifra, **só a outra** decifra.
- **Mais lenta** que a simétrica; resolve a **distribuição de chaves** (n pessoas → **2n** chaves).
- Algoritmos: **RSA** (fatoração de números grandes; chaves de 2048+ bits), **ECC** (curvas elípticas — mesma segurança com chaves **bem menores**: ECDSA, Ed25519), **Diffie-Hellman** (troca/acordo de chaves), DSA.

### Os dois usos — é aqui que a prova pega
| Objetivo | Quem cifra/assina | Com qual chave | Quem decifra/verifica | Com qual chave |
|---|---|---|---|---|
| **Confidencialidade** (só o destinatário lê) | remetente | **pública do DESTINATÁRIO** | destinatário | **privada do destinatário** |
| **Assinatura digital** (autoria e integridade) | remetente | **privada do REMETENTE** | qualquer pessoa | **pública do remetente** |
> [!fcc] Regra de ouro: para **sigilo**, use a chave **pública de quem recebe**; para **assinar**, use a chave **privada de quem envia**. A chave privada **nunca** sai do dono.

## 4. Funções hash — a impressão digital dos dados
Uma função hash transforma uma entrada **de qualquer tamanho** numa saída de **tamanho fixo** (o **resumo**/digest). Propriedades:
- **Determinística**: a mesma entrada sempre gera o mesmo hash;
- **Unidirecional (resistência à pré-imagem)**: impossível na prática obter a entrada a partir do hash — **hash não é criptografia** (não há “decifrar”);
- **Efeito avalanche**: mudar um bit muda o hash completamente;
- **Resistência a colisões**: impraticável achar duas entradas com o mesmo hash.
| Algoritmo | Saída | Situação |
|---|---|---|
| MD5 | 128 bits | **quebrado** (colisões) — não usar para segurança |
| SHA-1 | 160 bits | **quebrado** (colisão prática em 2017) |
| **SHA-256** (família SHA-2) | 256 bits | **recomendado** |
| SHA-3 | variável | recomendado |
Usos: **verificar integridade** de arquivos, base da **assinatura digital**, armazenamento de **senhas**.
- **Senhas** devem ser guardadas com funções **lentas e com sal (salt)** — **bcrypt, scrypt, Argon2, PBKDF2** — nunca com MD5/SHA puro. O **sal** (valor aleatório por usuário) impede ataques com **tabelas pré-computadas (rainbow tables)** e faz senhas iguais gerarem hashes diferentes.
- **HMAC**: hash combinado com uma **chave secreta** → garante **integridade e autenticidade** (mas não não repúdio, pois a chave é compartilhada).

## 5. Assinatura digital passo a passo
**Assinando:**
1. Calcula-se o **hash** do documento.
2. Cifra-se esse hash com a **chave privada do signatário** → isso é a **assinatura**.
**Verificando:**
1. O verificador decifra a assinatura com a **chave pública** do signatário → obtém o hash original.
2. Calcula o hash do documento recebido.
3. **Se os dois hashes forem iguais**: o documento **não foi alterado** (integridade) e foi assinado por quem tem a chave privada (**autenticidade** e **não repúdio**).
> [!fcc] Assinatura digital **não** garante **confidencialidade**: o documento continua legível. Para sigilo, é preciso também cifrar.

## 6. Certificado digital e ICP-Brasil
Problema: como saber que a chave pública “do TRT4” é mesmo do TRT4? O **certificado digital** é um documento eletrônico que **vincula uma chave pública a uma identidade**, **assinado por uma Autoridade Certificadora (AC)** confiável. Padrão **X.509**; contém: dados do titular, **chave pública**, emissor, **validade**, número de série e a **assinatura da AC**.
### ICP-Brasil (MP 2.200-2/2001)
Infraestrutura de Chaves Públicas Brasileira — garante **autenticidade, integridade e validade jurídica** de documentos eletrônicos. Documentos assinados com certificado ICP-Brasil **presumem-se verdadeiros** em relação aos signatários.
| Entidade | Papel |
|---|---|
| **AC-Raiz** (operada pelo **ITI** — Instituto Nacional de Tecnologia da Informação) | topo da cadeia: credencia e certifica as ACs de nível imediatamente inferior; **não emite certificados para usuários finais** |
| **AC** (Autoridade Certificadora) | **emite, renova e revoga** certificados |
| **AR** (Autoridade de Registro) | **identifica presencialmente/valida** o solicitante e encaminha à AC; **não emite** certificados |
| Comitê Gestor da ICP-Brasil | define políticas |
- **Tipos**: **A1** (gerado e armazenado em **software**, no computador; validade de até **1 ano**) e **A3** (armazenado em **hardware criptográfico** — **token USB ou cartão inteligente** —, ou em nuvem/HSM; validade de até 5 anos, mais seguro). Também há tipos S (sigilo) e T (carimbo do tempo).
- **Revogação**: certificados comprometidos entram na **LCR/CRL** (Lista de Certificados Revogados) ou são consultados on-line via **OCSP**.
- **Carimbo do tempo**: prova a **data e hora** em que o documento existia.
- **Lei 14.063/2020**: classifica as assinaturas eletrônicas em **simples**, **avançada** e **qualificada** (esta, com certificado ICP-Brasil — o maior nível de confiabilidade).

## 7. TLS 1.2 — como o HTTPS protege a conexão
O **TLS** (Transport Layer Security, sucessor do **SSL**, que é obsoleto e inseguro) cria um canal **confidencial e íntegro** e **autentica o servidor** (e opcionalmente o cliente, com mTLS). Ele usa **criptografia híbrida**: a **assimétrica** para autenticar e **combinar uma chave de sessão**, e a **simétrica** (rápida) para cifrar os dados.

### Handshake do TLS 1.2 (simplificado)
1. **ClientHello**: versões suportadas, **cipher suites** aceitas, número aleatório.
2. **ServerHello**: a versão e a cipher suite escolhidas, número aleatório; o servidor envia seu **certificado** (Certificate) e, com troca efêmera, os parâmetros de chave (**ServerKeyExchange**), terminando com **ServerHelloDone**.
3. O cliente **valida o certificado** (assinado por AC confiável? dentro da validade? o nome confere com o site? não revogado?).
4. **ClientKeyExchange**: o cliente envia sua parte da troca de chaves (no **ECDHE**) — ou, no antigo modo RSA, o pre-master secret cifrado com a chave pública do servidor.
5. Ambos derivam o **master secret** e as **chaves de sessão simétricas**.
6. **ChangeCipherSpec** + **Finished** dos dois lados (verificam que ninguém adulterou o handshake). A partir daí, os dados trafegam cifrados (ex.: **AES-GCM**).
### Cipher suite — como ler
\`TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256\`: troca de chaves **ECDHE** · autenticação do servidor **RSA** · cifra simétrica **AES-128 em modo GCM** · hash **SHA-256** (para a função pseudoaleatória).
- **Forward secrecy (sigilo perfeito de encaminhamento)**: com trocas **efêmeras** (**DHE/ECDHE**), mesmo que a chave privada do servidor vaze no futuro, as sessões gravadas no passado **não** podem ser decifradas. A troca por **RSA estático não oferece** isso.
### TLS 1.3 (para comparar)
Handshake mais rápido (**1-RTT**, com opção **0-RTT**), **só** trocas efêmeras (**forward secrecy obrigatório**), remoção de algoritmos fracos (RSA estático, CBC, RC4, SHA-1, MD5), mais partes do handshake cifradas. **SSL 2.0/3.0 e TLS 1.0/1.1 estão descontinuados**; o mínimo aceitável hoje é o **TLS 1.2** bem configurado.
- **HSTS**: cabeçalho que obriga o navegador a usar sempre HTTPS (evita ataques de rebaixamento como o SSL stripping).
`);

A('seg-acesso', `
## 1. Identificação, autenticação, autorização e auditoria (IAAA)
1. **Identificação**: dizer quem você é (o login, o crachá).
2. **Autenticação**: **provar** que é você.
3. **Autorização**: verificar o que você **pode** fazer.
4. **Auditoria/accountability**: **registrar** o que você fez.

## 2. Fatores de autenticação
| Fator | “Algo que você...” | Exemplos |
|---|---|---|
| **Conhecimento** | **sabe** | senha, PIN, resposta secreta |
| **Posse** | **tem** | token, celular com app autenticador, cartão inteligente, chave de segurança FIDO2 |
| **Inerência** | **é** | biometria: digital, face, íris, voz |
Às vezes citam-se também **localização** (onde você está) e **comportamento** (como você digita).

### MFA — Autenticação multifator
Exige **dois ou mais fatores de categorias DIFERENTES**.
> [!fcc] **Senha + PIN não é MFA** (os dois são “algo que você sabe”). **Senha + código no celular** é MFA (sabe + tem).
- Métodos, do mais fraco ao mais forte: código por **SMS** (vulnerável a **SIM swap** e interceptação) → **TOTP** em app autenticador (código de 6 dígitos que muda a cada 30 s, gerado a partir de um segredo compartilhado + horário) → notificação push (atenção à **fadiga de MFA**: o atacante dispara pedidos até o usuário aceitar; mitigação: number matching) → **FIDO2/WebAuthn/passkeys** e chaves de segurança físicas, **resistentes a phishing** (a credencial é vinculada ao domínio legítimo).
- A **ENSEC-PJ** exige **MFA**, prioritariamente para acessos remotos e contas privilegiadas.

### Senhas — orientações modernas (NIST SP 800-63B)
Privilegiar **comprimento** (frases-senha) a regras complexas; **não forçar troca periódica** sem indício de comprometimento; comparar com listas de **senhas vazadas**; permitir colar (gerenciadores de senhas); bloqueio/atraso após tentativas falhas.

### SSO e federação
**SSO** (login único) com **Kerberos** (rede Windows/AD), **SAML 2.0** (federação corporativa, XML) e **OpenID Connect** (sobre OAuth 2.0, JSON/JWT) — como o Keycloak da PDPJ.

## 3. Modelos de controle de acesso
| Modelo | Quem decide | Como funciona | Exemplo |
|---|---|---|---|
| **DAC** — Discricionário | o **dono** do recurso | o proprietário concede permissões a quem quiser (**ACLs**) | permissões de arquivos no Windows/Linux |
| **MAC** — Mandatório (obrigatório) | o **sistema**, por **política central** | **rótulos de classificação** (secreto, confidencial) e **níveis de habilitação**; o usuário **não pode alterar** | ambientes militares, SELinux |
| **RBAC** — Baseado em papéis | o administrador, por **função** | permissões são dadas a **papéis**; usuários recebem papéis | “Servidor de Vara”, “Magistrado”, “Assessor” |
| **ABAC** — Baseado em atributos | **políticas** sobre **atributos** | avalia atributos do **usuário**, do **recurso**, da **ação** e do **ambiente** (horário, local, dispositivo) | “permitir se cargo = analista **e** horário comercial **e** rede interna” |
| Rule-based | regras globais | ex.: regras de firewall | |
### RBAC em detalhe (o mais cobrado)
- **Usuários → papéis → permissões**. Quando alguém muda de setor, troca-se o papel — não dezenas de permissões individuais. Facilita **auditoria** e o **menor privilégio**.
- **Hierarquia de papéis**: papéis superiores herdam permissões dos inferiores.
- **Restrições de segregação de funções (SoD)**: **estática** (o usuário não pode ter **ao mesmo tempo** os papéis “solicitar pagamento” e “aprovar pagamento”) e **dinâmica** (pode ter os dois, mas não ativá-los **na mesma sessão**).
- Modelo NIST: RBAC0 (básico), RBAC1 (hierarquia), RBAC2 (restrições), RBAC3 (ambos).

### Modelos formais clássicos
- **Bell-LaPadula** (foco em **confidencialidade**): **“no read up, no write down”** — não ler acima do seu nível; não escrever abaixo (para não vazar).
- **Biba** (foco em **integridade**): **“no read down, no write up”** — o contrário.
- **Clark-Wilson** (integridade comercial: transações bem formadas e segregação de funções).

## 4. Princípios aplicados ao acesso
- **Menor privilégio**: só o mínimo necessário, pelo tempo necessário (acesso **just-in-time**).
- **Need to know**: mesmo com nível de acesso, só vê o que precisa para o trabalho.
- **Segregação de funções**.
- **PAM (Privileged Access Management)**: cofre de senhas de administradores, sessões gravadas, elevação temporária, contas privilegiadas separadas das contas do dia a dia.
- **Gestão do ciclo de vida das identidades** (IGA): **admissão** (provisionamento), **mudança de função** (revisar acessos — evitar **acúmulo de privilégios**, o “privilege creep”), **desligamento** (**revogação imediata**); **recertificação periódica** de acessos pelos gestores.

## 5. Auditoria
- **Logs** devem registrar: **quem** (identidade), **o quê** (ação), **quando** (data/hora sincronizada por **NTP**), **onde** (origem, sistema) e o **resultado** (sucesso/falha).
- Proteger os logs contra **alteração** (centralização em servidor separado/SIEM, armazenamento imutável, hashes) e definir **tempo de retenção**.
- Revisão periódica e alertas automáticos (logins fora do horário, muitas falhas, uso de contas administrativas).
- **Trilhas de auditoria** são exigidas pelo **MoReq-Jus** e servem também à **LGPD** (responsabilização) e às investigações (**PIILC-PJ**).
`);

A('seg-redes', `
## 1. Defesa em profundidade na rede
Nenhum equipamento sozinho resolve. A rede segura combina **camadas**: firewall de borda, segmentação (DMZ, VLANs), IDS/IPS, WAF para aplicações web, controle de acesso à rede (NAC), VPN para acesso remoto e um SIEM que **correlaciona** tudo.

## 2. Firewall — tipos e evolução
| Tipo | Camada | Como decide | Limitação |
|---|---|---|---|
| **Filtro de pacotes (stateless)** | 3 e 4 | olha **cada pacote isoladamente**: IP de origem/destino, porta, protocolo (ACLs) | não entende o contexto da conexão |
| **Stateful (inspeção de estado)** | 3 e 4 | mantém uma **tabela de estado das conexões**; permite automaticamente o tráfego de **retorno** de conexões legítimas | não olha o conteúdo da aplicação |
| **Proxy / gateway de aplicação** | 7 | intermedia a conexão e entende o protocolo da aplicação | mais lento |
| **NGFW (Next-Generation Firewall)** | 3 a 7 | stateful + **identificação de aplicações** (independe da porta) + **IPS integrado** + **inspeção TLS** + controle por **usuário** + inteligência de ameaças | custo |
- **Regras** são avaliadas **de cima para baixo**; vale a **primeira** que casar. Ao final, a política mais segura é **negar tudo o que não foi explicitamente permitido** (**deny by default / default deny**).
- Firewall **de host** (no próprio servidor) complementa o de rede.

## 3. DMZ (zona desmilitarizada)
Uma **rede intermediária** entre a internet e a rede interna, onde ficam os **serviços expostos ao público** (servidor web, DNS externo, e-mail, proxy reverso). Se um desses servidores for invadido, o atacante **ainda não está** na rede interna, porque o firewall controla rigidamente o tráfego **DMZ → interna**.
Arquiteturas: **firewall com três interfaces** (internet, DMZ, interna) ou **dois firewalls** (externo e interno — idealmente de fabricantes diferentes). Regra geral: internet → DMZ permitido só nas portas do serviço; DMZ → rede interna **bloqueado** (salvo exceções mínimas); rede interna → DMZ controlado.

## 4. IDS × IPS
| | **IDS** (Intrusion **Detection** System) | **IPS** (Intrusion **Prevention** System) |
|---|---|---|
| Ação | **detecta e alerta** (passivo) | **detecta e bloqueia** (ativo) |
| Posição | **fora do caminho** do tráfego (recebe **cópia** via SPAN/TAP) | **em linha (inline)**: o tráfego passa por ele |
| Risco | não impede o ataque | um **falso positivo bloqueia tráfego legítimo**; se cair, pode derrubar a rede |
**Onde**: **NIDS/NIPS** (na rede) × **HIDS/HIPS** (no host — monitora arquivos, logs, processos; ex.: integridade de arquivos).
**Como detecta**:
- **Por assinatura (misuse)**: compara com **padrões de ataques conhecidos** — preciso, poucos falsos positivos, mas **não detecta ataques novos (zero-day)**.
- **Por anomalia (comportamento)**: aprende o **comportamento normal** e alerta sobre desvios — **pode detectar ataques novos**, mas gera **mais falsos positivos**.
- **Falso positivo**: alerta sem ataque real. **Falso negativo**: ataque real **não detectado** (o pior).
Ferramentas: **Snort**, **Suricata**, Zeek. Evolução nos endpoints: **EDR/XDR** (detecção e resposta no endpoint / estendida).

## 5. WAF (Web Application Firewall)
Firewall de **camada 7** especializado em **HTTP/HTTPS**: inspeciona requisições e respostas para bloquear ataques às **aplicações web** — **SQL injection**, **XSS**, inclusão de arquivos, abuso de bots, violações de protocolo (base: **OWASP Top 10**, conjuntos de regras como **OWASP CRS** com o ModSecurity). Fica normalmente **na frente** dos servidores web (como proxy reverso). Também faz **virtual patching** (mitiga uma falha enquanto o código não é corrigido).
> [!fcc] O firewall de rede tradicional **não** protege contra SQL injection na porta 443 — para isso é preciso **WAF** (e, principalmente, código seguro).

## 6. SIEM (Security Information and Event Management)
Plataforma que **coleta e centraliza logs** de toda a infraestrutura (firewalls, servidores, AD, aplicações), **normaliza**, **correlaciona eventos** (ex.: 50 falhas de login seguidas de um sucesso vindo de outro país), gera **alertas**, painéis e relatórios, e **retém** os registros para **investigação forense** e conformidade. É a ferramenta central do **SOC** (Centro de Operações de Segurança). Exemplos: Splunk, Wazuh, QRadar, Microsoft Sentinel, Elastic Security.
- **SOAR** complementa o SIEM **automatizando respostas** (playbooks).

## 7. NAC (Network Access Control)
Controla **quem e o quê pode se conectar à rede**, antes de liberar o acesso: **autentica** o usuário/dispositivo (com **802.1X** + **RADIUS**) e verifica a **conformidade (postura)** — antivírus ativo, sistema atualizado, criptografia de disco. Dispositivos não conformes vão para uma **VLAN de quarentena** ou de remediação; visitantes, para uma rede isolada. Elementos do 802.1X: **suplicante** (o dispositivo), **autenticador** (o switch ou AP) e **servidor de autenticação** (RADIUS).

## 8. VPN (Virtual Private Network)
Cria um **túnel cifrado** sobre uma rede insegura (a internet).
- **Site a site**: liga redes inteiras (sede ↔ fóruns), em geral com **IPsec** em modo túnel.
- **Acesso remoto (client-to-site)**: o servidor em teletrabalho acessa a rede do tribunal — **IPsec/IKEv2**, **SSL/TLS VPN**, **WireGuard**.
- **Split tunneling**: só o tráfego corporativo vai pelo túnel (economiza banda, mas reduz o controle). **Full tunnel**: tudo passa pela VPN.
- Limitação: a VPN tradicional, uma vez conectada, costuma dar acesso **amplo à rede** — se a credencial for roubada, o atacante “entra no prédio”.

## 9. ZTNA e Zero Trust
**Zero Trust** (NIST SP 800-207): **nunca confiar, sempre verificar** — **não existe rede confiável** só por estar “dentro”. Cada acesso é avaliado com base em **identidade**, **dispositivo**, contexto e risco, com **menor privilégio** e **verificação contínua**; supõe-se que a violação **já pode ter ocorrido** (assume breach). Componentes: **PDP** (Policy Decision Point — decide) e **PEP** (Policy Enforcement Point — aplica).
**ZTNA (Zero Trust Network Access)** aplica essa ideia ao acesso remoto: o usuário recebe acesso **a uma aplicação específica**, **não à rede inteira**; as aplicações ficam **invisíveis** para quem não está autorizado; a autorização é reavaliada continuamente. É apontado como sucessor da VPN tradicional.
- **Microsegmentação**: dividir a rede em zonas muito pequenas (até por carga de trabalho), limitando o **movimento lateral** de um invasor.
- **SASE**: convergência de rede (SD-WAN) e segurança (ZTNA, SWG, CASB, FWaaS) entregue pela nuvem.
`);

A('seg-ataques', `
## 1. Malware — conheça cada tipo pelo comportamento
| Tipo | Característica que o define |
|---|---|
| **Vírus** | **infecta** arquivos/programas e **depende de ação do usuário** (executar o arquivo) para se propagar |
| **Worm (verme)** | **propaga-se sozinho** pela rede, explorando vulnerabilidades, **sem** precisar de hospedeiro nem de ação do usuário |
| **Cavalo de Troia (trojan)** | **disfarça-se de programa legítimo** e executa funções maliciosas ocultas; **não se replica** |
| **Ransomware** | **criptografa** os dados (ou os rouba) e exige **resgate**; a modalidade de **dupla extorsão** também ameaça **vazar** os dados |
| **Spyware** | **espiona** e coleta informações; inclui **keylogger** (captura o que se digita) e **screenlogger** (captura a tela/cliques) |
| **Adware** | exibe propaganda indesejada |
| **Backdoor** | cria uma **porta dos fundos** para acesso remoto posterior |
| **Rootkit** | **esconde** a presença do invasor e de outros malwares, muitas vezes com privilégios de **kernel** |
| **Bot / botnet** | máquina infectada controlada remotamente (**zumbi**) por um servidor de **comando e controle (C2)**; redes de bots fazem DDoS, spam |
| **RAT** | trojan de acesso remoto |
| **Fileless** | roda **só na memória**, usando ferramentas legítimas do sistema (PowerShell), sem deixar arquivos |
| **Bomba lógica** | dispara quando ocorre uma **condição** (data, evento) |
> [!fcc] Diferença mais cobrada: **vírus precisa de hospedeiro e de execução**; **worm se espalha sozinho**; **trojan engana** (parece legítimo) e não se replica.

## 2. Engenharia social — atacando as pessoas
| Ataque | Como funciona |
|---|---|
| **Phishing** | mensagem falsa (e-mail, site) que imita uma instituição para **roubar credenciais** ou instalar malware |
| **Spear phishing** | phishing **direcionado** a uma pessoa/organização específica, com informações personalizadas |
| **Whaling** | spear phishing contra **altos executivos** (presidente do tribunal, diretores) |
| **Smishing** / **vishing** | phishing por **SMS** / por **voz** (telefone) |
| **Pharming** | **redireciona** o usuário a um site falso mesmo digitando o endereço certo, envenenando o **DNS** ou o arquivo hosts |
| **Pretexting** | inventa um **pretexto** (“sou do suporte de TI...”) |
| **Baiting** | isca: pendrive “perdido” com malware |
| **Tailgating / piggybacking** | entrar em área restrita **seguindo** alguém autorizado |
| **BEC** (Business Email Compromise) | e-mail se passando por diretor/fornecedor para desviar **pagamentos** |
| **Quid pro quo** | oferece algo em troca de informação |
Defesa principal: **conscientização e treinamento** contínuos, simulações de phishing, MFA, verificação por outro canal, filtros de e-mail com **SPF, DKIM e DMARC**.

## 3. Ataques de rede e aplicação
| Ataque | Descrição | Defesa |
|---|---|---|
| **DoS / DDoS** | esgotar recursos para **derrubar a disponibilidade**; DDoS usa muitas origens (botnets); variantes: **SYN flood**, **amplificação** (DNS, NTP, memcached), ataques de camada 7 | serviços antiDDoS, CDN, rate limiting, SYN cookies |
| **Man-in-the-Middle (MitM)** | o atacante se coloca **entre** as partes, lendo/alterando o tráfego | TLS, validação de certificados, HSTS |
| **ARP spoofing/poisoning** | envia ARPs falsos associando o **seu MAC ao IP do gateway** → MitM na LAN | **Dynamic ARP Inspection**, segmentação |
| **DNS spoofing / cache poisoning** | respostas DNS falsas | **DNSSEC** |
| **IP spoofing** | falsificar o IP de origem | filtros anti-spoofing (BCP 38) |
| **Session hijacking** | roubar o **token/cookie de sessão** | cookies HttpOnly e Secure, TLS, regenerar sessão no login |
| **Força bruta** | testar todas as combinações | bloqueio/atraso, MFA, senhas longas |
| **Ataque de dicionário** | testar senhas de uma lista | senhas fortes, hashes com sal |
| **Credential stuffing** | usar pares login/senha **vazados de outros sites** | **MFA**, detecção de senhas vazadas |
| **Password spraying** | **poucas** senhas comuns contra **muitas** contas (evita bloqueio) | MFA, monitoramento |
| **SQL injection, XSS, CSRF, SSRF** | ataques a aplicações (ver aula de desenvolvimento seguro) | código seguro, WAF |
| **Zero-day** | explora vulnerabilidade **ainda desconhecida/sem correção** | defesa em profundidade, detecção comportamental |
| **APT** | ameaça **persistente avançada**: atacante sofisticado que permanece oculto por longo período | |
| **Supply chain** | comprometer um fornecedor/biblioteca para atingir os clientes | SCA, SBOM, assinaturas |

### Cadeia de ataque (Cyber Kill Chain — Lockheed Martin)
**Reconhecimento → Armamento → Entrega → Exploração → Instalação → Comando e Controle → Ações sobre os objetivos.** O **MITRE ATT&CK** é uma base de conhecimento das **táticas e técnicas** reais dos atacantes, usada para planejar detecções.

## 4. Vulnerabilidades — como são identificadas e priorizadas
- **CVE** (Common Vulnerabilities and Exposures): **identificador único** de uma vulnerabilidade específica (ex.: CVE-2021-44228, o Log4Shell).
- **CWE** (Common Weakness Enumeration): **tipo/categoria de fraqueza** (ex.: CWE-79 = XSS, CWE-89 = SQL injection).
- **CVSS** (Common Vulnerability Scoring System, v3.1 e v4.0): **nota de severidade de 0 a 10** (baixa, média, alta, **crítica ≥ 9,0**), considerando vetor de ataque, complexidade, privilégios necessários, interação do usuário e impacto em CID.
- **Gestão de vulnerabilidades** é um **ciclo contínuo**: inventário → **varredura** (scanners como OpenVAS/Greenbone, Nessus) → análise e **priorização** (CVSS + exposição + exploração ativa, ex.: catálogo KEV da CISA) → **correção (patch)** ou mitigação → **verificação** → relatório.

## 5. Pentest (teste de invasão)
Ataque **simulado e autorizado** para descobrir e **explorar** vulnerabilidades, demonstrando o impacto real (diferente de uma varredura, que só **lista** possíveis falhas).
### Conhecimento prévio do testador
| Modalidade | O testador sabe... | Simula |
|---|---|---|
| **Caixa-preta (black box)** | **nada** além do alvo | um atacante externo |
| **Caixa-cinza (gray box)** | **parte** (credenciais de usuário comum, documentação) | um usuário/insider com algum acesso |
| **Caixa-branca (white box)** | **tudo** (código-fonte, arquitetura) | análise mais profunda e eficiente |
### Fases típicas (PTES)
1. **Pré-engajamento**: escopo, **regras de engajamento**, **autorização formal por escrito**, janelas de teste.
2. **Coleta de informações / reconhecimento** (**passivo** — fontes abertas, OSINT; **ativo** — interagindo com o alvo).
3. **Modelagem de ameaças** e **varredura/enumeração** (portas, serviços, versões — nmap).
4. **Análise de vulnerabilidades**.
5. **Exploração** (ganhar acesso).
6. **Pós-exploração** (escalada de privilégios, movimento lateral, persistência, avaliar o valor do que foi obtido).
7. **Relatório**: sumário executivo e relatório técnico com evidências, riscos e **recomendações**.
Metodologias: **PTES**, **OWASP Testing Guide** (aplicações web), **OSSTMM**, **NIST SP 800-115**. **Red team** (ataca, simulando adversários reais de forma ampla) × **blue team** (defende) × **purple team** (colaboração entre os dois). **Bug bounty**: recompensa a pesquisadores externos.

## 6. Hardening (endurecimento)
**Reduzir a superfície de ataque** de sistemas configurando-os de forma segura:
- **Remover/desativar** serviços, portas, softwares e contas **desnecessários**; trocar **senhas e configurações padrão**.
- Aplicar **atualizações e patches** regularmente.
- **Menor privilégio** para contas e serviços; desabilitar login remoto do root; usar **chaves SSH** em vez de senha.
- Habilitar **logs** e auditoria; sincronizar horário (NTP).
- **Firewall de host**, criptografia de disco, proteção da BIOS/UEFI e Secure Boot.
- Seguir **guias de referência**: **CIS Benchmarks** (configurações recomendadas por sistema/produto) e **DISA STIGs**; manter uma **linha de base (baseline) de configuração** e verificar desvios (gestão de configuração).
`);

A('seg-devsec', `
## 1. Por que segurança desde o início
Corrigir uma falha de segurança em produção custa **muito mais** do que evitá-la no projeto. Além disso, a maioria dos ataques bem-sucedidos explora **falhas nas aplicações**. Por isso a segurança deve fazer parte de **todas as fases** do ciclo de vida (**shift left**), e não ser um teste no final.

## 2. Microsoft SDL (Security Development Lifecycle)
Processo da Microsoft (criado em 2004, após worms como o Blaster) que integra segurança ao desenvolvimento. Fases clássicas:
| Fase | Atividades de segurança |
|---|---|
| **Treinamento** | capacitação de toda a equipe em segurança |
| **Requisitos** | definir **requisitos de segurança e privacidade**, critérios mínimos (bug bars), avaliação de riscos |
| **Design (projeto)** | **modelagem de ameaças** (threat modeling), redução da superfície de ataque |
| **Implementação** | ferramentas aprovadas, **banir funções inseguras**, **análise estática (SAST)** |
| **Verificação** | **análise dinâmica (DAST)**, **fuzzing**, revisão da superfície de ataque |
| **Lançamento (release)** | plano de **resposta a incidentes**, **revisão final de segurança** |
| **Resposta** | executar o plano de resposta quando surgirem falhas |
A versão moderna do SDL fala em práticas contínuas (modelagem de ameaças, segurança da cadeia de suprimentos, testes automatizados no pipeline), alinhada a DevSecOps.

### Modelagem de ameaças — STRIDE
Para cada componente do sistema, pergunte que ameaças existem:
| Letra | Ameaça | Propriedade violada |
|---|---|---|
| **S** | **Spoofing** (falsificação de identidade) | autenticação |
| **T** | **Tampering** (adulteração) | integridade |
| **R** | **Repudiation** (repúdio) | não repúdio |
| **I** | **Information disclosure** (vazamento de informação) | confidencialidade |
| **D** | **Denial of service** (negação de serviço) | disponibilidade |
| **E** | **Elevation of privilege** (elevação de privilégio) | autorização |
Também existe o **DREAD** (para pontuar riscos) e diagramas de fluxo de dados com **fronteiras de confiança**.

## 3. CLASP (Comprehensive, Lightweight Application Security Process)
Processo de segurança de aplicações do **OWASP** (hoje descontinuado, mas listado no edital), que se encaixa em qualquer ciclo de desenvolvimento. É organizado em **visões (views)**:
1. **Visão de conceitos** — os princípios e conceitos de segurança;
2. **Visão baseada em papéis (role-based)** — responsabilidades de cada papel (gerente de projeto, arquiteto, **especificador de requisitos**, projetista, implementador, testador, **auditor de segurança**);
3. **Visão de avaliação de atividades** — ajuda a escolher quais atividades aplicar;
4. **Visão de implementação de atividades** — as **24 atividades** de segurança detalhadas;
5. **Visão de vulnerabilidades** — um catálogo de **tipos de vulnerabilidades** (mais de 100), com causas, consequências e mitigação.
> [!dica] Comparação útil: o **SDL** é mais **prescritivo e pesado**, organizado por **fases**; o **CLASP** é mais **leve**, organizado por **papéis e atividades**. Outro modelo de maturidade citado em provas é o **OWASP SAMM**.

## 4. Princípios de codificação segura
- **Nunca confie na entrada**: **valide** toda entrada **no servidor** (validação no cliente é só conveniência), preferencialmente com **lista de permitidos (allowlist)** — tipo, tamanho, formato, faixa.
- **Codifique a saída** conforme o contexto (HTML, JavaScript, URL) → previne XSS.
- **Consultas parametrizadas (prepared statements)** ou ORM → previne SQL injection. Nunca concatene entrada do usuário em SQL.
- **Autenticação e sessões**: MFA, hash de senha com **bcrypt/Argon2**, tokens de sessão aleatórios, cookies **HttpOnly, Secure, SameSite**, expiração de sessão.
- **Controle de acesso no servidor**, em **toda** requisição, negando por padrão.
- **Tratamento de erros**: mensagens genéricas ao usuário (sem stack trace), detalhes só no log.
- **Não registrar dados sensíveis** em logs; **não colocar segredos no código** (use cofres de segredos).
- **Criptografia** com bibliotecas padronizadas — **nunca invente o seu algoritmo**.
- **Dependências** atualizadas e verificadas (**SCA**, **SBOM**).
- **Menor privilégio** para a aplicação (o usuário do banco não deve ser administrador).

### Exemplo: SQL injection e a correção
\`\`\`
// VULNERÁVEL: a entrada vira parte do comando SQL
String sql = "SELECT * FROM usuario WHERE login = '" + login + "'";
// se login = ' OR '1'='1  → retorna todos os usuários

// SEGURO: consulta parametrizada; a entrada é tratada sempre como DADO
PreparedStatement ps = conn.prepareStatement("SELECT * FROM usuario WHERE login = ?");
ps.setString(1, login);
\`\`\`

## 5. OWASP Top 10:2025 — os riscos mais críticos em aplicações web
| Posição | Categoria | Em poucas palavras |
|---|---|---|
| **A01** | **Broken Access Control** (quebra de controle de acesso) | usuário acessa o que não devia: **IDOR** (trocar o id na URL e ver o processo de outro), elevação de privilégio; agora inclui também **SSRF** |
| **A02** | **Security Misconfiguration** (configuração incorreta) | padrões inseguros, contas default, mensagens de erro detalhadas, cabeçalhos ausentes, buckets públicos |
| **A03** | **Software Supply Chain Failures** (falhas na cadeia de suprimentos de software) — **nova**, amplia a antiga “componentes vulneráveis e desatualizados” | bibliotecas vulneráveis, dependências comprometidas, pipelines de build inseguros |
| **A04** | **Cryptographic Failures** (falhas criptográficas) | dados sensíveis sem criptografia, algoritmos fracos, chaves mal geridas |
| **A05** | **Injection** (injeção) | **SQL injection**, injeção de comandos, LDAP, e **XSS** (que foi incorporado a esta categoria) |
| **A06** | **Insecure Design** (design inseguro) | falhas de **arquitetura e lógica** — não se resolvem só com código perfeito; exige modelagem de ameaças |
| **A07** | **Authentication Failures** (falhas de autenticação) | força bruta sem bloqueio, senhas fracas, sessões mal gerenciadas, ausência de MFA |
| **A08** | **Software or Data Integrity Failures** (falhas de integridade de software ou dados) | atualizações sem verificação de assinatura, **desserialização insegura** |
| **A09** | **Security Logging & Alerting Failures** (falhas de registro e alerta) | ataques não detectados por falta de logs e alertas |
| **A10** | **Mishandling of Exceptional Conditions** (tratamento inadequado de condições excepcionais) — **nova** | erros não tratados, “falhar aberto” (fail open), vazamento de informação em mensagens de erro |
> [!fcc] Mudanças da versão 2025 em relação à de 2021: **Broken Access Control continua em 1º** (e absorveu o **SSRF**); **Security Misconfiguration subiu para 2º**; surgiram **Software Supply Chain Failures** e **Mishandling of Exceptional Conditions**.

### Os ataques web em detalhe
- **XSS (Cross-Site Scripting)**: o atacante injeta **script** que roda no **navegador da vítima**. Tipos: **refletido** (vem na requisição, ex.: link malicioso), **armazenado/persistente** (gravado no banco, atinge todos que visualizam — o mais grave) e **baseado em DOM**. Defesa: **codificação de saída**, CSP (Content Security Policy), cookies HttpOnly.
- **CSRF (Cross-Site Request Forgery)**: induz o navegador da vítima, **já autenticada**, a enviar uma requisição indesejada ao site (ex.: transferir valores). Defesa: **tokens anti-CSRF**, cookies **SameSite**, confirmar ações sensíveis.
- **SSRF (Server-Side Request Forgery)**: faz o **servidor** realizar requisições a destinos escolhidos pelo atacante (ex.: serviços internos, metadados da nuvem). Defesa: allowlist de destinos, bloquear endereços internos.
- **Path traversal**: \`../../etc/passwd\` para ler arquivos fora do diretório permitido.
- **Desserialização insegura**: objetos manipulados que executam código ao serem desserializados.
`);

/* ============================ NORMATIVOS ============================ */
A('norm-pdpj', `
## 1. O problema que a PDPJ-Br resolve
Antes dela, cada tribunal do país desenvolvia ou contratava seus próprios sistemas: **dezenas de soluções diferentes para o mesmo problema**, dinheiro público gasto em duplicidade, sistemas que não conversavam entre si e advogados obrigados a aprender um sistema por tribunal. A **Plataforma Digital do Poder Judiciário Brasileiro (PDPJ-Br)** muda essa lógica: **uma plataforma única, em nuvem, baseada em microsserviços**, na qual **cada tribunal desenvolve módulos que servem a todos**.

Analogia: em vez de cada condomínio construir a própria usina de energia, todos se ligam à mesma rede elétrica e cada um contribui com uma parte da geração.

## 2. Resolução CNJ nº 335/2020 — a criação
**Institui a política pública** para a **governança e a gestão de processo judicial eletrônico**, **integra os tribunais** do país com a criação da **PDPJ-Br**, e **mantém o PJe** como **sistema de processo eletrônico prioritário** do CNJ.
### Objetivos e princípios (o espírito da norma)
- **Integrar e consolidar** os sistemas eletrônicos do Judiciário num ambiente unificado;
- **Desenvolvimento colaborativo/comunitário**: os tribunais criam **módulos** (microsserviços) e os **disponibilizam** a todos, num **marketplace** de soluções;
- **Reaproveitamento** e **economicidade**: evitar o retrabalho e o gasto duplicado;
- **Padronização** e **interoperabilidade** entre sistemas;
- Solução em **nuvem**, com arquitetura de **microsserviços** e **APIs**;
- Código **aberto/público** para o Judiciário, mantido no repositório da plataforma;
- Observância da **LGPD**, da **segurança da informação** e da **acessibilidade**;
- **Portal único** de serviços (hoje o **Jus.br**).
> [!fcc] Pontos que a FCC adora: a PDPJ-Br **não extinguiu o PJe** — ao contrário, o **PJe é o sistema prioritário**; e a plataforma é baseada em **colaboração** entre tribunais e em **microsserviços em nuvem**.

## 3. Portaria CNJ nº 252/2020 — governança (alterada pela Portaria nº 284/2021)
Define o **modelo de governança e gestão** da plataforma: **quem decide o quê**. Prevê as **instâncias** (comitê gestor, comitês e grupos técnicos), as **atribuições** do CNJ e dos tribunais e o **fluxo** para um tribunal **propor, desenvolver, homologar e disponibilizar** um módulo na plataforma. A **Portaria 284/2021** ajustou esse modelo (composição, atribuições, fluxos).

## 4. Portaria CNJ nº 253/2020 — as regras técnicas
Estabelece os **critérios e diretrizes técnicas** para o desenvolvimento de **módulos e serviços** da PDPJ-Br. É a “bula” técnica — e o motivo pelo qual o seu edital cobra exatamente estas tecnologias:
| Diretriz | Tecnologia/prática |
|---|---|
| Arquitetura | **microsserviços** independentes |
| Integração | **APIs REST** documentadas (**OpenAPI/Swagger**) e **mensageria** assíncrona (**RabbitMQ**) |
| Empacotamento e execução | **contêineres Docker** na **nuvem da PDPJ**, orquestrados por **Kubernetes** (gerenciados com **Rancher**) |
| Identidade | **autenticação e autorização centralizadas** no **SSO da PDPJ** (**Keycloak**, OAuth 2.0/OpenID Connect) |
| Linguagens | **back-end em Java/Spring Boot**; **front-end em Angular** |
| Dados | **PostgreSQL** |
| Observabilidade | logs centralizados (**ELK**) e monitoramento |
| Código | versionado no **Git (GitLab) da PDPJ**, com **CI/CD**, testes automatizados e documentação |
| Requisitos transversais | **LGPD**, segurança da informação, acessibilidade, licenciamento que permita o reúso |
> [!dica] Quando a questão perguntar “qual norma estabelece critérios técnicos para os módulos da PDPJ?”, a resposta é a **Portaria 253/2020**; “governança?”, **Portaria 252/2020** (alterada pela 284/2021).

## 5. Portaria CNJ nº 131/2021 — Grupo Revisor de Código-Fonte
Institui o **Grupo Revisor de Código-Fonte** das soluções da **PDPJ-Br** e do **PJe**. Função: **revisar o código** que os tribunais submetem — **qualidade**, **segurança**, aderência às **diretrizes técnicas** e aos padrões — **antes** de ser incorporado à versão nacional. É a aplicação institucional da **revisão de código** (code review / merge request) que você estudou em Git.

## 6. Resolução CNJ nº 443/2022 — PDPJ nos concursos
Dispõe sobre a **aplicação e a disseminação dos conhecimentos sobre a PDPJ-Br** nos **editais de concursos públicos**, processos seletivos e **capacitações** para as áreas de **TIC** do Judiciário. Objetivo: formar e selecionar servidores capazes de **desenvolver e manter** soluções da plataforma. É **por causa dela** que este concurso cobra Java, Spring, Keycloak, RabbitMQ, Docker, Kubernetes, PostgreSQL e as próprias normas da PDPJ.

## 7. Resolução CNJ nº 574/2024 — dados, serviços privados e portal
Três eixos:
1. **Acesso a dados judiciais públicos consolidados** pelo CNJ (bases nacionais como o **DataJud**), com regras de disponibilização, **proteção de dados pessoais** e uso por terceiros;
2. **Depósito de serviços privados na PDPJ-Br**: soluções de empresas e entidades podem ser disponibilizadas na plataforma, desde que cumpram requisitos de **segurança, LGPD e governança**;
3. **Portal unificado para usuários internos** do Judiciário, no contexto do **Jus.br** (porta de entrada única para os serviços).

## 8. Linha do tempo para fixar
**2020**: Res. 335 (cria a PDPJ-Br) · Portaria 252 (governança) · Portaria 253 (diretrizes técnicas) → **2021**: Portaria 131 (Grupo Revisor de Código) · Portaria 284 (altera a governança) → **2022**: Res. 443 (PDPJ nos concursos) → **2024**: Res. 574 (dados públicos, serviços privados, portal interno).
> [!lei] Os números e ementas acima conferem com o edital. Para artigos específicos (composição de comitês, prazos), consulte os textos compilados no portal de atos do CNJ (atos.cnj.jus.br).
`);

A('norm-moreq', `
## 1. Por que um “modelo de requisitos” para documentos
Um processo judicial eletrônico **é um documento com valor jurídico**. Daqui a 30 anos, alguém precisará abri-lo e ter certeza de que **é autêntico**, **não foi alterado** e de **quem praticou cada ato**. Formatos de arquivo ficam obsoletos, mídias se degradam, sistemas são substituídos. O **MoReq-Jus** define **o que todo sistema** que gerencia processos e documentos no Judiciário **precisa fazer** para garantir isso.

## 2. Resolução CNJ nº 522/2023
**Institui o Modelo de Requisitos para Sistemas Informatizados de Gestão de Processos e Documentos do Poder Judiciário (MoReq-Jus)** — **2ª edição** — e **disciplina a obrigatoriedade** de sua utilização no **desenvolvimento e na manutenção** de sistemas informatizados para as atividades **judiciárias e administrativas**.
- Substituiu a disciplina da **Resolução CNJ nº 91/2009** (que criou a primeira versão do MoReq-Jus).
- Integra o **Proname — Programa Nacional de Gestão Documental e Memória do Poder Judiciário** (Resolução CNJ nº 324/2020).
- O sistema que atende ao modelo é chamado de **GestãoDoc** (Sistema Informatizado de Gestão de Processos e Documentos).
> [!fcc] Quatro afirmações que costumam ser **corretas** nas provas: (1) o MoReq-Jus é **obrigatório**; (2) vale para **desenvolvimento E manutenção**; (3) abrange atividades **judiciárias E administrativas**; (4) busca garantir **autenticidade, integridade, confiabilidade, acesso e preservação** dos documentos digitais. Desconfie de alternativas que o reduzem a “recomendação”, a “sistemas novos” ou a “área judicial apenas”.

## 3. As bases conceituais
- Inspira-se no **e-ARQ Brasil** (modelo do **Conarq** — Conselho Nacional de Arquivos — para sistemas de gestão arquivística) e no **MoReq** europeu.
- **Documento arquivístico**: produzido ou recebido no curso das atividades de um órgão, com **organicidade** (relação com as funções que o geraram) e **vínculo arquivístico** (relação com os demais documentos do mesmo processo).
- **Gestão documental**: conjunto de procedimentos de **produção, tramitação, uso, avaliação e arquivamento**, até a **eliminação** ou o **recolhimento para guarda permanente**.
- **Ciclo de vida (teoria das três idades)**: **corrente** (uso frequente) → **intermediária** (uso eventual, aguardando prazo) → **permanente** (valor histórico, guardado para sempre).

## 4. Instrumentos de gestão documental
| Instrumento | Para quê |
|---|---|
| **Plano de Classificação** | organizar documentos segundo as **funções e atividades** do órgão |
| **Tabela de Temporalidade e Destinação (TTD)** | define **por quanto tempo** guardar cada tipo de documento em cada fase e **o destino final**: **eliminação** ou **guarda permanente** |
| **Tabelas Processuais Unificadas (TPU)** | classes, assuntos e movimentos padronizados nacionalmente (Res. CNJ 46/2007) — base para classificar e avaliar processos |
| Listagem/edital de eliminação | formalizar e dar publicidade às eliminações |

## 5. O que o sistema precisa garantir — os grupos de requisitos
| Grupo | Exemplos de exigência |
|---|---|
| **Organização e classificação** | aplicar o plano de classificação; manter o vínculo entre documentos do mesmo processo |
| **Captura** | registrar todo documento com **identificador único** e **metadados** no momento da entrada |
| **Tramitação e fluxo** | registrar cada movimentação e responsável |
| **Avaliação, temporalidade e destinação** | aplicar a TTD; controlar prazos; **eliminação** segura e registrada; **transferência/recolhimento** |
| **Pesquisa, localização e apresentação** | recuperar documentos com eficiência |
| **Segurança** | **controle de acesso**, **trilhas de auditoria** (quem fez o quê e quando — inalteráveis), **cópias de segurança**, **assinatura digital**, criptografia, classificação de sigilo |
| **Armazenamento** | mídias e infraestrutura confiáveis |
| **Preservação** | **formatos abertos e estáveis** (ex.: PDF/A), **migração e conversão** periódicas, monitoramento de obsolescência |
| **Requisitos não funcionais** | **usabilidade**, **interoperabilidade**, **disponibilidade**, **desempenho e escalabilidade**, acessibilidade |
Os requisitos têm **graus de obrigatoriedade**: **obrigatório**, **altamente desejável** e **facultativo**.

### Metadados
São “dados sobre os dados”: identificador, título, classificação, **datas** (produção, captura), **autoria**, formato, **temporalidade e destinação**, informações de **assinatura**, nível de acesso e o **histórico de eventos** de gestão. Sem metadados, o documento perde contexto e valor de prova.

## 6. Preservação de longo prazo e cadeia de custódia
- **Cadeia de custódia digital**: linha **contínua e documentada** de responsabilidade sobre o documento, desde a produção — interrupções põem em dúvida sua autenticidade.
- **RDC-Arq (Repositório Arquivístico Digital Confiável)**: ambiente para a **preservação** dos documentos na fase **permanente** (ou de longa guarda), seguindo o modelo **OAIS** (ISO 14721). Ferramentas usadas no Brasil: **Archivematica** (processamento/preservação) e **AtoM** (descrição e acesso).
> [!dica] Ligue os pontos: **MoReq-Jus** (requisitos do sistema) ↔ **Proname** (programa de gestão documental) ↔ **LGPD** (dados pessoais nos documentos) ↔ **segurança** (trilhas de auditoria e assinatura digital, que você estudou em criptografia e controle de acesso).
`);

A('norm-ensec', `
## 1. Por que uma estratégia nacional de segurança cibernética
Os tribunais sofreram ataques sérios — houve casos de **ransomware** que tiraram sistemas judiciais do ar por dias no Brasil. Como os órgãos estão interligados (PDPJ, sistemas nacionais), **a fraqueza de um afeta todos**. A **ENSEC-PJ** cria uma resposta **coordenada**: regras mínimas para todos, estruturas nacionais e cooperação.

## 2. Resolução CNJ nº 396/2021 — ENSEC-PJ
Institui a **Estratégia Nacional de Segurança Cibernética do Poder Judiciário**.
### Objetivos (resumo fiel ao espírito da norma)
- tornar o Judiciário mais **seguro e inclusivo no ambiente digital**;
- **aumentar a resiliência** às ameaças cibernéticas;
- **estabelecer governança** de segurança cibernética e **fortalecer a gestão e a coordenação integrada** entre os órgãos;
- **promover a cultura e a educação** em segurança cibernética;
- incentivar a **cooperação** e o **compartilhamento de informações** sobre ameaças e incidentes.

### Estruturas — quem é quem (decore as siglas)
| Estrutura | Nível | Papel |
|---|---|---|
| **CGSC-PJ** — Comitê Gestor de Segurança Cibernética do Poder Judiciário | nacional | **coordena** a estratégia e propõe normas |
| **Rede de Cooperação do Judiciário** em segurança cibernética | nacional | **troca de informações** e apoio mútuo entre os órgãos |
| **CPTRIC-PJ** — Centro de Prevenção, Tratamento e Resposta a Incidentes Cibernéticos do Poder Judiciário | nacional | **coordena a prevenção e a resposta a incidentes** em âmbito nacional; recebe as **notificações** dos órgãos |
| **Comitê de Segurança da Informação** (ou equivalente) | em cada órgão | governança local |
| **Gestor de segurança da informação** | em cada órgão | coordena as ações |
| **ETIR** — Equipe de Tratamento e Resposta a Incidentes de Segurança Cibernética | em cada órgão (o TRT4 tem a sua) | **trata os incidentes** localmente e **comunica** ao CPTRIC-PJ |

### Diretrizes e obrigações para cada órgão
- **Política de Segurança da Informação** e normas complementares;
- **Gestão de riscos**, **de continuidade** e **de incidentes** (com **notificação** ao CPTRIC-PJ);
- **Gestão de vulnerabilidades** e de **ativos**;
- **Backup** com **cópias offline/isoladas** (proteção contra ransomware) e testes de restauração;
- **Autenticação multifator (MFA)**, especialmente para acessos remotos e privilegiados;
- **Capacitação e conscientização** de magistrados, servidores e colaboradores;
- **Auditorias** e **testes** periódicos (inclusive de invasão);
- requisitos de segurança nas **contratações** de TIC;
- alinhamento à **LGPD** e a padrões (ISO/IEC 27001/27002, **CIS Controls**).

## 3. Portaria CNJ nº 162/2021 — protocolos e manuais
Aprova os **instrumentos práticos** previstos na Resolução 396/2021. São **três protocolos** e **quatro manuais**.
### Protocolos — pense numa linha do tempo de um incidente
| Momento | Protocolo | Conteúdo |
|---|---|---|
| **Antes** | **PPINC-PJ** — Protocolo de **Prevenção** de Incidentes Cibernéticos | medidas preventivas: inventário de ativos, configuração segura, gestão de vulnerabilidades e de patches, backup, MFA, segmentação de rede, monitoramento, conscientização |
| **Durante (quando vira crise)** | **PGCC-PJ** — Protocolo de **Gerenciamento de Crises** Cibernéticas | quando um incidente ameaça gravemente a **prestação jurisdicional** ou a **imagem** do órgão: ativar o **comitê de crise**, definir papéis, decisões, **comunicação** interna e externa, retorno à normalidade |
| **Depois / em paralelo** | **PIILC-PJ** — Protocolo de **Investigação** para Ilícitos Cibernéticos | **coleta e preservação de evidências**, **cadeia de custódia**, registro, **comunicação às autoridades policiais** e ao Ministério Público |
> [!dica] Memorize pela ordem natural: **Prevenir (PPINC) → Gerenciar a crise (PGCC) → Investigar (PIILC)**.

### Manuais de referência
1. **Proteção de Infraestruturas Críticas de TIC** — identificar e proteger os ativos essenciais;
2. **Prevenção e Mitigação de Ameaças Cibernéticas e Confiança Digital**;
3. **Gestão de Identidades** — ciclo de vida de contas, controle de acesso, **MFA**, contas privilegiadas;
4. **Política de Educação e Cultura em Segurança Cibernética** — capacitação e conscientização permanentes.

## 4. Como isso se conecta ao resto da matéria
- **Incidente vs. crise**: todo incidente é tratado pela **ETIR** (ciclo NIST: preparação → detecção → contenção/erradicação/recuperação → lições aprendidas); só os de grande impacto escalam para o **PGCC-PJ**.
- **Evidências**: “limpar” a máquina antes de preservar provas viola o **PIILC-PJ**.
- **Dados pessoais** afetados → comunicação também à **ANPD** (LGPD).
- A **Res. CNJ 370/2021 (ENTIC-JUD)** trata da **estratégia de TIC** em geral; a **Res. 396/2021** trata especificamente da **segurança cibernética**.
`);

A('norm-gov', `
## 1. Governança × gestão — a distinção que organiza tudo
Imagine um navio: a **governança** é quem **define o destino e verifica se o navio está no rumo** (o comandante e o armador); a **gestão** é a tripulação que **opera o navio** para chegar lá.
| | **Governança de TI** | **Gestão de TI** |
|---|---|---|
| Pergunta | **estamos fazendo as coisas certas?** | **estamos fazendo as coisas do jeito certo?** |
| Atividades | **Avaliar, Dirigir e Monitorar** (EDM) | **Planejar, Construir, Executar e Monitorar** (PBRM) |
| Quem | **alta administração** e comitês estratégicos | gestores e equipes de TI |
| Produtos | diretrizes, prioridades, políticas, aprovação de planos | projetos, serviços, operação |

## 2. Os modelos de referência
### ISO/IEC 38500 — governança corporativa de TI
- **Modelo EDM**: **Avaliar** (o uso atual e futuro da TI), **Dirigir** (preparar e implementar planos e políticas), **Monitorar** (desempenho e conformidade).
- **Seis princípios**: **Responsabilidade**, **Estratégia**, **Aquisição**, **Desempenho**, **Conformidade** e **Comportamento humano**.
### COBIT 2019 (ISACA)
- **40 objetivos** de governança e gestão em **5 domínios**:
| Domínio | Tipo | Foco |
|---|---|---|
| **EDM** — Evaluate, Direct and Monitor | **governança** | avaliar, dirigir e monitorar |
| **APO** — Align, Plan and Organize | gestão | alinhar, planejar e organizar (estratégia, arquitetura, orçamento, riscos, segurança) |
| **BAI** — Build, Acquire and Implement | gestão | construir, adquirir e implementar (projetos, requisitos, mudanças) |
| **DSS** — Deliver, Service and Support | gestão | entregar, servir e suportar (operações, incidentes, problemas, continuidade) |
| **MEA** — Monitor, Evaluate and Assess | gestão | monitorar, avaliar e analisar (desempenho, controles internos, conformidade) |
- Fatores de desenho (design factors), **componentes** do sistema de governança (processos, estruturas, informações, pessoas, cultura, serviços), **níveis de capacidade** de 0 a 5.
### ITIL 4 — gestão de serviços
**Sistema de Valor de Serviço (SVS)**, **cadeia de valor** de serviço (planejar, melhorar, engajar, desenho e transição, obter/construir, entregar e suportar), **7 princípios orientadores** (foco no valor; começar onde você está; progredir iterativamente com feedback; colaborar e promover visibilidade; pensar e trabalhar de forma holística; manter simples e prático; otimizar e automatizar), **34 práticas** (gerenciamento de incidentes, problemas, mudanças/habilitação de mudanças, central de serviço, nível de serviço...).
- **Incidente**: interrupção não planejada → **restaurar o serviço** rapidamente. **Problema**: a **causa** de um ou mais incidentes → **eliminar a causa raiz**.

## 3. O marco nacional no Judiciário
- **Resolução CNJ nº 370/2021** — **Estratégia Nacional de TIC do Poder Judiciário (ENTIC-JUD)** para **2021–2026**. Determina, entre outras coisas, que cada órgão tenha:
  - **Plano Estratégico de TIC (PETIC)** e **Plano Diretor de TIC (PDTIC)** alinhados à estratégia;
  - **Comitê de Governança de TIC** (estratégico) e **Comitê de Gestão de TIC** (tático);
  - políticas e processos de **gestão de pessoas de TIC**, **segurança**, **contratações**, **serviços**, **riscos**, **portfólio de projetos**;
  - avaliação pelo **iGovTIC-JUD** — o índice nacional que mede a **maturidade em governança e gestão de TIC** dos tribunais.
- **Resolução CNJ nº 468/2022**: diretrizes para **contratações de Solução de TIC** no Judiciário (em harmonia com a **Lei 14.133/2021**): planejamento (estudo técnico preliminar, gestão de riscos, termo de referência), seleção do fornecedor e gestão do contrato.
- Na Justiça do Trabalho, o **CSJT** coordena os sistemas nacionais (**PJe-JT**, e-Gestão, sistemas administrativos) e diretrizes comuns de TIC.

## 4. O PDTIC — Plano Diretor de TIC (no TRT4: 2024–2026)
É o instrumento de **diagnóstico, planejamento e gestão** dos recursos e processos de TIC para um período, **alinhado** ao **Planejamento Estratégico Institucional** do Tribunal e à **ENTIC-JUD**. Pense nele como o “plano de obras” da TI.
### Estrutura típica
1. **Referencial estratégico**: missão, visão, valores e **objetivos estratégicos de TIC**;
2. **Diagnóstico**: situação atual, maturidade, análise **SWOT** (forças, fraquezas, oportunidades, ameaças), avaliação do PDTIC anterior;
3. **Inventário de necessidades**: demandas das áreas, **priorizadas** (ex.: matriz **GUT** — Gravidade, Urgência, Tendência);
4. **Plano de metas e ações**: o que será feito, **indicadores**, prazos e responsáveis;
5. **Plano de gestão de pessoas** de TIC (quadro, capacitação);
6. **Plano orçamentário** e **plano de contratações**;
7. **Plano de gestão de riscos** do próprio PDTIC;
8. **Fatores críticos de sucesso** e **processo de revisão** (normalmente anual), com **aprovação pelo Comitê de Governança de TIC**.

## 5. Modelo de governança de TIC de um tribunal — as instâncias
| Instância | Nível | Atribuições típicas |
|---|---|---|
| **Comitê de Governança de TIC** | **estratégico** (presidido pela alta administração) | aprovar o **PDTIC** e políticas, **priorizar o portfólio** de projetos, alocar recursos, monitorar resultados |
| **Comitê de Gestão de TIC** | **tático** | coordenar a execução do PDTIC, acompanhar projetos e serviços |
| **Secretaria de TIC** | **operacional** | executar projetos, manter sistemas e infraestrutura, prestar serviços |
| Comitês correlatos | — | **Segurança da Informação**, **Proteção de Dados Pessoais (LGPD)**, **Gestão Documental**, comitês gestores de sistemas (PJe) |
Instrumentos de governança: **portfólio de projetos**, **catálogo de serviços**, **acordos de nível de serviço (ANS/SLA)**, **indicadores** e painéis, **políticas** (segurança, backup, contratações), **gestão de riscos**.
> [!lei] O edital cobra os documentos **específicos do TRT4** (Modelo de Governança de TIC e PDTIC 2024–2026), publicados no portal do Tribunal (Transparência → Tecnologia da Informação). Esta aula dá a estrutura conceitual; **leia os documentos originais** para nomes exatos de comitês, objetivos e metas.
`);

/* ============================ INGLÊS ============================ */
A('ing-tecnico', `
## 1. Como a FCC cobra inglês técnico
As questões trazem um **texto técnico** (documentação, notícia de tecnologia, trecho de RFC ou de guia de segurança) e perguntam: a **ideia principal**, uma **informação específica**, o **sentido de uma palavra ou expressão no contexto**, a **referência** de um pronome, o **valor de um conectivo** ou se uma afirmação está **de acordo com o texto**. Você **não precisa** dominar gramática avançada; precisa de **estratégia de leitura** e **vocabulário de TI**.

## 2. Estratégia em 5 passos
1. **Leia as perguntas primeiro**: você saberá o que procurar.
2. **Skimming**: leitura **rápida** para captar a **ideia geral** — título, primeira e última frase de cada parágrafo, palavras repetidas.
3. **Scanning**: busque **informações específicas** (números, nomes, siglas, palavras-chave da pergunta) sem ler tudo.
4. **Leia com atenção** só o trecho que responde à pergunta.
5. **Confira contra o texto**, não contra o seu conhecimento de TI: a alternativa certa é a que **o texto** sustenta.
> [!fcc] Armadilhas frequentes: alternativa **verdadeira tecnicamente, mas que o texto não diz**; alternativa com **palavra absoluta** (*always, never, all, only*) quando o texto diz *usually, may, some*; troca de **causa e consequência**.

## 3. Cognatos e falsos cognatos
**Cognatos** (parecidos e com o mesmo sentido) ajudam muito: *network, system, application, database, security, protocol, configuration, authentication*.
**Falsos cognatos** (parecem, mas **não** significam o que você pensa):
| Inglês | Significa | Não significa |
|---|---|---|
| **actually** | na verdade, de fato | atualmente (= *currently, nowadays*) |
| **eventually** | finalmente, com o tempo | eventualmente (= *occasionally*) |
| **assume** | supor, presumir; assumir (uma tarefa) | — |
| **pretend** | fingir | pretender (= *intend*) |
| **realize** | perceber, dar-se conta | realizar (= *carry out, accomplish*) |
| **push** | empurrar; enviar (git push) | puxar (= *pull*) |
| **library** | biblioteca (inclusive de código) | livraria (= *bookstore*) |
| **data** | dados | data (= *date*) |
| **sensible** | sensato | sensível (= *sensitive* — *sensitive data* = dados sensíveis!) |
| **exit** | saída | êxito (= *success*) |
| **resume** | retomar; currículo | resumir (= *summarize*) |
| **attend** | comparecer | atender (= *answer, serve*) |
| **support** | apoiar, dar suporte a | suportar/tolerar (= *stand, bear*) |
| **appoint** | nomear, designar | apontar (= *point*) |
| **lecture** | palestra | leitura (= *reading*) |
| **policy** | política (diretriz) | polícia (= *police*) |
| **tax** | imposto | taxa (= *fee, rate*) |

## 4. Grupos nominais — leia de trás para frente
Em inglês, os **modificadores vêm antes** e o **núcleo é a última palavra**. Traduza começando pelo fim:
- *network security policy* → política (de) segurança (de) rede;
- *open source software license* → licença de software de código aberto;
- *cloud-based identity management service* → serviço de gerenciamento de identidade baseado em nuvem;
- *multi-factor authentication requirement* → exigência de autenticação multifator.

## 5. Referência pronominal
Perguntas do tipo “a palavra **it** (linha 5) se refere a...” Procure o **substantivo anterior** que concorda em número e faz sentido:
*“The server stores the logs, but **they** are deleted after 30 days.”* → **they** = **the logs** (não o servidor, que é singular).
Pronomes relativos: **which/that** (coisas), **who** (pessoas), **whose** (cujo), **where** (onde). *this/these* costumam retomar **uma ideia inteira** da frase anterior.

## 6. Conectivos — o “GPS” do texto
| Função | Conectivos | Exemplo |
|---|---|---|
| Adição | *and, also, moreover, furthermore, in addition, besides* | *Moreover, the patch fixes two bugs.* |
| **Contraste** | *but, however, nevertheless, nonetheless, although, though, even though, whereas, while, yet, on the other hand, despite / in spite of* | *Although it is fast, it is insecure.* |
| Causa | *because, since, as, due to, owing to, because of* | *due to a misconfiguration* |
| Consequência | *so, therefore, thus, hence, consequently, as a result* | *Therefore, MFA is required.* |
| Condição | *if, unless (= a menos que / se não), provided that, as long as, otherwise (= caso contrário)* | *Access is denied unless the user is authenticated.* |
| Exemplo | *for example, for instance, such as, e.g.* | |
| Explicação | *that is, i.e., in other words, namely* | |
| Finalidade | *to, in order to, so that* | |
| Sequência / tempo | *first, then, next, finally, afterwards, meanwhile, while, until* | |
> [!dica] Cuidado com **unless**: *“Do not deploy unless all tests pass”* = **não** implante **a menos que** todos os testes passem. E com **while**, que pode indicar **tempo** (enquanto) ou **contraste** (ao passo que).

## 7. Verbos modais e a RFC 2119
| Modal | Sentido |
|---|---|
| **can** | capacidade / permissão (pode) |
| **could** | possibilidade; passado de can |
| **may / might** | possibilidade (talvez); *may* também = permissão |
| **must** | **obrigação** forte; dedução (“deve ser”) |
| **mustn’t** | **proibição** (não pode) |
| **don’t have to** | **não é necessário** (mas pode) |
| **should** | **recomendação** (deveria) |
| **will / would** | futuro / condicional |
Em especificações técnicas (**RFC 2119**, usada também na RFC 9700 do OAuth): **MUST / REQUIRED / SHALL** = obrigatório · **MUST NOT / SHALL NOT** = proibido · **SHOULD / RECOMMENDED** = recomendado (pode haver exceções justificadas) · **SHOULD NOT / NOT RECOMMENDED** = não recomendado · **MAY / OPTIONAL** = opcional.

## 8. Sufixos e prefixos que revelam o sentido
- **-er/-or**: quem faz (*developer, administrator*). **-tion/-ment/-ness**: substantivos (*encryption, deployment, awareness*). **-able/-ible**: possibilidade (*scalable* = escalável, *readable*). **-ly**: advérbio (*securely*). **-less**: sem (*serverless, wireless, passwordless*).
- **un-, in-, im-, dis-, non-**: negação (*unauthorized, insecure, disable*). **re-**: de novo (*restart, redeploy*). **pre-**: antes. **multi-**: vários. **over-**: excesso (*overload*). **under-**: abaixo/insuficiente.

## 9. Phrasal verbs comuns em TI
*set up* (configurar), *log in/on* (entrar), *log out/off* (sair), *back up* (fazer cópia de segurança — o substantivo é *backup*), *roll back* (reverter), *roll out* (implantar gradualmente), *shut down* (desligar), *turn on/off* (ligar/desligar), *look up* (consultar), *carry out* (realizar), *figure out* (descobrir), *find out* (descobrir), *point out* (apontar), *phase out* (descontinuar aos poucos), *break into* (invadir), *sign up* (cadastrar-se).

## 10. Vocabulário essencial de TI e segurança
| Inglês | Português | Inglês | Português |
|---|---|---|---|
| *deploy / deployment* | implantar / implantação | *threat* | ameaça |
| *release* | versão / lançamento | *vulnerability / flaw* | vulnerabilidade / falha |
| *rollback* | reversão | *breach* | violação |
| *bug / fix / patch* | defeito / correção / atualização corretiva | *leak* | vazamento |
| *branch / merge / commit* | ramo / mesclagem / confirmação | *attacker / threat actor* | atacante |
| *build / pipeline* | compilação / esteira | *wireless / wired* | sem fio / com fio |
| *backlog* | lista de pendências | *throughput / bandwidth* | vazão / largura de banda |
| *feature* | funcionalidade | *latency* | latência |
| *requirement* | requisito | *outage / downtime* | interrupção / tempo fora do ar |
| *stakeholder* | parte interessada | *load balancer* | balanceador de carga |
| *workaround* | solução de contorno | *troubleshooting* | solução de problemas |
| *legacy system* | sistema legado | *awareness* | conscientização |
| *enforce* | impor, fazer cumprir | *mitigate* | mitigar, atenuar |
| *compliance* | conformidade | *assessment* | avaliação |
| *safeguard* | salvaguarda, proteção | *hardening* | endurecimento (configuração segura) |

## 11. Exemplo resolvido
Texto: *“Although multi-factor authentication significantly reduces the risk of account takeover, it does not eliminate it entirely. Attackers may still trick users into approving fraudulent push notifications, a technique known as MFA fatigue.”*
- **Ideia principal**: o MFA **reduz muito, mas não elimina** o risco de sequestro de contas.
- *Although* = **embora** (contraste/concessão).
- *it* (em *does not eliminate it*) = **the risk** (of account takeover).
- *may still* = **ainda podem** (possibilidade).
- Uma alternativa dizendo “MFA makes account takeover impossible” está **errada** (o texto diz *does not eliminate it entirely*).
- *trick users into approving* = **enganar os usuários para que aprovem**.
`);
