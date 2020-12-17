import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import firebase from "firebase/app";
import "firebase/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { NodeWithI18n } from '@angular/compiler';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  registerForm: FormGroup;

  constructor(private router: Router,
    private afDb: AngularFireDatabase,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      contact: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(250)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(250)]],
    },
      { validators: this.passwordConfirm });
  }
  get f() { return this.registerForm.controls; }

  passwordConfirm(f: AbstractControl): { invalid: boolean } {
    if (f.get('password').value !== f.get('confirmPassword').value) {
      return { invalid: true };
    }
  }

  register() {
    const formValue = this.registerForm.value;
    console.log(formValue);
    firebase.auth().createUserWithEmailAndPassword(formValue.email, formValue.password)
      .then((user) => {
        console.log(user)
        this.afDb.object("users/" + user.user.uid).set({
          email: formValue.email,
          name: formValue.name,
          uid: user.user.uid,
          contact: formValue.contact,
          createdAt: Date.now()
        }).then(()=>{
              this.router.navigate(['/login'])
        }).catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        })
      })
  }
}