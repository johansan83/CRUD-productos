CRUD con Node.js y Express

Instalar Node.js (versión usada en proyecto 22.16 LTS)

Instalación de librerías
npm i cors dotenv dotenv-safe express jsonwebtoken tsx bcryptjs 
npm i --save-dev @types/dotenv-safe
npm i --save mysql2
npm i --save-dev @types/node
npm i --save-dev @types/cors
npm i --save @types/jsonwebtoken
npm i --save @types/bcryptjs
npm i --save-dev nodemon

En caso de descargar desde repositorio git, se deben instalar dependencias necesarias para el proyecto con el comando:
npm install


Estructura del proyecto
-- src
---- controllers: Recibe y procesa solicitudes de usuario, interactua con modelos y vistas
---- middlewares: funcionalidades como revisión de Tokens, verifcación de permisos.
---- models: Encargado del acceso a la base de datos y retorna a controlador
---- routes: Enruta las peticiones hacia los controladores
---- services: Servicios
---- validators: Encargado de validaciones
---- views: Interfaz de usuario
