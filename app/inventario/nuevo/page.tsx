import { FormProducto } from "@/components/forms/FormProducto";

export default function NuevoProductoPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Nuevo Producto</h1>
      <p className="text-sm text-gray-500 mb-8">Registra un nuevo producto en el inventario</p>
      <FormProducto />
    </div>
  )
}
