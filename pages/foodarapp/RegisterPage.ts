import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
   
    private emailInput: Locator;
    private passwordInput: Locator;
    private fNameInput: Locator;
    private submitButton: Locator;
    private registerLinkOnMainpage: Locator;

    constructor(page: Page) {
        super(page);
        // get the "Register" link on the main page
        this.registerLinkOnMainpage = page.locator('a[href="/foodarpages/register"]');
        // input field labeled "Email"
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator("input[type='password']"); //page.getByLabel('Password:'); // or by CSS Selector: input[type="password"]
        this.fNameInput = page.locator('#fName');
        this.submitButton = page.getByRole('button', {name: 'submit' });
    }   
    
    override async assertElementVisible(): Promise<void> {
        await super.assertElementVisible(this.registerLinkOnMainpage);
    }

    /**
     * Navigate to the login page
     * Promise<void> indicates that this method does not return any value and is asynchronous. It will complete its execution before the next line of code is executed.
     */
    async clickRegisterLink() : Promise<void> {
        await super.click(this.registerLinkOnMainpage);
    }
    
    /**
     * Perform registration action
     * @param email - User's email address      
     * @param password - User's password
     * @param fName - User's first name
     */     
    async register(email: string, password: string, fName: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.fNameInput.fill(fName);
        await this.submitButton.click();
    }
}