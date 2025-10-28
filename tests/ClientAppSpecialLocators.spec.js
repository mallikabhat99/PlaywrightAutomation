const {test,expect} = require('@playwright/test');

test('Client App with Special Locators', async({page})=>{
    const userName = page.getByPlaceholder("email@example.com");
    const signInButton = page.getByRole('button',{name:'login'});

    const titles = page.locator(".card-body b");

    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const email = 'mallikabhat99@gmail.com';

    await page.goto('https://rahulshettyacademy.com/client/');
    await userName.fill(email);
    await page.getByPlaceholder('enter your passsword').fill("Mamatha@$54");
    await signInButton.click();

    await page.waitForLoadState('networkidle');
    //alternative if above line doesnt work
    await page.locator(".card-body b").first().waitFor();
    await page.locator('.card-body').filter({hasText:productName})
   .getByRole('button',{name:' Add To Cart'}).click();

   //getting button frm parent list item
    await page.getByRole('listitem').getByRole('button',{name:'Cart'}).click();
    await page.locator('div li').first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();

    await page.getByRole('button',{name:'Checkout'}).click();

    await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 });
    await page.getByRole('button',{name:'India'}).nth(1).click();

    await page.getByText('PLACE ORDER').click();
    await expect(page.getByText(' Thankyou for the order. ')).toBeVisible();

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    
    await page.getByRole('listitem').getByRole('button',{name:'  ORDERS'}).click();
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