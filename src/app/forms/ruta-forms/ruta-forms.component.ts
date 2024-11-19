import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { RutaForm } from '../rutaForm';
import { Ruta } from '../../models/ruta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ruta-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ruta-forms.component.html',
  styleUrl: './ruta-forms.component.css'
})
export class RutaFormsComponent {
  private fb = inject(FormBuilder);

  @Input() rutaData: Ruta | undefined;
  @Output() rutaReady = new EventEmitter<Ruta>();

  rutaForm = this.fb.group<RutaForm>({
    id: this.fb.control<number | null>(null),
    codigo: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    estaciones: this.fb.array<FormControl<string | null>>([])
  });
  
  constructor() {
    if (this.rutaData) {
      this.patchRutaData(this.rutaData);
    }
  }

  onSubmit() {
    console.log(this.rutaForm.value);
    if (this.rutaForm.valid) {
      const ruta = new Ruta({...this.rutaForm.value, estaciones: this.estaciones.controls.map(control => control.value || '')});
      this.rutaReady.emit(ruta);
    }else{
      this.markAllControlsAsTouched()
    }
  }
  markAllControlsAsTouched() {
    Object.values(this.rutaForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
  get estaciones() {
    return this.rutaForm.get('estaciones') as FormArray<FormControl<string | null>>;
  }

  addEstacion(estacion: string) {
    this.estaciones.push(this.fb.control<string | null>(estacion));
  }

  updateEstaciones(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const estacionesArray = input.split(',').map(estacion => estacion.trim()).filter(estacion => estacion.length > 0);
    this.estaciones.clear();
    estacionesArray.forEach(estacion => this.addEstacion(estacion));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rutaData'] && changes['rutaData'].currentValue) {
      this.patchRutaData(this.rutaData!);
    }
  }

  private patchRutaData(rutaData: Ruta) {
    this.rutaForm.patchValue({ id: rutaData.id, codigo: rutaData.codigo });
    this.estaciones.clear();
    
    if (rutaData.estaciones && Array.isArray(rutaData.estaciones)) { 
      rutaData.estaciones.forEach(estacion => this.addEstacion(estacion));
    }
  }
}
