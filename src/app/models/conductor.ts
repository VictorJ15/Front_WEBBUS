export class Conductor {
  public id?: number | null;
  public nombre?: string | null;
  public cedula?: string | null;
  public telefono?: string | null;
  public direccion?: string | null;

  public constructor(init?: Partial<Conductor>) {
    Object.assign(this, init);
  }
}
