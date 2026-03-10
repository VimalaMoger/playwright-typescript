import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../foodarapp/BasePage';

export class Webtest extends BasePage {
    private frame1Input: Locator;   
    private frame3Input: Locator;
    constructor(page: Page) {
        super(page);
        this.frame1Input = page.frameLocator("[src='frame_1.html']").locator("//input[@name='mytext1']");
        this.frame3Input = page.frameLocator("[src='frame_3.html']").locator("//input[@name='mytext3']");
    }

    async getNumberOfFrames(): Promise<void> {
        const frames = this.page.frames();
        console.log(`Total number of frames: ${frames.length}`);
    }

    // Using frame 1
    async fillFrame1(): Promise<void> {
        this.frame1Input.fill("Hello Frame1 - using frame locator");
    }

    //child frame - iframe inside frame 3 - return
    async fillFrame3() {
        this.frame3Input.fill("Hello Frame3");
        const childFrames = this.page.frame({url: "https://ui.vision/demo/webtest/frames/frame_3.html"})?.childFrames();
        return childFrames;
    }
}