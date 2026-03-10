import { Page, Locator } from '@playwright/test';
import { BasePage } from '../foodarapp/BasePage';


export class PageFour extends BasePage {
    private readonly tableData: Locator;
    private readonly nextButton: Locator;
    private readonly entriesDropdown: Locator;
    private readonly searchBox: Locator; 
    private readonly nameInput: Locator;
    constructor(page: Page) {
        super(page);
        this.tableData = page.locator("#tableData tbody tr");
        this.nextButton = page.locator("button[aria-label='Next']");
        this.entriesDropdown = page.locator("#dt-length-0");
        this.searchBox = page.locator("#dt-search-0");
        this.nameInput = page.locator("#name");
    }
    
    async getTableData() {
        const rows = await this.tableData.all();
        const data = [];    
        for (let row of rows) {
            data.push(await row.innerText());
        }
        return data;
    }

    async clickNext() {
        await this.nextButton.click();
    }

    async isNextButtonDisabled() {
        const isDisabled = await this.nextButton.getAttribute('class');
        return isDisabled?.includes('disabled');
    }

    async selectEntries(entries: string) {
        await this.entriesDropdown.selectOption({label: entries});
    }

    // Search name 'Brat Steve' in the search box
    async searchForName(name: string) {
        await this.searchBox.fill(name);
    }

    async searchForData(query: string) {
        await this.searchBox.fill(query);
    }

    async getName() {
        return await this.nameInput.getAttribute('value');
    }
}