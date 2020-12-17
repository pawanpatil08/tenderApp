import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  tenderList = ['Building Construction', 'Chemicals', 'Civil Works', 'Computer Equipment & Accessories', 'Furniture',
    'Laboratory & scientific equipment', 'Road Construction', 'Scrap & waste materials',
    'Software',
    'Transportation Services'];

  constructor( private afDb: AngularFireDatabase) { }

  ngOnInit() {
    // this.afDb.database.
    // this.afDb.list('tenderList').push(['Building Construction', 'Chemicals', 'Civil Works', 'Computer Equipment & Accessories', 'Furniture',
    // 'Laboratory & scientific equipment', 'Road Construction', 'Scrap & waste materials',
    // 'Software',
    // 'Transportation Services']);
      
  
  }

}
