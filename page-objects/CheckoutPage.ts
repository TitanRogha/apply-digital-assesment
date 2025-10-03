import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  // Locator for the "Place Order" button on the checkout page
  readonly placeOrderBtn: Locator;

  // Constructor receives a Playwright page instance and initializes locators
  constructor(page: Page) {
    super(page);
    // Find the button by its role and visible name (case-insensitive)
    this.placeOrderBtn = page.getByRole('link', { name: /place order/i });
  }

  /**
   * Clicks the "Place Order" button and waits for the next page to load
   * Uses the waitForPageLoad method from BasePage for a robust loading check
   */
  async placeAnOrder() {
    await this.placeOrderBtn.click();
    await this.waitForPageLoad();
  }
}
