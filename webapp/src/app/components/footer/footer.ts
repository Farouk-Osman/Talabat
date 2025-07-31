import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <div class="footer-top">
        <div class="footer-logo">Talabat</div>
        <div class="footer-links">
          <a routerLink="/about">About Us</a>
          <a routerLink="/contact">Contact</a>
          <a routerLink="/privacy">Privacy Policy</a>
          <a routerLink="/terms">Terms of Service</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Talabat. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background-color: #f4f4f4;
      box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
      padding-top: 20px;
    }

    .footer-top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px 16px;
    }

    .footer-logo {
      font-size: 22px;
      font-weight: bold;
      color: #ff6600;
      transition: color 0.3s;
      cursor: pointer;
    }

    .footer-logo:hover {
      color: #ff8533;
    }

    .footer-links {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }

    .footer-links a {
      text-decoration: none;
      color: #555;
      font-weight: 500;
      transition: color 0.3s;
    }

    .footer-links a:hover {
      color: #ff6600;
    }

    .footer-bottom {
      background-color: #eaeaea;
      padding: 12px 24px;
      text-align: center;
    }

    .footer-bottom p {
      margin: 0;
      font-size: 14px;
      color: #555;
    }

    @media (max-width: 600px) {
      .footer-top {
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
      }

      .footer-links {
        gap: 12px;
        flex-direction: column;
      }
    }
  `]
})
export class Footer { }
