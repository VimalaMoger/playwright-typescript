import { Page, Locator } from '@playwright/test';
import { BasePage } from '../foodarapp/BasePage';

export class PageTwo extends BasePage {
    private readonly downloadLink: Locator;
    constructor(page: Page) {
        super(page);
        this.downloadLink = page.getByAltText('Art');
    }

    async clickDownloadLink(): Promise<any> {
        // Start waiting for the download before clicking the event
        const downloadPromise = this.page.waitForEvent('download');
        await super.click(this.downloadLink);
        // Wait for the download to complete 
        const download = await downloadPromise;
        return download;
    }

}




/*    const [download] = await Promise.all(
        [
            page.waitForEvent('download'),
            page.click("//a[@id='ref']")
        ]
    )*/