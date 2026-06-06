import { describe, it, expect, beforeEach } from 'vitest'
import { RegistrarVenta } from '../ventas/RegistrarVenta'
import { FakeProductoRepository, FakeVentaRepository, productoFake } from './fakes'

describe('RegistrarVenta', () => {
  let productRepo: FakeProductoRepository
  let ventaRepo: FakeVentaRepository
  let uc: RegistrarVenta

  beforeEach(() => {
    productRepo = new FakeProductoRepository()
    ventaRepo = new FakeVentaRepository()
    uc = new RegistrarVenta(productRepo, ventaRepo)
  })

  it('registra venta y descuenta stock con total calculado por Dinero', async () => {
    productRepo.productos.push(productoFake({ id: 'p1', precio: 5.5, stock: 10 }))

    const venta = await uc.ejecutar({ productoId: 'p1', cantidad: 3, sucursalId: 's1' })

    expect(venta.total).toBe(16.5)
    expect(venta.productoNombre).toBe('Paracetamol')
    const p = await productRepo.obtenerPorId('p1')
    expect(p?.stock).toBe(7)
  })

  it('rechaza cantidad <= 0', async () => {
    productRepo.productos.push(productoFake({ id: 'p1' }))
    await expect(uc.ejecutar({ productoId: 'p1', cantidad: 0, sucursalId: 's1' })).rejects.toThrow('cantidad')
  })

  it('rechaza producto inexistente', async () => {
    await expect(uc.ejecutar({ productoId: 'x', cantidad: 1, sucursalId: 's1' })).rejects.toThrow('no encontrado')
  })

  it('rechaza stock insuficiente', async () => {
    productRepo.productos.push(productoFake({ id: 'p1', stock: 2 }))
    await expect(uc.ejecutar({ productoId: 'p1', cantidad: 5, sucursalId: 's1' })).rejects.toThrow('insuficiente')
  })
})
