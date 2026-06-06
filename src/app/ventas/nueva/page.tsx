import { FormVenta } from "@/components/forms/FormVenta";

export default function NuevaVentaPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Nueva Venta</h1>
      <p className="text-sm text-gray-500 mb-8">Registra una nueva venta de productos</p>
      <FormVenta />
    </div>
  )
}
