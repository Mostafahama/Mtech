import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section class="contact-section" id="contact">
        <div class="contact-card reveal" appReveal>
            <!-- Left Column: Contact Info -->
            <div class="contact-info">
                <h2 class="contact-info__title">Get In Touch</h2>
                <p class="contact-info__desc">Have a project in mind? We'd love to hear from you. Reach out and let's create something extraordinary together.</p>
                
                <div class="contact-info__detail">
                    <span class="contact-info__label">EMAIL</span>
                    <span class="contact-info__value">info&#64;mtechsquare.com</span>
                </div>

                <div class="contact-info__detail">
                    <span class="contact-info__label">PHONE</span>
                    <span class="contact-info__value">+20 123 456 7890</span>
                </div>

                <div class="contact-info__detail">
                    <span class="contact-info__label">LOCATION</span>
                    <span class="contact-info__value">Cairo, Egypt</span>
                </div>

                <div class="contact-info__socials">
                    <a href="#" class="social-link" aria-label="Facebook">f</a>
                    <a href="#" class="social-link" aria-label="LinkedIn">in</a>
                    <a href="#" class="social-link" aria-label="Twitter">tw</a>
                    <a href="#" class="social-link" aria-label="Instagram">ig</a>
                </div>
            </div>

            <!-- Right Column: Form Fields -->
            <div class="contact-form-container">
                <form class="contact-form" (submit)="$event.preventDefault()">
                    <div class="form-group">
                        <label class="form-label" for="contact-name">Name</label>
                        <input id="contact-name" class="form-input" type="text" placeholder="John Doe" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contact-email">Email</label>
                        <input id="contact-email" class="form-input" type="email" placeholder="john&#64;example.com" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contact-subject">Subject</label>
                        <input id="contact-subject" class="form-input" type="text" placeholder="Project Inquiry" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contact-message">Message</label>
                        <textarea id="contact-message" class="form-textarea" placeholder="Tell us about your project..." required></textarea>
                    </div>
                    <button type="submit" class="form-submit-btn">SEND MESSAGE</button>
                </form>
            </div>
        </div>
    </section>
  `,
  styles: [`
    /* ═══════════════════════════════════════════════
       CONTACT SECTION — Unified Card & Light Theme
       ═══════════════════════════════════════════════ */

    .contact-section {
        padding: 120px 40px;
        background: #F8F9FA; /* Light background for the section as requested */
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Unified Card Container */
    .contact-card {
        width: 100%;
        max-width: 1200px;
        display: grid;
        grid-template-columns: 1fr 1.5fr;
        background: var(--white);
        border-radius: 20px;
        overflow: hidden; /* This clips the left/right sections into the rounded corners */
        box-shadow: 0 20px 60px rgba(0, 31, 63, 0.08); /* Soft elegant shadow */
    }

    /* ── Left Section (Navy Background) ──────────── */
    .contact-info {
        background: var(--navy);
        padding: 80px 60px;
        display: flex;
        flex-direction: column;
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

    /* Social Links */
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
        background: transparent;
        cursor: pointer;
        transition: all 300ms ease;
        text-decoration: none;
        font-family: var(--font-sans);
        font-weight: 600;
        font-size: 14px;
    }

    .social-link:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: var(--white);
    }

    .social-link:focus {
        outline: 2px solid var(--gold);
        outline-offset: 4px;
    }


    /* ── Right Section (White Background) ────────── */
    .contact-form-container {
        background: var(--white);
        padding: 80px 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .contact-form {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    /* Form Group */
    .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .form-label {
        font-family: var(--font-sans);
        font-size: 14px;
        font-weight: 700;
        color: var(--navy);
        letter-spacing: 0.5px;
    }

    /* Input Field */
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
        line-height: 1.5;
        box-sizing: border-box;
        width: 100%;
    }

    .form-input::placeholder,
    .form-textarea::placeholder {
        color: #9EA5B4;
    }

    /* Focus State */
    .form-input:focus,
    .form-textarea:focus {
        border-color: var(--navy);
        box-shadow: 0 0 0 3px rgba(0, 31, 63, 0.05);
    }

    /* Textarea */
    .form-textarea {
        resize: vertical;
        min-height: 140px;
    }

    /* Submit Button (Solid Navy) */
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
        outline: none;
        margin-top: 10px;
    }

    .form-submit-btn:hover:not(:disabled) {
        background: var(--navy-dark);
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(0, 31, 63, 0.15);
    }

    .form-submit-btn:active:not(:disabled) {
        transform: translateY(0);
    }

    .form-submit-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .form-submit-btn:focus {
        outline: 2px solid var(--navy);
        outline-offset: 4px;
    }

    /* ── Responsive ────────────────────────────── */
    @media (max-width: 1024px) {
        .contact-card {
            grid-template-columns: 1fr;
        }

        .contact-info {
            padding: 50px 40px;
        }

        .contact-form-container {
            padding: 50px 40px;
        }
    }

    @media (max-width: 900px) {
        .contact-section { padding: 80px 20px; }
    }

    @media (max-width: 640px) {
        .contact-info {
            padding: 40px 24px;
        }

        .contact-form-container {
            padding: 40px 24px;
        }

        .contact-info__title {
            font-size: 32px;
        }

        .contact-info__desc {
            font-size: 15px;
        }

        /* Prevent iOS auto zoom */
        .form-input, .form-textarea {
            font-size: 16px;
            padding: 14px;
        }
    }

    /* ── Accessibility ─────────────────────────── */
    @media (prefers-reduced-motion: reduce) {
        .form-submit-btn,
        .social-link {
            transition: none;
        }
        .form-submit-btn:hover,
        .social-link:hover {
            transform: none;
        }
    }
  `]
})
export class ContactComponent { }

