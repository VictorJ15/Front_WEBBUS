import { ConductorService } from './../../../services/conductor.service';
import { Component } from '@angular/core';
import { Asignacion } from '../../../models/asignacion';
import { AsignacionService } from '../../../services/asignacion.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignaciones-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asignaciones-list.component.html',
  styleUrl: './asignaciones-list.component.css'
})
export class AsignacionesListComponent {
  asignaciones: Asignacion[] = [];

  constructor(private asignacionService: AsignacionService, private router:Router, private conductorService:ConductorService) { }

  ngOnInit(): void {
    this.loadAsignaciones();
  }

  loadAsignaciones() {
    this.asignacionService.getAllAsignaciones().subscribe((asignaciones: Asignacion[]) => {
      this.asignaciones = asignaciones;
      this.asignaciones.forEach(asignacion => {
        if (asignacion.conductor && typeof asignacion.conductor === 'number') {
          this.conductorService.getConductorById(asignacion.conductor).subscribe(conductor => {
            asignacion.conductor = conductor;
          });
        }
      });
    })
  }
  createAsignacion() {
    this.router.navigate(['asignaciones/create'])
  }
  editAsignacion(asignacion: Asignacion) {
    this.router.navigate(['asignaciones/edit', asignacion.id])
  }
  deleteAsignacion(id: number) : void{
    this.asignacionService.deleteAsignacion(id).subscribe(()=>{
      this.loadAsignaciones();
    })
  }
  verAsignaciones(id:number, path:string){
    this.router.navigate([path, id])
  }
}
