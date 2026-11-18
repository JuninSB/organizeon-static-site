# Pesquisa web e notificações de retorno

## Problemas corrigidos

- Ultraviolet abria `__op` obrigatoriamente na versão 1. Backups restaurados chegavam à versão 79. Agora a abertura aceita a versão existente e migra somente stores/índices ausentes, preservando dados.
- A restauração de backup subia a versão do IndexedDB em toda importação. `core/storage/indexed-db.js` passa a alterar a versão somente quando falta esquema; exportação também preserva índices. Backups antigos continuam aceitos.
- Scramjet v1 também exigia versão 2. A biblioteca vendorizada aceita a versão existente; a preparação repara stores sem downgrade.
- O controlador invalida a configuração do service worker por mensagem `loadConfig`. O wrapper mantinha uma promessa antiga de configuração pronta e chamava `route` com config indefinida. Só a preparação do esquema fica em cache; a configuração é verificada em cada operação.
- O WASM do Scramjet tem dois usos: fetch binário de inicialização e script reescrito pelo service worker para páginas. A rota do worker agora atende o destino `script`, devolvendo o JavaScript gerado pelo próprio motor, e preserva o WASM binário nos demais fetches.
- A pesquisa tratava falha de preparação como espera sem fim. A promessa propaga falhas e a tela mantém os controles com opção de tentar novamente.
- O wrapper tem viewport mobile e permite capacidades de jogos compatíveis. O botão dos Browser Controls responde a toque e teclado, além de hover.
- `#inject=https://...` era consumido pelo normalizador de rotas antes do componente. Agora é preservado, validado para HTTP/HTTPS e tratado por módulo com ciclo de vida e hashchange. A opção chama-se “Abrir links recebidos automaticamente”; não injeta scripts nem altera motor/WISP.

## Container e limites

O destino em `?query=` é estado de navegação em Base64, não criptografia. O conteúdo abre em iframe, com Browser Controls fora dele. O sandbox limita navegação do topo por omissão de permissões e mantém scripts/forms/pointer lock/tela cheia quando suportados. **Mesmo domínio com allow-scripts e allow-same-origin não é uma fronteira forte de segurança.** Não declarar isolamento equivalente a outro domínio ou a uma VM. Separação de origem exigiria hospedagem própria do runtime de navegação em origem distinta e integração de transporte; isso não foi implementado nesta correção.

A identificação HTTP existente já escolhe variante mobile no celular. Viewport, toque e orientação continuam dependentes do navegador e do site. Não há conversão automática de jogos desktop em jogos touch nem garantia para todo site, DRM, CAPTCHA ou motor WebGL.

## Ping do seletor WISP

`core/network/wisp-monitor.js`: rodada imediata e a cada 1000ms enquanto o seletor está aberto. Cada endpoint tem somente uma medição pendente. Fechamento cancela timer e handshakes pendentes via AbortSignal. O valor exibido continua sendo o tempo de abertura WebSocket, não um pacote ICMP nem o RTT de uma conexão persistente.

## Resumo ao retornar

`POST /dm/notifications/unread-summary`, autenticado e protegido por origem. `dm_summary_receipts` mantém watermark de mensagens por conta, atualizado em transação. Conta apenas mensagens recebidas, não apagadas, ainda não lidas e posteriores ao watermark anterior. Concorrência entre abas/dispositivos não duplica o lote. Não marca mensagens como lidas.

O primeiro carregamento da sessão chama o endpoint quando notificações estão habilitadas. Exibe “Você tem X mensagens não lidas” e Abrir. Novas mensagens enquanto online preservam foto/remetente/prévia. Lotes já apresentados não reaparecem na próxima entrada; não há dependência de localStorage para essa decisão.

## Testes

- Backend: 45 testes incluindo consumo único do resumo e contagem só de novas mensagens.
- TypeScript, builds client/admin/D3/D4 e testes de store/monitor/injeção.
- `ui/e2e/proxy-storage-regression.cjs`: motores reais, service worker, IndexedDB versão79, dados preservados, invalidação loadConfig, restauração estável, cliques JS/void, fetch, redirect HTTP, formulário, canvas com toque, UA/viewport mobile. Transporte local controlado; nenhum site externo é simulado na aplicação publicada.
- `ui/e2e/live-search-local.cjs`: client completo, relay público real e página externa no container; captura de controles. Diagnóstico altera apenas a cópia temporária live-dist, nunca publicar essa cópia sem reconstruir com `build-live-client.mjs`.
- `ui/e2e/wisp-picker.cjs`: seletor real, cadência e encerramento. WebSocket simulado apenas no teste para medir o ciclo de vida sem abrir conexões reais repetidas.

As mudanças em `rlr/obmw.bundle.js` e `xzmo/grhp.all.js` são patches locais sobre bibliotecas vendorizadas; ao atualizar os motores, revisar e reaplicar somente se ainda necessários. Licenças e créditos originais permanecem.

## Publicação e rollback

Runtime: reconstruir com `node scripts/update-manifest.mjs` e `node scripts/build-live-client.mjs`. D3/D4 usam assets novos e índices atômicos, preservando hashes antigos; no D4 o `d4.html` do build vira `index.html` no servidor. D2 recebe revisão do bundle após Pages concluir e verificação de SHA-256.

Backup privado: `~/organizeon/backend/staging/search-summary-20261117/backup/` (código, runtime, índices e snapshot consistente do DM ativo). Restaurar código/índices anteriores e recarregar somente backend se necessário. A tabela de recibos é aditiva; não substituir banco ativo por snapshot antigo sobre mensagens novas. O Xiaomi não participa desta alteração.

### Verificação publicada

Código `fd647ac`, distribuição `7aa8ff4`, Pages execução `44211727938` concluída. Os quatro bundles client/admin tiveram SHA-256 público comparado ao build local. D2 usa revisão `search-7aa8ff4`; D3/D4 receberam os builds compartilhados. Backend PID8346, D3 PID7602, D4 PID6525 e Xiaomi ativo após publicação; SQLite ativo passou quick_check.

A rodada final encontrou outra condição de restauração: o controlador não criava stores se um banco de versão maior já existisse incompleto. O handshake `organizeon:scramjet-schema` agora prepara o esquema antes de controller.init. O worker usa revisão explícita `proxy-runtime-3` para aguardar o controlador correto, inclusive em navegadores com workers anteriores.

`ui/e2e/live-search-public.cjs`, executado separadamente com MODE=ultraviolet e MODE=scramjet, passou para ambos no domínio público: página externa pelo relay público real, contexto mobile, bancos locais na versão79, container/controles e recarga direta da rota. Capturas reais do Chromium em `/tmp/live-search-public-{ultraviolet,scramjet}.png`. O teste do seletor WISP também passou no endereço público, usando WebSocket simulado para verificar a cadência e o encerramento. Nenhuma conversa real foi apagada nem mensagens foram marcadas como lidas para testar o resumo.

Inspeção das capturas mobile mostrou o campo de endereço comprimido por sete botões na mesma linha. O layout foi corrigido para endereço em uma linha completa e controles na linha inferior (desktop permanece em uma linha). O teste público verifica largura mínima de 300px para o endereço em viewport de 390px. As dimensões do iframe fixado usam a altura responsiva dos controles.

A pesquisa real `https://www.bing.com/search?q=roblox` também renderizou resultados pelo Scramjet no endereço público e após recarga da rota. Reprodução: `MODE=scramjet SEARCH_TARGET='https://www.bing.com/search?q=roblox' EXPECT_TEXT=Roblox node ui/e2e/live-search-public.cjs`. Esse teste usa o modo convidado e o relay público selecionado; não equivale a validar todo jogo/site ou todos os WISPs.
