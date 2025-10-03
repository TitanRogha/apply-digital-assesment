import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  // Locators for the signup/login section
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupButton: Locator;
  readonly registerLoginBtn: Locator;

  // Locators for personal information section
  readonly passwordInput: Locator;
  readonly titleMr: Locator;
  readonly titleMrs: Locator;
  readonly nameFormInput: Locator;
  readonly daySelect: Locator;
  readonly monthSelect: Locator;
  readonly yearSelect: Locator;

  // Locators for address section
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileInput: Locator;

  // Locator for the final "Create Account" button
  readonly signupButtonForm: Locator;

  // Constructor receives a Playwright page instance and initializes all locators
  constructor(page: Page) {
    super(page);

    // Signup section
    this.nameInput = page.locator('input[data-qa="signup-name"]');
    this.emailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.getByRole('button', { name: /signup/i });
    this.registerLoginBtn = this.page.getByRole('link', { name: /Register \/ Login/i });

    // Personal information
    this.titleMr = page.locator('#id_gender1');
    this.titleMrs = page.locator('#id_gender2');
    this.nameFormInput = page.locator('input[name="name"]');
    this.passwordInput = page.locator('input[name="password"]');

    this.daySelect = page.locator('select[name="days"]');
    this.monthSelect = page.locator('select[name="months"]');
    this.yearSelect = page.locator('select[name="years"]');

    // Address section
    this.firstNameInput = page.locator('input[name="first_name"]');
    this.lastNameInput = page.locator('input[name="last_name"]');
    this.companyInput = page.locator('input[name="company"]');
    this.address1Input = page.locator('input[name="address1"]');
    this.address2Input = page.locator('input[name="address2"]');
    this.countrySelect = page.locator('select[name="country"]');
    this.stateInput = page.locator('input[name="state"]');
    this.cityInput = page.locator('input[name="city"]');
    this.zipcodeInput = page.locator('input[name="zipcode"]');
    this.mobileInput = page.locator('input[name="mobile_number"]');

    // Final create account button
    this.signupButtonForm = page.locator('[data-qa="create-account"]');
  }

  /**
   * Register a new user in the application
   * @param user - object containing all user information
   * {
   *   name, email, password, gender, birthDay, birthMonth, birthYear,
   *   firstName, lastName, company, address1, address2, country, state, city,
   *   zipcode, mobile
   * }
   */
  async registerUser(user) {
    // Go to Register/Login page
    await this.registerLoginBtn.click();
    await this.waitForPageLoad();

    // Fill signup form
    await this.nameInput.fill(user.name);
    await this.emailInput.fill(user.email);
    await this.signupButton.click();
    await this.waitForPageLoad();

    // Select gender
    if (user.gender === 'male') {
      await this.titleMr.check();
    } else {
      await this.titleMrs.check();
    }

    // Fill personal information
    await this.nameFormInput.fill(user.name);
    await this.passwordInput.fill(user.password);

    // Select date of birth
    await this.daySelect.selectOption({ value: user.birthDay.toString() });
    await this.monthSelect.selectOption({ value: user.birthMonth.toString() });
    await this.yearSelect.selectOption({ value: user.birthYear.toString() });

    // Fill address information
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.companyInput.fill(user.company);
    await this.address1Input.fill(user.address1);
    await this.address2Input.fill(user.address2);
    await this.countrySelect.selectOption({ label: user.country });
    await this.stateInput.fill(user.state);
    await this.cityInput.fill(user.city);
    await this.zipcodeInput.fill(user.zipcode);
    await this.mobileInput.fill(user.mobile);

    // Submit the final form
    await this.signupButtonForm.click();
  }
}
