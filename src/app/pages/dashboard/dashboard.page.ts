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
    const tid = this.getRandomString();
    const orderId = this.getRandomString();
    const totalPrice = 1.00;
    const UPI_ID = '******';
    const UPI_NAME = 'Pawan Patil';
    const UPI_TXN_NOTE = 'TEST TXN';
    // tslint:disable-next-line: max-line-length
    let uri = `upi://pay?pa=${UPI_ID}&pn=${UPI_NAME}&tid=${tid}&am=${totalPrice}&cu=INR&tn=${UPI_TXN_NOTE}&tr=${orderId}`;
    uri = uri.replace(' ', '+');
    (window as any).plugins.intentShim.startActivityForResult(
      {
        action: this.webIntent.ACTION_VIEW,
        url: uri,
        requestCode: 1
      }, intent => {
        if (intent.extras.requestCode === 1 &&
            intent.extras.resultCode === (window as any).plugins.intentShim.RESULT_OK &&
            intent.extras.Status &&
            (((intent.extras.Status as string).toLowerCase()) === ('success'))) {
          this.paymentSuccess(orderId, 'UPI');
        } else {
          alert('payment failed');
        }
      }, err => {
        alert('error ' + err);
      });
  }

  getRandomString() {
    const len = 10;
    const arr = '1234567890asdfghjklqwertyuiopzxcvbnmASDFGHJKLQWERTYUIOPZXCVBNM';
    let ans = '';
    for (let i = len; i > 0; i--) {
        ans += arr[Math.floor(Math.random() * arr.length)];
    }
    return ans;
  }

  paymentSuccess(orderId: string, paymentMethod: string) {
    alert(`Payment successful Order Id ${orderId} payment method ${paymentMethod}`);
  }

}
