# 📊 Encuestas Online - Backend

Este es el backend de la aplicación Encuestas Online, desarrollado en Node.js con Express y MongoDB. Permite la gestión de encuestas, categorías y usuarios, con autenticación basada en JWT.

---

## Funcionalidades principales

- Registro e inicio de sesión de usuarios con validación.
- Super admin predefinido creado al iniciar el servidor.
- Creación, edición, activación y eliminación de encuestas.
- Creación y administración de categorías.
- Respuestas anónimas o con email.
- Envío de email con el resumen de las respuestas.
- Panel administrativo con estadísticas.
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

## Configuración del entorno

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/candeviolam/proyecto-final-backend.git
   ```

2. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo .env en la raíz con el contenido (reemplazar datos reales):
   PORT=4000
   MONGO_URI=tu_mongo_uri
   ADMIN_EMAIL=admin@admin.com
   ADMIN_PASSWORD=superadmin123
   JWT_SECRET=clavesecreta
   EMAIL_USER=tu_email@gmail.com
   EMAIL_PASS=tu_contraseña

## Levantar el servidor en local

```bash
npm start
```

El servidor se ejecutará en http://localhost:4000.

## Estructura de carpetas

/src
/controllers Lógica de la aplicación
/middlewares Middlewares (autenticación, errores)
/models Modelos de datos Mongoose
/routes Rutas de la API
/scripts Scripts para precargar datos
app.js Instancia del servidor

## Usuario administrador por defecto

Email: admin@admin.com
Contraseña: superadmin123

## Enlaces útiles

Frontend en producción: [URL_FRONTEND]
Backend en producción: [URL_BACKEND]
Tablero Trello: [URL_TRELLO]
Diseño Figma: [URL_FIGMA]

## Endpoints principales

/api/auth/register
/api/auth/login
/api/encuesta/*
/api/categoria/*
/api/admin/*
