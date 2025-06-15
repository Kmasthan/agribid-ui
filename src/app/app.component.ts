import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgriBidHomeModule } from './agri-bid-home/agri-bid-home.module';
import { UserScreenModule } from './user-screen/user-screen.module';
import { SprinnerLoadingService } from './spinner-loading.service'
import { SpinnerComponent } from './spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent, HttpClientModule, AgriBidHomeModule, UserScreenModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AgriBid';

  isLoading: boolean = false;

  constructor(
    private sprinnerLoadingService: SprinnerLoadingService, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
    // Subscribe to loading$ observable to manage spinner visibility
      this.sprinnerLoadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
      this.cdr.detectChanges();
    });
  }
}
