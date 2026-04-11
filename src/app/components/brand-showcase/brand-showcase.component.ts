import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

interface BrandData {
  id: string;
  name: string;
  category: string;
  description: string;
  primaryCTA: {
    label: string;
    action: string;
  };
  secondaryCTA: {
    label: string;
    action: string;
  };
  image?: string;
  logoArea?: {
    image: string;
    alt: string;
  };
}

@Component({
  selector: 'app-brand-showcase',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './brand-showcase.component.html',
  styleUrls: ['./brand-showcase.component.css']
})
export class BrandShowcaseComponent implements OnInit {
  
  brands: BrandData[] = [
    {
      id: 'techno',
      name: 'Techno Square',
      category: 'EDUCATION ACADEMY',
      description: `Egypt's leading technology institute dedicated to nurturing young minds. 
                    We combine cutting-edge programming education with entrepreneurship training, 
                    preparing children for success in tomorrow's innovation economy.`,
      primaryCTA: { label: 'Join Academy', action: '#techno' },
      secondaryCTA: { label: 'Syllabus', action: '#techno' },
      image: 'assets/Techno Square.png'
    },
    {
      id: 'online',
      name: 'Online',
      category: 'E-LEARNING PLATFORM',
      description: `Advanced e-learning ecosystem providing accessibility to top-tier expertise. 
                    Our platform hosts both live masterclasses and recorded certification paths, 
                    bridging the learning gap.`,
      primaryCTA: { label: 'Start Learning', action: '#online' },
      secondaryCTA: { label: 'Teachers', action: '#online' },
      image: 'assets/online_learning_child.png'
    },
    {
      id: 'code',
      name: 'Code Square',
      category: 'SOFTWARE HOUSE',
      description: `Premium software house delivering bespoke digital solutions. 
                    We specialize in mobile applications, enterprise software, and cloud systems. 
                    Innovation at the core of every line of code.`,
      primaryCTA: { label: 'Start Project', action: '#code' },
      secondaryCTA: { label: 'Portfolio', action: '#code' },
      image: 'assets/code_square_logo.png'
    },
    {
      id: 'msquare',
      name: 'M Square',
      category: 'MEDICAL ACADEMY',
      description: `Medical conference experts, providing high-quality training and events 
                    that bridge medical professionals with global knowledge. 
                    Hosting with internationally certified accreditation.`,
      primaryCTA: { label: 'View Events', action: '#msquare' },
      secondaryCTA: { label: 'Contact', action: '#msquare' },
      image: 'assets/m_square_logo.png'
    },
    {
      id: 'digital',
      name: 'Digital Studio',
      category: 'CREATIVE AGENCY',
      description: `Creative marketing agency blending data-driven strategies with premium design aesthetics. 
                    We build brands that resonate in the digital age, narrating your unique story.`,
      primaryCTA: { label: 'Brand Audit', action: '#digital' },
      secondaryCTA: { label: 'Case Studies', action: '#digital' },
      image: 'assets/digital_studio_hero_1774722457394.png'
    }
  ];
  
  activeBrandId: string = 'techno';
  
  ngOnInit(): void {
    // Set initial active brand
    this.setActiveBrand('techno');
  }
  
  setActiveBrand(brandId: string): void {
    this.activeBrandId = brandId;
    // Optional: Smooth scroll to section
    const element = document.getElementById(brandId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  handleCTA(action: string): void {
    // Simple placeholder action for now since links were placeholders
  }
}
