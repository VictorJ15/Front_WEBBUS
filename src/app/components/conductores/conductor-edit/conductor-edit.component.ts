import { Conductor } from './../../../models/conductor';
import { CommonModule } from '@angular/common';
import { ConductorService } from './../../../services/conductor.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ConductorFormsComponent } from "../../../forms/conductor-forms/conductor-forms.component";
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-conductor-edit',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, ConductorFormsComponent],
  templateUrl: './conductor-edit.component.html',
  styleUrl: './conductor-edit.component.css'
})
export class EditConductorComponent implements OnInit {
  conductorId: number =0;
  conductor!: Conductor;
  private routeSub!: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private conductorService: ConductorService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {           
      this.conductorId=params['id'];
    });    
    this.conductorService.getConductorById(this.conductorId).subscribe((conductor)=>{
      this.conductor=conductor;
      console.log(conductor);
    })  
  }

  handleConductorReady(conductor: Conductor) {    
    this.conductorService.updateConductor(this.conductorId, conductor).subscribe(()=>{
      this.router.navigate(["conductores"])
    })
  }
  
  ngOnDestroy(): void {    
    this.routeSub.unsubscribe();
  } 
}
