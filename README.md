# Teste para desenvolvedor - Vitafor - Nickolas Moura

Esta é uma aplicação que consume a API do [Rick and Morty](https://rickandmortyapi.com/) e apresenta a seguinte estrutura de páginas:

-   Home
-   Personagens
-   Sobre
-   Login / Cadastro

## 🚀 Tecnologias utilizadas

-   PHP + Laravel com Sanctum
-   SQLite
-   Front-end - React, fetch API e JavaScript
-   Composer

## 📄 Sobre



## 🔧 Instalação
1. Clone o repo 
  ```bash
   git clone https://github.com/nickmoura/teste-vitafor-laravel.git
   cd teste-vitafor-laravel
   ```

2. Instale dependências

  ```bash
  cd backend
composer install
   ```



3. Copie o .env e gere a chave

  ```bash
cp .env.example .env
php artisan key:generate
   ```

4. Configure o .env com seu banco (no meu caso, SQLite). Um exemplo básico pra SQLite no .env:

  ```bash
DB_CONNECTION=sqlite
DB_DATABASE=/caminho/absoluto/ao/banco.sqlite
   ```

5. Rode as migrações. Elas garantem que as tabelas do banco serão criadas ou atualizadas.

  ```bash
php artisan migrate
php artisan db:seed  # caso haja seeders
  ```

6. Rodar back:

  ```bash
  php artisan serve
  ```
7. Rodar front após todas as integrações (⚠️ abrir outra aba de terminal e não fechar o terminal que está rodando o back):

  ```bash
  cd ..
  cd frontend
  ```
8. Instalar as dependências do frontend

  ```bash
  npm i / npm install
  npm i bootstrap react-toastify react-icons lucide-react react-router-dom
  ```