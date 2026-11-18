# Eaglercraft: arquivos ZIP originais

O catálogo oferece 1.5.2, 1.8.8, 1.12.2 e 26.2. Beta 1.3 foi removido. O botão entrega o **ZIP original**, sem descompactação automática ou conversão para HTML. Tamanho e SHA-256 são conferidos antes da entrega ao navegador.

1.5.2 e 1.8 tentam as fontes GitHub cadastradas, recorrendo ao servidor quando falham. As cópias locais podem ser revisões diferentes, portanto possuem hashes e nomes próprios. 1.12 e 26.2 usam diretamente os pacotes locais disponíveis; não há URL GitHub inventada para eles.

## Armazenamento e recuperação

Pacotes fornecidos em `/sdcard/debug`, instalados em `~/organizeon/backend/game-downloads/`:

- `Eaglercraft_1.5.2_Offline.zip`
- `eaglercraft1-8-62.zip`
- `eaglercraft1-12.zip`
- `eaglercraft-26.2.zip` — 57.907.967 bytes, SHA-256 `d6714264dbc9beaaef8523b1d6e20f0eb7c6b86f46d54639aadb8ebcb540b7d5`.

A allowlist `downloads.json` informa tamanho e SHA-256; sua cópia de recuperação está em `server-backup/game-downloads.json`. Os ZIPs não são enviados ao GitHub; restaure-os do armazenamento/backup para recriar o serviço.

## Contratos

Backend: `src/game-downloads.mjs`, `GET|HEAD /d1/downloads/<arquivo.zip>`, streaming, Content-Disposition attachment, CORS para o client GitHub Pages. Só arquivos listados são servidos; manifesto, HTML executável e demais arquivos não são expostos.

Client: `core/games/external-download.js`, `fetchExternalGame(download, options)`. Retorna `bytes`, `filename`, `contentType` e `source`. Falhas HTTP/rede/timeout/integridade tentam a próxima origem cadastrada, se houver. Progresso identifica a origem real, inclusive quando OrganizeOn é a primária. Não há extração ZIP no client.

## Publicação e rollback

Atualização do catálogo/runtime e adição do pacote à allowlist, sem mudar backend, proxy, autenticação ou banco e sem reiniciar serviço nesta revisão. Backup anterior em `~/organizeon/backend/staging/eagler-26-backup/`: restaurar `live-client/` e `downloads.json` para voltar ao catálogo anterior. O ZIP pode permanecer fora da allowlist.

## Testes

Testes unitários incluem fallback, integridade, arquivos incompletos, origem real e entrega de ZIP intacto com MIME/nome corretos. `ui/e2e/eagler-fallback.cjs` compara o ZIP efetivamente baixado com o SHA-256 do catálogo. `game-download-regression.cjs` verifica jogos anteriores, ausência do Beta e presença do 26.2. A validação de download não certifica gameplay de cada distribuição externa.

## Resultado da revisão ZIP — 18/11/2026

Runtime `v2-3bdcab83e4661698`: 17 testes passaram. Navegador mobile automatizado baixou pelo `/d1/live` o ZIP original 26.2 (57.907.967 bytes) e o ZIP 1.5.2 (9.283.201 bytes), conferindo hashes e nomes. Jogos simples e com vários arquivos continuaram passando, e o teste confirmou ausência do Beta e presença de “Baixar ZIP” no 26.2. Backend permaneceu no mesmo PID durante esta publicação; D3/D4 e Xiaomi continuaram ativos.
