class DashboardPage {
    constructor(page) {
        this.page = page;
        this.productsText = page.locator(".card-body b");
        this.products = page.locator(".card-body");
        this.cartButton = page.locator('[routerlink*="cart"]');
        this.orders = page.locator("button[routerlink*='myorders']");

    }

    async searchProductAddCart(productName) {
        //alternative if above line doesnt work
        await this.productsText.first().waitFor();
        const allTitles = await this.productsText.allTextContents(); // returns array
        console.log(allTitles);

        //select zara coat 4
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                await this.products.nth(i).locator('text= Add To Cart').last().click();
                break;
            }
        }

    }

    async gotoCart() {
        await this.cartButton.click();
    }
    async navigateToOrders() {
        await this.orders.click();
    }

}
module.exports = DashboardPage;