import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Conductor } from './../../models/conductor';
import { ConductorService } from './../../services/conductor.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


@Component({
    selector: 'app-conductor-list',
    templateUrl: './conductor-list.component.html',
    standalone: true,
    imports: [CommonModule, HttpClientModule, RouterModule]
})
export class ConductorListComponent implements OnInit {
    
    conductores: Conductor[] = [];

    constructor(private conductorService: ConductorService, private router: Router) { }

    ngOnInit(): void {
        this.loadConductores();
    }
    createConductor():void{
        this.router.navigate(['conductores/create']);
    }
    loadConductores(): void {
        this.conductorService.getAllConductores().subscribe((conductores: Conductor[]) => {
            this.conductores = conductores;
        });
    }
    editConductor(conductor: Conductor): void {
        this.router.navigate(["conductores/edit", conductor.id]);
    }
    deleteConductor(id: number): void {
        this.conductorService.deleteConductor(id).subscribe(() => {
            this.loadConductores();
        });
    }
    verAsignaciones(conductor:Conductor): void{
        this.router.navigate(["/conductores/asignaciones", conductor.id]);
    }
}
