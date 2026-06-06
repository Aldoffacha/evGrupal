import { describe, it, expect, beforeEach } from 'vitest'
import { AlertaStockBajo } from '../alertas/AlertaStockBajo'
import { AlertaVencimiento } from '../alertas/AlertaVencimiento'
import { FakeProductoRepository, productoFake } from './fakes'

const enDias = (dias: number) => {
  const d = new Date()
  d.setDate(d.getDate() + dias)
  return d.toISOString().split('T')[0]
}

describe('AlertaStockBajo', () => {
  let repo: FakeProductoRepository

  beforeEach(() => {
    repo = new FakeProductoRepository()
  })

  it('devuelve solo productos con stock <= stockMinimo', async () => {
    repo.productos.push(productoFake({ id: 'a', stock: 3, stockMinimo: 5 }))
    repo.productos.push(productoFake({ id: 'b', stock: 50, stockMinimo: 5 }))

    const res = await new AlertaStockBajo(repo).ejecutar()

    expect(res.map((p) => p.id)).toEqual(['a'])
  })
})

describe('AlertaVencimiento', () => {
  let repo: FakeProductoRepository

  beforeEach(() => {
    repo = new FakeProductoRepository()
  })

  it('devuelve productos dentro de la ventana de días', async () => {
    repo.productos.push(productoFake({ id: 'pronto', fechaVencimiento: enDias(10) }))
    repo.productos.push(productoFake({ id: 'lejos', fechaVencimiento: enDias(90) }))

    const res = await new AlertaVencimiento(repo).ejecutar(30)

    expect(res.map((p) => p.id)).toEqual(['pronto'])
  })
})
