import { describe, it, expect, beforeEach } from 'vitest'
import { RegistrarProducto } from '../inventario/RegistrarProducto'
import { FakeProductoRepository } from './fakes'

const baseData = () => ({
  codigo: 'MED009',
  nombre: 'Aspirina',
  precio: 3.5,
  stock: 20,
  stockMinimo: 5,
  fechaVencimiento: '2099-01-01',
  sucursalId: 's1',
})

describe('RegistrarProducto', () => {
  let repo: FakeProductoRepository
  let uc: RegistrarProducto

  beforeEach(() => {
    repo = new FakeProductoRepository()
    uc = new RegistrarProducto(repo)
  })

  it('registra un producto válido', async () => {
    const p = await uc.ejecutar(baseData())
    expect(p.id).toBeTruthy()
    expect(repo.productos).toHaveLength(1)
  })

  it('rechaza código vacío', async () => {
    await expect(uc.ejecutar({ ...baseData(), codigo: '  ' })).rejects.toThrow('obligatorios')
  })

  it('rechaza sin sucursal', async () => {
    await expect(uc.ejecutar({ ...baseData(), sucursalId: '' })).rejects.toThrow('sucursal')
  })

  it('rechaza precio <= 0', async () => {
    await expect(uc.ejecutar({ ...baseData(), precio: 0 })).rejects.toThrow('precio')
  })

  it('rechaza stock negativo', async () => {
    await expect(uc.ejecutar({ ...baseData(), stock: -1 })).rejects.toThrow('negativo')
  })

  it('rechaza producto ya vencido', async () => {
    await expect(uc.ejecutar({ ...baseData(), fechaVencimiento: '2000-01-01' })).rejects.toThrow('vencido')
  })
})
