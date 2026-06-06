interface VentaItem {
  id: string
  producto: string
  cantidad: number
  total: number
  sucursal: string
  fecha: string
}

interface TablaVentasProps {
  ventas: VentaItem[]
}

export function TablaVentas({ ventas }: TablaVentasProps) {
  if (ventas.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-sm">No hay ventas registradas</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-6 font-medium text-gray-500">Producto</th>
            <th className="text-left py-3 px-6 font-medium text-gray-500">Cantidad</th>
            <th className="text-left py-3 px-6 font-medium text-gray-500">Total</th>
            <th className="text-left py-3 px-6 font-medium text-gray-500">Sucursal</th>
            <th className="text-left py-3 px-6 font-medium text-gray-500">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((v) => (
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
  )
}
