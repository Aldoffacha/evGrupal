import { IProductoRepository } from '@/domain/ports/IProductoRepository'

export class AlertaVencimiento {
  constructor(private repo: IProductoRepository) {}

  async ejecutar(dias: number = 30) {
    return this.repo.listarProximosAVencer(dias)
  }
}
