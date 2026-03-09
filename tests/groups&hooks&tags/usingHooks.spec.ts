import { test, expect } from '../../fixtures/baseTest';

test.describe('Grouping multiple tests', {tag: ['@group1','@regression']}, async () => {

  test.beforeEach('Register',async ({ registerPage }) => {
    await registerPage.navigateTo('https://sweet-torte-0bf6bc.netlify.app/');
    await registerPage.assertElementVisible();
    await registerPage.clickRegisterLink();
    await registerPage.register('user10@semanticsquare.com', 'test1', 'John');  
      
  });

  test('Login', async ({ loginPage }) => {
    await loginPage.handleAlertDialog();              
    await loginPage.assertLoginDisplayTextVisible();
    await loginPage.login('user10@semanticsquare.com', 'John');
  });

  test.skip('@browserTest @sanity Browser name test', async ({ registerPage }) => {
    test.skip(await registerPage.getBrowserName() !== 'chromium', 'This test runs only on Chromium browsers');
    console.log('This test is running on Chromium browser');
  });

  test.fixme('Fixme test example', async () => {
    // This test is marked as 'fixme' and will be skipped                
  });
            
  //test('slow test example', async () => {
    //test.slow();
  //});

  test.afterEach('Verify Text Input Actions', async ({ itemsPage, confirmPage }) => {
     // itemspage assertions
    await itemsPage.assertElementVisible();     
    const maxLength = await itemsPage.getHeadingTextLength();  
    expect(maxLength).toBe(22);

    const priceArr : number[] = await itemsPage.selectAllCheckboxesAndGetPrices();                          
    const totalItemPrice : number = priceArr.reduce((acc, price) => acc + price, 0);
    expect(totalItemPrice.toFixed(2)).toBe('85.91');
    await itemsPage.clickCartButton(); 

    // confirmPage assertions
    // Radio button 
    const treatValue : number | null = await confirmPage.selectRadioButtonAndGetValue(3);
    expect(treatValue).toBe(3);

    await confirmPage.clickRequestButton();
    //  Select Tip radio button to avoid alert 
    const tipValue : number | null = await confirmPage.selectTipRadioButtonAndGetValue(0.10); 
    expect(tipValue).toBe(0.10);

    const totalTip : number = treatValue! + tipValue! * treatValue!;
    expect(totalTip).toBe(3.3);

    await confirmPage.clickRequestButton();                        
    await itemsPage.assertElementVisible();         
  });
});
