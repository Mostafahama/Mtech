import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
        <div class="footer-grid">
            <div>
                <h4>M Tech Square Group</h4>
                <p>Unified innovation ecosystem across education, technology, and healthcare sectors in Egypt.</p>
            </div>
            <div>
                <h4>Explore</h4>
                <ul>
                    <li><a href="#about">The Parent Entity</a></li>
                    <li><a href="#process">Our Process</a></li>
                    <li><a href="#journey">Journey</a></li>
                </ul>
            </div>
            <div>
                <h4>Brands</h4>
                <ul>
                    <li><a href="#techno">Techno Square</a></li>
                    <li><a href="#code">Code Square</a></li>
                    <li><a href="#msquare">M Square</a></li>
                </ul>
            </div>
            <div>
                <h4>Contact</h4>
                <p>info&#64;mtechsquare.com</p>
                <p>Cairo, Egypt</p>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2026 M Tech Square Group. Engineered for excellence.
        </div>
    </footer>
  `,
  styles: [`
    .footer { background: var(--navy); padding: 80px 40px 30px; border-top: 1px solid rgba(200, 169, 126, 0.1); color: var(--white); }
    .footer-grid { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 50px; }
    .footer h4 { color: var(--gold); font-size: 18px; margin-bottom: 20px; font-family: 'Playfair Display', serif; }
    .footer p, .footer a { color: rgba(255,255,255,0.6); font-size: 14px; text-decoration: none; line-height: 1.8; }
    .footer a:hover { color: var(--gold); }
    .footer ul { list-style: none; padding: 0; margin: 0; }
    .footer ul li { margin-bottom: 12px; }
    .footer-bottom { max-width: 1200px; margin: 60px auto 0; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; font-size: 13px; color: rgba(255,255,255,0.4); }
    @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr; gap: 30px; } }
  `]
})
export class FooterComponent {}
