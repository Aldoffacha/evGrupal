import { NextResponse } from 'next/server'
import { SupabaseProductoRepository } from '@/infrastructure/repositories/SupabaseProductoRepository'

const repo = new SupabaseProductoRepository()

export async function GET() {
  try {
    const productos = await repo.listar()
    return NextResponse.json(productos)
  } catch {
    return NextResponse.json({ error: 'Error al listar productos' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const producto = await repo.crear(body)
    return NextResponse.json(producto, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al crear producto' }, { status: 500 })
  }
}
