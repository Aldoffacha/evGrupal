import Link from "next/link";
import { SupabaseSucursalRepository } from "@/infrastructure/repositories/SupabaseSucursalRepository";
import { SupabaseProductoRepository } from "@/infrastructure/repositories/SupabaseProductoRepository";
import { SupabaseVentaRepository } from "@/infrastructure/repositories/SupabaseVentaRepository";

export const dynamic = "force-dynamic";

export default async function SucursalesPage() {
  const sucursalRepo = new SupabaseSucursalRepository();
  const productoRepo = new SupabaseProductoRepository();
  const ventaRepo = new SupabaseVentaRepository();
  const [sucursales, productos, ventas] = await Promise.all([
    sucursalRepo.listar(),
    productoRepo.listar(),
    ventaRepo.listar(),
  ]);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sucursales</h1>
          <p className="text-sm text-gray-500 mt-1">{sucursales.length} sucursales</p>
        </div>
        <Link
          href="/sucursales/transferir"
          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Transferir Producto
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {sucursales.map((s) => {
          const totalProductos = productos.filter((p) => p.sucursalId === s.id).length;
          const ventasMes = ventas
            .filter((v) => v.sucursalId === s.id)
            .reduce((sum, v) => sum + v.total, 0);
          return (
            <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">{s.nombre}</h2>
              <p className="text-sm text-gray-500 mt-1">{s.direccion}</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400">Productos</p>
                  <p className="text-xl font-bold text-gray-900">{totalProductos}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Ventas del mes</p>
                  <p className="text-xl font-bold text-gray-900">Bs {ventasMes.toLocaleString()}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
