export class Ruta {
  public id?: number | null;
  public codigo?: string | null;
  public estaciones?: string[] | null;

  public constructor(init?: Partial<Ruta>) {
    Object.assign(this, init);
  }
}
