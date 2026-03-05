import { Page,expect, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;   
    constructor(page: Page) {
        this.page = page;        
    }
    /**
     * Navigate to a specified URL
     * @param url - The URL to navigate to  
     */
    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    // Assert element visible
    async assertElementVisible(locator: Locator) {
        await expect(locator).toBeVisible({ timeout:50000 });
    }
    
    async click(locator: Locator) {
        await locator.click();
    }   

     // Global dialog handler
    async handleAlertDialog() {
        this.page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept(); // or dialog.dismiss()
        });
    }
}