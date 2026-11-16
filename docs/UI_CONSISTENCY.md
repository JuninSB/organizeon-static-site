# Interface e referência D3

O frontend usa React/TypeScript, shadcn/Base UI e Tailwind 3. O D3 é a referência de layout e comportamento.

`ui/src/components/layout/service-shell.tsx` fornece sidebar responsiva, header e perfil do D2. `rotating-icon.tsx` reutiliza o comportamento do D3 para encerrar voltas sem saltos. `client/surfaces.tsx` compõe login, dados, proxy e navegação do cliente. Primitives em `components/ui/`; tokens e estados Base UI em `styles/ui.css`. Animações usam atributos reais do Base UI e respeitam movimento reduzido. Shadow roots precisam de reset próprio.

Validação: `npm --prefix ui run typecheck`, `npm --prefix ui test`, `npm --prefix ui run build:client`. Os arquivos `ui-dist/client-ui.js` e `.css` são distribuídos por GitHub Pages. O HTML D2 é servido pelo backend Android e importa esse bundle: publicar o repo não altera automaticamente o HTML/backend. Atualizar o identificador de versão dos imports para renovar o cache.

Testes de navegador com dados de teste em 390px e 1280px: sidebar, perfil, disponibilidade da saída, editor e overflow. Não enviar ou apagar arquivos reais para testar aparência. O admin usa primitives compartilhados, mas seu bundle tem implantação separada; build local não equivale a publicação.

Notificações: `showToast` em `auth-client.js` carrega um único host Sonner via bridge. O aviso mobile deixou de criar uma cápsula verde. `ui/src/components/ui/sonner.tsx` define ícones Lucide e cores semânticas; o CSS Sonner entra no bundle para funcionar dentro de Shadow DOM. O kernel atual não contém esse aviso; ele vem do cliente baixado.
