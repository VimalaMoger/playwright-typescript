import { test as base, expect } from "playwright/test"; 
import { Webtest } from "../../pages/ui.vision/Webtest";   

// Extend the base test to include a webtest fixture
const test = base.extend<{ webtest: Webtest}>({
    webtest: async ({ page }, use) => {
        const webtest = new Webtest(page);
        await use(webtest);
    }
});

test('frames test', async ({ webtest }) => {
    await webtest.navigateTo('https://ui.vision/demo/webtest/frames/');

    //total number of frames
    await webtest.getNumberOfFrames();

    // Approach - using frames  - frame 1
    await webtest.fillFrame1();

    //child frame - iframe inside frame 3
    const childFrames = await webtest.fillFrame3();
    if(childFrames){
        console.log(`Total number of child frames in Frame3: ${childFrames.length}`);
        const radioButton = childFrames[0].getByLabel("I am a human");
        await radioButton.check();
        expect(radioButton).toBeChecked();
    }
});

