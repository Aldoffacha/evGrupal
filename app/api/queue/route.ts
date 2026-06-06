import { NextResponse } from 'next/server'
import { TransferenciaQueue } from '@/infrastructure/queue/TransferenciaQueue'

const queue = new TransferenciaQueue()

export async function POST() {
  try {
    await queue.process()
    return NextResponse.json({ success: true, message: 'Cola procesada' })
  } catch {
    return NextResponse.json({ error: 'Error al procesar cola' }, { status: 500 })
  }
}
