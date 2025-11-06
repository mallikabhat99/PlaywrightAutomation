const POManager = require('../pageobjects/POManager');
const {customTest} = require('../utils/test-base');

customTest('Client app with PO login for product with fixture', async ({ page, testDataForOrder }) => {
   const poManager = new POManager(page);
   const loginPage = poManager.getLoginPage();
   const dashboardPage = poManager.getDashboardPage();

   await loginPage.goToLoginPage();
   await loginPage.login(testDataForOrder.username, testDataForOrder.password);
   await dashboardPage.searchProductAddCart(testDataForOrder.productName);
   await dashboardPage.gotoCart();

   const cartPage = poManager.getCartPage();
   await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
   await cartPage.Checkout();
});