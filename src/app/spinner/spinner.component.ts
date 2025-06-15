import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

  @Input() isLoading!: boolean;

  constructor(private ngxSpinnerService: NgxSpinnerService) { }

  ngOnChanges(): void {
      if (this.isLoading) {
        this.ngxSpinnerService.show(); 
      } else {
        this.ngxSpinnerService.hide();
      }
  }
}
