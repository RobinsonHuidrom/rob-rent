
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'bwm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string = '';

  constructor(private fb: FormBuilder, 
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { } 

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe( (params) => {
      if(params['registered'] === 'success'){
        this.notifyMessage = "You have been successfully registered, You can Login Now";
      }
    })
   }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password: ['', Validators.required]
    })
  }

  isInvalidForm(fieldName): boolean {
    return this.loginForm.controls[fieldName].invalid &&
           (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched)
  }

  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }

  isEmailValid(fieldname): boolean{
    return this.loginForm.controls[fieldname].errors.pattern;
  }

  login() {
    this.auth.loginNewUser(this.loginForm.value).subscribe (
      (token) => {
        this.router.navigate(['/rentals']);
      },
      (errorResponse) => {
        this.errors = errorResponse.error.errors;
      }
    )
  }
}