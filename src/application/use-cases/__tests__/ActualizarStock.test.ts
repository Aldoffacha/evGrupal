import { describe, it, expect, beforeEach } from 'vitest'
import { ActualizarStock } from '../inventario/ActualizarStock'
import { FakeProductoRepository, productoFake } from './fakes'

describe('ActualizarStock', () => {
  let repo: FakeProductoRepository
  let uc: ActualizarStock

  beforeEach(() => {
    repo = new FakeProductoRepository()
    uc = new ActualizarStock(repo)
  })

  it('suma stock', async () => {
    repo.productos.push(productoFake({ id: 'p1', stock: 10 }))
    const p = await uc.ejecutar('p1', 5)
    expect(p.stock).toBe(15)
  })

  it('resta stock', async () => {
    repo.productos.push(productoFake({ id: 'p1', stock: 10 }))
    const p = await uc.ejecutar('p1', -4)
    expect(p.stock).toBe(6)
  })

  it('rechaza producto inexistente', async () => {
    await expect(uc.ejecutar('x', 5)).rejects.toThrow('no encontrado')
  })

  it('rechaza stock resultante negativo', async () => {
    repo.productos.push(productoFake({ id: 'p1', stock: 2 }))
    await expect(uc.ejecutar('p1', -5)).rejects.toThrow('insuficiente')
  })
})
