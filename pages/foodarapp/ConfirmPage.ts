import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ConfirmPage extends BasePage {
    private confirmHeading: Locator;
    private confirmMessage: Locator;
    private requestButton: Locator;
    
    constructor(page: Page) {
        super(page);
        this.confirmHeading = page.getByRole('heading', { name: 'Order Confirmation' });
        this.confirmMessage = page.getByText('Thank you for your order!');
        this.requestButton = page.getByRole('button', { name: 'Request' });
    }

    // select radio button and get its value
    async selectRadioButtonAndGetValue(option: number): Promise<number> {
        // Locate the checkbox using its name attribute and check it
        const radioButtonLocator = this.page.locator(`//input[@value=${option}]`);
        await radioButtonLocator.check();
       
        // assertion to verify radio button is selected
        await this.assertRadioButtonSelected(option);
        // Get the value of the selected radio button
        const selectedValue = await radioButtonLocator.getAttribute('value');
        return selectedValue ? parseInt(selectedValue) : 0;
    }

    // assertion to verify radio button is selected
    async assertRadioButtonSelected(option: number): Promise<void> {
        const radioButtonLocator = this.page.locator(`//input[@value=${option}]`);
        await expect(radioButtonLocator).toBeChecked();
    }

    // verify button value 
    async assertButtonValue(value: number): Promise<void> {
        const buttonLocator = this.page.locator(`//input[@value=${value}]`);
        const buttonValue = await buttonLocator.getAttribute('value');
        expect(buttonValue).toBe(value.toString());
    }

    // Tip radio button selection and get its value
    async selectTipRadioButtonAndGetValue(tipValue: number): Promise<number> {
        const tipLocator = this.page.locator(`//input[@value=${tipValue}]`);        
     
        // Wait until the radio button is visible and then check it
        await expect(tipLocator).toBeVisible({ timeout: 10000 });
        await tipLocator.check({ timeout: 10000 });
        await this.page.waitForTimeout(10000);
        await expect(tipLocator).toBeChecked({timeout: 5000});
        const selectedTipValue = await tipLocator.getAttribute('value');
        return selectedTipValue ? parseFloat(selectedTipValue) : 0;
    }

    // Click the request button
     async clickRequestButton() : Promise<void> {
        await super.click(this.requestButton);
    }

}
