import Link from "next/link";

const sucursales = [
  { id: "s1", nombre: "Central", direccion: "Av. Principal #123, Zona Central", productos: 320, ventasMes: 18200 },
  { id: "s2", nombre: "Norte", direccion: "Calle 5 #456, Zona Norte", productos: 180, ventasMes: 12400 },
  { id: "s3", nombre: "Sur", direccion: "Av. Secundaria #789, Zona Sur", productos: 95, ventasMes: 8700 },
]

export default function SucursalesPage() {
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
        {sucursales.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">{s.nombre}</h2>
            <p className="text-sm text-gray-500 mt-1">{s.direccion}</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400">Productos</p>
                <p className="text-xl font-bold text-gray-900">{s.productos}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Ventas del mes</p>
                <p className="text-xl font-bold text-gray-900">Bs {s.ventasMes.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
