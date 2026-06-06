interface StockIndicadorProps {
  actual: number
  minimo: number
}

export function StockIndicador({ actual, minimo }: StockIndicadorProps) {
  const porcentaje = minimo > 0 ? Math.min((actual / minimo) * 100, 100) : 100
  const nivel = actual <= 0 ? "critico" : actual <= minimo ? "bajo" : "normal"

  const colores = {
    critico: "bg-red-500",
    bajo: "bg-amber-500",
    normal: "bg-emerald-500",
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">{actual} uni.</span>
        <span className="text-gray-400">min: {minimo}</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${colores[nivel]}`}
          style={{ width: `${porcentaje}%` }}
        />
      </div>
    </div>
  )
}
