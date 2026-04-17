import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import gsap from 'gsap';

class Particle {
  x: number; y: number; vx: number; vy: number; radius: number; opacity: number; color: string;
  constructor(private canvasWidth: number, private canvasHeight: number, private ctx: CanvasRenderingContext2D) {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.radius = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = `rgba(200, 169, 126, ${this.opacity})`;
  }
  draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
  }
  update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x + this.radius > this.canvasWidth || this.x - this.radius < 0) this.vx = -this.vx;
      if (this.y + this.radius > this.canvasHeight || this.y - this.radius < 0) this.vy = -this.vy;
      this.draw();
  }
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <section class="hero" id="home" aria-label="Hero Spotlight">
        <div class="hero-bg">
            <canvas #heroCanvas></canvas>
        </div>
        <div class="hero-content">
            <div class="hero-badge" #heroBadge>
                <img src="assets/m_tech_square_logo_updated.png" 
                     alt="M Tech Square Group Central Logo"
                     width="240" height="240"
                     fetchPriority="high">
            </div>
            <div class="heading-glow"></div>
            <div class="hero-text-block">
                <h1 class="hero-title serif-font" #heroTitle [innerHTML]="'hero.title' | translate"></h1>
                <p class="hero-desc" #heroDesc>{{ 'hero.desc' | translate }}</p>
                <div class="hero-logos" #heroLogos>
                    <img src="assets/Asset 3.svg" alt="Code Square Branding" class="logo-item" width="120" height="40">
                    <img src="assets/Digital logo.png" alt="Digital Studio Branding" class="logo-item" width="120" height="100">
                    <img src="assets/landscape logo white.png" alt="Techno Square Branding" class="logo-item" width="120" height="40">
                    <img src="assets/msquare_finalwhite.svg" alt="M Square Branding" class="logo-item" width="120" height="40">
                </div>
            </div>
        </div>
    </section>
  `,
  styles: [`
    .hero { position: relative; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; background: var(--navy); }
    .hero-bg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at center, var(--navy) 0%, var(--navy-deep) 90%); z-index: 1; }
    canvas { display: block; width: 100%; height: 100%; }
    .hero-content { 
        position: relative; z-index: 10; text-align: center; 
        max-width: 900px; padding: 0 40px; 
        display: flex; flex-direction: column; align-items: center;
        transform: translateY(35px);
    }

    .hero-badge {
        width: clamp(160px, 18vw, 240px); 
        height: clamp(160px, 18vw, 240px);
        display: flex; align-items: center; justify-content: center;
        margin-top: 30px;
        margin-bottom: 0px; opacity: 0;
        filter: drop-shadow(0 0 25px rgba(213, 177, 130, 0.4));
    }
    .hero-badge img { width: 100%; height: 100%; object-fit: contain; }

    .hero-text-block { 
        margin-top: -10px; 
        display: flex; flex-direction: column; align-items: center; 
    }

    .heading-glow {
        position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%);
        width: 600px; height: 300px;
        background: radial-gradient(ellipse at center, rgba(200, 169, 126, 0.06) 0%, transparent 70%);
        pointer-events: none; z-index: -1;
    }

    .hero-title {
        font-size: clamp(48px, 9vw, 108px); margin: 0 0 5px 0;
        letter-spacing: 4px; line-height: 1.1;
        text-transform: uppercase; font-family: 'Playfair Display', serif;
        font-weight: 700; opacity: 0; color: var(--white);
    }

    [lang="ar"] .hero-title {
        font-family: var(--font-arabic);
        letter-spacing: 0;
        line-height: 1.2;
    }

    .hero-desc {
        font-size: clamp(15px, 2vw, 19px);
        color: rgba(255, 255, 255, 0.8);
        margin: 0 0 0px 0; line-height: 1.85;
        max-width: 680px; opacity: 0;
        letter-spacing: 0.3px; font-weight: 400;
    }

    .hero-logos { 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        gap: 3rem;
        margin-top: 20px;
        flex-wrap: wrap; 
        width: 100%; 
        max-width: 1000px;
    }
    .logo-item { 
        height: 32px; 
        width: auto;
        max-width: 140px;
        object-fit: contain;
        opacity: 0;
        transition: opacity 0.3s ease, filter 0.3s ease;
    }
    .logo-item:hover {
        opacity: 1;
        transform: translateY(-4px);
    }

    .logo-item:nth-child(n) { height: 32px; } 
    /* Digital Studio has large internal margins, needs extra scaling to match landscape logos */
    .logo-item:nth-child(2) { height: 180px; max-width: 250px; transform: scale(1.1); } 

    @media (max-width: 1024px) {
        .hero-logos { gap: 2rem; }
        .logo-item { height: 32px; }
        .logo-item:nth-child(2) { height: 130px; max-width: 180px; }
    }
    @media (max-width: 640px) {
        .hero-content { padding: 0 20px; }
        .hero-badge { width: clamp(100px, 25vw, 160px); height: clamp(100px, 25vw, 160px); margin-top: 20px; }
        .hero-title { font-size: clamp(34px, 12vw, 60px); letter-spacing: 1px; }
        .hero-desc { font-size: 13px; line-height: 1.6; padding: 0 15px; width: 100%; max-width: 100%; box-sizing: border-box; }
        .hero-logos { gap: 1rem; margin-top: 24px; flex-wrap: wrap; width: 100%; justify-content: center; padding: 0 16px; box-sizing: border-box; }
        .logo-item { height: 15px; min-width: 0; flex-shrink: 0; max-width: 45%; }
        .logo-item:nth-child(2) { height: 65px; max-width: 60%; }
    }
    @media (max-width: 400px) {
        .hero-title { font-size: clamp(28px, 10vw, 42px); }
        .hero-logos { gap: 0.8rem; padding: 0 10px; }
        .logo-item { height: 13px; }
        .logo-item:nth-child(2) { height: 52px; }
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroBadge') badge!: ElementRef;
  @ViewChild('heroTitle') title!: ElementRef;
  @ViewChild('heroDesc') desc!: ElementRef;
  @ViewChild('heroLogos') logosContainer!: ElementRef;

  private ctx!: CanvasRenderingContext2D | null;
  private particles: Particle[] = [];
  private animationFrameId: number | null = null;
  private heroTimeline: gsap.core.Timeline | null = null;
  private initialized = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (!this.isBrowser || this.initialized) return;
    this.initialized = true;

    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    if (this.ctx) {
      this.resizeCanvas();
      for (let i = 0; i < 60; i++) {
        this.particles.push(new Particle(canvas.width, canvas.height, this.ctx));
      }
      this.animateParticles();
    }

    this.heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    gsap.set(this.badge.nativeElement, { scale: 0.8, autoAlpha: 0, y: 40 });
    gsap.set(this.title.nativeElement, { y: 40, autoAlpha: 0 });
    gsap.set(this.desc.nativeElement, { y: 25, autoAlpha: 0 });
    
    const logos = this.logosContainer.nativeElement.querySelectorAll('img');
    gsap.set(logos, { x: -20, autoAlpha: 0 });

    this.heroTimeline
      .to(this.badge.nativeElement, { duration: 1.2, scale: 1, autoAlpha: 1, y: 0, ease: "back.out(1.2)" })
      .to(this.title.nativeElement, { duration: 1, y: 0, autoAlpha: 1 }, "-=0.4")
      .to(this.desc.nativeElement, { duration: 0.9, y: 0, autoAlpha: 1 }, "-=0.5")
      .to(logos, { duration: 0.8, x: 0, autoAlpha: 1, stagger: 0.15, ease: "power2.out" }, "-=0.3");
  }

  ngOnDestroy() {
    if (this.heroTimeline) { this.heroTimeline.kill(); this.heroTimeline = null; }
    if (this.animationFrameId !== null) { cancelAnimationFrame(this.animationFrameId); this.animationFrameId = null; }
    this.particles = [];
    this.ctx = null;
  }

  @HostListener('window:resize') resizeCanvas() {
    if (this.isBrowser && this.canvasRef) {
      this.canvasRef.nativeElement.width = window.innerWidth;
      this.canvasRef.nativeElement.height = window.innerHeight;
    }
  }

  animateParticles = () => {
    if (!this.ctx || !this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.particles.forEach(p => p.update());
    this.animationFrameId = requestAnimationFrame(this.animateParticles);
  };
}
