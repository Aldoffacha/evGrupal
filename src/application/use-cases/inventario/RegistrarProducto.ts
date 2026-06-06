import { IProductoRepository } from '@/domain/ports/IProductoRepository'
import { FechaVencimiento } from '@/domain/value-objects/FechaVencimiento'

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
    if (!data.codigo?.trim() || !data.nombre?.trim()) {
      throw new Error('Código y nombre son obligatorios')
    }
    if (!data.sucursalId?.trim()) {
      throw new Error('La sucursal es obligatoria')
    }
    if (data.precio <= 0) {
      throw new Error('El precio debe ser mayor a 0')
    }
    if (data.stock < 0 || data.stockMinimo < 0) {
      throw new Error('El stock no puede ser negativo')
    }

    const vencimiento = FechaVencimiento.fromString(data.fechaVencimiento)
    if (vencimiento.estaVencida()) {
      throw new Error('No se puede registrar un producto ya vencido')
    }

    return this.repo.crear(data)
  }
}
