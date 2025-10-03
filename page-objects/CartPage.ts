import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Locator for the "Proceed To Checkout" button on the cart page
  readonly proceedToCheckoutBtn: Locator;

  // Constructor receives a Playwright page instance and initializes locators
  constructor(page: Page) {
    super(page);
    // Find the button by its visible text (case-insensitive)
    this.proceedToCheckoutBtn = page.getByText(/Proceed To Checkout/i);
  }

  /**
   * Clicks the "Proceed To Checkout" button and waits for the next page to load
   * Uses the waitForPageLoad method from BasePage for robust loading check
   */
  async proceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
    await this.waitForPageLoad();
  }
}
