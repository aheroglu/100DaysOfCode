import { Injectable } from '@angular/core';
import { FlexiToastService } from 'flexi-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: FlexiToastService) {}

  showToast(title: string, text: string, icon: FlexiToastIconType = 'success') {
    this.toast.showToast(title, text, icon, {
      timeOut: 3000,
      autoClose: true,
      position: 'bottom-right',
      preventDuplicate: false,
      showSwalCloseBtn: true,
      showProgressBar: true,
      themeClass: 'light',
    });
  }

  showSwal(
    title: string,
    text: string,
    confirmBtnText: string,
    cancelBtnText: string,
    callBack: () => void,
    cancelCallBack?: () => void
  ) {
    this.toast.showSwal(
      title,
      text,
      callBack,
      confirmBtnText,
      cancelBtnText,
      cancelCallBack
    );
  }
}

export type FlexiToastIconType = 'success' | 'error' | 'warning' | 'info';
