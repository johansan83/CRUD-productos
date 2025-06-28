CRUD‑Productos (NodeJS + Express + MySQL)
API REST para gestionar productos con autenticación mediante JWT.

Requisitos previos

Node.js **22.16 LTS** (o versión compatible)
MySQL (o MariaDB) configurado


Instalación de librerías
npm i cors dotenv dotenv-safe express jsonwebtoken tsx bcryptjs mysql2
npm i --save-dev @types/node @types/cors @types/jsonwebtoken @types/bcryptjs @types/dotenv-safe nodemon

En caso de descargar desde repositorio git, se deben instalar dependencias necesarias para el proyecto con el comando:
git clone https://github.com/johansan83/CRUD-productos.git
cd CRUD-productos
npm install

Iniciar servidor:
npm run dev

Build (si usas TypeScript en producción):
npm run build
npm start


Estructura del proyecto
src/
 ├── config/
 │     └── db.ts          # Configuración de MySQL (+ dotenv)
 ├── controllers/
 │     ├── auth/          # Controlador de login (JWT)
 │     └── products/      # Controlador CRUD productos
 ├── middlewares/
 │     ├── auth.ts        # Middleware para validar JWT
 │     ├── logger.ts      # Log de peticiones con tiempos
 │     └── errorHandler.ts# Captura y formatea errores
 ├── models/
 │     └── products/      # Acceso a datos con MySQL (CRUD)
 ├── routes/
 │     ├── auth/          # Ruta POST /auth/login
 │     └── products/      # Rutas CRUD /products
 ├── types/               # Definiciones TS (ej. Producto, extend Request)
 ├── validators/          # Validación de inputs (ej. evitar duplicados)
 └── app.ts               # Configuración general de Express, CORS, middlewares

Endpoints disponibles
Ruta            Método  Protección  Descripción
/auth/login     POST    No          Genera JWT con usuario y contraseña
/products       GET     No          Lista todos los productos
/products       POST    No          Agrega un nuevo producto (evita duplicados)
/products/:id   GET     No          Consulta detalle de producto por ID
/products/:id   PUT     No          Actualiza producto (evita duplicados)
/products/:id   DELETE  No          Elimina producto
/profile        GET     JWT         Devuelve el usuario autenticado
/error          GET     No          Ruta de prueba para trigger un error