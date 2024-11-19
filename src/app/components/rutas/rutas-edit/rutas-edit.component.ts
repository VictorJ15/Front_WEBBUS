import { RutaService } from './../../../services/ruta.service';
import { Component } from '@angular/core';
import { RutaFormsComponent } from "../../../forms/ruta-forms/ruta-forms.component";
import { Ruta } from '../../../models/ruta';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rutas-edit',
  standalone: true,
  imports: [RutaFormsComponent],
  templateUrl: './rutas-edit.component.html',
  styleUrl: './rutas-edit.component.css'
})
export class RutasEditComponent {
  ruta!:Ruta;
  private routeSub!: Subscription;
  rutaId :number=0;
  constructor(private rutaService: RutaService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {           
      this.rutaId=params['id'];
    });    
    this.rutaService.getRutaById(this.rutaId).subscribe((ruta)=>{
      this.ruta=ruta;
    })    
  }  
  handleRutaReady(ruta:Ruta) {    
    this.rutaService.updateRuta(this.rutaId, ruta).subscribe(()=>{
      this.router.navigate(["rutas"])
    })
  }
  ngOnDestroy(): void {    
    this.routeSub.unsubscribe();
  }
}
