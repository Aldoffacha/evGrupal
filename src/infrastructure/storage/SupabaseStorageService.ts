import { supabase } from '../config/supabaseClient'

export class SupabaseStorageService {
  private bucket = 'comprobantes'

  async subirArchivo(file: File, path: string): Promise<string> {
    const { data } = await supabase.storage.from(this.bucket).upload(path, file)
    if (!data) throw new Error('Error al subir archivo')
    const { data: urlData } = supabase.storage.from(this.bucket).getPublicUrl(data.path)
    return urlData.publicUrl
  }

  async eliminarArchivo(path: string): Promise<void> {
    await supabase.storage.from(this.bucket).remove([path])
  }

  async listarArchivos(): Promise<string[]> {
    const { data } = await supabase.storage.from(this.bucket).list()
    if (!data) return []
    return data.map((f) => f.name)
  }
}
