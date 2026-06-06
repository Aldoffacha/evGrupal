import { Venta } from '../entities/Venta'

export interface IVentaRepository {
  listar(): Promise<Venta[]>
  crear(venta: Omit<Venta, 'id' | 'fecha'>): Promise<Venta>
  obtenerPorId(id: string): Promise<Venta | null>
  listarPorSucursal(sucursalId: string): Promise<Venta[]>
  reportePorSucursal(sucursalId: string): Promise<{ productoNombre: string; total: number; cantidad: number }[]>
  reportePorProducto(productoId: string): Promise<{ sucursalNombre: string; total: number; cantidad: number }[]>
}
