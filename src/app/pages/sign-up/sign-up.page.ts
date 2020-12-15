import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  register(form) {
    console.log(form);
    // this.authService.register(form.value).subscribe((res) => {
    //   this.router.navigateByUrl('home');
    // });
  }

}
