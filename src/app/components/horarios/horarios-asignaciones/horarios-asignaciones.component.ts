import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Horario } from '../../../models/horario';
import { HorarioService } from '../../../services/horario.service';
import { TablaAsignacionesComponent } from "../../../tablas/tabla-asignaciones/tabla-asignaciones.component";

@Component({
  selector: 'app-horarios-asignaciones',
  standalone: true,
  imports: [TablaAsignacionesComponent],
  templateUrl: './horarios-asignaciones.component.html',
  styleUrl: './horarios-asignaciones.component.css'
})
export class HorariosAsignacionesComponent {
  horarioId!: number;
  horario:Horario={
    id:0
  };
  constructor(private horarioService:HorarioService, private route:ActivatedRoute){}
  private routeSub!: Subscription;
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {           
      this.horarioId=params['id'];
      this.horarioService.getHorarioById(this.horarioId).subscribe((data:any) =>{
        this.horario=data;
      })
    });
  };  
}
