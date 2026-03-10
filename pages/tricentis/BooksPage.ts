import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../foodarapp/BasePage';


export class BooksPage extends BasePage {
    private readonly dropdown: Locator;
    private readonly options: Locator;
    private readonly productTitles: Locator;
    private readonly absolutePath: Locator;
    private readonly relativePath: Locator;
    private readonly logoContains: Locator;
    private readonly products: Locator;
    private readonly prodList: Locator;
    private readonly regLink: Locator;
    private readonly lastElement: Locator;
    private readonly fourthElement: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.dropdown = page.locator("//select[@id='products-orderby']");
        this.options = page.locator("//select[@id='products-orderby']/option");
        this.productTitles = page.locator('.product-title');
        this.absolutePath = page.locator("xpath = /html/body/div[4]/div/div/div/a/img[1]");
        this.relativePath = page.locator("//img[@alt='Tricentis Demo Web Shop']");
        this.logoContains = page.locator("//img[contains(@alt, 'Tricentis Demo Web Shop')]");
        this.products = page.locator("//h2/a[contains(@href,'computer')]");
        this.prodList = page.locator("//h2/a[starts-with(@href,'/build')]");
        this.regLink = page.locator("//a[text()='Register']");
        this.lastElement = page.locator("//div[@class='column follow-us']//li[last()]");
        this.fourthElement = page.locator("//div[@class='column follow-us']//li[position()=3]");
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

    async getProductTitles(): Promise<Locator> {
        return this.productTitles;
    }

    async assertElementVisible() {
        super.assertElementVisible(this.absolutePath);
        super.assertElementVisible(this.relativePath);
        super.assertElementVisible(this.logoContains);
    }
    
    // Get products locator
    getProductsLocator(): Locator {
        return this.products;
    }

    // Get products count
    async getProductsCount(): Promise<number> {
        return await this.products.count();
    }

    async getProdListCount(): Promise<number> {
        return await this.prodList.count();
    }

    async assertRegisterElementVisible() {
        super.assertElementVisible(this.regLink);
    }

    async getLastElement(): Promise<Locator> {
        return this.lastElement;
    }

    async getFourthElement(): Promise<Locator> {    
        return this.fourthElement;
    }
}

