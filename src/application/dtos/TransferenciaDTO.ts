export interface TransferenciaDTO {
  id: string
  productoId: string
  productoNombre: string
  cantidad: number
  sucursalOrigenId: string
  sucursalDestinoId: string
  estado: 'pendiente' | 'completada' | 'cancelada'
  fecha: string
}

export interface CrearTransferenciaDTO {
  productoId: string
  sucursalDestinoId: string
  cantidad: number
}
