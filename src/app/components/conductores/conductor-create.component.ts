import { FormsModule } from '@angular/forms';
import { Conductor } from './../../models/conductor';
import { ConductorService } from './../../services/conductor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConductorFormsComponent } from "../../forms/conductor-forms/conductor-forms.component";


@Component({
    selector: 'app-conductor-create',
    templateUrl: './conductor-create.component.html',
    standalone: true,
    imports: [FormsModule, ConductorFormsComponent]
})
export class ConductorCreateComponent implements OnInit {
    constructor(private router: Router, private conductorService: ConductorService, private route: ActivatedRoute) { }
    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'conductores';
    }
    returnUrl: String | undefined;
    handleConductorReady(conductor: Conductor) {
        this.conductorService.createConductor(conductor).subscribe(() => {
            this.router.navigate([this.returnUrl]);
        })
    }
}
