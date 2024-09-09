import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApolloModule} from "apollo-angular";
import {CommonModule} from "@angular/common";

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, ApolloModule, CommonModule]
})
export class LoginComponent {
  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl(null, [Validators.required, Validators.email]),
    password: new UntypedFormControl(null, [Validators.required])
  })

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: async mutationResult => {
        const {data} = mutationResult
        if (!data || !data.login) {
          return alert('Combination of email and password to be incorrect.')
        }
        this.authService.user = data
        await this.router.navigate(['welcome'])
      },
      error: err => {
        alert('An erro occurred in the login. ' + err.error.message)
      }
    })
  }
}
