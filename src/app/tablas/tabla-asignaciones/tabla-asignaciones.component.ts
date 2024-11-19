import { Component, Input, input } from '@angular/core';
import { AsignacionService } from '../../services/asignacion.service';
import { EMPTY, Observable } from 'rxjs';
import { Asignacion } from '../../models/asignacion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-asignaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla-asignaciones.component.html',
  styleUrl: './tabla-asignaciones.component.css'
})
export class TablaAsignacionesComponent {
  @Input() context!:'conductor'| 'ruta' | 'bus'| 'horario';
  @Input() contextId!: number;

  Asignaciones: Asignacion[] = [];
  constructor(private asignacionService: AsignacionService) {}

  ngOnInit(): void {
    this.loadAsignaciones();
  }
  loadAsignaciones(){
    let asignaciones$: Observable<Asignacion[]> = EMPTY;

    switch (this.context) {
      case 'conductor':
        asignaciones$ = this.asignacionService.getAsignacionesByConductor(this.contextId);
        break;
      case 'ruta':
        asignaciones$ = this.asignacionService.getAsignacionesByRuta(this.contextId);
        break;
      case 'bus':
        asignaciones$ = this.asignacionService.getAsignacionesByBus(this.contextId);
        break;
      case 'horario':
        asignaciones$ = this.asignacionService.getAsignacionesByHorario(this.contextId);
        break;
      default:
        asignaciones$ = new Observable<Asignacion[]>();
    }

    asignaciones$.subscribe((data) => {
      this.Asignaciones = data;
    });
  }
  editAsignacion(){

  }
  deleteAsignacion(){

  }
}
