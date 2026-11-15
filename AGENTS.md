# OrganizeOn: instruções de desenvolvimento

Leia as instruções aplicáveis e preserve rotas, autenticação, downloads e dados existentes. Este repositório é o cliente estático: não presuma que ele contém o backend do domínio ou os painéis D2/D3. Verifique a origem de cada página e o fluxo de publicação antes de alterar produção.

Para interface, preserve a stack de cada aplicação. O D3 usa React, TypeScript, Base UI, shadcn/ui e Tailwind 3; componentes atuais de shadcn podem usar sintaxe de Tailwind 4 incompatível. Consulte a documentação oficial e confira o CSS gerado e os estados reais dos componentes. O MCP oficial shadcn pode ser usado para consultar o registro quando disponível. Use Lucide e tokens semânticos, componentes reutilizáveis e respeite prefers-reduced-motion.

Para animação, transições CSS e os estados de Base UI são apropriados; não presuma que uma classe gerada esteja ligada ao elemento correto. Valide entrada, saída, interrupção, teclado e layouts móveis. Use navegador e capturas quando disponíveis e relate limites reais de verificação.

O backend de produção, o túnel e o SSH são serviços distintos. Não exponha portas, reinicie processos ou altere rotas de produção sem entender a topologia, preparar rollback e preservar o acesso remoto. Nunca grave credenciais ou tokens no repositório. Rode os testes pertinentes antes de entregar.
