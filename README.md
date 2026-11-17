# OrganizeOn — cliente estático

Este repositório publica os arquivos usados pelo cliente OrganizeOn em `https://juninsb.github.io/organizeon-static-site/`. O cliente é iniciado por um kernel `index.html`, obtido pela distribuição do OrganizeOn. O kernel consulta o GitHub Pages, verifica versões, baixa arquivos do manifesto e inicia o cliente autenticado.

## Inicialização e atualização

1. `index.html` consulta `index-version.txt` para verificar a versão do kernel e `version.txt` para verificar a versão dos arquivos do cliente.
2. Quando necessário, lê `download-manifest.json`, que relaciona caminhos, tamanhos e hashes SHA-256. O atualizador compara esses dados com os metadados de instalação e verifica os arquivos baixados.
3. O kernel carrega `config.js` e `auth-client.js`. O arquivo de autenticação prepara a sessão e o backup de preferências antes de importar o módulo indicado por `appModule` em `config.js`.
4. O módulo principal carrega os demais chunks e estilos em `assets/`. Jogos são distribuídos em `games/` e suas informações ficam em `games/catalog.json`.

Quando o kernel não está hospedado no GitHub Pages, a origem canônica definida nele é usada para as atualizações. O estado do atualizador é armazenado no navegador; o código do kernel determina a versão e as chaves de armazenamento.

## Organização atual

- `index.html`: kernel e fluxo de atualização.
- `config.js`: origem e prefixo da API e caminho do módulo principal.
- `auth-client.js`: autenticação, integração do cliente e funções adicionais.
- `assets/`: JavaScript, CSS e fontes distribuídos; os arquivos `jdht-*` incluem saída compilada do Vite.
- `games/`: catálogo e arquivos dos jogos.
- `admin.html`, `admin.js`: interface administrativa.
- `vendor/`: bibliotecas distribuídas com o cliente.
- `download-manifest.json`, `version.txt`, `index-version.txt`: integridade e versões de atualização.
- `test/`: verificações automatizadas do cliente e dos arquivos distribuídos.
- `server-backup/`: backup sanitizado do backend; consulte `BACKUP-README.md`.

Os nomes dos chunks estão referenciados em outros arquivos, inclusive no kernel, no módulo principal e no manifesto. Não renomeie ou remova arquivos isoladamente: clientes instalados podem precisar deles durante a atualização. O repositório atual contém artefatos compilados; o código-fonte original do cliente ainda não foi localizado nesta investigação.

## Desenvolvimento e verificação

Execute `npm test` para verificar fluxos, catálogo e integridade dos arquivos listados no manifesto. O teste não substitui o uso do cliente em navegador, nem valida todas as operações de rede e autenticação. Ao alterar arquivos distribuídos, atualize o manifesto e a versão de forma compatível com o kernel; verifique também os clientes que ainda utilizam versões anteriores. Nunca inclua credenciais, cookies, tokens ou dados de usuários no repositório.

O backend de produção e os painéis D2/D3 possuem código e implantação separados deste repositório. Verifique a instalação real antes de mudar rotas ou serviços.

Client hospedado diretamente em `/d1/live/`, reset privilegiado de DMs e opções por e-mail: [documentação](docs/DM_RESET_AND_LIVE.md).
