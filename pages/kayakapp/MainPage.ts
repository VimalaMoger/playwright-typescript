import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../foodarapp/BasePage';

export class MainPage extends BasePage {   
    private readonly check_in_date: Locator;
    private readonly monthYearText: Locator;
    private readonly nextButton: Locator;
    private readonly selectCheckinMonthDays: Locator;
    private readonly selectCheckoutMonthDays: Locator;

    constructor(public readonly page: Page) {
        super(page);
        this.check_in_date = page.locator("//span[@class='yx0f-placeholder'][text()='Departure']");
        this.monthYearText = page.locator('.OV9e-tbl-wrapper caption').nth(0);
        this.nextButton = page.locator("//div[@aria-label='Next Month']");
        this.selectCheckinMonthDays = page.locator(".OV9e-tbl-wrapper div:nth-child(2) tbody").nth(0).locator('td');
        this.selectCheckoutMonthDays = page.locator(".OV9e-tbl-wrapper div:nth-child(3) tbody").locator('td');
    }  

    override async navigateTo(url: string): Promise<void> {
        await super.navigateTo(url);
    }

    async clickCheckInDate() : Promise<void> {
        await super.click(this.check_in_date);
    }

    // Check-in date user wants to select
    async select_year_month_day(checkinYear: number, checkinMonth: number, checkinDay: number, nextPage: boolean) {
        while (nextPage) {
            const monthYearText = await this.monthYearText.innerText();  
            const [monthName, year] = monthYearText!.split(' '); 
            const monthNumber = new Date(`${monthName} 1, ${year}`).getMonth() + 1;

            if (parseInt(year) === checkinYear && monthNumber === checkinMonth) {
                break;
            } else {
                const isDisabled = await this.nextButton.getAttribute('class');
                if (isDisabled?.includes('disabled')) {
                    nextPage = false;
                } else {
                    await this.nextButton.click();
                }
            }
        }
    }

    // Select the specific day for check-in
    async select_specific_day(checkinDay?: number, checkoutDay?: number): Promise<void> {
        let checkinDaySelected = false;
        if (typeof checkinDay !== 'undefined') {
            for (let day of await this.selectCheckinMonthDays.all()) {
                const dayText = await day.innerText();
                if (dayText === checkinDay.toString()) {
                await day.click();
                checkinDaySelected = true;
                break;
                }
            }
        }else if (typeof checkoutDay !== 'undefined') {
            for (let day of await this.selectCheckoutMonthDays.all()) {
                const dayText = await day.innerText();
                if (dayText === checkoutDay.toString()) {
                    await day.click();
                    checkinDaySelected = true;
                    break;
                }
            }        
        }
        expect(checkinDaySelected).toBeTruthy();
    }        
}