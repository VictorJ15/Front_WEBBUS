import { BusService } from './../../../services/bus.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BusFormsComponent } from "../../../forms/bus-forms/bus-forms.component";
import { Bus } from '../../../models/bus';

@Component({
  selector: 'app-bus-create',
  standalone: true,
  imports: [BusFormsComponent],
  templateUrl: './bus-create.component.html',
  styleUrl: './bus-create.component.css'
})
export class BusCreateComponent implements OnInit {
  constructor(private router: Router, private busService: BusService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'buses';
  }
  returnUrl: String | undefined;
  handleBusReady(bus: Bus) {
    console.log(bus);
    this.busService.createBus(bus).subscribe(() => {
      this.router.navigate([this.returnUrl])
    })
  }
}
