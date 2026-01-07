import {test} from '@playwright/test';



test('Infinite- Scroll to bottom for auto-loading pages', async({page}) => {

    //test.slow();
    test.setTimeout(120000); // Sets a 120-second timeout for this test
    await page.goto('https://www.booksbykilo.in/new-books?precerange=201to500');


    //js
    let previousHt = 0;

    while(true) {


        //scroll down by one viewport height- full height of the page
        await page.evaluate( () => {  
            window.scrollBy(0, document.body.scrollHeight);  
        });
        
        await page.waitForTimeout(2000);
        // Wait a bit to see new content load
           
        //get current height
        const currentHeight = await page.evaluate( () => {
            return document.body.scrollHeight;            
        });
        
        //print heights
        console.log("Previous ht ", previousHt, " Current ht ", currentHeight);

        //if heights are same, break the loop
        if(currentHeight === previousHt) {
            break;
        }
        previousHt = currentHeight;  //update previous height
    }
    console.log("Reached the bottom of the page");
});

test.only("Find book by scrolling", async({page}) => {

    test.setTimeout(120000); // Sets a 120-second timeout for this test

    await page.goto('https://www.booksbykilo.in/new-books?precerange=201to500');

    //js
    let previousHt = 0;
    let bookNotFound = false;

    while(true) {

        const titles = await page.locator("#productsDiv div h3").allInnerTexts();
    
        if(titles.includes("Firesong")) {
            console.log("Book found");
            bookNotFound = true;
            break;
        }

        //scroll down by one viewport height
        await page.evaluate( () => {  
            window.scrollBy(0, document.body.scrollHeight);  
        });
       
        await page.waitForTimeout(2000);
        // Wait a bit to see new content load

        const currentHeight = await page.evaluate( () => {
            return document.body.scrollHeight;            
        })
        console.log("Previous ht ", previousHt, " Current ht ", currentHeight);
        if(currentHeight === previousHt) {
            break;
        } else {
            previousHt = currentHeight;
        }
    }

    if(!bookNotFound) {
        console.log("Book not found");
    }

});