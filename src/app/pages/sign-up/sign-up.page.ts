import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import firebase from "firebase/app";
import "firebase/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  registerForm: FormGroup;
  users;

  constructor(private router: Router,
    private afDb: AngularFireDatabase,
    private formBuilder: FormBuilder,
    public toastController: ToastController
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
    firebase.auth().createUserWithEmailAndPassword(formValue.email, formValue.password)
      .then((user) => {
        this.afDb.list('users').valueChanges().subscribe(response => {
          response.forEach(obj => {
            if (obj['contact'] === formValue.contact) {
              const errorMessage = 'You have already registered your mobile no' + formValue.contact;
              this.presentToast(errorMessage, 'danger');
              return;
            }
          })
        });
        this.afDb.object("users/" + user.user.uid).set({
          email: formValue.email,
          name: formValue.name,
          uid: user.user.uid,
          contact: formValue.contact,
          createdAt: Date.now()
        }).then(() => {
          const successMessgae = 'You have successfully register yourself. Please login'
          this.presentToast(successMessgae, 'success');
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 2000);
        }).catch((error) => {
          const errorMessage = error.message;
          this.presentToast(errorMessage, 'danger');
        })
      }).catch((error) => {
        const errorMessage = error.message;
        this.presentToast(errorMessage, 'danger');
      })
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      animated: true,
      color: color
    });
    toast.present();
  }
}