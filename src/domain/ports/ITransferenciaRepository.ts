import { Transferencia } from '../entities/Transferencia'

export interface ITransferenciaRepository {
  listar(): Promise<Transferencia[]>
  obtenerPorId(id: string): Promise<Transferencia | null>
  crear(transferencia: Omit<Transferencia, 'id' | 'fecha' | 'estado'>): Promise<Transferencia>
  actualizarEstado(id: string, estado: Transferencia['estado']): Promise<Transferencia>
  listarPendientes(): Promise<Transferencia[]>
}
