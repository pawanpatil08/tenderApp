import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }
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
