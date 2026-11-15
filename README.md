# OrganizeOn Static Client

Este repositório publica o kernel de atualização e os arquivos do cliente OrganizeOn. O kernel lê `download-manifest.json`, verifica hashes SHA-256, baixa a distribuição e inicia a aplicação autenticada.

## Estrutura

- `index.html`: kernel de atualização, independente do cliente baixado.
- `config.js` e `auth-client.js`: configuração, autenticação e integração de telas do cliente.
- `ui/`: fonte React/TypeScript da nova interface, com wrappers Base UI no padrão shadcn/ui, Tailwind e Lucide.
- `ui-dist/`: bundles estáveis usados pelo cliente e pelo painel administrativo.
- `admin.html` e `admin.js`: entrada do painel e controlador dos contratos da API existente.
- `assets/`: aplicação principal Vite compilada e seus chunks com hash de build.
- `vendor/`: dependências do cliente em diretórios organizados por função.
- `games/`: catálogo, motores e arquivos dos jogos.
- `download-manifest.json`, `version.txt` e `index-version.txt`: integridade e versões.
- `test/`: testes estáticos e de integridade; `ui/src/**/*.test.tsx`: testes de interação React.

## Desenvolvimento

```sh
npm install
npm --prefix ui install
npm run typecheck:ui
npm run test:ui
npm run build:ui
npm test
node scripts/update-manifest.mjs
```

`build:ui` precisa terminar antes de atualizar o manifesto. O cliente baixa os arquivos listados nele; arquivos novos da UI e dependências precisam entrar no manifesto. O script calcula hashes e tamanhos e atualiza `version.txt`.

O código-fonte React/Vite da aplicação principal não está neste repositório nem na distribuição pública consultada; `assets/jdht-*` são chunks de produção cujos nomes e imports formam um grafo. Preserve esses chunks sem alterações funcionais. `assets/client-runtime-paths.js` concentra os caminhos dos runtimes que foram reorganizados em `vendor/`.

Consulte [DEVELOPMENT.md](DEVELOPMENT.md) para a arquitetura, contratos e fluxo de publicação, e [UI-MAP.md](UI-MAP.md) para o inventário de telas, estados e dependências.
