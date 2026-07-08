# AutoMotriz CRM Pro — Frontend

Frontend en **React** (Create React App, sin Vite) con **Bootstrap 5** (sin Tailwind), construido para el
requerimiento "Sistema de Gestión de Prospectos y Ventas para Empresa Automotriz".

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

## Conectar con tus microservicios

Todos los datos hoy vienen de `src/data/mockData.js`. Para conectar con tus
microservicios (Prospectos, Ventas, Seguros, Dashboard):

1. Crea un archivo `src/services/api.js` con tu cliente HTTP (fetch/axios) apuntando a las URLs de tus microservicios.
2. En cada componente de página (`Dashboard.jsx`, `Prospectos.jsx`, `Ventas.jsx`, `Seguros.jsx`, etc.) reemplaza el
   import de `mockData` por una llamada `useEffect` + `fetch` a tu API, guardando el resultado en `useState`.
3. Los formularios (`ProspectoModal`, `VentaModal`) ya emiten un objeto `form` en `onSave`; solo necesitas
   reemplazar el `setLista` local por un `POST` a tu microservicio correspondiente.

## Notas

- No se usó Vite ni Tailwind, tal como se solicitó — es un proyecto `react-scripts` (Create React App) con Bootstrap 5 vía npm.
- Los íconos son de `bootstrap-icons`.
- Los gráficos (barras, líneas, dona) usan `recharts`.
- Cada página está separada en su propia carpeta/componente para mantener el proyecto ordenado y facilitar que cada
  desarrollador del equipo (Backend, Frontend, QA) trabaje sobre módulos independientes.
