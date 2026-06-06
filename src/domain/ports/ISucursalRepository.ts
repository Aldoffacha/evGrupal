import { Sucursal } from '../entities/Sucursal'

export interface ISucursalRepository {
  listar(): Promise<Sucursal[]>
  obtenerPorId(id: string): Promise<Sucursal | null>
  crear(sucursal: Omit<Sucursal, 'id' | 'createdAt'>): Promise<Sucursal>
  eliminar(id: string): Promise<void>
}
