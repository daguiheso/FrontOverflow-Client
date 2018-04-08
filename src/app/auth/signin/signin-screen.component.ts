import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin-screen',
  templateUrl: './signin-screen.component.html',
  styleUrls: ['./signin-screen.component.css']
})

export class SigninScreenComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      /*
        First param: default value input email
        Second param: array validations
      */
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    // If form is valid
    if (this.signinForm.valid) {
      // Get value email and password from form
      const { email, password } = this.signinForm.value;
      const user = new User(email, password);
      this.authService.signin(user)
        .subscribe(res => {
          this.authService.login(res.body);
        }, error => {
          debugger
        });
    }
  }

}
