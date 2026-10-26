// App original del PoC: páginas armadas en el servidor con plantillas EJS (views/).
// npm start la levanta en http://localhost:8080
const express = require('express');
const session = require('express-session');
const path = require('path');
const { ESTADOS, buscar, porNumero } = require('./datos');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'poc-multiagente', resave: false, saveUninitialized: false }));
app.use((req, res, next) => { res.locals.usuario = req.session.usuario; next(); });

// Formato chileno: $1.234.567 y fechas dd-mm-aaaa
app.locals.pesos = n => '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
app.locals.fecha = iso => iso.split('-').reverse().join('-');

const conSesion = (req, res, next) => (req.session.usuario ? next() : res.redirect('/login?expirada=1'));

app.get('/', (req, res) => res.redirect(req.session.usuario ? '/pedidos' : '/login'));

// Usuario de prueba del ejercicio: prueba / prueba123 (no es una credencial real)
app.get('/login', (req, res) => res.render('login', { error: null, expirada: req.query.expirada !== undefined }));
app.post('/login', (req, res) => {
  if (req.body.usuario === 'prueba' && req.body.clave === 'prueba123') {
    req.session.usuario = req.body.usuario;
    return res.redirect('/pedidos');
  }
  res.render('login', { error: 'Usuario o clave incorrectos', expirada: req.query.expirada !== undefined });
});

app.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/login')));

app.get('/pedidos', conSesion, (req, res) => {
  const estado = req.query.estado || '';
  const numero = req.query.numero || '';
  res.render('pedidos', { lista: buscar(estado, numero), ESTADOS, estado, numero });
});

app.get('/pedido', conSesion, (req, res) => {
  res.render('pedido', { p: porNumero(Number.parseInt(req.query.numero, 10)) });
});

app.get('/contacto', conSesion, (req, res) => res.render('contacto', { error: null, enviado: false }));
app.post('/contacto', conSesion, (req, res) => {
  const { nombre, correo, mensaje } = req.body;
  let error = null;
  if (!nombre?.trim() || !correo?.trim() || !mensaje?.trim()) {
    error = 'Completa todos los campos.';
  } else if (!correo.includes('@')) {
    error = 'El correo no es válido.';
  }
  // en el ejercicio no se envía nada: solo se confirma
  res.render('contacto', { error, enviado: !error });
});

// API JSON que la app nueva (Angular) puede consumir. Las páginas no la usan: leen los datos directo.
// Sin autenticación, solo para el ejercicio. Permite llamadas desde http://localhost:4201 (ng serve).
app.use('/api', (req, res, next) => { res.set('Access-Control-Allow-Origin', 'http://localhost:4201'); next(); });
const resumen = ({ lineas, ...p }) => p;

app.get('/api/pedidos', (req, res) => res.json(buscar(req.query.estado, req.query.numero).map(resumen)));
app.get('/api/pedidos/:numero', (req, res) => {
  if (!/^\d+$/.test(req.params.numero)) {
    return res.status(400).json({ error: 'Número de pedido inválido' });
  }
  const p = porNumero(Number(req.params.numero));
  if (!p) {
    return res.status(404).json({ error: `No existe el pedido ${req.params.numero}` });
  }
  res.json({ ...resumen(p), lineas: p.lineas });
});

const PUERTO = process.env.PORT || 8080;
app.listen(PUERTO, () => console.log(`App original en http://localhost:${PUERTO}`));
