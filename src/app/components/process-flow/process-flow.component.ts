import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-process-flow',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="flow-section" id="process">
        <div class="flow-container">
            <div class="flow-header">
                <div class="flow-num">04</div>
                <h2>{{ 'process.header_title' | translate }}</h2>
                <h3 class="flow-subtitle serif-font">{{ 'process.header_subtitle' | translate }}</h3>
            </div>
            <div class="flow-grid">
                <article class="flow-card" *ngFor="let step of steps" #flowCard 
                        [attr.aria-label]="('process.step_prefix' | translate) + ' ' + step.num + ': ' + ('process.steps.' + step.key + '.title' | translate)">
                    <div class="flow-icon" [ngClass]="step.iconClass" aria-hidden="true"></div>
                    <div class="flow-step-num">{{ 'process.step_prefix' | translate }} {{ step.num }}</div>
                    <h3 class="serif-font">{{ 'process.steps.' + step.key + '.title' | translate }}</h3>
                    <p>{{ 'process.steps.' + step.key + '.desc' | translate }}</p>
                    <div class="flow-tools">{{ 'process.tools_prefix' | translate }}: {{ 'process.steps.' + step.key + '.tools' | translate }}</div>
                </article>
            </div>
        </div>
    </section>
  `,
  styles: [`
    .flow-section { padding: 120px 40px; background: var(--navy-dark); }
    .flow-container { max-width: 1200px; margin: 0 auto; }
    .flow-header { margin-bottom: 60px; color: var(--white); }
    .flow-num { font-family: 'Playfair Display', serif; font-size: 48px; color: rgba(255, 255, 255, 0.1); line-height: 1; }
    .flow-header h2 { font-size: 14px; letter-spacing: 4px; color: var(--gold); text-transform: uppercase; margin: 10px 0; font-family: 'Syne', sans-serif; font-weight: 600; }
    
    [lang="ar"] .flow-header h2 { font-family: var(--font-arabic); font-weight: 700; letter-spacing: 0; }
    [lang="ar"] .flow-subtitle { font-family: var(--font-arabic); font-weight: 700; }

    .flow-subtitle { font-size: clamp(32px, 5vw, 48px); margin: 0; font-family: 'Playfair Display', serif; }
    .flow-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
    .flow-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(200, 169, 126, 0.15); border-radius: 12px; padding: 32px; position: relative; transition: all 0.3s; color: var(--white); }
    .flow-card:hover { border-color: var(--gold); background: rgba(255, 255, 255, 0.05); transform: translateY(-5px); }

    [lang="ar"] .flow-card { text-align: right; }
    [lang="ar"] .flow-card h3, [lang="ar"] .flow-step-num, [lang="ar"] .flow-tools { font-family: var(--font-arabic); letter-spacing: 0; }
    [lang="ar"] .flow-card p { font-family: var(--font-arabic); }

    .flow-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; margin-bottom: 30px; }
    .icon-circle { border-radius: 50%; background-color: var(--gold); }
    .icon-square { border-radius: 4px; background-color: var(--gold); }
    .icon-triangle { width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid transparent; border-bottom: 35px solid var(--gold); }
    .icon-diamond { transform: rotate(45deg); border-radius: 4px; margin-bottom: 30px; background-color: var(--gold); }

    .flow-step-num { font-size: 11px; color: var(--gold); letter-spacing: 2px; text-transform: uppercase; font-weight: 600; margin-bottom: 8px; }
    .flow-card h3 { font-size: 24px; margin: 0 0 16px 0; text-transform: uppercase; font-family: 'Playfair Display', serif; }
    .flow-card p { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 30px; }
    .flow-tools { font-size: 11px; color: rgba(255,255,255,0.4); border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; }

    @media (max-width: 900px) {
        .flow-section { padding: 80px 20px; }
        .flow-header { margin-bottom: 40px; }
        .flow-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .flow-card { padding: 20px; }
        .flow-card h3 { font-size: 18px; margin-bottom: 10px; }
        .flow-card p { font-size: 13px; margin-bottom: 16px; }
        .flow-icon { width: 30px; height: 30px; margin-bottom: 16px; }
        .flow-step-num { font-size: 10px; }
    }

    @media (max-width: 480px) {
        .flow-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .flow-card { padding: 14px; }
        .flow-card h3 { font-size: 14px; margin-bottom: 8px; }
        .flow-card p { font-size: 11px; line-height: 1.5; margin-bottom: 12px; }
        .flow-icon { width: 24px; height: 24px; margin-bottom: 12px; }
        .flow-step-num { font-size: 9px; letter-spacing: 1px; }
        .flow-tools { font-size: 9px; padding-top: 10px; }
    }
  `]
})
export class ProcessFlowComponent implements AfterViewInit {
  @ViewChildren('flowCard') flowCards!: QueryList<ElementRef>;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
        gsap.registerPlugin(ScrollTrigger);
    }
  }

  steps = [
    { num: 1, key: 'step1', iconClass: 'icon-circle' },
    { num: 2, key: 'step2', iconClass: 'icon-square' },
    { num: 3, key: 'step3', iconClass: 'icon-triangle' },
    { num: 4, key: 'step4', iconClass: 'icon-diamond' }
  ];

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        if (!this.flowCards?.length) return;
        const cards = this.flowCards.map(c => c.nativeElement);
        gsap.set(cards, { autoAlpha: 0, y: 50 });
        gsap.to(cards, {
          scrollTrigger: {
            trigger: '#process',
            start: 'top 85%',
            toggleActions: 'play reverse play reverse'
          },
          duration: 1.2,
          y: 0,
          autoAlpha: 1,
          stagger: 0.3,
          ease: 'power3.out'
        });
      }, 100);
    }
  }
}
