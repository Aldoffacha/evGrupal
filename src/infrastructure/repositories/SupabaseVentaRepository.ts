import { supabase } from '../config/supabaseClient'
import { Venta } from '@/domain/entities/Venta'
import { IVentaRepository } from '@/domain/ports/IVentaRepository'

export class SupabaseVentaRepository implements IVentaRepository {
  private table = 'ventas'

  async listar(): Promise<Venta[]> {
    const { data } = await supabase.from(this.table).select('*').order('fecha', { ascending: false })
    return data || []
  }

  async crear(venta: Omit<Venta, 'id' | 'fecha'>): Promise<Venta> {
    const { data } = await supabase.from(this.table).insert(venta).select().single()
    return data!
  }

  async obtenerPorId(id: string): Promise<Venta | null> {
    const { data } = await supabase.from(this.table).select('*').eq('id', id).single()
    return data
  }

  async listarPorSucursal(sucursalId: string): Promise<Venta[]> {
    const { data } = await supabase.from(this.table).select('*').eq('sucursalId', sucursalId)
    return data || []
  }

  async reportePorSucursal(sucursalId: string): Promise<{ productoNombre: string; total: number; cantidad: number }[]> {
    const { data } = await supabase
      .from(this.table)
      .select('productoNombre, total, cantidad')
      .eq('sucursalId', sucursalId)
    return data || []
  }

  async reportePorProducto(productoId: string): Promise<{ sucursalNombre: string; total: number; cantidad: number }[]> {
    const { data } = await supabase
      .from(this.table)
      .select('sucursalId, total, cantidad')
      .eq('productoId', productoId)
    const sucursales = await supabase.from('sucursales').select('id, nombre')
    const mapa = new Map((sucursales.data || []).map((s: any) => [s.id, s.nombre]))
    return (data || []).map((d: any) => ({
      sucursalNombre: mapa.get(d.sucursalId) || 'Desconocida',
      total: d.total,
      cantidad: d.cantidad,
    }))
  }
}
