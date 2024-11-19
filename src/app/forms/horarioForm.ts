import { FormControl, FormArray } from "@angular/forms";

export interface HorarioForm {
    id: FormControl<number | null>;
    diasDeLaSemana: FormArray<FormControl<string| null>>;
    horaInicio: FormControl<string | null>;
    horaFin: FormControl<string | null>;
}
