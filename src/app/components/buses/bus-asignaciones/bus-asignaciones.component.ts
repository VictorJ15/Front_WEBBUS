import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Bus } from '../../../models/bus';
import { BusService } from '../../../services/bus.service';
import { TablaAsignacionesComponent } from "../../../tablas/tabla-asignaciones/tabla-asignaciones.component";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bus-asignaciones',
  standalone: true,
  imports: [CommonModule, TablaAsignacionesComponent],
  templateUrl: './bus-asignaciones.component.html',
  styleUrl: './bus-asignaciones.component.css'
})
export class BusAsignacionesComponent implements OnInit{
  routeSub!: Subscription;
  busId:number=0;
  bus: Bus = new Bus({
    placa: ""
  });
  constructor(
    private busService: BusService, private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {           
      this.busId=params['id'];
      this.busService.getBusById(this.busId).subscribe((data:any) =>{
        this.bus=data;
      })
    });
  }
  
}
