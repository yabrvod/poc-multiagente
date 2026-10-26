# Pedidos (app original)

Aplicación web mínima con **páginas armadas en el servidor**: Node.js con Express y plantillas **EJS**
(HTML con etiquetas `<% %>` que el servidor completa antes de enviar la página, igual que JSP o PHP). Es el
sistema que se migra en este PoC y la **referencia**: durante el ejercicio no se modifica. La app nueva, en
Angular, se construye en `../nuevo/`.

## Levantarla

Requisito: Node.js 20 o superior (el mismo que usan Angular y Playwright).

```bash
cd original
npm install
npm start
```

Queda en http://localhost:8080. Para detenerla: `Ctrl+C`.

Usuario de prueba: `prueba` · clave `prueba123` (credencial del ejercicio, no es real).

## Qué tiene

| Página | Ruta | Plantilla | Qué hace |
|---|---|---|---|
| Inicio de sesión | `/login` | `views/login.ejs` | Usuario y clave; avisa si la clave es incorrecta o si la sesión expiró |
| Mis pedidos | `/pedidos` | `views/pedidos.ejs` | Listado con filtro por estado y por número; mensaje cuando no hay resultados |
| Detalle | `/pedido?numero=1001` | `views/pedido.ejs` | Líneas y total del pedido; aviso si no existe |
| Contacto | `/contacto` | `views/contacto.ejs` | Formulario con validación de campos vacíos y de correo |

Las rutas y la lógica están en `server.js`; la cabecera común, en `views/_cabecera.ejs`.

Además expone una **API JSON** para que la app nueva la consuma (sin autenticación, solo para el ejercicio):

- `GET /api/pedidos?estado=&numero=`
- `GET /api/pedidos/{numero}` (404 si no existe, 400 si no es un número)

Los datos son doce pedidos fijos en memoria (`datos.js`), así las pruebas dan siempre el mismo resultado.
