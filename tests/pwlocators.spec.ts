import { test, expect, Locator } from '@playwright/test';
import { time } from 'console';


// page.getByRole() to locate by explicit and implicit accessibility attributes.
// page.getByText() to locate by text content.
// page.getByLabel() to locate a form control by associated label's text.
// page.getByPlaceholder() to locate an input by placeholder.
// page.getByAltText() to locate an element, usually image, by its text alternative.
// page.getByTitle() to locate an element by its title attribute.
// page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).


test("Verify Playwright Locators", async ({page}) => {
  await page.goto('https://demo.nopcommerce.com/');
  const logo : Locator = page.getByAltText('nopCommerce demo store')
  await expect(logo).toBeVisible();

  await expect(page.getByText("Welcome to our store")).toBeVisible();


  await page.getByRole("link", { name: 'Register' }).click();

  const registerText:Locator = page.getByRole("heading", { name: 'Register' }); //getByRole
  await expect(registerText).toBeVisible({timeout:50000});
 
  await page.getByLabel('First name:').fill('John'); //getByLabel
  await page.getByLabel('Last name:').fill('Wick');
  await page.getByLabel('Email:').fill('john.wick@example.com');
  await page.getByLabel('Password:').fill('John@1234');
  await page.getByLabel('Confirm password:').fill('John@1234');

  await page.getByRole("button", { name: 'Register' }).click(); //getByRole

  const registrationCompletedText:Locator = page.getByText("Your registration completed"); //getByText
  await expect(registrationCompletedText).toBeVisible();    

  
})