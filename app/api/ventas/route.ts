import { NextResponse } from 'next/server'
import { SupabaseVentaRepository } from '@/infrastructure/repositories/SupabaseVentaRepository'
import { SupabaseProductoRepository } from '@/infrastructure/repositories/SupabaseProductoRepository'
import { RegistrarVenta } from '@/application/use-cases/ventas/RegistrarVenta'

const ventaRepo = new SupabaseVentaRepository()
const productRepo = new SupabaseProductoRepository()

export async function GET() {
  try {
    const ventas = await ventaRepo.listar()
    return NextResponse.json(ventas)
  } catch {
    return NextResponse.json({ error: 'Error al listar ventas' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const useCase = new RegistrarVenta(productRepo, ventaRepo)
    const venta = await useCase.ejecutar(body)
    return NextResponse.json(venta, { status: 201 })
  } catch (error) {
    const mensaje = error instanceof Error ? error.message : 'Error al registrar venta'
    return NextResponse.json({ error: mensaje }, { status: 500 })
  }
}
