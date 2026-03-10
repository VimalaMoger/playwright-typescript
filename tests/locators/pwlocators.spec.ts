import { test as base } from '@playwright/test';
import { Register } from '../../pages/thrillioweb/Register';
import { Login } from '../../pages/thrillioweb/Login';

// Extend Base test to include page objects for Register and Login
const test = base.extend<{ registerPage: Register, loginPage: Login }>({
    registerPage: async ({ page }, use) => {
        const registerPage = new Register(page);
        await use(registerPage);
    },
    loginPage: async ({ page }, use) => {
        const loginPage = new Login(page);
        await use(loginPage);
    }
});


test("Verify Playwright Locators", async ({ registerPage, loginPage }) => {
  await registerPage.navigateTo('https://book-v9.onrender.com/'); 

  // Register
  await loginPage.assertElementVisible();
  await registerPage.clickRegisterHereLink();
  await registerPage.assertRegistrationFormVisible();  
  await registerPage.register('user13@semanticsquare.com', 'test', 'John', 'Doe');
  await registerPage.assertSuccessResponseVisible();  
  await registerPage.clickLoginHereLink();

  // Login
  await loginPage.login('user13@semanticsquare.com', 'test');
})