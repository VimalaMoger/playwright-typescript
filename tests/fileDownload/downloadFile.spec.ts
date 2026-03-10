import { test as base, expect } from '@playwright/test';
import { PageTwo } from '../../pages/myjquerypage/PageTwo';
import fs from 'fs';

// Extend the base test to include the page object
const test = base.extend<{pageTwo: PageTwo}>({
    pageTwo: async ({ page }, use) => {
        const pageTwo = new PageTwo(page);
        await use(pageTwo);
    }
})


test('Download a file test', async({pageTwo}) => {

    await pageTwo.navigateTo('https://precious-scone-c844ed.netlify.app/page2');

    // Measuring Download Duration
    const start = Date.now();

    const download = await pageTwo.clickDownloadLink();   
    
    const duration = Date.now() - start;
    console.log(`Download took ${duration} ms`);

    // Save the file to a specific path
    await download.saveAs('download/test.jpg');

    console.log(download.suggestedFilename());
    console.log('downloadPath', await download.path());

    //check file exists in the path using fs
    const downloadPath = 'download/test.jpg'
    const fileExists = fs.existsSync(downloadPath);
    expect(fileExists).toBeTruthy;

    if(fileExists){  
        fs.unlinkSync(downloadPath);  // delete the file after checking it exists
    }  
});