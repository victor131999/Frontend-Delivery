import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { faAt,faKey,faUser,faUserAlt,faSave,faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  
  constructor(private formBuilder: FormBuilder, private authService:AuthService, private router:Router) { }
  submitted = false;
  form : FormGroup
  faAt=faAt;
 faKey=faKey;
 faUser=faUser;
 faUserAlt=faUserAlt;
 faSave=faSave;
 faTimes=faTimes;

  ngOnInit(): void {
    //formBuilder

    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        displayName: ['', [Validators.required]],
        password: ['', [Validators.required], Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")],
        role: ['customer', [Validators.required]]
      }
    )
  }

  onSubmit():void{
    this.submitted = true;
    if(this.form.invalid){
        return
    }else{
      this.authService.signup(this.form.value).subscribe(
        (result)=>{
          console.warn(result);
          if(result!==undefined){
            this.router.navigate['/'];  
          }
          
        }
      )
      this.submitted = false;
    }
    
  }

  onReset(){
    this.form.reset();
    
  }

  get f(){
    return this.form.controls;
  }


}
