import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../foodarapp/BasePage';

export class MainPage extends BasePage {
    private searchInput: Locator;
    private searchButton: Locator;
    private bookLength: Locator;

    constructor(page: Page) {
        super(page);
        this.searchInput = page.locator("#input");
        this.searchButton = page.locator("#searchButton");
        this.bookLength = page.locator('h2.title');
    }

    async performSearch(text: string) {
        await this.searchInput.fill(text);
        await this.page.keyboard.press("Enter");
    }

    async getBookLength() {
        return (await this.bookLength.all()).length;
    }
}