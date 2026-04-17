import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, RevealDirective],
  template: `
    <section class="contact-section" id="contact" aria-labelledby="contact-title">
        <div class="contact-card reveal" appReveal>
            <!-- Left Column: Contact Info -->
            <div class="contact-info">
                <h2 class="contact-info__title" id="contact-title">{{ 'contact.title' | translate }}</h2>
                <p class="contact-info__desc">{{ 'contact.subtitle' | translate }}</p>
                
                <div class="contact-info__detail">
                    <span class="contact-info__label">{{ 'contact.email_label' | translate }}</span>
                    <span class="contact-info__value">info&#64;mtechsquare.com</span>
                </div>

                <div class="contact-info__detail">
                    <span class="contact-info__label">{{ 'contact.phone_label' | translate }}</span>
                    <span class="contact-info__value">+20 123 456 7890</span>
                </div>

                <div class="contact-info__detail">
                    <span class="contact-info__label">LOCATION</span>
                    <span class="contact-info__value">Cairo, Egypt</span>
                </div>

                <div class="contact-info__socials">
                    <a href="#" class="social-link" aria-label="Facebook" title="Facebook">f</a>
                    <a href="#" class="social-link" aria-label="LinkedIn" title="LinkedIn">in</a>
                    <a href="#" class="social-link" aria-label="Twitter" title="Twitter">tw</a>
                    <a href="#" class="social-link" aria-label="Instagram" title="Instagram">ig</a>
                </div>
            </div>

            <!-- Right Column: Form Fields -->
            <div class="contact-form-container">
                <form class="contact-form" (submit)="$event.preventDefault()">
                    <div class="form-group">
                        <label class="form-label" for="contact-name">{{ 'contact.name_label' | translate }}</label>
                        <input id="contact-name" class="form-input" type="text" [placeholder]="'contact.name_label' | translate" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contact-email">{{ 'contact.email_label' | translate }}</label>
                        <input id="contact-email" class="form-input" type="email" [placeholder]="'contact.email_label' | translate" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contact-subject">{{ 'contact.subject_label' | translate }}</label>
                        <input id="contact-subject" class="form-input" type="text" [placeholder]="'contact.subject_label' | translate" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contact-message">{{ 'contact.message_label' | translate }}</label>
                        <textarea id="contact-message" class="form-textarea" [placeholder]="'contact.message_label' | translate" required></textarea>
                    </div>
                    <button type="submit" class="form-submit-btn">{{ 'contact.submit_btn' | translate }}</button>
                </form>
            </div>
        </div>
    </section>
  `,
  styles: [`
    .contact-section {
        padding: 120px 40px;
        background: #F8F9FA;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .contact-card {
        width: 100%;
        max-width: 1200px;
        display: grid;
        grid-template-columns: 1fr 1.5fr;
        background: var(--white);
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 31, 63, 0.08);
    }

    .contact-info {
        background: var(--navy);
        padding: 80px 60px;
        display: flex;
        flex-direction: column;
    }

    [lang="ar"] .contact-info__title {
        font-family: var(--font-arabic);
        letter-spacing: 0;
    }

    .contact-info__title {
        font-family: var(--font-serif);
        font-size: 42px;
        font-weight: 700;
        color: var(--gold);
        letter-spacing: 1px;
        margin: 0 0 24px;
        line-height: 1.2;
    }

    .contact-info__desc {
        font-family: var(--font-sans);
        font-size: 16px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.7;
        margin: 0 0 48px;
    }

    .contact-info__detail {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 32px;
    }

    .contact-info__label {
        font-family: var(--font-sans);
        font-size: 11px;
        font-weight: 600;
        color: var(--gold);
        letter-spacing: 2px;
        text-transform: uppercase;
    }

    .contact-info__value {
        font-family: var(--font-sans);
        font-size: 16px;
        font-weight: 500;
        color: var(--white);
    }

    .contact-info__socials {
        display: flex;
        gap: 16px;
        margin-top: auto;
    }

    .social-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        color: var(--white);
        transition: all 300ms ease;
        text-decoration: none;
    }
    .social-link:hover { background: rgba(255, 255, 255, 0.1); border-color: var(--white); }

    .contact-form-container {
        background: var(--white);
        padding: 80px 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .contact-form { display: flex; flex-direction: column; gap: 24px; }
    .form-group { display: flex; flex-direction: column; gap: 8px; }

    .form-label {
        font-family: var(--font-sans);
        font-size: 14px;
        font-weight: 700;
        color: var(--navy);
        letter-spacing: 0.5px;
    }

    .form-input,
    .form-textarea {
        font-family: var(--font-sans);
        font-size: 15px;
        font-weight: 400;
        padding: 16px;
        border: 1px solid #E4E7EC;
        border-radius: 8px;
        background: var(--white);
        color: var(--navy);
        transition: all 300ms ease;
        outline: none;
        width: 100%;
        box-sizing: border-box;
    }

    [lang="ar"] .form-input, [lang="ar"] .form-textarea, [lang="ar"] .form-label {
        font-family: var(--font-arabic);
    }

    .form-input:focus, .form-textarea:focus {
        border-color: var(--navy);
        box-shadow: 0 0 0 3px rgba(0, 31, 63, 0.05);
    }

    .form-textarea { resize: vertical; min-height: 140px; }

    .form-submit-btn {
        width: 100%;
        background: var(--navy);
        color: var(--white);
        border: none;
        padding: 18px 40px;
        font-family: var(--font-sans);
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        border-radius: 8px;
        cursor: pointer;
        transition: all 300ms ease;
        margin-top: 10px;
    }

    [lang="ar"] .form-submit-btn { font-family: var(--font-arabic); letter-spacing: 0; }

    .form-submit-btn:hover { background: var(--navy-dark); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0, 31, 63, 0.15); }

    @media (max-width: 1024px) {
        .contact-card { grid-template-columns: 1fr; }
        .contact-info, .contact-form-container { padding: 50px 40px; }
    }
    @media (max-width: 640px) {
        .contact-info, .contact-form-container { padding: 40px 24px; }
        .contact-info__title { font-size: 32px; }
        .form-input, .form-textarea { font-size: 16px; }
    }
  `]
})
export class ContactComponent { }
