import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { LoginPage } from '../page-objects/LoginPage';
import { CategoryPage } from '../page-objects/CategoryPage';
import { ProductDetailPage } from '../page-objects/ProductDetailPage';

test.describe('DemoBlaze Complete User Journey', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let categoryPage: CategoryPage;
  let productDetailPage: ProductDetailPage;
  let testUsername: string;
  let testPassword: string;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    categoryPage = new CategoryPage(page);
    productDetailPage = new ProductDetailPage(page);
    
    // Generate unique credentials for each test
    const timestamp = Date.now();
    testUsername = `testuser${timestamp}`;
    testPassword = `testpass${timestamp}`;
  });

  test('Complete User Journey: Register, Login, Navigate to Monitors, and Validate PDP', async ({ page }) => {
    await test.step('Navigate to DemoBlaze homepage', async () => {
      await homePage.navigateToHomePage();
      await expect(page).toHaveTitle('STORE');
    });

    await test.step('Register new user', async () => {
      // Click Sign up
      await page.locator('#signin2').click();
      await page.locator('#signInModal').waitFor({ state: 'visible' });
      
      // Fill registration form
      await page.locator('#sign-username').fill(testUsername);
      await page.locator('#sign-password').fill(testPassword);
      await page.locator('button[onclick="register()"]').click();
      
      // Handle registration dialog
      const dialog = await page.waitForEvent('dialog');
      expect(dialog.message()).toContain('Sign up successful');
      await dialog.accept();
      
      // Close registration modal
      try {
        await page.locator('#signInModal').waitFor({ state: 'hidden', timeout: 3000 });
      } catch (e) {
        await page.locator('#signInModal .close').click();
      }
    });

    await test.step('Perform login', async () => {
      await homePage.clickLogin();
      await loginPage.waitForLoginModal();
      await loginPage.fillUsername(testUsername);
      await loginPage.fillPassword(testPassword);
      await loginPage.clickLoginButton();
      
      // Wait for successful login
      await page.locator('#logInModal').waitFor({ state: 'hidden' });
      await page.waitForTimeout(2000);
    });

    await test.step('Verify successful login', async () => {
      const welcomeElement = page.locator('#nameofuser');
      await expect(welcomeElement).toBeVisible();
      await expect(welcomeElement).toContainText(`Welcome ${testUsername}`);
    });

    await test.step('Navigate to Monitors category', async () => {
      await homePage.clickMonitorsCategory();
      await categoryPage.verifyAppleMonitorVisible();
    });

    await test.step('Navigate to Apple monitor PDP', async () => {
      await categoryPage.clickAppleMonitor();
    });

    await test.step('Verify PDP loaded correctly and Add to Cart button is visible', async () => {
      await productDetailPage.verifyProductDetailPage('Apple monitor 24');
      await productDetailPage.verifyAddToCartButtonVisible();
    });
  });

  test('Navigation without login - Verify core functionality', async ({ page }) => {
    await test.step('Navigate to DemoBlaze and verify page title', async () => {
      await homePage.navigateToHomePage();
      await expect(page).toHaveTitle('STORE');
    });

    await test.step('Navigate to Monitors category', async () => {
      await homePage.clickMonitorsCategory();
      await categoryPage.verifyAppleMonitorVisible();
    });

    await test.step('Navigate to Product Detail Page', async () => {
      await categoryPage.clickAppleMonitor();
      await productDetailPage.verifyProductDetailPage('Apple monitor 24');
      await productDetailPage.verifyAddToCartButtonVisible();
    });
  });
});
