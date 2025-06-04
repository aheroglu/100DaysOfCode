import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  /**
   * Success alert
   * @param message Message to be displayed
   * @param header Header (optional)
   */
  async showSuccess(
    message: string,
    header: string = 'Success'
  ): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'success-alert',
    });

    await alert.present();
  }

  /**
   * Error alert
   * @param message Message to be displayed
   * @param header Header (optional)
   */
  async showError(message: string, header: string = 'Error'): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'error-alert',
    });

    await alert.present();
  }

  /**
   * Info alert
   * @param message Message to be displayed
   * @param header Header (optional)
   */
  async showInfo(message: string, header: string = 'Info'): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'info-alert',
    });

    await alert.present();
  }

  /**
   * Warning alert
   * @param message Message to be displayed
   * @param header Header (optional)
   */
  async showWarning(
    message: string,
    header: string = 'Warning'
  ): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
      cssClass: 'warning-alert',
    });

    await alert.present();
  }

  /**
   * Confirm alert
   * @param message Message to be displayed
   * @param header Header (optional)
   * @param confirmText Confirm button text (optional)
   * @param cancelText Cancel button text (optional)
   * @returns User selection (true: confirm, false: cancel)
   */
  async showConfirm(
    message: string,
    header: string = 'Confirm',
    confirmText: string = 'Confirm',
    cancelText: string = 'Cancel'
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            handler: () => {
              resolve(false);
            },
          },
          {
            text: confirmText,
            handler: () => {
              resolve(true);
            },
          },
        ],
        cssClass: 'confirm-alert',
      });

      await alert.present();
    });
  }

  /**
   * Custom alert
   * @param options Alert options
   */
  async showCustomAlert(options: {
    header?: string;
    subHeader?: string;
    message?: string;
    buttons?: any[];
    inputs?: any[];
    cssClass?: string | string[];
  }): Promise<void> {
    const alert = await this.alertController.create(options);
    await alert.present();
  }
}
