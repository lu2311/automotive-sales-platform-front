export default function exportCSV(filename, headers, rows) {
  const csv = [
    headers.join(','),
    ...rows.map(r =>
      headers.map(h => `"${(r[h] ?? '').toString().replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csv);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
