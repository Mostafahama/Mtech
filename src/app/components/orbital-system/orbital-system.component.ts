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
import { gsap } from 'gsap';

interface Planet {
  id: string;
  name: string;
  color: string;
  angle: number;
  distance: number;
  speed: number;
  size: number;
  description: string;
  fullName: string;
  year: string;
  stats: Record<string, number>;
  tooltip: string;
  hoverColor: string;
}

interface CentralHub {
  logoPath: string;
  title: string;
  subtitle: string;
  color: string;
}

@Component({
  selector: 'app-orbital-system',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orbital-system.component.html',
  styleUrls: ['./orbital-system.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrbitalSystemComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('orbitalSvg') svgElement!: ElementRef<SVGSVGElement>;
  @ViewChild('orbitalContainer') container!: ElementRef<HTMLDivElement>;

  Math = Math;

  // ===== DATA =====

  centralHub: CentralHub = {
    logoPath: 'assets/Techno.jpeg',  // M Tech logo
    title: 'M TECH SQUARE',
    subtitle: 'Unified Ecosystem',
    color: '#C8A97E'
  };

  planets: Planet[] = [
    {
      id: 'techno',
      name: 'Techno Square',
      color: '#0073FF',
      angle: 0,
      distance: 280,
      speed: 1.2,
      size: 75,
      description: 'Education & Innovation',
      fullName: 'Techno Square',
      year: '2021',
      stats: { students: 500, certifications: 10 },
      tooltip: 'T',
      hoverColor: '#0073FF'
    },
    {
      id: 'online',
      name: 'Online Platform',
      color: '#00B4CC',
      angle: 72,
      distance: 300,
      speed: 1.0,
      size: 72,
      description: 'Global E-Learning',
      fullName: 'Online Platform',
      year: '2023',
      stats: { students: 2000, courses: 15 },
      tooltip: 'O',
      hoverColor: '#00B4CC'
    },
    {
      id: 'code',
      name: 'Code Square',
      color: '#9933FF',
      angle: 144,
      distance: 320,
      speed: 0.85,
      size: 78,
      description: 'Software Development',
      fullName: 'Code Square',
      year: '2019',
      stats: { projects: 30, clients: 100 },
      tooltip: 'C',
      hoverColor: '#9933FF'
    },
    {
      id: 'msquare',
      name: 'M Square',
      color: '#1A3A52',
      angle: 216,
      distance: 340,
      speed: 0.7,
      size: 75,
      description: 'Medical Conferences',
      fullName: 'M Square',
      year: '2020',
      stats: { conferences: 50, professionals: 10000 },
      tooltip: 'M',
      hoverColor: '#1A3A52'
    },
    {
      id: 'digital',
      name: 'Digital Studio',
      color: '#FF1B6D',
      angle: 288,
      distance: 310,
      speed: 0.95,
      size: 74,
      description: 'Digital Marketing',
      fullName: 'Digital Studio',
      year: '2021',
      stats: { campaigns: 80, impressions: 20000000 },
      tooltip: 'D',
      hoverColor: '#FF1B6D'
    }
  ];

  // ===== STATE =====

  selectedPlanet: Planet | null = null;
  hoveredPlanetId: string | null = null;

  private animationFrameId: number | null = null;
  private startTime: number = Date.now();
  private lastFrameTime: number = 0;

  // ===== LIFECYCLE =====

  ngOnInit(): void {
    // Initialize empty
  }

  ngAfterViewInit(): void {
    // Start entrance animation
    this.startEntranceAnimation();
    // Start orbital animation
    this.startOrbitalAnimation();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  // ===== ANIMATIONS =====

  private startEntranceAnimation(): void {
    const timeline = gsap.timeline();

    // Fade in SVG background
    timeline.from(this.svgElement.nativeElement, {
      opacity: 0,
      duration: 0.6
    });

    // Scale in central hub
    timeline.from(
      this.svgElement.nativeElement.querySelector('.central-hub'),
      {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'elastic.out'
      },
      0.2
    );

    // Fade in planets with stagger
    timeline.from(
      this.svgElement.nativeElement.querySelectorAll('.planet'),
      {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out'
      },
      0.3
    );

    // Fade in orbit paths
    timeline.from(
      this.svgElement.nativeElement.querySelectorAll('.orbit-path'),
      {
        opacity: 0,
        duration: 0.5
      },
      0
    );
  }

  private startOrbitalAnimation(): void {
    const animate = () => {
      const now = Date.now();
      const elapsed = (now - this.startTime) / 1000; // Convert to seconds

      // Update planet positions
      this.planets.forEach((planet) => {
        // Calculate new angle: Full rotation every (50 / speed) seconds
        const rotationPeriod = 50 / planet.speed;
        const angle = (elapsed / rotationPeriod) * 360;
        planet.angle = angle % 360;

        // Update SVG element position
        const x = 600 + planet.distance * Math.cos((planet.angle * Math.PI) / 180);
        const y = 600 + planet.distance * Math.sin((planet.angle * Math.PI) / 180);

        const planetElement = this.svgElement.nativeElement.querySelector(
          `g[data-planet="${planet.id}"]`
        );

        if (planetElement) {
          // Store positions for template binding
          planetElement.setAttribute('data-x', x.toString());
          planetElement.setAttribute('data-y', y.toString());
        }
      });

      // Rotate central hub
      const hubRotation = (elapsed / 8) * 360; // 8-second full rotation
      const hub = this.svgElement.nativeElement.querySelector('.central-hub') as HTMLElement | SVGElement | null;
      if (hub) {
        hub.style.transform = `rotate(${hubRotation}deg)`;
        hub.style.transformOrigin = 'center';
      }

      // Rotate outer ring
      const ring = this.svgElement.nativeElement.querySelector('.rotating-ring') as HTMLElement | SVGElement | null;
      if (ring) {
        ring.style.transform = `rotate(-${hubRotation * 0.8}deg)`;
        ring.style.transformOrigin = 'center';
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  // ===== INTERACTIONS =====

  onPlanetHover(planetId: string, event: MouseEvent): void {
    this.hoveredPlanetId = planetId;

    // Highlight this planet
    const planetEl = this.svgElement.nativeElement.querySelector(
      `g[data-planet="${planetId}"]`
    );

    if (planetEl) {
      gsap.to(planetEl, {
        duration: 0.3,
        filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.7))',
        'transform': 'scale(1.15)',
        'transform-origin': 'center'
      });
    }

    // Dim others
    this.planets.forEach((p) => {
      if (p.id !== planetId) {
        const el = this.svgElement.nativeElement.querySelector(
          `g[data-planet="${p.id}"]`
        );
        if (el) {
          gsap.to(el, { opacity: 0.4, duration: 0.3 });
        }
      }
    });

    // Show tooltip
    this.showTooltip(planetId, event);
  }

  onPlanetLeave(planetId: string): void {
    this.hoveredPlanetId = null;

    // Reset this planet
    const planetEl = this.svgElement.nativeElement.querySelector(
      `g[data-planet="${planetId}"]`
    );

    if (planetEl) {
      gsap.to(planetEl, {
        duration: 0.3,
        filter: 'none',
        'transform': 'scale(1)'
      });
    }

    // Restore others
    this.planets.forEach((p) => {
      const el = this.svgElement.nativeElement.querySelector(
        `g[data-planet="${p.id}"]`
      );
      if (el) {
        gsap.to(el, { opacity: 1, duration: 0.3 });
      }
    });

    // Hide tooltip
    const tooltip = this.container.nativeElement.querySelector('.tooltip') as HTMLElement | null;
    if (tooltip) {
      gsap.to(tooltip, { opacity: 0, duration: 0.2, pointerEvents: 'none' });
    }
  }

  onPlanetClick(planet: Planet): void {
    this.selectedPlanet = planet;

    // Show modal
    const modal = this.container.nativeElement.querySelector('.info-modal');
    if (modal) {
      gsap.from(modal, {
        opacity: 0,
        y: 30,
        duration: 0.4,
        ease: 'back.out'
      });
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
      tooltip.textContent = planet.fullName;
      tooltip.style.left = event.clientX + 'px';
      tooltip.style.top = (event.clientY - 30) + 'px';

      gsap.to(tooltip, { opacity: 1, duration: 0.2 });
    }
  }
}
