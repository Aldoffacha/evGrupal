import Link from "next/link";

const stats = [
  { label: "Productos en inventario", valor: "1,234", color: "bg-blue-500" },
  { label: "Ventas del mes", valor: "Bs 45,678", color: "bg-emerald-500" },
  { label: "Alertas activas", valor: "12", color: "bg-amber-500" },
  { label: "Sucursales", valor: "3", color: "bg-purple-500" },
];

const ventasRecientes = [
  { id: "V-001", producto: "Paracetamol 500mg", cantidad: 10, total: 45.00, sucursal: "Central", fecha: "2026-06-05" },
  { id: "V-002", producto: "Ibuprofeno 400mg", cantidad: 5, total: 28.50, sucursal: "Norte", fecha: "2026-06-05" },
  { id: "V-003", producto: "Amoxicilina 500mg", cantidad: 8, total: 64.00, sucursal: "Central", fecha: "2026-06-04" },
  { id: "V-004", producto: "Omeprazol 20mg", cantidad: 15, total: 97.50, sucursal: "Sur", fecha: "2026-06-04" },
  { id: "V-005", producto: "Loratadina 10mg", cantidad: 12, total: 42.00, sucursal: "Norte", fecha: "2026-06-03" },
];

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className={`w-3 h-3 rounded-full ${s.color} mb-3`} />
            <p className="text-2xl font-bold text-gray-900">{s.valor}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Ventas Recientes</h2>
          <Link href="/ventas" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
            Ver todas
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-6 font-medium text-gray-500">Producto</th>
                <th className="text-left py-3 px-6 font-medium text-gray-500">Cantidad</th>
                <th className="text-left py-3 px-6 font-medium text-gray-500">Total</th>
                <th className="text-left py-3 px-6 font-medium text-gray-500">Sucursal</th>
                <th className="text-left py-3 px-6 font-medium text-gray-500">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ventasRecientes.map((v) => (
                <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-6 text-gray-900">{v.producto}</td>
                  <td className="py-3 px-6 text-gray-700">{v.cantidad}</td>
                  <td className="py-3 px-6 text-gray-900 font-medium">Bs {v.total.toFixed(2)}</td>
                  <td className="py-3 px-6">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {v.sucursal}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-gray-500">{v.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
