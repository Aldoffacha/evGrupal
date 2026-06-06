import { describe, it, expect } from 'vitest'
import { Dinero } from './Dinero'

describe('Dinero', () => {
  it('crea con moneda BOB por defecto', () => {
    expect(new Dinero(10).moneda).toBe('BOB')
  })

  it('lanza si el monto es negativo', () => {
    expect(() => new Dinero(-1)).toThrow('El monto no puede ser negativo')
  })

  it('suma dos montos', () => {
    expect(new Dinero(10).sumar(new Dinero(5)).monto).toBe(15)
  })

  it('multiplica por cantidad', () => {
    expect(new Dinero(5.5).multiplicar(3).monto).toBe(16.5)
  })

  it('formatea con 2 decimales y moneda', () => {
    expect(new Dinero(5.5).toString()).toBe('5.50 BOB')
  })
})
