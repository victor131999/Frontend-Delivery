import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Delivery';
  constructor(private authService: AuthService, private router:Router) { }

  logout() {
    this.authService.logout();    
    this.router.navigate(['/login']);
  }
  
}
