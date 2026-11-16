# Mensagens diretas OrganizeOn

O sistema usa as contas e sessões OrganizeOn existentes. DMs são conversas privadas entre duas contas; nenhum servidor ou canal foi adicionado.

## Código e contratos

- `ui/src/features/messages/`: painel, lista, solicitações, conversa, compositor, mídia, ações, gestos e notificações.
- `ui/src/stores/messages-store.ts`: estado de sessão, rascunhos em memória, polling, sincronização incremental e notificações.
- `ui/src/services/messages-service.ts`: contrato HTTP tipado.
- `ui/src/services/account-api.ts`: transporte autenticado compartilhado com perfis. D2 injeta seu transporte Bearer; D3 utiliza suas rotas e cookies existentes; o cliente utiliza seu token existente.
- `MessagesProvider`: montado no layout autenticado, fora da sidebar mobile. Fechar a sidebar não interrompe notificações. O painel é carregado sob demanda; falhas têm uma fronteira de erro.
- `MessagesLauncher`: botão reutilizado próximo ao perfil no cliente, D2, D3 e painel administrativo.
- Backend: `src/direct-messages/store.mjs` e `http.mjs`, presentes no arquivo de fontes `server-backup/organizeon-backend-source.tar.gz`.
- Sincronização com D3: `node scripts/sync-profile-ui.mjs /caminho/d3/src`; o arquivo de fontes D3 preserva sua composição e inicialização.

## Persistência e acesso

SQLite próprio em `~/.local/share/organizeon/direct-messages.sqlite3`, ou `DM_DATABASE_FILE`. WAL, arquivo 0600 e diretório privado. Não altera o banco de contas, o armazenamento D2 nem a automação Xiaomi. O banco é dado operacional: nunca incluí-lo no Git.

Cada chamada autentica a sessão atual. Conversas, mensagens e anexos exigem participação; edição e exclusão exigem autoria. Mutações validam a origem. Anexos nunca recebem URLs públicas. O armazenamento não é criptografia ponta a ponta: o servidor armazena as mensagens e arquivos.

API: `/827e7h3heuw823eh/dm` (ou prefixo configurado), com aliases `/d2/api/dm` e `/d3/api/dm`. Inclui inbox/cursor, requests, settings, people, conversations/messages/read/typing/attachments, messages/actions e notifications/claim. Os módulos de serviço e handler são os contratos executáveis.

No Android, `backend/data` aponta para armazenamento compartilhado; por isso o banco novo foi instalado no HOME privado do Termux. O banco inicial vazio no caminho antigo ficou inativo.

## Comportamento

Solicitações precisam de aceite, salvo preferência de aceite automático do destinatário. Rejeição aplica espera de 24 horas; bloqueio impede envio. Máximo de 20 solicitações/dia por conta. Envios têm nonce idempotente para evitar duplicação em repetição de falha de rede.

Mensagens suportam resposta, edição, exclusão, reação, encaminhamento, fixação, salvos, não lidas, pesquisa e filtros de mídia/links/arquivos. Clicar no nome insere @ no cursor; avatar abre perfil; somente o próprio perfil é editável. O atalho Chat antigo do Fern foi removido, preservando sua pesquisa e configurações.

No celular: deslizar para esquerda responde; segurar abre ações; deslizar para direita volta à lista e depois fecha. A área considera visualViewport para o teclado. Há alternativas por botões e teclado.

Polling: 5 segundos fechado, 1,8 segundo aberto e 20 segundos em segundo plano. Digitação e presença expiram. Notificações têm Abrir/X, preferências, silenciamento e claim atômico para evitar duplicação entre abas/dispositivos. Notificações de navegador dependem de permissão e página ativa; não há push quando o navegador estiver encerrado.

Arquivos: até 8 MiB por arquivo, quatro anexos por mensagem, 256 MiB por conta e 1 GiB global. MIME é verificado; formatos não reconhecidos são downloads binários. Imagens, vídeos e áudio carregam apenas sob interação e usam URLs Blob revogadas ao desmontar.

## Validação e publicação

Testes de domínio e HTTP cobrem consentimento, bloqueio, idempotência, ACL de terceira conta, autoria, anexos, encaminhamento, notificações, filtros, persistência após reabrir o banco e permissões de arquivo. Foram executados também no Android isoladamente com contas fictícias. `ui/e2e/messages.cjs` usa backend SQLite real em memória e duas contas fictícias, sem enviar DMs reais.

A publicação deve manter backend compatível primeiro, publicar bundles/manifest do cliente, atualizar versão das referências D2 somente após os assets públicos estarem disponíveis e sobrepor assets D3 preservando hashes anteriores. Backup pequeno de `server.mjs` e dos índices/templates permite rollback. Reiniciar somente o serviço da API quando seu código mudar; Xiaomi, SSH, túnel e demais serviços não precisam de reinício.

## Resultado da entrega — 16/11/2026

- Backend: 30 testes passaram; os sete testes específicos de DMs também passaram no Android real, em staging isolado.
- Interface compartilhada: 10 testes passaram. O primeiro executor em processos separados sofreu timeout na inicialização; repetição com `--pool=vmThreads --maxWorkers=1` passou integralmente.
- D3: nove testes passaram. Builds do cliente, admin e D3 passaram; TypeScript validado.
- Integridade do cliente/manifest/download: 13 testes passaram.
- Playwright com backend real em memória: solicitação, aceite, envio/recebimento, @ no cursor, resposta por gesto, segurar para ações, notificações X/Abrir, voltar/fechar por gesto e alternância 390/1280 px passaram. Capturas mobile e desktop inspecionadas. A alternância revelou e corrigiu a sidebar mobile que permanecia aberta atrás das DMs.
- Regressão de perfil: cliente e D2 passaram, incluindo transporte Bearer, edição parcial, cancelamento e recorte da foto.
- Assets públicos conferidos por SHA-256. D2/D3 login responderam 200 pelo servidor. API de DMs sem sessão respondeu 401.
- Não foram enviadas mensagens para contas reais. Permissão/entrega de notificações do sistema, som físico e comportamento de todos os teclados Android não foram validados em aparelho físico.

### Recuperação desta instalação

No servidor, os arquivos pequenos de rollback estão em `~/organizeon/backend/staging/`:

- `dm-rollback.path` informa a pasta com o `server.mjs` anterior. Restaurar esse arquivo e reiniciar apenas `organizeon-backend` reverte as rotas novas; preservar o SQLite privado.
- `d2-before-dm-f0f34bf.html` contém o template anterior do D2.
- `d3-dm-rollback-20261116-115522/` contém índice e fontes anteriores do D3. Os hashes antigos dos assets foram preservados, permitindo restaurar o índice sem apagar assets.
- Git mantém commits separados de fontes e bundles. Reverter os commits correspondentes e publicar novamente restaura o cliente. Nenhum backup integral foi recriado.

## Refinamento de interação — 16/11/2026

A pesquisa da conversa começa oculta. A lupa no cabeçalho abre o campo e os filtros; fechar pela lupa/X ou Escape limpa os filtros e restaura o histórico. A pesquisa da lista de conversas permanece independente.

O menu ao segurar uma mensagem usa `components/ui/drawer.tsx` e `drawer.css`, com o Drawer nativo da Base UI: movimento acompanhando o toque, cancelamento de arraste curto, fechamento ao puxar para baixo, Escape, clique fora e botão de fechar. As ações aguardam a saída do modal antes de focar o compositor ou abrir outro diálogo. Os grupos seguem a referência visual, e o menu preserva seu conteúdo durante a animação de saída.

| Ação | Comportamento |
| --- | --- |
| Reagir | Alterna a reação da própria conta; o total é compartilhado. |
| Editar mensagem | Abre a edição do texto da própria mensagem. |
| Responder | Prepara uma resposta com referência à mensagem original. |
| Encaminhar | Seleciona outra conversa e envia uma cópia marcada como encaminhada. |
| Copiar texto | Copia o texto para a área de transferência. |
| Marcar como não lida | Marca a conversa a partir dessa mensagem para a própria conta. |
| Fixar / desafixar | Gerencia as mensagens fixadas para os participantes da conversa. |
| Salvar / remover dos salvos | Gerencia os favoritos pessoais da conta. |
| Apagar mensagem | Pede confirmação antes de apagar a própria mensagem para os participantes. |

Referências consultadas: [Drawer Base UI](https://base-ui.com/react/components/drawer), [respostas](https://support.discord.com/hc/en-us/articles/360057382374-Replies-FAQ), [fixadas](https://support.discord.com/hc/en-us/articles/221421867-Pin-Messages-FAQ), [salvos e lembretes](https://support.discord.com/hc/en-us/articles/26442819646999-Message-Bookmarks-and-Reminders), [encaminhamento](https://support.discord.com/hc/en-us/articles/24640649961367-Message-Forwarding) e [atalhos para marcar não lida](https://discord.com/blog/how-to-navigate-discord-using-only-your-keyboard).

Em Users, a troca de senha permanece no menu de três pontos de cada conta; o atalho separado foi removido. O fluxo de senha atual/nova/confirmação e as permissões existentes foram preservados.

Validação deste refinamento: TypeScript e builds cliente/admin/D3 passaram; os 10 testes da interface passaram. Playwright validou pesquisa fechada inicialmente, abertura e restauração do histórico, arraste via CDP touch com deslocamento real do painel, fechamento por arraste e por ação, além das regressões de envio, respostas, notificações e navegação mobile/desktop. A troca de senha pelos três pontos passou com confirmação diferente, senha atual incorreta e sucesso com encerramento da sessão fictícia. Captura do menu inspecionada; o ambiente Linux de teste não tem a mesma fonte de emojis do Android.

A validação adicional encontrou uma perda de atualização quando o polling consumia eventos de edição em segundo plano. O store agora mantém as mensagens em cache marcadas como pendentes até recarregá-las com sucesso; esses marcadores são apagados ao sair da conta. Um teste de regressão simula consumir o evento com a página oculta e voltar sem receber o mesmo evento novamente. O compositor também foca o campo de edição depois de montar a instância correta, após a saída do Drawer.

Para executar o teste de navegador em outro checkout, `DM_BACKEND_ROOT` pode apontar para as fontes do backend extraídas do arquivo de recuperação.

## Acabamento visual e Motion

Motion (`motion/react`, com LazyMotion/domAnimation e componentes `m`) está centralizado em `ui/src/core/motion.tsx`. A política global respeita a preferência de movimento reduzido. As trocas de páginas/campos usam AnimatePresence e transições curtas; grupos e reações têm feedback de entrada e toque. A Base UI continua sendo a única responsável pelo arraste e pela saída do Drawer, evitando dois mecanismos disputando o mesmo transform.

O menu agora possui superfícies semânticas `card`, cantos de 18px e divisórias internas depois da coluna de ícones. As linhas usam botões semânticos específicos; a borda do Button genérico não se propaga para cada opção. O título técnico fica acessível a leitores de tela e a linha de reações ganha acesso à preferência de toque duplo.

No celular, o perfil abre em Drawer e usa uma superfície contínua, sem card dentro de outro card. Nome, foto, descrição e troca de senha preservam os contratos e permissões anteriores. As conversas exibem horários reais e pesquisa recolhida por padrão. Mensagens consecutivas próximas são agrupadas, e o recibo aparece somente na última mensagem enviada visível. O cabeçalho da conversa substitui o cabeçalho repetido das DMs em telas pequenas.

Imagens privadas de até 1 MiB carregam quando entram na área visível; mídias maiores continuam sob interação. URLs Blob são revogadas ao sair, e respostas tardias após desmontar não são exibidas. Não houve mudança no backend nem no armazenamento das mensagens.

Validação do Motion: o teste de navegador registrou opacidades intermediárias reais durante a abertura dos grupos, além de verificar o arraste nativo, as ações, o perfil editável, o recorte da foto e a prévia autenticada de imagem. Capturas mobile e desktop foram inspecionadas. Os testes unitários passaram após repetir isoladamente o teste de arquivos D2 que excedeu o prazo durante os builds concorrentes. O lint das fontes do D3 não apresentou erros; há um aviso anterior sobre a cópia deliberada de um Set no store. O lint sem caminho também percorre arquivos gerados/dependências e não deve ser usado para corrigir bibliotecas externas.

A versão final passou também no fluxo completo com `prefers-reduced-motion: reduce`: o Drawer não manteve a transição espacial e os gestos/ações continuaram funcionais. Perfis no cliente e no D2 passaram nos testes de edição, cancelamento e foto. O Drawer oferece `contentClassName` para composições sem padding, evitando sobrepor regras de layout para desenhar o banner até a borda.

## Envio otimista e confirmações

A fila local (`stores/message-outbox.ts`) publica a mensagem pendente imediatamente. Ela fica atenuada até a resposta do backend, sem inventar entrega ou leitura. Anexos têm prévia local e progresso medido pelo transporte XHR. Aos 100% dos bytes, o indicador passa a uma espera indeterminada até a confirmação. Falhas ficam em vermelho e permitem nova tentativa com o mesmo nonce, evitando duplicação quando a resposta anterior se perde. A fila não persiste arquivos ou mensagens privadas em localStorage.

Em Configurações de mensagens, **Mostrar textos de envio** vem desativado. A preferência `showSendStatus` é validada e persistida por conta no backend. Desativá-la oculta somente os textos de andamento; indicadores visuais, rótulos acessíveis e erros continuam disponíveis.

Favoritar, fixar, silenciar e editar o perfil podem atualizar imediatamente com reversão em falhas. Confirmações de envio, leitura pelo destinatário, senha, permissões administrativas e autorização Xiaomi continuam dependentes de respostas reais. Filas e revisões impedem respostas antigas de substituir alterações recentes.

Referências: [React useOptimistic](https://react.dev/reference/react/useOptimistic), [TanStack rollback](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates), [SWR mutation](https://swr.vercel.app/docs/mutation), [Discord anexos](https://support.discord.com/hc/en-us/articles/25444343291031-File-Attachments-FAQ). A implementação usa os stores existentes, sem adicionar outra biblioteca de estado.

### Validação e publicação — 16/11/2026

- 18 testes de UI/stores, 31 de backend e 13 do cliente passaram; os 8 testes de mensagens passaram também no Android em ambiente isolado.
- Build TypeScript/Vite do cliente, admin e D3 concluído. Playwright validou envio entre contas fictícias, recebimento, menções, menus de toque, gestos, favoritos/fixação, perfil móvel ampliado e ausência de overflow. A abertura do perfil foi testada com a resposta de rede suspensa.
- GitHub Pages publicou `5c03466`; os hashes dos quatro bundles públicos conferiram. D2 utiliza `dm-outbox-20261116`; D3 utiliza `index-Dxlupgeb.js`. Ambos os logins retornaram 200 após a atualização.
- Somente o backend foi reiniciado para carregar as alterações de mensagens; D3 recebeu assets e index atômico. Xiaomi e Survival permaneceram ativos. Nenhuma DM real nem solicitação Xiaomi foi enviada nos testes.
- Rollback de backend e cópia consistente SQLite: `~/.local/share/organizeon/rollback/dm-responsive-20261116-174325/`. Restaurar apenas os arquivos fonte permite reverter mantendo dados novos; as colunas SQLite adicionadas são compatíveis com o código anterior. Não restaurar o banco sem avaliar mensagens recebidas depois da cópia.
- Rollback do frontend D3: `~/organizeon/backend/staging/d3-responsive-rollback-20261116-175715/`. Restaurar index anterior e fontes preservando assets existentes; nenhuma mudança de proxy foi necessária.

## Modal bottom sheets

Perfil mobile, ações de mensagem e ações de conversa compartilham `components/ui/drawer.tsx` e `drawer.css`. O padrão se chama **modal bottom sheet**, implementado como Drawer Base UI/shadcn: entrada de baixo para cima, saída para baixo e arraste acompanhando o dedo. O perfil mobile dispensa o X; continuam disponíveis arraste, toque no fundo e Escape. No desktop, o perfil mantém o botão de fechar do diálogo.

A montagem lazy do perfil já aberto não produzia `data-starting-style`, portanto a transição não tinha um estado inicial. O contrato compartilhado usa `@starting-style` para fornecer esse primeiro quadro sem aguardar rede ou atrasar foco. Estados de saída/arraste continuam sob controle do Base UI e `prefers-reduced-motion` desativa as transições. O teste de navegador mede deslocamento vertical real; não se limita à existência de uma classe CSS.

Referências: [shadcn Drawer](https://ui.shadcn.com/docs/components/base/drawer), [Base UI animações](https://base-ui.com/react/handbook/animation), [MDN starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@starting-style).

A ação **Alterar senha** fica no menu compartilhado da conta, entre Perfil e Sair da sessão, com destaque laranja e disponível a qualquer conta autenticada. Ela não fica mais dentro do perfil. O diálogo de segurança é carregado sob demanda e continua exigindo senha atual, nova senha e confirmação; somente o backend confirma a mudança e a revogação de sessões.

Validação desta revisão: o teste reproduziu a falha anterior com deslocamento vertical sempre zero; após a correção, mediu a entrada de 782 px até zero e fechamento por toque real no mobile. No D2 verificou também cor laranja computada, abertura/cancelamento do formulário de senha e ausência da ação dentro do perfil. Typecheck, builds cliente/admin/D3, 18 testes de UI e 13 do cliente passaram. GitHub Pages publicou `a56cdde` (run `43957007617`) e os hashes dos quatro bundles conferiram. D2: `bottom-sheet-20261116`; D3: `index-CdRXTzxI.js`. Rollback de fontes/index D3 e template D2 em `~/organizeon/backend/staging/d3-bottom-sheet-rollback-20261116-180853/`; não houve mudança de backend, banco, túnel ou reinício de serviço.

## Rolagem, formatos de avatar e tempo de toque longo

Configurações de mensagens ocupa a altura disponível e possui sua própria rolagem vertical; a altura não pode crescer além do contêiner recortado do painel. Testes de navegador em viewport mobile curta precisam alcançar a última opção usando toque real.

O contorno atrás do avatar usa a mesma função `avatarRadius` da foto, respeitando círculo, quadrado e cantos arredondados. Mensagens e conversas usam `gesture-config.ts` como contrato único para toque longo. A preferência `longPressMs` começa em **200 ms**, aceita inteiros de 100 a 2000 ms e é salva por conta em Configurações de mensagens. Movimento de rolagem, cancelamento e desmontagem cancelam o temporizador; mudar essa preferência não altera pedidos Xiaomi nem tempos de rede.

Validação: 24 testes UI/stores, 13 testes do cliente e 9 testes de mensagens passaram; os 9 de mensagens também rodaram no Android com SQLite isolado. Playwright validou rolagem nativa por toque em viewport 390×650 (446 px rolados, conteúdo 1045 px/área 599 px), acesso à última opção e salvamento de 175 ms sem mudar outra conta, que permaneceu em 200 ms. Os três formatos têm teste de contorno/foto e os gestos têm testes de prazo, cancelamento e preferência personalizada. Builds/TypeScript de cliente, admin e D3 concluídos.

Rollback do backend/template: `~/organizeon/backend/staging/dm-hold-rollback-20261116-182224/`; frontend D3: `staging/d3-hold-scroll-rollback-20261116-182338/`. A preferência usa a tabela existente, sem migração ou alteração de credenciais. O backend precisou de reinício dirigido para reconhecer o novo campo; D3 foi atualizado com assets preservados e troca atômica do index.

Publicação: GitHub Pages `acae6cc`, execução `43959563596` concluída com sucesso; quatro bundles públicos verificados por SHA-256. D2 aponta para `dm-gestures-acae6cc`; D3 para `index-CE4xmTh3.js`. Testes usam apenas contas fictícias, sem DM real ou pedido Xiaomi.

## Emblema dourado e fundo lava por conta

O emblema é uma concessão independente do cargo. Só um owner autenticado pode conceder, pelo menu de Users ou pelo perfil aberto nas DMs. Contas comuns, admins e ultra admins não recebem sequer um item desativado: a ação é omitida. O backend verifica novamente o cargo atual persistido; falsificar campos do perfil ou o rótulo do frontend não concede o emblema.

A concessão persiste `goldBadge` fora das preferências editáveis, com emissor e data privados. O perfil público inclui apenas a elegibilidade e aparência. Ela libera `bannerStyle=lava` e exibição opcional do emblema. O símbolo oficial usa as variantes clara/escura conforme o tema de quem visualiza. O emblema fica no agrupamento ao lado do avatar; a edição de aparência permite ocultá-lo sem perder a elegibilidade.

A seed inicial é derivada do identificador público imutável da conta; rerolls autorizados usam uma seed aleatória persistida no servidor. `profile-banner.ts` determina geometria, ritmo, fase e rotação estáveis por conta; `nameColor` define a cor. O efeito atual usa superfícies SVG contínuas, iluminação em gradiente e distorção de região limitada, com movimento próprio por composição e pausa em `prefers-reduced-motion`. Não usa canvas, timers de renderização ou sorteio a cada abertura.

A concessão deixa uma notificação pendente persistente na conta, inclusive offline. O inbox autenticado expõe essa pendência somente ao titular; `POST /dm/awards/gold-badge/claim` a confirma uma única vez para uma sessão visível. O aviso usa o emblema oficial e abre o próprio perfil. É uma notificação de conta, sem criar conversa ou mensagem artificial; a preferência de avisos de DMs não suprime esse recebimento. Concessões repetidas são idempotentes e não criam novos avisos.

Contratos: `POST /dm/people/:username/gold-badge` (owner, origem validada); `POST /dm/awards/gold-badge/claim` (própria conta); `PATCH /account/profile` aceita `showGoldBadge` e `bannerStyle`, mas rejeita concessão ou seed enviados pelo cliente. Os aliases autenticados `/d2/api/dm` e `/d3/api/dm` usam o mesmo handler.

Validação/publicação em 16/11/2026: 31 testes UI/stores e 13 do cliente passaram; 34 testes do backend passaram também no Android, com contas e armazenamento isolados. Há teste adicional para o owner conceder ao próprio perfil mesmo quando sua identidade administrativa não aparece na listagem. Playwright verificou owner/não-owner, concessão, esconder o emblema, trocar lava/sólido, variantes oficiais de tema, movimento real, `prefers-reduced-motion`, aviso de recebimento e abertura do próprio perfil. Não foram concedidos emblemas a contas reais nos testes.

GitHub Pages publicou `4df70a1`, execução `43963000061`; os quatro bundles e `admin.js` conferiram por SHA-256. D2: `gold-badge-4df70a1`; D3: `index-BT4b87gh.js`. Backup restrito de código/contas e template D2: `~/.local/share/organizeon/rollback/gold-badge-20261116-184311/`; frontend: `~/organizeon/backend/staging/d3-gold-badge-rollback-20261116-184432/`. Restaurar código não exige restaurar contas; preservar concessões e alterações posteriores ao backup. Senhas, cargos, permissões e tokenVersion foram comparados sem imprimir credenciais e permaneceram iguais. Xiaomi e Survival ficaram ativos.


## Fundos fluidos: 12 composições

A revisão atual substitui as partículas/bolhas anteriores por superfícies contínuas em toda a área do banner, seguindo as referências visuais de dobras, tecido líquido, mármore e gradientes ondulados. `fluid-paths.ts` define uma geometria própria para cada composição; `profile-banner.ts` determina variações por seed; `lava-banner.tsx` aplica iluminação e distorção SVG em uma região limitada. CSS controla trajetórias próprias por família e respeita movimento reduzido.

| Família | Composição e movimento |
| --- | --- |
| silk | Dobras largas de tecido líquido, balanço e expansão |
| vortex | Superfícies envolventes com rotação central |
| dunes | Camadas curvas amplas com deriva lateral |
| diagonal | Faixas diagonais com deslizamento cruzado |
| folds | Dobras intercaladas com compressão e torção |
| aurora | Cortinas translúcidas com inclinação oscilante |
| marble | Veios e superfícies sinuosas com distorção |
| waves | Ondulações repetidas com deslocamento horizontal |
| helix | Fitas cruzadas com torção alternada |
| cascade | Cortinas verticais com deslocamento descendente |
| storm | Superfícies turbulentas com rotação e deformação |
| mist | Composição difusa e sem contornos duros |

As doze famílias têm geometrias diferentes; não são doze velocidades do mesmo objeto. Não há elipses/partículas no renderer atual. A seed mantém composição, cor e movimento estáveis entre sessões até um reroll autorizado. Emblema, concessões e notificações seguem os contratos anteriores.

## Seed visível e reroll com cooldown

Na edição de aparência, quem tem o emblema pode ver/copiar a seed e gerar outra. A prévia mostra o fundo resultante. O primeiro reroll é liberado imediatamente; os seguintes exigem **24 horas corridas** para contas comuns, independentemente de login, tema ou dia do calendário. **Owner não tem cooldown**, inclusive se existia uma data de bloqueio anterior.

`POST /dm/awards/gold-badge/reroll` usa somente a conta autenticada, verifica o emblema persistido e gera 16 bytes aleatórios no servidor. Não aceita seed, usuário ou horário escolhidos pelo cliente. A seed inicial continua derivada da conta; depois do reroll, `profileBanner` guarda seed, data da geração e próxima liberação. A resposta pública inclui `bannerSeed` e `bannerRerollAvailableAt`, ambos somente leitura em `PATCH /account/profile`.

Para contas comuns, durante o cooldown o backend retorna 429, `Retry-After` e `retryAt`, inclusive após reinício ou pedidos simultâneos. A persistência de contas usa fila de gravação e rename atômico para não disputar o mesmo arquivo temporário com edições concorrentes. O reroll não altera cargos, senhas, tokens, emblemas ou notificações.

A interface aguarda confirmação real antes de trocar a seed. Se a resposta se perder, faz uma leitura de reconciliação e não repete o POST automaticamente. A contagem regressiva roda localmente enquanto a edição estiver aberta, com limpeza do intervalo. Cancelar a edição reverte opções ainda não salvas, mas um reroll já confirmado é imediato e conserva seu cooldown.

Validação da revisão de lava/reroll: 36 testes de UI/stores, 37 do backend (também no Android em staging isolado) e 13 do cliente passaram. A prévia comparou as 12 famílias, quadros diferentes e movimento reduzido. Playwright mobile verificou visualização/cópia da seed, troca após confirmação, prévia, botão bloqueado, contador local e preservação das opções de aparência. Foram testados cooldown após reinício, prazo de 24h inclusive no limite de 1 ms, chamadas simultâneas, edição concorrente, origem/autenticação e `Retry-After`. Nenhum reroll foi enviado a contas reais nos testes.

Publicação estática `d370a6f`, execução `43969075612` concluída; quatro bundles conferidos por SHA-256. D2 usa `daily-reroll-d370a6f`; D3, `index-vAvuPEdu.js`. Rollback restrito de backend/contas/template: `~/.local/share/organizeon/rollback/daily-reroll-20261116-192001/`; frontend: `~/organizeon/backend/staging/d3-daily-reroll-rollback-20261116-192139/`. Para rollback completo, reverter também os commits da versão estática e restaurar os módulos/template/index correspondentes; trocar apenas a query de cache não restaura arquivos antigos do GitHub. Preservar o arquivo atual de contas para manter seeds, cooldowns e concessões posteriores ao backup.


A isenção de owner é calculada pelo backend com o cargo atual persistido. O perfil expõe `bannerRerollUnlimited` somente leitura e não devolve data de bloqueio para owner. Alterar o cargo apenas no corpo da requisição não contorna o cooldown de outra conta. A interface mantém o bloqueio de pedidos enquanto uma resposta está pendente, mas libera o próximo reroll assim que o anterior for confirmado para owner.

Publicação da revisão de composições contínuas/owner: `96ff05b`, execução Pages `43973196207` concluída; os quatro bundles públicos conferiram por SHA-256. D2 usa `fluid-owner-96ff05b`; D3, `index-ByuZRJ66.js`. Passaram 38 testes do backend também no Android, a suíte de 37 testes UI/stores, cinco testes específicos do controle de seed e 13 do cliente. Navegador confirmou duas gerações consecutivas de owner e o bloqueio/contador de conta comum, além de cópia, preservação de aparência e movimentos das 12 composições. O teste do renderer impede a volta de partículas por elipses e verifica geometrias distintas.

Rollback de backend/template/contas: `~/.local/share/organizeon/rollback/fluid-owner-20261116-194510/`; frontend D3: `~/organizeon/backend/staging/d3-fluid-owner-rollback-20261116-194836/`. Restaurar versões correspondentes do site estático, template e módulos; preservar dados atuais de contas. Não houve reroll real nos testes nem alteração de credenciais, cargos ou permissões.

## Materiais adicionais selecionáveis

Em Editar aparência, o catálogo oferece Slime, Bolhas, Gradiente, Lava, Estrelas e Arcos de cor, além de Cor sólida e dos 12 fluidos existentes. O material é salvo separadamente como `bannerStyle`: `slime`, `bubbles`, `gradient`, `magma`, `stars`, `rainbow`. `lava` continua identificando as 12 composições anteriores para preservar seeds e perfis existentes. O renderer mapeia `magma` para a nova composição de lava. Selecionar um material não gera outra seed; o reroll mantém sua regra de owner livre e demais contas com 24 horas.

Todos os materiais animados exigem emblema no backend. A validação de perfil e a representação pública reconhecem os mesmos valores. A prévia usa o mesmo renderer do perfil. Movimento reduzido desativa as animações. Pesquisa de referências: exemplos oficiais do three.js (lava/ocean), Vanta (waves/fog) e Codrops (ambient backgrounds); a implementação usa SVG/CSS locais sem acrescentar bibliotecas gráficas.

### Validação e publicação dos materiais (2026-11-16)
- Código: `89b974a`; distribuição: `e6b3e1c`.
- TypeScript, builds client/admin/D3, 39 testes de UI, 13 testes de distribuição e 7 testes backend passaram. Os 7 testes backend também passaram no Termux com fixtures isoladas.
- Catálogo dos seis materiais inspecionado em screenshot de navegador; animação e reduced motion verificados. Sem validação de toque em aparelho físico nesta etapa.
- D3 publicado por substituição atômica do index e sobreposição dos assets, sem reiniciar o serviço. Rollback: `~/organizeon/backend/staging/d3-material-rollback-20261116-202310/` (index, fontes e pacotes anteriores).
- Backend: alteração restrita à validação/serialização de `profiles.mjs`, com cópia anterior em `~/.local/share/organizeon/rollback/material-catalog-*`. Para rollback, restaurar esse arquivo e reiniciar somente `organizeon-backend`; restaurar o template D2 do mesmo backup se necessário.
- API health 200; processos D3, Survival e sessão tmux Xiaomi preservados. Nenhum envio Xiaomi, DM, concessão de emblema ou reroll de conta real foi usado nos testes.
- GitHub Pages execução `43978832943` concluída; hashes SHA-256 dos quatro bundles públicos conferidos com a distribuição local. D2 passou a usar `material-catalog-e6b3e1c-final` nas quatro referências. D3 login e asset `index-wJJGFT1f.js` responderam HTTP 200.

## Renderizações independentes de materiais
A primeira versão dos materiais reutilizava `fluidPath`, tornando slime, lava, gradiente e arcos visualmente semelhantes. `material-banner.tsx` agora separa os desenhos e movimentos:
- Slime: fios elásticos ancorados no topo, gotas arredondadas, reflexos e poça inferior. Referências: https://www.scienceinschool.org/article/2024/the-science-of-slime/ e referências visuais de slime esticado e brilhante.
- Bolhas: metaballs com blur/limiar alfa; massas se unem e se separam, em vez de círculos vazados subindo.
- Gradiente: manchas difusas sem contornos ou faixas de tecido.
- Lava: crosta escura irregular, fissuras quentes e pulsação térmica.
- Estrelas: pontos com profundidades, cintilação e estrela cadente.
- Arcos de cor: anéis espectrais com precessão.
`lava-banner.tsx` mantém as 12 composições antigas e delega somente materiais explícitos ao novo módulo. Seed, APIs, permissões e cooldown não mudam. Nenhum loop JavaScript de frames ou dependência gráfica foi adicionado. IDs SVG usam useId; reduced motion desativa as animações, incluindo animationName inline.

Validação desta correção: 40 testes de UI passaram, incluindo três testes específicos de renderização; após o ajuste final de geometria/reduced motion, os três específicos passaram novamente. Typecheck, build client/admin, build D3 e 13 testes de distribuição passaram. Capturas desktop/mobile do catálogo inspecionadas; transformação animada e reduced motion verificados no Chromium headless. Toque físico não testado. Distribuição `f873486`, Pages `43981225320` concluído; quatro bundles públicos com SHA-256 conferido. D2 usa `independent-f873486`; D3 entry `index-CZXZCQ-_.js` e asset retornam 200. Rollback de fontes, index e template anterior: `~/organizeon/backend/staging/d3-independent-rollback-20261116-203958/`; restaurar index/template e fontes desse diretório, sem remover os assets antigos. Nenhum restart de serviço ou alteração de backend nesta correção.

## Remoção de Lava e Slime
Removidos os materiais selecionáveis `magma` (Lava) e `slime`. Perfis antigos com esses valores deixam de renderizar o efeito; o editor normaliza a seleção para Cor sólida sem modificar dados da conta ao abrir. As 12 composições de Fluidos (identificador histórico `lava`) continuam disponíveis, assim como Bolhas, Gradiente, Estrelas e Arcos de cor. APIs e registros existentes preservados.
