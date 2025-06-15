import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private supportedLanguages = ['tr', 'en', 'de', 'fr', 'es'];

  getCurrentLanguage(): string {
    const browserLang = navigator.language.split('-')[0];

    if (this.supportedLanguages.includes(browserLang)) {
      return browserLang;
    }

    // Default
    return 'en';
  }
}
