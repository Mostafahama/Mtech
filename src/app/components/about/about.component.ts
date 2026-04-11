import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="about-section" id="about">
        <div class="about-bg-animation">
            <div class="blob blob-1"></div>
            <div class="blob blob-2"></div>
        </div>
        <div style="font-size: 48px; color: rgba(213, 177, 130, 0.15); font-family: 'Playfair Display', serif; line-height: 1; margin-bottom: 5px;" class="reveal" appReveal>01</div>
        <div class="about-label reveal" appReveal>THE PARENT ENTITY</div>
        <h2 class="about-title serif-font reveal" [delay]="200" appReveal>M Tech Square Group</h2>
        <div class="about-text reveal" [delay]="400" appReveal>
            <p>Establishing as a premier holding company in Cairo, M Tech Square Group unites five specialized entities under a singular vision of technological and educational excellence.</p>
            <p>We serve as the strategic umbrella that fosters growth across software development, digital marketing, vocational training for youth, and medical professional development.</p>
            <p>Our mission is to empower Egypt's next generation with the tools of tomorrow while providing world-class professional services to enterprises across the region.</p>
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
    .about-text { max-width: 800px; font-size: 18px; line-height: 1.9; font-weight: 400; }
    .about-text p { margin-bottom: 24px; }
  `]
})
export class AboutComponent {}
