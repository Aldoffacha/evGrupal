interface ProductoCardProps {
  id: string
  codigo: string
  nombre: string
  precio: number
  stock: number
  stockMinimo: number
  fechaVencimiento: string
  sucursal: string
}

const AHORA = Date.now()

export function ProductoCard({ codigo, nombre, precio, stock, stockMinimo, fechaVencimiento, sucursal }: ProductoCardProps) {
  const stockBajo = stock <= stockMinimo
  const proximoVencer = () => {
    const dias = Math.ceil((new Date(fechaVencimiento).getTime() - AHORA) / (1000 * 60 * 60 * 24))
    return dias <= 30 && dias > 0
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-gray-400 font-mono">{codigo}</p>
          <h3 className="text-sm font-semibold text-gray-900 mt-0.5">{nombre}</h3>
        </div>
        {stockBajo && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
            Stock bajo
          </span>
        )}
        {proximoVencer() && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
            Por vencer
          </span>
        )}
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Precio</span>
          <span className="font-medium text-gray-900">Bs {precio.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Stock</span>
          <span className={`font-medium ${stockBajo ? 'text-red-600' : 'text-gray-900'}`}>
            {stock} uni.
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Vence</span>
          <span className={`font-medium ${proximoVencer() ? 'text-amber-600' : 'text-gray-900'}`}>
            {fechaVencimiento}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Sucursal</span>
          <span className="font-medium text-gray-900">{sucursal}</span>
        </div>
      </div>
    </div>
  )
}
