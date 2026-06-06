import { NextResponse } from 'next/server'
import { supabase } from '@/infrastructure/config/supabaseClient'

export async function GET() {
  try {
    const { data } = await supabase.from('transferencias').select('*').order('fecha', { ascending: false })
    return NextResponse.json(data || [])
  } catch {
    return NextResponse.json({ error: 'Error al listar transferencias' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { data } = await supabase.from('transferencias').insert({
      ...body,
      estado: 'pendiente',
    }).select().single()
    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear transferencia' }, { status: 500 })
  }
}
