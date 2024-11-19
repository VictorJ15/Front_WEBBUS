import { FormControl, FormGroup, NumberValueAccessor } from "@angular/forms";


export interface AsignacionForm {
  id: FormControl<number | null>;
  conductor: FormControl<number | null>;
  bus: FormControl<number| null>;
  ruta: FormControl<number|null>;
  horario: FormControl<number|null>;
}
