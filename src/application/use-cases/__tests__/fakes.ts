import { Producto } from '@/domain/entities/Producto'
import { Venta } from '@/domain/entities/Venta'
import { Transferencia } from '@/domain/entities/Transferencia'
import { IProductoRepository } from '@/domain/ports/IProductoRepository'
import { IVentaRepository } from '@/domain/ports/IVentaRepository'
import { ITransferenciaRepository } from '@/domain/ports/ITransferenciaRepository'

let seq = 0
const id = () => `id-${++seq}`

export class FakeProductoRepository implements IProductoRepository {
  productos: Producto[] = []

  async listar(): Promise<Producto[]> {
    return [...this.productos]
  }
  async obtenerPorId(id: string): Promise<Producto | null> {
    return this.productos.find((p) => p.id === id) ?? null
  }
  async crear(producto: Omit<Producto, 'id' | 'createdAt'>): Promise<Producto> {
    const nuevo: Producto = { ...producto, id: id(), createdAt: new Date().toISOString() }
    this.productos.push(nuevo)
    return nuevo
  }
  async actualizar(id: string, data: Partial<Producto>): Promise<Producto> {
    const p = this.productos.find((x) => x.id === id)
    if (!p) throw new Error('no existe')
    Object.assign(p, data)
    return p
  }
  async eliminar(id: string): Promise<void> {
    this.productos = this.productos.filter((p) => p.id !== id)
  }
  async listarPorSucursal(sucursalId: string): Promise<Producto[]> {
    return this.productos.filter((p) => p.sucursalId === sucursalId)
  }
  async listarProximosAVencer(dias: number): Promise<Producto[]> {
    const limite = new Date()
    limite.setDate(limite.getDate() + dias)
    const hoy = new Date()
    return this.productos.filter((p) => {
      const f = new Date(p.fechaVencimiento)
      return f >= hoy && f <= limite
    })
  }
  async listarStockBajo(): Promise<Producto[]> {
    return this.productos.filter((p) => p.stock <= p.stockMinimo)
  }
}

export class FakeVentaRepository implements IVentaRepository {
  ventas: Venta[] = []

  async listar(): Promise<Venta[]> {
    return [...this.ventas]
  }
  async crear(venta: Omit<Venta, 'id' | 'fecha'>): Promise<Venta> {
    const nueva: Venta = { ...venta, id: id(), fecha: new Date().toISOString() }
    this.ventas.push(nueva)
    return nueva
  }
  async obtenerPorId(id: string): Promise<Venta | null> {
    return this.ventas.find((v) => v.id === id) ?? null
  }
  async listarPorSucursal(sucursalId: string): Promise<Venta[]> {
    return this.ventas.filter((v) => v.sucursalId === sucursalId)
  }
  async reportePorSucursal(sucursalId: string) {
    return this.ventas
      .filter((v) => v.sucursalId === sucursalId)
      .map((v) => ({ productoNombre: v.productoNombre, total: v.total, cantidad: v.cantidad }))
  }
  async reportePorProducto(productoId: string) {
    return this.ventas
      .filter((v) => v.productoId === productoId)
      .map((v) => ({ sucursalNombre: v.sucursalId, total: v.total, cantidad: v.cantidad }))
  }
}

export class FakeTransferenciaRepository implements ITransferenciaRepository {
  transferencias: Transferencia[] = []

  async listar(): Promise<Transferencia[]> {
    return [...this.transferencias]
  }
  async obtenerPorId(id: string): Promise<Transferencia | null> {
    return this.transferencias.find((t) => t.id === id) ?? null
  }
  async crear(t: Omit<Transferencia, 'id' | 'fecha' | 'estado'>): Promise<Transferencia> {
    const nueva: Transferencia = {
      ...t,
      id: id(),
      estado: 'pendiente',
      fecha: new Date().toISOString(),
    }
    this.transferencias.push(nueva)
    return nueva
  }
  async actualizarEstado(id: string, estado: Transferencia['estado']): Promise<Transferencia> {
    const t = this.transferencias.find((x) => x.id === id)
    if (!t) throw new Error('no existe')
    t.estado = estado
    return t
  }
  async listarPendientes(): Promise<Transferencia[]> {
    return this.transferencias.filter((t) => t.estado === 'pendiente')
  }
}

export function productoFake(over: Partial<Producto> = {}): Producto {
  return {
    id: 'p1',
    codigo: 'MED001',
    nombre: 'Paracetamol',
    precio: 5.5,
    stock: 100,
    stockMinimo: 10,
    fechaVencimiento: '2099-12-31',
    sucursalId: 's1',
    createdAt: new Date().toISOString(),
    ...over,
  }
}
