export interface Producto {
  id: string
  codigo: string
  nombre: string
  precio: number
  stock: number
  stockMinimo: number
  fechaVencimiento: string
  sucursalId: string
  createdAt: string
}
