const API = {
  prospects: process.env.REACT_APP_PROSPECTS_URL || 'http://localhost:8001',
  sales:     process.env.REACT_APP_SALES_URL || 'http://localhost:8002',
  insurance: process.env.REACT_APP_INSURANCE_URL || 'http://localhost:8003',
  dashboard: process.env.REACT_APP_DASHBOARD_URL || 'http://localhost:8004',
};

async function request(base, path, options = {}) {
  const res = await fetch(`${base}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.detail || `HTTP ${res.status}`);
  return data;
}

export const api = {
  getMetrics:     ()           => request(API.dashboard, '/api/metrics'),
  getCatalogs:    ()           => request(API.dashboard, '/api/catalogs'),
  getProspects:   ()           => request(API.prospects, '/prospects'),
  getProspect:    (id)         => request(API.prospects, `/prospects/${id}`),
  createProspect: (d)          => request(API.prospects, '/prospects', { method:'POST', body:JSON.stringify(d) }),
  updateProspect: (id,d)       => request(API.prospects, `/prospects/${id}`, { method:'PATCH', body:JSON.stringify(d) }),
  getSales:       ()           => request(API.sales, '/sales'),
  createSale:     (d)          => request(API.sales, '/sales', { method:'POST', body:JSON.stringify(d) }),
  getConversion:  ()           => request(API.sales, '/sales/conversion'),
  getInsurance:   ()           => request(API.insurance, '/insurance'),
  createInsurance:(d)          => request(API.insurance, '/insurance', { method:'POST', body:JSON.stringify(d) }),
  getPerformance: ()           => request(API.dashboard, '/api/performance'),
  savePerformance:(d)          => request(API.dashboard, '/api/performance', { method:'POST', body:JSON.stringify(d) }),
  createVehicle: (d)           => request(API.dashboard, '/api/vehicles', { method:'POST', body:JSON.stringify(d) }),
  updateVehicle: (id,d)        => request(API.dashboard, `/api/vehicles/${id}`, { method:'PATCH', body:JSON.stringify(d) }),
  deleteVehicle: (id)          => request(API.dashboard, `/api/vehicles/${id}`, { method:'DELETE' }),
  createSeller:  (d)           => request(API.dashboard, '/api/sellers', { method:'POST', body:JSON.stringify(d) }),
};