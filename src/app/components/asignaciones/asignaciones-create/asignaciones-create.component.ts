import { Router } from '@angular/router';
import { AsignacionService } from './../../../services/asignacion.service';
import { Asignacion } from './../../../models/asignacion';
import { Component } from '@angular/core';
import { AsignacionFormsComponent } from "../../../forms/asignacion-forms/asignacion-forms.component";
import { AsignacionDto } from '../../../models/dto/asignacionDto';

@Component({
  selector: 'app-asignaciones-create',
  standalone: true,
  imports: [AsignacionFormsComponent],
  templateUrl: './asignaciones-create.component.html',
  styleUrl: './asignaciones-create.component.css'
})
export class AsignacionesCreateComponent {
  constructor(private asignacionService: AsignacionService, private router: Router) { }
  
  handleAsignacionReady(asignacion:AsignacionDto){
    this.asignacionService.createAsignacion(asignacion).subscribe(()=>{
      this.router.navigate(['asignaciones'])
    })  
  }
}
