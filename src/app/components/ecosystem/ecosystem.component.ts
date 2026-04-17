import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef,
  HostListener, AfterViewInit, OnDestroy, Inject, PLATFORM_ID
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

/* ──────────────────────────────────────────────
   INTERFACES
   ────────────────────────────────────────────── */

export interface PillarData {
  id: string;
  nameKey1: string;
  nameKey2: string;
  subtitleKey: string;
  taglineKey: string;
  initial: string;
  servicesKey: string;
  integrationKey: string;
  bubblePos: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  cx: number;
  cy: number;
}

interface StarData {
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  delay: number;
}

interface ConnectionPath {
  d: string;
  type: 'center' | 'inter';
}

type ViewportTier = 'mobile' | 'tablet' | 'desktop';

/* ──────────────────────────────────────────────
   CONSTANTS
   ────────────────────────────────────────────── */

const SVG_SIZE = 900;
const CENTER_X = SVG_SIZE / 2;
const CENTER_Y = SVG_SIZE / 2;
const ORBITAL_RADIUS = 280;
const DIAG = 0.707;
const CENTER_PATH_OFFSET = 40;
const INTER_PATH_BOW = 60;

const STAR_COUNTS: Record<ViewportTier, number> = {
  mobile: 60,
  tablet: 120,
  desktop: 180
};

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
  imports: [CommonModule, TranslateModule],
  templateUrl: './ecosystem.component.html',
  styleUrls: ['./ecosystem.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcosystemComponent implements AfterViewInit, OnDestroy {
  private readonly isBrowser: boolean;
  private readonly destroy$ = new Subject<void>();

  private hoveredPillarSubject = new BehaviorSubject<PillarData | null>(null);
  hoveredPillar$ = this.hoveredPillarSubject.asObservable();

  private selectedPillarSubject = new BehaviorSubject<PillarData | null>(null);
  selectedPillar$ = this.selectedPillarSubject.asObservable();

  prefersReducedMotion = false;
  private viewportTierSubject = new BehaviorSubject<ViewportTier>('desktop');

  private readonly positions = {
    topLeft:     { cx: CENTER_X - ORBITAL_RADIUS * DIAG, cy: CENTER_Y - ORBITAL_RADIUS * DIAG },
    topRight:    { cx: CENTER_X + ORBITAL_RADIUS * DIAG, cy: CENTER_Y - ORBITAL_RADIUS * DIAG },
    bottomLeft:  { cx: CENTER_X - ORBITAL_RADIUS * DIAG, cy: CENTER_Y + ORBITAL_RADIUS * DIAG },
    bottomRight: { cx: CENTER_X + ORBITAL_RADIUS * DIAG, cy: CENTER_Y + ORBITAL_RADIUS * DIAG }
  };

  readonly brandsPillars: PillarData[] = [
    {
      id: 'techno',
      nameKey1: 'ecosystem.pillars.techno.nameLine1',
      nameKey2: 'ecosystem.pillars.techno.nameLine2',
      subtitleKey: 'ecosystem.pillars.techno.subtitle',
      taglineKey: 'ecosystem.pillars.techno.tagline',
      initial: 'T',
      servicesKey: 'ecosystem.pillars.techno.services',
      integrationKey: 'ecosystem.pillars.techno.integration',
      bubblePos: 'top-left',
      cx: this.positions.topLeft.cx, cy: this.positions.topLeft.cy
    },
    {
      id: 'code',
      nameKey1: 'ecosystem.pillars.code.nameLine1',
      nameKey2: 'ecosystem.pillars.code.nameLine2',
      subtitleKey: 'ecosystem.pillars.code.subtitle',
      taglineKey: 'ecosystem.pillars.code.tagline',
      initial: 'C',
      servicesKey: 'ecosystem.pillars.code.services',
      integrationKey: 'ecosystem.pillars.code.integration',
      bubblePos: 'top-right',
      cx: this.positions.topRight.cx, cy: this.positions.topRight.cy
    },
    {
      id: 'digital',
      nameKey1: 'ecosystem.pillars.digital.nameLine1',
      nameKey2: 'ecosystem.pillars.digital.nameLine2',
      subtitleKey: 'ecosystem.pillars.digital.subtitle',
      taglineKey: 'ecosystem.pillars.digital.tagline',
      initial: 'D',
      servicesKey: 'ecosystem.pillars.digital.services',
      integrationKey: 'ecosystem.pillars.digital.integration',
      bubblePos: 'bottom-right',
      cx: this.positions.bottomRight.cx, cy: this.positions.bottomRight.cy
    },
    {
      id: 'msquare',
      nameKey1: 'ecosystem.pillars.msquare.nameLine1',
      nameKey2: 'ecosystem.pillars.msquare.nameLine2',
      subtitleKey: 'ecosystem.pillars.msquare.subtitle',
      taglineKey: 'ecosystem.pillars.msquare.tagline',
      initial: 'M',
      servicesKey: 'ecosystem.pillars.msquare.services',
      integrationKey: 'ecosystem.pillars.msquare.integration',
      bubblePos: 'bottom-left',
      cx: this.positions.bottomLeft.cx, cy: this.positions.bottomLeft.cy
    }
  ];

  private readonly allStars: StarData[] = this.generateStars(STAR_COUNTS.desktop);

  responsiveStars$ = this.viewportTierSubject.pipe(
    distinctUntilChanged(),
    map(tier => this.allStars.slice(0, STAR_COUNTS[tier]))
  );

  readonly connectionPaths: ConnectionPath[] = [];
  private cardStyleCache = new Map<string, Record<string, string>>();

  constructor(
    private cdr: ChangeDetectorRef,
    public translate: TranslateService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.buildPaths();
    if (this.isBrowser) {
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.updateViewportTier();
    fromEvent(window, 'resize').pipe(
      debounceTime(300),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.updateViewportTier();
      this.cardStyleCache.clear();
      this.cdr.markForCheck();
    });
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

  onPillarHover(pillar: PillarData | null): void {
    // No-op: hover cards disabled
  }

  onPillarClick(pillar: PillarData): void {
    // Scroll directly to the brand section
    const el = document.getElementById(pillar.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  closeModal(): void {
    if (!this.selectedPillarSubject.value) return;
    this.selectedPillarSubject.next(null);
    this.cdr.markForCheck();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeModal();
  }

  scrollToSection(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      this.closeModal();
    }
  }

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

    const isRtl = this.translate.currentLang === 'ar';

    switch (pillar.bubblePos) {
      case 'top-left':
        translateX = isRtl ? '15%' : '-15%'; translateY = '0';
        top = `${yPct + 10}%`; left = `${xPct - 5}%`;
        break;
      case 'top-right':
        translateX = isRtl ? '85%' : '-85%'; translateY = '0';
        top = `${yPct + 10}%`; left = `${xPct + 5}%`;
        break;
      case 'bottom-left':
        translateX = isRtl ? '15%' : '-15%'; translateY = '-100%';
        top = `${yPct - 10}%`; left = `${xPct - 5}%`;
        break;
      case 'bottom-right':
        translateX = isRtl ? '85%' : '-85%'; translateY = '-100%';
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

  private generateStars(count: number): StarData[] {
    return Array.from({ length: count }, (_, i) => ({
      cx: ((i * 97 + 31) % SVG_SIZE),
      cy: ((i * 53 + 17) % SVG_SIZE),
      r:  0.3 + (((i * 73) % 100) / 100) * 0.8,
      opacity: 0.06 + (((i * 41) % 100) / 100) * 0.18,
      delay: (((i * 67) % 100) / 100) * 8
    }));
  }

  private buildPaths(): void {
    for (const p of this.brandsPillars) {
      const mx = (CENTER_X + p.cx) / 2;
      const my = (CENTER_Y + p.cy) / 2;
      const dx = p.cx - CENTER_X;
      const dy = p.cy - CENTER_Y;
      const len = Math.sqrt(dx * dx + dy * dy);
      const cpx = mx + (-dy / len) * CENTER_PATH_OFFSET;
      const cpy = my + (dx / len) * CENTER_PATH_OFFSET;
      this.connectionPaths.push({
        d: `M ${CENTER_X} ${CENTER_Y} Q ${cpx} ${cpy} ${p.cx} ${p.cy}`,
        type: 'center'
      });
    }
    for (let i = 0; i < this.brandsPillars.length; i++) {
      const a = this.brandsPillars[i];
      const b = this.brandsPillars[(i + 1) % this.brandsPillars.length];
      const mx = (a.cx + b.cx) / 2;
      const my = (a.cy + b.cy) / 2;
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

  private updateViewportTier(): void {
    if (!this.isBrowser) return;
    const w = window.innerWidth;
    const tier: ViewportTier =
      w < BREAKPOINTS.TABLET ? 'mobile' :
      w < BREAKPOINTS.DESKTOP ? 'tablet' : 'desktop';
    this.viewportTierSubject.next(tier);
  }
}
