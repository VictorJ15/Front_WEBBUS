import { HorarioService } from './../../services/horario.service';
import { Horario } from './../../models/horario';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HorarioFormsComponent } from "../../forms/horario-forms/horario-forms.component";


@Component({
    selector: 'app-horario-create',
    templateUrl: './horario-create.component.html',
    standalone: true,
    imports: [CommonModule, HorarioFormsComponent]
})
export class HorarioCreateComponent implements OnInit{
    constructor(private router:Router, private horarioService:HorarioService, private route: ActivatedRoute){}
    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'horarios';
    }
    returnUrl :String|undefined;
    handleHorarioReady(horario:Horario){
        console.log(horario);
        this.horarioService.createHorario(horario).subscribe(()=>{
            this.router.navigate([this.returnUrl])
        })
    }
}
