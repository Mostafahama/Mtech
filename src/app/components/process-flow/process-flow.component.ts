import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-process-flow',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="flow-section" id="process">
        <div class="flow-container">
            <div class="flow-header">
                <div class="flow-num">04</div>
                <h2>Our Process</h2>
                <h3 class="flow-subtitle serif-font">From Vision to Unified Impact.</h3>
            </div>
            <div class="flow-grid">
                <div class="flow-card" *ngFor="let step of steps" #flowCard>
                    <div class="flow-icon" [ngClass]="step.iconClass"></div>
                    <div class="flow-step-num">Step {{ step.num }}</div>
                    <h3 class="serif-font">{{ step.title }}</h3>
                    <p>{{ step.desc }}</p>
                    <div class="flow-tools">Tools: {{ step.tools }}</div>
                </div>
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
    .flow-subtitle { font-size: clamp(32px, 5vw, 48px); margin: 0; font-family: 'Playfair Display', serif; }
    .flow-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
    .flow-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(200, 169, 126, 0.15); border-radius: 12px; padding: 32px; position: relative; transition: all 0.3s; color: var(--white); }
    .flow-card:hover { border-color: var(--gold); background: rgba(255, 255, 255, 0.05); transform: translateY(-5px); }

    .flow-icon { width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; margin-bottom: 30px; }
    .icon-circle { border-radius: 50%; background-color: var(--gold); }
    .icon-square { border-radius: 4px; background-color: var(--gold); }
    .icon-triangle { width: 0; height: 0; border-left: 20px solid transparent; border-right: 20px solid transparent; border-bottom: 35px solid var(--gold); }
    .icon-diamond { transform: rotate(45deg); border-radius: 4px; margin-bottom: 30px; background-color: var(--gold); }

    .flow-step-num { font-size: 11px; color: var(--gold); letter-spacing: 2px; text-transform: uppercase; font-weight: 600; margin-bottom: 8px; }
    .flow-card h3 { font-size: 24px; margin: 0 0 16px 0; text-transform: uppercase; font-family: 'Playfair Display', serif; }
    .flow-card p { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 30px; }
    .flow-tools { font-size: 11px; color: rgba(255,255,255,0.4); border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; }
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
    { num: 1, title: 'Educate', desc: 'Techno Square trains emerging talent, building a foundation of logic and problem-solving.', tools: 'STEM, Robotics, Logic', iconClass: 'icon-circle' },
    { num: 2, title: 'Develop', desc: 'Code Square employs top talent to build robust software systems and mobile products.', tools: 'Flutter, Cloud, AI', iconClass: 'icon-square' },
    { num: 3, title: 'Market', desc: 'Digital Studio takes the completed products and builds compelling market presence.', tools: 'Ads, Content, Strategy', iconClass: 'icon-triangle' },
    { num: 4, title: 'Deliver', desc: 'Online and M Square platforms distribute knowledge and solutions at scale globally.', tools: 'LMS, Conferences, Reach', iconClass: 'icon-diamond' }
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
