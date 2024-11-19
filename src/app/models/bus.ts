export class Bus {
  public id?: number | null;
  public placa?: string | null;
  public modelo?: string | null;

  public constructor(init?: Partial<Bus>) {
    Object.assign(this, init);
  }
  
}
