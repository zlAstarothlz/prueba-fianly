# PruebaFianly

Este proyecto es una aplicación web desarrollada con Angular [Angular CLI](https://github.com/angular/angular-cli) versión 15.2.11, como parte de una prueba técnica. Incluye autenticación, registro de usuarios y un catálogo de productos con filtros y detalles, todo consumiendo datos desde una mock API

## 💻 Pasos para correr el proyecto localmente

1. **Clona el repositorio**
   
   git clone https://github.com/zlAstarothlz/prueba-fianly
   cd tu-repo

2. **Instala dependencias**

     npm install
    
3.  **Levanta la API mock con json-server**

     Revisa si json-server está instalado, sino ejecuta: npm install -g json-server
     Luego ejecuta: npx json-server --watch db.json --port 3000

4.  **Corre el proyecto Angular**

    Ejecuta: ng serve
    Acceso a la app: http://localhost:4200
    
    Credenciales de prueba: 
       email: test@mail.com
       password: 12345678
     

## 🧰 Librerías utilizadas

 ✅ Angular Material – para componentes UI modernos y responsivos

 ✅ JSON Server – para simular una API REST



## 🚀 Demo desplegada

🔗 [](https://tusitio.netlify.app)

Debido al uso de una mock API no se pueden registrar nuevos usuarios. Para registrar levante el proyecto localmente.



