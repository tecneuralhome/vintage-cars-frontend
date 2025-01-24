import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFadeUp]',
  standalone: true,
})
export class FadeUpDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Check if the element is in the viewport
  private isInViewport(): boolean {
    const rect = this.el.nativeElement.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.isInViewport()) {
      this.renderer.addClass(this.el.nativeElement, 'show');
    }
  }
}
