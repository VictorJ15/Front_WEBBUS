import { Component, EventEmitter, inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bus } from '../../models/bus';
import { BusForm } from '../busForm';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../services/bus.service';

@Component({
  selector: 'app-bus-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './bus-forms.component.html',
  styleUrl: './bus-forms.component.css'
})
export class BusFormsComponent {
  @Input() busData: Bus | undefined;
  @Output() busReady = new EventEmitter<Bus>;
  private fb = inject(FormBuilder);
  busForm = this.fb.group<BusForm>({
    id: this.fb.control<number | null>(null),
    placa: this.fb.control('', [Validators.required, Validators.pattern(/^([A-Z]{3}\d{3}|[A-Z]{2}\d{4}|[A-Z]{2}\d{3}[A-Z]|[A-Z]\d{4,5})$/)]),
    modelo: this.fb.control('', [Validators.required, Validators.minLength(2)])
  });
    
  onSubmit() {
    console.log(this.busForm.value);
    if (this.busForm.valid) {
      const bus = new Bus(this.busForm.value);
      this.busReady.emit(bus);
    }else{
      this.markAllControlsAsTouched();
    }
  }
  markAllControlsAsTouched() {
    Object.values(this.busForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {    
    if (changes['busData'] && changes['busData'].currentValue) {
      if(this.busData != undefined){
        this.busForm.patchValue(this.busData);
      }
    }
  }
}
