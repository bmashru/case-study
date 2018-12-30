import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  progressPercentage: Number = 33;
  routerSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.setProgressPercentage(66);
    this.routerSubscription = this.route.queryParams
      .subscribe(params => {
        if (params.auth_token) {
          this.authenticateApplication(params.auth_token);
        } else {
          this.navigateToUnauthorizedPage();
        }
      });
  }

  authenticateApplication(authToken) {
    this.authService.getAccessToken(authToken).subscribe(res => {
      localStorage.setItem('csauth', JSON.stringify(res));
      this.setProgressPercentage(100);
      setTimeout(() => this.router.navigate(['questionnaire']), 4000);
    },
      error => {
        this.navigateToUnauthorizedPage();
      });
  }

  navigateToUnauthorizedPage() {
    this.router.navigate(['unauthorized']);
  }

  setProgressPercentage(percentage: Number) {
    setTimeout(() => this.progressPercentage = percentage, 3000);
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
