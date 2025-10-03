import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Locator for the "Products" link in the main navigation
  readonly productsLink: Locator;
  // Locator for the "Cart" link in the main navigation
  readonly cartLink: Locator;
  // Locator for the "Logout" button/link in the main navigation
  readonly logoutBtn: Locator;

  // Constructor receives a Playwright page instance and initializes locators
  constructor(page: Page) {
    super(page);
    this.productsLink = page.getByRole('link', { name: /products/i });
    this.cartLink = page.getByRole('link', { name: /cart/i });
    this.logoutBtn = page.getByRole('link', { name: /logout/i });
  }

  /**
   * Navigate to the Products page by clicking the "Products" link
   * Waits for the page to load using the BasePage waitForPageLoad method
   */
  async goToProducts() {
    await this.productsLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Navigate to the Cart page by clicking the "Cart" link
   * Waits for the page to load using the BasePage waitForPageLoad method
   */
  async goToCart() {
    await this.cartLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Log out the current user by clicking the "Logout" button/link
   * Waits for the page to load after logging out
   */
  async logout() {
    await this.logoutBtn.click();
    await this.waitForPageLoad();
  }
}
