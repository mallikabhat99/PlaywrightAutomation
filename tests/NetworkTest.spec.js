const { test, expect, request } = require('@playwright/test');
const {RequestUtils} = require('./utils/RequestUtils');
const loginPayLoad = { userEmail: "mallikabhat99@gmail.com", userPassword: "Mamatha@$54" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new RequestUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})

test('API response faking', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");
    //intercepting response -APi response->
    //{playwright fakeresponse}->browser->render data on front end
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
       async route => {
          const response = await page.request.fetch(route.request());
          let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill({
                response,
                body,
            })

        }
    )
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    console.log(await page.locator(".mt-4").textContent());

});