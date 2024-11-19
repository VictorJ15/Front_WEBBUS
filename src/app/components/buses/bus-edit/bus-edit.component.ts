import { ConductorService } from './../../../services/conductor.service';
import { Conductor } from './../../../models/conductor';
import { Bus } from './../../../models/bus';
import { Component, inject, input, Input, OnInit, SimpleChanges } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BusForm } from '../../../forms/busForm';
import { CommonModule } from '@angular/common';
import { BusFormsComponent } from "../../../forms/bus-forms/bus-forms.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { BusService } from '../../../services/bus.service';

@Component({
  selector: 'app-bus-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BusFormsComponent],
  templateUrl: './bus-edit.component.html',
  styleUrl: './bus-edit.component.css'
})
export class BusEditComponent implements OnInit {
  bus!: Bus;
  private routeSub!: Subscription;
  busId :number=0;
  constructor(private busService: BusService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {           
      this.busId=params['id'];
    });    
    this.busService.getBusById(this.busId).subscribe((bus)=>{
      this.bus=bus;
      console.log(bus);
    })    
  }  
  handleBusReady(bus: Bus) {    
    this.busService.updateBus(this.busId, bus).subscribe(()=>{
      this.router.navigate(["buses"])
    })
  }
  ngOnDestroy(): void {    
    this.routeSub.unsubscribe();
  }
}


