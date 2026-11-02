/* Aulas completas — Conhecimentos Gerais (Português, Matemática/RL, Legislação, Direitos Humanos)
   Explicações didáticas, do zero, com exemplos resolvidos e as pegadinhas mais comuns da FCC. */

/* ============================ LÍNGUA PORTUGUESA ============================ */
A('port-interp', `
## 1. O que a FCC realmente cobra em interpretação
Quase metade das questões de Português da FCC parte de um texto. E a banca quase nunca pergunta “o que o texto diz” de forma literal: ela pergunta o que **se pode concluir**, o que **está implícito**, qual o **sentido de uma expressão no contexto** ou qual **reescrita mantém o sentido**. Por isso, interpretar bem é a habilidade que mais rende pontos na prova.

Pense no texto como um **contrato**: você só pode afirmar o que o autor assinou embaixo. Tudo o que vai além disso — por mais lógico ou verdadeiro que pareça no mundo real — é **extrapolação** e costuma ser a alternativa errada.

## 2. Compreensão × interpretação
- **Compreensão** = o que está **escrito** (“segundo o texto”, “o autor afirma”). Responde-se localizando a informação.
- **Interpretação** = o que se **deduz** do que está escrito (“infere-se”, “depreende-se”, “conclui-se”). Exige raciocínio, mas sempre **ancorado** no texto.

> [!dica] Truque prático: para cada alternativa, pergunte “**em que linha** o texto me autoriza a dizer isso?”. Se você não consegue apontar o trecho, desconfie.

## 3. Os três erros clássicos das alternativas
1. **Extrapolação**: a alternativa vai além do texto. Ex.: o texto diz que a tecnologia “pode ampliar desigualdades”; a alternativa diz que ela “sempre amplia”. Palavras como **sempre, nunca, todos, apenas, únicos, necessariamente** são sinal de alerta.
2. **Redução**: a alternativa pega uma parte e trata como o todo. O texto fala de três causas; a alternativa diz que só uma delas é “a causa”.
3. **Contradição**: a alternativa diz o oposto do texto, muitas vezes trocando um conectivo (“porque” vira “embora”) ou invertendo causa e consequência.

## 4. Tipologia textual: identifique o “jeito” do texto
| Tipo | Objetivo | Marcas |
|---|---|---|
| **Narrativo** | contar fatos | personagens, tempo, verbos no passado |
| **Descritivo** | caracterizar | adjetivos, verbos de estado |
| **Dissertativo-expositivo** | explicar/informar | neutralidade, dados |
| **Dissertativo-argumentativo** | **convencer** | tese, argumentos, conectivos de causa e oposição |
| **Injuntivo** | orientar ação | imperativo, passo a passo |
A maioria dos textos da FCC é **dissertativo-argumentativa**: o autor defende uma ideia. Sua missão é achar a **tese** (geralmente no 1º ou no último parágrafo) e ver como cada parágrafo a sustenta.

## 5. Sentido das palavras no contexto
A FCC adora perguntar se uma palavra pode ser substituída por outra “sem prejuízo do sentido”. Regras:
- O sinônimo precisa servir **naquela frase**, não no dicionário. “Assistir” pode ser “ver” (assistir ao filme) ou “ajudar” (o médico assiste o paciente).
- Verifique se a troca exige mudar **regência** ou **concordância**.

## 6. Coesão referencial: “a quem se refere?”
Pronomes e expressões retomam termos anteriores. Pergunta típica: “o pronome **ela**, na linha 5, refere-se a...”. Técnica: **substitua** o pronome pelo candidato e veja se a frase continua fazendo sentido.

## 7. Figuras de linguagem que mais caem
| Figura | Ideia | Exemplo |
|---|---|---|
| **Metáfora** | comparação implícita | “A internet é uma **praça pública**.” |
| **Comparação** | comparação explícita (como, tal qual) | “Os dados circulam **como** água.” |
| **Metonímia** | troca por relação real (autor/obra, parte/todo, marca/produto) | “Li **Machado**.” |
| **Ironia** | dizer o contrário do que se pensa | “Que **ótimo**, o sistema caiu de novo.” |
| **Eufemismo** | suavizar | “Ele **nos deixou**.” (morreu) |
| **Hipérbole** | exagero | “Já falei **mil vezes**.” |
| **Antítese** | ideias opostas próximas | “O **progresso** que **exclui**.” |
| **Paradoxo** | ideias opostas que se fundem numa só afirmação | “É um **silêncio ensurdecedor**.” |
| **Prosopopeia** | dar traços humanos a seres inanimados | “A cidade **dorme**.” |

## 8. Exemplo resolvido
*Texto:* “A automação não elimina empregos de forma automática; ela redistribui tarefas. O problema surge quando a requalificação não acompanha essa redistribuição.”
*Pergunta:* infere-se que...
- “a automação elimina todos os empregos” → **contradição** (o texto nega).
- “a requalificação é o único problema da economia” → **extrapolação** (“único”).
- “sem requalificação, a redistribuição de tarefas pode gerar problemas” → ✔ **correta**: decorre diretamente da segunda frase.

## 9. Como estudar
- Leia o **enunciado antes** do texto: você saberá o que procurar.
- Na primeira leitura, sublinhe **tese** e **conectivos** (mas, portanto, embora).
- Elimine alternativas com palavras absolutas e mudanças de causa/efeito.
`);

A('port-orto', `
## 1. Por que ortografia ainda cai
Na FCC, ortografia aparece de dois jeitos: em questões diretas (“está corretamente grafado”) e, principalmente, **dentro da redação** (critério de morfossintaxe). Errar acento ou crase no texto definitivo custa ponto. Aqui você vai aprender as **regras que resolvem 90% dos casos**.

## 2. Acentuação: o método das 3 perguntas
Para acentuar qualquer palavra, responda:
1. **Onde está a sílaba mais forte (tônica)?** Última = **oxítona**; penúltima = **paroxítona**; antepenúltima = **proparoxítona**.
2. **Como a palavra termina?**
3. **Há hiato ou ditongo especial?**

| Classificação | Regra | Exemplos |
|---|---|---|
| **Proparoxítonas** | **todas** são acentuadas | **lógica**, **público**, **técnico** |
| **Oxítonas** | acentuam-se as terminadas em **a(s), e(s), o(s), em, ens** | sofá, você, após, também, parabéns |
| **Paroxítonas** | acentuam-se as que **NÃO** terminam em a, e, o, em, ens (ou seja: r, x, n, l, i(s), us, um, ps, ã, ão, ditongo) | caráter, tórax, hífen, útil, júri, vírus, álbum, bíceps, órfã, órgão, **história**, **série** |
| **Monossílabos tônicos** | terminados em a(s), e(s), o(s) | pá, pé, nó, dê |
> [!dica] Repare que oxítonas e paroxítonas são **espelhos**: o que acentua uma, não acentua a outra. “Café” (oxítona em -e) tem acento; “**cafe**zinho” não. “Táxi” (paroxítona em -i) tem; “aqui” (oxítona em -i) não.

### Hiatos com I e U
Acentua-se o **i** ou **u** tônico que forma hiato com a vogal anterior e fica **sozinho na sílaba** (ou com S): sa-**í**-da, ba-**ú**, pa-**ís**, pre-ju-**í**-zo. Não se acentua se vier seguido de **nh** (ra-i-nha) ou se formar sílaba com outra letra (ca-ir, ra-iz).

### O que o Acordo Ortográfico (2009) mudou
- Caiu o acento dos ditongos abertos **éi** e **ói** nas **paroxítonas**: ideia, assembleia, heroico, jiboia. (Nas oxítonas continua: papéis, herói, anéis.)
- Caiu o acento de **êem** e **ôo**: leem, veem, creem, voo, enjoo.
- Caiu o trema (linguiça, frequente) — exceto em nomes estrangeiros (Müller).
- Caíram vários acentos diferenciais: para (verbo), pelo, polo. **Permanecem**: **pôde** (passado) × pode (presente); **pôr** (verbo) × por (preposição); **têm/vêm** (plural) × tem/vem (singular).

## 3. Crase: a regra-mãe
Crase é a **fusão** da preposição **a** com o artigo feminino **a** (ou com o “a” de aquele, aquela, aquilo).
**a** (preposição exigida por um termo) + **a** (artigo exigido pela palavra feminina) = **à**

### Teste do masculino (o melhor truque)
Troque a palavra feminina por uma masculina. Se aparecer **“ao”**, há crase.
- “Fui **à** reunião.” → “Fui **ao** encontro.” ✔ crase.
- “Conheço **a** diretora.” → “Conheço **o** diretor.” ✘ sem crase (não há preposição).

### Onde NUNCA há crase
- Antes de **palavra masculina** (a pé, a cavalo).
- Antes de **verbo** (começou **a** chover; **a** partir de).
- Antes da maioria dos **pronomes** (a ela, a Vossa Excelência, a esta).
- Entre **palavras repetidas** (cara a cara, gota a gota).
- **“a” singular + palavra no plural**: refiro-me **a** normas (se fosse “às normas”, o artigo também estaria no plural).

### Casos obrigatórios
- Locuções femininas: **à** medida que, **às** vezes, **à** noite, **à** custa de.
- Horas determinadas: **às** 14h; “de 8h **às** 18h”.
- “À moda de”, mesmo implícita: bife **à** milanesa.

### Casos facultativos
Antes de **pronome possessivo feminino** singular (entreguei **a/à** sua chefe), antes de **nomes próprios femininos** e depois de **até** (fui até **a/à** sala).

## 4. Porquês
| Forma | Quando | Exemplo |
|---|---|---|
| **por que** | pergunta (direta ou indireta) ou = pelo qual | **Por que** o sistema caiu? / Não sei **por que** caiu. |
| **por quê** | no **fim da frase** (antes de pontuação) | O sistema caiu **por quê**? |
| **porque** | explicação/causa (= pois) | Caiu **porque** faltou energia. |
| **porquê** | substantivo (com artigo) | Ninguém entendeu **o porquê** da falha. |

## 5. Grafias que a FCC adora
- **Exceção, excesso, excessivo, exceto** (com XC); **análise, paralisação, pesquisa** (com S); **privilégio, beneficente, empecilho, impecilho ✘**.
- **Mal × mau**: *mal* opõe-se a *bem*; *mau* opõe-se a *bom*.
- **Há × a** (tempo): *há* = passado (há dois anos); *a* = futuro ou distância (daqui **a** dois anos).
- **Senão × se não**: “senão” = caso contrário/a não ser; “se não” = se acaso não.
`);

A('port-morfo', `
## 1. Morfossintaxe sem medo
“Morfologia” estuda **o que a palavra é** (classe: substantivo, verbo, pronome...). “Sintaxe” estuda **o papel que ela cumpre na frase** (sujeito, objeto...). A FCC mistura as duas: pergunta, por exemplo, a classe de “que” ou a função de um pronome. O segredo é sempre olhar **o contexto**.

## 2. As classes de palavras em uma tabela
| Classe | Função básica | Exemplo |
|---|---|---|
| Substantivo | nomeia | servidor, segurança |
| Adjetivo | caracteriza o substantivo | rede **segura** |
| Artigo | determina o substantivo | **o**, **uma** |
| Numeral | quantifica/ordena | **dois**, **segundo** |
| Pronome | substitui ou acompanha o nome | **ele**, **este**, **que** |
| Verbo | ação, estado, fenômeno | configurar, estar, chover |
| Advérbio | modifica verbo, adjetivo ou advérbio | **muito** rápido |
| Preposição | liga termos com dependência | **de**, **para**, **com** |
| Conjunção | liga orações | **mas**, **porque** |
| Interjeição | emoção | ufa! |

## 3. A palavra “que”: o coringa da FCC
- **Pronome relativo**: retoma um termo e pode ser trocado por “o qual / a qual”. → “O sistema **que** (o qual) implantamos.”
- **Conjunção integrante**: inicia oração que funciona como substantivo; pode ser trocada por “isso”. → “Sei **que** ele chegou” = “Sei **isso**”.
- **Conjunção causal/explicativa** (= porque): “Saia, **que** vai chover.”
- **Conjunção comparativa**: “Mais rápido **que** o anterior.”
- **Partícula expletiva** (pode ser retirada): “Ele é **que** sabe.”

## 4. Pronomes oblíquos átonos e colocação
Os pronomes **me, te, se, o, a, lhe, nos, vos** podem vir:
- **Antes** do verbo (**próclise**): “Não **me** avisaram.”
- **Depois** (**ênclise**): “Avisaram-**me**.”
- **No meio** (**mesóclise**, só no futuro): “Avisar-**me**-ão.”

### Quando a próclise é obrigatória — as “palavras atrativas”
- **Negativas**: não, nunca, jamais, ninguém, nada.
- **Pronomes relativos**: que, o qual, quem, onde.
- **Pronomes indefinidos**: tudo, alguém, todos, algo.
- **Advérbios** (sem vírgula depois): aqui, já, sempre, ontem.
- **Conjunções subordinativas**: quando, se, porque, embora.
- Frases **interrogativas** e **exclamativas/optativas** (Deus **te** ajude!).

### Proibições
- **Não se inicia frase com pronome oblíquo átono**: “~~Me~~ disseram” → “Disseram-**me**”.
- **Não se usa ênclise com futuro ou particípio**: ~~avisarei-o~~ → **avisá-lo-ei** ou **o avisarei** (se houver atrativo).

## 5. O, A, LHE: objeto direto ou indireto?
- **o, a, os, as** = objeto **direto** (sem preposição): “Encontrei **o técnico**” → “Encontrei-**o**”.
- **lhe, lhes** = objeto **indireto** com ideia de pessoa (= a ele): “Entreguei **ao técnico** o relatório” → “Entreguei-**lhe** o relatório”.
- Depois de verbo terminado em **r, s, z**: o pronome vira **lo, la** (encontrá-**lo**); depois de som nasal: **no, na** (encontraram-**no**).
> [!fcc] Erro clássico: “~~Eu lhe vi~~ ontem.” “Ver” é transitivo direto → “Eu **o** vi”.

## 6. Formação de palavras
| Processo | Como funciona | Exemplo |
|---|---|---|
| **Derivação prefixal** | prefixo + radical | **in**seguro |
| **Derivação sufixal** | radical + sufixo | segura**nça** |
| **Parassintética** | prefixo e sufixo **ao mesmo tempo** (sem um deles a palavra não existe) | **en**tard**ecer**, **a**fe**ar** |
| **Regressiva** | reduz o verbo para formar substantivo | debater → **debate**; atacar → **ataque** |
| **Imprópria** | muda a classe sem mudar a forma | **o** jantar, **o** porquê |
| **Composição por justaposição** | sem perda de sons | guarda-chuva, passatempo |
| **Composição por aglutinação** | com perda de sons | plan(o) + alto = **planalto** |
| **Hibridismo** | elementos de línguas diferentes | auto**móvel** (grego + latim) |
| **Sigla/abreviação** | | TRT, foto |

## 7. Sinonímia, antonímia, homônimos e parônimos
- **Parônimos**: parecidos, sentidos diferentes → **eminente** (ilustre) × **iminente** (prestes a acontecer); **ratificar** (confirmar) × **retificar** (corrigir); **descrição** × **discrição**; **infligir** (aplicar pena) × **infringir** (violar).
- **Homônimos**: mesma pronúncia/escrita, sentidos diferentes → **sessão** (reunião), **seção/secção** (parte), **cessão** (ato de ceder); **concerto** (musical) × **conserto** (reparo).
`);

A('port-concord', `
## 1. Concordância: “quem manda” na frase
Concordar é fazer as palavras **combinarem**. Na **verbal**, o verbo combina com o **sujeito** (número e pessoa). Na **nominal**, adjetivos, artigos, numerais e pronomes combinam com o **substantivo** (gênero e número). Quase todos os erros acontecem quando o sujeito está **longe** do verbo ou **depois** dele.

## 2. Concordância verbal — o método
1. **Ache o verbo.**
2. **Pergunte “quem/o que” + verbo** para achar o sujeito.
3. **Coloque o sujeito antes do verbo** mentalmente e confira.
Ex.: “**Faltam** ainda três etapas do projeto.” → O que falta? “três etapas” → plural ✔.

## 3. Os verbos impessoais (sem sujeito → sempre no singular)
| Verbo | Quando é impessoal | Certo | Errado |
|---|---|---|---|
| **Haver** | = existir, ocorrer, acontecer | **Houve** falhas. **Havia** dúvidas. | ~~Houveram falhas~~ |
| **Haver / Fazer** | tempo decorrido | **Há** anos; **Faz** dois meses | ~~Fazem dois meses~~ |
| **Fazer** | fenômeno climático | **Fez** dias quentes | |
> [!fcc] A impessoalidade **contamina o auxiliar**: “**Deve** haver soluções” (não “devem haver”); “**Vai** fazer dez anos”. Já **existir** é pessoal: “**Existem** soluções”, “**Devem existir** soluções”.

## 4. Casos especiais que caem muito
- **Sujeito posposto** (depois do verbo): o verbo concorda normalmente → “**Chegaram** os novos computadores.”
- **Voz passiva sintética** (verbo + SE + sujeito): “**Vendem-se** casas”; “**Consertam-se** computadores” (casas são vendidas → sujeito plural).
- **Índice de indeterminação do sujeito** (verbo + SE + preposição): verbo no **singular** → “**Precisa-se de** técnicos”; “**Trata-se de** questões”.
- **Núcleos ligados por “ou”**: plural se ambos praticam a ação; singular se há exclusão (“Pedro ou Paulo **será** eleito”).
- **“Um dos que”**: preferencialmente plural → “Foi um dos servidores que mais **trabalharam**.”
- **Porcentagem**: concorda com o número ou com o termo seguinte → “**30% dos servidores aderiram**”; “**1% da turma faltou**”.
- **Coletivo** + especificador: “A maioria dos candidatos **chegou/chegaram**” (ambos aceitos).
- **Verbo ser**: pode concordar com o predicativo → “Tudo **são** flores”; “Hoje **são** 5 de março” (horas e datas).

## 5. Concordância nominal
Regra geral: o adjetivo concorda com o substantivo. Se houver vários substantivos:
- **Adjetivo depois**: concorda com o mais próximo ou vai para o plural → “Sistema e rede **segura/seguros**”.
- **Adjetivo antes**: concorda com o mais próximo → “**Segura** rede e sistema.”

### Palavras que confundem
| Palavra | Regra | Exemplo |
|---|---|---|
| **Meio** | advérbio (= um pouco) → invariável; numeral (= metade) → varia | “Ela está **meio** cansada”; “**meia** hora” |
| **Bastante** | adjetivo (= muitos) → varia; advérbio → invariável | “**Bastantes** erros”; “Estudou **bastante**” |
| **Anexo, incluso, obrigado, mesmo, próprio, quite** | adjetivos → variam | “Seguem **anexas** as planilhas”; “Elas **mesmas**” |
| **Em anexo** | locução → invariável | “Seguem **em anexo** as planilhas” |
| **Menos, alerta** | invariáveis | “**menos** pessoas” |
| **É proibido / é necessário / é bom** | sem artigo → invariável; com artigo → concorda | “É **proibido** entrada”; “É **proibida a** entrada” |

## 6. Regência: a preposição “exigida”
Regência é a relação entre um termo e seu complemento, com ou sem preposição.
| Verbo | Sentido | Regência | Exemplo |
|---|---|---|---|
| **Assistir** | ver | TI (a) | Assisti **ao** jogo |
| **Assistir** | ajudar | TD | O médico assiste **o** paciente |
| **Visar** | objetivar | TI (a) | Visa **ao** bem comum |
| **Visar** | mirar / dar visto | TD | Visou **o** alvo; visou **o** cheque |
| **Aspirar** | desejar | TI (a) | Aspira **ao** cargo |
| **Preferir** | | TD + TI (a) | Prefiro café **a** chá (~~do que~~) |
| **Obedecer / desobedecer** | | TI (a) | Obedeça **às** normas |
| **Implicar** | acarretar | TD | Isso implica **riscos** (sem “em”, pela norma tradicional) |
| **Chegar / ir** | | prep. **a** | Cheguei **ao** Tribunal (~~no Tribunal~~) |
| **Esquecer / lembrar** | | TD ou pronominal + de | Esqueci **o** prazo / Esqueci-**me do** prazo |
| **Pagar / perdoar** | | coisa: TD; pessoa: TI | Paguei **a conta ao** fornecedor |
| **Proceder** | realizar | TI (a) | Procedeu-se **à** análise |

### Regência nominal
**Acessível a**, **apto a/para**, **compatível com**, **contrário a**, **favorável a**, **imune a/de**, **preferível a**, **residente em**, **situado em**.

### Pronome relativo e preposição
A preposição exigida pelo verbo vai **antes** do relativo: “O cargo **a que** aspiro”; “A norma **de que** te falei”; “O sistema **com que** trabalho”. Erro comum: “~~O cargo que aspiro~~”.
`);

A('port-verbos', `
## 1. Por que verbos derrubam candidatos
Os verbos irregulares e os derivados (manter, intervir, propor, reaver...) são **pegadinha garantida** da FCC. A boa notícia: quase todos seguem uma lógica — **o derivado conjuga como o verbo primitivo**.

## 2. A regra de ouro dos derivados
| Primitivo | Derivados | Exemplo (pretérito perfeito / futuro do subjuntivo) |
|---|---|---|
| **Ter** | manter, conter, deter, obter, reter | eu **mantive**; se ele **mantiver** (~~manter~~) |
| **Vir** | intervir, convir, provir | ele **interveio** (~~interviu~~); se ele **intervier** |
| **Pôr** | propor, compor, dispor, supor, repor | eu **propus**; se ele **propuser** (~~propor~~) |
| **Ver** | prever, rever | quando eu **vir**; quando ele **previr** (ver o detalhe abaixo) |
| **Haver** | reaver | eles **reouveram**; **reaver** só tem as formas em que aparece o “v” |
| **Fazer** | desfazer, satisfazer | se ele **satisfizer** |

Esclarecendo a linha do verbo **ver**, que é a que mais confunde:
- Futuro do subjuntivo de **ver**: quando eu **vir**, quando ele **vir**, quando nós **virmos**, quando eles **virem**.
- Futuro do subjuntivo de **vir**: quando eu **vier**, quando ele **vier**, quando eles **vierem**.
- **Prever** segue **ver**: quando eu **previr**, quando eles **previrem**.
> [!fcc] “Quando você **ver** o resultado” está **errado** → “Quando você **vir** o resultado”. “Se ele **vir** amanhã” (no sentido de vir/chegar) está errado → “Se ele **vier** amanhã”.

## 3. Os três modos
- **Indicativo**: certeza (eu **faço**, eu **fiz**, eu **farei**).
- **Subjuntivo**: hipótese, desejo, dúvida (que eu **faça**, se eu **fizesse**, quando eu **fizer**).
- **Imperativo**: ordem, pedido (**faça**, **não faça**).

### Dica para achar o futuro do subjuntivo
Pegue o **pretérito perfeito** na 3ª pessoa do plural, tire o “-ram” e acrescente as terminações: **fize**ram → quando eu **fizer**; **pude**ram → se eu **puder**; **trouxe**ram → se eu **trouxer**; **mantive**ram → se eu **mantiver**.

## 4. Correlação de tempos (frases com “se”)
| Hipótese | Condição | Consequência |
|---|---|---|
| Real/possível no futuro | **se** + futuro do subjuntivo | futuro do presente: “Se o técnico **puder**, **virá**.” |
| Irreal/improvável no presente | **se** + pretérito imperfeito do subjuntivo | futuro do pretérito: “Se o técnico **pudesse**, **viria**.” |
| Irreal no passado | **se** + mais-que-perfeito do subjuntivo | futuro do pretérito composto: “Se **tivesse podido**, **teria vindo**.” |
> [!fcc] Erro comum na redação: “Se o Estado **investisse**, os resultados **serão** melhores” ✘ → “**seriam** melhores”.

## 5. Vozes verbais
- **Ativa**: o sujeito **pratica** a ação → “A equipe **corrigiu** o erro.”
- **Passiva analítica**: o sujeito **sofre** a ação; **ser + particípio** → “O erro **foi corrigido** pela equipe.”
- **Passiva sintética (pronominal)**: verbo transitivo direto + **SE** → “**Corrigiu-se** o erro”; “**Corrigiram-se** os erros”.
- **Reflexiva**: o sujeito pratica e sofre → “O técnico **se feriu**.”

### Como transpor da ativa para a passiva (passo a passo)
1. O **objeto direto** vira **sujeito**.
2. O verbo vira **ser** (no **mesmo tempo** do verbo original) + **particípio** concordando com o novo sujeito.
3. O antigo sujeito vira **agente da passiva** (por/pelo).
Ex.: “O Tribunal **publicará** os editais.” → “Os editais **serão publicados** pelo Tribunal.” (publicará = futuro → serão = futuro)
> [!dica] Só verbos **transitivos diretos** vão para a passiva. “Precisa-se de técnicos” **não** é passiva (é sujeito indeterminado, por isso o verbo fica no singular).

## 6. Particípios duplos
Com **ter/haver** usa-se o regular; com **ser/estar**, o irregular: “Tinha **aceitado**” / “Foi **aceito**”; “Tinha **elegido**” / “Foi **eleito**”; “Tinha **imprimido**” / “Foi **impresso**”. Exceções sempre irregulares: **ganho, gasto, pago** (tinha **pago** e foi **pago**).
`);

A('port-sintaxe', `
## 1. Para que serve a sintaxe na prova
Quase toda questão de **pontuação** e de **reescrita** da FCC depende de você enxergar **como as orações se ligam**. Se você sabe classificar a relação (oposição, causa, concessão...), sabe também qual conectivo pode substituir o outro e onde vai a vírgula.

## 2. Coordenação × subordinação
- **Coordenadas**: orações **independentes** sintaticamente, ligadas por conjunções coordenativas. “O sistema caiu **e** a equipe reagiu.”
- **Subordinadas**: uma oração **depende** da outra, exercendo função dentro dela. “A equipe reagiu **quando o sistema caiu**.”

### Conjunções coordenativas
| Tipo | Ideia | Conjunções |
|---|---|---|
| Aditiva | soma | e, nem, não só... mas também |
| **Adversativa** | oposição | **mas, porém, contudo, todavia, entretanto, no entanto** |
| Alternativa | alternância | ou... ou, ora... ora |
| **Conclusiva** | conclusão | **logo, portanto, por isso, pois (depois do verbo)** |
| Explicativa | justificativa | pois (antes do verbo), porque, que |

### Conjunções subordinativas adverbiais (as mais cobradas)
| Tipo | Ideia | Conjunções |
|---|---|---|
| **Causal** | causa | porque, como (no início), já que, visto que, uma vez que |
| **Concessiva** | “apesar de” | **embora, ainda que, mesmo que, conquanto, se bem que** (+ subjuntivo) |
| Condicional | condição | se, caso, desde que, contanto que, a menos que |
| Consecutiva | consequência | (tão/tanto)... que, de modo que |
| Final | finalidade | para que, a fim de que |
| Temporal | tempo | quando, enquanto, assim que, logo que |
| Proporcional | proporção | à medida que, à proporção que |
| Conformativa | conformidade | conforme, segundo, consoante |
| Comparativa | comparação | como, mais... que |

## 3. Reescrita: como saber se o sentido se mantém
Questão típica: “**Embora** o sistema seja seguro, há riscos.” Pode ser reescrito como...
- “O sistema é seguro, **mas** há riscos.” ✔ (concessão ↔ adversativa: mesma ideia de contraste; repare que muda o modo do verbo: *seja* → *é*).
- “O sistema é seguro, **portanto** há riscos.” ✘ (conclusão: sentido absurdo).
> [!dica] **Concessiva** (embora) e **adversativa** (mas) expressam contraste, mas a concessiva fica na oração que **perde** a discussão: “Embora seja caro, é necessário” = “É caro, **mas** é necessário”.

## 4. Orações adjetivas: restritiva × explicativa (com vírgula muda o sentido!)
- **Restritiva** (sem vírgulas): **delimita** o termo. “Os servidores **que fizeram o curso** foram promovidos.” → **só** os que fizeram.
- **Explicativa** (entre vírgulas): **generaliza**, acrescenta informação sobre **todos**. “Os servidores, **que fizeram o curso**, foram promovidos.” → **todos** fizeram e foram promovidos.

## 5. Pontuação: as regras que resolvem quase tudo
### Nunca use vírgula
- Entre **sujeito e verbo**: ~~Os técnicos aprovados, tomarão posse~~.
- Entre **verbo e complemento**: ~~Informamos aos candidatos, que...~~
- Entre **nome e seu complemento/adjunto** sem intercalação.

### Use vírgula
- Para isolar **adjunto adverbial deslocado** (obrigatória se longo; facultativa se curto): “**No ano passado,** o Tribunal investiu...”
- Para isolar **aposto** e **vocativo**: “O TRT4, **tribunal gaúcho**, ...”; “**Senhor Presidente,** ...”
- Para isolar **orações intercaladas** e **explicativas**.
- Antes de **mas, porém, contudo, pois (explicativo), portanto** (quando ligam orações).
- **Conjunções deslocadas** ficam entre vírgulas: “O sistema, **porém**, falhou.”
- Para indicar **elipse do verbo**: “Eu prefiro Java; ele, Python.” (vírgula no lugar de “prefere”)
- Antes do **“e”**: em regra não, **exceto** quando os sujeitos são **diferentes** (“O Tribunal investiu, e os servidores aprovaram”) ou com valor adversativo.

### Ponto e vírgula, dois-pontos e travessão
- **Ponto e vírgula**: separa itens de enumeração longos; separa orações coordenadas extensas ou que já têm vírgulas; antecede conjunção adversativa deslocada.
- **Dois-pontos**: introduz enumeração, explicação, citação ou consequência.
- **Travessões duplos** podem substituir **vírgulas** ou **parênteses** em intercalações.

## 6. Exemplo resolvido
“A equipe que trabalhou no fim de semana recebeu folga.” → Inserir vírgulas depois de “equipe” e de “semana” **altera o sentido**? **Sim**: a oração passa a ser explicativa e sugere que **a equipe inteira** trabalhou no fim de semana; sem vírgula, distinguia-se **essa** equipe de outras.
`);

A('port-redof', `
## 1. O que é redação oficial e por que ela tem regras próprias
É a forma como o **Poder Público** se comunica: ofícios, despachos, exposições de motivos, e-mails institucionais. A referência obrigatória é o **Manual de Redação da Presidência da República (3ª edição, 2018)**. Como quem escreve é o **Estado** (e não uma pessoa), a linguagem precisa ser **impessoal, formal, clara e padronizada** — o cidadão deve entender, e qualquer servidor deve conseguir redigir do mesmo jeito.

## 2. Atributos da redação oficial (memorize a lista)
- **Clareza e precisão**: uma só interpretação possível. Evite jargões, siglas não explicadas, ambiguidades.
- **Objetividade**: ir direto ao ponto.
- **Concisão**: o máximo de informação com o mínimo de palavras, **sem** cortar o essencial.
- **Coesão e coerência**.
- **Impessoalidade**: quem comunica é o órgão; evitam-se impressões pessoais.
- **Formalidade e padronização**: uso da **norma-padrão**, formas de tratamento corretas, diagramação uniforme.
> [!fcc] “Rebuscamento”, “prolixidade” e “uso de jargão para demonstrar erudição” **não** são atributos — são **vícios**.

## 3. Pronomes de tratamento — como usar
**Regra de concordância (a mais cobrada)**: os pronomes de tratamento levam o verbo e os possessivos para a **3ª pessoa**, embora se refiram à 2ª.
- “Vossa Excelência **conhece** **seu** projeto” (~~conheceis vosso~~).
- Adjetivos concordam com o **sexo da pessoa**: “Vossa Excelência está **preocupado**” (se for homem).
- **Vossa** = falando **com** a autoridade; **Sua** = falando **sobre** ela: “**Sua** Excelência o Presidente informou...”

| Autoridade | Tratamento | Vocativo |
|---|---|---|
| Presidente da República, do Congresso e do STF (chefes de Poder) | Vossa Excelência | **Excelentíssimo Senhor** + cargo |
| Ministros, deputados, senadores, **juízes, desembargadores**, governadores, prefeitos | Vossa Excelência | **Senhor** + cargo (ex.: Senhor Desembargador) |
| Demais autoridades e particulares | **Vossa Senhoria** (ou “o senhor”) | Senhor + cargo/nome |
| Reitores | Vossa Magnificência | Magnífico Reitor |
| Papa / cardeais | Vossa Santidade / Vossa Eminência | |
> [!dica] A 3ª edição **aboliu**: “Digníssimo” (DD.), “Ilustríssimo” (Ilmo.) e o uso de “doutor” como tratamento genérico (doutor é **título acadêmico**).

## 4. O padrão ofício
A 3ª edição **unificou** aviso, memorando e ofício em um único formato, o **padrão ofício**, com a denominação **“ofício”**.
Estrutura:
1. **Cabeçalho**: brasão/nome do órgão.
2. **Identificação**: tipo e número do expediente, ano e sigla do órgão (ex.: OFÍCIO Nº 123/2026/SETIC/TRT4).
3. **Local e data**, por extenso, alinhados à **direita** (Porto Alegre, 2 de novembro de 2026.)
4. **Endereçamento** (destinatário: tratamento, nome, cargo, endereço).
5. **Assunto**: resumo do tema, em negrito.
6. **Texto**: introdução (sem “Tenho a honra de”, “Venho por meio deste”), desenvolvimento e conclusão. Parágrafos numerados, exceto o primeiro e o fecho, quando houver mais de um assunto.
7. **Fecho**:
   - **Respeitosamente**: para autoridades de hierarquia **superior**.
   - **Atenciosamente**: para autoridades de **mesma hierarquia ou inferior**.
8. **Assinatura**: nome e cargo do signatário (sem linha para assinatura nos documentos digitais).
9. Numeração de páginas a partir da segunda.

## 5. Outros documentos
- **Exposição de motivos**: dirigida ao **Presidente da República** por ministro, para propor medidas ou atos normativos.
- **Mensagem**: comunicação do **Presidente da República** com o **Congresso Nacional**.
- **Correio eletrônico**: aceito como documento oficial; deve ter **assunto** claro, tratamento formal e, quando necessário, **confirmação de recebimento**; valor documental pleno exige **certificação digital** (ICP-Brasil).

## 6. Exemplo resolvido
Ofício do Diretor da Secretaria de TI do TRT4 ao **Presidente do TRT4** (desembargador, hierarquia superior):
- Vocativo: **Senhor Presidente,**
- Tratamento no texto: **Vossa Excelência**
- Fecho: **Respeitosamente,**
`);

/* ============================ MATEMÁTICA E RACIOCÍNIO LÓGICO ============================ */
A('mat-logica', `
## 1. O que é uma proposição
Proposição é uma **frase declarativa** que pode ser classificada como **verdadeira (V)** ou **falsa (F)** — nunca as duas coisas.
- ✔ “O TRT4 fica em Porto Alegre.” (é proposição)
- ✘ “Que horas são?” (pergunta), “Estude!” (ordem), “x + 2 = 5” (sentença aberta: depende de x), “Esta frase é falsa” (paradoxo).

## 2. Os conectivos e suas tabelas-verdade
Pense em cada conectivo como uma **promessa**: a pergunta é “quando essa promessa é quebrada (F)?”.
| Conectivo | Símbolo | Leitura | É **F** somente quando... |
|---|---|---|---|
| Negação | ~p | não p | p é V |
| Conjunção | p ∧ q | p **e** q | **alguma** for F (só é V se as duas forem V) |
| Disjunção inclusiva | p ∨ q | p **ou** q | **as duas** forem F |
| Disjunção exclusiva | p ⊻ q | **ou** p **ou** q | as duas tiverem o **mesmo** valor |
| **Condicional** | p → q | **se** p, **então** q | **p for V e q for F** (a famosa “Vera Fischer”: V → F = F) |
| Bicondicional | p ↔ q | p **se e somente se** q | os valores forem **diferentes** |

### Entendendo a condicional com uma promessa
“**Se** chover, **então** eu levo guarda-chuva.” Quando eu menti? **Só** se choveu (V) e eu **não** levei (F). Se não choveu, não importa o que eu fiz: a promessa não foi quebrada (V).

## 3. Negações — a parte que mais cai
| Proposição | Negação |
|---|---|
| p **e** q | **~p ou ~q** (De Morgan) |
| p **ou** q | **~p e ~q** (De Morgan) |
| **Se** p, então q | **p e ~q** (mantém o primeiro E nega o segundo) |
| p se e somente se q | ou p ou q (disjunção exclusiva) |
| **Todo** A é B | **Algum** A **não** é B |
| **Nenhum** A é B | **Algum** A é B |
| **Algum** A é B | **Nenhum** A é B |
> [!fcc] A negação de “**Todos** os servidores votaram” **não** é “Nenhum servidor votou”. Basta **um** que não votou para a frase ser falsa: “**Algum** servidor **não** votou”.

## 4. Equivalências da condicional
Duas formas equivalentes a **p → q** que você precisa reconhecer de olhos fechados:
1. **Contrapositiva**: **~q → ~p** (“inverte e nega”). “Se chove, levo guarda-chuva” ≡ “Se não levo guarda-chuva, não chove”.
2. **~p ∨ q** (“nega o primeiro **ou** mantém o segundo”). ≡ “Não chove **ou** levo guarda-chuva”.
> [!fcc] **Não** são equivalentes: a **recíproca** (q → p) e a **inversa** (~p → ~q). A FCC coloca essas duas como alternativas erradas quase sempre.

## 5. Tautologia, contradição e contingência
- **Tautologia**: sempre V (ex.: p ∨ ~p).
- **Contradição**: sempre F (ex.: p ∧ ~p).
- **Contingência**: depende dos valores.
Número de linhas de uma tabela-verdade = **2ⁿ** (n = número de proposições simples). Com 3 proposições: 8 linhas.

## 6. Argumentação: como resolver “o que se conclui”
**Método prático (para argumentos com premissas verdadeiras)**:
1. Comece pela premissa **simples** (sem conectivo) ou pela conjunção (“e”) — elas dão valor certo.
2. Use esse valor nas outras premissas, que precisam ser **todas verdadeiras**.
3. Vá descobrindo os valores em cadeia.

Ferramentas:
- **Modus ponens**: p → q; p; logo **q**.
- **Modus tollens**: p → q; ~q; logo **~p**.
- **Silogismo hipotético**: p → q; q → r; logo **p → r**.
- **Silogismo disjuntivo**: p ∨ q; ~p; logo **q**.
- **Falácias** (não valem!): afirmar o consequente (p → q; q; logo p) e negar o antecedente (p → q; ~p; logo ~q).

## 7. Exemplo resolvido
Premissas (todas V): (1) Se Ana estuda, Bia trabalha. (2) Se Bia trabalha, Caio viaja. (3) Caio não viaja.
- (3) Caio não viaja = V → “Caio viaja” é F.
- Em (2), q = F; para a condicional ser V, p deve ser F → **Bia não trabalha**.
- Em (1), q = F → **Ana não estuda**.
Conclusão: **Ana não estuda e Bia não trabalha**.

## 8. Diagramas lógicos (quantificadores)
Desenhe conjuntos: “Todo A é B” → A dentro de B. “Algum A é B” → interseção não vazia. “Nenhum A é B” → conjuntos separados. Para testar uma conclusão, procure **um desenho** que satisfaça as premissas e **contrarie** a conclusão: se existir, a conclusão **não** é necessária.
`);

A('mat-rl', `
## 1. O que é “raciocínio lógico” na FCC
São problemas que não exigem fórmulas, mas **organização**: descobrir quem é quem (associações), qual o próximo termo (sequências), quem fica à direita de quem (posições), quem está mentindo (verdades e mentiras). O segredo é **transformar o texto em uma tabela ou desenho**.

## 2. Associações lógicas: a tabela salva vidas
**Método**:
1. Monte uma tabela com as pessoas nas linhas e as características nas colunas.
2. Marque **X** onde é impossível e **✔** onde é certo.
3. Cada ✔ elimina a linha e a coluna inteiras.
4. Comece pelas informações **mais restritivas** (“Ana não é de redes **nem** de segurança”).

Exemplo: Davi, Elisa e Fábio trabalham em redes, desenvolvimento e segurança.
- Elisa não é de redes nem de segurança → **Elisa = desenvolvimento**.
- Davi não é de redes → como desenvolvimento já está ocupado, **Davi = segurança**.
- Sobra **Fábio = redes**.

## 3. Sequências
Procure um padrão nesta ordem:
1. **Diferença** entre termos consecutivos (PA): 3, 7, 11, 15 → +4.
2. **Razão** (PG): 2, 6, 18, 54 → ×3.
3. **Diferenças das diferenças**: 1, 2, 4, 7, 11 → diferenças 1, 2, 3, 4.
4. **Sequências intercaladas**: 1, 10, 2, 20, 3, 30 → duas sequências misturadas.
5. **Recursivas** (Fibonacci): cada termo = soma dos dois anteriores.
6. **Letras**: converta em posição no alfabeto (A=1, B=2...). Atenção: pergunte se o alfabeto tem 23 ou 26 letras (K, W e Y).
7. **Ciclos**: se um padrão se repete a cada n termos, o termo de posição p é o mesmo da posição **resto de p ÷ n**. Ex.: dias da semana (ciclo de 7): 100 dias depois de uma segunda → 100 ÷ 7 = 14 resto **2** → **quarta-feira**.

### Fórmulas úteis (PA e PG)
- PA: aₙ = a₁ + (n − 1) × r; soma Sₙ = (a₁ + aₙ) × n ÷ 2.
- PG: aₙ = a₁ × qⁿ⁻¹.

## 4. Verdades e mentiras
Técnica da **hipótese**: suponha que uma pessoa diz a verdade e veja se gera contradição. Se gerar, ela mente.
Dica: procure duas pessoas que dizem coisas **contraditórias** (uma nega a outra) — exatamente **uma** delas mente. Isso costuma destravar o problema.

## 5. Posições e orientação espacial
- Desenhe! Mesas redondas: fixe **uma** pessoa e posicione as demais em relação a ela.
- Lembre que “à direita de quem está sentado de frente para o centro” muda conforme a orientação.
- **Rosa dos ventos**: girar 90° no sentido horário a partir do Norte leva ao Leste; 180° ao Sul.

## 6. Relações de parentesco e ordenação
Transforme em “maior que”: “Ana é mais alta que Bia e mais baixa que Carla” → **Carla > Ana > Bia**. Encadeie todas as informações numa única linha.

## 7. Princípio da casa dos pombos
Se há **n** gavetas e **n + 1** objetos, pelo menos uma gaveta terá 2 objetos. Pergunta típica: “Quantas pessoas, **no mínimo**, para garantir que duas façam aniversário no mesmo mês?” → 12 meses + 1 = **13**. Para garantir **3** no mesmo mês: 2 × 12 + 1 = **25**.

## 8. Exemplo resolvido (sequência recursiva)
Cada termo, a partir do 3º, é a soma dos dois anteriores; a₅ = 19 e a₆ = 31. Ache a₂.
- a₄ = a₆ − a₅ = 12; a₃ = a₅ − a₄ = 7; a₂ = a₄ − a₃ = **5**.
`);

A('mat-aritm', `
## 1. Números: o que você precisa dominar
**Naturais** (0, 1, 2...), **inteiros** (inclui negativos), **racionais** (podem ser escritos como fração: 0,5 = 1/2; 0,333... = 1/3) e **irracionais** (dízimas não periódicas: √2, π). A FCC cobra muito **frações**, **MMC/MDC** e **problemas do cotidiano**.

## 2. Frações sem sofrimento
- **Somar/subtrair**: iguale os denominadores (MMC). 1/4 + 1/6 → MMC(4,6)=12 → 3/12 + 2/12 = **5/12**.
- **Multiplicar**: numerador × numerador, denominador × denominador.
- **Dividir**: conserva a primeira e **multiplica pelo inverso** da segunda.
- **“Fração de fração”**: “2/3 de 3/4 do total” = 2/3 × 3/4 = **1/2** do total.

### Problema clássico de frações
“Gastei 1/3 do salário no aluguel e 1/4 do **restante** em alimentação. Sobraram R$ 3.000. Qual o salário?”
- Depois do aluguel, restam **2/3**.
- Alimentação = 1/4 de 2/3 = 2/12 = **1/6**.
- Gastos totais = 1/3 + 1/6 = 1/2 → sobra **1/2** = 3.000 → salário = **R$ 6.000**.
> [!fcc] Repare na palavra **“restante”**: a fração incide sobre o que sobrou, não sobre o total. É a pegadinha mais comum.

## 3. Divisibilidade (para fatorar rápido)
Divisível por **2**: par. **3**: soma dos algarismos divisível por 3. **4**: dois últimos algarismos divisíveis por 4. **5**: termina em 0 ou 5. **6**: por 2 e por 3. **9**: soma dos algarismos divisível por 9. **10**: termina em 0.

## 4. MMC e MDC — como saber qual usar
| Use | Quando o problema pede... | Palavras-chave |
|---|---|---|
| **MMC** (mínimo múltiplo comum) | quando os eventos **voltarão a coincidir** | “novamente juntos”, “ao mesmo tempo”, “próxima vez” |
| **MDC** (máximo divisor comum) | **dividir** em partes iguais, do **maior tamanho possível**, sem sobra | “maior possível”, “sem sobras”, “pedaços iguais” |

### Como calcular (fatoração simultânea)
Divida os números ao mesmo tempo pelos primos (2, 3, 5...).
- **MMC**: multiplique **todos** os primos usados.
- **MDC**: multiplique **apenas** os primos que dividiram **todos** os números ao mesmo tempo.

Ex.: 84 e 126 → 84 = 2² × 3 × 7; 126 = 2 × 3² × 7.
- MDC = 2 × 3 × 7 = **42** (menores expoentes dos fatores comuns).
- MMC = 2² × 3² × 7 = **252** (maiores expoentes de todos os fatores).
Propriedade útil: **MMC × MDC = produto dos dois números** (84 × 126 = 252 × 42).

## 5. Exemplos resolvidos
**MMC**: Três backups rodam a cada 6, 8 e 15 horas; rodaram juntos à 0h de segunda. Quando coincidem de novo?
- MMC(6, 8, 15) = 2³ × 3 × 5 = **120 h = 5 dias** → **sexta-feira à 0h**.

**MDC**: 84 notebooks e 126 monitores em kits idênticos, com o **maior número de kits** e sem sobra.
- MDC = **42 kits**, cada um com 84/42 = **2 notebooks** e 126/42 = **3 monitores**.
> [!dica] Cuidado: “o maior número de kits” → MDC dá o **número de kits**; “o maior tamanho de cada pedaço” → MDC dá o **tamanho**. Leia o que se pede.

## 6. Operações com decimais e potências
- Multiplicar por 10, 100, 1000: anda a vírgula para a **direita**.
- Potências: aᵐ × aⁿ = aᵐ⁺ⁿ; aᵐ ÷ aⁿ = aᵐ⁻ⁿ; (aᵐ)ⁿ = aᵐˣⁿ; a⁰ = 1; a⁻ⁿ = 1/aⁿ.
- **Notação de bytes** (cai em TI!): 1 KB = 2¹⁰ = 1024 bytes (em base binária); 1 MB = 2²⁰; 1 GB = 2³⁰.
`);

A('mat-prop', `
## 1. Razão e proporção: a base de tudo
**Razão** é uma divisão que compara duas grandezas: “3 servidores para cada 2 estagiários” = 3/2.
**Proporção** é a igualdade entre duas razões: 3/2 = 6/4. Propriedade fundamental: **produto dos meios = produto dos extremos** (3 × 4 = 2 × 6).

## 2. Grandezas diretamente e inversamente proporcionais
- **Diretamente proporcionais**: uma aumenta, a outra aumenta **na mesma proporção** (mais horas de trabalho → mais processos digitalizados).
- **Inversamente proporcionais**: uma aumenta, a outra **diminui** na mesma proporção (mais servidores → **menos dias** para terminar).

### Divisão proporcional
Dividir R$ 9.000 em partes proporcionais a 2, 3 e 4:
- Soma dos pesos = 9 → cada “parte” vale 9.000 ÷ 9 = 1.000 → **2.000, 3.000 e 4.000**.
Se for **inversamente** proporcional a 2, 3 e 4, use os **inversos** (1/2, 1/3, 1/4) como pesos (multiplique todos por 12 → 6, 4, 3).
Se for **diretamente** a uma grandeza e **inversamente** a outra, o peso é **(direta) ÷ (inversa)**.

## 3. Regra de três simples
1. Monte a tabela com as grandezas.
2. Decida se é **direta** (setas no mesmo sentido) ou **inversa** (inverta uma coluna).
3. Multiplique cruzado.
Ex.: 5 servidores fazem um trabalho em 12 dias. Em quantos dias 6 servidores fazem? Inversa → 5 × 12 = 6 × x → **x = 10 dias**.

## 4. Regra de três composta — o método “do produto constante”
Para problemas de **trabalho**, pense em **homens-hora** (ou “máquinas-dia”): o total de trabalho é fixo.
Ex.: 4 servidores, 6 h/dia, 15 dias. Quantos dias para 6 servidores, 5 h/dia?
- Trabalho total = 4 × 6 × 15 = **360 servidores-hora**.
- Novo ritmo = 6 × 5 = 30 por dia → 360 ÷ 30 = **12 dias**.
Se a **quantidade de trabalho** mudar (ex.: o dobro de processos), multiplique o total pela nova quantidade.

## 5. Porcentagem: o “fator multiplicativo”
Nunca some porcentagens sucessivas! Use **fatores**:
- Aumento de x% → multiplique por **(1 + x/100)**. +20% → **1,20**.
- Desconto de x% → multiplique por **(1 − x/100)**. −20% → **0,80**.
- Aumentos/descontos **sucessivos** → **multiplique** os fatores.

Ex.: +20% e depois −20% → 1,20 × 0,80 = **0,96** → o preço final é **4% menor** (e não igual!).
Ex.: dois aumentos de 10% → 1,1 × 1,1 = 1,21 → **+21%** (e não 20%).

### Variação percentual
**Variação = (valor final − valor inicial) ÷ valor inicial**. De 80 para 100: 20/80 = **25%** de aumento. De 100 para 80: 20/100 = **20%** de queda.
> [!fcc] “Quanto por cento A é maior que B?” → divida pela **base B**.

## 6. Juros (noções)
- **Simples**: J = C × i × t (juros sempre sobre o capital inicial; cresce em linha reta).
- **Compostos**: M = C × (1 + i)ᵗ (juros sobre juros; cresce exponencialmente).
Taxa e tempo devem estar na **mesma unidade** (mensal com meses).

## 7. Exemplo resolvido completo
Gratificação de R$ 9.000 dividida **diretamente** ao número de chamados (40, 60, 80) e **inversamente** ao número de integrantes (2, 3, 2).
- Pesos: 40/2 = 20; 60/3 = 20; 80/2 = 40 → soma **80**.
- Cada unidade de peso = 9.000 ÷ 80 = 112,50.
- Equipes: **2.250**, **2.250** e **4.500**.
`);

A('mat-estat', `
## 1. Para que serve a estatística descritiva
Resumir muitos dados em poucos números que “contam a história”: **onde os dados se concentram** (média, mediana, moda) e **o quanto se espalham** (amplitude, variância, desvio-padrão).

## 2. Medidas de tendência central
| Medida | Como calcular | Quando é útil |
|---|---|---|
| **Média aritmética** | soma ÷ quantidade | dados sem valores extremos |
| **Média ponderada** | Σ(valor × peso) ÷ Σ pesos | notas com pesos (como a da sua prova!) |
| **Mediana** | valor central dos dados **ordenados** | quando há valores extremos (salários) |
| **Moda** | valor mais frequente | dados categóricos (cor, setor) |

### Mediana passo a passo
1. **Ordene** os dados (passo que muitos esquecem!).
2. Quantidade ímpar → é o termo do meio, na posição (n + 1)/2.
3. Quantidade par → **média dos dois centrais**.
Ex.: 12, 8, 15, 8, 20, 10, 11 → ordenados: 8, 8, 10, **11**, 12, 15, 20 → mediana = **11**; média = 84/7 = **12**; moda = **8**.

### A média do seu concurso (média ponderada)
Nota objetiva = (Gerais × 1 + Específicos × 2) ÷ 3.
Ex.: Gerais 6,0 e Específicos 8,0 → (6 + 16) ÷ 3 = **7,33**. Repare: Específicos pesam o **dobro**.

### Propriedades da média (caem muito)
- Somando uma constante a todos os valores, a média **soma** a constante.
- Multiplicando todos por uma constante, a média é **multiplicada**.
- Valores extremos **puxam** a média; a mediana é mais **resistente**.

## 3. Medidas de dispersão
- **Amplitude** = maior − menor.
- **Variância** = média dos quadrados dos desvios em relação à média.
- **Desvio-padrão** = **raiz quadrada da variância** (volta à unidade original dos dados).
- **Coeficiente de variação** = desvio-padrão ÷ média (permite comparar dispersões de grupos diferentes).
Propriedades: somar uma constante **não altera** variância nem desvio-padrão; multiplicar por k multiplica o desvio por k e a variância por k².

## 4. Probabilidade básica
**P = casos favoráveis ÷ casos possíveis**.
- Evento complementar: **P(não A) = 1 − P(A)**.
- Eventos independentes, “**e**”: **multiplica** (P(A e B) = P(A) × P(B)).
- Eventos mutuamente exclusivos, “**ou**”: **soma**.
Ex.: 5 tokens azuis, 3 vermelhos, 2 verdes. P(não vermelho) = 1 − 3/10 = **70%**.

## 5. Leitura de gráficos e tabelas
- **Colunas/barras**: comparar categorias.
- **Linhas**: evolução no tempo.
- **Setores (pizza)**: partes de um todo (360° = 100%; 1% = 3,6°).
- **Histograma**: distribuição de frequências em classes.
> [!fcc] Cuidado com eixos que não começam em zero (exageram diferenças) e com porcentagens de bases diferentes: “a região A cresceu 50%” pode ser menos, em número absoluto, do que “a região B cresceu 10%”.

## 6. Frequências
- **Absoluta**: quantas vezes aparece.
- **Relativa**: absoluta ÷ total (em %).
- **Acumulada**: soma das frequências até aquela classe — útil para achar a mediana em tabelas.
`);

/* ============================ LEGISLAÇÃO ============================ */
A('leg-sust', `
## 1. Por que sustentabilidade cai num concurso de TI?
Porque o Judiciário consome muito papel, energia, equipamentos de TI e serviços terceirizados. O **CNJ** criou uma política para que cada tribunal planeje e **meça** como reduz impactos e gastos — e o edital cobra a **Resolução CNJ nº 400/2021**. Para quem trabalha com TI, o tema aparece em decisões como **descarte de equipamentos**, **eficiência energética do datacenter**, **virtualização** e **processo eletrônico** (que eliminou toneladas de papel).

## 2. A ideia central da Res. 400/2021
Ela institui a **política de sustentabilidade** no Poder Judiciário, considerando as três dimensões do desenvolvimento sustentável — **ambiental, social e econômica** — e exige **planejamento, metas e indicadores**. Não basta “ser verde”: é preciso **planejar, executar, medir e prestar contas**.

## 3. Os instrumentos que você precisa conhecer
- **Plano de Logística Sustentável (PLS)**: o principal instrumento. É um **plano de gestão** vinculado ao **planejamento estratégico** do tribunal, com **objetivos, metas, indicadores, ações, responsáveis e prazos** para práticas de sustentabilidade, racionalização e qualidade.
- **Unidade/Núcleo socioambiental**: estrutura que coordena a política no tribunal.
- **Comissão gestora do PLS**: elabora, monitora e revisa o plano.
- **Relatórios de desempenho** e o **Balanço da Sustentabilidade** do CNJ: os dados dos tribunais são enviados ao CNJ, que publica e compara resultados (com um índice de desempenho de sustentabilidade).

## 4. Temas típicos de um PLS
| Tema | Exemplos de ação |
|---|---|
| Papel e impressão | processo eletrônico, impressão frente e verso, redução de impressoras |
| Energia | iluminação LED, ar-condicionado eficiente, **virtualização de servidores**, energia solar |
| Água | torneiras automáticas, reúso |
| Resíduos | coleta seletiva, **descarte correto de eletrônicos (logística reversa)** |
| Contratações | **critérios de sustentabilidade** nos editais (Lei 14.133/2021) |
| Qualidade de vida | saúde do servidor, acessibilidade, inclusão |
| Deslocamentos | teletrabalho, videoconferências |

## 5. Ligação com as contratações públicas
A **Lei 14.133/2021** traz o **desenvolvimento nacional sustentável** como **princípio** (art. 5º) e **objetivo** da licitação (art. 11), e manda considerar o **ciclo de vida** do objeto — ou seja, o “mais barato na compra” pode não ser a **proposta mais vantajosa** se gastar muita energia ou gerar resíduo caro de descartar. Também admite exigir **logística reversa** e critérios ambientais.

## 6. Como a FCC cobra
- “O instrumento que estabelece metas, indicadores e ações é o...” → **PLS**.
- “A política considera apenas a dimensão ambiental” → **errado** (também social e econômica).
- “Critérios de sustentabilidade são vedados quando o critério é menor preço” → **errado**.
> [!lei] Leia o texto consolidado da Res. CNJ 400/2021 no portal de atos do CNJ: o edital pode cobrar artigos específicos (prazos de revisão do PLS, composição da comissão, indicadores mínimos).
`);

A('leg-assedio', `
## 1. O problema
Assédio e discriminação adoecem pessoas, destroem equipes e geram responsabilidade para a instituição. O CNJ (para todo o Judiciário) e o **CSJT** (para a Justiça do Trabalho) criaram políticas para **prevenir, acolher, apurar e punir**. Você vai encontrar: **Resolução CNJ nº 351/2020** e **Resolução CSJT nº 360/2023**.

## 2. Conceitos — entenda as diferenças
- **Assédio moral**: **conduta abusiva e reiterada** (gestos, palavras, comportamentos, omissões) que **atenta contra a dignidade** da pessoa e degrada o ambiente de trabalho. Ex.: humilhar em público, isolar, sobrecarregar ou esvaziar propositalmente as tarefas, espalhar boatos.
  - **Vertical descendente**: chefe → subordinado (o mais comum).
  - **Vertical ascendente**: subordinados → chefe.
  - **Horizontal**: entre colegas do mesmo nível.
  - **Organizacional**: práticas de gestão abusivas como política (metas inalcançáveis, controle excessivo).
- **Assédio sexual**: conduta de **conotação sexual** indesejada (palavras, gestos, contato físico, chantagem) que constrange a pessoa. Na política do CNJ, **independe de hierarquia** — pode vir de colega, chefe ou subordinado. (No Código Penal, o crime do art. 216-A exige superioridade hierárquica, mas a política administrativa é **mais ampla**.)
- **Discriminação**: distinção, exclusão ou preferência baseada em **raça, cor, sexo, gênero, orientação sexual, idade, deficiência, religião, origem**, entre outras, que prejudica a igualdade.
> [!dica] Diferencie **assédio** de **conflito pontual** ou de **cobrança legítima**: uma cobrança respeitosa por resultados não é assédio; humilhações reiteradas são.

## 3. A quem se aplica
A **magistrados, servidores, estagiários, terceirizados, aprendizes, voluntários** e a quem se relaciona com o tribunal. A política protege **todas** as pessoas que trabalham ali, não só os servidores efetivos.

## 4. Como a política funciona (estrutura)
- **Comissão de Prevenção e Enfrentamento do Assédio e da Discriminação** em cada tribunal: promove ações educativas, acompanha casos, propõe melhorias.
- **Canais de acolhimento e escuta**: a vítima (ou **qualquer pessoa** que presencie) pode relatar, com **sigilo**, sem ser obrigada a seguir para processo formal de imediato.
- **Acolhimento humanizado**, apoio psicológico e medidas de proteção (como mudança de lotação, se a vítima quiser).
- **Vedação de retaliação** contra quem denuncia ou testemunha.
- **Apuração** pelas vias disciplinares próprias (sindicância, PAD), com contraditório.
- **Prevenção**: capacitações, campanhas, inclusão do tema na formação de gestores, pesquisas de clima.

## 5. Res. CSJT 360/2023
Adapta e aprofunda a política na **Justiça do Trabalho** (TST, CSJT e TRTs), alinhada à Res. CNJ 351/2020 e ao trabalho decente (incluindo diretrizes da **Convenção 190 da OIT** sobre violência e assédio no mundo do trabalho). Reforça a **prevenção**, a **escuta qualificada** e o fluxo de tratamento das notícias de assédio nos tribunais trabalhistas.

## 6. Pegadinhas
- “Assédio moral só ocorre de chefe para subordinado” → **errado**.
- “O assédio sexual, para a política, exige hierarquia” → **errado**.
- “Somente a vítima pode noticiar” → **errado** (testemunhas e terceiros também).
- “A política não abrange terceirizados” → **errado**.
> [!lei] Leia os textos das Res. CNJ 351/2020 e CSJT 360/2023: a FCC pode cobrar a literalidade das definições.
`);

A('leg-conduta', `
## 1. Para que serve um código de conduta
Ele traduz os **valores** da instituição em **comportamentos esperados** do dia a dia: como tratar o público, como usar recursos públicos, como evitar conflitos de interesses. Não é uma lei penal: é um guia ético cujo descumprimento pode gerar orientação, apuração e, se também violar a lei, responsabilização disciplinar.

> [!lei] O texto do **Código de Conduta e Valores Éticos do TRT4** é documento interno, publicado no portal do Tribunal. Leia-o na íntegra: a FCC pode cobrar a redação literal. Abaixo estão os princípios e regras que esses códigos sempre trazem, com base na Constituição e na Lei 8.112/1990.

## 2. Princípios que fundamentam a conduta
- Os do **art. 37 da Constituição**: **Legalidade, Impessoalidade, Moralidade, Publicidade e Eficiência** (memorize: **LIMPE**).
- **Integridade, transparência, probidade, urbanidade, respeito à diversidade, sustentabilidade, responsabilidade**.

## 3. Deveres típicos (o que se deve fazer)
- Tratar com **urbanidade** colegas e cidadãos.
- **Zelar pelo patrimônio público** e pela economia de recursos.
- Guardar **sigilo** sobre assuntos da repartição e proteger dados pessoais.
- **Representar contra ilegalidade, omissão ou abuso de poder** e levar irregularidades ao conhecimento da autoridade.
- Ser **assíduo e pontual**, manter conduta compatível com a moralidade administrativa.
- Atualizar-se profissionalmente.

## 4. Vedações típicas (o que não se pode fazer)
- Usar o **cargo** ou **informações privilegiadas** para obter vantagem para si ou para outros.
- Receber **presentes, vantagens ou favores** que possam influenciar decisões (os códigos normalmente admitem apenas brindes sem valor comercial ou de valor simbólico, distribuídos de forma generalizada).
- Usar **recursos públicos** (computadores, e-mail, veículos, tempo de trabalho) para fins particulares.
- Discriminar, assediar, tratar com desrespeito.
- Atuar em situação de **conflito de interesses** (ex.: participar de contratação em que um parente é interessado).
- Manifestar-se em nome da instituição sem autorização ou divulgar informação sigilosa.

## 5. Lei 8.112/1990 — o que mais aparece junto
- **Art. 116 (deveres)**: zelo, lealdade, cumprir ordens **não manifestamente ilegais**, atender com presteza, levar irregularidades ao conhecimento da autoridade, guardar sigilo, assiduidade e pontualidade, urbanidade, representar contra ilegalidade.
- **Art. 117 (proibições)**: ausentar-se sem autorização; retirar documentos sem anuência; recusar fé a documentos públicos; **valer-se do cargo** para proveito pessoal; **participar de gerência de sociedade privada** ou exercer comércio (exceto como acionista, cotista ou comanditário); receber propina ou presentes em razão das atribuições; usar pessoal ou recursos da repartição em atividade particular; manter sob chefia imediata cônjuge, companheiro ou parente até o 2º grau (nepotismo).

## 6. Conflito de interesses (Lei 12.813/2013, por analogia)
Ocorre quando um **interesse privado** pode comprometer o **interesse público** ou influenciar o desempenho da função. Exemplo em TI: o servidor que participa do planejamento de uma contratação de software em que a empresa de um familiar vai concorrer deve **declarar-se impedido**.

## 7. Como a FCC cobra
Situações práticas: “Servidor usa o e-mail institucional para vender produtos” → vedado; “Servidor recebe um caneta-brinde distribuída a todos os participantes de evento” → em regra admitido; “Servidor comunica irregularidade ao superior” → dever.
`);

A('leg-regimento', `
## 1. O que é o Regimento Interno
É a “lei interna” do Tribunal: define a **composição**, os **órgãos** (Tribunal Pleno, Órgão Especial, Seções Especializadas, Turmas), as **competências** de cada um, os **cargos de direção** (Presidente, Vice-Presidente, Corregedor) e o **funcionamento** (sessões, distribuição de processos, eleições). Ele se apoia na **Constituição Federal** e na **CLT**.

> [!lei] O texto do **Regimento Interno do TRT4** é publicado no portal do Tribunal e é atualizado por emendas regimentais. O edital pode cobrar artigos específicos (número de desembargadores, composição das Turmas, competências da Presidência). Leia a versão vigente. Abaixo, o que vem da **Constituição** e vale para qualquer TRT.

## 2. A Justiça do Trabalho na Constituição (arts. 111 a 116)
- **Órgãos** (art. 111): **TST**, **Tribunais Regionais do Trabalho** e **Juízes do Trabalho**.
- **TRTs** (art. 115): compõem-se de, **no mínimo, 7 juízes** (desembargadores), recrutados, quando possível, na respectiva região, **nomeados pelo Presidente da República** entre brasileiros com **mais de 30 e menos de 70 anos**:
  - **1/5 (quinto constitucional)** entre **advogados** com mais de 10 anos de atividade e **membros do Ministério Público do Trabalho** com mais de 10 anos de exercício;
  - os demais, por **promoção de juízes do trabalho** por **antiguidade e merecimento**, alternadamente.
- Os TRTs podem funcionar **descentralizadamente**, com **Câmaras regionais**, e instalar a **justiça itinerante**.
- **Varas do Trabalho** (art. 116): jurisdição exercida por **juiz singular**.
- **Competência** (art. 114, após a EC 45/2004): ações oriundas da **relação de trabalho**, inclusive entes de direito público externo e administração direta e indireta; ações sobre **greve**; **representação sindical**; mandados de segurança, habeas corpus e habeas data quando o ato envolver matéria trabalhista; **danos morais e patrimoniais** decorrentes da relação de trabalho; **penalidades administrativas** impostas pelos órgãos de fiscalização; execução de ofício das **contribuições sociais** decorrentes das sentenças.

## 3. O TRT4
- Sede em **Porto Alegre**; jurisdição sobre **todo o Rio Grande do Sul**.
- É um dos maiores TRTs do país, com dezenas de desembargadores e Varas do Trabalho espalhadas por todo o estado.
- Órgãos típicos de um TRT de grande porte: **Tribunal Pleno** (todos os desembargadores), **Órgão Especial** (exerce atribuições delegadas do Pleno, admissível em tribunais com mais de 25 julgadores — art. 93, XI, da CF), **Seções de Dissídios Individuais e Coletivos** e **Turmas**.
- Cargos de direção: **Presidente**, **Vice-Presidente** e **Corregedor Regional**, eleitos pelo Pleno para mandato de **2 anos**, vedada a reeleição (regra da LOMAN).

## 4. Atribuições típicas dos cargos de direção
- **Presidente**: representar o Tribunal, dirigir os trabalhos, superintender a administração e os serviços (inclusive a TI), dar posse a servidores.
- **Vice-Presidente**: substituir o Presidente; normalmente cuida da admissibilidade de recursos de revista e de conciliações em segundo grau.
- **Corregedor Regional**: fiscalizar e orientar a **primeira instância** (Varas), realizando correições.

## 5. Como a FCC cobra
- Composição mínima dos TRTs (7), forma de nomeação (Presidente da República), quinto constitucional.
- Jurisdição do TRT4 (RS).
- Competências da Justiça do Trabalho (art. 114).
- Atribuições de órgãos e cargos segundo o Regimento — por isso, leia o texto oficial.
`);

/* ============================ DIREITOS HUMANOS ============================ */
A('dh-teoria', `
## 1. O que são direitos humanos
São os direitos que toda pessoa tem **pelo simples fato de ser humana**, independentemente de nacionalidade, sexo, cor, religião ou qualquer condição. Seu fundamento é a **dignidade da pessoa humana**, que a Constituição de 1988 coloca como **fundamento da República** (art. 1º, III).
- **Direitos humanos**: expressão usada no plano **internacional** (tratados, ONU, OEA).
- **Direitos fundamentais**: os direitos humanos **positivados na Constituição** de um Estado.

## 2. Evolução histórica em 5 marcos
1. **Magna Carta (1215)**: limita o poder do rei inglês — semente da ideia de que o governante está sob a lei.
2. **Declaração de Direitos da Virgínia (1776)** e **Declaração dos Direitos do Homem e do Cidadão (França, 1789)**: liberdade, igualdade perante a lei, propriedade.
3. **Constituição Mexicana (1917)** e **de Weimar (1919)**: primeiros direitos **sociais** (trabalho, educação).
4. **Pós-Segunda Guerra**: criação da **ONU (1945)** e **Declaração Universal dos Direitos Humanos (1948)** — a humanidade reage às atrocidades do nazismo e “internacionaliza” os direitos humanos.
5. **Conferência de Viena (1993)**: afirma que os direitos humanos são **universais, indivisíveis, interdependentes e inter-relacionados**.

## 3. Características (as que mais caem)
| Característica | Significado |
|---|---|
| **Universalidade** | valem para todas as pessoas, em qualquer lugar |
| **Indivisibilidade e interdependência** | não há hierarquia entre eles; violar um afeta os outros |
| **Inalienabilidade** | não podem ser vendidos ou transferidos |
| **Irrenunciabilidade** | a pessoa não pode abrir mão deles (pode deixar de exercê-los num momento) |
| **Imprescritibilidade** | não se perdem pelo tempo |
| **Historicidade** | surgem e se ampliam ao longo da história |
| **Relatividade/limitabilidade** | não são absolutos: podem ser ponderados quando colidem (exceções clássicas tratadas como absolutas: proibição da tortura e da escravidão) |
| **Proibição do retrocesso** | uma vez conquistados, não podem ser suprimidos sem compensação |
| **Vedação da proteção insuficiente** | o Estado deve protegê-los de forma eficaz |

## 4. Gerações (ou dimensões) — o lema da Revolução Francesa ajuda
| Dimensão | Valor | Direitos | Postura do Estado |
|---|---|---|---|
| **1ª** | **Liberdade** | civis e políticos (vida, liberdade de expressão, voto, propriedade) | **abstenção** (não interferir) |
| **2ª** | **Igualdade** | sociais, econômicos e culturais (saúde, educação, trabalho, previdência) | **prestação** (agir, oferecer) |
| **3ª** | **Fraternidade / solidariedade** | difusos e coletivos (meio ambiente, paz, desenvolvimento, consumidor) | cooperação |
| 4ª (doutrina) | | democracia, informação, pluralismo, biotecnologia | |
| 5ª (doutrina) | | direito à paz (Paulo Bonavides) | |
> [!dica] Prefira “**dimensões**” a “gerações”: a palavra “geração” dá a falsa ideia de que uma substitui a outra. Na verdade elas se **somam**.

## 5. Eficácia vertical e horizontal
- **Vertical**: proteção do indivíduo **contra o Estado**.
- **Horizontal**: aplicação dos direitos fundamentais **nas relações entre particulares** (ex.: um empregador não pode discriminar empregados). É especialmente relevante na **Justiça do Trabalho**.

## 6. Como a FCC cobra
- Associar dimensões a valores (2ª = igualdade).
- Reconhecer características (irrenunciabilidade, indivisibilidade).
- Saber que a DUDH é de **1948** e que a Conferência de Viena (1993) consagrou a indivisibilidade.
`);

A('dh-tratados', `
## 1. Como um tratado entra no Brasil (o “caminho” em 4 etapas)
1. **Negociação e assinatura** pelo **Presidente da República** (ou plenipotenciário).
2. **Aprovação pelo Congresso Nacional**, por **decreto legislativo** (art. 49, I, da CF).
3. **Ratificação** pelo Presidente (compromisso internacional, depósito do instrumento).
4. **Promulgação** por **decreto presidencial** e publicação → passa a valer **internamente**.

## 2. A hierarquia dos tratados — o ponto mais cobrado
| Tipo de tratado | Rito de aprovação | Hierarquia |
|---|---|---|
| **Direitos humanos** aprovado com **3/5 dos votos, em 2 turnos, em cada Casa** (art. 5º, § 3º — EC 45/2004) | especial | **Emenda constitucional** |
| **Direitos humanos** aprovado pelo **rito comum** (ou anterior à EC 45) | comum | **Supralegal** (abaixo da Constituição, acima das leis) — STF, RE 466.343 |
| Tratados que **não** são de direitos humanos | comum | **Lei ordinária** |
> [!fcc] Por causa do status supralegal do **Pacto de San José**, o STF declarou que a **prisão do depositário infiel** não pode mais ser aplicada — **Súmula Vinculante 25**. Só sobrou a prisão civil do **devedor de alimentos**.

### Tratados com status de emenda constitucional (aprovados pelo rito do § 3º)
- **Convenção sobre os Direitos das Pessoas com Deficiência** e seu Protocolo Facultativo (Nova York, 2007) — **o primeiro**.
- **Tratado de Marraqueche** (acesso a obras publicadas por pessoas cegas ou com deficiência visual).
- **Convenção Interamericana contra o Racismo, a Discriminação Racial e Formas Correlatas de Intolerância**.

## 3. Outros dispositivos da CF que você precisa saber
- **Art. 4º, II**: o Brasil rege-se nas relações internacionais pela **prevalência dos direitos humanos**.
- **Art. 5º, § 1º**: normas definidoras de direitos fundamentais têm **aplicação imediata**.
- **Art. 5º, § 2º**: os direitos da Constituição **não excluem** outros decorrentes de **tratados** (cláusula de abertura).
- **Art. 5º, § 4º**: o Brasil se submete à jurisdição do **Tribunal Penal Internacional**.
- **Art. 109, V-A e § 5º**: **incidente de deslocamento de competência (IDC)** — nas **graves violações de direitos humanos**, o **Procurador-Geral da República** pode pedir ao **STJ** que desloque o caso para a **Justiça Federal**, para garantir o cumprimento de obrigações internacionais.

## 4. Controle de convencionalidade
É a verificação da compatibilidade das **leis internas** com os **tratados de direitos humanos**.
- **Concentrado**: os tratados com status de **emenda** servem de parâmetro para ADI, ADC e ADPF no **STF**.
- **Difuso**: **qualquer juiz**, em qualquer processo, pode deixar de aplicar uma lei que contrarie um tratado de direitos humanos (inclusive os supralegais).
- No plano internacional, a **Corte Interamericana** exerce o controle e exige que os juízes nacionais também o façam (caso Almonacid Arellano vs. Chile, 2006).
- O **CNJ** editou a **Recomendação nº 123/2022**, recomendando aos órgãos do Judiciário a observância dos tratados de direitos humanos e da jurisprudência da Corte Interamericana, com controle de convencionalidade.

## 5. Exemplo resolvido
“O Pacto de San José da Costa Rica, ratificado em 1992, tem status de emenda constitucional.” → **Errado**: ele não seguiu o rito do § 3º (que nem existia) → é **supralegal**.
`);

A('dh-onu', `
## 1. O sistema global (ONU) em uma frase
Depois da Segunda Guerra, os países criaram a **ONU (Carta de São Francisco, 1945)** para manter a paz e promover os direitos humanos. A partir daí, nasceu um conjunto de **declarações, tratados e órgãos** de alcance mundial — o **sistema global** —, que convive com os **sistemas regionais** (interamericano, europeu, africano).

## 2. A “Carta Internacional de Direitos Humanos”
É o nome dado ao trio:
1. **Declaração Universal dos Direitos Humanos (DUDH, 10/12/1948)** — adotada por **resolução** da Assembleia Geral (Res. 217 A). Formalmente **não é tratado**, mas hoje é considerada parte do **costume internacional** e tem enorme força moral e jurídica. Traz direitos civis, políticos, econômicos, sociais e culturais.
2. **Pacto Internacional sobre Direitos Civis e Políticos (PIDCP, 1966)** — vida, liberdade, devido processo, liberdade de expressão, voto. Monitorado pelo **Comitê de Direitos Humanos**. Protocolos: petições individuais e abolição da pena de morte.
3. **Pacto Internacional sobre Direitos Econômicos, Sociais e Culturais (PIDESC, 1966)** — trabalho, saúde, educação, previdência. Realização **progressiva**, conforme os recursos disponíveis. Monitorado pelo **Comitê DESC**.
O Brasil ratificou os dois Pactos em **1992**.

## 3. As principais convenções temáticas
| Convenção | Ano | Foco |
|---|---|---|
| Eliminação de Todas as Formas de **Discriminação Racial** | 1965 | igualdade racial |
| Eliminação de Todas as Formas de Discriminação contra a **Mulher (CEDAW)** | 1979 | igualdade de gênero |
| Contra a **Tortura** | 1984 | proibição absoluta da tortura |
| Direitos da **Criança** | 1989 | proteção integral, melhor interesse |
| Direitos das **Pessoas com Deficiência** | 2006/2007 | inclusão; no Brasil, **status de emenda** |
| Proteção dos **Trabalhadores Migrantes** | 1990 | |

## 4. Mecanismos de monitoramento
- **Convencionais** (criados pelos tratados): **comitês** que analisam **relatórios periódicos** dos Estados, **comunicações interestatais** e **petições individuais** (quando o Estado aceita).
- **Extraconvencionais** (criados pela Carta da ONU): **Conselho de Direitos Humanos** (sede em Genebra, 47 membros eleitos), que realiza a **Revisão Periódica Universal (RPU)** — todos os países da ONU são avaliados pelos pares — e designa **relatores especiais**.
- **Alto Comissariado da ONU para os Direitos Humanos**.

## 5. Tribunal Penal Internacional (TPI)
- Criado pelo **Estatuto de Roma (1998)**, sede em **Haia**; é **permanente** e julga **pessoas** (não Estados).
- Crimes: **genocídio, crimes contra a humanidade, crimes de guerra e crime de agressão**.
- Princípio da **complementaridade**: só atua se o Estado **não puder ou não quiser** julgar.
- O Brasil se submete à sua jurisdição (CF, art. 5º, § 4º).
> [!fcc] Não confunda: o **TPI** julga indivíduos por crimes graves; a **Corte Internacional de Justiça** (também em Haia, órgão da ONU) julga **litígios entre Estados**.

## 6. Organização Internacional do Trabalho (OIT)
Agência da ONU (criada em 1919) de composição **tripartite** (governos, empregadores e trabalhadores). Suas **convenções** tratam de trabalho decente, trabalho infantil, trabalho forçado, liberdade sindical e, recentemente, a **Convenção 190** (violência e assédio no trabalho). Tema muito ligado à Justiça do Trabalho.
`);

A('dh-oea', `
## 1. O sistema regional das Américas
Além da ONU, os países americanos têm seu próprio sistema, mais próximo e com uma **corte que condena Estados**. Ele funciona no âmbito da **OEA (Organização dos Estados Americanos)**.

## 2. Documentos principais
- **Carta da OEA (1948)** e **Declaração Americana dos Direitos e Deveres do Homem (1948)** — esta, alguns meses **antes** da DUDH.
- **Convenção Americana sobre Direitos Humanos — Pacto de San José da Costa Rica (1969)**: o tratado central. Em vigor desde 1978; **ratificada pelo Brasil em 1992**. Traz sobretudo direitos **civis e políticos**.
- **Protocolo de San Salvador (1988)**: direitos **econômicos, sociais e culturais**.
- Outros: Convenção para Prevenir e Punir a Tortura; **Convenção de Belém do Pará (1994)** — violência contra a mulher (inspirou a **Lei Maria da Penha**); Convenção contra o Racismo (com status de emenda no Brasil).

## 3. Os dois órgãos — entenda a “porta de entrada”
| | **Comissão Interamericana (CIDH)** | **Corte Interamericana (Corte IDH)** |
|---|---|---|
| Sede | **Washington (EUA)** | **San José (Costa Rica)** |
| Composição | 7 membros | 7 juízes |
| Natureza | órgão **quase judicial** e político (da OEA e da Convenção) | órgão **jurisdicional** autônomo |
| Quem pode acionar | **qualquer pessoa**, grupo ou ONG (petição individual) | **somente a Comissão e os Estados-Partes** |
| O que faz | recebe petições, faz recomendações, visitas, relatórios, **medidas cautelares** | julga casos e emite **sentenças obrigatórias**; dá **opiniões consultivas**; **medidas provisórias** |
> [!fcc] O indivíduo **não** acessa diretamente a Corte: ele peticiona à **Comissão**, que, se o Estado não cumprir as recomendações, pode **submeter o caso à Corte**.

### Requisitos da petição à Comissão
- **Esgotamento dos recursos internos** (com exceções: inexistência de devido processo, impedimento de acesso, demora injustificada).
- Prazo de **6 meses** a partir da decisão definitiva interna.
- Ausência de **litispendência internacional** (o mesmo caso não pode estar em outro órgão internacional).

## 4. Competência da Corte em relação ao Brasil
O Brasil reconheceu a **competência contenciosa** da Corte em **1998** (Decreto Legislativo 89/1998), para fatos posteriores a essa data. As sentenças são **definitivas e inapeláveis**, e o Estado deve cumpri-las (indenizações, mudanças de leis, investigações).

### Casos brasileiros famosos
- **Ximenes Lopes (2006)**: primeira condenação do Brasil — morte de paciente em clínica psiquiátrica.
- **Gomes Lund — Guerrilha do Araguaia (2010)**: desaparecimentos forçados; a Corte considerou a **Lei de Anistia** incompatível com a Convenção quanto a graves violações.
- **Trabalhadores da Fazenda Brasil Verde (2016)**: **trabalho escravo** — muito relevante para a Justiça do Trabalho.
- **Favela Nova Brasília (2017)**: violência policial.

## 5. Opiniões consultivas
A Corte também interpreta a Convenção a pedido de Estados ou órgãos da OEA (ex.: OC sobre identidade de gênero e igualdade).
`);

A('dh-grupos', `
## 1. Por que “grupos vulneráveis”?
Igualdade **formal** (todos iguais perante a lei) não basta quando algumas pessoas enfrentam **barreiras históricas** — mulheres, pessoas negras, pessoas com deficiência, idosos, crianças, povos indígenas, população LGBTQIA+, migrantes, pessoas em situação de rua. Por isso o direito busca a **igualdade material**: tratar desigualmente os desiguais, na medida de sua desigualdade, por meio de **ações afirmativas** (como as cotas deste concurso).

## 2. Pessoas com deficiência
- **Convenção da ONU (2007)** — **status de emenda constitucional** no Brasil.
- **Lei Brasileira de Inclusão (LBI — Lei 13.146/2015)**: adota o **modelo biopsicossocial**: a deficiência resulta da **interação** entre um **impedimento de longo prazo** (físico, mental, intelectual ou sensorial) e as **barreiras** do ambiente. Ou seja: uma escada sem rampa “cria” a deficiência tanto quanto o impedimento.
- **Barreiras**: urbanísticas, arquitetônicas, nos transportes, nas **comunicações e na informação**, **atitudinais** e **tecnológicas**.
- **Adaptação razoável** e **desenho universal**.
- A pessoa com deficiência **não é incapaz** por isso (a LBI alterou o Código Civil); pode usar **tomada de decisão apoiada**.
> [!dica] Para quem trabalha com TI, acessibilidade digital é **obrigação legal**: sites e sistemas públicos devem seguir padrões de acessibilidade (eMAG/WCAG), como texto alternativo em imagens e navegação por teclado.

## 3. Gênero e mulheres
- **CEDAW (1979)** e **Convenção de Belém do Pará (1994)**.
- **Lei Maria da Penha (Lei 11.340/2006)**: violência doméstica e familiar (física, psicológica, sexual, patrimonial e moral).
- **Protocolo para Julgamento com Perspectiva de Gênero** do CNJ — de **observância obrigatória** pelo Judiciário (**Resolução CNJ nº 492/2023**): orienta magistrados a identificar estereótipos e desigualdades estruturais ao julgar. Muito aplicado na Justiça do Trabalho (assédio, discriminação salarial, maternidade).
- **Lei 14.611/2023**: igualdade salarial entre mulheres e homens.

## 4. Igualdade racial
- **Convenção contra a Discriminação Racial (1965)** e **Convenção Interamericana contra o Racismo** (status de emenda).
- **Estatuto da Igualdade Racial (Lei 12.288/2010)**.
- Racismo é **crime inafiançável e imprescritível** (CF, art. 5º, XLII); o STF equiparou a **homotransfobia** ao racismo (ADO 26) e a **injúria racial** foi equiparada ao racismo (Lei 14.532/2023).
- O CNJ instituiu políticas de **equidade racial** e **cotas** nos concursos do Judiciário (Res. CNJ 203/2015).

## 5. Crianças, adolescentes e idosos
- **Doutrina da proteção integral** e **melhor interesse da criança** (Convenção de 1989; **ECA — Lei 8.069/1990**; CF, art. 227 — **prioridade absoluta**).
- **Estatuto da Pessoa Idosa (Lei 10.741/2003)**: 60 anos ou mais; prioridade de tramitação processual (prioridade especial para maiores de 80).

## 6. Povos indígenas, migrantes e outros
- **Convenção 169 da OIT**: **consulta prévia, livre e informada** aos povos indígenas e tribais sobre medidas que os afetem.
- **Lei de Migração (Lei 13.445/2017)**: trata o migrante como sujeito de direitos (não como ameaça).
- População em situação de rua: política nacional e Res. CNJ 425/2021 (acesso à justiça).

## 7. Equidade no Judiciário — o que o CNJ cobra dos tribunais
Políticas de **participação feminina**, **equidade racial**, **acessibilidade e inclusão** (Res. CNJ 401/2021), linguagem simples e acesso à justiça para grupos vulneráveis. A ideia central para a prova: **igualdade material**, **ações afirmativas** e **combate a estereótipos**.
`);
