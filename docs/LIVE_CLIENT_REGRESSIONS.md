# Correções do client e /d1/live — 18/11/2026

## Causas verificadas

1. O backend principal aplicava `X-Frame-Options: DENY` inclusive ao HTML do admin servido por `/d1/live/admin.html`. O handler live agora sobrescreve apenas suas respostas para `SAMEORIGIN`; as demais aplicações preservam a política anterior. Autenticação e confirmação administrativa não mudam.
2. O botão dos jogos era renderizado por React com `disabled=true`, mas o código legado alterava somente a propriedade HTML. O botão parecia habilitado, enquanto o handler React continuava suprimindo cliques. `mountGameCard` agora fornece um controlador `update`, e prontidão/instalação/progresso são propriedades explícitas.
3. A URL local de cache era usada também para baixar os pacotes. No live, esses arquivos não estão no servidor. O download agora usa GitHub Pages; a chave de cache continua na origem do client, com SHA-256 conferido antes de instalar. Headers incompatíveis com iframe são removidos somente da resposta local dos pacotes verificados. O catálogo usa revisão do client para evitar mistura de versões.
4. O repositório `tonydsas/eaglercraftoffline` usado pelos quatro Eaglercraft retorna bloqueio 451 na API GitHub e 404 nos arquivos raw. Os botões mostram fonte indisponível, sem simular download. Reativação exige fonte disponível e permitida, tamanhos e hashes conferidos. Nenhum arquivo removido foi republicado.
5. Backups convertiam Date em objeto vazio. Isso quebrava o cookie store do Ultraviolet (`u.set.getTime is not a function`). `core/storage/portable.js` preserva Date; o leitor UV também normaliza datas antigas válidas e descarta apenas cookies com prazo inválido/expirado. Não apaga o banco nem a sessão OrganizeOn.
6. O Scramjet v1 exige `controller.createFrame`. O wrapper de iframe dentro de srcdoc não registrava o frame; navegar após a pesquisa podia falhar em `descriptors`. `core/proxy/frame-session.js` usa o frame nativo do motor, com ciclo de vida, atualização de URL e limpeza. Controles ficam fora do frame. URLs HTTP de links normais abrem no mesmo contexto; âncoras locais, downloads, botões e javascript:void(0) preservam comportamento próprio. Links são associados antes de terminar o carregamento, para não depender de scripts de tracking ou popups do buscador.
7. Os avisos Sonner estavam no modo recolhido. O Toaster compartilhado usa pilha expandida, gap e animação da biblioteca. A preferência “Avisos do client” desativa avisos de modo mobile/conexão/carregamento. Avisos de erro permanecem disponíveis. A preferência é persistência local apropriada, não estado de autenticação.
8. Favicon e metadados PWA apontavam para Fern. O live usa os arquivos oficiais em `brand/`; o client acompanha o tema com ícone branco/preto. O admin também recebe favicon próprio.

## Validação

- Typecheck e builds de client/admin; unitário de prontidão do GameCard e roundtrip de Date.
- Backend: 45 testes, incluindo header do runtime live.
- `proxy-storage-regression.cjs`: motores reais, banco79, cookie legado com set inválido/string, botões, AJAX, redirects, formulário, canvas/toque e mobile.
- `game-download-regression.cjs`: download real de Neon Snake do GitHub, integridade, cache e execução com canvas; estado indisponível do Eagler sem download falso.
- `toast-stack.cjs`: três avisos sem interseção, reposicionamento após fechar o intermediário e clique no conteúdo abaixo.
- `client-settings-admin.cjs`: preferência aplicada, aviso suprimido e favicon; montagem real do admin num iframe de mesma origem com APIs substituídas por respostas de teste sem acesso. Nenhuma senha/admin real é enviada nesse teste.
- `live-navigation.cjs`: pesquisa real no Bing e clique no resultado oficial via redirects. Os testes externos usam o relay público no modo convidado; não garantem compatibilidade de todos os sites ou jogos.

## Operação

Servidor live: `~/organizeon/backend/live-client`. Gerar com `node scripts/update-manifest.mjs` e `node scripts/build-live-client.mjs`. O runtime deve ser reconstruído após o build client/admin. Nenhum pacote de jogo é colocado no Android por esse build; eles continuam sob demanda no GitHub.

A revisão do service worker é `proxy-runtime-4`. Atualizar a página permite ativar o runtime novo; não é necessário apagar cookies, cache geral ou perfis. O código do backend fica na cópia de recuperação em `server-backup/organizeon-backend-source.tar.gz`, sem dados/segredos.

Rollback privado desta publicação: `~/organizeon/backend/staging/live-regressions-20261118/backup/`. Restaurar somente o handler, runtime e template D2 anteriores; recarregar apenas o backend se restaurar código Node. Não substituir bancos nem reiniciar Xiaomi/D3/D4. Não houve alterações de túnel, DNS ou portas.
