import { test, expect, Locator } from '@playwright/test';


test("Verify Playwright Locators", async ({page}) => {
  await page.goto('https://book-v9.onrender.com/');
 

  const loginText:Locator = page.getByRole("heading", { name: 'Login Form' }); //getByRole
  await expect(loginText).toBeVisible({timeout:50000});

  await page.getByRole("link", { name: 'Register here' }).click();

  const registerText:Locator = page.getByRole("heading", { name: 'Registration Form' }); 
  await expect(registerText).toBeVisible({timeout:50000});
 
  
  const emailField = page.locator('#email');
  await emailField.fill('user13@semanticsquare.com');

  const passwordField = page.locator('#password');
  await passwordField.fill('test');

  const firstNameField = page.locator('#firstName');
  await firstNameField.fill('John');

  const lastNamefield = page.locator('#lastName');
  await lastNamefield.fill('Doe');

  await page.getByRole("button", { name: 'Register' }).click();

  const registrationCompletedText:Locator = page.getByText("You have been successfully registered!"); //getByText
  await expect(registrationCompletedText).toBeVisible();    

  await page.getByRole("link", { name: 'Login here' }).click();

  const emailField1 = page.locator('#email');
  await emailField1.fill('user13@semanticsquare.com');

  const passwordField1 = page.locator('#password');
  await passwordField1.fill('test');

  await page.getByRole("button", { name: 'Login' }).click();
})