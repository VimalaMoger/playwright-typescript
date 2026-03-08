import { test as base, Page as page, expect } from '@playwright/test';
import { BooksPage } from '../../pages/tricentis/BooksPage';


// Extend basic test by providing a "BooksPage" fixture
const test = base.extend<{ booksPage: BooksPage }>({
    booksPage: async ({ page }, use) => {
        const booksPage = new BooksPage(page);
        await use(booksPage);
    },
});


test("Single Select Drop down", async ({booksPage}) => {

    await booksPage.navigateTo("https://demowebshop.tricentis.com/books");

    // Locate the dropdown element
    await booksPage.selectOption({index:2});

    
    const options : string[] = await booksPage.getAllOptions();
    
    expect(options).toContain('Position');

    for (const option of [... options.sort()]) {
        console.log(option);
    }
});