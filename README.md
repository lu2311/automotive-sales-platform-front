# AutoMotriz CRM Pro — Frontend

Frontend en React, construido para el requerimiento "Sistema de Gestión de Prospectos y Ventas para Empresa Automotriz".

## Estructura de componentes

```
src/
  components/
    Layout/            Sidebar y Topbar (menú lateral + barra superior)
    Dashboard/          Dashboard.jsx + StatCard, SalesFunnel, SalesByVendor, MonthlySales, InsuranceByType
    Prospectos/         Prospectos.jsx + ProspectoRow, ProspectoModal
    Ventas/              Ventas.jsx + VentaModal
    Seguros/             Seguros.jsx
    Vehiculos/           Vehiculos.jsx + VehiculoCard
    Vendedores/          Vendedores.jsx + VendedorCard
    Automatizaciones/    Automatizaciones.jsx + WorkflowStep, WorkflowStatusPanel
    Reportes/            Reportes.jsx
    Configuracion/       Configuracion.jsx
    common/              PageHeader, StatCard, EtapaBadge, EstadoBadge (compartidos)
  data/
    mockData.js          Datos simulados (reemplazar por llamadas a tus microservicios)
  styles/
    index.css            Paleta de colores y estilos globales
  App.js                 Enrutamiento (react-router-dom)
  index.js                Punto de entrada
```

## Instalación y ejecución

1. Necesitas Node.js 18+ instalado.
2. Dentro de la carpeta del proyecto, instala dependencias:

```bash
npm install
```

3. Levanta el entorno de desarrollo:

```bash
npm start
```

La app se abrirá en `http://localhost:3000`.

4. Para generar el build de producción:

```bash
npm run build
```
