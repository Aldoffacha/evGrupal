interface AlertaBadgeProps {
  tipo: "vencimiento" | "stock_bajo"
  mensaje: string
  fecha?: string
}

export function AlertaBadge({ tipo, mensaje, fecha }: AlertaBadgeProps) {
  const config = {
    vencimiento: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      dot: "bg-amber-500",
      label: "Por vencer",
    },
    stock_bajo: {
      bg: "bg-red-50",
      border: "border-red-200",
      dot: "bg-red-500",
      label: "Stock bajo",
    },
  }

  const c = config[tipo]

  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border ${c.bg} ${c.border}`}>
      <div className={`w-2 h-2 rounded-full ${c.dot} mt-1.5 shrink-0`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{c.label}</p>
        <p className="text-sm text-gray-600 mt-0.5">{mensaje}</p>
        {fecha && <p className="text-xs text-gray-400 mt-1">{fecha}</p>}
      </div>
    </div>
  )
}
