import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RevealDirective } from '../../shared/reveal.directive';

interface BrandData {
  id: string;
  nameKey: string;
  categoryKey: string;
  descriptionKey: string;
  primaryCTA: {
    labelKey: string;
    action: string;
  };
  secondaryCTA: {
    labelKey: string;
    action: string;
  };
  image?: string;
}

@Component({
  selector: 'app-brand-showcase',
  standalone: true,
  imports: [CommonModule, TranslateModule, RevealDirective],
  templateUrl: './brand-showcase.component.html',
  styleUrls: ['./brand-showcase.component.css']
})
export class BrandShowcaseComponent implements OnInit {
  
  brands: BrandData[] = [
    {
      id: 'techno',
      nameKey: 'brands.pillars.techno.name',
      categoryKey: 'brands.pillars.techno.category',
      descriptionKey: 'brands.pillars.techno.desc',
      primaryCTA: { labelKey: 'brands.pillars.techno.primary', action: '#techno' },
      secondaryCTA: { labelKey: 'brands.pillars.techno.secondary', action: '#techno' },
      image: 'assets/Techno Square.png'
    },
    {
      id: 'online',
      nameKey: 'brands.pillars.online.name',
      categoryKey: 'brands.pillars.online.category',
      descriptionKey: 'brands.pillars.online.desc',
      primaryCTA: { labelKey: 'brands.pillars.online.primary', action: '#online' },
      secondaryCTA: { labelKey: 'brands.pillars.online.secondary', action: '#online' },
      image: 'assets/online_learning_child.png'
    },
    {
      id: 'code',
      nameKey: 'brands.pillars.code.name',
      categoryKey: 'brands.pillars.code.category',
      descriptionKey: 'brands.pillars.code.desc',
      primaryCTA: { labelKey: 'brands.pillars.code.primary', action: '#code' },
      secondaryCTA: { labelKey: 'brands.pillars.code.secondary', action: '#code' },
      image: 'assets/code_square_logo.png'
    },
    {
      id: 'msquare',
      nameKey: 'brands.pillars.msquare.name',
      categoryKey: 'brands.pillars.msquare.category',
      descriptionKey: 'brands.pillars.msquare.desc',
      primaryCTA: { labelKey: 'brands.pillars.msquare.primary', action: '#msquare' },
      secondaryCTA: { labelKey: 'brands.pillars.msquare.secondary', action: '#msquare' },
      image: 'assets/m_square_logo.png'
    },
    {
      id: 'digital',
      nameKey: 'brands.pillars.digital.name',
      categoryKey: 'brands.pillars.digital.category',
      descriptionKey: 'brands.pillars.digital.desc',
      primaryCTA: { labelKey: 'brands.pillars.digital.primary', action: '#digital' },
      secondaryCTA: { labelKey: 'brands.pillars.digital.secondary', action: '#digital' },
      image: 'assets/digital_studio_hero_1774722457394.png'
    }
  ];
  
  activeBrandId: string = 'techno';
  
  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    this.setActiveBrand('techno');
  }
  
  setActiveBrand(brandId: string): void {
    this.activeBrandId = brandId;
    const element = document.getElementById(brandId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  handleCTA(action: string): void {
    // Placeholder for future routing or external links
  }
}
