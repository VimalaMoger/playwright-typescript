import {test} from '../../fixtures/baseTest';
import {expect} from '@playwright/test';

test.use({ actionTimeout: 10000 });
test('Verify Text Input Actions', async ({registerPage, loginPage, itemsPage, confirmPage}) => {

    // Navigate to url
    await registerPage.navigateTo('https://sweet-torte-0bf6bc.netlify.app/');

    // Verify register button visible and clickable
    await registerPage.assertElementVisible();
    await registerPage.clickRegisterLink();
    await registerPage.register('user10@semanticsquare.com', 'test1', 'John');
    await registerPage.handleAlertDialog();

    // Verify login page successfully loaded
    await loginPage.assertLoginDisplayTextVisible();

    // fill the login form with registered data
    await loginPage.login('user10@semanticsquare.com', 'John'); 
    
    // Verify resource(items) page displayed after login
    await itemsPage.assertElementVisible();

    // Verify length of heading text on items page
    const maxLength = await itemsPage.getHeadingTextLength();  
    expect(maxLength).toBe(22);

    const priceArr : number[] = await itemsPage.selectAllCheckboxesAndGetPrices();
              
    const totalItemPrice : number = priceArr.reduce((acc, price) => acc + price, 0);
    expect(totalItemPrice.toFixed(2)).toBe('85.91');

    // Add to cart button click
    await itemsPage.clickCartButton();

    // Radio button 
    const treatValue : number | null = await confirmPage.selectRadioButtonAndGetValue(3);
    expect(treatValue).toBe(3);

    await confirmPage.clickRequestButton();

    // Handle the alert dialog and verify its message
    //await confirmPage.handleAlertDialog();

    //  Select Tip radio button to avoid alert 
    const tipValue : number | null = await confirmPage.selectTipRadioButtonAndGetValue(0.10); 
    expect(tipValue).toBe(0.10);

    const totalTip : number = treatValue + tipValue * treatValue;
    expect(totalTip).toBe(3.3);

    //await confirmPage.handleAlertDialog();
    await confirmPage.clickRequestButton();
    await confirmPage.handleAlertDialog();
              
    await itemsPage.assertElementVisible();     
});
