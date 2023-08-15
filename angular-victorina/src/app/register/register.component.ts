import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Validation from '../utils/validation';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;
  constructor( public authService: AuthService, private formBuilder:FormBuilder ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),

        ]
      ],
      email:['',
      [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')
      ]
    ],
    password:['',
    [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20)
    ]
  ],
  confirmPassword: [``,
  Validators.required
]
    },{
      validators: [Validation.match('password', 'confirmPassword')]
    })

   
  }
  get f(): {[key:string]:AbstractControl}{
    return this.form.controls
  }

  onSubmit():void {
    this.submitted = true;
    
    if (this.form.invalid){
      return
    }
    const email = this.form.get('email')?.value
    const password = this.form.get('password')?.value
    this.authService.SignUp(email,password)
    
  }

}
