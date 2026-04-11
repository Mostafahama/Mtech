import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef,
  HostListener, AfterViewInit, OnDestroy, Inject, PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime, map, startWith, distinctUntilChanged } from 'rxjs/operators';

/* ──────────────────────────────────────────────
   INTERFACES
   ────────────────────────────────────────────── */

/** Represents a subsidiary brand in the ecosystem */
export interface PillarData {
  id: string;
  nameLine1: string;
  nameLine2: string;
  subtitle: string;
  tagline: string;
  initial: string;
  services: string[];
  integration: string;
  bubblePos: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  cx: number;
  cy: number;
}

/** Star particle data for background */
interface StarData {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  delay: number;
}

/** Connection path between nodes */
interface ConnectionPath {
  d: string;
  type: 'center' | 'inter';
}

/** Viewport size breakpoints */
type ViewportTier = 'mobile' | 'tablet' | 'desktop';

/* ──────────────────────────────────────────────
   CONSTANTS — No magic numbers
   ────────────────────────────────────────────── */

/** SVG viewBox dimensions */
const SVG_SIZE = 900;

/** Center point of the SVG canvas */
const CENTER_X = SVG_SIZE / 2; // 450
const CENTER_Y = SVG_SIZE / 2; // 450

/** Orbital radius from center to subsidiaries */
const ORBITAL_RADIUS = 280;

/** cos(45°) for diagonal placement */
const DIAG = 0.707;

/** Control point perpendicular offset for center paths */
const CENTER_PATH_OFFSET = 40;

/** Control point outward bow for inter-pillar paths */
const INTER_PATH_BOW = 60;

/** Responsive star counts per viewport tier */
const STAR_COUNTS: Record<ViewportTier, number> = {
  mobile: 60,
  tablet: 120,
  desktop: 180
};

/** Breakpoint widths */
const BREAKPOINTS = {
  TABLET: 768,
  DESKTOP: 1024
};

/* ──────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────── */

@Component({
  selector: 'app-ecosystem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ecosystem.component.html',
  styleUrls: ['./ecosystem.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcosystemComponent implements AfterViewInit, OnDestroy {
  private readonly isBrowser: boolean;
  private readonly destroy$ = new Subject<void>();

  /* ── State Subjects ─────────────────────── */
  private hoveredPillarSubject = new BehaviorSubject<PillarData | null>(null);
  hoveredPillar$ = this.hoveredPillarSubject.asObservable();

  private selectedPillarSubject = new BehaviorSubject<PillarData | null>(null);
  selectedPillar$ = this.selectedPillarSubject.asObservable();

  /** Whether user prefers reduced motion (accessibility) */
  prefersReducedMotion = false;

  /** Current viewport tier for responsive star rendering */
  private viewportTierSubject = new BehaviorSubject<ViewportTier>('desktop');

  /* ── Pillar Positions (pre-computed) ─────── */
  private readonly positions = {
    topLeft:     { cx: CENTER_X - ORBITAL_RADIUS * DIAG, cy: CENTER_Y - ORBITAL_RADIUS * DIAG },
    topRight:    { cx: CENTER_X + ORBITAL_RADIUS * DIAG, cy: CENTER_Y - ORBITAL_RADIUS * DIAG },
    bottomLeft:  { cx: CENTER_X - ORBITAL_RADIUS * DIAG, cy: CENTER_Y + ORBITAL_RADIUS * DIAG },
    bottomRight: { cx: CENTER_X + ORBITAL_RADIUS * DIAG, cy: CENTER_Y + ORBITAL_RADIUS * DIAG }
  };

  /* ── Brand Pillars Data ─────────────────── */
  readonly brandsPillars: PillarData[] = [
    {
      id: 'techno',
      nameLine1: 'TECHNO', nameLine2: 'SQUARE',
      subtitle: 'Education Hub',
      tagline: 'Inspiring the next generation of innovators',
      initial: 'T',
      services: ['STEM & Robotics Programs', 'AI & Machine Learning Courses', 'Techno Gallery Events', 'Tech Conferences & Shows'],
      integration: "Trains emerging talent that directly feeds Code Square's development pipeline.",
      bubblePos: 'top-left',
      cx: this.positions.topLeft.cx, cy: this.positions.topLeft.cy
    },
    {
      id: 'code',
      nameLine1: 'CODE', nameLine2: 'SQUARE',
      subtitle: 'Software Development',
      tagline: 'You imagine — we create',
      initial: 'C',
      services: ['Mobile App Development', 'Enterprise Cloud Solutions', 'AI-Powered Products', 'Full-stack Web Platforms'],
      integration: 'Builds the digital products that Digital Studio markets and distributes.',
      bubblePos: 'top-right',
      cx: this.positions.topRight.cx, cy: this.positions.topRight.cy
    },
    {
      id: 'digital',
      nameLine1: 'DIGITAL', nameLine2: 'STUDIO',
      subtitle: 'Complete Agency',
      tagline: 'Stories worth sharing',
      initial: 'D',
      services: ['360° Digital Branding', 'Performance Marketing', 'Content & Social Strategy', 'Creative Art Direction'],
      integration: 'Amplifies reach for all group companies through premium marketing campaigns.',
      bubblePos: 'bottom-right',
      cx: this.positions.bottomRight.cx, cy: this.positions.bottomRight.cy
    },
    {
      id: 'msquare',
      nameLine1: 'M', nameLine2: 'SQUARE',
      subtitle: 'Media & Events',
      tagline: 'Events that matter',
      initial: 'M',
      services: ['Medical Conferences', 'Event Production', 'Cinematic Coverage', 'Visual Storytelling'],
      integration: "Delivers large-scale events and media that showcase the group's expertise.",
      bubblePos: 'bottom-left',
      cx: this.positions.bottomLeft.cx, cy: this.positions.bottomLeft.cy
    }
  ];

  /* ── Stars (responsive count) ───────────── */
  private readonly allStars: StarData[] = this.generateStars(STAR_COUNTS.desktop);

  /** Observable: stars sliced to current viewport tier count */
  responsiveStars$ = this.viewportTierSubject.pipe(
    distinctUntilChanged(),
    map(tier => this.allStars.slice(0, STAR_COUNTS[tier]))
  );

  /* ── Connection Paths (built once) ──────── */
  readonly connectionPaths: ConnectionPath[] = [];

  /* ── Memoized card styles ───────────────── */
  private cardStyleCache = new Map<string, Record<string, string>>();

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.buildPaths();

    // Detect reduced motion preference
    if (this.isBrowser) {
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }

  /* ────────────────────────────────────────────
     LIFECYCLE
     ──────────────────────────────────────────── */

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    // Set initial viewport tier
    this.updateViewportTier();

    // Listen to window resize (debounced 300ms) for responsive star count + card repositioning
    fromEvent(window, 'resize').pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.updateViewportTier();
      this.cardStyleCache.clear(); // Invalidate card position cache on resize
      this.cdr.markForCheck();
    });

    // Listen for reduced motion changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', (e) => {
      this.prefersReducedMotion = e.matches;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /* ────────────────────────────────────────────
     INTERACTIONS
     ──────────────────────────────────────────── */

  /** Show info card on planet hover */
  onPillarHover(pillar: PillarData | null): void {
    this.hoveredPillarSubject.next(pillar);
    this.cdr.markForCheck();
  }

  /** Toggle modal on planet click */
  onPillarClick(pillar: PillarData): void {
    const current = this.selectedPillarSubject.value;
    this.selectedPillarSubject.next(current?.id === pillar.id ? null : pillar);
    this.cdr.markForCheck();
  }

  /** Close the detail modal */
  closeModal(): void {
    if (!this.selectedPillarSubject.value) return;
    this.selectedPillarSubject.next(null);
    this.cdr.markForCheck();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeModal();
  }

  /** Smooth-scroll to a brand section and close modal */
  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      this.closeModal();
    }
  }

  /* ────────────────────────────────────────────
     CARD POSITIONING (memoized)
     ──────────────────────────────────────────── */

  /**
   * Returns absolute position styles for an info card.
   * Results are cached per pillar ID and invalidated on resize.
   */
  getCardStyle(pillar: PillarData): Record<string, string> {
    if (this.cardStyleCache.has(pillar.id)) {
      return this.cardStyleCache.get(pillar.id)!;
    }

    const xPct = (pillar.cx / SVG_SIZE) * 100;
    const yPct = (pillar.cy / SVG_SIZE) * 100;

    let translateX: string;
    let translateY: string;
    let top: string;
    let left: string;

    switch (pillar.bubblePos) {
      case 'top-left':
        translateX = '-15%'; translateY = '0';
        top = `${yPct + 10}%`; left = `${xPct - 5}%`;
        break;
      case 'top-right':
        translateX = '-85%'; translateY = '0';
        top = `${yPct + 10}%`; left = `${xPct + 5}%`;
        break;
      case 'bottom-left':
        translateX = '-15%'; translateY = '-100%';
        top = `${yPct - 10}%`; left = `${xPct - 5}%`;
        break;
      case 'bottom-right':
        translateX = '-85%'; translateY = '-100%';
        top = `${yPct - 10}%`; left = `${xPct + 5}%`;
        break;
    }

    const style: Record<string, string> = {
      position: 'absolute',
      top, left,
      transform: `translate(${translateX}, ${translateY})`,
      'z-index': '50'
    };

    this.cardStyleCache.set(pillar.id, style);
    return style;
  }

  /* ────────────────────────────────────────────
     PRIVATE HELPERS
     ──────────────────────────────────────────── */

  /** Generate deterministic star positions */
  private generateStars(count: number): StarData[] {
    return Array.from({ length: count }, (_, i) => ({
      cx: ((i * 97 + 31) % SVG_SIZE),
      cy: ((i * 53 + 17) % SVG_SIZE),
      r:  0.3 + (((i * 73) % 100) / 100) * 0.8,
      opacity: 0.06 + (((i * 41) % 100) / 100) * 0.18,
      delay: (((i * 67) % 100) / 100) * 8
    }));
  }

  /** Build Bézier connection paths between center↔pillars and pillars↔pillars */
  private buildPaths(): void {
    // Center-to-pillar curved paths
    for (const p of this.brandsPillars) {
      const mx = (CENTER_X + p.cx) / 2;
      const my = (CENTER_Y + p.cy) / 2;
      const dx = p.cx - CENTER_X;
      const dy = p.cy - CENTER_Y;
      const len = Math.sqrt(dx * dx + dy * dy);
      // Perpendicular offset for subtle curve
      const cpx = mx + (-dy / len) * CENTER_PATH_OFFSET;
      const cpy = my + (dx / len) * CENTER_PATH_OFFSET;

      this.connectionPaths.push({
        d: `M ${CENTER_X} ${CENTER_Y} Q ${cpx} ${cpy} ${p.cx} ${p.cy}`,
        type: 'center'
      });
    }

    // Inter-pillar paths (adjacent subsidiaries)
    for (let i = 0; i < this.brandsPillars.length; i++) {
      const a = this.brandsPillars[i];
      const b = this.brandsPillars[(i + 1) % this.brandsPillars.length];
      const mx = (a.cx + b.cx) / 2;
      const my = (a.cy + b.cy) / 2;
      // Bow the control point outward from center
      const dx = mx - CENTER_X;
      const dy = my - CENTER_Y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const cpx = mx + (dx / len) * INTER_PATH_BOW;
      const cpy = my + (dy / len) * INTER_PATH_BOW;

      this.connectionPaths.push({
        d: `M ${a.cx} ${a.cy} Q ${cpx} ${cpy} ${b.cx} ${b.cy}`,
        type: 'inter'
      });
    }
  }

  /** Determine viewport tier from current window width */
  private updateViewportTier(): void {
    if (!this.isBrowser) return;
    const w = window.innerWidth;
    const tier: ViewportTier =
      w < BREAKPOINTS.TABLET ? 'mobile' :
      w < BREAKPOINTS.DESKTOP ? 'tablet' : 'desktop';
    this.viewportTierSubject.next(tier);
  }
}
