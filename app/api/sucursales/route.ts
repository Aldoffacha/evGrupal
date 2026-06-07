import { NextResponse } from 'next/server'
import { SupabaseSucursalRepository } from '@/infrastructure/repositories/SupabaseSucursalRepository'

const repo = new SupabaseSucursalRepository()

export async function GET() {
  try {
    const sucursales = await repo.listar()
    return NextResponse.json(sucursales)
  } catch {
    return NextResponse.json({ error: 'Error al listar sucursales' }, { status: 500 })
  }
}
