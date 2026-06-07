import Link from "next/link";
import { SupabaseProductoRepository } from "@/infrastructure/repositories/SupabaseProductoRepository";
import { SupabaseVentaRepository } from "@/infrastructure/repositories/SupabaseVentaRepository";
import { SupabaseSucursalRepository } from "@/infrastructure/repositories/SupabaseSucursalRepository";
import { AlertaVencimiento } from "@/application/use-cases/alertas/AlertaVencimiento";
import { AlertaStockBajo } from "@/application/use-cases/alertas/AlertaStockBajo";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const productoRepo = new SupabaseProductoRepository();
  const ventaRepo = new SupabaseVentaRepository();
  const sucursalRepo = new SupabaseSucursalRepository();
  const [productos, ventas, sucursales, venc, stock] = await Promise.all([
    productoRepo.listar(),
    ventaRepo.listar(),
    sucursalRepo.listar(),
    new AlertaVencimiento(productoRepo).ejecutar(),
    new AlertaStockBajo(productoRepo).ejecutar(),
  ]);

  const mapaSucursal = new Map(sucursales.map((s) => [s.id, s.nombre]));
  const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0);

  const stats = [
    { label: "Productos en inventario", valor: String(productos.length), color: "bg-blue-500" },
    { label: "Ventas totales", valor: `Bs ${totalVentas.toLocaleString()}`, color: "bg-emerald-500" },
    { label: "Alertas activas", valor: String(venc.length + stock.length), color: "bg-amber-500" },
    { label: "Sucursales", valor: String(sucursales.length), color: "bg-purple-500" },
  ];

  const ventasRecientes = ventas.slice(0, 5).map((v) => ({
    id: v.id,
    producto: v.productoNombre,
    cantidad: v.cantidad,
    total: v.total,
    sucursal: mapaSucursal.get(v.sucursalId) || "—",
    fecha: (v.fecha || "").slice(0, 10),
  }));

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
              {ventasRecientes.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">No hay ventas registradas</td>
                </tr>
              )}
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
