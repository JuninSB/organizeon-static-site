# Alterações

## Em desenvolvimento

- Ajustada a aparência da navegação de conta para um tema escuro mais uniforme.
- Reservado espaço para o botão de navegação no cabeçalho móvel.
- Adicionado gerador de manifesto para arquivos distribuídos já listados.
- Documentado o fluxo do kernel, manifesto e carregamento do cliente.

A reorganização dos chunks permanece pendente porque o fonte original do cliente compilado não está disponível neste repositório.

## Rework das interfaces manuais

- Kernel de atualização: layout neutro, controles compactos e estados de carregamento mais claros.
- Autenticação: formulário escuro minimalista com foco, botões e mensagens alinhados ao tema do cliente.
- Navegação de conta: menu com superfícies neutras e botão reposicionado para não cobrir as abas móveis.
- Dados, proxy e catálogo de jogos: controles e superfícies harmonizados, com foco visível e ajustes de grade para telas estreitas.
- As telas compiladas do cliente foram mantidas sem mudanças.
- Manifesto e versão atualizados para a entrega do cliente: `v2-74efbd7672e6762b`.

## Kernel 2.7.0 e motion

- Atualizador com entrada animada, spinner de verificação, feedback de pressionamento e progresso mais refinado.
- Texto e metadados do kernel alinhados ao OrganizeOn; versão do kernel elevada para 2.7.0 para que instalações antigas ofereçam o download novo.
- Estados de motion compartilhados para tabs, painéis, overlays, campos e botões do cliente shadcn, com suporte a `prefers-reduced-motion`.
- Artefato do kernel pronto em `releases/organizeon-kernel-2.7.0.html`.

## Ajustes das telas móveis e serviços

- Painel de dados: botões e seletores passam a caber na largura do celular; o uso do backup mostra o limite informado pela API, com fallback de 256 MB.
- Painel administrativo: navegação com ícones SVG acessíveis, tradução dos rótulos restantes e tema escuro alinhado às superfícies do D3.
- Ajustados estados de foco, toque, movimento reduzido e grades em telas estreitas.
- Limite do backup na nuvem definido no backend de produção para 256 MiB; serviço reiniciado e verificado.
- Atraso do agendador Xiaomi definido em 100 ms para a próxima tentativa.
- Manifesto do cliente atualizado; versão: `v2-134e0b89127a313a`.
