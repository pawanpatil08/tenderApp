import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import firebase from "firebase/app";
import "firebase/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { Storage } from '@ionic/storage';
var provider = new firebase.auth.GoogleAuthProvider();
var fbProvider = new firebase.auth.FacebookAuthProvider();

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errorMessage = "";
  constructor(private router: Router, private afDb: AngularFireDatabase,
    private storage: Storage) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  ngOnInit() {
  }

  ionViewWillEnter() {
    this.errorMessage = "";
    this.loginForm.reset();
  }
  login() {
    console.log(this.loginForm);
    const formValue = this.loginForm.value;
    console.log(formValue);
    firebase.auth().signInWithEmailAndPassword(formValue.email, formValue.password)
      .then((user) => {
        console.log(user);
        this.storage.set('user', user);
        this.router.navigate(['/dashboard'])
      }).catch((error) => {
        console.log(error)
        var errorCode = error.code;
        this.errorMessage = error.message;
      })
  }

  loginWithGoogle = () => {
    firebase.auth().signInWithPopup(provider).then((result) => {
      var user = result.user;
      console.log(user);
      console.log('Logged In');
      this.router.navigate(['/dashboard']);
      // ...
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      this.errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  loginWithFb = () => {
    firebase.auth().signInWithPopup(fbProvider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      console.log('Logged In');
      this.router.navigate(['/dashboard']);
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
}
