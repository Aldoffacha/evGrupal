import Link from "next/link";
import { TablaVentas } from "@/components/ui/TablaVentas";
import { SupabaseVentaRepository } from "@/infrastructure/repositories/SupabaseVentaRepository";
import { SupabaseSucursalRepository } from "@/infrastructure/repositories/SupabaseSucursalRepository";

export const dynamic = "force-dynamic";

export default async function VentasPage() {
  const ventaRepo = new SupabaseVentaRepository();
  const sucursalRepo = new SupabaseSucursalRepository();
  const [ventasRaw, sucursales] = await Promise.all([
    ventaRepo.listar(),
    sucursalRepo.listar(),
  ]);
  const mapaSucursal = new Map(sucursales.map((s) => [s.id, s.nombre]));

  const ventas = ventasRaw.map((v) => ({
    id: v.id,
    producto: v.productoNombre,
    cantidad: v.cantidad,
    total: v.total,
    sucursal: mapaSucursal.get(v.sucursalId) || "—",
    fecha: (v.fecha || "").slice(0, 10),
  }));

  const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0);
  const totalProductos = ventas.reduce((sum, v) => sum + v.cantidad, 0);
  const ticketPromedio = ventas.length > 0 ? totalVentas / ventas.length : 0;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ventas</h1>
          <p className="text-sm text-gray-500 mt-1">{ventas.length} ventas registradas</p>
        </div>
        <Link
          href="/ventas/nueva"
          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Nueva Venta
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total ventas</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">Bs {totalVentas.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Productos vendidos</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalProductos}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Ticket promedio</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">Bs {ticketPromedio.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Historial de Ventas</h2>
        </div>
        <TablaVentas ventas={ventas} />
      </div>
    </div>
  )
}
