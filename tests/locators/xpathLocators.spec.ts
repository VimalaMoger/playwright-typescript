import { expect, Locator} from '@playwright/test';
import { test } from '../dropdown/singleSelectDropdown.spec';

test("Verify Playwright XPath Locators", async ({booksPage}) => {
  await booksPage.navigateTo('https://demowebshop.tricentis.com/');


  // Absolute XPath  
  // Relative XPath
  // XPath with contains()
  booksPage.assertElementVisible();

  // count()
  expect(await booksPage.getProductsCount()).toBeGreaterThan(0);

  // textContent(), first(), nth(), last()
  console.log("First product name", await booksPage.getProductsLocator().first().textContent());
  console.log("Last product name", await booksPage.getProductsLocator().last().textContent());
  console.log("nth product name", await booksPage.getProductsLocator().nth(1).textContent());

  // allTextContents()
  await booksPage.getProductsLocator().allTextContents().then( allNames => {
    for(const name of allNames) {
      console.log("Product Name: ", name);
    }
  });  
  
  // xpath start with
  expect(await booksPage.getProdListCount()).toBeGreaterThan(0);

  // text()
  booksPage.assertRegisterElementVisible();

  //last()
  const lastElement : Locator = await booksPage.getLastElement();
  await expect(lastElement).toBeVisible();
  console.log("Text content of last element: ", lastElement.textContent());

   // position()
  const fourthElement : Locator = await booksPage.getFourthElement();
  await expect(fourthElement).toBeVisible();
  console.log("Text content of fourth element: ", fourthElement.textContent());
})

