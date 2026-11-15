# Desenvolvimento e arquitetura

## Fluxo de entrada

1. O kernel `index.html` verifica `index-version.txt` e `version.txt`.
2. `download-manifest.json` lista cada arquivo do cliente com tamanho e SHA-256.
3. `config.js` fornece a origem da API e o caminho do módulo da aplicação.
4. `auth-client.js` valida a sessão e conecta os serviços, preferências e superfícies React.
5. O módulo principal e os chunks Vite residem em `assets/`; catálogo e jogos ficam em `games/`.

O kernel precisa operar antes que a UI do cliente exista e também precisa conseguir reparar uma instalação parcial. Por isso seu diálogo de atualização permanece HTML/CSS independente: importar React/shadcn dali dependeria dos mesmos arquivos que o kernel está tentando baixar.

## Interface React

`ui/` contém a fonte editável. A configuração shadcn está em `ui/components.json`; os componentes usam os wrappers Base UI do projeto D3, variantes de `class-variance-authority`, Tailwind e ícones Lucide.

```text
ui/src/
├── admin/                 shell e páginas da administração
├── client/                bridge de montagem e integração com DOM existente
├── components/client/     login, dados, perfil, proxy, catálogo, preferências e diálogos
├── components/ui/        Button, Card, Dialog, Tabs, Sidebar, Table, Sheet…
├── hooks/                 estado de viewport
├── lib/                   utilitários e composição de classes
├── styles/                tokens semânticos, tema escuro e motion
└── test/                  configuração do Vitest
```

O estado de sessão, API e armazenamento continua no controlador de integração. Componentes recebem props e callbacks; não acessam `localStorage`, endpoints ou globais da página por conta própria. Os overlays do cliente usam Shadow DOM; catálogo e administração carregam os estilos Tailwind escopados por `.organizeon-ui`. Os portais de Dialog/Sheet recebem um container explícito. Isso mantém os estilos fora do restante do cliente.

Tabs, Sidebar, Dialog, Select, Button, Input, Card, Table, Sheet, Tooltip e Sonner usam componentes compartilhados. Animações curtas seguem os estados Base UI (`data-starting-style`, `data-ending-style`) e respeitam `prefers-reduced-motion`. Controles de toque do jogo continuam HTML específico porque representam teclas pressionáveis do próprio jogo, não navegação ou ações administrativas.

O painel administra os mesmos IDs/rotas que `admin.js` já controla. A camada React mantém shell, navegação, diálogo, tabelas e estados visuais; `admin.js` permanece responsável pelos contratos existentes da API, WebSocket, gráficos e terminal. Não altere payloads ou permissões para acomodar o visual.

## Dependências organizadas

| Diretório atual | Conteúdo |
| --- | --- |
| `vendor/bare-mux/worker.js` | Worker de transporte BareMux |
| `vendor/epoxy/index.mjs` | Transporte Epoxy usado com Ultraviolet |
| `vendor/libcurl/libcurl.mjs` | Transporte libcurl usado com Scramjet |
| `vendor/ultraviolet/uv.*` | Bundle, cliente, handler, service worker e configuração UV |
| `vendor/scramjet/scramjet.*` | Bundle, sincronização XHR e WebAssembly do Scramjet |
| `vendor/xterm.*` | Terminal do painel administrativo |

Os diretórios antigos `kzds`, `omhy`, `onsc`, `rlr` e `xzmo` foram removidos. `tbojzp.js`, a configuração UV e `assets/client-runtime-paths.js` agora apontam para `vendor/` e para o prefixo `/proxy/ultraviolet/`. O cliente deve ser baixado novamente para receber esses caminhos. Os chunks `assets/jdht-*` restantes conservam nomes com hash, que são IDs gerados pelo build Vite e fazem parte do grafo de imports.

## Código não recuperável

O repositório contém o kernel, os controladores do cliente e os bundles distribuídos. O app autenticado principal está somente em chunks compilados, sem mapas nem fontes React originais. O cliente público consultado também só tinha bundles. Não há fonte suficiente para refazer suas páginas, abas e jogos sem reimplementar regras de negócio desconhecidas; elas permanecem mapeadas em [UI-MAP.md](UI-MAP.md). Os arquivos HTML independentes de jogos e os controles de toque também têm ciclos de vida próprios.

## Verificação

```sh
npm run typecheck:ui
npm run test:ui
npm run build:ui
npm test
```

Os testes de UI usam Vitest, Testing Library e jsdom para validar alternância de login, contratos de submit, erros, preferências controladas e tabs. Os testes do repositório verificam manifestos, catálogo, integrações e arquivos dos jogos. Eles não equivalem a inspeção visual em navegador real; registre esse limite se não houver browser disponível.

Depois de `npm run build:ui`, execute `node scripts/update-manifest.mjs` e `npm test`. O `index.html` e o arquivo `releases/organizeon-kernel-2.7.0.html` são kernels separados da distribuição do cliente; se o kernel mudar, alinhe seu `loaderVersion`, `index-version.txt` e a cópia pública do servidor separadamente.

## Publicação

O domínio OrganizeOn serve o kernel `/d1` e a aplicação D2 pelo backend Android; este repositório é a origem estática do cliente, não do proxy D2/D3. Faça a publicação da nova distribuição pelo fluxo GitHub Pages utilizado pelo projeto. Após publicar, valide a versão do manifesto e baixe um cliente novo pelo kernel. Não altere rotas do backend para uma mudança exclusiva deste repositório.
