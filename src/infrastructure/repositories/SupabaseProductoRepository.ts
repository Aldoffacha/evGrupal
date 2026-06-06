import { supabase } from '../config/supabaseClient'
import { Producto } from '@/domain/entities/Producto'
import { IProductoRepository } from '@/domain/ports/IProductoRepository'

export class SupabaseProductoRepository implements IProductoRepository {
  private table = 'productos'

  async listar(): Promise<Producto[]> {
    const { data } = await supabase.from(this.table).select('*').order('createdAt', { ascending: false })
    return data || []
  }

  async obtenerPorId(id: string): Promise<Producto | null> {
    const { data } = await supabase.from(this.table).select('*').eq('id', id).single()
    return data
  }

  async crear(producto: Omit<Producto, 'id' | 'createdAt'>): Promise<Producto> {
    const { data } = await supabase.from(this.table).insert(producto).select().single()
    return data!
  }

  async actualizar(id: string, data: Partial<Producto>): Promise<Producto> {
    const { data: result } = await supabase.from(this.table).update(data).eq('id', id).select().single()
    return result!
  }

  async eliminar(id: string): Promise<void> {
    await supabase.from(this.table).delete().eq('id', id)
  }

  async listarPorSucursal(sucursalId: string): Promise<Producto[]> {
    const { data } = await supabase.from(this.table).select('*').eq('sucursalId', sucursalId)
    return data || []
  }

  async listarProximosAVencer(dias: number): Promise<Producto[]> {
    const fechaLimite = new Date()
    fechaLimite.setDate(fechaLimite.getDate() + dias)
    const { data } = await supabase
      .from(this.table)
      .select('*')
      .lte('fechaVencimiento', fechaLimite.toISOString())
      .gte('fechaVencimiento', new Date().toISOString())
    return data || []
  }

  async listarStockBajo(): Promise<Producto[]> {
    const { data } = await supabase.from(this.table).select('*')
    return (data || []).filter((p: Producto) => p.stock <= p.stockMinimo)
  }
}
