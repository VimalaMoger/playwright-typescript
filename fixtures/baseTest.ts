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
    },
    registerPage: async ({ page }, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },
    itemsPage: async ({ page }, use) => {
        const itemsPage = new ItemsPage(page);
        await use(itemsPage);
    },
    confirmPage: async ({ page }, use) => {
        const confirmPage = new ConfirmPage(page);
        await use(confirmPage);
    }
});

export { expect } from '@playwright/test';