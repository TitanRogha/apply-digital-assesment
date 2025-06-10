import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductDetailPage extends BasePage {
  readonly productName: Locator;
  readonly addToCartButton: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.name');
    this.addToCartButton = page.locator('.btn-success');
    this.productPrice = page.locator('.price-container');
    this.productDescription = page.locator('#more-information');
  }

  async verifyProductDetailPage(productName: string) {
    await expect(this.productName).toContainText(productName);
  }

  async verifyAddToCartButtonVisible() {
    await expect(this.addToCartButton).toBeVisible();
    await expect(this.addToCartButton).toContainText('Add to cart');
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  async getProductName(): Promise<string> {
    return await this.productName.textContent() || '';
  }
}
