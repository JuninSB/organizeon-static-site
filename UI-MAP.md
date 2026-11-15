# Mapa técnico da UI OrganizeOn

Revisado durante o rework de novembro de 2026. O mapa localiza rotas, telas, estados, contratos e os pontos editáveis.

## Rotas e entradas

| URL / contexto | Tela | Fonte ou entrada |
| --- | --- | --- |
| `/d1` | Kernel/baixador do cliente | `index.html`; versão em `index-version.txt` |
| Cliente baixado | Inicialização autenticada | `config.js` → `auth-client.js` → `config.appModule` |
| Cliente baixado | Aplicação principal, navegação, páginas e jogos | `assets/jdht-e-*.js`, chunks e CSS Vite compilados |
| Cliente baixado | Login, perfil, dados, proxy e catálogo | `auth-client.js` integra callbacks com `ui/src/components/client` |
| `admin.html` | Administração | shell React em `ui/src/admin/admin-app.tsx`; controlador da API em `admin.js` |
| `/d2/login` e demais rotas D2 | Hospedagem/autenticação do D2 | Backend OrganizeOn Android; fora da origem deste repo |
| `/d3/login`, `/d3/`, `/d3/history`, `/d3/logs`, `/d3/settings` | Dashboard Xiaomi | Projeto React em `~/organizeon/d3/frontend/src` e backend Python; fora deste repo |

## Telas React editáveis neste repositório

### Cliente e overlays

| Superfície | Componente | Comportamentos preservados |
| --- | --- | --- |
| Login e cadastro | `components/client/surfaces.tsx` → `LoginSurface` | Login por senha, cadastro, código de uso único, convidado, validação e erro inline |
| Perfil e navegação | `AccountSurface` | Sheet lateral, nome/perfil, atalhos, sair e confirmação |
| Dados | `DataSurface` | Estado/limite do backup, salvar/restaurar, apagar save(s) e preferências, confirmação |
| Proxy | `ProxySurface` | Seleção, status/latência, aplicação e modo convidado |
| Catálogo | `catalog-toolbar.tsx`, `game-card.tsx` e `auth-client.js` | Busca, filtros, categorias, estatísticas, cache, instalação/download, créditos e abrir jogo |
| Configuração de controles do jogo | `game-dialogs.tsx` | Seleção de teclas, opção canhoto do Tetris e tela cheia |
| Preferências do cliente | `preference-card.tsx` | Identidade do navegador e limite de banda do YouTube; seleção controlada e aplicação explícita |
| Avisos | `bridge.tsx` + Sonner | Estado de conexão e avisos sem listeners de toast duplicados |

### Painel administrativo

`ui/src/admin/admin-app.tsx` compõe sidebar responsiva, header, páginas por tabs, métricas, tabelas e diálogos. `admin.js` popula as regiões com IDs estáveis e mantém as APIs já utilizadas.

| View | Conteúdo e contratos |
| --- | --- |
| `overview` | Estado do serviço, rotas, CPU/RAM, histórico, gráficos e filtro de domínio; WebSocket de monitoramento |
| `logs` | Fluxo de eventos, pausar/limpar e estado da conexão |
| `users` | Contas, papéis, permissões, bloqueio, senha, código de login e exclusão |
| `services` | Estado e ações por permissão |
| `terminal` | Terminal xterm protegido, WebSocket e controle de sessão |

Login administrativo, APIs e terminais continuam protegidos pela autenticação/permissão já implementadas. A bridge oferece `setView`, diálogo de usuário/código, confirmação, senha e toast. Nenhuma API de execução arbitrária foi adicionada.

## Organização do código

```text
ui/src/
├── admin/admin-app.tsx
├── client/bridge.tsx
├── components/client/
│   ├── catalog-toolbar.tsx
│   ├── game-card.tsx
│   ├── game-dialogs.tsx
│   ├── preference-card.tsx
│   └── surfaces.tsx
├── components/ui/       # wrappers Base UI/shadcn
├── hooks/use-mobile.ts
├── lib/utils.ts
├── styles/ui.css        # tokens escuros e motion
└── test/setup.ts
```

Os componentes recebem props/callbacks; as funções de negócio permanecem nos controladores existentes. O cliente monta overlays em Shadow DOM e entrega o container de portal explicitamente. O CSS Tailwind é escopado por `.organizeon-ui`; não usa preflight global. Dialogs e sheets usam os wrappers compartilhados de Base UI/shadcn. O motion usa estados de abertura/fechamento curtos e reduz movimento quando pedido pelo dispositivo.

## Pastas de runtime reorganizadas

| Caminho anterior | Caminho atual | Responsabilidade |
| --- | --- | --- |
| `kzds/worker.js` | `vendor/bare-mux/worker.js` | Worker de comunicação BareMux |
| `omhy/index.mjs` | `vendor/epoxy/index.mjs` | Transporte Epoxy |
| `onsc/index.mjs` | `vendor/libcurl/libcurl.mjs` | Transporte libcurl/Scramjet |
| `rlr/obmw.bundle.js` | `vendor/ultraviolet/uv.bundle.js` | Bundle Ultraviolet |
| `rlr/obmw.client.js` | `vendor/ultraviolet/uv.client.js` | Cliente Ultraviolet |
| `rlr/obmw.config.js` | `vendor/ultraviolet/uv.config.js` | Prefixo e caminhos UV |
| `rlr/obmw.handler.js` | `vendor/ultraviolet/uv.handler.js` | Handler UV |
| `rlr/obmw.sw.js` | `vendor/ultraviolet/uv.sw.js` | Service worker UV |
| `xzmo/grhp.all.js` | `vendor/scramjet/scramjet.all.js` | Bundle Scramjet |
| `xzmo/grhp.sync.js` | `vendor/scramjet/scramjet.sync.js` | Transporte XHR sincronizado |
| `xzmo/grhp.wasm.wasm` | `vendor/scramjet/scramjet.wasm.wasm` | Runtime WebAssembly |

`tbojzp.js` e o mapa compilado `assets/client-runtime-paths.js` apontam aos caminhos canônicos; o prefixo de requisição UV ficou `/proxy/ultraviolet/`. O manifesto distribui todos esses arquivos. Baixe o cliente novamente para obter os caminhos novos.

Os demais arquivos `assets/jdht-*` continuam com nomes Vite gerados. Esses nomes são importados entre dezenas de chunks; trocar cada nome à mão quebra o grafo sem recuperar a fonte original. Os vendor bundles também continuam minificados porque a distribuição precisa executar exatamente esses runtimes.

## Limites de fonte e exceções

- A aplicação principal, suas tabs/configurações e páginas de jogos chegaram como chunks Vite compilados e sem source maps ou árvore React de origem. O repositório público do cliente também só disponibiliza essa distribuição. Essas telas não foram alegadas como migradas.
- `index.html` é o kernel que baixa a própria UI. Ele não pode depender do React/shadcn que ainda está baixando; seu diálogo de atualização é pequeno, isolado, responsivo e estilizado com tokens equivalentes.
- O player de jogo e os botões virtuais simulam teclas e toque do jogo; não há primitivo shadcn adequado para essas superfícies específicas. Os controles foram mantidos, enquanto o catálogo, cards e diálogos associados usam componentes compartilhados.
- Os jogos HTML e motores de terceiros são páginas autônomas; não têm acesso ao React do cliente hospedeiro.

## Testes

- `npm run typecheck:ui`: contratos e tipos da fonte React.
- `npm run test:ui`: alternância de tabs, login, preferências, contrato de envio e erro em jsdom.
- `npm run build:ui`: bundles client/admin e CSS.
- `npm test`: fluxos estáticos, rotas de dependências, manifesto, catálogo e hashes dos jogos.

Esses testes não substituem navegador real. Antes de declarar a aparência final, confira o cliente baixado em desktop e celular quando um browser de inspeção estiver disponível.
