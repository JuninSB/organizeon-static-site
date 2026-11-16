# Interface e referência D3

O frontend usa React/TypeScript, shadcn/Base UI e Tailwind 3. O D3 é a referência de layout e comportamento.

`ui/src/components/layout/service-shell.tsx` fornece sidebar responsiva, header e perfil do D2. `rotating-icon.tsx` reutiliza o comportamento do D3 para encerrar voltas sem saltos. `client/surfaces.tsx` compõe login, dados, proxy e navegação do cliente. Primitives em `components/ui/`; tokens e estados Base UI em `styles/ui.css`. Animações usam atributos reais do Base UI e respeitam movimento reduzido. Shadow roots precisam de reset próprio.

Validação: `npm --prefix ui run typecheck`, `npm --prefix ui test`, `npm --prefix ui run build:client`. Os arquivos `ui-dist/client-ui.js` e `.css` são distribuídos por GitHub Pages. O HTML D2 é servido pelo backend Android e importa esse bundle: publicar o repo não altera automaticamente o HTML/backend. Atualizar o identificador de versão dos imports para renovar o cache.

Testes de navegador com dados de teste em 390px e 1280px: sidebar, perfil, disponibilidade da saída, editor e overflow. Não enviar ou apagar arquivos reais para testar aparência. O admin usa primitives compartilhados, mas seu bundle tem implantação separada; build local não equivale a publicação.

Notificações: `showToast` em `auth-client.js` carrega um único host Sonner via bridge. O aviso mobile deixou de criar uma cápsula verde. `ui/src/components/ui/sonner.tsx` define ícones Lucide e cores semânticas; o CSS Sonner entra no bundle para funcionar dentro de Shadow DOM. O kernel atual não contém esse aviso; ele vem do cliente baixado.

Correção da sidebar mobile: os tokens `sidebar-*` devem existir em `tailwind.config.cjs`, além das variáveis CSS. Sem esse mapeamento, `bg-sidebar` não é gerado e o menu fica transparente. Para motion do Sheet, use sua classe estável `d3-sheet-content`: Sidebar sobrescreve `data-slot` para `sidebar`, portanto um seletor exclusivo `[data-slot=sheet-content]` não alcança a sidebar mobile. Verificar o fundo computado e a captura com o menu aberto, além de testar cliques.

D2 agora oferece alternância claro/escuro no header e perfil com a mesma composição do D3: avatar, nome, nível e saída no dropdown. `use-service-theme.ts` aplica a preferência ao contêiner do Shadow DOM, incluindo os portais; persiste apenas a preferência visual em `d2-theme`. O logotipo troca para a versão preta no tema claro. Não aplicar o tema somente ao conteúdo deixando menus e diálogos fora dele.

`integration/d2/panel.html` registra o HTML servido pelo backend D2. Os elementos antigos permanecem apenas como adaptadores para o fluxo existente de arquivos/autenticação e ficam ocultos desde o primeiro paint. Cada seção apresenta carregamento neutro até o mount novo completar, ou a página de erro com copiar/tentar novamente. Não exibir os adaptadores legados como fallback visual. A publicação desse HTML no servidor é separada de GitHub Pages.

## Integração dos fluxos do cliente

O simples build de um componente não muda a tela se seu ponto de entrada continuar chamando o renderizador antigo. `auth-client.js` agora usa `loadClientUI()` como carregador único e `mountClientPage()` como ciclo de vida para Dados e Proxy. `mountReactiveSurface()` mantém a mesma raiz React durante atualização de latências, preservando seleção e foco.

- Início: `HomePage` recebe navegação e busca, sem reimplementar autenticação ou o motor de proxy. Aplicativos/Música acionam os controles reais do launcher existente.
- Jogos: `mountCatalogToolbar` e `mountGameCard` recebem callbacks das funções existentes de cache, instalação, execução, remoção e créditos. Ao filtrar/fechar, roots são desmontadas. Atualizações de progresso alteram o label da ação sem remover o ícone. O toolbar é inline: nunca deve herdar `min-height:100%`.
- Créditos e teclas: Dialog shadcn preserva teclas, configuração de canhoto do Tetris e fullscreen.
- Conexão: `ConnectionStatus` usa Sonner com ID estável, progresso monocromático e Lucide. O aviso “Cliente pronto” não é mais um bloco verde paralelo.
- Admin: `admin.html` inicia `ui-dist/admin-ui.js`. `AdminApp` publica a bridge e importa o controlador existente. Abas usam `keepMounted` pois o controlador ainda referencia IDs de painéis inativos. A conta fica no estado React: a sidebar mobile não existe no DOM enquanto fechada. Campos de permissões são preenchidos ao abrir o diálogo, sem pressupor um modal sempre montado.
- A raiz do admin e os contêineres dos portais possuem o escopo `organizeon-ui`; sem ele, os estilos Tailwind encapsulados não alcançam os menus.

O manifesto inclui também `admin-ui.js` e `admin-ui.css`. Rebuild exige regenerar hashes e `version.txt` antes de publicar. O kernel não precisa ser trocado para substituir esses assets baixados.
