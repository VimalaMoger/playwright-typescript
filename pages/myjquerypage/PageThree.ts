import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../foodarapp/BasePage';

export class PageThree extends BasePage {
   
    private readonly datePicker: Locator;
    private readonly selectedDate: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.datePicker = page.locator("#Test_Date");
        this.selectedDate = page.locator("#selectedDate");
    }  

    override async assertElementVisible(): Promise<void> {
        await super.assertElementVisible(this.datePicker);
    }

    async clickDatePicker() : Promise<void> {
        await super.click(this.datePicker);
    }

    async enterDateValue(val: string) {
        await this.datePicker.fill(val);
        await this.verifyInputValues(val);
        await this.verifyTextContent(`You selected the date: ${val}`);
    }

    async verifyInputValues(dateValue: string): Promise<void> {
        const actualDateValue = await this.datePicker.inputValue();
        expect(actualDateValue).toBe(dateValue);
    }

    async verifyTextContent(expectedText: string): Promise<void> {
        const actualText = await this.selectedDate.textContent();
        expect(actualText).toBe(expectedText);
    }
}