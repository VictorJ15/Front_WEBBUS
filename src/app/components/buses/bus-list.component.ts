import { Asignacion } from './../../models/asignacion';
import { FormsModule } from '@angular/forms';
import { Bus } from './../../models/bus';

// src/app/buses/bus-list/bus-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { BusService } from '../../services/bus.service';


@Component({
    selector: 'app-bus-list',
    templateUrl: './bus-list.component.html',
    standalone: true,
    imports: [FormsModule, CommonModule, RouterModule]
})
export class BusListComponent implements OnInit {
    buses: Bus[] = [];

    constructor(private busService: BusService, private router:Router) { }


    ngOnInit(): void {
        this.loadBuses();
    }

    loadBuses(): void {
        this.busService.getAllBuses().subscribe((buses: Bus[]) => {
            this.buses = buses;
        });
    }

    deleteBus(id: number): void {
        this.busService.deleteBus(id).subscribe((success: boolean) => {
            if (success) {   
                alert("Bus eliminado correctamente")                     
                this.loadBuses();
            } 
        });
    }    
    
    createBus(): void{        
        this.router.navigate(['buses/create']);
    }
    editBus(bus:Bus){        
        this.router.navigate(['buses/edit', bus.id]);
    }
    verAsignaciones(bus:Bus){
        this.router.navigate(["buses/asignaciones", bus.id]);
    }
}
