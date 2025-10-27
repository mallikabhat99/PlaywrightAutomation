const {test,expect} = require('@playwright/test');

test('Page fixture playwright test', async({page})=>{
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
    const allTitles = await titles.allTextContents(); // returns array
    console.log(allTitles);

    //select zara coat 4
    const count = await products.count();
    for(let i=0 ; i<count;i++){
       if(await products.nth(i).locator('b').textContent()===productName)
       {
       await products.nth(i).locator('text= Add To Cart').last().click();
       break;
       }
    }
    await page.locator('[routerlink*="cart"]').click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
    expect(bool).toBeTruthy();

    await page.locator('text=Checkout').click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 });
    const dropdown = await page.locator('.ta-results');
    await dropdown.waitFor();
    const length = await dropdown.locator('button').count();
    for(let j=0; j<length ; j++){
        if( await dropdown.locator('button').nth(j).textContent()===" India"){
            await dropdown.locator('button').nth(j).click();
            break;
        } 
    }
    await expect(page.locator('.user__name [type="text"]').first()).toHaveText(email);
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);


    await page.locator('button[routerlink*="myorders"]').click();
    await page.locator('tbody').waitFor();

    const rows = await page.locator('tbody tr');
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});