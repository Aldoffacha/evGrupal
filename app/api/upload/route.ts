import { NextResponse } from 'next/server'
import { SupabaseStorageService } from '@/infrastructure/storage/SupabaseStorageService'

const storage = new SupabaseStorageService()

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    if (!file) return NextResponse.json({ error: 'No se envió archivo' }, { status: 400 })

    const path = `comprobantes/${Date.now()}_${file.name}`
    const url = await storage.subirArchivo(file, path)
    return NextResponse.json({ url }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Error al subir archivo' }, { status: 500 })
  }
}
