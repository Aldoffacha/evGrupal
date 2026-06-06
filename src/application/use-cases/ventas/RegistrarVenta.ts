import { IProductoRepository } from '@/domain/ports/IProductoRepository'
import { IVentaRepository } from '@/domain/ports/IVentaRepository'

export class RegistrarVenta {
  constructor(
    private productRepo: IProductoRepository,
    private ventaRepo: IVentaRepository
  ) {}

  async ejecutar(data: { productoId: string; cantidad: number; sucursalId: string }) {
    const producto = await this.productRepo.obtenerPorId(data.productoId)
    if (!producto) throw new Error('Producto no encontrado')
    if (producto.stock < data.cantidad) throw new Error('Stock insuficiente')

    const total = producto.precio * data.cantidad

    await this.productRepo.actualizar(producto.id, { stock: producto.stock - data.cantidad })

    return this.ventaRepo.crear({
      productoId: producto.id,
      productoNombre: producto.nombre,
      cantidad: data.cantidad,
      total,
      sucursalId: data.sucursalId,
    })
  }
}
