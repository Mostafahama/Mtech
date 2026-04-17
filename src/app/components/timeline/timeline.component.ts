import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="timeline-section" id="journey">
        <div class="tl-header">
            <div style="font-size: 48px; color: rgba(255,255,255,0.05); font-family: 'Playfair Display', serif; line-height: 1; margin-bottom: -15px;">02</div>
            <h2 class="serif-font">{{ 'timeline.header_title' | translate }}</h2>
            <p>{{ 'timeline.header_desc' | translate }}</p>
        </div>
        <div class="tl-container" #timelineContainer>
            <div class="tl-track"></div>
            <div class="tl-fill" #timelineFill></div>
            
            <ul class="tl-items-list" role="list">
                <li class="tl-item" *ngFor="let item of items; let i = index" [style.transitionDelay]="(i * 150) + 'ms'">
                    <div class="tl-node" [attr.aria-hidden]="true"></div>
                    <article class="tl-content" [attr.aria-label]="item + ': ' + ('timeline.items.' + item + '.title' | translate)">
                        <div class="tl-year">{{item}}</div>
                        <h3 class="tl-title serif-font">{{ 'timeline.items.' + item + '.title' | translate }}</h3>
                        <p class="tl-desc">{{ 'timeline.items.' + item + '.desc' | translate }}</p>
                    </article>
                </li>
            </ul>
        </div>
    </section>
  `,
  styles: [`
    .timeline-section { padding: 120px 40px; background: var(--navy-deep); color: var(--navy); position: relative; }
    .tl-items-list { list-style: none; padding: 0; margin: 0; }
    .tl-header { text-align: center; margin-bottom: 80px; }
    .tl-header h2 { font-size: clamp(36px, 5vw, 48px); margin: 0 0 10px 0; color: var(--gold); font-family: 'Playfair Display', serif; }
    
    [lang="ar"] .tl-header h2 { font-family: var(--font-arabic); font-weight: 700; letter-spacing: 0; }
    [lang="ar"] .tl-header p { font-family: var(--font-arabic); }

    .tl-header p { font-size: 16px; color: var(--text-muted); }
    .tl-container { position: relative; max-width: 800px; margin: 0 auto; }
    .tl-track { position: absolute; top: 0; bottom: 0; left: 50%; transform: translateX(-50%); width: 3px; background: rgba(200, 169, 126, 0.1); }
    .tl-fill { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 3px; background: var(--gold); height: 0%; transition: height 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }
    
    .tl-item { position: relative; margin-bottom: 60px; width: 100%; display: flex; align-items: center; justify-content: space-between; }
    .tl-item:nth-child(odd) { flex-direction: row-reverse; }
    
    .tl-node { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 16px; height: 16px; background: var(--navy); border: 3px solid rgba(200, 169, 126, 0.3); border-radius: 50%; z-index: 2; transition: all 0.4s ease; transition-delay: inherit; }
    .tl-node.active { border-color: var(--gold); background: var(--gold); box-shadow: 0 0 20px rgba(200, 169, 126, 0.6); transform: translate(-50%, -50%) scale(1.3); }
    .tl-node.active.pulsed { animation: pulseOnce 0.8s ease-out forwards; }
    
    .tl-content { width: 45%; background: rgba(255, 255, 255, 0.03); padding: 30px; border-radius: 12px; border: 1px solid rgba(200, 169, 126, 0.1); box-shadow: 0 10px 30px rgba(0,0,0,0.5); opacity: 0; transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); transition-delay: inherit; }
    .tl-item:nth-child(even) .tl-content { transform: translateY(40px); }
    .tl-item:nth-child(odd) .tl-content { transform: translateY(40px); }
    .tl-item.visible .tl-content { opacity: 1; transform: translateY(0); }
    
    [lang="ar"] .tl-content { text-align: center; }
    [lang="ar"] .tl-title { font-family: var(--font-arabic); font-weight: 700; letter-spacing: 0; }
    [lang="ar"] .tl-desc, [lang="ar"] .tl-year { font-family: var(--font-arabic); }

    .tl-year { color: var(--gold); font-weight: 800; font-family: 'Syne', sans-serif; font-size: 14px; margin-bottom: 8px; letter-spacing: 2px;}
    .tl-title { font-size: 26px; margin: 0 0 12px 0; font-family: 'Playfair Display', serif; color: var(--white); }
    .tl-desc { font-size: 15px; color: var(--text-muted); line-height: 1.7; margin: 0; }
    
    @keyframes pulseOnce {
        0% { box-shadow: 0 0 0 0 rgba(200, 169, 126, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(200, 169, 126, 0); }
        100% { box-shadow: 0 0 0 0 rgba(200, 169, 126, 0); }
    }

    @media (max-width: 900px) {
        .timeline-section { padding: 80px 20px; }
        .tl-header { margin-bottom: 50px; }
        .tl-item { margin-bottom: 40px; }
        .tl-content { width: 42%; padding: 20px; }
        .tl-title { font-size: 20px; }
        .tl-desc { font-size: 13px; line-height: 1.5; }
        .tl-year { font-size: 12px; }
    }

    @media (max-width: 640px) {
        .timeline-section { padding: 60px 16px; }
        .tl-header { margin-bottom: 40px; }
        .tl-container { max-width: 100%; }
        .tl-item { margin-bottom: 30px; }
        .tl-content { width: 40%; padding: 14px; border-radius: 8px; }
        .tl-title { font-size: 16px; margin-bottom: 6px; }
        .tl-desc { font-size: 11px; line-height: 1.5; }
        .tl-year { font-size: 11px; margin-bottom: 4px; }
        .tl-node { width: 12px; height: 12px; }
    }

    @media (max-width: 400px) {
        .tl-content { width: 38%; padding: 10px; }
        .tl-title { font-size: 14px; }
        .tl-desc { font-size: 10px; }
    }
  `]
})
export class TimelineComponent implements AfterViewInit, OnDestroy {
  @ViewChild('timelineContainer') timelineContainer!: ElementRef;
  @ViewChild('timelineFill') timelineFill!: ElementRef;
  
  private observer!: IntersectionObserver;

  // Use years as keys for translation
  items = ['2022', '2023', '2024', '2025'];

  constructor(public translate: TranslateService) {}

  ngAfterViewInit() {
    if (typeof window === 'undefined') return;

    const itemsElements = this.timelineContainer.nativeElement.querySelectorAll('.tl-item');
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const node = entry.target.querySelector('.tl-node');
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (node) {
                node.classList.add('active');
                node.classList.add('pulsed');
            }
        } else {
            entry.target.classList.remove('visible');
            if (node) {
                node.classList.remove('active');
                node.classList.remove('pulsed');
            }
        }
        this.updateTimelineFill();
      });
    }, { threshold: 0.1, rootMargin: "100px" });

    itemsElements.forEach((el: any) => this.observer.observe(el));
    window.addEventListener('scroll', this.updateTimelineFill.bind(this));
  }
   
  updateTimelineFill() {
    if(!this.timelineContainer || !this.timelineFill || typeof window === 'undefined') return;
    const containerCoords = this.timelineContainer.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (containerCoords.top < windowHeight / 2) {
      let progress = ((windowHeight / 2) - containerCoords.top) / containerCoords.height * 100;
      progress = Math.max(0, Math.min(100, progress));
      this.timelineFill.nativeElement.style.height = progress + '%';
    }
  }

  ngOnDestroy() {
    if (this.observer) this.observer.disconnect();
    if (typeof window !== 'undefined') window.removeEventListener('scroll', this.updateTimelineFill.bind(this));
  }
}
