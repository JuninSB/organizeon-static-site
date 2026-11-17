# Imagem no fundo do perfil

Em **Perfil → lápis do banner → Editar fundo do perfil**, qualquer conta autenticada pode escolher PNG, JPEG ou WebP de até 5 MB e 24 megapixels. O editor compartilhado permite recorte, zoom, posição e giros de 90°. **Esticar para preencher** começa desligado: sem ele, a proporção é preservada com recorte; ativado, a imagem inteira é ajustada ao banner. Remover fundo restaura o visual anterior, inclusive a animação quando a conta possui o emblema necessário.

## Contrato e armazenamento

`Profile.bannerImage` é uma imagem JPEG em data URI ou null; `Profile.bannerFit` aceita cover ou fill (padrão). A rotação é aplicada aos pixels pelo canvas. Saída 768×256, até 96 KB, com compressão adaptativa. O canvas intermediário é limitado a 1536px para conter consumo de memória. Nenhuma URL externa é aceita no backend. PNG/WebP de entrada são convertidos no navegador; SVG e arquivos inválidos são recusados.

O PATCH autenticado `/account/profile` usa a mesma persistência e as mesmas sessões existentes. O backend valida MIME, assinatura, codificação, tamanho e dimensões. Atualizações de outros campos preservam imagem e ajuste. A configuração vale para perfil próprio e público; a edição aparece somente no próprio perfil. Os controles de emblema/animação mantêm suas permissões anteriores. Não há alteração de senha, cargo ou tokens.

## Módulos

- `ui/src/features/profile/avatar-editor.tsx`: editor compartilhado de foto/banner, rotação e compressão.
- `profile-field-editor.tsx`, `profile-card.tsx`, `profile-dialog.tsx`: seleção, apresentação e ciclo de vida.
- `ui/src/services/profile-service.ts`: contrato tipado; store compartilhado mantém atualização otimista e sincronização existente.
- Backend `src/profiles.mjs`: validação e projeção pública; recuperação em `server-backup/organizeon-backend-source.tar.gz`.
- D3 recebe os módulos por `scripts/sync-profile-ui.mjs`; fonte recuperável no arquivo D3 em server-backup.

## Validação

Os 41 testes do backend, dez testes da interface/perfil e treze testes de distribuição passaram. Os nove testes de perfil também passaram no Android em cópia isolada do código, sem tocar em contas reais. O teste `ui/e2e/profile-background.cjs` cria uma imagem sintética e exercita conta comum, upload, giro, checkbox opcional, recorte, validação do JPEG pelo backend, reabertura, ajuste da imagem salva e remoção. Um teste de persistência em arquivo temporário confirmou o JPEG real gerado pelo editor, preservação durante outra edição e remoção. Capturas mobile e desktop foram inspecionadas. O teste desktop identificou sobreposição entre edição e fechamento; as ações de edição passaram para o canto esquerdo e o fluxo completo passou novamente. Não houve teste em aparelho físico.

## Publicação e rollback

Backup em `~/organizeon/backend/staging/profile-background-20261117-144609/backup/`. A validação do backend foi publicada com um único reinício do serviço `organizeon-backend`; novo PID 7583. D3, D4, túnel, SSH e Xiaomi mantidos. Imagens novas usam campos opcionais no armazenamento existente. Bundles compartilhados client/admin, D3 e D4 são publicados preservando assets anteriores e trocando índices atomicamente. D2 usa revisão `profile-background-20261117`. Rollback: restaurar módulos/índices anteriores e, se necessário, recarregar somente o backend; nunca substituir o banco ativo.
