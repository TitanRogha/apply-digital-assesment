import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly closeButton: Locator;
  readonly loginModal: Locator;

  constructor(page: Page) {
    super(page);
    this.loginModal = page.locator('#logInModal');
    this.usernameInput = page.locator('#loginusername');
    this.passwordInput = page.locator('#loginpassword');
    this.loginButton = page.locator('button[onclick="logIn()"]');
    this.closeButton = page.locator('#logInModal .close');
  }

  async waitForLoginModal() {
    await this.loginModal.waitFor({ state: 'visible' });
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async performLogin(username: string, password: string) {
    await this.waitForLoginModal();
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
    
    // Wait for either successful login (modal disappears) or handle alert for invalid credentials
    try {
      await Promise.race([
        this.loginModal.waitFor({ state: 'hidden', timeout: 10000 }),
        this.page.waitForEvent('dialog', { timeout: 5000 }).then(dialog => {
          console.log('Dialog appeared:', dialog.message());
          dialog.accept();
          throw new Error(`Login failed: ${dialog.message()}`);
        })
      ]);
      
      // Additional wait for page to stabilize after successful login
      await this.page.waitForTimeout(2000);
    } catch (error) {
      if (error.message.includes('Login failed')) {
        throw error;
      }
      // If timeout, check if we're actually logged in by looking for welcome message
      const welcomeElement = this.page.locator('#nameofuser');
      if (await welcomeElement.isVisible()) {
        console.log('Login appears successful despite modal timeout');
        return;
      }
      throw new Error(`Login process failed: ${error.message}`);
    }
  }
}
