# PROYECTO 7: Frontend eCommerce Pizzería

Este proyecto es el frontend de una aplicación fullstack de eCommerce para una pizzería, desarrollado con React + Vite. Permite a los usuarios explorar el menú, gestionar su carrito, registrarse, iniciar sesión, ver su perfil, historial de compras y realizar pagos de prueba con Stripe.

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

## 🌐 Consumo de API

El frontend consume la API backend (Node.js + Express + MongoDB) para autenticación, productos y compras.  
Configura la URL del backend en los archivos de servicios o variables de entorno si es necesario.

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
- Las imágenes de ejemplo deben estar en `/public/img/`.
- El sistema de pagos usa claves de prueba de Stripe.
- El historial de compras es privado y solo visible para el usuario autenticado.

---

## 📷 Capturas de ejemplo

_Agrega aquí capturas de pantalla de la app funcionando si lo deseas._

--- 