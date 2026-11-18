# Eaglercraft: download alternativo no servidor

O catálogo tenta a fonte GitHub original e recorre ao servidor OrganizeOn em caso de HTTP inválido, erro de rede, timeout ou falha de integridade. Cada origem possui nome, tamanho e hashes próprios do pacote e do HTML. As revisões locais de 1.8 e 1.12 são diferentes das antigas fontes GitHub.

## Arquivos e recuperação

Pacotes de `/sdcard/debug` conferidos por CRC do ZIP e SHA-256, instalados fora do runtime/Git em `~/organizeon/backend/game-downloads/`: `Eaglercraft_1.5.2_Offline.zip`, `eaglercraft1-8-62.zip`, `eaglercraft1-12.zip`, além da allowlist `downloads.json`. Para restaurar, copie os três ZIPs do armazenamento/backup e o manifesto em `server-backup/game-downloads.json`, conferindo os hashes.

`eaglercraft-26.2.zip` não foi adicionado como novo jogo, pois não corresponde aos itens existentes. Beta 1.3 continua indisponível por ausência de pacote correspondente. Os ZIPs não foram enviados ao GitHub.

## Contratos

Backend: `src/game-downloads.mjs`, rota pública `GET|HEAD /d1/downloads/<arquivo.zip>`. Só arquivos listados são servidos como anexos ZIP, sem execução de HTML, navegação pelo filesystem ou acesso privado. Streaming limita uso de memória do Node. CORS permite download pelo client hospedado no GitHub Pages. Manifesto não é servido.

Client: `core/games/external-download.js`, `fetchExternalGame(download, options)`. Progresso identifica origem; falhas são exibidas. Só retorna HTML depois de validar tamanho e hashes. Extração existente valida também nome no ZIP.

## Rollback

Backup: `~/organizeon/backend/staging/eagler-fallback/backup/`. Restaurar `server.mjs` desse backup e os arquivos de `backup/live-client/` para `live-client/`; reiniciar somente `organizeon-backend`. Os ZIPs podem permanecer sem exposição. D3/D4/Xiaomi/túnel/bancos não são modificados.

## Validação

15 testes do client e 46 do backend aprovados. Cobertura inclui sucesso primário sem fallback, HTTP404 com fallback, hash inválido, tamanho incompleto, allowlist, CORS, HEAD/ETag e métodos indevidos. Teste backend também passou no Android. `ui/e2e/eagler-fallback.cjs` baixa HTML real e verifica SHA-256/nome, sem simular arquivos.

Publicação validada em 18/11/2026, runtime `v2-82448239b9c053ca`: navegador mobile automatizado baixou os HTMLs reais de 1.5.2 (23.536.015 bytes), 1.8 (34.880.258 bytes) e 1.12 (42.935.479 bytes) via `/d1/live`, com hashes finais corretos. O index embutido do GitHub Pages também baixou 1.5.2 usando o fallback cross-origin. D1/D2/D3/D4 responderam 200 e a sessão Xiaomi permaneceu ativa. Testes cobrem download e integridade; não certificam compatibilidade de gameplay de cada distribuição externa.
