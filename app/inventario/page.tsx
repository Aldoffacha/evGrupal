import Link from "next/link";
import { ProductoCard } from "@/components/ui/ProductoCard";
import { SupabaseProductoRepository } from "@/infrastructure/repositories/SupabaseProductoRepository";
import { SupabaseSucursalRepository } from "@/infrastructure/repositories/SupabaseSucursalRepository";

export const dynamic = "force-dynamic";

export default async function InventarioPage() {
  const productoRepo = new SupabaseProductoRepository();
  const sucursalRepo = new SupabaseSucursalRepository();
  const [productos, sucursales] = await Promise.all([
    productoRepo.listar(),
    sucursalRepo.listar(),
  ]);
  const mapaSucursal = new Map(sucursales.map((s) => [s.id, s.nombre]));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventario</h1>
          <p className="text-sm text-gray-500 mt-1">{productos.length} productos registrados</p>
        </div>
        <Link
          href="/inventario/nuevo"
          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Nuevo Producto
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {productos.map((p) => (
          <ProductoCard key={p.id} {...p} sucursal={mapaSucursal.get(p.sucursalId) || "—"} />
        ))}
      </div>
    </div>
  )
}
