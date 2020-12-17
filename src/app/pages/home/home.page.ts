import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private storage: Storage) { }

  ngOnInit() {
    this.storage.set('name', 'Max');

  // Or to get a key/value pair
  this.storage.get('name').then((val) => {
    console.log('Your age is', val);
  });
  }

}
