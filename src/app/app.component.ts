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
    ContactComponent,
    FooterComponent,
    ProcessFlowComponent
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mtech';
}
