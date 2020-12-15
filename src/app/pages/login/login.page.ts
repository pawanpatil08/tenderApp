import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.email]),
    password: new FormControl('',[Validators.required])
  });
  ngOnInit() {
  }
  todo = {}
  logForm() {
    console.log(this.todo)
  }
}
