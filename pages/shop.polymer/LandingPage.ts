import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../foodarapp/BasePage';

export class LandingPage extends BasePage {
    private shopNowLink: Locator;
    private productLength: Locator;

    constructor(page: Page) {
        super(page);
        this.shopNowLink = page.locator("a[aria-label=\"Men's Outerwear Shop Now\"]");
        this.productLength = page.locator('div.title');
    }

    async click(){
        await this.shopNowLink.click();
    }

    async getProductLength(){
        return (await this.productLength.all()).length;
    }
}