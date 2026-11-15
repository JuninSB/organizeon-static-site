# Manutenção e arquitetura

O [README](README.md) descreve o kernel, o fluxo de atualização e a organização deste repositório. Esta página registra o que foi encontrado na auditoria de 14 de novembro de 2026.

## Pontos de entrada

- Kernel: `index.html` (versão declarada em `index-version.txt`).
- Origem canônica de atualização: `https://juninsb.github.io/organizeon-static-site/`.
- Metadados: `version.txt` e `download-manifest.json`.
- Inicialização autenticada: `config.js` → `auth-client.js` → `config.appModule` → chunks em `assets/`.
- Catálogo de jogos: `games/catalog.json`.

A pasta `assets/` é uma distribuição compilada, não uma árvore de fontes editáveis. Foram identificados caminhos com nomes gerados referenciados pelo kernel e pelos módulos. Os testes conferem os hashes do manifesto; mover arquivos exige atualizar todos os consumidores e manter compatibilidade com instalações existentes. O código-fonte React/Vite original não foi localizado no repositório ou na busca limitada realizada no servidor e no espaço de trabalho.

## Servidor observado

Em Termux, o backend Node foi encontrado em `~/organizeon/backend` e o D3 em `~/organizeon/d3`. O backend atende `/d2/login` e encaminha `/d3/` para o serviço local D3. O SSH e o backend têm supervisores separados, mas o acesso SSH externo observado passa pelo túnel Cloudflare usado pelo OrganizeOn. Esses dados descrevem o estado observado, não uma garantia da configuração futura.

Antes de alterar roteamento ou acesso remoto, identifique os processos reais, valide um caminho alternativo independente e prepare rollback. Não reinicie serviços desconhecidos nem copie configurações ou dados secretos para este repositório.

## Verificação

`npm test` confere os testes estáticos e a integridade do manifesto e catálogo. Para mudanças na interface, valide navegação, autenticação, atualização do cliente, layout e toque em navegador real; os testes estáticos não comprovam esses comportamentos. Registre as mudanças e as limitações de teste no histórico de alterações.

## Atualização do manifesto

Depois de editar arquivos já listados em `download-manifest.json`, execute `node scripts/update-manifest.mjs` e depois `npm test`. O script preserva a lista de caminhos, recalcula tamanho e SHA-256, atualiza `totalBytes` e grava uma versão `v2-` derivada da lista atualizada em `version.txt`. Arquivos novos exigem inclusão explícita no manifesto; mudanças no kernel também exigem tratar `index-version.txt`. Revise e teste a migração em um cliente instalado antes de publicar.
