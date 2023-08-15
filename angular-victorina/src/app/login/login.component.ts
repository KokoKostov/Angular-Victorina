import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators,FormControl,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
   
    email: new FormControl(''),
    password: new FormControl(''),
    
  });
  submitted = false;
  loginError = false; 
constructor( public authService: AuthService, private formBuilder:FormBuilder) { }
ngOnInit(): void {

 this.form = this.formBuilder.group({
  email: ['', [Validators.required]],
  password: ['', Validators.required]
});
 }
 get f(): {[key:string]:AbstractControl}{
  return this.form.controls
}

  async onSubmit(): Promise<void> {
  
  this.submitted = true;
  this.loginError = false; 
  if (this.form.invalid) {
    return;
  }

  const email = this.form.get('email')?.value;
  const password = this.form.get('password')?.value;

try{
   const successfulSignIn= await this.authService.SignIn(email,password);
   
   
   if(!successfulSignIn){
   this.loginError=true
   }
}catch (error){
  console.error('An error occurred during login',error)
  this.loginError=true
}

  }
}
