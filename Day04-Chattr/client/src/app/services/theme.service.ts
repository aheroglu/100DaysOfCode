import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private themeKey = 'app-theme';
  private darkClass = 'dark';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  initializeTheme() {
    const theme = localStorage.getItem(this.themeKey);
    if (theme === 'dark') {
      this.renderer.addClass(document.documentElement, this.darkClass);
    } else {
      this.renderer.removeClass(document.documentElement, this.darkClass);
    }
  }

  toggleTheme() {
    const isDark = document.documentElement.classList.contains(this.darkClass);
    if (isDark) {
      this.renderer.removeClass(document.documentElement, this.darkClass);
      localStorage.setItem(this.themeKey, 'light');
    } else {
      this.renderer.addClass(document.documentElement, this.darkClass);
      localStorage.setItem(this.themeKey, 'dark');
    }
  }

  getCurrentTheme(): 'light' | 'dark' {
    return localStorage.getItem(this.themeKey) === 'dark' ? 'dark' : 'light';
  }
}
