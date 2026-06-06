import { supabase } from '../config/supabaseClient'

type TransferenciaMessage = {
  id: string
  productoId: string
  cantidad: number
  sucursalOrigenId: string
  sucursalDestinoId: string
}

export class TransferenciaQueue {
  async publish(transferencia: TransferenciaMessage): Promise<void> {
    console.log(`[Queue] Publicando transferencia ${transferencia.id}`)
  }

  async process(): Promise<void> {
    const { data: pendientes } = await supabase
      .from('transferencias')
      .select('*')
      .eq('estado', 'pendiente')
      .limit(5)

    if (!pendientes || pendientes.length === 0) return

    console.log(`[Queue] Procesando ${pendientes.length} transferencias`)

    for (const t of pendientes) {
      try {
        const { data: producto } = await supabase
          .from('productos')
          .select('*')
          .eq('id', t.productoId)
          .single()

        if (!producto) {
          await supabase.from('transferencias').update({ estado: 'cancelada' }).eq('id', t.id)
          continue
        }

        const nuevoStockOrigen = producto.stock - t.cantidad
        if (nuevoStockOrigen < 0) {
          await supabase.from('transferencias').update({ estado: 'cancelada' }).eq('id', t.id)
          continue
        }

        await supabase.from('productos').update({ stock: nuevoStockOrigen }).eq('id', t.productoId)

        const { data: existing } = await supabase
          .from('productos')
          .select('*')
          .eq('codigo', producto.codigo)
          .eq('sucursalId', t.sucursalDestinoId)
          .single()

        if (existing) {
          await supabase
            .from('productos')
            .update({ stock: existing.stock + t.cantidad })
            .eq('id', existing.id)
        } else {
          await supabase.from('productos').insert({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            stock: t.cantidad,
            stockMinimo: producto.stockMinimo,
            fechaVencimiento: producto.fechaVencimiento,
            sucursalId: t.sucursalDestinoId,
          })
        }

        await supabase.from('transferencias').update({ estado: 'completada' }).eq('id', t.id)
        console.log(`[Queue] Transferencia ${t.id} completada`)
      } catch (error) {
        console.error(`[Queue] Error procesando transferencia ${t.id}:`, error)
      }
    }
  }
}
