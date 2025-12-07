import {test, expect, Locator} from '@playwright/test';


test("Verify Playwright XPath Locators", async ({page}) => {
  await page.goto('https://demowebshop.tricentis.com/');


  // Absolute XPath
  const pathLink : Locator = page.locator("xpath = /html/body/div[4]/div/div/div/a/img[1]");
  await expect(pathLink).toBeVisible();

  // Relative XPath
  const logo: Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']");
  await expect(logo).toBeVisible();

  // XPath with contains()
  const logoContains: Locator = page.locator("//img[contains(@alt, 'Tricentis Demo Web Shop')]");
  await expect(logoContains).toBeVisible();

  // count()
  const products: Locator = page.locator("//h2/a[contains(@href,'computer')]");
  const productCount = await products.count();
  expect(productCount).toBeGreaterThan(0);

  // textContent(), first(), nth(), last()
  console.log("First product name", await products.first().textContent());
  console.log("Last product name", await products.last().textContent());
  console.log("nth product name", await products.nth(1).textContent());

  // allTextContents()
  await products.allTextContents().then( allNames => {
    for(const name of allNames) {
      console.log("Product Name: ", name);
    }
  });
  //output the names of all products
  //Product Name:  Build your own cheap computer
  //Product Name:  Build your own computer
  //Product Name:  Build your own expensive computer
  //Product Name:  Simple Computer  
  
  // xpath start with
  const prodList: Locator = page.locator("//h2/a[starts-with(@href,'/build')]");
  const prodCount = await prodList.count();
  await expect(prodCount).toBeGreaterThan(0);

  // text()
  const regLink: Locator = page.locator("//a[text()='Register']");
  await expect(regLink).toBeVisible();

  //last()
  const lastElement : Locator = page.locator("//div[@class='column follow-us']//li[last()]");
  await expect(lastElement).toBeVisible();
  console.log("Text content of last element: ", lastElement.textContent());

   // position()
  const fourthElement : Locator = page.locator("//div[@class='column follow-us']//li[position()=3]");
  await expect(fourthElement).toBeVisible();
  console.log("Text content of fourth element: ", fourthElement.textContent());
})

