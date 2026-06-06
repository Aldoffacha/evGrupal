import { NextResponse } from 'next/server'
import { SupabaseProductoRepository } from '@/infrastructure/repositories/SupabaseProductoRepository'
import { AlertaVencimiento } from '@/application/use-cases/alertas/AlertaVencimiento'
import { AlertaStockBajo } from '@/application/use-cases/alertas/AlertaStockBajo'

const repo = new SupabaseProductoRepository()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tipo = searchParams.get('tipo')

    if (tipo === 'vencimiento') {
      return NextResponse.json(await new AlertaVencimiento(repo).ejecutar())
    }
    if (tipo === 'stock') {
      return NextResponse.json(await new AlertaStockBajo(repo).ejecutar())
    }

    const [vencimiento, stock] = await Promise.all([
      new AlertaVencimiento(repo).ejecutar(),
      new AlertaStockBajo(repo).ejecutar(),
    ])
    return NextResponse.json({ vencimiento, stock })
  } catch {
    return NextResponse.json({ error: 'Error al obtener alertas' }, { status: 500 })
  }
}
