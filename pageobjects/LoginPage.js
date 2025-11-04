class LoginPage {
    constructor(page) {
        this.signInButton = page.locator('#login');
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.page = page;
    }

    async goToLoginPage() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }
    async login(email, pwd) {
        await this.userName.fill(email);
        await this.password.fill(pwd);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');

    }
}
module.exports = LoginPage;