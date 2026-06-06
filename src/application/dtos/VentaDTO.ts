export interface VentaDTO {
  id: string
  productoId: string
  productoNombre: string
  cantidad: number
  total: number
  sucursalId: string
  fecha: string
}

export interface CrearVentaDTO {
  productoId: string
  cantidad: number
  sucursalId: string
}
