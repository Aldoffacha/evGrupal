import { AlertaBadge } from "@/components/ui/AlertaBadge";
import { SupabaseProductoRepository } from "@/infrastructure/repositories/SupabaseProductoRepository";
import { SupabaseSucursalRepository } from "@/infrastructure/repositories/SupabaseSucursalRepository";
import { AlertaVencimiento } from "@/application/use-cases/alertas/AlertaVencimiento";
import { AlertaStockBajo } from "@/application/use-cases/alertas/AlertaStockBajo";

export const dynamic = "force-dynamic";

const AHORA = Date.now();

export default async function AlertasPage() {
  const repo = new SupabaseProductoRepository();
  const sucursalRepo = new SupabaseSucursalRepository();
  const [vencProds, stockProds, sucursales] = await Promise.all([
    new AlertaVencimiento(repo).ejecutar(),
    new AlertaStockBajo(repo).ejecutar(),
    sucursalRepo.listar(),
  ]);
  const mapa = new Map(sucursales.map((s) => [s.id, s.nombre]));
  const dias = (f: string) =>
    Math.ceil((new Date(f).getTime() - AHORA) / (1000 * 60 * 60 * 24));

  const vencimiento = vencProds.map((p) => ({
    id: p.id,
    mensaje: `${p.nombre} (${mapa.get(p.sucursalId) || "—"}) vence en ${dias(p.fechaVencimiento)} dias`,
    fecha: p.fechaVencimiento,
  }));
  const stockBajo = stockProds.map((p) => ({
    id: p.id,
    mensaje: `${p.nombre} (${mapa.get(p.sucursalId) || "—"}) - stock en ${p.stock}, minimo ${p.stockMinimo}`,
  }));
  const total = vencimiento.length + stockBajo.length;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Alertas</h1>
      <p className="text-sm text-gray-500 mb-8">{total} alertas activas</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Proximos a vencer ({vencimiento.length})</h2>
          <div className="space-y-3">
            {vencimiento.map((a) => (
              <AlertaBadge key={a.id} tipo="vencimiento" mensaje={a.mensaje} fecha={a.fecha} />
            ))}
            {vencimiento.length === 0 && <p className="text-sm text-gray-400">Sin alertas de vencimiento.</p>}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Stock bajo ({stockBajo.length})</h2>
          <div className="space-y-3">
            {stockBajo.map((a) => (
              <AlertaBadge key={a.id} tipo="stock_bajo" mensaje={a.mensaje} />
            ))}
            {stockBajo.length === 0 && <p className="text-sm text-gray-400">Sin alertas de stock bajo.</p>}
          </div>
        </section>
      </div>
    </div>
  )
}
