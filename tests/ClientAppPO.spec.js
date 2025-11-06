const { test, expect } = require('@playwright/test');
const POManager = require('../pageobjects/POManager');
const customTest = require('../utils/test-base');
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));
//json-string-javascript-object

dataset.forEach((data, idx) => {
  test(`Client app with PO login for product ${data.productName} - test${idx}`, async ({ page }) => 
   {
   const poManager = new POManager(page);
   const loginPage = poManager.getLoginPage();
   const dashboardPage = poManager.getDashboardPage();

   await loginPage.goToLoginPage();
   await loginPage.login(data.username, data.password);
   await dashboardPage.searchProductAddCart(data.productName);
   await dashboardPage.gotoCart();

   const cartPage = poManager.getCartPage();
   await cartPage.VerifyProductIsDisplayed(data.productName);
   await cartPage.Checkout();
   const ordersReviewPage = poManager.getOrdersReviewPage();
   await ordersReviewPage.searchCountryAndSelect("ind", "India");
   const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
});

