import { test, expect } from "playwright/test";    

test('frames test', async ({page}) => {
    await page.goto('https://ui.vision/demo/webtest/frames/');

    //total number of frames

    const frames = page.frames();
    console.log(`Total number of frames: ${frames.length}`);

    // Approach - using frames  - frame 1
    const frame1= page.frame({url: "https://ui.vision/demo/webtest/frames/frame_1.html"});
    if(frame1){
        frame1.locator("//input[@name='mytext1']").fill("Hello Frame1");
    }
    await page.waitForTimeout(5000);

    // Approach - using frame locator with css  - frame 1
    page.frameLocator("[src='frame_1.html']").locator("//input[@name='mytext1']").fill("Hello Frame1 - using frame locator");
    await page.waitForTimeout(5000);

    //child frame - iframe inside frame 3
    const childFrame = page.frame({url: "https://ui.vision/demo/webtest/frames/frame_3.html"});
     if(childFrame){
        childFrame.locator("//input[@name='mytext3']").fill("Hello Frame3");
        const childFrames = childFrame.childFrames();
        console.log(`Total number of child frames in Frame3: ${childFrames.length}`);
        const radioButton = childFrames[0].getByLabel("I am a human");
        await radioButton.check();
        expect(radioButton).toBeChecked();
    }
});