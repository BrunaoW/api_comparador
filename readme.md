#### Teste técnico - Empresta Bem Melhor

O presente repositório consiste em uma plataforma de simulação de empréstimos em Laravel e Vue 2, como teste técnico para a empresa *Empresta Bem Melhor*.

Para a execução do projeto a fim de avaliação, é necessário executar os seguintes comandos:

```bash
cp -a .env.example .env
composer install
php artisan key:generate
php artisan serve
```

e em outro terminal

```bash
npm install
npm run dev
```

E entrar no link do localhost `http://localhost:8000/`

#### Considerações

- Aqui algumas considerações a respeito do teste executado:

    - Não foi possível implementar as funções no backend `filtrarConvenio()` e `filtrarParcelas()` a tempo. Tive dificuldades em compreender como a tarefa de filtrar um array é realizada em PHP.
    - Seria interessante incluir um pequeno guia no enunciado do teste informando a configuração do PHP na versão correta do projeto. A que eu possui instalada em meu computador era a versão mais recente e demorei a iniciar o teste devido a uma dificuldade em trocar a versão do PHP que já tinha em meu sistema.
    - Seria uma boa também atualizar a versão do Vue da 2 pra 3, visto que é a versão mais antiga foi descontinuada, o que dificultou a inclusão de libs utilitárias para implementar o front, devido a incompatibilidade de versões.