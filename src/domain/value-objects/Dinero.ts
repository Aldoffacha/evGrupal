export class Dinero {
  constructor(public readonly monto: number, public readonly moneda: string = 'BOB') {
    if (monto < 0) throw new Error('El monto no puede ser negativo')
  }

  sumar(otro: Dinero): Dinero {
    return new Dinero(this.monto + otro.monto, this.moneda)
  }

  multiplicar(cantidad: number): Dinero {
    return new Dinero(this.monto * cantidad, this.moneda)
  }

  toString(): string {
    return `${this.monto.toFixed(2)} ${this.moneda}`
  }
}
