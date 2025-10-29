const { test, expect } = require('@playwright/test');

test('Security check using playwright', async ({ page }) => {

    const userName = page.locator('#userEmail');
    const signInButton = page.locator('#login');
    const titles = page.locator(".card-body b");

    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const email = 'mallikabhat99@gmail.com';

    await page.goto('https://rahulshettyacademy.com/client/');
    await userName.fill(email);
    await page.locator('#userPassword').fill("Mamatha@$54");
    await signInButton.click();

    await page.waitForLoadState('networkidle');
    //alternative if above line doesnt work
    await page.locator(".card-body b").first().waitFor();

    await page.locator('button[routerlink*="myorders"]').click();
    await page.locator('tbody').waitFor();


    //continue method is used to intercept request and modify the request
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route => route.continue(
            { url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=67a8dde5c0d3e6622a297cc8' })
    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator('p').last).toHaveText('You are not authorize to view this order');
})