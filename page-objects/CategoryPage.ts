import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CategoryPage extends BasePage {
  readonly productList: Locator;
  readonly appleMonitorLink: Locator;

  constructor(page: Page) {
    super(page);
    this.productList = page.locator('#tbodyid');
    this.appleMonitorLink = page.locator('text=Apple monitor 24');
  }

  async verifyAppleMonitorVisible() {
    await expect(this.appleMonitorLink).toBeVisible();
  }

  async clickAppleMonitor() {
    await this.appleMonitorLink.click();
    // Use timeout instead of networkidle for better reliability
    await this.page.waitForTimeout(3000);
  }
}
