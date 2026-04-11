import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
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
  imports: [CommonModule],
  template: `
    <section class="hero" id="home">
        <div class="hero-bg">
            <canvas #heroCanvas></canvas>
        </div>
        <div class="hero-content">
            <div class="hero-badge" #heroBadge>
                <img src="assets/m_tech_square_logo_updated.png" alt="Badge">
            </div>
            <!-- Subtle radial glow behind the heading -->
            <div class="heading-glow"></div>
            <div class="hero-text-block">
                <h1 class="hero-title serif-font" #heroTitle>BEYOND<br>SQUARES</h1>
                <p class="hero-desc" #heroDesc>Driving the future of Egyptian innovation through a unified ecosystem of technology, classroom motivation, and medical excellence.</p>
                <div class="hero-logos" #heroLogos>
                    <img src="assets/Asset 3.svg" alt="Code Square" class="logo-item">
                    <img src="assets/Digital logo.png" alt="Digital Studio" class="logo-item">
                    <img src="assets/landscape logo white.png" alt="Techno Square" class="logo-item">
                    <img src="assets/M SQUARE copy new logo-01.png" alt="M Square" class="logo-item">
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
        margin-top: 0; max-width: 900px; padding: 0 40px; 
        display: flex; flex-direction: column; align-items: center;
        /* Balanced vertical positioning, pushing down to avoid navbar */
        transform: translateY(35px);
    }

    /* 2. Logo: No square border, larger, tracing drop-shadow, fade-up */
    .hero-badge {
        width: clamp(160px, 18vw, 240px); 
        height: clamp(160px, 18vw, 240px);
        display: flex; align-items: center; justify-content: center;
        margin-top: 20px; /* Lower the main logo further */
        margin-bottom: 0px; opacity: 0;
        filter: drop-shadow(2px 0 0 var(--gold))
                drop-shadow(0 2px 0 var(--gold))
                drop-shadow(-2px 0 0 var(--gold))
                drop-shadow(0 -2px 0 var(--gold))
                drop-shadow(0 0 25px rgba(213, 177, 130, 0.4));
    }
    .hero-badge img { width: 100%; height: 100%; object-fit: contain; }

    /* Text block spacing */
    .hero-text-block {
        margin-top: 0px; /* Title super tight to badge */
        display: flex; flex-direction: column; align-items: center;
    }

    /* 6. Subtle radial glow behind heading */
    .heading-glow {
        position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%);
        width: 600px; height: 300px;
        background: radial-gradient(ellipse at center, rgba(200, 169, 126, 0.06) 0%, transparent 70%);
        pointer-events: none; z-index: -1;
    }

    /* 1. Heading: reduced ~18%, better line-height & letter-spacing */
    .hero-title {
        font-size: clamp(48px, 9vw, 108px); margin: 0 0 5px 0; /* Tighter gap to description */
        letter-spacing: 4px; line-height: 1.1;
        text-transform: uppercase; font-family: 'Playfair Display', serif;
        font-weight: 700; opacity: 0; color: var(--white);
    }

    /* 3 & 4. Subheading: lighter weight, wider spacing, brighter */
    .hero-desc {
        font-size: clamp(15px, 2vw, 19px);
        color: rgba(255, 255, 255, 0.8);
        margin: 0 0 5px 0; line-height: 1.85; /* Brought logos extremely close */
        max-width: 680px; opacity: 0;
        letter-spacing: 0.3px; font-weight: 400;
    }

    /* ── Logos row: visual-area matching ── */
    .hero-logos { 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        gap: 4.5rem; /* Increased gap for a more elegant, uncrowded look */
        margin-top: -10px; /* Pull the logos up significantly */
        flex-wrap: wrap; 
        width: 100%; 
        max-width: 1000px; /* Slightly wider to accommodate increased gap */
    }
    /* Wide logos (Code Square ~3:1, Techno Square ~3:1) */
    .logo-item { 
        height: 40px; /* Very slightly smaller base height for premium feel */
        width: auto;
        object-fit: contain;
        opacity: 0;
        filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));
        transition: opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease;
    }
    .logo-item:hover {
        opacity: 1;
        transform: translateY(-4px);
        filter: drop-shadow(0 8px 16px rgba(213, 177, 130, 0.5));
    }
    /* Square logos: image files contain internal padding, so need 
       even larger heights to match visual weight of wide logos */
    .logo-item:nth-child(2) { height: 125px; } /* Digital Studio */
    .logo-item:nth-child(4) { height: 160px; } /* M Square - has more padding */

    /* ── TABLET ── */
    @media (max-width: 1024px) {
        .hero-logos { gap: 2rem; }
        .logo-item { height: 45px; }
        .logo-item:nth-child(2) { height: 100px; }
        .logo-item:nth-child(4) { height: 115px; }
    }
    /* ── MOBILE ── */
    @media (max-width: 640px) {
        .hero-logos { gap: 1.2rem; }
        .logo-item { height: 35px; }
        .logo-item:nth-child(2) { height: 75px; }
        .logo-item:nth-child(4) { height: 85px; }
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

    // Canvas setup
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d');
    if (this.ctx) {
      this.resizeCanvas();
      for (let i = 0; i < 60; i++) {
        this.particles.push(new Particle(canvas.width, canvas.height, this.ctx));
      }
      this.animateParticles();
    }

    // GSAP Timeline setup — stored for cleanup
    this.heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    gsap.set(this.badge.nativeElement, { scale: 0.8, autoAlpha: 0, y: 40 });
    gsap.set(this.title.nativeElement, { y: 40, autoAlpha: 0 });
    gsap.set(this.desc.nativeElement, { y: 25, autoAlpha: 0 });
    
    // Select all logo images
    const logos = this.logosContainer.nativeElement.querySelectorAll('img');
    gsap.set(logos, { x: -20, autoAlpha: 0 });

    this.heroTimeline
      .to(this.badge.nativeElement, { duration: 1.2, scale: 1, autoAlpha: 1, y: 0, ease: "back.out(1.2)" })
      .to(this.title.nativeElement, { duration: 1, y: 0, autoAlpha: 1 }, "-=0.4")
      .to(this.desc.nativeElement, { duration: 0.9, y: 0, autoAlpha: 1 }, "-=0.5")
      .to(logos, { duration: 0.8, x: 0, autoAlpha: 1, stagger: 0.15, ease: "power2.out" }, "-=0.3");
  }

  ngOnDestroy() {
    // Kill GSAP timeline to prevent memory leaks
    if (this.heroTimeline) {
      this.heroTimeline.kill();
      this.heroTimeline = null;
    }
    // Cancel canvas animation loop
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.particles = [];
    this.ctx = null;
  }

  @HostListener('window:resize')
  resizeCanvas() {
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
