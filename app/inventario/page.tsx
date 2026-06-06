import Link from "next/link";
import { ProductoCard } from "@/components/ui/ProductoCard";

const productos = [
  { id: "1", codigo: "MED-001", nombre: "Paracetamol 500mg", precio: 4.50, stock: 120, stockMinimo: 20, fechaVencimiento: "2026-12-15", sucursalId: "s1", sucursal: "Central", createdAt: "2026-01-15" },
  { id: "2", codigo: "MED-002", nombre: "Ibuprofeno 400mg", precio: 5.70, stock: 8, stockMinimo: 15, fechaVencimiento: "2026-11-20", sucursalId: "s1", sucursal: "Central", createdAt: "2026-01-15" },
  { id: "3", codigo: "MED-003", nombre: "Amoxicilina 500mg", precio: 8.00, stock: 45, stockMinimo: 10, fechaVencimiento: "2026-08-10", sucursalId: "s2", sucursal: "Norte", createdAt: "2026-02-01" },
  { id: "4", codigo: "MED-004", nombre: "Omeprazol 20mg", precio: 6.50, stock: 3, stockMinimo: 10, fechaVencimiento: "2026-07-05", sucursalId: "s2", sucursal: "Norte", createdAt: "2026-02-01" },
  { id: "5", codigo: "MED-005", nombre: "Loratadina 10mg", precio: 3.50, stock: 60, stockMinimo: 15, fechaVencimiento: "2027-01-30", sucursalId: "s3", sucursal: "Sur", createdAt: "2026-01-20" },
  { id: "6", codigo: "MED-006", nombre: "Dexametasona 4mg", precio: 9.00, stock: 25, stockMinimo: 5, fechaVencimiento: "2026-06-25", sucursalId: "s3", sucursal: "Sur", createdAt: "2026-03-10" },
  { id: "7", codigo: "MED-007", nombre: "Salbutamol Inhalador", precio: 25.00, stock: 15, stockMinimo: 5, fechaVencimiento: "2026-09-15", sucursalId: "s1", sucursal: "Central", createdAt: "2026-01-15" },
  { id: "8", codigo: "MED-008", nombre: "Vitamina C 1000mg", precio: 12.00, stock: 0, stockMinimo: 10, fechaVencimiento: "2027-05-20", sucursalId: "s1", sucursal: "Central", createdAt: "2026-04-01" },
]

export default function InventarioPage() {
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
          <ProductoCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  )
}
