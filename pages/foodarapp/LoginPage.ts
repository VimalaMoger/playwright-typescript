import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
   
    private emailInput: Locator;
    private fNameInput: Locator;
    private submitLogin: Locator;  
    private loginLinkOnMainpage: Locator;
    private loginDisplayText: Locator;
     
    constructor(page: Page) {
        super(page);
        // get the "Sign In" link on the main page
        this.loginLinkOnMainpage = page.getByRole('link', {name: 'Sign In'})
        // get the heading text "Please sign in"
        this.loginDisplayText = page.getByRole("heading", { name: 'Please sign in' });
        // input field labeled "Email"
        this.emailInput = page.getByLabel('Email');
        this.fNameInput = page.getByLabel('Name:');
        this.submitLogin = page.getByRole('button', {name: 'Login' })
    }

    override async assertElementVisible(): Promise<void> {
        await super.assertElementVisible(this.loginLinkOnMainpage);
    }

    /**
     * Promise<void> indicates that this method does not return any value and is asynchronous. 
     * It will complete its execution before the next line of code is executed.
     */
    async clickLoginLink() : Promise<void> {
        await super.click(this.loginLinkOnMainpage);
    }

    async assertLoginDisplayTextVisible(): Promise<void> {
        await super.assertElementVisible(this.loginDisplayText);
    }   

    /**
     * Perform login action
     * @param email - User's email address
     * @param password - User's password
     * @param firstName - User's first name
     */
    async login(email: string, password: string, firstName: string) {
        await this.emailInput.fill(email);
        await this.fNameInput.fill(firstName);
        await this.submitLogin.click();
    }

    // register page get browser name method
    async getBrowserName(): Promise<string> {
        return this.page.context().browser()?.browserType().name() || 'unknown';
    }
}