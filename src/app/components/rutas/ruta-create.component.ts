import { RutaService } from './../../services/ruta.service';
import { Ruta } from './../../models/ruta';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RutaFormsComponent } from "../../forms/ruta-forms/ruta-forms.component";
import { Action } from 'rxjs/internal/scheduler/Action';


@Component({
    selector: 'app-ruta-create',
    templateUrl: './ruta-create.component.html',
    standalone: true,
    imports: [FormsModule, CommonModule, RutaFormsComponent]
})
export class RutaCreateComponent implements OnInit{   
    constructor(private rutaService: RutaService, private router: Router, private route:ActivatedRoute) { }
    createRuta(ruta:Ruta): void {
        this.rutaService.createRuta(ruta).subscribe(() => {
            this.router.navigate([this.returnUrl])
        });
    }   
    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'rutas';
    }
    returnUrl :String|undefined;
    handleRutaReady(ruta:Ruta){
        this.createRuta(ruta);
    }
}