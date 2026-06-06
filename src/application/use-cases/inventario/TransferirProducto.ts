import { IProductoRepository } from '@/domain/ports/IProductoRepository'

export class TransferirProducto {
  constructor(private repo: IProductoRepository) {}

  async ejecutar(productoId: string, sucursalDestinoId: string, cantidad: number) {
    const producto = await this.repo.obtenerPorId(productoId)
    if (!producto) throw new Error('Producto no encontrado')
    if (producto.stock < cantidad) throw new Error('Stock insuficiente para transferir')

    await this.repo.actualizar(productoId, { stock: producto.stock - cantidad })
    const [origen, destino] = await Promise.all([
      this.repo.listarPorSucursal(producto.sucursalId),
      this.repo.listarPorSucursal(sucursalDestinoId)
    ])

    return { success: true, mensaje: `Transferencia de ${cantidad} unidades iniciada` }
  }
}
