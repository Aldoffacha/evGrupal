import Link from "next/link";
import { TablaVentas } from "@/components/ui/TablaVentas";

const ventas = [
  { id: "V-001", producto: "Paracetamol 500mg", cantidad: 10, total: 45.00, sucursal: "Central", fecha: "2026-06-05" },
  { id: "V-002", producto: "Ibuprofeno 400mg", cantidad: 5, total: 28.50, sucursal: "Norte", fecha: "2026-06-05" },
  { id: "V-003", producto: "Amoxicilina 500mg", cantidad: 8, total: 64.00, sucursal: "Central", fecha: "2026-06-04" },
  { id: "V-004", producto: "Omeprazol 20mg", cantidad: 15, total: 97.50, sucursal: "Sur", fecha: "2026-06-04" },
  { id: "V-005", producto: "Loratadina 10mg", cantidad: 12, total: 42.00, sucursal: "Norte", fecha: "2026-06-03" },
  { id: "V-006", producto: "Salbutamol Inhalador", cantidad: 3, total: 75.00, sucursal: "Central", fecha: "2026-06-03" },
  { id: "V-007", producto: "Dexametasona 4mg", cantidad: 7, total: 63.00, sucursal: "Sur", fecha: "2026-06-02" },
  { id: "V-008", producto: "Vitamina C 1000mg", cantidad: 20, total: 240.00, sucursal: "Central", fecha: "2026-06-02" },
]

export default function VentasPage() {
  const totalVentas = ventas.reduce((sum, v) => sum + v.total, 0)
  const totalProductos = ventas.reduce((sum, v) => sum + v.cantidad, 0)

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
          <p className="text-2xl font-bold text-gray-900 mt-1">Bs {(totalVentas / ventas.length).toFixed(2)}</p>
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
