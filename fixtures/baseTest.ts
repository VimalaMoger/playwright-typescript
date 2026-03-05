import { test as base, Page as page } from '@playwright/test';
import { LoginPage } from '../pages/foodarapp/LoginPage';
import { RegisterPage } from '../pages/foodarapp/RegisterPage';
import { ItemsPage } from '../pages/foodarapp/itemsPage';
import { ConfirmPage } from '../pages/foodarapp/ConfirmPage';

// Defice custom fixtures
type Fixtures = {
    loginPage: LoginPage;
    registerPage: RegisterPage;
    itemsPage: ItemsPage;
    confirmPage: ConfirmPage;
};

// Extend the base test with our custom fixtures
export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {   
        const loginPage = new LoginPage(page);
        await use(loginPage);
        //await page.close();
    },
    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
        //await page.close();
    },
    itemsPage: async ({ page }, use) => {
        const itemsPage = new ItemsPage(page);
        await use(itemsPage);
        //await page.close();
    },
    confirmPage: async ({ page }, use) => {
        const confirmPage = new ConfirmPage(page);
        await use(confirmPage);
        //await page.close();
    }
});

export { expect } from '@playwright/test';