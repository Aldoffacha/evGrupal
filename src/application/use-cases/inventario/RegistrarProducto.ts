import { IProductoRepository } from '@/domain/ports/IProductoRepository'

export class RegistrarProducto {
  constructor(private repo: IProductoRepository) {}

  async ejecutar(data: {
    codigo: string
    nombre: string
    precio: number
    stock: number
    stockMinimo: number
    fechaVencimiento: string
    sucursalId: string
  }) {
    if (!data.codigo || !data.nombre || data.precio <= 0) {
      throw new Error('Datos de producto inválidos')
    }
    return this.repo.crear(data)
  }
}
