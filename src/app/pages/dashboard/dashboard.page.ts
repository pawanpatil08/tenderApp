import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  tenderList = [];

  constructor(private afDb: AngularFireDatabase) { }

  ngOnInit() {
  }

}
