import { IProductoRepository } from '@/domain/ports/IProductoRepository'

export class AlertaStockBajo {
  constructor(private repo: IProductoRepository) {}

  async ejecutar() {
    return this.repo.listarStockBajo()
  }
}
