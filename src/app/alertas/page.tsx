import { AlertaBadge } from "@/components/ui/AlertaBadge";

interface Alerta {
  id: string
  tipo: "vencimiento" | "stock_bajo"
  mensaje: string
  fecha?: string
}

const alertas: Alerta[] = [
  { id: "a1", tipo: "vencimiento", mensaje: "Dexametasona 4mg (Sur) vence en 19 dias", fecha: "2026-06-25" },
  { id: "a2", tipo: "vencimiento", mensaje: "Omeprazol 20mg (Norte) vence en 29 dias", fecha: "2026-07-05" },
  { id: "a3", tipo: "vencimiento", mensaje: "Amoxicilina 500mg (Central) vence en 65 dias", fecha: "2026-08-10" },
  { id: "a4", tipo: "stock_bajo", mensaje: "Vitamina C 1000mg (Central) - stock en 0, minimo 10" },
  { id: "a5", tipo: "stock_bajo", mensaje: "Omeprazol 20mg (Norte) - stock en 3, minimo 10" },
  { id: "a6", tipo: "stock_bajo", mensaje: "Ibuprofeno 400mg (Central) - stock en 8, minimo 15" },
]

export default function AlertasPage() {
  const vencimiento = alertas.filter((a) => a.tipo === "vencimiento")
  const stockBajo = alertas.filter((a) => a.tipo === "stock_bajo")

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Alertas</h1>
      <p className="text-sm text-gray-500 mb-8">{alertas.length} alertas activas</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Proximos a vencer ({vencimiento.length})</h2>
          <div className="space-y-3">
            {vencimiento.map((a) => (
              <AlertaBadge key={a.id} tipo={a.tipo} mensaje={a.mensaje} fecha={a.fecha} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Stock bajo ({stockBajo.length})</h2>
          <div className="space-y-3">
            {stockBajo.map((a) => (
              <AlertaBadge key={a.id} tipo={a.tipo} mensaje={a.mensaje} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
