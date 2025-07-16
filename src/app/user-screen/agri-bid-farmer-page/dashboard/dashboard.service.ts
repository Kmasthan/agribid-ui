import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private dataService: DataService) { }

  getBiddedCropsForDashBoard(userId: string) {
    return this.dataService.getObjectsWithPath(`farmer/get-bidded-crops-dashboard/${userId}`);
  }
}
