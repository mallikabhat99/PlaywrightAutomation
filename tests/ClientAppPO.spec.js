const { test, expect } = require('@playwright/test');
const POManager = require('../pageobjects/POManager');

test('Client app with page object model', async ({ page }) => {
   const poManager = new POManager(page);
   const loginPage = poManager.getLoginPage();
   const dashboardPage = poManager.getDashboardPage();

   const productName = "ZARA COAT 3";
   const email = 'mallikabhat99@gmail.com';
   const password = 'Mamatha@$54';

   await loginPage.goToLoginPage();
   await loginPage.login(email, password);
   await dashboardPage.searchProductAddCart(productName);
   await dashboardPage.gotoCart();


   const cartPage = poManager.getCartPage();
   await cartPage.VerifyProductIsDisplayed(productName);
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