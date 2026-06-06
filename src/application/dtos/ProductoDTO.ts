export interface ProductoDTO {
  id: string
  codigo: string
  nombre: string
  precio: number
  stock: number
  stockMinimo: number
  fechaVencimiento: string
  sucursalId: string
}

export interface CrearProductoDTO {
  codigo: string
  nombre: string
  precio: number
  stock: number
  stockMinimo: number
  fechaVencimiento: string
  sucursalId: string
}
