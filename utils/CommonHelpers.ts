import { Page } from '@playwright/test';

export class WaitHelper {
  static async waitForElement(page: Page, selector: string, timeout: number = 10000) {
    await page.waitForSelector(selector, { timeout });
  }

  static async waitForTextToAppear(page: Page, text: string, timeout: number = 10000) {
    await page.waitForFunction(
      (text) => document.body.innerText.includes(text),
      text,
      { timeout }
    );
  }

  static async waitForAlert(page: Page, timeout: number = 5000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Alert did not appear within timeout'));
      }, timeout);

      page.once('dialog', (dialog) => {
        clearTimeout(timer);
        resolve(dialog);
      });
    });
  }

  static async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export class ScreenshotHelper {
  static async takeScreenshot(page: Page, name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ 
      path: `screenshots/${name}-${timestamp}.png`,
      fullPage: true 
    });
  }

  static async takeElementScreenshot(page: Page, selector: string, name: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const element = page.locator(selector);
    await element.screenshot({ 
      path: `screenshots/${name}-element-${timestamp}.png` 
    });
  }
}
