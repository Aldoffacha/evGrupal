import { Producto } from '../entities/Producto'

export interface IProductoRepository {
  listar(): Promise<Producto[]>
  obtenerPorId(id: string): Promise<Producto | null>
  crear(producto: Omit<Producto, 'id' | 'createdAt'>): Promise<Producto>
  actualizar(id: string, data: Partial<Producto>): Promise<Producto>
  eliminar(id: string): Promise<void>
  listarPorSucursal(sucursalId: string): Promise<Producto[]>
  listarProximosAVencer(dias: number): Promise<Producto[]>
  listarStockBajo(): Promise<Producto[]>
}
