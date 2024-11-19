import { HorarioService } from './../../../services/horario.service';
import { Component } from '@angular/core';
import { HorarioFormsComponent } from "../../../forms/horario-forms/horario-forms.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Horario } from '../../../models/horario';

@Component({
  selector: 'app-horarios-edit',
  standalone: true,
  imports: [HorarioFormsComponent],
  templateUrl: './horarios-edit.component.html',
  styleUrl: './horarios-edit.component.css'
})
export class HorariosEditComponent {
  horario!: Horario;
  private routeSub!: Subscription;
  horarioId :number=0;
  constructor(private horarioService: HorarioService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {           
      this.horarioId=params['id'];
    });    
    this.horarioService.getHorarioById(this.horarioId).subscribe((horario)=>{
      this.horario=horario;
      console.log(horario);
    })    
  }  
  handlehorarioReady(horario: Horario) {    
    this.horarioService.updateHorario(this.horarioId, horario).subscribe(()=>{
      this.router.navigate(["horarios"])
    })
  }
  ngOnDestroy(): void {    
    this.routeSub.unsubscribe();
  }
}
