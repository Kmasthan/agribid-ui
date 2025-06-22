import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionDataFilterPipe } from './region-data-filter.pipe';



@NgModule({
  declarations: [RegionDataFilterPipe],
  imports: [
    CommonModule
  ],
  exports: [RegionDataFilterPipe]
})
export class FiltersModule { }
