# Visualizador de imagens das DMs

Tocar em uma imagem carregada abre um visualizador em tela cheia, com fundo preto, imagem inteira, autor/data e controles de zoom. Há zoom por botões, roda, duplo toque/clique e pinça; arrastar move a imagem ampliada. X, Escape, botão voltar e gesto vertical sem zoom fecham a tela. A pergunta sobre o banner do perfil se referia à resolução: continua 768×256 pixels, sem novo comportamento de clique.

## Componentes e contratos

`ui/src/features/media/image-viewer.tsx` é independente de páginas e serviços. Recebe `open`, `onOpenChange`, `src`, `name`, metadata e callbacks opcionais. Usa Dialog/Dropdown Menu compartilhados (shadcn/Base UI), Lucide e transições de 160ms, respeitando movimento reduzido. Não interpreta HTML nem executa comandos.

`MessageMedia` continua responsável por obter o anexo através de `dmService.attachment` e da sessão autenticada. Reabrir a tela usa o mesmo Blob URL e não baixa novamente o anexo do servidor. O visualizador prepara URLs locais de ação apenas enquanto aberto e revoga seus próprios recursos ao fechar. O dono da miniatura preserva e libera sua URL no ciclo de vida existente.

`MessageRow` fornece autor/data e contexto; `MessageThread` liga favoritos e encaminhamento aos fluxos reais do store. Encaminhar ou Reagir espera a janela liberar o foco antes de abrir o seletor já existente. Ir para a mensagem fecha o visualizador, rola até o artigo e devolve o foco. Não há favoritos simulados: a estrela usa a ação bookmark da mensagem.

## Menu

- Salvar imagem: download local dos bytes do anexo.
- Encaminhar: abre a seleção de conversa existente; não envia automaticamente.
- Compartilhar: aparece quando Web Share está disponível; envia um File ao compartilhamento nativo mediante clique. A compatibilidade depende do navegador e do sistema. Cancelamento não é erro.
- Abrir em nova aba: usa URL Blob local, sem publicar o anexo nem expor credenciais.
- Ir para a mensagem: mantém a conversa e retorna à origem.

Não se cria endpoint público de mídia nem se altera a autorização dos anexos. Cada origem mantém seu transporte autenticado (client/D2/D3/D4).

## Testes e limites

`ui/e2e/media-viewer.cjs` sobe Vite temporariamente em localhost e exercita o MessageRow real com transporte de teste. O teste verifica tela cheia, zoom/pinça por eventos de toque do Chromium, download real, nova aba, favorito, compartilhamento de File, voltar/Escape/gesto, foco, transição para encaminhamento/reações e apenas uma leitura do anexo. Capturas mobile/desktop foram inspecionadas. Web Share é substituído por uma implementação de teste para conferir os arquivos; a folha nativa do Android não foi testada em aparelho físico. Nenhuma DM real é enviada.

O documento de teste e o harness não são entradas dos builds nem rotas publicadas. O processo de testes fecha navegador e Vite ao terminar. O módulo é sincronizado para D3 por `scripts/sync-profile-ui.mjs`; os painéis reutilizam os mesmos componentes, sem serviços novos.

`ui/e2e/media-viewer-integration.cjs` valida também o bundle compilado, dentro do ShadowRoot e do painel de DMs real, ligado ao store/handler HTTP reais em memória. Confirma anexo privado, estrela persistida e encaminhamento com anexo para outra conversa de teste. `MEDIA_PUBLIC=1` repete usando os bundles do GitHub Pages. Não altera a base de produção.

Referências: [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share), [Pointer Capture](https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture).

## Correção associada no D4

Mover para a lixeira ou restaurar uma mensagem volta à lista da pasta de origem. A pasta de destino não é aberta automaticamente. O teste `ui/e2e/d4-html.cjs` confirma PATCH com folder trash e retorno à entrada, usando API de teste e bundles reais, sem alterar e-mails de produção.

## Publicação e rollback

Somente arquivos estáticos. Preservar os assets com hashes antigos no Android, guardar índices D3/D4 e template D2 antes da troca atômica. O client/D2 usa bundles do GitHub Pages: rollback exige republicar os artefatos anteriores pelo Git, além de restaurar o template, se necessário. D3/D4 podem retornar aos índices anteriores porque os assets antigos permanecem. Não reiniciar backend, túnel, SSH, Xiaomi ou serviços de e-mail.

Fonte `f84617a`, build `8cbdcb0`, Pages `44193171098` concluído. D2 usa revisão `dm-viewer-f84617a`; hashes dos quatro bundles públicos client/admin conferidos. Backup de índices, template e módulos D3 em `~/organizeon/backend/staging/dm-viewer-20261117-194831/backup/`. Backend PID 23616, D3 PID 7602, D4 PID 4047 e tmux Xiaomi mantidos.

TypeScript, builds client/admin/D3/D4, 17 testes relevantes da interface e 13 testes de distribuição passaram. O teste completo do visualizador passou em mobile/desktop; a integração com o store real isolado passou localmente e com os bundles públicos. O teste D4 também passou com o build publicado, confirmando que mover à lixeira retorna à pasta de origem. Capturas dos dois testes de navegador foram inspecionadas.
