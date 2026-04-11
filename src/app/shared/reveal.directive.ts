import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() delay: number = 0;
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Optional static delay assignment
    if (this.delay) {
      this.el.nativeElement.style.transitionDelay = `${this.delay}ms`;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('is-visible');
          // Optional: this.observer.unobserve(this.el.nativeElement) for strictly once
        } else {
          // Removes class if going out of bounds to replay animation on re-entry
          this.el.nativeElement.classList.remove('is-visible');
        }
      },
      { threshold: 0.2 } // Trigger when 20% is visible
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
