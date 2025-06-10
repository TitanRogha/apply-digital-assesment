import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { CategoryPage } from '../page-objects/CategoryPage';
import { ProductDetailPage } from '../page-objects/ProductDetailPage';
import { TestDataHelper } from '../utils/TestDataHelper';

test.describe('DemoBlaze Basic Functionality Tests', () => {
  let homePage: HomePage;
  let categoryPage: CategoryPage;
  let productDetailPage: ProductDetailPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    categoryPage = new CategoryPage(page);
    productDetailPage = new ProductDetailPage(page);
    
    await homePage.navigateToHomePage();
  });

  test('Basic Navigation: Homepage to Product Detail Page', async ({ page }) => {
    const productData = TestDataHelper.getProduct('monitor');

    await test.step('Verify homepage loads correctly', async () => {
      await homePage.verifyPageTitle();
    });

    await test.step('Navigate to Monitors category', async () => {
      await homePage.clickMonitorsCategory();
    });

    await test.step('Verify Apple monitor is visible', async () => {
      await categoryPage.verifyAppleMonitorVisible();
    });

    await test.step('Navigate to Product Detail Page', async () => {
      await categoryPage.clickAppleMonitor();
    });

    await test.step('Verify PDP loads with Add to Cart button', async () => {
      await productDetailPage.verifyProductDetailPage(productData.name);
      await productDetailPage.verifyAddToCartButtonVisible();
    });
  });

  test('Verify page elements and layout', async ({ page }) => {
    await test.step('Verify homepage title', async () => {
      await expect(page).toHaveTitle('STORE');
    });

    await test.step('Verify login link exists', async () => {
      const loginLink = page.locator('#login2');
      await expect(loginLink).toBeVisible();
      await expect(loginLink).toContainText('Log in');
    });

    await test.step('Verify categories section exists', async () => {
      const categoriesSection = page.locator('#cat');
      await expect(categoriesSection).toBeVisible();
    });

    await test.step('Verify monitors category link exists', async () => {
      const monitorsLink = page.locator('a[onclick*="monitor"]');
      await expect(monitorsLink).toBeVisible();
    });
  });
});
