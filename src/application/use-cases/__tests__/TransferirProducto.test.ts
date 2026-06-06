import { describe, it, expect, beforeEach } from 'vitest'
import { TransferirProducto } from '../inventario/TransferirProducto'
import { FakeProductoRepository, FakeTransferenciaRepository, productoFake } from './fakes'

describe('TransferirProducto', () => {
  let productRepo: FakeProductoRepository
  let transferRepo: FakeTransferenciaRepository
  let uc: TransferirProducto

  beforeEach(() => {
    productRepo = new FakeProductoRepository()
    transferRepo = new FakeTransferenciaRepository()
    uc = new TransferirProducto(productRepo, transferRepo)
  })

  it('crea transferencia pendiente sin mover stock', async () => {
    productRepo.productos.push(productoFake({ id: 'p1', stock: 100, sucursalId: 's1' }))

    const t = await uc.ejecutar('p1', 's2', 10)

    expect(t.estado).toBe('pendiente')
    expect(t.sucursalOrigenId).toBe('s1')
    expect(t.sucursalDestinoId).toBe('s2')
    expect(t.cantidad).toBe(10)
    // stock NO se movió: lo hace la cola al procesar
    const p = await productRepo.obtenerPorId('p1')
    expect(p?.stock).toBe(100)
    expect(transferRepo.transferencias).toHaveLength(1)
  })

  it('rechaza cantidad <= 0', async () => {
    productRepo.productos.push(productoFake({ id: 'p1' }))
    await expect(uc.ejecutar('p1', 's2', 0)).rejects.toThrow('cantidad')
  })

  it('rechaza producto inexistente', async () => {
    await expect(uc.ejecutar('x', 's2', 5)).rejects.toThrow('no encontrado')
  })

  it('rechaza misma sucursal origen y destino', async () => {
    productRepo.productos.push(productoFake({ id: 'p1', sucursalId: 's1' }))
    await expect(uc.ejecutar('p1', 's1', 5)).rejects.toThrow('distinta')
  })

  it('rechaza stock insuficiente', async () => {
    productRepo.productos.push(productoFake({ id: 'p1', stock: 3, sucursalId: 's1' }))
    await expect(uc.ejecutar('p1', 's2', 5)).rejects.toThrow('insuficiente')
  })
})
