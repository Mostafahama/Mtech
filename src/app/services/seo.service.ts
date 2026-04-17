import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private translate: TranslateService
  ) { }

  /**
   * Initializes the SEO service. Listens to language changes 
   * and updates the meta tags automatically.
   */
  init() {
    this.translate.onLangChange.subscribe(() => {
      this.updateMetaTags();
    });
    
    // Initial update
    this.updateMetaTags();
  }

  private updateMetaTags() {
    this.translate.get('seo').subscribe(translations => {
      if (!translations) return;

      const title = translations.title;
      const description = translations.description;
      const keywords = translations.keywords;
      const ogTitle = translations.og_title;
      const ogDescription = translations.og_description;

      // Basic SEO
      this.titleService.setTitle(title);
      this.metaService.updateTag({ name: 'description', content: description });
      this.metaService.updateTag({ name: 'keywords', content: keywords });

      // Open Graph
      this.metaService.updateTag({ property: 'og:title', content: ogTitle });
      this.metaService.updateTag({ property: 'og:description', content: ogDescription });
      this.metaService.updateTag({ property: 'og:type', content: 'website' });
      
      // Twitter Card (Optional but premium)
      this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.metaService.updateTag({ name: 'twitter:title', content: ogTitle });
      this.metaService.updateTag({ name: 'twitter:description', content: ogDescription });
    });
  }
}
