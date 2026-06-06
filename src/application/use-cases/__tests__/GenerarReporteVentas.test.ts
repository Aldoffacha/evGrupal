import { describe, it, expect, beforeEach } from 'vitest'
import { GenerarReporteVentas } from '../ventas/GenerarReporteVentas'
import { FakeVentaRepository } from './fakes'

describe('GenerarReporteVentas', () => {
  let repo: FakeVentaRepository
  let uc: GenerarReporteVentas

  beforeEach(() => {
    repo = new FakeVentaRepository()
    uc = new GenerarReporteVentas(repo)
  })

  it('reporta ventas por sucursal', async () => {
    await repo.crear({ productoId: 'p1', productoNombre: 'Paracetamol', cantidad: 2, total: 11, sucursalId: 's1' })
    await repo.crear({ productoId: 'p2', productoNombre: 'Ibuprofeno', cantidad: 1, total: 8, sucursalId: 's2' })

    const res = await uc.porSucursal('s1')

    expect(res).toHaveLength(1)
    expect(res[0].productoNombre).toBe('Paracetamol')
    expect(res[0].total).toBe(11)
  })

  it('reporta ventas por producto', async () => {
    await repo.crear({ productoId: 'p1', productoNombre: 'Paracetamol', cantidad: 2, total: 11, sucursalId: 's1' })

    const res = await uc.porProducto('p1')

    expect(res).toHaveLength(1)
    expect(res[0].cantidad).toBe(2)
  })
})
