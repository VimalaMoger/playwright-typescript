import {test as base, expect} from '@playwright/test';
import { PageThree } from '../../pages/myjquerypage/PageThree'; 

// Entend the base test to include the page object for PageThree
const test = base.extend<{ pageThree: PageThree}>({
    pageThree: async ({page}, use) => {
        const pageThree = new PageThree(page);
        await use(pageThree);
    }
});

test('File upload test', async({ pageThree }) => {
    await pageThree.navigateTo('https://precious-scone-c844ed.netlify.app/page3');

    await pageThree.clickFileInput();
    await pageThree.clickUploadButton();
    const msg = await pageThree.getUploadStatus();

    if(msg.includes("Files uploaded successfully!")) {
        console.log('File is uploaded');
    }
    expect(msg).toContain("Files uploaded successfully!test1.txttestFile1.pdf");  
    console.log(msg);
})