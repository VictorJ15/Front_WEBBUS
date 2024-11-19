import { Conductor } from './conductor';
import { Bus } from './bus';
import { Ruta } from './ruta';
import { Horario } from './horario';

export class Asignacion {
  public id?: number | null;
  public conductor?: Conductor | null;
  public bus?: Bus | null;
  public ruta?: Ruta | null;
  public horario?: Horario | null;

  public constructor(init?: Partial<Asignacion>) {
    Object.assign(this, init);
  }
}
