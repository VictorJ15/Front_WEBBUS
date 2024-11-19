export class Horario {
  public id?: number | null;
  public diasDeLaSemana?: string[] | null;
  public horaInicio?: string | null;
  public horaFin?: string | null;

  public constructor(init?: Partial<Horario>) {
    Object.assign(this, init);
  }
}
