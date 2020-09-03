import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { faSave, faTimes , faAt, faUser, faKey, faUsers} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  faSave = faSave;
  faTimes = faTimes;
  faAt = faAt;
  faUser = faUser;
  faKey =  faKey;
  faUserAlt =  faUsers;


  form: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, 
    private formBuilder: FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
      role: ['customer', [Validators.required]]
    });    
  }

  get f(){
    return this.form.controls;
  }

  onSubmit(): void {       
        
    if (this.form.invalid) {
        return;
    }
    
    this.authService.signup(this.form.value).subscribe(
        (result) => {                  
          if(result !== undefined)
          {
            if(result.icon === "success"){                            
              this.router.navigate(['/login']);
              return;
            }                     
          }
        }        
      ); 
  }

  onReset() {        
    this.form.reset();
  }



}