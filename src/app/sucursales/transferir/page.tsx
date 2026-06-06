import { FormTransferencia } from "@/components/forms/FormTransferencia";

export default function TransferirPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Transferir Producto</h1>
      <p className="text-sm text-gray-500 mb-8">Transfiere stock entre sucursales</p>
      <FormTransferencia />
    </div>
  )
}
