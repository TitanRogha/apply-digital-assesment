# Playwright DemoBlaze Automation Project

This project demonstrates comprehensive test automation using Playwright for the DemoBlaze e-commerce website. It includes cross-browser testing, mobile device emulation, dynamic test data management, and environment-specific configurations.

## 🎯 Project Overview

The automation framework validates the complete user journey on DemoBlaze:
1. User login and authentication
2. Category navigation (Monitors)
3. Product Detail Page (PDP) validation
4. Add to cart functionality verification

## 🚀 Features

- ✅ **Cross-Browser Testing**: Chromium, Firefox, WebKit
- ✅ **Mobile Device Emulation**: iPhone 12 viewport testing
- ✅ **Dynamic Test Data**: JSON-based configuration with environment variable support
- ✅ **Environment-Specific Configuration**: QA, UAT, Production environments
- ✅ **Page Object Model**: Clean, maintainable test structure
- ✅ **Comprehensive Reporting**: HTML, JSON, and JUnit reports
- ✅ **Screenshots & Videos**: Automatic capture on test failures
- ✅ **TypeScript Support**: Type-safe test development

## 📁 Project Structure

```
playwright-demoblaze-automation/
├── data/
│   └── testData.json              # Test data configuration
├── page-objects/
│   ├── BasePage.ts               # Base page class
│   ├── HomePage.ts               # Home page interactions
│   ├── LoginPage.ts              # Login modal interactions
│   ├── CategoryPage.ts           # Category page interactions
│   └── ProductDetailPage.ts      # Product detail page interactions
├── tests/
│   ├── complete-user-journey.spec.ts     # Main user journey tests with dynamic registration
│   ├── basic-functionality.spec.ts       # Cross-browser navigation tests
│   └── mobile-tests.spec.ts              # Mobile-specific tests
├── utils/
│   ├── TestDataHelper.ts         # Test data management utilities
│   └── CommonHelpers.ts          # Common helper functions
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── .env.example                  # Environment variables template
└── README.md                     # This file
```

## 🛠 Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd playwright-demoblaze-automation
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npm run install
   ```

4. **Set up environment variables (optional):**
   ```bash
   cp .env.example .env
   # Edit .env file with your preferred settings
   ```

## 🎮 Running Tests

### Quick Demo
```bash
# Run the complete demo (recommended first run)
./demo.sh
```

### Core Working Tests

```bash
# ✅ MAIN USER JOURNEY - Complete registration, login, and navigation
npm run test tests/complete-user-journey.spec.ts

# ✅ BASIC FUNCTIONALITY - Navigation without login (works across all browsers)
npm run test tests/basic-functionality.spec.ts

# ✅ MOBILE TESTING - Mobile viewport testing
npm run test:mobile tests/mobile-tests.spec.ts
```

### Cross-Browser Testing

```bash
# Run working tests on specific browsers
npm run test:chromium tests/complete-user-journey.spec.ts
npm run test:firefox tests/complete-user-journey.spec.ts
npm run test:webkit tests/complete-user-journey.spec.ts

# Run all basic functionality tests across all browsers
npm run test tests/basic-functionality.spec.ts
```

### Environment-Specific Testing

```bash
# Test against different environments
BASE_URL=https://www.demoblaze.com npm test tests/complete-user-journey.spec.ts

# Custom environment
BASE_URL=https://custom.demoblaze.com npm test
```

### Debug and Reporting

```bash
# Run tests in debug mode with step-by-step execution
npm run test:debug tests/complete-user-journey.spec.ts

# View test reports
npm run show-report

# Run with UI mode for interactive debugging
npm run test:ui
```

## 🧪 Test Scenarios

### ✅ Working Test Suites

#### 1. Complete User Journey (`tests/complete-user-journey.spec.ts`)
- **Features Validated**:
  - Dynamic user registration with unique credentials
  - User login functionality
  - Welcome message verification
  - Category navigation (Monitors)
  - Product Detail Page navigation
  - "Add to cart" button presence
- **Cross-Browser**: ✅ Chromium, Firefox, WebKit
- **Status**: FULLY WORKING

#### 2. Basic Functionality (`tests/basic-functionality.spec.ts`)
- **Features Validated**:
  - Page title verification ("STORE")
  - Homepage elements visibility
  - Category navigation without login
  - Product Detail Page access
  - Add to cart button verification
- **Cross-Browser**: ✅ Chromium, Firefox, WebKit
- **Status**: FULLY WORKING

#### 3. Mobile Testing (`tests/mobile-tests.spec.ts`)
- **Features Validated**:
  - Mobile viewport (iPhone 12) functionality
  - Touch-friendly navigation
  - Product browsing on mobile
- **Browser**: ✅ WebKit (mobile project)
- **Status**: WORKING

## 📊 Test Data Management

### Dynamic Test Data
Test credentials and product information are stored in `data/testData.json`:

```json
{
  "users": {
    "testuser": {
      "username": "testuser",
      "password": "testpass"
    }
  },
  "products": {
    "monitor": {
      "name": "Apple monitor 24",
      "category": "Monitors"
    }
  }
}
```

### Environment Variables
Override test data using environment variables:
```bash
TEST_USERNAME=myuser TEST_PASSWORD=mypass npm test
```

## 🌍 Environment Configuration

The framework supports multiple environments:

```bash
# QA Environment
BASE_URL=https://qa.demoblaze.com npm test

# UAT Environment  
BASE_URL=https://uat.demoblaze.com npm test

# Production (default)
npm test
```

## 📈 Reporting

The framework generates multiple report formats:

- **HTML Report**: Interactive report with screenshots and videos
- **JSON Report**: Machine-readable test results
- **JUnit Report**: CI/CD integration compatible

Reports are automatically generated in:
- `playwright-report/` - HTML reports
- `test-results.json` - JSON results
- `test-results.xml` - JUnit XML

## 🎯 Best Practices Implemented

1. **Page Object Model**: Separates test logic from page interactions
2. **Dynamic Test Data**: Avoids hardcoded values in test files
3. **Environment Abstraction**: Easy switching between environments
4. **Error Handling**: Comprehensive error capturing with screenshots
5. **Cross-Browser Support**: Ensures compatibility across major browsers
6. **Mobile Testing**: Validates mobile user experience
7. **Retry Logic**: Automatic test retry on failures
8. **Parallel Execution**: Fast test execution across multiple browsers

## 🔧 Configuration Options

### Playwright Configuration (`playwright.config.ts`)

Key configuration options:
- **Browsers**: Chromium, Firefox, WebKit, Mobile
- **Retry Strategy**: 2 retries on CI, 0 locally
- **Timeouts**: Configurable test timeouts
- **Screenshots**: Capture on failure
- **Videos**: Record on failure
- **Traces**: Capture on retry

### TypeScript Configuration (`tsconfig.json`)

Configured for:
- ES2020 target
- Strict type checking
- Path resolution for imports
- Playwright type definitions

## 🚨 Troubleshooting

### Common Issues

1. **Tests failing on first run**:
   - Ensure all browsers are installed: `npm run install`
   - Check network connectivity to demoblaze.com

2. **Login failures**:
   - Verify test credentials in `data/testData.json`
   - Check if the website structure has changed

3. **Mobile tests not working**:
   - Ensure mobile project is configured in `playwright.config.ts`
   - Run: `npm run test:mobile`

4. **Environment variables not working**:
   - Copy `.env.example` to `.env`
   - Restart your terminal after setting environment variables

### Debug Commands

```bash
# Run single test file
npx playwright test tests/demoblaze-user-journey.spec.ts

# Run specific test
npx playwright test --grep "User Journey"

# Run with verbose output
npx playwright test --reporter=list

# Generate trace files
npx playwright test --trace=on
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License - see the package.json file for details.

## 📞 Support

For questions or issues:
1. Check the troubleshooting section above
2. Review Playwright documentation: https://playwright.dev/
3. Create an issue in the repository

---

**Happy Testing! 🎭**
