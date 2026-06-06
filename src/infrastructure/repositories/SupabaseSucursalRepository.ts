import { supabase } from '../config/supabaseClient'
import { Sucursal } from '@/domain/entities/Sucursal'
import { ISucursalRepository } from '@/domain/ports/ISucursalRepository'

export class SupabaseSucursalRepository implements ISucursalRepository {
  private table = 'sucursales'

  async listar(): Promise<Sucursal[]> {
    const { data } = await supabase.from(this.table).select('*')
    return data || []
  }

  async obtenerPorId(id: string): Promise<Sucursal | null> {
    const { data } = await supabase.from(this.table).select('*').eq('id', id).single()
    return data
  }

  async crear(sucursal: Omit<Sucursal, 'id' | 'createdAt'>): Promise<Sucursal> {
    const { data } = await supabase.from(this.table).insert(sucursal).select().single()
    return data!
  }

  async eliminar(id: string): Promise<void> {
    await supabase.from(this.table).delete().eq('id', id)
  }
}
