import { IProductoRepository } from '@/domain/ports/IProductoRepository'

export class ActualizarStock {
  constructor(private repo: IProductoRepository) {}

  async ejecutar(productoId: string, cantidad: number) {
    const producto = await this.repo.obtenerPorId(productoId)
    if (!producto) throw new Error('Producto no encontrado')

    const nuevoStock = producto.stock + cantidad
    if (nuevoStock < 0) throw new Error('Stock insuficiente')

    return this.repo.actualizar(productoId, { stock: nuevoStock })
  }
}
