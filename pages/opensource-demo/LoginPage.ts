import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../foodarapp/BasePage';



export class LoginPage extends BasePage {
    private readonly adminInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator; 
    private readonly pimModule: Locator; 
    private readonly jobTitleDropdown: Locator;
    private readonly options: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.adminInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.pimModule = page.getByText('PIM');
        this.jobTitleDropdown = page.locator('form i').nth(2);
        this.options = page.locator('div[role="listbox"] span');
    }

    async login(username: string, password: string) {
        await this.adminInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async click() {
        await this.pimModule.click();
    }

    async clickJobTitleDropdown() {
        await this.jobTitleDropdown.click();
    }

    async getOptions() {
        return this.options;
    }
}