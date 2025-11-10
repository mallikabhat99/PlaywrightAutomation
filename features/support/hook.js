const { After, Before, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const POManager = require('../../pageobjects/POManager');
const playwright = require("@playwright/test");
const path = require('path');
// Synchronous - runs before each scenario - BeforeAll runs before all scenarios
Before({ tags: "@Validation or @Regression" }, async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

// Runs after each scenario - AfterAll runs after all scenarios
After(function () {
    console.log("After Hook - Closing resources if any");
});

BeforeStep(function () {
    console.log("Executing Before Step Hook");
});

AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: path.join('screenshots', `screenshot-${Date.now()}.png`) });
    }
}); 