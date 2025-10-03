import { Page } from '@playwright/test';

export class BasePage {
  // Reference to the Playwright page object
  readonly page: Page;

  // Constructor receives a Playwright page instance
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the home page using the baseURL from the Playwright config
   */
  async navigateToHomePage() {
    await this.page.goto('/');
  }

  /**
   * Get the current page title
   * @returns Promise<string> - the title of the current page
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Wait for the page to finish loading
   * Uses 'domcontentloaded' load state to ensure the DOM is ready
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
