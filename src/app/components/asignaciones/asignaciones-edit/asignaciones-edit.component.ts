import { Component } from '@angular/core';
import { Asignacion } from '../../../models/asignacion';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignacionService } from '../../../services/asignacion.service';
import { AsignacionFormsComponent } from "../../../forms/asignacion-forms/asignacion-forms.component";

@Component({
  selector: 'app-asignaciones-edit',
  standalone: true,
  imports: [AsignacionFormsComponent],
  templateUrl: './asignaciones-edit.component.html',
  styleUrl: './asignaciones-edit.component.css'
})
export class AsignacionesEditComponent {
  asignacionId: number =0;
  asignacion!: Asignacion;
  private routeSub!: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private asignacionService: AsignacionService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {           
      this.asignacionId=params['id'];
    });    
    this.asignacionService.getAsignacionById(this.asignacionId).subscribe((asignacion: Asignacion)=>{
      this.asignacion=asignacion;
      console.log(asignacion);
    })  
  }

  handleasignacionReady(asignacion: Asignacion) {    
    this.asignacionService.updateAsignacion(this.asignacionId, asignacion).subscribe(()=>{
      this.router.navigate(["asignaciones"])
    })
  }
  
  ngOnDestroy(): void {    
    this.routeSub.unsubscribe();
  } 
}
