#!/bin/bash

echo "🎭 Playwright DemoBlaze Automation Demo"
echo "========================================="

echo "🚀 Running Core User Journey Tests..."
npx playwright test tests/complete-user-journey.spec.ts --reporter=list

echo ""
echo "🌐 Running Basic Cross-Browser Tests..."
npx playwright test tests/basic-functionality.spec.ts --reporter=list

echo ""
echo "📱 Running Mobile Tests..."
npx playwright test --project=mobile --reporter=list

echo ""
echo "✅ Demo Complete!"
echo "📊 View detailed reports by running: npm run show-report"

# Check if all tests passed and open report
if [ $? -eq 0 ]; then
    echo "🎉 All tests passed! Opening report..."
    npx playwright show-report
else
    echo "⚠️  Some tests failed. Check the output above for details."
fi
