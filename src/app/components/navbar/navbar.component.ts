import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <header class="navbar" [class.scrolled]="isScrolled" role="banner">
        <div class="navbar-container">
            <a href="#" class="navbar__logo-wrapper" aria-label="M Tech Square Group - Home">
                <img src="assets/m_tech_square_logo_updated.png" 
                     class="navbar__logo-image" 
                     alt="M Tech Square Group Logo"
                     width="40" height="40">
                <div class="navbar__logo-text">
                    <span class="navbar__brand-name">M TECH</span>
                    <span class="navbar__sub-brand">SQUARE GROUP</span>
                </div>
            </a>
            
            <nav class="navbar__nav" aria-label="Desktop Navigation">
                <a href="#home" class="navbar__link">{{ 'navbar.home' | translate }}</a>
                <a href="#about" class="navbar__link">{{ 'navbar.about' | translate }}</a>
                <a href="#journey" class="navbar__link">{{ 'navbar.journey' | translate }}</a>
                <a href="#innovation-ecosystem" class="navbar__link">{{ 'navbar.ecosystem' | translate }}</a>
                <a href="#brands" class="navbar__link">{{ 'navbar.brands' | translate }}</a>
            </nav>

            <div class="navbar__actions">
                <button class="glass-neon-btn lang-switcher" 
                        (click)="toggleLanguage()" 
                        [attr.aria-label]="currentLang === 'ar' ? 'Switch to English' : 'تغيير للغة العربية'">
                    {{ currentLang === 'ar' ? 'EN' : 'AR' }}
                </button>

                <button class="mobile-menu-toggle" (click)="toggleMenu()" aria-label="Toggle navigation menu">
                    <span class="hamburger-icon" [class.open]="menuOpen">
                        <span></span><span></span><span></span>
                    </span>
                </button>
            </div>
        </div>
    </header>

    <nav class="mobile-menu" [class.open]="menuOpen" aria-label="Mobile navigation">
        <a href="#home" class="mobile-menu__link" (click)="toggleMenu()">{{ 'navbar.home' | translate }}</a>
        <a href="#about" class="mobile-menu__link" (click)="toggleMenu()">{{ 'navbar.about' | translate }}</a>
        <a href="#journey" class="mobile-menu__link" (click)="toggleMenu()">{{ 'navbar.journey' | translate }}</a>
        <a href="#innovation-ecosystem" class="mobile-menu__link" (click)="toggleMenu()">{{ 'navbar.ecosystem' | translate }}</a>
        <a href="#brands" class="mobile-menu__link" (click)="toggleMenu()">{{ 'navbar.brands' | translate }}</a>
    </nav>
  `,
  styles: [`
    header.navbar {
        position: fixed;
        top: 0; left: 0; right: 0;
        height: 70px;
        background: transparent;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 400ms ease;
        border-bottom: 1px solid transparent;
    }

    header.navbar.scrolled {
        background: rgba(0, 31, 63, 0.95);
        backdrop-filter: blur(20px) saturate(1.1);
        border-bottom: 1px solid rgba(213, 177, 130, 0.1);
    }

    .navbar-container {
        width: 100%;
        max-width: 1600px;
        padding: 0 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .navbar__logo-wrapper { display: flex; align-items: center; gap: 16px; text-decoration: none; }
    .navbar__logo-image { width: 40px; height: 40px; object-fit: contain; filter: drop-shadow(0 0 5px rgba(213, 177, 130, 0.4)); }
    .navbar__logo-text { display: flex; flex-direction: column; }
    .navbar__brand-name { font-family: 'Cormorant Garamond', Georgia, serif; font-size: 20px; font-weight: 700; color: var(--white); letter-spacing: 3px; }
    .navbar__sub-brand { font-size: 10px; font-weight: 600; color: var(--gold); letter-spacing: 2px; text-transform: uppercase; }

    .navbar__nav { display: flex; gap: 40px; align-items: center; }
    .navbar__link {
        font-size: 12px; font-weight: 600; color: var(--white); letter-spacing: 1.5px;
        text-transform: uppercase; text-decoration: none; position: relative;
        padding-bottom: 6px; transition: color 300ms ease;
    }
    .navbar__link::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1.5px;
        background: var(--gold);
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    .navbar__link:hover { color: var(--white); }
    .navbar__link:hover::after { transform: scaleX(1); }
    
    .navbar__actions { display: flex; align-items: center; gap: 20px; }

    .lang-switcher {
        min-width: 50px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: inherit;
    }

    [lang="ar"] .lang-switcher { font-family: var(--font-sans); }

    .mobile-menu-toggle { display: none; background: none; border: none; cursor: pointer; z-index: 1001; }
    .hamburger-icon { display: flex; flex-direction: column; gap: 5px; width: 24px; }
    .hamburger-icon span { display: block; width: 100%; height: 2px; background: var(--white); transition: all 300ms ease; }
    .hamburger-icon.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .hamburger-icon.open span:nth-child(2) { opacity: 0; }
    .hamburger-icon.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

    .mobile-menu {
        position: fixed; top: 70px; left: 0; right: 0;
        background: rgba(0, 31, 63, 0.98); backdrop-filter: blur(20px);
        max-height: 0; overflow: hidden; transition: all 300ms ease;
        display: flex; flex-direction: column; z-index: 999; padding: 0 20px;
    }
    .mobile-menu.open { max-height: 100vh; padding: 20px; border-bottom: 2px solid var(--gold); }
    .mobile-menu__link { color: var(--white); text-decoration: none; padding: 16px 0; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; font-size: 13px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }

    @media (max-width: 1024px) { .navbar-container { padding: 0 40px; } .navbar__nav { gap: 30px; } }
    @media (max-width: 992px) { .navbar__nav { display: none; } .mobile-menu-toggle { display: block; } }
  `]
})
export class NavbarComponent {
  isScrolled = false;
  menuOpen = false;
  currentLang = 'en';

  constructor(private translate: TranslateService) {
    this.currentLang = this.translate.currentLang || 'en';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.translate.use(this.currentLang);
    
    // Smooth transition effect
    document.documentElement.classList.add('switching-lang');
    setTimeout(() => {
        document.documentElement.lang = this.currentLang;
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.classList.remove('switching-lang');
    }, 150);
  }
}
