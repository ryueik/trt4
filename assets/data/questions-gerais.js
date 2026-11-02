/* Questões inéditas no estilo FCC — Conhecimentos Gerais
   Formato: { topic, q (markdown), o: [5 alternativas], a: índice correto (0=A), e: comentário (markdown) } */

/* ======================= LÍNGUA PORTUGUESA ======================= */
Q('port', [
{ topic: 'port-interp', lvl: 'médio',
q: `Leia o trecho:

> *A digitalização dos serviços públicos não é, por si só, sinônimo de inclusão. Quando o acesso depende de conexão estável, dispositivo próprio e familiaridade com interfaces, parte da população permanece à margem — agora, porém, de forma menos visível.*

Depreende-se corretamente do trecho que`,
o: ['a digitalização dos serviços públicos deve ser interrompida até que toda a população tenha acesso à internet.',
    'a exclusão provocada pela digitalização tende a ser menos perceptível do que formas anteriores de exclusão.',
    'a familiaridade com interfaces digitais é o único obstáculo para o acesso aos serviços públicos.',
    'a inclusão social é consequência necessária da oferta de serviços públicos digitais.',
    'a população excluída do meio digital é numericamente inferior à excluída dos serviços presenciais.'],
a: 1,
e: `O trecho afirma que parte da população fica à margem “**de forma menos visível**”. Logo, a exclusão digital é **menos perceptível**.
- (A) O texto não propõe interromper a digitalização (extrapolação).
- (C) “único obstáculo” contraria a enumeração de três fatores.
- (D) contradiz “não é, por si só, sinônimo de inclusão”.
- (E) não há comparação numérica.` },

{ topic: 'port-interp', lvl: 'fácil',
q: `No trecho “*Quando o acesso depende de conexão estável (...), parte da população permanece à margem — **agora, porém**, de forma menos visível*”, a expressão destacada introduz, em relação ao que se disse antes, uma ideia de`,
o: ['conclusão.', 'causa.', 'ressalva, marcando contraste com uma situação anterior.', 'finalidade.', 'condição.'],
a: 2,
e: `“Porém” é conjunção **adversativa**; com “agora”, marca **contraste** entre a exclusão atual (menos visível) e a anterior.` },

{ topic: 'port-sintaxe', lvl: 'médio',
q: `Está correta a pontuação da frase:`,
o: ['Os servidores que concluíram o curso, receberão o certificado na próxima semana.',
    'O Tribunal, investiu em segurança cibernética e em capacitação.',
    'Os sistemas legados, que ainda processam parte dos dados, serão substituídos até o fim do ano.',
    'Foram publicados ontem, os resultados da avaliação interna.',
    'A equipe de infraestrutura informou que, o serviço ficará indisponível no sábado.'],
a: 2,
e: `Em (C), as vírgulas isolam corretamente uma **oração adjetiva explicativa**.
- (A) e (B): vírgula separando **sujeito e verbo** — erro.
- (D): vírgula separando **verbo e sujeito** posposto — erro.
- (E): vírgula entre a conjunção integrante “que” e o restante da oração — erro.` },

{ topic: 'port-sintaxe', lvl: 'difícil',
q: `Considere: “*Os técnicos **que atuam no plantão** devem registrar os incidentes.*” e “*Os técnicos, **que atuam no plantão**, devem registrar os incidentes.*”. É correto afirmar que`,
o: ['as duas frases têm exatamente o mesmo sentido, pois a vírgula é facultativa.',
    'na primeira, a oração destacada é explicativa; na segunda, restritiva.',
    'na primeira, apenas os técnicos do plantão devem registrar; na segunda, afirma-se que todos os técnicos atuam no plantão.',
    'a segunda frase está incorreta, pois não se usa vírgula antes de pronome relativo.',
    'nas duas frases, a oração destacada exerce função de adjunto adverbial.'],
a: 2,
e: `Sem vírgulas, a oração adjetiva é **restritiva** (delimita: só os do plantão). Com vírgulas, é **explicativa** (generaliza: todos os técnicos atuam no plantão). A pontuação muda o sentido.` },

{ topic: 'port-concord', lvl: 'médio',
q: `A concordância verbal está correta em:`,
o: ['Fazem dois anos que o sistema foi implantado.',
    'Houveram falhas no backup durante a madrugada.',
    'Devem haver soluções mais seguras para o armazenamento.',
    'Existem, no edital, regras específicas para a redação.',
    'Já faziam meses que a equipe aguardava o equipamento.'],
a: 3,
e: `**Existir** é pessoal e concorda com o sujeito “regras”: *Existem regras*.
- (A) e (E): **fazer** indicando tempo é **impessoal** → *Faz dois anos*, *fazia meses*.
- (B): **haver** no sentido de existir/ocorrer é impessoal → *Houve falhas*.
- (C): o auxiliar de “haver” impessoal fica no singular → *Deve haver*.` },

{ topic: 'port-concord', lvl: 'médio',
q: `A concordância nominal está correta em:`,
o: ['É proibido a entrada de pessoas não autorizadas no datacenter.',
    'Seguem anexo os relatórios de auditoria.',
    'Os servidores estavam meio preocupados com a migração.',
    'Bastante servidores participaram do treinamento.',
    'Elas mesmo configuraram o firewall.'],
a: 2,
e: `**Meio** como advérbio (= um pouco) é **invariável**: *meio preocupados*.
- (A) com artigo, concorda: *É proibid**a** **a** entrada*.
- (B) *anexos* concorda com “relatórios”.
- (D) *bastantes* (adjetivo = muitos).
- (E) *mesmas*.` },

{ topic: 'port-verbos', lvl: 'médio',
q: `Está correta a forma verbal em:`,
o: ['Se o servidor manter a configuração atual, o problema persistirá.',
    'Quando a equipe vir o relatório, tomará providências.',
    'O gestor interviu na reunião para esclarecer o cronograma.',
    'Se o técnico propor uma solução viável, ela será adotada.',
    'Eles reaveram os arquivos perdidos com o backup.'],
a: 1,
e: `**Vir**, no futuro do subjuntivo do verbo **ver**, é *quando eu/ele **vir***. Correto.
- (A) *mantiver* (derivado de ter).
- (C) *interveio* (derivado de vir).
- (D) *propuser* (derivado de pôr).
- (E) *reouveram* (derivado de haver).` },

{ topic: 'port-verbos', lvl: 'difícil',
q: `Transpondo para a voz passiva a frase “*A equipe de segurança **identificou** as vulnerabilidades*”, a forma verbal resultante é:`,
o: ['foram identificadas.', 'identificaram-se.', 'tinham sido identificadas.', 'eram identificadas.', 'foi identificada.'],
a: 0,
e: `Voz passiva analítica: **ser** no mesmo tempo do verbo original (pretérito perfeito → *foram*) + particípio concordando com o novo sujeito (“as vulnerabilidades”): *As vulnerabilidades **foram identificadas** pela equipe*.` },

{ topic: 'port-morfo', lvl: 'médio',
q: `O acento indicativo de crase está empregado corretamente em:`,
o: ['O sistema ficou disponível à partir das 8 horas.',
    'Os técnicos referiram-se à normas da ENSEC-PJ.',
    'A atualização será aplicada de segunda à sexta.',
    'O relatório foi entregue à diretora da secretaria.',
    'Começou à chover durante a manutenção.'],
a: 3,
e: `**Entregar a** + **a diretora** = *à diretora*.
- (A) não há crase antes de verbo (*a partir*).
- (B) “a” singular diante de plural sem artigo → *a normas* (ou *às normas*).
- (C) *de segunda **a** sexta* (sem artigo no primeiro termo) ou *da segunda **à** sexta*.
- (E) antes de verbo, não há crase.` },

{ topic: 'port-morfo', lvl: 'médio',
q: `A colocação do pronome está de acordo com a norma-padrão em:`,
o: ['Não encontraram-se erros no código revisado.',
    'Me informaram que o servidor foi reiniciado.',
    'Quem avisou-te sobre a manutenção?',
    'Os relatórios que nos enviaram estavam incompletos.',
    'Tudo resolveu-se após a atualização.'],
a: 3,
e: `O pronome relativo **que** atrai o pronome oblíquo: *que **nos** enviaram* (próclise).
- (A) “não” atrai: *Não se encontraram*.
- (B) não se inicia frase com oblíquo átono: *Informaram-me*.
- (C) pronome interrogativo atrai: *Quem te avisou*.
- (E) pronome indefinido atrai: *Tudo se resolveu*.` },

{ topic: 'port-orto', lvl: 'fácil',
q: `Estão corretamente grafadas todas as palavras em:`,
o: ['excessão — análise — previlégio', 'exceção — análise — privilégio', 'exceção — análize — privilégio', 'excessão — análize — previlégio', 'exeção — análise — privilégio'],
a: 1,
e: `Grafias corretas: **exceção**, **análise**, **privilégio**.` },

{ topic: 'port-orto', lvl: 'médio',
q: `O emprego dos porquês está correto em:`,
o: ['Não sei porque o sistema caiu.',
    'O serviço parou por que faltou energia.',
    'Ninguém explicou o porquê da falha.',
    'A falha ocorreu, porquê o disco estava cheio.',
    'Por quê o firewall bloqueou a porta?'],
a: 2,
e: `**Porquê** substantivado (precedido de artigo) = *o motivo*: “o porquê da falha”.
- (A) *por que* (= por qual motivo) em interrogativa indireta.
- (B) e (D) *porque* (conjunção causal).
- (E) *Por que* no início de pergunta.` },

{ topic: 'port-redof', lvl: 'médio',
q: `De acordo com o Manual de Redação da Presidência da República (3ª ed.), o pronome de tratamento e o vocativo adequados para um ofício dirigido ao Presidente de um Tribunal Regional do Trabalho são, respectivamente,`,
o: ['Vossa Magnificência — Magnífico Presidente,',
    'Vossa Excelência — Excelentíssimo Senhor Presidente,',
    'Vossa Excelência — Senhor Presidente,',
    'Vossa Senhoria — Senhor Presidente,',
    'Vossa Excelência — Digníssimo Senhor Presidente,'],
a: 2,
e: `Juízes e desembargadores recebem **Vossa Excelência**. O vocativo é “**Senhor** + cargo”. O vocativo “Excelentíssimo Senhor” fica reservado aos **chefes de Poder** (Presidente da República, do Congresso e do STF). A 3ª edição **aboliu “Digníssimo”** e não usa “DD.”.` },

{ topic: 'port-redof', lvl: 'médio',
q: `Segundo o Manual de Redação da Presidência da República (3ª ed.), é correto afirmar sobre o padrão ofício:`,
o: ['Aviso, memorando e ofício permanecem como documentos com diagramações diferentes.',
    'O fecho “Respeitosamente” é usado para autoridades de hierarquia igual ou inferior.',
    'O ofício passou a ser a única forma de expediente, com o padrão ofício abrangendo os antigos aviso e memorando.',
    'O uso do e-mail é vedado para comunicações oficiais.',
    'O local e a data devem constar no fecho do documento, após a assinatura.'],
a: 2,
e: `A 3ª edição **unificou** aviso, memorando e ofício no **padrão ofício**, com a denominação única **ofício**.
- (B) “Respeitosamente” é para autoridades **superiores**; “Atenciosamente”, iguais ou inferiores.
- (D) o e-mail é admitido.
- (E) local e data ficam no **início**, alinhados à direita.` },

{ topic: 'port-redof', lvl: 'fácil',
q: `São atributos da redação oficial destacados pelo Manual de Redação da Presidência da República:`,
o: ['rebuscamento, formalidade e impessoalidade.',
    'clareza, concisão, formalidade, impessoalidade e uso da norma-padrão.',
    'subjetividade, precisão e coloquialismo controlado.',
    'prolixidade, objetividade e uniformidade.',
    'pessoalidade, padronização e uso de jargões técnicos.'],
a: 1,
e: `A redação oficial deve ter **clareza e precisão, objetividade, concisão, coesão e coerência, impessoalidade, formalidade e padronização**, e seguir a **norma-padrão**. Rebuscamento, prolixidade e jargão são vícios.` }
]);

/* ======================= MATEMÁTICA E RACIOCÍNIO LÓGICO ======================= */
Q('mat', [
{ topic: 'mat-logica', lvl: 'médio',
q: `A negação lógica da proposição “**Todos os servidores concluíram o curso e o sistema foi atualizado**” é:`,
o: ['Nenhum servidor concluiu o curso e o sistema não foi atualizado.',
    'Algum servidor não concluiu o curso ou o sistema não foi atualizado.',
    'Algum servidor não concluiu o curso e o sistema não foi atualizado.',
    'Nenhum servidor concluiu o curso ou o sistema não foi atualizado.',
    'Todos os servidores não concluíram o curso ou o sistema não foi atualizado.'],
a: 1,
e: `Lei de De Morgan: ~(p ∧ q) ≡ ~p ∨ ~q.
Negação de “Todos ... concluíram” = “**Algum ... não concluiu**”. Logo: *Algum servidor não concluiu o curso **ou** o sistema não foi atualizado*.` },

{ topic: 'mat-logica', lvl: 'médio',
q: `Uma proposição logicamente equivalente a “**Se o backup falhar, então o técnico será notificado**” é:`,
o: ['Se o técnico for notificado, então o backup falhou.',
    'Se o backup não falhar, então o técnico não será notificado.',
    'O backup falha e o técnico não é notificado.',
    'Se o técnico não for notificado, então o backup não falhou.',
    'O backup falha ou o técnico é notificado.'],
a: 3,
e: `Contrapositiva: p → q ≡ **~q → ~p**. Outra equivalência seria “O backup **não** falha **ou** o técnico é notificado” (~p ∨ q), não presente na forma correta em (E). (A) é a recíproca e (B) a inversa — **não** são equivalentes. (C) é a negação.` },

{ topic: 'mat-logica', lvl: 'difícil',
q: `Considere verdadeiras as premissas: (I) Se Ana é analista, Bruno é técnico. (II) Se Bruno é técnico, Carla não é juíza. (III) Carla é juíza. Conclui-se corretamente que`,
o: ['Ana é analista.', 'Bruno é técnico.', 'Ana não é analista e Bruno não é técnico.', 'Ana não é analista, mas Bruno é técnico.', 'nada se pode concluir sobre Ana.'],
a: 2,
e: `(III) Carla é juíza (V). Em (II), o consequente “Carla não é juíza” é F; para a condicional ser V, o antecedente deve ser F → **Bruno não é técnico**. Em (I), o consequente é F, logo **Ana não é analista** (modus tollens encadeado).` },

{ topic: 'mat-rl', lvl: 'médio',
q: `Em uma sequência, cada termo a partir do terceiro é a soma dos dois anteriores. Se o 5º termo é 19 e o 6º termo é 31, o 2º termo é`,
o: ['3', '4', '5', '6', '7'],
a: 2,
e: `a₄ = a₆ − a₅ = 31 − 19 = **12**; a₃ = a₅ − a₄ = 19 − 12 = **7**; a₂ = a₄ − a₃ = 12 − 7 = **5**.` },

{ topic: 'mat-rl', lvl: 'médio',
q: `Três técnicos — Davi, Elisa e Fábio — trabalham, cada um, em uma área diferente: redes, desenvolvimento e segurança. Sabe-se que: Davi não trabalha com redes; Elisa não trabalha com redes nem com segurança. Então, necessariamente,`,
o: ['Davi trabalha com desenvolvimento.', 'Fábio trabalha com segurança.', 'Elisa trabalha com segurança.', 'Fábio trabalha com redes.', 'Davi trabalha com redes.'],
a: 3,
e: `Elisa não é de redes nem de segurança → **Elisa = desenvolvimento**. Davi não é de redes e desenvolvimento já está ocupado → **Davi = segurança**. Sobra **Fábio = redes**.` },

{ topic: 'mat-aritm', lvl: 'médio',
q: `Três rotinas de backup são executadas a cada 6, 8 e 15 horas, respectivamente. Se as três foram executadas juntas às 0h de uma segunda-feira, voltarão a ser executadas juntas pela primeira vez`,
o: ['na terça-feira às 0h.', 'na terça-feira às 12h.', 'na quarta-feira às 0h.', 'na sexta-feira às 0h.', 'na sexta-feira às 12h.'],
a: 3,
e: `MMC(6, 8, 15) = 2³ × 3 × 5 = **120 horas** = **5 dias**. Segunda 0h + 5 dias = **sexta-feira às 0h**.` },

{ topic: 'mat-aritm', lvl: 'fácil',
q: `Um lote de 84 notebooks e 126 monitores será dividido em kits idênticos, com o maior número possível de kits e sem sobras. Cada kit terá`,
o: ['2 notebooks e 3 monitores.', '3 notebooks e 4 monitores.', '4 notebooks e 6 monitores.', '6 notebooks e 9 monitores.', '7 notebooks e 9 monitores.'],
a: 0,
e: `MDC(84, 126) = **42 kits**. Cada kit: 84 ÷ 42 = **2 notebooks** e 126 ÷ 42 = **3 monitores**.` },

{ topic: 'mat-prop', lvl: 'médio',
q: `Quatro servidores, trabalhando 6 horas por dia, digitalizam um acervo em 15 dias. Seis servidores, com a mesma produtividade, trabalhando 5 horas por dia, digitalizarão o mesmo acervo em`,
o: ['10 dias.', '12 dias.', '15 dias.', '18 dias.', '20 dias.'],
a: 1,
e: `Regra de três composta (homens-hora): 4 × 6 × 15 = 360 homens-hora. Com 6 × 5 = 30 homens-hora por dia: 360 ÷ 30 = **12 dias**.` },

{ topic: 'mat-prop', lvl: 'médio',
q: `O preço de uma licença de software sofreu aumento de 20% e, em seguida, desconto de 20%. Em relação ao preço inicial, o preço final é`,
o: ['igual.', '4% menor.', '4% maior.', '2% menor.', '10% menor.'],
a: 1,
e: `1,20 × 0,80 = **0,96** → o preço final é **4% menor**.` },

{ topic: 'mat-prop', lvl: 'difícil',
q: `Uma gratificação de R$ 9.000,00 será dividida entre três equipes em partes diretamente proporcionais ao número de chamados resolvidos (40, 60 e 80) e inversamente proporcionais ao número de integrantes (2, 3 e 2). A equipe com 80 chamados receberá`,
o: ['R$ 3.000,00', 'R$ 3.600,00', 'R$ 4.000,00', 'R$ 4.500,00', 'R$ 5.000,00'],
a: 3,
e: `Pesos: 40/2 = 20; 60/3 = 20; 80/2 = 40. Soma = 80. Constante: 9.000 ÷ 80 = 112,5. Equipe 3: 40 × 112,5 = **R$ 4.500,00**.
Conferência: 2.250 + 2.250 + 4.500 = 9.000 ✔` },

{ topic: 'mat-estat', lvl: 'médio',
q: `Os tempos (em minutos) de atendimento de 7 chamados foram: 12, 8, 15, 8, 20, 10, 11. A média, a mediana e a moda são, respectivamente,`,
o: ['12; 11; 8', '12; 10; 8', '11; 11; 8', '12; 11; 10', '11,5; 11; 8'],
a: 0,
e: `Soma = 84 → **média = 12**. Ordenando: 8, 8, 10, **11**, 12, 15, 20 → **mediana = 11**. Valor mais frequente: **moda = 8**.` },

{ topic: 'mat-estat', lvl: 'fácil',
q: `Em uma urna há 5 tokens azuis, 3 vermelhos e 2 verdes. Retirando-se um token ao acaso, a probabilidade de ele **não** ser vermelho é`,
o: ['30%', '50%', '60%', '70%', '80%'],
a: 3,
e: `P(vermelho) = 3/10 = 30%. P(não vermelho) = 1 − 0,3 = **70%**.` }
]);

/* ======================= LEGISLAÇÃO E ÉTICA ======================= */
Q('leg', [
{ topic: 'leg-sust', lvl: 'médio',
q: `De acordo com a Resolução CNJ nº 400/2021, que dispõe sobre a política de sustentabilidade no Poder Judiciário, o instrumento de planejamento que estabelece metas, ações, indicadores e prazos para práticas sustentáveis é o`,
o: ['Plano Diretor de TIC.', 'Plano de Logística Sustentável (PLS).', 'Balanço Socioambiental Anual.', 'Plano Anual de Contratações.', 'Relatório de Gestão Fiscal.'],
a: 1,
e: `O **PLS — Plano de Logística Sustentável** é o instrumento vinculado ao planejamento estratégico que define práticas de sustentabilidade, racionalização e qualidade, com **objetivos, metas, indicadores, ações e responsáveis**.` },

{ topic: 'leg-sust', lvl: 'médio',
q: `No âmbito das contratações públicas sustentáveis, é correto afirmar que`,
o: ['critérios de sustentabilidade só podem ser exigidos em contratações de obras.',
    'a Lei nº 14.133/2021 inclui o desenvolvimento nacional sustentável entre os objetivos e princípios do processo licitatório.',
    'o menor preço impede qualquer exigência ambiental no edital.',
    'o ciclo de vida do objeto é irrelevante para a escolha da proposta mais vantajosa.',
    'a logística reversa não pode ser exigida em contratos administrativos.'],
a: 1,
e: `A Lei 14.133/2021 traz o **desenvolvimento nacional sustentável** como princípio (art. 5º) e objetivo (art. 11, IV) e manda considerar o **ciclo de vida** do objeto. A logística reversa e critérios ambientais podem ser exigidos.` },

{ topic: 'leg-conduta', lvl: 'fácil',
q: `Considerando os deveres éticos usualmente previstos nos códigos de conduta dos servidores do Poder Judiciário, constitui conduta **vedada**:`,
o: ['tratar com urbanidade os jurisdicionados e colegas.',
    'utilizar informações privilegiadas obtidas em razão do cargo para obter vantagem pessoal.',
    'comunicar à chefia irregularidades de que tiver ciência.',
    'zelar pela economia de material e conservação do patrimônio.',
    'manter sigilo sobre assuntos da repartição.'],
a: 1,
e: `O uso de **informação privilegiada** para benefício próprio ou de terceiros é vedado (art. 117 da Lei 8.112/1990 e códigos de conduta). As demais são **deveres**.` },

{ topic: 'leg-conduta', lvl: 'médio',
q: `Segundo a Lei nº 8.112/1990, ao servidor público é **proibido**:`,
o: ['participar de gerência de sociedade privada, salvo na qualidade de acionista, cotista ou comanditário.',
    'representar contra ilegalidade, omissão ou abuso de poder.',
    'ser assíduo e pontual ao serviço.',
    'atender com presteza às requisições para a defesa da Fazenda Pública.',
    'levar as irregularidades de que tiver ciência ao conhecimento da autoridade superior.'],
a: 0,
e: `Art. 117, X: é proibido **participar de gerência ou administração de sociedade privada**, personificada ou não, e exercer o comércio, **exceto** na qualidade de acionista, cotista ou comanditário. As demais alternativas são **deveres** (art. 116).` },

{ topic: 'leg-regimento', lvl: 'fácil',
q: `O Tribunal Regional do Trabalho da 4ª Região tem jurisdição sobre`,
o: ['os Estados do Rio Grande do Sul e de Santa Catarina.',
    'o Estado do Rio Grande do Sul.',
    'a Região Sul do País.',
    'o Município de Porto Alegre e Região Metropolitana.',
    'os Estados do Rio Grande do Sul, Santa Catarina e Paraná.'],
a: 1,
e: `O **TRT4**, com sede em **Porto Alegre**, tem jurisdição sobre todo o **Estado do Rio Grande do Sul**. Santa Catarina é o TRT12 e o Paraná, o TRT9.` },

{ topic: 'leg-regimento', lvl: 'médio',
q: `Nos termos da Constituição Federal, os Tribunais Regionais do Trabalho compõem-se de, no mínimo,`,
o: ['5 juízes, nomeados pelo Presidente do TST.',
    '7 juízes, recrutados, quando possível, na respectiva região e nomeados pelo Presidente da República.',
    '7 juízes, nomeados pelo Governador do Estado.',
    '11 juízes, todos oriundos da magistratura de carreira.',
    '27 ministros, nomeados pelo Presidente da República.'],
a: 1,
e: `CF, art. 115: os TRTs compõem-se de, **no mínimo, sete juízes**, recrutados, quando possível, na respectiva região, e **nomeados pelo Presidente da República** entre brasileiros com mais de 30 e menos de 70 anos, sendo **um quinto** dentre advogados e membros do MPT.` },

{ topic: 'leg-assedio', lvl: 'médio',
q: `De acordo com a Resolução CNJ nº 351/2020, que institui a Política de Prevenção e Enfrentamento do Assédio Moral, do Assédio Sexual e da Discriminação no Poder Judiciário, é correto afirmar:`,
o: ['O assédio moral caracteriza-se apenas por condutas de superior hierárquico contra subordinado.',
    'O assédio sexual, para fins da política, pode ocorrer independentemente de hierarquia.',
    'A política aplica-se exclusivamente a magistrados.',
    'A denúncia somente pode ser apresentada pela própria vítima, vedado o anonimato e a atuação de terceiros.',
    'A discriminação não está abrangida pela política.'],
a: 1,
e: `A Res. CNJ 351/2020 adota conceito amplo: o assédio pode ser **vertical (descendente ou ascendente) ou horizontal**, e o **assédio sexual** independe de relação hierárquica. Abrange magistrados, servidores, estagiários e terceirizados, e também a **discriminação**. Prevê acolhimento, sigilo e comissões de prevenção.` },

{ topic: 'leg-assedio', lvl: 'fácil',
q: `A conduta de um colega, de mesmo nível hierárquico, que reiteradamente ridiculariza outro servidor em reuniões e o isola das atividades da equipe caracteriza, em tese,`,
o: ['mero conflito interpessoal, sem relevância disciplinar.', 'assédio moral horizontal.', 'assédio moral vertical descendente.', 'assédio sexual.', 'improbidade administrativa culposa.'],
a: 1,
e: `Condutas abusivas **reiteradas** que degradam o ambiente e a dignidade, entre pares, configuram **assédio moral horizontal**.` }
]);

/* ======================= DIREITOS HUMANOS ======================= */
Q('dh', [
{ topic: 'dh-teoria', lvl: 'fácil',
q: `É característica dos direitos humanos a`,
o: ['transitoriedade.', 'renunciabilidade.', 'indivisibilidade.', 'disponibilidade.', 'prescritibilidade.'],
a: 2,
e: `Os direitos humanos são **universais, indivisíveis, interdependentes, inter-relacionados, inalienáveis, irrenunciáveis, imprescritíveis** e **históricos** (Declaração e Programa de Ação de Viena, 1993).` },

{ topic: 'dh-teoria', lvl: 'médio',
q: `A classificação dos direitos humanos em “gerações” ou “dimensões” associa os direitos de segunda dimensão à ideia de`,
o: ['liberdade e direitos civis e políticos.', 'igualdade material e direitos sociais, econômicos e culturais.', 'fraternidade e direitos difusos.', 'democracia e pluralismo.', 'biotecnologia e engenharia genética.'],
a: 1,
e: `1ª dimensão: **liberdade** (civis e políticos). 2ª: **igualdade** (sociais, econômicos e culturais — prestações positivas do Estado). 3ª: **fraternidade/solidariedade** (difusos: meio ambiente, paz, desenvolvimento).` },

{ topic: 'dh-tratados', lvl: 'médio',
q: `Conforme a Constituição Federal, os tratados e convenções internacionais sobre direitos humanos aprovados, em cada Casa do Congresso Nacional, em dois turnos, por três quintos dos votos dos respectivos membros, serão`,
o: ['equivalentes às leis ordinárias.', 'equivalentes às emendas constitucionais.', 'equivalentes às leis complementares.', 'supralegais, mas infraconstitucionais.', 'inaplicáveis enquanto não regulamentados por lei.'],
a: 1,
e: `CF, art. 5º, § 3º (EC 45/2004): rito especial → **status de emenda constitucional**. Tratados de DH aprovados pelo rito comum têm status **supralegal** (STF, RE 466.343).` },

{ topic: 'dh-tratados', lvl: 'difícil',
q: `Sobre a hierarquia dos tratados internacionais de direitos humanos no ordenamento brasileiro, segundo o entendimento do STF, a Convenção Americana sobre Direitos Humanos (Pacto de San José da Costa Rica), por ter sido incorporada antes da EC nº 45/2004 e sem o rito do art. 5º, § 3º, possui status`,
o: ['constitucional.', 'supralegal.', 'de lei ordinária.', 'de lei complementar.', 'de decreto regulamentar.'],
a: 1,
e: `No RE 466.343 (prisão do depositário infiel), o STF fixou o status **supralegal**: abaixo da Constituição, acima das leis — tornando inaplicável a legislação infraconstitucional conflitante (Súmula Vinculante 25).` },

{ topic: 'dh-onu', lvl: 'médio',
q: `A Declaração Universal dos Direitos Humanos foi adotada pela Assembleia Geral da ONU em`,
o: ['1945, juntamente com a Carta da ONU.', '1948, por meio de resolução.', '1966, como tratado vinculante.', '1969, em San José da Costa Rica.', '1993, na Conferência de Viena.'],
a: 1,
e: `A **DUDH** foi adotada em **10 de dezembro de 1948** por **resolução** da Assembleia Geral (Res. 217 A). Os Pactos de Direitos Civis e Políticos e de Direitos Econômicos, Sociais e Culturais são de **1966**.` },

{ topic: 'dh-oea', lvl: 'médio',
q: `No Sistema Interamericano de Direitos Humanos, o órgão que pode receber petições individuais de vítimas de violações e, se for o caso, submeter o caso à Corte Interamericana é`,
o: ['a Assembleia Geral da OEA.', 'o Conselho de Direitos Humanos da ONU.', 'a Comissão Interamericana de Direitos Humanos.', 'o Tribunal Penal Internacional.', 'a Corte Internacional de Justiça.'],
a: 2,
e: `Indivíduos **não** acessam diretamente a Corte IDH: peticionam à **Comissão Interamericana** (sediada em Washington), que pode submeter o caso à **Corte** (sediada em San José). Só a Comissão e os Estados-Partes podem submeter casos à Corte.` },

{ topic: 'dh-grupos', lvl: 'médio',
q: `A Convenção sobre os Direitos das Pessoas com Deficiência e seu Protocolo Facultativo, no Brasil,`,
o: ['têm status de lei ordinária.', 'foram aprovados pelo rito do art. 5º, § 3º, da CF e têm equivalência de emenda constitucional.', 'não foram ratificados pelo Brasil.', 'têm status supralegal apenas.', 'aplicam-se apenas a órgãos federais.'],
a: 1,
e: `A **Convenção de Nova York** (2007) foi o **primeiro tratado** aprovado pelo rito do § 3º do art. 5º (Decreto Legislativo 186/2008 e Decreto 6.949/2009) — **equivalente a emenda constitucional**. O **Tratado de Marraqueche** (acesso a obras por pessoas cegas) também seguiu esse rito.` },

{ topic: 'dh-grupos', lvl: 'fácil',
q: `A Lei Brasileira de Inclusão da Pessoa com Deficiência (Lei nº 13.146/2015) considera pessoa com deficiência aquela que tem`,
o: ['qualquer doença crônica, independentemente de barreiras.',
    'impedimento de longo prazo de natureza física, mental, intelectual ou sensorial, o qual, em interação com uma ou mais barreiras, pode obstruir sua participação plena e efetiva na sociedade em igualdade de condições.',
    'incapacidade absoluta para os atos da vida civil.',
    'laudo médico que ateste a impossibilidade de trabalhar.',
    'idade superior a 60 anos e mobilidade reduzida.'],
a: 1,
e: `É o **modelo biopsicossocial** (art. 2º da LBI), que considera a **interação** entre o impedimento e as **barreiras**. A LBI alterou o Código Civil: a pessoa com deficiência **não** é, por isso, considerada incapaz.` }
]);
