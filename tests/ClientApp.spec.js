const {test,expect} = require('@playwright/test');

test('Page fixture playwright test', async({page})=>{
    const userName = page.locator('#userEmail');
    const signInButton = page.locator('#login');
    const titles = page.locator(".card-body b");

    await page.goto('https://rahulshettyacademy.com/client/');
    await userName.fill("mallikabhat99@gmail.com");
    await page.locator('#userPassword').fill("Mamatha@$54");
    await signInButton.click();

    await page.waitForLoadState('networkidle');
    //alternative if above line doesnt work
    await page.locator(".card-body b").first().waitFor();
    const allTitles = await titles.allTextContents(); // returns array
    console.log(allTitles);
});