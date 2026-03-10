import { Page, Locator } from '@playwright/test';
import { BasePage } from '../foodarapp/BasePage';
import { timeStamp } from 'console';

export class PageOne extends BasePage {
    private readonly selfLocator: Locator;
    private readonly parentLocator: Locator;
    private readonly childLocator: Locator;
    private readonly childrenLocator: Locator;
    private readonly ancestorLocator: Locator;
    private readonly ancestorsdivLocator: Locator;
    private readonly descendantLocator: Locator;
    private readonly descendantsButton: Locator;
    private readonly followingLocator: Locator;
    private readonly followingSiblingLocator: Locator;
    private readonly followingSiblingsLocator: Locator;
    private readonly precedingLocator: Locator;
    private readonly precedingSiblingLocator: Locator;
    constructor(page: Page) {
        super(page);
        this.selfLocator = page.locator('//p[text()="This button will toggle"]/self::p');
        this.parentLocator = page.locator('//p[text()="This button will toggle"]/parent::div');
        this.childLocator = page.locator("//div[1]/child::button");
        this.childrenLocator = page.locator("//div[1]/child::p");
        this.ancestorLocator = page.locator("//button[@id='resetHtml']/ancestor::*");
        this.ancestorsdivLocator = page.locator("//button[@id='resetHtml']/ancestor::div/p");
        this.descendantLocator = page.locator("//div[4]/descendant::div[1]");
        this.descendantsButton = this.descendantLocator.locator("button[id='topbar1']");
        this.followingLocator = page.locator("//div[1]/following::div[@id='panel']/span");
        this.followingSiblingLocator = page.locator("//div[1]//following-sibling::input");
        this.followingSiblingsLocator = page.locator("//div[1]/following-sibling::button").nth(0);
        this.precedingLocator = page.locator("//div[1]/p/preceding::h1");
        this.precedingSiblingLocator = page.locator("//div[1]/button/preceding-sibling::p");
    }   

    async getSelfText(): Promise<string | null> {
        return await this.selfLocator.textContent();
    }
    async getParentLocator(): Promise<Locator> {
        return this.parentLocator;
    }
    async getChildLocator(): Promise<Locator> {
        return this.childLocator;
    }
    async getChildrenLocator(): Promise<Locator> {
        return this.childrenLocator;
    }
    async getAncestorCount(): Promise<number> {
        return await this.ancestorLocator.count();
    }
    async getAncestorDiv(): Promise<Locator> {
        return this.ancestorsdivLocator;
    }
    async getDescendantCount(): Promise<number> {
        return await this.descendantLocator.count();
    }
    async getDescendantsButtonText(): Promise<string | null> {
        return await this.descendantsButton.textContent();
    }
    async getFollowingText(): Promise<string | null> {
        return await this.followingLocator.textContent();
    }
    async getFollowingSibling(): Promise<Locator> {
        return this.followingSiblingLocator;
    }
    async getFollowingSiblingsText(): Promise<string | null> {
        return await this.followingSiblingsLocator.textContent();
    }
    async getPrecedingText(): Promise<string | null> {  
        return await this.precedingLocator.textContent();
    }
    async getPrecedingSiblingCount(): Promise<number> {
        return await this.precedingSiblingLocator.count();
    }
}
