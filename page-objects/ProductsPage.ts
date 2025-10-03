import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  // Locator for the third product in the product list
  readonly productThreeLink: Locator;

  // Constructor receives a Playwright page instance and initializes locators
  constructor(page: Page) {
    super(page);
    // Using the href attribute to directly locate the third product
    this.productThreeLink = page.locator('a[href="/product_details/3"]');
  }

  /**
   * Clicks on the third product to open its detail page
   * Waits for the product detail page to load after navigation
   */
  async openThirdProduct() {
    await this.productThreeLink.click();
    await this.waitForPageLoad();
  }
}
