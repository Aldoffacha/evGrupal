import { describe, it, expect } from 'vitest'
import { FechaVencimiento } from './FechaVencimiento'

const enDias = (dias: number) => {
  const d = new Date()
  d.setDate(d.getDate() + dias)
  return d.toISOString().split('T')[0]
}

describe('FechaVencimiento', () => {
  it('lanza si la fecha es inválida', () => {
    expect(() => FechaVencimiento.fromString('no-es-fecha')).toThrow('inválida')
  })

  it('NO lanza con fecha pasada (regla movida al use-case)', () => {
    expect(() => FechaVencimiento.fromString(enDias(-10))).not.toThrow()
  })

  it('detecta vencida', () => {
    expect(FechaVencimiento.fromString(enDias(-1)).estaVencida()).toBe(true)
    expect(FechaVencimiento.fromString(enDias(10)).estaVencida()).toBe(false)
  })

  it('detecta próximo a vencer dentro del rango', () => {
    expect(FechaVencimiento.fromString(enDias(10)).estaProximoAVencer(30)).toBe(true)
    expect(FechaVencimiento.fromString(enDias(60)).estaProximoAVencer(30)).toBe(false)
    expect(FechaVencimiento.fromString(enDias(-1)).estaProximoAVencer(30)).toBe(false)
  })

  it('calcula días restantes', () => {
    expect(FechaVencimiento.fromString(enDias(5)).diasRestantes()).toBeGreaterThan(3)
  })
})
