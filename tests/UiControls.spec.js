const { test, expect } = require('@playwright/test');

test('UI Controls', async ({ browser }) => {
    //playwright code - js is asynchronous
    const context = await browser.newContext(); // browser instance  we can pass cookies stuff we want
    const page = await context.newPage();

    const userName = page.locator('#username');
    const dropdown = page.locator('select.form-control');
    const documentLink = page.locator('a[href*="documents-request"]');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await page.locator('[name="password"]').fill("learning");
    await dropdown.selectOption('consult');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();

    await page.locator('#terms').click();
    await expect(page.locator('#terms').last()).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
});

test('Child window handling', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');

    const documentLink = page.locator('a[href*="documents-request"]');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'), //listen for new page to open must be addded before new page click , promise penidng , rejected , resolved.
        documentLink.click(),// new page opens
    ]);

    console.log(await newPage.locator('.red').textContent());
    const text = await newPage.locator('.red').textContent();
    const arrayText = text.split('@');
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    //fill the value/email in parent page
    await userName.fill(domain);
    console.log(await userName.inputValue()); //text content will fetch only when its attached to dom
    //use inputValue() - when content added dynamicallyl̥
});
