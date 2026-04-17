import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { gsap } from 'gsap';

interface Planet {
  id: string;
  nameKey: string;
  color: string;
  angle: number;
  distance: number;
  speed: number;
  size: number;
  descriptionKey: string;
  fullNameKey: string;
  year: string;
  stats: Record<string, number>;
  tooltip: string;
  hoverColor: string;
}

interface CentralHub {
  logoPath: string;
  titleKey: string;
  subtitleKey: string;
  color: string;
}

@Component({
  selector: 'app-orbital-system',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './orbital-system.component.html',
  styleUrls: ['./orbital-system.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrbitalSystemComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('orbitalSvg') svgElement!: ElementRef<SVGSVGElement>;
  @ViewChild('orbitalContainer') container!: ElementRef<HTMLDivElement>;

  Math = Math;

  centralHub: CentralHub = {
    logoPath: 'assets/Techno.jpeg',
    titleKey: 'orbital.central.title',
    subtitleKey: 'orbital.central.subtitle',
    color: '#C8A97E'
  };

  planets: Planet[] = [
    {
      id: 'techno',
      nameKey: 'orbital.planets.techno.name',
      color: '#0073FF',
      angle: 0,
      distance: 280,
      speed: 1.2,
      size: 75,
      descriptionKey: 'orbital.planets.techno.desc',
      fullNameKey: 'orbital.planets.techno.name',
      year: '2021',
      stats: { students: 500, certifications: 10 },
      tooltip: 'T',
      hoverColor: '#0073FF'
    },
    {
      id: 'online',
      nameKey: 'orbital.planets.online.name',
      color: '#00B4CC',
      angle: 72,
      distance: 300,
      speed: 1.0,
      size: 72,
      descriptionKey: 'orbital.planets.online.desc',
      fullNameKey: 'orbital.planets.online.name',
      year: '2023',
      stats: { students: 2000, courses: 15 },
      tooltip: 'O',
      hoverColor: '#00B4CC'
    },
    {
      id: 'code',
      nameKey: 'orbital.planets.code.name',
      color: '#9933FF',
      angle: 144,
      distance: 320,
      speed: 0.85,
      size: 78,
      descriptionKey: 'orbital.planets.code.desc',
      fullNameKey: 'orbital.planets.code.name',
      year: '2019',
      stats: { projects: 30, clients: 100 },
      tooltip: 'C',
      hoverColor: '#9933FF'
    },
    {
      id: 'msquare',
      nameKey: 'orbital.planets.msquare.name',
      color: '#1A3A52',
      angle: 216,
      distance: 340,
      speed: 0.7,
      size: 75,
      descriptionKey: 'orbital.planets.msquare.desc',
      fullNameKey: 'orbital.planets.msquare.name',
      year: '2020',
      stats: { conferences: 50, professionals: 10000 },
      tooltip: 'M',
      hoverColor: '#1A3A52'
    },
    {
      id: 'digital',
      nameKey: 'orbital.planets.digital.name',
      color: '#FF1B6D',
      angle: 288,
      distance: 310,
      speed: 0.95,
      size: 74,
      descriptionKey: 'orbital.planets.digital.desc',
      fullNameKey: 'orbital.planets.digital.name',
      year: '2021',
      stats: { campaigns: 80, impressions: 20000000 },
      tooltip: 'D',
      hoverColor: '#FF1B6D'
    }
  ];

  selectedPlanet: Planet | null = null;
  hoveredPlanetId: string | null = null;

  private animationFrameId: number | null = null;
  private startTime: number = Date.now();

  constructor(public translate: TranslateService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.startEntranceAnimation();
    this.startOrbitalAnimation();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private startEntranceAnimation(): void {
    const timeline = gsap.timeline();
    timeline.from(this.svgElement.nativeElement, { opacity: 0, duration: 0.6 });
    timeline.from(
      this.svgElement.nativeElement.querySelector('.central-hub'),
      { scale: 0, opacity: 0, duration: 0.8, ease: 'elastic.out' },
      0.2
    );
    timeline.from(
      this.svgElement.nativeElement.querySelectorAll('.planet'),
      { scale: 0, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'back.out' },
      0.3
    );
    timeline.from(
      this.svgElement.nativeElement.querySelectorAll('.orbit-path'),
      { opacity: 0, duration: 0.5 },
      0
    );
  }

  private startOrbitalAnimation(): void {
    const animate = () => {
      const now = Date.now();
      const elapsed = (now - this.startTime) / 1000;

      this.planets.forEach((planet) => {
        const rotationPeriod = 50 / planet.speed;
        const angle = (elapsed / rotationPeriod) * 360;
        planet.angle = angle % 360;

        const x = 600 + planet.distance * Math.cos((planet.angle * Math.PI) / 180);
        const y = 600 + planet.distance * Math.sin((planet.angle * Math.PI) / 180);

        const planetElement = this.svgElement.nativeElement.querySelector(
          `g[data-planet="${planet.id}"]`
        );

        if (planetElement) {
          planetElement.setAttribute('data-x', x.toString());
          planetElement.setAttribute('data-y', y.toString());
        }
      });

      const hubRotation = (elapsed / 8) * 360;
      const hub = this.svgElement.nativeElement.querySelector('.central-hub') as HTMLElement | SVGElement | null;
      if (hub) {
        hub.style.transform = `rotate(${hubRotation}deg)`;
        hub.style.transformOrigin = 'center';
      }

      const ring = this.svgElement.nativeElement.querySelector('.rotating-ring') as HTMLElement | SVGElement | null;
      if (ring) {
        ring.style.transform = `rotate(-${hubRotation * 0.8}deg)`;
        ring.style.transformOrigin = 'center';
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  onPlanetHover(planetId: string, event: MouseEvent): void {
    this.hoveredPlanetId = planetId;
    const planetEl = this.svgElement.nativeElement.querySelector(`g[data-planet="${planetId}"]`);
    if (planetEl) {
      gsap.to(planetEl, {
        duration: 0.3,
        filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.7))',
        'transform': 'scale(1.15)',
        'transform-origin': 'center'
      });
    }

    this.planets.forEach((p) => {
      if (p.id !== planetId) {
        const el = this.svgElement.nativeElement.querySelector(`g[data-planet="${p.id}"]`);
        if (el) gsap.to(el, { opacity: 0.4, duration: 0.3 });
      }
    });

    this.showTooltip(planetId, event);
  }

  onPlanetLeave(planetId: string): void {
    this.hoveredPlanetId = null;
    const planetEl = this.svgElement.nativeElement.querySelector(`g[data-planet="${planetId}"]`);
    if (planetEl) {
      gsap.to(planetEl, { duration: 0.3, filter: 'none', 'transform': 'scale(1)' });
    }

    this.planets.forEach((p) => {
      const el = this.svgElement.nativeElement.querySelector(`g[data-planet="${p.id}"]`);
      if (el) gsap.to(el, { opacity: 1, duration: 0.3 });
    });

    const tooltip = this.container.nativeElement.querySelector('.tooltip') as HTMLElement | null;
    if (tooltip) gsap.to(tooltip, { opacity: 0, duration: 0.2, pointerEvents: 'none' });
  }

  onPlanetClick(planet: Planet): void {
    this.selectedPlanet = planet;
    const modal = this.container.nativeElement.querySelector('.info-modal');
    if (modal) {
      gsap.from(modal, { opacity: 0, y: 30, duration: 0.4, ease: 'back.out' });
    }
  }

  closeModal(): void {
    const modal = this.container.nativeElement.querySelector('.info-modal');
    if (modal) {
      gsap.to(modal, {
        opacity: 0,
        y: 30,
        duration: 0.3,
        onComplete: () => {
          this.selectedPlanet = null;
        }
      });
    }
  }

  private showTooltip(planetId: string, event: MouseEvent): void {
    const planet = this.planets.find((p) => p.id === planetId);
    if (!planet) return;

    const tooltip = this.container.nativeElement.querySelector('.tooltip') as HTMLElement | null;
    if (tooltip) {
      this.translate.get(planet.fullNameKey).subscribe(res => {
        tooltip.textContent = res;
      });
      tooltip.style.left = event.clientX + 'px';
      tooltip.style.top = (event.clientY - 30) + 'px';
      gsap.to(tooltip, { opacity: 1, duration: 0.2 });
    }
  }
}
