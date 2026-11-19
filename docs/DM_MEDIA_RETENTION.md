# Mídia das DMs: 50 MB, retenção e cópias compartilhadas

## Política vigente

O limite é por arquivo: 50 × 1024² bytes. Até quatro anexos por mensagem. A cota existente de 256 MiB por conta e de 1 GiB para mídia ativa no serviço permanece. O corpo JSON aceita Base64 de 50 MiB mais metadados; o teto dos demais endpoints não foi ampliado.

| Tamanho | Retenção desde o último upload idêntico |
| --- | --- |
| Menos de 8 MiB | Sem expiração automática |
| De 8 a 16 MiB, inclusive | 6 meses |
| Acima de 16 até 28 MiB | 3 meses |
| Acima de 28 até 40 MiB | 15 dias |
| Acima de 40 até 50 MiB | 7 dias |

As faixas originais foram dobradas quando o limite passou de 25 para 50 MB. Meses são meses de calendário em UTC, com ajuste ao último dia válido; dias são períodos de 24 horas.

## Compartilhamento e permissões

- Encaminhamento cria outra referência ao mesmo BLOB; não duplica bytes e não renova prazo.
- Um novo upload com SHA-256 idêntico reutiliza o BLOB e renova o prazo de todas as referências. Mídia anteriormente expirada volta a estar disponível se os mesmos bytes forem enviados novamente.
- Cada anexo conserva seu próprio nome e MIME validado. IDs públicos pertencem a anexos; hash e ID do BLOB não são expostos. ACL da conversa permanece obrigatória em todos os downloads.
- Apagar a mensagem A remove sua referência. B continua acessível enquanto existir sua referência e o arquivo não estiver expirado. Os bytes só são removidos manualmente quando a última referência desaparece.
- A cota global conta bytes únicos ativos. A cota por usuário conta bytes únicos ligados aos seus uploads/referências, sem cobrança repetida por cópias idênticas.

## Expiração

A fonte de verdade é `src/direct-messages/media-policy.mjs`. Validade e SHA-256 ficam no BLOB em SQLite privado, não em arquivos públicos de CDN. O download nega HTTP410 imediatamente ao vencer. Um timer a cada minuto remove os bytes de até dois BLOBs vencidos por rodada, mantendo metadados e mensagem para exibir “Arquivo expirado”. Eventos `changed` atualizam todas as conversas referenciadas. O cliente também possui timer local para remover uma prévia aberta na data de expiração.

O SQLite usa secure_delete e checkpoint WAL passivo após a limpeza; espaço liberado pode ser reutilizado sem redução imediata do tamanho físico do arquivo SQLite. Nenhuma rotina apaga cópias já baixadas para outros aparelhos ou backups privados anteriores.

## Migração e operação

Migração aditiva cria datas, hash e metadados por anexo. Arquivos antigos preservam a data original de upload; duplicatas históricas são consolidadas e recebem a data mais recente entre seus uploads. Texto, IDs de mensagem, anexos, participantes e contas permanecem. Dados privados não entram no Git.

Backup privado desta alteração: `~/organizeon/backend/staging/dm50/backup/`, incluindo snapshot SQLite consistente e fontes anteriores. Uma cópia separada foi migrada e conferida antes da base ativa. Como o esquema ganha colunas, não publicar o store antigo sem adaptação de INSERTs/expiração. Preferir correção adiante; não restaurar um snapshot antigo por cima de novas mensagens. Rollback visual usa os índices/templates e assets preservados, sem substituir banco ou credenciais.

Frontend compartilhado: `features/messages/media-policy.ts`, stores, serviço e MessageMedia; reutilizado no client, D2/admin, D3 e D4. Uploads com progresso aceitam tempo maior; download de anexos tem timeout específico. APIs de mídia continuam autenticadas e não expõem filesystem.

## Validação

53 testes backend passaram, incluindo upload real de 50 MiB, compartilhamento, reenvio idêntico, prazo global, permissões A/B, exclusão da última referência, limites exatos, meses/leap year, migração e remoção dos bytes. Nove testes de mídia/HTTP também passaram no Android com banco de teste. Clone da base real migrou com integrity_check=ok, preservando bytes e contagem de mídia. Cinco testes UI passaram; typecheck/build client/admin/D3/D4 passaram. Teste de navegador com duas contas fictícias passou: solicitações, mensagens, edição, notificações, imagem privada, gestos e responsividade. Não foram enviadas DMs de teste entre contas reais.

## Publicação de 19/11/2026

Runtime `v2-26fe22c6316a0148`, D2 `dm50-80e29d996462`, D3 `index-Dn_8WGpr.js`, D4 `d4-BFrSF4sc.js`. Client/admin e entrada do admin públicos conferidos por SHA-256 após publicação Pages. Node foi reiniciado para carregar o store e o timer; D3/D4 receberam overlay de assets e troca atômica de index, sem restart. O banco ativo passou em integrity_check, com a mídia existente preservada. Endpoints sem sessão continuam retornando 401.
