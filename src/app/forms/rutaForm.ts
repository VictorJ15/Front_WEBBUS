import { FormControl, FormArray } from "@angular/forms";

export interface RutaForm {
    id: FormControl<number | null>;
    codigo: FormControl<string | null>;
    estaciones: FormArray<FormControl<string | null>>;
}
