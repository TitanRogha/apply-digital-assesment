import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly loginLink: Locator;
  readonly categoriesSection: Locator;
  readonly monitorsCategory: Locator;
  readonly welcomeMessage: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.loginLink = page.locator('#login2');
    this.categoriesSection = page.locator('#cat');
    this.monitorsCategory = page.locator('a[onclick*="monitor"]');
    this.welcomeMessage = page.locator('#nameofuser');
    this.logoutLink = page.locator('#logout2');
  }

  async clickLogin() {
    await this.loginLink.click();
  }

  async clickMonitorsCategory() {
    await this.monitorsCategory.click();
    // Use a more lenient wait strategy
    await this.page.waitForTimeout(3000);
  }

  async isUserLoggedIn(username: string): Promise<boolean> {
    try {
      await expect(this.welcomeMessage).toContainText(`Welcome ${username}`);
      return true;
    } catch {
      return false;
    }
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle('STORE');
  }

  async verifyWelcomeMessage(username: string) {
    await expect(this.welcomeMessage).toContainText(`Welcome ${username}`);
  }
}
