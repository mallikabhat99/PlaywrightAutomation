const { test, expect } = require('@playwright/test');

test('Browser context fixture playwright test', async ({ browser }) => {
    //playwright code - js is asynchronous
    const context = await browser.newContext(); // browser instance  we can pass cookies stuff we want
    const page = await context.newPage();

    //aborting network requests
    //page.route('**/*.css', route => route.abort()); // block all css
    page.route('**/*.{jpg,png,jpeg}', route => route.abort()); // block all png

    const userName = page.locator('#username');
    const signInButton = page.locator('#signInBtn');
    const titles = page.locator(".card-body a");

    page.on('request', request =>{
        console.log('>>', request.method(), request.url());
    });
    page.on('response', response =>{
        console.log('<<', response.status(), response.url());
    });
    
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await page.locator('[name="password"]').fill("learning");
    await signInButton.click();
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText("Incorrect username/password.");

    //
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInButton.click();
    console.log(await titles.nth(0).textContent());
    const allTitles = await titles.allTextContents(); // returns array
    console.log(allTitles);
    expect(allTitles).toContain('Blackberry');


});


test('Page fixture playwright test', async ({ page }) => {
    await page.goto('https://www.google.com/');
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});