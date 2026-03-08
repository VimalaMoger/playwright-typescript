import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../foodarapp/BasePage';


export class BooksPage extends BasePage {
    private readonly dropdown: Locator;
    private readonly options: Locator;
    constructor(public readonly page: Page) {
        super(page);
        this.dropdown = page.locator("//select[@id='products-orderby']");
        this.options = page.locator("//select[@id='products-orderby']/option");
    }

    // Select an option from the dropdown by index
    async selectOption({index}: {index: number}) {
        await this.dropdown.selectOption({index});
    }

    // Get all options from the dropdown
    async getAllOptions(): Promise<string[]> {
        await expect(this.options).toHaveCount(6);
        const optionsText = await this.options.allTextContents();
        return optionsText.map(option => option.trim());
    }
}

