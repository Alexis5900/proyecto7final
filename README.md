# PROYECTO 7: Frontend eCommerce Pizzería

Este proyecto es el frontend de una aplicación fullstack de eCommerce para una pizzería, desarrollado con React + Vite. Permite a los usuarios explorar el menú, gestionar su carrito, registrarse, iniciar sesión, ver su perfil, historial de compras y realizar pagos de prueba con Stripe.

---

## 🌐 Enlaces rápidos

### 🚀 **Frontend**
- **GitHub:** [proyecto7final (frontend)](https://github.com/Alexis5900/proyecto7final)
- **Render (producción):** [https://proyecto7final.onrender.com/](https://proyecto7final.onrender.com/)

### 🛠️ **Backend**
- **GitHub:** [proyecto7 (backend)](https://github.com/Alexis5900/proyecto7)
- **Render (producción):** [https://proyecto7-0wl1.onrender.com/](https://proyecto7-0wl1.onrender.com/)

### 📄 **Documentación Swagger (API)**
- [https://proyecto7-0wl1.onrender.com/api-docs](https://proyecto7-0wl1.onrender.com/api-docs)

---

## 🚀 Instalación y ejecución

```bash
npm install
npm run dev
```

La app estará disponible en:  
http://localhost:5173/

---

## 🧩 Funcionalidades principales

- Registro y login de usuarios (con feedback visual y validaciones)
- Gestión de perfil (nombre, email, teléfono, dirección, cambio de contraseña)
- Catálogo de pizzas destacado y menú completo
- Carrito de compras con animaciones y feedback
- Integración con Stripe para pagos de prueba
- Historial de compras privado en el perfil
- Recuperación de contraseña vía email de prueba (Ethereal)
- Navegación clara y profesional

---

## 🌐 Consumo de API y documentación

El frontend consume la API backend (Node.js + Express + MongoDB) para autenticación, productos y compras.

**La API está documentada con Swagger UI (OpenAPI):**

- Accede a la documentación interactiva en producción:
  - [https://proyecto7-0wl1.onrender.com/api-docs](https://proyecto7-0wl1.onrender.com/api-docs)
- Puedes probar todos los endpoints, ver los parámetros y respuestas esperadas.

---

## 🧪 Pruebas rápidas con Postman

Puedes probar la API directamente con Postman usando las siguientes URLs base:

- **Producción:** `https://proyecto7-0wl1.onrender.com`
- **Local:** `http://localhost:3005`

### **Principales endpoints disponibles:**

#### **Usuarios**
- `POST /api/usuarios/registro` — Registrar usuario
- `POST /api/usuarios/login` — Iniciar sesión
- `GET /api/usuarios/verificar-usuario` — Verificar usuario autenticado (requiere token)
- `POST /api/usuarios/recuperar-password` — Recuperar contraseña
- `GET /api/usuarios/compras` — Historial de compras (requiere token)

#### **Productos**
- `GET /api/productos` — Listar productos
- `POST /api/productos` — Crear producto
- `DELETE /api/productos/{id}` — Eliminar producto

#### **Checkout**
- `POST /api/checkout/create-checkout-session` — Crear sesión de pago con Stripe

Consulta la [documentación Swagger](https://proyecto7-0wl1.onrender.com/api-docs) para ver detalles de cada endpoint, parámetros y ejemplos de request/response.

---

## ⚙️ Variables de entorno necesarias

Crea un archivo `.env` en la raíz del frontend con:

```
VITE_BACKEND_URL=https://proyecto7-0wl1.onrender.com
```

---

## 📦 Estructura de carpetas relevante

- `/src/components` – Componentes reutilizables (carrito, menú, perfil, etc.)
- `/src/pages` – Páginas principales (Home, Menu, Profile, Login, Register, etc.)
- `/src/context` – Contextos globales (Auth, Cart)
- `/src/data` – Datos estáticos de ejemplo (pizzas destacadas)
- `/public/img` – Imágenes de pizzas

---

## 🧪 Pruebas y ejemplos

Puedes probar el flujo completo:
- Registrando un usuario
- Iniciando sesión
- Agregando pizzas al carrito
- Realizando un pago de prueba (Stripe test)
- Revisando el historial de compras en el perfil

---

## 📝 Notas

- Este frontend está pensado para funcionar junto al backend del mismo proyecto.
- La documentación de la API está disponible y actualizada en `/api-docs` del backend.

---

## 📷 Capturas de ejemplo

_Agrega aquí capturas de pantalla de la app funcionando si lo deseas._

--- 