# Prueba Técnica Frontend — Gestión de Productos

Bienvenido/a a la prueba técnica. A continuación encontrarás las instrucciones para poner en marcha la aplicación y las tareas que debes completar.

---

## Puesta en marcha

```bash
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## Descripción

La aplicación es un gestor de productos con las siguientes funcionalidades:

- Listado de productos con filtro por categoría y estado (activo/inactivo)
- Creación de nuevos productos
- Edición de productos existentes
- Eliminación de productos
- Activación / desactivación de productos

La capa de datos es **simulada**: no existe backend real. Las llamadas a la API utilizan `Promise` y `setTimeout` para imitar tiempos de respuesta reales. No debes modificar el fichero `src/api/products.ts`.

---

## Tareas

### 1. Corrección de bugs (5 bugs)

La aplicación contiene **5 bugs intencionados** que debes identificar y corregir.

Pistas sobre los bugs:

- ¿Porque no se renderiza de forma estable la lista de productos?
- Al eliminar un producto, ¿la lista se actualiza correctamente?
- Al filtrar por estado activo/inactivo, ¿el filtro funciona correctamente?
- Al crear un producto con precio 0, ¿el formulario permite el envío correctamente?
- Al activar o desactivar un producto, ¿el cambio se refleja sin afectar al resto de productos?

---

### 2. Implementación de funcionalidad pendiente


**Búsqueda de productos por nombre**

Debes implementar un campo de búsqueda en la barra de filtros que permita filtrar los productos por nombre en tiempo real. La búsqueda debe:

- Ser **case-insensitive**
- Buscar **coincidencias parciales** (el texto de búsqueda puede aparecer en cualquier posición del nombre)
- Combinarse correctamente con los filtros de categoría y estado ya existentes

---


## Notas

- Puedes instalar librerías adicionales si lo consideras necesario, pero justifícalo.
- No modifiques `src/api/products.ts` ni `src/types/product.ts`.
- Revisa que el código TypeScript no genere errores (`npm run build`).
