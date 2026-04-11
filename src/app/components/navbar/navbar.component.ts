import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navbar" [class.scrolled]="isScrolled">
        <div class="navbar-container">
            <a href="#" class="navbar__logo-wrapper">
                <img src="assets/m_tech_square_logo_updated.png" class="navbar__logo-image" alt="M Tech Square Group Logo">
                <div class="navbar__logo-text">
                    <span class="navbar__brand-name">M TECH</span>
                    <span class="navbar__sub-brand">SQUARE GROUP</span>
                </div>
            </a>
            <nav class="navbar__nav">
                <a href="#home" class="navbar__link">HOME</a>
                <a href="#about" class="navbar__link">ABOUT</a>
                <a href="#journey" class="navbar__link">JOURNEY</a>
                <a href="#innovation-ecosystem" class="navbar__link">ECOSYSTEM</a>
                <a href="#brands" class="navbar__link">BRANDS</a>
                <a href="#contact" class="navbar__link">CONTACT</a>
            </nav>
            <button class="mobile-menu-toggle" (click)="toggleMenu()" aria-label="Toggle navigation menu">
                <span class="hamburger-icon" [class.open]="menuOpen">
                    <span></span><span></span><span></span>
                </span>
            </button>
        </div>
    </header>

    <nav class="mobile-menu" [class.open]="menuOpen" aria-label="Mobile navigation">
        <a href="#home" class="mobile-menu__link" (click)="toggleMenu()">HOME</a>
        <a href="#about" class="mobile-menu__link" (click)="toggleMenu()">ABOUT</a>
        <a href="#journey" class="mobile-menu__link" (click)="toggleMenu()">JOURNEY</a>
        <a href="#innovation-ecosystem" class="mobile-menu__link" (click)="toggleMenu()">ECOSYSTEM</a>
        <a href="#brands" class="mobile-menu__link" (click)="toggleMenu()">BRANDS</a>
        <a href="#contact" class="mobile-menu__link" (click)="toggleMenu()">CONTACT</a>
    </nav>
  `,
  styles: [`
    /* ═══════════════════════════════════════════════
       NAVBAR — Premium Typography & Spacing
       ═══════════════════════════════════════════════ */

    header.navbar {
        position: fixed;
        top: 0; left: 0; right: 0;
        height: 70px;
        background: transparent;
        backdrop-filter: none;
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
        -webkit-backdrop-filter: blur(20px) saturate(1.1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
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

    /* ── Logo Area ─────────────────────────────── */
    .navbar__logo-wrapper {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 8px 0;
        text-decoration: none;
    }

    .navbar__logo-image {
        width: 40px;
        height: 40px;
        object-fit: contain;
        flex-shrink: 0;
        filter:
            drop-shadow(1px 0 0 var(--gold))
            drop-shadow(0 1px 0 var(--gold))
            drop-shadow(-1px 0 0 var(--gold))
            drop-shadow(0 -1px 0 var(--gold));
    }

    .navbar__logo-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .navbar__brand-name {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 20px;
        font-weight: 700;
        color: var(--white);
        letter-spacing: 3px;
        line-height: 1;
    }

    .navbar__sub-brand {
        font-family: 'Syne', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 10px;
        font-weight: 600;
        color: var(--gold);
        letter-spacing: 2px;
        text-transform: uppercase;
    }

    /* ── Navigation Links ─────────────────────── */
    .navbar__nav {
        display: flex;
        gap: 40px;
        align-items: center;
    }

    .navbar__link {
        font-family: 'Syne', -apple-system, BlinkMacSystemFont, sans-serif;
        font-size: 12px;
        font-weight: 600;
        color: var(--white);
        letter-spacing: 1.5px;
        text-transform: uppercase;
        text-decoration: none;
        position: relative;
        padding-bottom: 4px;
        border-bottom: 2px solid transparent;
        transition: color 300ms ease, border-bottom-color 300ms ease;
    }

    .navbar__link::after {
        content: '';
        position: absolute;
        bottom: -2px; left: 0;
        width: 0; height: 2px;
        background: var(--gold);
        transition: width 300ms ease-out;
        transform-origin: left;
    }

    .navbar__link:hover {
        color: var(--gold-bright);
    }

    .navbar__link:hover::after {
        width: 100%;
    }

    .navbar__link:focus {
        outline: 2px solid var(--gold);
        outline-offset: 4px;
        border-radius: 2px;
    }

    /* ── Hamburger Icon ────────────────────────── */
    .mobile-menu-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 1001;
        padding: 8px;
    }

    .hamburger-icon {
        display: flex;
        flex-direction: column;
        gap: 5px;
        width: 24px;
    }

    .hamburger-icon span {
        display: block;
        width: 100%;
        height: 2px;
        background: var(--white);
        border-radius: 2px;
        transition: all 300ms ease;
    }

    .hamburger-icon.open span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    .hamburger-icon.open span:nth-child(2) {
        opacity: 0;
    }
    .hamburger-icon.open span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }

    /* ── Mobile Menu ───────────────────────────── */
    .mobile-menu {
        position: fixed;
        top: 70px; left: 0; right: 0;
        background: rgba(0, 31, 63, 0.98);
        backdrop-filter: blur(20px) saturate(1.1);
        -webkit-backdrop-filter: blur(20px) saturate(1.1);
        max-height: 0;
        overflow: hidden;
        transition: max-height 300ms ease, padding 300ms ease;
        display: flex;
        flex-direction: column;
        z-index: 999;
        padding: 0 20px;
    }

    .mobile-menu.open {
        max-height: 100vh;
        padding: 20px;
        border-bottom: 2px solid var(--gold);
    }

    .mobile-menu__link {
        color: var(--white);
        text-decoration: none;
        padding: 16px 0;
        font-family: 'Syne', sans-serif;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
        font-size: 13px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        transition: color 300ms ease, padding-left 300ms ease;
    }

    .mobile-menu__link:hover {
        color: var(--gold);
        padding-left: 10px;
    }

    .mobile-menu__link:focus {
        outline: 2px solid var(--gold);
        outline-offset: 2px;
    }

    /* ── Responsive (Desktop → Tablet) ─────────── */
    @media (max-width: 1024px) {
        .navbar-container { padding: 0 40px; }
        .navbar__nav { gap: 30px; }
        .navbar__link { font-size: 11px; }
    }

    /* ── Responsive (Tablet → Mobile) ──────────── */
    @media (max-width: 992px) {
        .navbar__nav { display: none; }
        .mobile-menu-toggle { display: block; }
    }

    @media (max-width: 768px) {
        .navbar-container { padding: 0 20px; }
        header.navbar { height: 60px; }
        .mobile-menu { top: 60px; }
        .navbar__logo-wrapper { gap: 12px; }
        .navbar__brand-name { font-size: 16px; letter-spacing: 2px; }
        .navbar__sub-brand { font-size: 9px; }
        .navbar__logo-image { width: 34px; height: 34px; }
    }

    @media (max-width: 480px) {
        .navbar-container { padding: 0 15px; }
        .navbar__brand-name { font-size: 14px; letter-spacing: 1.5px; }
    }
  `]
})
export class NavbarComponent {
  isScrolled = false;
  menuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
    
    // Global scroll progress bar update
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let progressEl = document.getElementById('scroll-progress');
    if (progressEl) {
       progressEl.style.width = (winScroll / height) * 100 + "%";
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
