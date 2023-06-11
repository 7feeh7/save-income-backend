# save-income-backend

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Save-Income é um projeto Node.js que permite aos usuários gerenciar suas receitas e despesas para um melhor controle financeiro. Ele fornece recursos para registrar, rastrear e analisar transações financeiras.

## Tecnologias

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://jwt.io/)
- Princípios de SOLID 

## Features

- [x] Cadastro e autenticação do usuário
- [] Criar, atualizar e excluir registros de receitas e despesas
- [] Categorize as transações para uma melhor organização
- [] Gerar relatórios financeiros e estatísticas

## Instalação

> OBS: E NECESSARIO CONFIGURAR O ARQUIVO .ENV

1. Clonar o repositório:

    ```bash
    git clone https://github.com/7feeh7/save-income-backend.git
    ```

2. Instalando as dependências:
    
    ```bash
    npm install
    ```

3. Configurar banco de dados:

- Crie um banco de dados PostgreSQL para aplicação
- Renomeie o arquivo .env.example para .env e atualize os detalhes da conexão do banco de dados

4. Construir o projeto:
    
    ```bash
    npm run prestart
    ```

5. Inicie o servidor:
    
    ```bash
    npm run dev
    ```

6. O servidor agora deve estar em execução em http://localhost:3333.

## Documentação

A documentação da API estará disponível [aqui]().

## Contribuindo

Contribuições para o projeto são bem vindas! Pra contribuir com o projeto, siga estas etapas:


1. De um fork no repositorio.
2. Crie uma nova branch para sua feature ou bug fix.
3. Faça suas alterações, confirmando e pressionando conforme necessário.
4. Envie uma solicitação pull com uma descrição detalhada de suas alterações.


## Contato

Para qualquer dúvida ou consulta, entre em contato com [F-softtech](mailto:felipe.pires.soaresti@gmail.com).

Sinta-se à vontade para entrar em contato conosco se tiver algum comentário, sugestão ou se encontrar algum problema ao usar o save-income-backend. Sua opinião é valiosa para nós e nos ajuda a melhorar a aplicação.