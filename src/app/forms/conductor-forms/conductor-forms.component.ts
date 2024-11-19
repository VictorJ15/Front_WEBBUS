import { Component, EventEmitter, inject, Input, Output, output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConductorForm } from '../conductorForm';
import { CommonModule } from '@angular/common';
import { Bus } from '../../models/bus';
import { Conductor } from '../../models/conductor';

@Component({
  selector: 'app-conductor-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './conductor-forms.component.html',
  styleUrl: './conductor-forms.component.css'
})
export class ConductorFormsComponent {
  @Input() conductorData : Conductor | undefined;
  @Output() conductorReady = new EventEmitter<Conductor>();

  private fb = inject(FormBuilder);
  conductorForm = this.fb.group<ConductorForm>({
    id: this.fb.control<number | null>(null),
    nombre: this.fb.control('', [Validators.required, Validators.minLength(2)]),
    cedula: this.fb.control('', [Validators.required, Validators.pattern(/^\d+$/)]),
    telefono: this.fb.control('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    direccion: this.fb.control('', Validators.required)
  });
  onSubmit() {
    console.log(this.conductorForm.value);
    if (this.conductorForm.valid) {
      const conductor = new Conductor(this.conductorForm.value)
      this.conductorReady.emit(conductor)
    }else{
      this.markAllControlsAsTouched()
    }
  }
  markAllControlsAsTouched() {
    Object.values(this.conductorForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {    
    if (changes['conductorData'] && changes['conductorData'].currentValue) {
      if(this.conductorData != undefined){
        this.conductorForm.patchValue(this.conductorData);
      }
    }
  }
}
