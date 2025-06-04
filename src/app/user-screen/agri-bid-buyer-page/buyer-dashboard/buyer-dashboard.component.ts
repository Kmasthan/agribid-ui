import { Component } from '@angular/core';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: false,
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent {

  constructor(){}

  ngOnInit() {
    console.log("WORKING");
  }
}
