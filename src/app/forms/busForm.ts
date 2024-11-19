import { FormControl } from "@angular/forms";

export interface BusForm {
    id: FormControl<number | null>;
    placa: FormControl<string | null>;
    modelo: FormControl<string | null>;
}
