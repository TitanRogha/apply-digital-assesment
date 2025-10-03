import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  // Locator for the quantity input field on the product detail page
  readonly quantityInput: Locator;
  // Locator for the "Add to Cart" button
  readonly addToCartBtn: Locator;

  // Constructor receives a Playwright page instance and initializes locators
  constructor(page: Page) {
    super(page);
    this.quantityInput = page.locator('#quantity');
    this.addToCartBtn = page.getByRole('button', { name: /add to cart/i });
  }

  /**
   * Set the quantity of the product to add to cart
   * @param qty - number of items to set in the quantity input
   */
  async setQuantity(qty: number) {
    await this.quantityInput.fill(qty.toString());
  }

  /**
   * Click the "Add to Cart" button
   * Adds the product to the shopping cart
   * Waits 1 second after clicking to allow modal to appear (can be replaced with a proper wait)
   */
  async addToCart() {
    await this.addToCartBtn.click();
    await this.page.waitForTimeout(1000); // Consider replacing with a wait for modal/element
  }

  /**
   * Proceed to checkout from the modal if it appears
   * If the modal does not appear, navigates directly to the cart page
   */
  async proceedToCheckoutFromModal() {
    const proceed = this.page.getByRole('link', { name: /view cart/i });

    if (await proceed.count()) {
      // If modal link exists, click it and wait for page load
      await proceed.click();
      await this.waitForPageLoad();
    } else {
      // Fallback: navigate directly to the cart page
      await this.page.goto('https://automationexercise.com/view_cart');
      await this.waitForPageLoad();
    }
  }
}
