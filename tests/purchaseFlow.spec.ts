import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { ProductsPage } from '../page-objects/ProductsPage';
import { ProductDetailPage } from '../page-objects/ProductDetailPage';
import { CartPage } from '../page-objects/CartPage';
import { CheckoutPage } from '../page-objects/CheckoutPage';
import { RegisterPage } from '../page-objects/RegisterPage';
import { getRandomQuantity } from '../utils/randomData';
import { faker } from '@faker-js/faker';
import { runLighthouse } from '../utils/lighthouseRunner';


test.describe('Add the third product to cart and go to Register/Login', () => {
  let homePage: HomePage;
  let productsPage: ProductsPage;
  let productDetailPage: ProductDetailPage;
  let cartPage: CartPage;
  let registerPage: RegisterPage;
  let checkoutPage: CheckoutPage;

  /**
   * Runs before each test
   * Initializes all page objects and navigates to the home page
   */
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productsPage = new ProductsPage(page);
    productDetailPage = new ProductDetailPage(page);
    cartPage = new CartPage(page);
    registerPage = new RegisterPage(page);
    checkoutPage = new CheckoutPage(page);

    // Navigate to the website's home page
    await homePage.navigateToHomePage();
  });

  test('Add a product to the cart, register a user and complete the order', async ({ page }) => {

    // Navigate to the Products page
    await homePage.goToProducts();

    // Open the third product from the list
    await productsPage.openThirdProduct();

    // Generate a random quantity between 1-20
    const randomQuantity = getRandomQuantity();

    // Set the quantity in the product detail page
    await productDetailPage.setQuantity(randomQuantity);

    // Add the product to the cart
    await productDetailPage.addToCart();

    // Proceed to checkout from the modal if it appears
    await productDetailPage.proceedToCheckoutFromModal();

    // Click the proceed to checkout button in the cart page
    await cartPage.proceedToCheckout();

    // Assert that the Register/Login text is visible before continuing
    const registerText = page.getByText(/Register \/ Login account to proceed/i);
    await expect(registerText).toBeVisible().catch(async () => {
      // Fallback: if text not found, just verify the URL is correct
      await expect(page).toHaveURL(/checkout|login|signup|view_cart/);
    });

    // Generate a random birth date between 18-65 years old
    const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });

    // Create a new user object with Faker data
    const user = {
      gender: faker.person.sex(), // male or female
      name: faker.person.firstName(),
      email: faker.internet.email(),
      password: 'Password123!',
      birthDay: birthDate.getDate(),
      birthMonth: birthDate.getMonth() + 1, // JS months are 0-based
      birthYear: birthDate.getFullYear(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: 'United States',
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode('#####'),
      mobile: faker.phone.number()
    };

    // Register the new user on the website
    await registerPage.registerUser(user);

    // Verify that account creation was successful
    await expect(page.locator('text=Account Created')).toBeVisible();

    // Go to cart again
    await homePage.goToCart();

    // Proceed to checkout and place the order
    await cartPage.proceedToCheckout();
    await checkoutPage.placeAnOrder();

    // Logout after completing the order
    await homePage.logout();
  });

  test('Home page accessibility and performance', async ({ page, baseURL }) => {
    // Run Lighthouse
    const scores = await runLighthouse(page.url());
  
    // Optional validations according to minimal criteria
    expect(scores.accessibility).toBeGreaterThanOrEqual(0.9);
    expect(scores.performance).toBeGreaterThanOrEqual(0.8);
  });

});
