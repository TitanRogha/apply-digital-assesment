import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration
 * 
 * This file sets up global configurations, browser projects, 
 * and reporting options for running Playwright tests.
 * 
 * For more details, see: https://playwright.dev/docs/test-configuration
 */

/**
 * Load environment variables from a .env file if needed.
 * Uncomment the line below if using dotenv.
 */
// require('dotenv').config();

export default defineConfig({
  // Directory where the test files are located
  testDir: './tests',

  // Whether to run tests in parallel within a single file
  fullyParallel: false,

  // Fail the build on CI if test.only is left in the source code
  forbidOnly: !!process.env.CI,

  // Retry failed tests only on CI
  retries: process.env.CI ? 2 : 0,

  // Limit the number of workers (parallel processes) on CI
  workers: process.env.CI ? 1 : 1,

  // Reporters to use for test results
  reporter: [
    ['html'], // Generates an HTML report
    ['json', { outputFile: 'test-results.json' }], // JSON report
    ['junit', { outputFile: 'test-results.xml' }] // JUnit XML report
  ],

  // Shared settings for all tests
  use: {
    // Base URL for page.goto() calls
    baseURL: process.env.BASE_URL || 'https://automationexercise.com/',

    // Run tests in headed mode (browser visible)
    headless: false,

    // Collect trace for the first retry of a failed test
    trace: 'on-first-retry',

    // Take screenshots only on test failures
    screenshot: 'only-on-failure',

    // Record video only on test failures
    video: 'retain-on-failure',
  },

  // Configure different browser projects
  projects: [
    {
      name: 'chromium', // Google Chrome / Edge-like browsers
      use: { 
        browserName: 'chromium',
        viewport: null, // Default viewport (maximized)
        launchOptions: {
          args: ['--start-maximized'], // Start browser maximized
        },
      },
    },
    {
      name: 'firefox', // Mozilla Firefox
      use: { 
        browserName: 'firefox',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
    {
      name: 'webkit', // Apple Safari
      use: { 
        browserName: 'webkit',
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'], // Note: may not affect Safari
        },
      },
    },
    {
      name: 'mobile', // Mobile emulation
      use: { 
        ...devices['iPhone 12'], // Use built-in device preset
        viewport: { width: 390, height: 844 }, // Override viewport
      },
    },

    /* Optional: Test branded browsers (Edge, Chrome) */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Optional: Run a local dev server before starting tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
