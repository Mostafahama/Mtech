import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { BrandShowcaseComponent } from './components/brand-showcase/brand-showcase.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { EcosystemComponent } from './components/ecosystem/ecosystem.component';
import { ProcessFlowComponent } from './components/process-flow/process-flow.component';
import { SeoService } from './services/seo.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    TimelineComponent,
    EcosystemComponent,
    BrandShowcaseComponent,
    FooterComponent,
    ProcessFlowComponent
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mtech';

  constructor(
    private translate: TranslateService,
    private seoService: SeoService
  ) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    
    // Initialize SEO
    this.seoService.init();
  }
}
