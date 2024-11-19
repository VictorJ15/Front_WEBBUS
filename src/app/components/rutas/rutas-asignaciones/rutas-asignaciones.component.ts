import { RutaService } from './../../../services/ruta.service';
import { Component, OnInit } from '@angular/core';
import { Ruta } from '../../../models/ruta';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TablaAsignacionesComponent } from "../../../tablas/tabla-asignaciones/tabla-asignaciones.component";

@Component({
  selector: 'app-rutas-asignaciones',
  standalone: true,
  imports: [TablaAsignacionesComponent],
  templateUrl: './rutas-asignaciones.component.html',
  styleUrl: './rutas-asignaciones.component.css'
})
export class RutasAsignacionesComponent implements OnInit {
  rutaId!: number;
  ruta:Ruta={
    codigo: ""
  };
  constructor(private RutaService:RutaService, private route:ActivatedRoute){}
  private routeSub!: Subscription;
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {           
      this.rutaId=params['id'];
      this.RutaService.getRutaById(this.rutaId).subscribe((data:any) =>{
        this.ruta=data;
      })
    });
  };  
}
