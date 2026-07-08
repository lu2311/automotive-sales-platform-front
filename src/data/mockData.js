export const kpis = {
  totalProspectos: 1248,
  prospectosDelta: "+12.5%",
  ventasRealizadas: 384,
  ventasDelta: "+8.3%",
  ventasFallidas: 127,
  ventasFallidasDelta: "-3.2%",
  tasaConversion: 30.8,
  tasaConversionDelta: "+2.1%",
  segurosVinculados: 256,
  segurosDelta: "+15.7%",
  ventasDelMes: "2.4M",
  ventasDelMesDelta: "+5.9%",
};

export const embudoVentas = [
  { etapa: "Prospección", cantidad: 1248, porcentaje: 100 },
  { etapa: "Calificación", cantidad: 842, porcentaje: 67.5 },
  { etapa: "Negociación", cantidad: 511, porcentaje: 60.7 },
  { etapa: "Cierre", cantidad: 384, porcentaje: 75.1 },
];

export const ventasPorVendedor = [
  { nombre: "Carlos M.", ventas: 52 },
  { nombre: "Ana G.", ventas: 48 },
  { nombre: "Luis R.", ventas: 41 },
  { nombre: "María S.", ventas: 38 },
  { nombre: "Pedro L.", ventas: 35 },
  { nombre: "Sofía V.", ventas: 29 },
];

export const ventasMensuales2024 = [
  { mes: "Ene", monto: 145000 },
  { mes: "Feb", monto: 158000 },
  { mes: "Mar", monto: 149000 },
  { mes: "Abr", monto: 172000 },
  { mes: "May", monto: 168000 },
  { mes: "Jun", monto: 181000 },
  { mes: "Jul", monto: 176000 },
  { mes: "Ago", monto: 189000 },
  { mes: "Sep", monto: 195000 },
  { mes: "Oct", monto: 205000 },
  { mes: "Nov", monto: 218000 },
  { mes: "Dic", monto: 212000 },
];

export const segurosPorTipo = [
  { tipo: "Todo Riesgo", valor: 38, color: "#2952e3" },
  { tipo: "Responsabilidad Civil", valor: 28, color: "#17b26a" },
  { tipo: "Robo y Hurto", valor: 18, color: "#f79009" },
  { tipo: "Daños Parciales", valor: 16, color: "#7a5af8" },
];

export const prospectos = [
  { id: 1, nombre: "Roberto Díaz", telefono: "+57 300 123 4567", email: "roberto.diaz@email.com", vehiculo: "Toyota Hilux 2024", etapa: "Prospección", vendedor: "Carlos M.", ultimoContacto: "2024-11-15" },
  { id: 2, nombre: "Isabella Martin", telefono: "+57 311 234 5678", email: "isabella.martin@email.com", vehiculo: "Honda Civic 2024", etapa: "Calificación", vendedor: "Ana G.", ultimoContacto: "2024-11-14" },
  { id: 3, nombre: "Fernando Gómez", telefono: "+57 320 345 6789", email: "fernando.gomez@email.com", vehiculo: "Mazda CX-5 2024", etapa: "Negociación", vendedor: "Luis R.", ultimoContacto: "2024-11-13" },
  { id: 4, nombre: "Camila Ruiz", telefono: "+57 315 456 7890", email: "camila.ruiz@email.com", vehiculo: "Hyundai Tucson 2024", etapa: "Cierre", vendedor: "María S.", ultimoContacto: "2024-11-12" },
  { id: 5, nombre: "Santiago Pérez", telefono: "+57 318 567 8901", email: "santiago.perez@email.com", vehiculo: "Kia Sportage 2024", etapa: "Prospección", vendedor: "Pedro L.", ultimoContacto: "2024-11-11" },
  { id: 6, nombre: "Valentina Cruz", telefono: "+57 313 678 9012", email: "valentina.cruz@email.com", vehiculo: "Renault Duster 2024", etapa: "Calificación", vendedor: "Sofía V.", ultimoContacto: "2024-11-10" },
  { id: 7, nombre: "Daniel Vargas", telefono: "+57 319 789 0123", email: "daniel.vargas@email.com", vehiculo: "Ford Explorer 2024", etapa: "Negociación", vendedor: "Carlos M.", ultimoContacto: "2024-11-09" },
  { id: 8, nombre: "Laura Mora", telefono: "+57 312 890 1234", email: "laura.mora@email.com", vehiculo: "Chevrolet Equinox 2024", etapa: "Cierre", vendedor: "Ana G.", ultimoContacto: "2024-11-08" },
];

export const ventas = [
  { id: 1, cliente: "Ricardo Flores", vehiculo: "Toyota Corolla 2024", vendedor: "Carlos M.", seguro: "Todo Riesgo", estado: "Venta realizada", fecha: "2024-11-15", monto: 28500 },
  { id: 2, cliente: "Valeria Torres", vehiculo: "Honda CR-V 2024", vendedor: "Ana G.", seguro: "Robo y Hurto", estado: "En negociación", fecha: "2024-11-14", monto: 35200 },
  { id: 3, cliente: "Miguel Herrera", vehiculo: "Ford Mustang 2024", vendedor: "Luis R.", seguro: "Todo Riesgo", estado: "Venta realizada", fecha: "2024-11-13", monto: 52800 },
  { id: 4, cliente: "Claudia Sánchez", vehiculo: "Chevrolet Tracker 2024", vendedor: "María S.", seguro: "RC", estado: "Venta fallida", fecha: "2024-11-12", monto: 24300 },
  { id: 5, cliente: "Andrés Morales", vehiculo: "Nissan Frontier 2024", vendedor: "Pedro L.", seguro: "Todo Riesgo", estado: "Venta realizada", fecha: "2024-11-11", monto: 41600 },
  { id: 6, cliente: "Patricia López", vehiculo: "BMW Serie 3 2024", vendedor: "Sofía V.", seguro: "Daños Parciales", estado: "En negociación", fecha: "2024-11-10", monto: 68900 },
];

export const seguros = {
  prospectados: 312,
  vendidos: 256,
  primaEsperada: "1.24M",
  primaReal: "1.08M",
  detalle: [
    { id: 1, cliente: "Ricardo Flores", vehiculo: "Toyota Corolla 2024", tipo: "Todo Riesgo", primaEsperada: 1200, primaReal: 1050, estado: "Venta realizada", fecha: "2024-11-15" },
    { id: 2, cliente: "Valeria Torres", vehiculo: "Honda CR-V 2024", tipo: "Robo y Hurto", primaEsperada: 800, primaReal: null, estado: "En negociación", fecha: "2024-11-14" },
    { id: 3, cliente: "Miguel Herrera", vehiculo: "Ford Mustang 2024", tipo: "Todo Riesgo", primaEsperada: 1800, primaReal: 1750, estado: "Venta realizada", fecha: "2024-11-13" },
    { id: 4, cliente: "Claudia Sánchez", vehiculo: "Chevrolet Tracker 2024", tipo: "RC", primaEsperada: 650, primaReal: null, estado: "Venta fallida", fecha: "2024-11-12" },
    { id: 5, cliente: "Andrés Morales", vehiculo: "Nissan Frontier 2024", tipo: "Todo Riesgo", primaEsperada: 1400, primaReal: 1400, estado: "Venta realizada", fecha: "2024-11-11" },
  ],
};

export const vehiculos = [
  { id: 1, nombre: "Toyota Corolla 2024", marca: "Toyota", precio: 28500, stock: 8, disponible: true, imagen: "https://images.unsplash.com/photo-1623869675184-eea2264ec19a?w=500&q=80" },
  { id: 2, nombre: "Mazda CR-V 2024", marca: "Mazda", precio: 35200, stock: 5, disponible: true, imagen: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=500&q=80" },
  { id: 3, nombre: "Ford Mustang 2024", marca: "Ford", precio: 52800, stock: 3, disponible: true, imagen: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=500&q=80" },
  { id: 4, nombre: "BMW Serie 3 2024", marca: "BMW", precio: 68900, stock: 2, disponible: false, imagen: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&q=80" },
  { id: 5, nombre: "Mazda CX-5 2024", marca: "Mazda", precio: 32100, stock: 6, disponible: true, imagen: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&q=80" },
  { id: 6, nombre: "Chevrolet Tracker 2024", marca: "Chevrolet", precio: 24300, stock: 0, disponible: false, imagen: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=500&q=80" },
  { id: 7, nombre: "Nissan Frontier 2024", marca: "Nissan", precio: 41600, stock: 4, disponible: true, imagen: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=500&q=80" },
  { id: 8, nombre: "Hyundai Tucson 2024", marca: "Hyundai", precio: 29800, stock: 7, disponible: true, imagen: "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=500&q=80" },
];

export const vendedores = [
  { id: 1, nombre: "Carlos Mendoza", rol: "Asesor Senior", rating: 4.5, ventas: 52, prospectos: 18, conversion: 76, meta: 60, avanceMeta: 87 },
  { id: 2, nombre: "Ana García", rol: "Asesora Senior", rating: 4.8, ventas: 48, prospectos: 22, conversion: 68, meta: 50, avanceMeta: 96 },
  { id: 3, nombre: "Luis Rodríguez", rol: "Asesor Junior", rating: 4.2, ventas: 41, prospectos: 15, conversion: 71, meta: 45, avanceMeta: 89 },
  { id: 4, nombre: "María Soto", rol: "Asesora Comercial", rating: 4.3, ventas: 38, prospectos: 19, conversion: 65, meta: 40, avanceMeta: 99 },
  { id: 5, nombre: "Pedro Leal", rol: "Asesor Junior", rating: 4.0, ventas: 35, prospectos: 24, conversion: 58, meta: 40, avanceMeta: 88 },
  { id: 6, nombre: "Sofía Vargas", rol: "Asesora Junior", rating: 4.1, ventas: 29, prospectos: 20, conversion: 52, meta: 35, avanceMeta: 83 },
];

export const workflowSteps = [
  { id: 1, titulo: "Prospecto registrado", descripcion: "Trigger al crear prospecto", icono: "bi-person-plus", color: "primary" },
  { id: 2, titulo: "Esperar 3 días", descripcion: "Tiempo de espera configurado", icono: "bi-clock-history", color: "warning" },
  { id: 3, titulo: "Enviar recordatorio", descripcion: "Email / WhatsApp automático", icono: "bi-send", color: "info" },
  { id: 4, titulo: "Actualizar estado", descripcion: "CRM actualizado automáticamente", icono: "bi-arrow-repeat", color: "success" },
  { id: 5, titulo: "Notificar asesor", descripcion: "Push + email al asesor asignado", icono: "bi-bell", color: "danger" },
];

export const workflowEstado = {
  estado: "Activo",
  ultimaEjecucion: "Hoy 09:32 AM",
  tiempoPromedio: "3.3 días",
  ejecucionesTotales: 1246,
  errores: 3,
  log: [
    { texto: "Workflow ejecutado para Roberto D.", hace: "hace 5m", tipo: "success" },
    { texto: "Recordatorio enviado a Isabella M.", hace: "hace 3h", tipo: "info" },
    { texto: "Error al notificar al asesor", hace: "hace 5h", tipo: "danger" },
    { texto: "Estado actualizado: Fernando G.", hace: "hace 7h", tipo: "success" },
  ],
};

export const distribucionPorEtapa = [
  { etapa: "Prospección", valor: 1248, color: "#2952e3" },
  { etapa: "Calificación", valor: 842, color: "#5b7ef2" },
  { etapa: "Negociación", valor: 511, color: "#93b0f7" },
  { etapa: "Cierre", valor: 384, color: "#c6d5fb" },
];

export const tendenciaAnual = ventasMensuales2024;

export const usuarioActual = {
  nombre: "Juan Martínez",
  rol: "Gerente Comercial",
  empresa: "AutoMotriz CRM Pro",
};
