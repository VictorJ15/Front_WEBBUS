import { Asignacion } from './../../../models/asignacion';
import { ConductorService } from './../../../services/conductor.service';
import { Conductor } from './../../../models/conductor';
import { AsignacionService } from './../../../services/asignacion.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { TablaAsignacionesComponent } from "../../../tablas/tabla-asignaciones/tabla-asignaciones.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conductor-asignaciones',
  standalone: true,
  imports: [CommonModule, TablaAsignacionesComponent],
  templateUrl: './conductor-asignaciones.component.html',
  styleUrl: './conductor-asignaciones.component.css'
})
export class ConductorAsignacionesComponent implements OnInit {
  conductorId!: number;
  conductor:Conductor={
    nombre: ""
  };
  constructor(private conductorService:ConductorService, private route:ActivatedRoute){}
  private routeSub!: Subscription;
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {           
      this.conductorId=params['id'];
      this.conductorService.getConductorById(this.conductorId).subscribe((data:any) =>{
        this.conductor=data;
      })
    });
  };  
}
