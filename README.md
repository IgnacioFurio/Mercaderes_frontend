# Mercaderes

Esta aplicación sirve como generador simple de mercaderes para partidas de rol de fantasía.

Mercaderes es una herramienta pensada para ayudar al DM a improvisar tiendas, comerciantes e inventarios sin tener que parar la sesión para mirar tablas, calcular precios o decidir cuántas jarras de cerveza tiene un tabernero sospechosamente amable.

La idea es sencilla: abrir la aplicación, generar un mercader funcional, usarlo en mesa, vender objetos, ajustar precios y guardar el resultado localmente.

---

## Estado del proyecto

Actualmente el proyecto está en **V1.0 — Generador simple**.

Esta versión busca ser útil, rápida y directa. No pretende ser todavía una aplicación completa de gestión de tiendas, sino una herramienta práctica para crear mercaderes jugables en pocos segundos.

---

## Qué puede hacer ahora mismo

- Generar automáticamente un mercader al entrar en la aplicación.
- Generar un inventario compatible con el tipo de tienda y la calidad del mercader.
- Filtrar la generación por tipo de tienda, calidad, especie, región y actitud comercial.
- Consumir desde backend las opciones de generación.
- Cambiar la actitud comercial del mercader.
- Recalcular los precios del inventario al cambiar la actitud comercial.
- Calcular ventas sobre el inventario actual.
- Actualizar la caja del mercader después de cada venta.
- Copiar el mercader y su inventario al portapapeles en formato Markdown/Homebrewery.
- Guardar mercaderes generados en `localStorage`.

---

## Tecnologías utilizadas

- React
- TypeScript
- Vite
- Bootstrap
- API propia en Node/Express
- `localStorage` para guardado local simple

---

## Instalación

Clona el repositorio e instala dependencias:

```bash
npm install
```

Crea un archivo `.env` a partir de `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

Arranca el proyecto:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```txt
http://localhost:5173
```

---

## Scripts disponibles

```bash
npm run dev
```

Arranca el servidor de desarrollo.

```bash
npm run build
```

Compila el proyecto para producción y comprueba que TypeScript no rompe nada.

```bash
npm run preview
```

Sirve localmente la build generada.

---

## Flujo básico de uso

1. Abre la aplicación.
2. Se genera automáticamente un mercader.
3. Ajusta los filtros del sidebar si quieres controlar el resultado.
4. Pulsa **Generar mercader** para crear uno nuevo con esos filtros.
5. Cambia la actitud comercial si quieres modificar los precios.
6. Vende objetos desde el inventario.
7. Copia la ficha del mercader al portapapeles en formato Markdown compatible con [Homebrery.com](https://homebrewery.naturalcrit.com/) o guárdala en `localStorage`.

---

## Guardado local

Los mercaderes se guardan en el navegador usando `localStorage`.

Esto significa que:

- No necesitas cuenta.
- No se suben los datos a ningún servidor.
- Los datos solo existen en ese navegador.
- Si limpias los datos del navegador, puedes perder los mercaderes guardados.

La V1.0 guarda un máximo de **20 mercaderes locales**.

---

## Backend necesario

Este frontend espera que el backend esté activo en el puerto configurado en `.env`.

Endpoints principales utilizados:

- `POST /api/merchants/generate`
- `GET /api/merchant-options`
- `GET /api/merchants/price-modifier-options`
- `POST /api/merchants/calculate-sale`
- `POST /api/merchants/recalculate-inventory-prices`

---

## V1.0 — Generador simple

- [x] Generar un mercader con inventario al entrar a la aplicación.
- [x] Añadir filtros de generación en el sidebar.
- [x] Consumir desde backend las opciones de actitud/modificador de precio.
- [x] Recalcular los precios del inventario actual al cambiar la actitud del mercader.
- [x] Calcular ventas sobre el inventario actual.
- [x] Copiar mercader e inventario al portapapeles.
- [x] Guardar mercader generado en `localStorage`.

---

## Próximas versiones

### V2.0 — Edición y gestión

- [ ] Cargar mercaderes guardados desde `localStorage`.
- [ ] Reabrir mercaderes guardados para seguir gestionándolos.
- [ ] Editar campos individuales del mercader.
- [ ] Regenerar campos concretos del mercader.
- [ ] Editar notas del mercader y del inventario.
- [ ] Añadir objetos concretos al inventario.
- [ ] Añadir objetos aleatorios al inventario.
- [ ] Mejorar la navegación con rutas.

### Futuras mejoras

- [ ] Mejorar el diseño visual general.
- [ ] Añadir feedback visual al copiar o guardar.
- [ ] Añadir confirmaciones o avisos de guardado.
- [ ] Añadir exportación en varios formatos.
- [ ] Añadir persistencia en backend si el proyecto crece.

---

## Nota del proyecto

Mercaderes nace como una herramienta práctica para mesa: rápida, útil y sin demasiada ceremonia.

La prioridad es darle al DM un mercader jugable en segundos.

---

## Autoría

Proyecto creado por **Ignacio Furió**, bajo la marca creativa **Eddieden DM**.

Mercaderes es una herramienta fan-made para uso en partidas de rol. No es un producto oficial de Wizards of the Coast ni de ninguna editorial asociada.

---

## Licencia

Ver archivo `LICENSE`.