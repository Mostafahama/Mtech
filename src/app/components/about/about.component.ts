import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule, RevealDirective],
  template: `
    <section class="about-section" id="about" aria-labelledby="about-title">
        <div class="about-bg-animation">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
        </div>
        <div style="font-size: 48px; color: rgba(213, 177, 130, 0.15); font-family: 'Playfair Display', serif; line-height: 1; margin-bottom: 5px;" class="reveal" appReveal>01</div>
        <div class="about-label reveal" appReveal>{{ 'about.label' | translate }}</div>
        <h2 class="about-title serif-font reveal" id="about-title" [delay]="200" appReveal>{{ 'about.title' | translate }}</h2>
        <div class="about-text reveal" [delay]="400" appReveal>
            <p>{{ 'about.p1' | translate }}</p>
            <p>{{ 'about.p2' | translate }}</p>
            <p>{{ 'about.p3' | translate }}</p>
        </div>
    </section>
  `,
  styles: [`
    .about-section { 
        position: relative; padding: 140px 40px; background: #FFFFFF; color: #333333; 
        text-align: center; display: flex; flex-direction: column; align-items: center; 
        overflow: hidden; 
    }
    .about-bg-animation { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; opacity: 0.4; }
    .blob { position: absolute; border-radius: 50%; filter: blur(80px); animation: floating 20s infinite alternate ease-in-out; }
    .blob-1 { width: 400px; height: 400px; background: rgba(213, 177, 130, 0.15); top: -100px; left: -100px; }
    .blob-2 { width: 500px; height: 500px; background: rgba(0, 31, 63, 0.05); bottom: -150px; right: -100px; animation-duration: 25s; animation-delay: -5s; }

    @keyframes floating {
        0% { transform: translate(0, 0) scale(1); }
        50% { transform: translate(50px, 80px) scale(1.1); }
        100% { transform: translate(-20px, 40px) scale(0.9); }
    }

    .about-label, .about-title, .about-text { position: relative; z-index: 2; }
    .about-label { color: var(--gold); text-transform: uppercase; letter-spacing: 4px; font-size: 13px; font-weight: 600; margin-bottom: 20px; display: flex; align-items: center; gap: 15px; }
    .about-label::before, .about-label::after { content: ''; height: 1px; width: 40px; background: var(--gold); }
    .about-title { color: var(--navy-dark); font-size: clamp(36px, 5vw, 52px); margin-bottom: 40px; font-family: 'Playfair Display', serif; }
    
    [lang="ar"] .about-title { font-family: var(--font-arabic); font-weight: 700; letter-spacing: 0; }
    [lang="ar"] .about-label { font-family: var(--font-arabic); letter-spacing: 1px; font-size: 14px; }

    .about-text { max-width: 800px; font-size: 18px; line-height: 1.9; font-weight: 400; }
    .about-text p { margin-bottom: 24px; }

    @media (max-width: 640px) {
        .about-section { padding: 80px 20px; }
        .about-title { font-size: clamp(28px, 6vw, 36px); margin-bottom: 24px; }
        .about-text { font-size: 15px; line-height: 1.7; }
        .about-text p { margin-bottom: 16px; }
        .about-label { font-size: 11px; letter-spacing: 3px; }
    }
  `]
})
export class AboutComponent {}
