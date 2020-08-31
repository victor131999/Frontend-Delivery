import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { faTimes , faAt, faUser, faKey} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  faTimes = faTimes;
  faAt = faAt;
  faUser = faUser;
  faKey =  faKey; 

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  async login(email:string, password:string){
    await this.authService.singin(email, password);
    if(this.authService.isLoggedIn){
      console.log("User login");
    }
}

onCancel() : void {
  this.router.navigate(['/']);
}

}
