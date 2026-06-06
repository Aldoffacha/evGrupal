import { IVentaRepository } from '@/domain/ports/IVentaRepository'

export class GenerarReporteVentas {
  constructor(private repo: IVentaRepository) {}

  async porSucursal(sucursalId: string) {
    return this.repo.reportePorSucursal(sucursalId)
  }

  async porProducto(productoId: string) {
    return this.repo.reportePorProducto(productoId)
  }
}
