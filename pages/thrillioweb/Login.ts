import { Page, Locator } from '@playwright/test';
import { BasePage } from '../foodarapp/BasePage';

export class Login extends BasePage {
    private loginDisplayText: Locator;
    private emailField: Locator;
    private passwordField: Locator;
    private loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.loginDisplayText = page.getByRole("heading", { name: 'Login Form' });
        this.emailField = page.locator('#email');
        this.passwordField = page.locator('#password');
        this.loginButton = page.getByRole("button", { name: 'Login' });
    }

    // visibility of Display text
    async assertElementVisible() {
        super.assertElementVisible(this.loginDisplayText);
    }

    async login(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

}