// Repositorio en memoria: doce pedidos fijos, para que las pruebas den siempre lo mismo.

const ESTADOS = ['Pendiente', 'Despachado', 'Entregado'];

const linea = (producto, cantidad, precioUnitario) => ({
  producto, cantidad, precioUnitario, subtotal: cantidad * precioUnitario
});

const pedido = (numero, fecha, estado, cliente, ...lineas) => ({
  numero, fecha, estado, cliente, lineas, total: lineas.reduce((suma, l) => suma + l.subtotal, 0)
});

const TODOS = [
  pedido(1001, '2026-09-02', 'Entregado', 'Agrícola Los Robles', linea('Fertilizante NPK 25 kg', 10, 18500)),
  pedido(1002, '2026-09-05', 'Entregado', 'Viñedos del Sur', linea('Fungicida 1 L', 6, 12900), linea('Guantes de nitrilo', 20, 1500)),
  pedido(1003, '2026-09-11', 'Despachado', 'Agrícola Los Robles', linea('Semilla de maíz 20 kg', 4, 45000)),
  pedido(1004, '2026-09-14', 'Pendiente', 'Frutícola Andes', linea('Riego por goteo 100 m', 3, 32000)),
  pedido(1005, '2026-09-20', 'Despachado', 'Huerto San José', linea('Insecticida 500 ml', 8, 9800)),
  pedido(1006, '2026-09-23', 'Entregado', 'Viñedos del Sur', linea('Tijera de podar', 12, 7900)),
  pedido(1007, '2026-09-29', 'Pendiente', 'Agrícola Los Robles', linea('Fertilizante foliar 5 L', 5, 21000)),
  pedido(1008, '2026-10-02', 'Despachado', 'Frutícola Andes', linea('Malla antiheladas', 2, 89000)),
  pedido(1009, '2026-10-06', 'Pendiente', 'Huerto San José', linea('Sustrato 50 L', 15, 6500)),
  pedido(1010, '2026-10-09', 'Entregado', 'Agrícola Los Robles', linea('Herbicida 1 L', 7, 11200)),
  pedido(1011, '2026-10-14', 'Despachado', 'Viñedos del Sur', linea('Bomba de espalda 16 L', 2, 54000)),
  pedido(1012, '2026-10-20', 'Pendiente', 'Frutícola Andes', linea('Fertilizante NPK 25 kg', 20, 18500))
];

// Filtra por estado (vacío = todos) y por número exacto (vacío = todos).
function buscar(estado, numero) {
  return TODOS
    .filter(p => !estado || !estado.trim() || p.estado === estado)
    .filter(p => !numero || !numero.trim() || String(p.numero) === numero.trim());
}

function porNumero(numero) {
  return TODOS.find(p => p.numero === numero);
}

module.exports = { ESTADOS, buscar, porNumero };
