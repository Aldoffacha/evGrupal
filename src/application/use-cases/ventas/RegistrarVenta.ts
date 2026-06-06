import { IProductoRepository } from '@/domain/ports/IProductoRepository'
import { IVentaRepository } from '@/domain/ports/IVentaRepository'
import { Dinero } from '@/domain/value-objects/Dinero'

export class RegistrarVenta {
  constructor(
    private productRepo: IProductoRepository,
    private ventaRepo: IVentaRepository
  ) {}

  async ejecutar(data: { productoId: string; cantidad: number; sucursalId: string }) {
    if (data.cantidad <= 0) throw new Error('La cantidad debe ser mayor a 0')

    const producto = await this.productRepo.obtenerPorId(data.productoId)
    if (!producto) throw new Error('Producto no encontrado')
    if (producto.stock < data.cantidad) throw new Error('Stock insuficiente')

    const total = new Dinero(producto.precio).multiplicar(data.cantidad)

    await this.productRepo.actualizar(producto.id, { stock: producto.stock - data.cantidad })

    return this.ventaRepo.crear({
      productoId: producto.id,
      productoNombre: producto.nombre,
      cantidad: data.cantidad,
      total: total.monto,
      sucursalId: data.sucursalId,
    })
  }
}
