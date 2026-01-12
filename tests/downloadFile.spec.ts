import { test, expect } from '@playwright/test';

import fs from 'fs';


test('Download a file test', async({page}) => {

    test.setTimeout(120000); // Sets a 120-second timeout for this test

    await page.goto('https://calm-praline-1cf337.netlify.app/page2');

    // Start waiting for the download before clicking the event
    const downloadPromise = page.waitForEvent('download');

    // Measuring Download Duration
    const start = Date.now();

    await page.click("//a[@id='ref']");

    // Wait for the download to complete 
    const download = await downloadPromise;
    
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
        fs.unlinkSync(downloadPath);
    }

    await page.waitForTimeout(5000);   

    /*
    const [download] = await Promise.all(
        [
            page.waitForEvent('download'),
            page.click("//a[@id='ref']")
        ]
    )*/
});