import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionDataFilterPipe } from './region-data-filter.pipe';
import { LanguageSelectionFilter } from './language-selection-filter.pipe';



@NgModule({
  declarations: [RegionDataFilterPipe, LanguageSelectionFilter],
  imports: [
    CommonModule
  ],
  exports: [RegionDataFilterPipe, LanguageSelectionFilter]
})
export class FiltersModule { }
