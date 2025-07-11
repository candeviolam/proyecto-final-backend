# 📊 Encuestas Online - Backend

Este es el backend de la aplicación Encuestas Online, desarrollada en Node.js con Express y MongoDB. 

---

## Obejtivo

Permite la gestión de encuestas, categorías y usuarios, mediante autenticación con JWT.

---

## Funcionalidades principales

- Registro e inicio de sesión de usuarios con validación (administrador y usuarios normales).
- Super admin predefinido creado al iniciar el servidor.
- Creación, edición, activación/inactivación y eliminación de encuestas.
- Creación y administración de categorías.
- Respuestas a encuestas de manera anónima o con email.
- Envío de email con el resumen de las respuestas con Nodemailer.
- Panel administrativo con estadísticas y gráficas.
- Rutas protegidas según rol (admin/usuario).
- Manejo de errores detallado (404 personalizados, validaciones).

---

## Tecnologías usadas

- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Nodemailer
- Express-validator
- Moment.js
- Dotenv

---

## Instalación y configuración

1. **Clonar el repositorio:**
   git clone https://github.com/candeviolam/proyecto-final-backend.git

2. **Instalar dependencias:**
   npm install

3. **Crear un archivo .env en la raíz con el contenido (reemplazar datos reales):**
   PORT=4000
   MONGO_URI=tu_mongo_uri
   ADMIN_EMAIL=admin@admin.com
   ADMIN_PASSWORD=superadmin123
   JWT_SECRET=clavesecreta
   EMAIL_USER=tu_email@gmail.com
   EMAIL_PASS=tu_contraseña

4. **Levantar/iniciar el servidor:**
   npm start
El backend se ejecutará en http://localhost:4000 por defecto.

---

## Usuario administrador por defecto

Email: admin@admin.com
Contraseña: superadmin123

---

## Estructura del proyecto

/src
   /controllers      Lógica de la aplicación
   /middlewares      Middlewares (autenticación, errores)
   /models           Modelos de datos Mongoose
   /routes           Rutas de la API
   /scripts          Scripts para precargar datos
   app.js            Instancia del servidor
.env                 Configuración de variables de entorno

---

## Enlaces 

Frontend: https://encuestas-online.netlify.app/
Backend: https://encuestas-online.onrender.com
Tablero Trello: https://trello.com/b/HGkI7SfI/trabajo-final-encuestas-online
Diseño Figma: https://www.figma.com/design/d9pfdnP1MaTGFArkRtpuo9/Encuestas-Online?node-id=0-1&t=s4CW89JL9gWomPov-1

## Endpoints principales

/api/auth/register
/api/auth/login
/api/encuesta/*
/api/categoria/*
/api/admin/*
