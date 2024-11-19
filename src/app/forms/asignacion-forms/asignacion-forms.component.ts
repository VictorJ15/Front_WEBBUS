import { AsignacionDto } from './../../models/dto/asignacionDto';
import { Asignacion } from './../../models/asignacion';
import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Bus } from '../../models/bus';
import { Conductor } from '../../models/conductor';
import { Horario } from '../../models/horario';
import { Ruta } from '../../models/ruta';
import { BusService } from '../../services/bus.service';
import { ConductorService } from '../../services/conductor.service';
import { HorarioService } from '../../services/horario.service';
import { RutaService } from '../../services/ruta.service';
import { AsignacionForm } from '../asignacionForm';
import { CommonModule } from '@angular/common';
import { state } from '@angular/animations';


@Component({
  selector: 'app-asignacion-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './asignacion-forms.component.html',
  styleUrl: './asignacion-forms.component.css'
})
export class AsignacionFormsComponent {
  private fb = inject(FormBuilder)
  @Input() asignacionData: Asignacion | undefined;
  @Output() asignacionReady = new EventEmitter<Asignacion>
  asignacionForm = this.fb.group({
    id: new FormControl<number | null>(null),
    conductor: new FormControl<number | null>(null, Validators.required),
    bus: new FormControl<number | null>(null, Validators.required),
    ruta: new FormControl<number | null>(null, Validators.required),
    horario: new FormControl<number | null>(null, Validators.required),
  });

  conductores: Conductor[] = [];
  buses: Bus[] = [];
  rutas: Ruta[] = [];
  horarios: Horario[] = [];
  conductor!: Conductor;
  horario!: Horario;
  bus!: Bus;
  ruta!: Ruta;
  constructor(
    private router: Router,
    private conductorService: ConductorService,
    private busService: BusService,
    private rutaService: RutaService,
    private horarioService: HorarioService
  ) { }

  ngOnInit(): void {
    this.loadData();   
  }

  loadData() {
    this.conductorService.getAllConductores().subscribe(data => this.conductores = data);
    this.busService.getAllBuses().subscribe(data => this.buses = data);
    this.rutaService.getAllRutas().subscribe(data => this.rutas = data);
    this.horarioService.getAllHorarios().subscribe(data => this.horarios = data);
  }

  redirectToCreation(path: string) {
    this.router.navigate([path], { queryParams: { returnUrl: this.router.url } });
  }

  onSubmit() {
    console.log(this.asignacionForm.value);

    if (this.asignacionForm.valid) {
      const { conductor, bus, ruta, horario, id } = this.asignacionForm.value;

      const selectedConductor = this.conductores.find(c => c.id === conductor);
      const selectedBus = this.buses.find(b => b.id === bus);
      const selectedRuta = this.rutas.find(r => r.id === ruta);
      const selectedHorario = this.horarios.find(h => h.id === horario);
      if (selectedConductor && selectedBus && selectedRuta && selectedHorario) {
        const asignacion: AsignacionDto = {
          idConductor: selectedConductor.id,
          idBus: selectedBus.id,
          idRuta: selectedRuta.id,
          idHorario: selectedHorario.id,
        };
        console.log(asignacion)
        this.asignacionReady.emit(asignacion);
      } else {
        console.error('Uno o más objetos no fueron encontrados en las listas');
      }
    } else {
      this.markAllControlsAsTouched();
      return;
    }
  }
  markAllControlsAsTouched() {
    Object.values(this.asignacionForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  onConductorChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const id = Number(selectElement.value);

    const conductor = this.conductores.find(c => c.id === id);
    if (conductor) {
      this.asignacionForm.get('conductor')?.setValue(conductor.id ?? null)
    }
  }

  onBusChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const id = Number(selectElement.value);
    const bus = this.buses.find(b => b.id === id);
    if (bus) {
      this.asignacionForm.get('bus')?.setValue(bus.id ?? null);
    }
  }

  onRutaChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const id = Number(selectElement.value);
    const ruta = this.rutas.find(r => r.id === id);
    if (ruta) {
      this.asignacionForm.get('ruta')?.setValue(ruta.id ?? null);
    }
  }

  onHorarioChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const id = Number(selectElement.value);
    const horario = this.horarios.find(h => h.id === id);
    if (horario) {
      this.asignacionForm.get('horario')?.setValue(horario.id ?? null);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['asignacionData'] && changes['asignacionData'].currentValue) {
      if (this.asignacionData != undefined) {
        if (this.asignacionData.conductor && typeof this.asignacionData.conductor === 'number') {
          this.conductorService.getConductorById(this.asignacionData.conductor).subscribe(conductor => {
            this.asignacionData!.conductor = conductor;
            this.conductor = this.asignacionData!.conductor!;
            this.asignacionForm.get('conductor')?.setValue(this.asignacionData!.conductor?.id ?? null)
          });
        }
        this.bus = this.asignacionData.bus!;
        this.asignacionForm.get('bus')?.setValue(this.asignacionData.bus?.id ?? null);
        this.ruta = this.asignacionData.ruta!;
        this.asignacionForm.get('ruta')?.setValue(this.asignacionData.ruta?.id ?? null);
        this.horario = this.asignacionData.horario!;
        this.asignacionForm.get('horario')?.setValue(this.asignacionData.horario?.id ?? null);
      }
    }
  }
}
