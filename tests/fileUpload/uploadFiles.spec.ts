import {test, expect} from '@playwright/test';


test('File upload test', async({page}) => {

    await page.goto('https://calm-praline-1cf337.netlify.app/page3');

    await page.locator('#file').setInputFiles(['upload/test1.txt', 'upload/testFile1.pdf']);

    await page.locator('#uploadbutton').click();

    const msg = await page.locator('#uploadStatus').allTextContents();

    if(msg.includes("Files uploaded successfully!")) {
        console.log('File is uploaded');
    }

    expect(msg).toContain("Files uploaded successfully!test1.txttestFile1.pdf");
  

    console.log(msg);

    await page.waitForTimeout(5000);
})