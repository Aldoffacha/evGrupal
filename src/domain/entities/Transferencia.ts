export interface Transferencia {
  id: string
  productoId: string
  productoNombre: string
  cantidad: number
  sucursalOrigenId: string
  sucursalDestinoId: string
  estado: 'pendiente' | 'completada' | 'cancelada'
  fecha: string
}
