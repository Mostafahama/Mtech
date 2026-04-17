import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <footer class="footer">
        <div class="footer-grid">
            <div class="footer-col">
                <h4 class="serif-font">{{ 'footer.about_title' | translate }}</h4>
                <p>{{ 'footer.about_desc' | translate }}</p>
            </div>
            <div class="footer-col">
                <h4 class="serif-font">{{ 'footer.explore_title' | translate }}</h4>
                <ul>
                    <li><a href="#about">{{ 'footer.explore_about' | translate }}</a></li>
                    <li><a href="#process">{{ 'footer.explore_process' | translate }}</a></li>
                    <li><a href="#journey">{{ 'footer.explore_journey' | translate }}</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4 class="serif-font">{{ 'footer.brands_title' | translate }}</h4>
                <ul>
                    <li><a href="#techno">{{ 'brands.pillars.techno.name' | translate }}</a></li>
                    <li><a href="#code">{{ 'brands.pillars.code.name' | translate }}</a></li>
                    <li><a href="#msquare">{{ 'brands.pillars.msquare.name' | translate }}</a></li>
                    <li><a href="#digital">{{ 'brands.pillars.digital.name' | translate }}</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4 class="serif-font">{{ 'footer.contact_title' | translate }}</h4>
                <p>info&#64;mtechsquare.com</p>
                <p>{{ 'footer.contact_location' | translate }}</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>{{ 'footer.bottom_text' | translate }}</p>
        </div>
    </footer>
  `,
  styles: [`
    .footer { 
        background: var(--navy); 
        padding: 80px 40px calc(30px + env(safe-area-inset-bottom)); 
        border-top: 1px solid rgba(200, 169, 126, 0.1); 
        color: var(--white); 
    }
    .footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 50px; }
    
    .footer h4 { color: var(--gold); font-size: 18px; margin-bottom: 20px; font-family: 'Playfair Display', serif; }
    
    [lang="ar"] .footer h4 { font-family: var(--font-arabic); font-weight: 700; letter-spacing: 0; }
    [lang="ar"] .footer p, [lang="ar"] .footer a, [lang="ar"] .footer-bottom { font-family: var(--font-arabic); text-align: center; }
    [lang="ar"] .footer-bottom { text-align: center; }

    .footer p, .footer a { color: rgba(255,255,255,0.6); font-size: 14px; text-decoration: none; line-height: 1.8; }
    .footer a:hover { color: var(--gold); }
    .footer ul { list-style: none; padding: 0; margin: 0; }
    .footer ul li { margin-bottom: 12px; }
    .footer-bottom { 
        max-width: 1200px; 
        margin: 60px auto 0; 
        padding-top: 30px; 
        border-top: 1px solid rgba(255,255,255,0.1); 
        text-align: center; 
        font-size: 13px; 
        color: rgba(255,255,255,0.4); 
    }
    
    @media (max-width: 900px) { 
        .footer { padding: 50px 20px calc(20px + env(safe-area-inset-bottom)); }
        .footer-grid { grid-template-columns: 1fr 1fr; gap: 30px; } 
        [lang="ar"] .footer-col { text-align: center; }
    }
    @media (max-width: 480px) {
        .footer-grid { grid-template-columns: 1fr 1fr; gap: 20px; }
        .footer h4 { font-size: 15px; margin-bottom: 12px; }
        .footer p, .footer a { font-size: 12px; }
        .footer-bottom { font-size: 11px; margin-top: 30px; padding-top: 16px; }
    }
  `]
})
export class FooterComponent {}
