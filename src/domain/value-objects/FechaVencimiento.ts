export class FechaVencimiento {
  constructor(public readonly fecha: Date) {
    if (isNaN(fecha.getTime())) throw new Error('Fecha de vencimiento inválida')
  }

  static fromString(fechaStr: string): FechaVencimiento {
    return new FechaVencimiento(new Date(fechaStr))
  }

  diasRestantes(): number {
    const hoy = new Date()
    const diff = this.fecha.getTime() - hoy.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  estaVencida(): boolean {
    return this.diasRestantes() <= 0
  }

  estaProximoAVencer(dias: number = 30): boolean {
    return this.diasRestantes() <= dias && this.diasRestantes() > 0
  }

  toString(): string {
    return this.fecha.toISOString().split('T')[0]
  }
}
