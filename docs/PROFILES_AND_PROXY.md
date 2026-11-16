# Perfis, senha e acesso administrativo

O perfil é associado ao usuário OrganizeOn existente. Login, nível e permissões não são editáveis pelo perfil. Nome de exibição (40 caracteres), cor hexadecimal, descrição (280 caracteres), avatar e formato são persistidos no backend. Campos adicionais são rejeitados. O recorte é feito no navegador; o servidor aceita somente JPEG/PNG quadrado, até 512 px e 96 KiB, sem URLs externas ou SVG.

`GET/PATCH <API_PREFIX>/account/profile` usa a sessão atual. D2 e D3 têm aliases `/d2/api/profile` e `/d3/api/profile`. A gravação de perfil não invalida sessões. Os componentes compartilhados ficam em `ui/src/features/profile`, `services/profile-service.ts`, `stores/profile-store.ts` e `components/layout/account-menu.tsx`. O estado é reativo, com notificações entre abas e atualização ao voltar à janela; localStorage não armazena os dados de perfil. `scripts/sync-profile-ui.mjs <d3/src>` distribui os mesmos módulos para o D3, preservando sua stack e roteamento. Esses campos poderão ser reutilizados por um chat; nenhum chat foi implementado nesta mudança.

`POST <API_PREFIX>/account/password` (aliases D2/D3 `/api/password`) exige autenticação, senha atual, nova senha com pelo menos oito caracteres e confirmação. Qualquer conta autenticada pode trocar sua própria senha. O backend deriva a conta da sessão: nenhum nome de alvo é aceito. Senha incorreta não altera dados. Sucesso invalida as sessões e conexões da própria conta. O atalho em Usuários é opcional; redefinir senha alheia continua sujeito à hierarquia administrativa.

`POST <API_PREFIX>/account/admin-reauth` exige a senha da própria conta e concede confirmação por 600 segundos, vinculada ao identificador e versão da sessão. A concessão fica apenas na memória do servidor, portanto reiniciar a API exige nova confirmação. APIs `/admin/` retornam 428 quando falta confirmação. Conexões administrativas também exigem essa concessão e são encerradas ao expirar; perfil, pesquisa e arquivos comuns não exigem confirmação administrativa. A senha não é armazenada no cliente nem na concessão.

# Pesquisa

Ultraviolet calculava o caminho base com uma expressão regular incorreta. Agora a configuração deriva do URL do próprio script ou do worker, preservando subpaths.

Scramjet v1 era inicializado antes do controle do service worker e sem aguardar a conclusão. Falhas devolviam HTML com atualização automática infinita. Agora `core/proxy/scramjet-bootstrap.js` aguarda controle, inicialização e confirmação do worker; requisições simultâneas compartilham a inicialização. `scramjet-worker.js` migra o banco `$scramjet` para versão 2, criando stores ausentes sem apagar registros existentes. A cópia distribuída de Scramjet v1 usa essa versão e recarrega sua configuração corretamente. Falhas retornam 503 sem recarregar em loop. Se outra aba bloquear a atualização do banco, ela precisa ser fechada.

O teste `ui/e2e/scramjet-startup.cjs` usa workers e reescritores reais e um transporte isolado: cobre ambos os motores, navegação de iframe, configuração ausente, migração e preservação de dados. Isso não equivale a validar todos os sites externos ou a rede pública.

# Publicação e rollback

Backend: módulos novos `profiles.mjs` e `admin-reauth.mjs`; alterações em `accounts.mjs` e `server.mjs`. Backup privado dos módulos anteriores em `~/organizeon/backend/backups/profile-final-20261116/`; apenas a API precisa reiniciar. D3: copiar os assets novos antes de substituir atomicamente `frontend/dist/index.html`, preservando assets antigos para abas abertas e os ícones existentes. Reverter os módulos/index e o commit do cliente restaura o código anterior. Perfis adicionam campos opcionais às contas e não mudam hashes ou níveis existentes.

## Validação desta entrega

23 testes do backend passaram. Os 5 testes de UI passaram com um worker e timeout de 15 segundos; a execução paralela anterior excedeu o prazo de 5 segundos no dispositivo. Os 9 testes do D3 passaram após adaptar a navegação de logout para Perfil (4 do roteamento repetidos isoladamente após os ajustes). Playwright validou: perfil móvel e recorte, própria senha, logout admin, confirmação administrativa, notificações, revogação por conta e D3 compilado. A captura móvel foi inspecionada; o seletor de formato recebeu os rótulos em português. A integração HTTP/WebSocket executou no Android com contas descartáveis. Não foram usadas senhas reais OrganizeOn nem enviadas solicitações Xiaomi.
