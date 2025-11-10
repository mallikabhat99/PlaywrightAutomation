const { Given, When, Then } = require('@cucumber/cucumber')
const POManager = require('../../pageobjects/POManager');
const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");

Given('User logins to ECommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goToLoginPage();
    await loginPage.login(username, password);
});


When('Add {string} to the cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.gotoCart();

});


Then('Verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});


When('Enter valid details and place the order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify the order is present in OrderHistory page.', async function () {
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});


Given('User logins to ECommerce2 application with {string} and {string}', async function (username, password) {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = this.page.locator('#username');
    const signInButton = this.page.locator('#signInBtn');

    console.log(await this.page.title());
    await userName.fill(username);
    await this.page.locator('[name="password"]').fill(password);
    await signInButton.click();
});

Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator('[style*="block"]').textContent());
    await expect(this.page.locator('[style*="block"]')).toContainText("Incorrect username/password.");
});


