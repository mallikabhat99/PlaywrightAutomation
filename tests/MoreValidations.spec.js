const {test,expect}= require("@playwright/test");
test.describe.configure({mode:'parallel'});

test("More validations check", async({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

//await page.goto("https://google.com");
//await page.goBack();
//await expect(page).toHaveURL("https://rahulshettyacademy.com/AutomationPractice/");
//await page.goForward();
//await expect(page).toHaveURL("https://www.google.com/");

await expect(page.locator('#displayed-text')).toBeVisible();
await page.locator('#hide-textbox').click();
await expect(page.locator('#displayed-text')).toBeHidden();
await page.locator('#show-textbox').click();
await expect(page.locator('#displayed-text')).toBeVisible();

//alert validations
page.on('dialog', dialog => dialog.accept());
await page.locator('#alertbtn').click();
//page.on('dialog', dialog => dialog.dismiss());

//hover mouse handling
await page.locator('#mousehover').hover();

//iframe handling
const framesPage = page.frameLocator("#courses-iframe");
await framesPage.locator("li a[href*='lifetime-access']:visible").click();
const text = await framesPage.locator('.text h2').textContent();
console.log(text.split("")[1]).trim();
});


test("Screenshot and visual validations", async({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await expect(page.locator('#displayed-text')).toBeVisible();
await page.locator('#displayed-text').screenshot({path:'element.png'});
await page.locator('#hide-textbox').click();
await page.screenshot({path:'screenshot.png', fullPage:true});
await expect(page.locator('#displayed-text')).toBeHidden();
});


test("Visual comparison test", async({page})=>{
await page.goto("https://www.google.com");
await expect(page.screenshot()).toMatchSnapshot('googleHomepage.png');
});