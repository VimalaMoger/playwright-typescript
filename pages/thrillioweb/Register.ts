import { Page, Locator } from '@playwright/test';
import { BasePage } from '../foodarapp/BasePage';

export class Register extends BasePage {
    private registerHereLink: Locator;
    private displayText: Locator;
    private emailField: Locator;
    private passwordField: Locator;
    private firstNameField: Locator;
    private lastNamefield: Locator;
    private registerButton: Locator;   
    private registrationSuccessResponse: Locator;
    private loginHereLink: Locator;

    constructor(page: Page) {
        super(page);
        this.registerHereLink = page.getByRole("link", { name: 'Register here' });
        this.displayText = page.getByRole("heading", { name: 'Registration Form' }); 
        this.emailField = page.locator('#email');
        this.passwordField = page.locator('#password');
        this.firstNameField = page.locator('#firstName');
        this.lastNamefield = page.locator('#lastName');
        this.registerButton = page.getByRole("button", { name: 'Register' });
        this.registrationSuccessResponse = page.getByText("You have been successfully registered!")
        this.loginHereLink = page.getByRole("link", { name: 'Login here' });
    }
    
    async clickRegisterHereLink() {
        await this.registerHereLink.click();
    }  

    // visibility of Display text
    async assertRegistrationFormVisible() {
        super.assertElementVisible(this.displayText);
    } 

    async register(email: string, password: string, firstName: string, lastName: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.firstNameField.fill(firstName);
        await this.lastNamefield.fill(lastName);
        await this.registerButton.click();
     }

    // visibility of Display text
    async assertSuccessResponseVisible() {
        super.assertElementVisible(this.registrationSuccessResponse);
    } 

    async clickLoginHereLink() {
        await this.loginHereLink.click();
    }  
}

