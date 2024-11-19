import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { HorarioForm } from '../horarioForm';
import { CommonModule } from '@angular/common';
import { Horario } from '../../models/horario';

@Component({
  selector: 'app-horario-forms',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './horario-forms.component.html',
  styleUrl: './horario-forms.component.css'
})
export class HorarioFormsComponent {
  private fb = inject(FormBuilder)
  @Input() horarioData: Horario | undefined;
  @Output() horarioReady= new EventEmitter<Horario>;

  diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  horarioForm = this.fb.group<HorarioForm>({
    id: this.fb.control<number | null>(null),
    diasDeLaSemana: this.fb.array<FormControl<string | null>>([], Validators.required),
    horaInicio: this.fb.control('', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]),
    horaFin: this.fb.control('', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)])
  });

  get diasDeLaSemanaFormArray() {
    return this.horarioForm.controls.diasDeLaSemana as FormArray<FormControl<string | null>>;
  }

  onCheckboxChange(event: Event, dia: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.diasDeLaSemanaFormArray.push(new FormControl<string | null>(dia));
    } else {
      const index = this.diasDeLaSemanaFormArray.controls.findIndex(control => control.value === dia);
      if (index !== -1) {
        this.diasDeLaSemanaFormArray.removeAt(index);
      }
    }
  }

  onSubmit() {
    console.log(this.horarioForm.value);
    if (this.horarioForm.valid) {
      const formValue = {
        ...this.horarioForm.value,
        diasDeLaSemana: this.horarioForm.value.diasDeLaSemana?.filter((dia): dia is string => dia !== null) || [],
      };
      const horario= new Horario(formValue)
      this.horarioReady.emit(horario);      
    }else{
      this.markAllControlsAsTouched();
    }
  }
  markAllControlsAsTouched() {
    Object.values(this.horarioForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {    
    if (changes['horarioData'] && changes['horarioData'].currentValue) {
      const horario = changes['horarioData'].currentValue;
  
      // Actualizar el `FormArray` de `diasDeLaSemana`
      const diasFormArray = this.horarioForm.get('diasDeLaSemana') as FormArray;
      diasFormArray.clear();
  
      // Marcar los días de la semana desde `horarioData.diasDeLaSemana`
      this.diasDeLaSemana.forEach(dia => {
        const isChecked = horario.diasDeLaSemana?.includes(dia) || false;
        diasFormArray.push(new FormControl(isChecked ? dia : null));
      });
  
      // Rellenar los otros valores en el formulario
      this.horarioForm.patchValue({
        id: horario.id,
        horaInicio: horario.horaInicio,
        horaFin: horario.horaFin
      });
    }
  }
  
  
}


