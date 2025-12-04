# Inspira.me (Back-end)
O Inspira.me é uma plataforma que tem como objetivo oferecer inspiração e motivação através de frases, histórias e conteúdos personalizados. Este projeto é o back-end da aplicação, responsável por gerenciar os dados e fornecer os endpoints necessários para o funcionamento do sistema.

## Clonar o projeto
```bash
git clone https://github.com/VitorArgeri/inspira.me-back
cd inspira.me-back
```

## Instalar dependências
```bash
npm install
```

## Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com:
```env
PORT=5000
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua_chave_secreta_aqui"
```

## Banco de dados (Prisma)
Aplicar as migrações:
```bash
npx prisma migrate dev
npx prisma generate
```

## Rodar o servidor
```bash
npm run dev
```
A API ficará disponível em: http://localhost:5000

## Recursos e Endpoints

- Quotes (Frases):
  - Endpoints: GET (listar todas), GET /:id (por id), POST (criar), PUT /:id (atualizar), DELETE /:id (remover)
  - Atributos (desconsiderando createdAt):  
    id, text, author, category, likes

- Categories (Categorias):
  - Endpoints: GET (listar todas), GET /:id (por id), POST (criar), PUT /:id (atualizar), DELETE /:id (remover)
  - Atributos (desconsiderando createdAt):  
    id, name, description

- Users (Usuários):
  - Endpoints: POST /register (registrar), POST /login (login), GET /profile (perfil do usuário autenticado)
  - Atributos (desconsiderando createdAt):  
    id, name, email, password (hash)

