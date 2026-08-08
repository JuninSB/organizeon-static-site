# Backup do OrganizeOn

Este repositório contém o frontend publicado e, em `server-backup/`, uma cópia
sanitizada do backend usado no TV box. O arquivo do servidor inclui código,
testes, templates do runit/Termux:Boot e instruções de implantação.

Por segurança, o backup público não inclui `.env`, tokens, cookies de sessão,
hashes dos usuários reais, `users.json`, logs, uploads, cache nem executáveis com
configuração embutida. Esses dados permanecem apenas no backup privado de
`/sdcard/backup` do dispositivo.

Para restaurar, extraia `server-backup/organizeon-backend-source.tar.gz` e siga
`DEPLOYMENT.md` dentro dele.
