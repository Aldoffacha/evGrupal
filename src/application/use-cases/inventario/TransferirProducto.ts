import { IProductoRepository } from '@/domain/ports/IProductoRepository'
import { ITransferenciaRepository } from '@/domain/ports/ITransferenciaRepository'
import { Transferencia } from '@/domain/entities/Transferencia'

export class TransferirProducto {
  constructor(
    private productRepo: IProductoRepository,
    private transferenciaRepo: ITransferenciaRepository
  ) {}

  async ejecutar(
    productoId: string,
    sucursalDestinoId: string,
    cantidad: number
  ): Promise<Transferencia> {
    if (cantidad <= 0) throw new Error('La cantidad debe ser mayor a 0')

    const producto = await this.productRepo.obtenerPorId(productoId)
    if (!producto) throw new Error('Producto no encontrado')
    if (producto.sucursalId === sucursalDestinoId) {
      throw new Error('La sucursal destino debe ser distinta a la de origen')
    }
    if (producto.stock < cantidad) {
      throw new Error('Stock insuficiente para transferir')
    }

    // Solo crea la transferencia en estado 'pendiente'.
    // El movimiento de stock (origen/destino) lo ejecuta la cola al procesarla.
    return this.transferenciaRepo.crear({
      productoId: producto.id,
      productoNombre: producto.nombre,
      cantidad,
      sucursalOrigenId: producto.sucursalId,
      sucursalDestinoId,
    })
  }
}
