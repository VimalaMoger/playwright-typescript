import { Page, Locator } from '@playwright/test';
import { BasePage } from '../foodarapp/BasePage';

export class LandingPage extends BasePage {
    private readonly button: Locator;
    private readonly searchBox: Locator;
    private readonly suggestedOptions: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.button = page.getByRole('button', { name: '✕' });
        this.searchBox = page.locator("(//input[@placeholder='Search for Products, Brands and More'])[1]");       
        this.suggestedOptions = page.locator('ul>li');
    }   

     async clickPopup(): Promise<void> {
        await super.click(this.button);
    }
    
    async clickSearchBox(): Promise<void> {
        await super.click(this.searchBox);
    }

    async fillSearchBox(text: string): Promise<void> {
        await this.searchBox.fill(text);
        // Wait for the dropdown to appear after filling the search box
        await this.page.waitForSelector('ul>li');
        // Adding a short delay to ensure the dropdown options are fully loaded
        await this.page.waitForTimeout(1000);
    }

    async getOptions() {
        return this.suggestedOptions;
    }  
}


