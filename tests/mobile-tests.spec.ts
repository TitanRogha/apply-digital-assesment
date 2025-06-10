import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { LoginPage } from '../page-objects/LoginPage';
import { CategoryPage } from '../page-objects/CategoryPage';
import { ProductDetailPage } from '../page-objects/ProductDetailPage';
import { TestDataHelper } from '../utils/TestDataHelper';

test.describe('DemoBlaze Mobile Tests', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let categoryPage: CategoryPage;
  let productDetailPage: ProductDetailPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    categoryPage = new CategoryPage(page);
    productDetailPage = new ProductDetailPage(page);
    
    await homePage.navigateToHomePage();
  });

  test('Mobile: User Journey - Login and Navigate to PDP', async ({ page }) => {
    const userData = TestDataHelper.getUserFromEnv();
    const productData = TestDataHelper.getProduct('monitor');

    await test.step('Verify mobile viewport', async () => {
      const viewportSize = page.viewportSize();
      expect(viewportSize?.width).toBeLessThanOrEqual(428); // iPhone 12 width
    });

    await test.step('Navigate to product without login on mobile', async () => {
      await homePage.clickMonitorsCategory();
      await categoryPage.verifyAppleMonitorVisible();
      await categoryPage.clickAppleMonitor();
    });

    await test.step('Verify PDP on mobile', async () => {
      await productDetailPage.verifyProductDetailPage(productData.name);
      await productDetailPage.verifyAddToCartButtonVisible();
    });
  });
});
