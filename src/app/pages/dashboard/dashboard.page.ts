import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
import { WebIntent } from '@ionic-native/web-intent/ngx';

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

    payeeVPA: string;
  payeeName: string;
  transactionNote: string = 'Payment for Groceries';
  payAmount: number;
  currency: string = 'INR';
  transactionReference: string;


  constructor( private afDb: AngularFireDatabase,
    private webIntent: WebIntent) { }

  ngOnInit() {
    // this.afDb.database.
    // this.afDb.list('tenderList').push(['Building Construction', 'Chemicals', 'Civil Works', 'Computer Equipment & Accessories', 'Furniture',
    // 'Laboratory & scientific equipment', 'Road Construction', 'Scrap & waste materials',
    // 'Software',
    // 'Transportation Services']);
  }

  pay() {
    this.payeeVPA = '9595114164@upi';
    this.payeeName = 'Pawan%20Patil';
    this.payAmount = 10;
    this.transactionReference = '#87148172'; //ORDER ID or Something similar

    const url = 'upi://pay?pa=' + this.payeeVPA + '&pn=' + this.payeeName + '&tr=' + this.transactionReference + 'tn=' + this.transactionNote + '&am=' + this.payAmount + '&cu=' + this.currency;
    const options = {
      action: this.webIntent.ACTION_VIEW,
      url
    };
    this.webIntent.startActivityForResult(options).then(success => {
      console.log(success);
      if(success.extras.Status == 'SUCCESS') {
        // SUCCESS RESPONSE
      } else if(success.extras.Status == 'SUBMITTED') {
        // SUBMITTED RESPONSE
      } else if(success.extras.Status == 'Failed' || success.extras.Status == 'FAILURE') {
        // FAILED RESPONSE
      } else {
        // FAILED RESPONSE
      }
    }, error => {
      console.log(error);
    });
  }

}
