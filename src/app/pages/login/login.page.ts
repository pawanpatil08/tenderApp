import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';

import firebase from "firebase/app";
import "firebase/auth";
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private afDb: AngularFireDatabase) { }
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.email]),
    password: new FormControl('',[Validators.required])
  });
  ngOnInit() {
  }
  
  login() {
    console.log(this.loginForm);
    const formValue = this.loginForm.value;
    console.log(formValue);
    firebase.auth().signInWithEmailAndPassword(formValue.email, formValue.password)
      .then((user) => {
        console.log(user);
        this.router.navigate(['/dashboard'])
      }).catch((error) => {
        console.log(error)
        var errorCode = error.code;
        var errorMessage = error.message;
      })
  }
}
