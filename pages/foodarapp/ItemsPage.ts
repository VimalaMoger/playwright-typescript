import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ItemsPage extends BasePage {

    private headingText: Locator;
    //select all the checkboxes
    private allCheckboxes: Locator;
    private cartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.headingText = page.getByRole("heading", { name: 'Delicious Food Service' });
        this.allCheckboxes = page.locator('input[type="checkbox"]');
        this.cartButton = page.getByRole('button', { name: 'Add to Cart' });
    }  

    override async assertElementVisible(): Promise<void> {
        await super.assertElementVisible(this.headingText);
    }

    // find length of heading text
    async getHeadingTextLength(): Promise<number> {
        const textContent = await this.headingText.textContent();
        return textContent ? textContent.length : 0;
    }

    // assertion to verify checkbox is selected
    async assertCheckboxSelected(checkboxName: string): Promise<void> {
        const checkboxLocator = this.page.locator(`//input[@name='${checkboxName}']`);
        await expect(checkboxLocator).toBeChecked();
    }

    // method to select all checkboxes and return their corresponding prices
    async selectAllCheckboxesAndGetPrices(): Promise<number[]> {
        const checkboxes: Locator[] = await this.allCheckboxes.all();
        const priceArr: number[] = [];
        for (let index = 0; index < checkboxes.length; index++) {
            await checkboxes[index].check({ force: true });
            const priceText = await this.page.locator(`//tr[${index + 1}]/td[3]`).textContent();
            if (priceText) {
                priceArr.push(parseFloat(priceText));
            }
        }
        return priceArr;
    }

    // click on add to cart button
    async clickCartButton(): Promise<void> {
        await this.cartButton.click();
    }

}


  // Select all checkboxes and get their corresponding prices using map function
    /* const priceArr  = await Promise.all(checkboxes.map(async (checkbox, index) => {
        await checkbox.check({ force: true });
        return await page.locator(`//tr[${index+1}]/td[3]`).textContent();
    })); */
