import {test, expect, Locator} from '@playwright/test';

test("XPath Axes - Ancestor, Descendant, Following, Preceding", async ({page}) => {
  // Navigate to the sample page
  await page.goto('https://glowing-scone-599a90.netlify.app/')

  //self
  const getText: Locator = page.locator('//p[text()="Toggle button will toggle"]/self::p');
  await expect(getText).toHaveText('Toggle button will toggle');

  // parent
  const getParentRow: Locator = page.locator('//p[text()="Toggle button will toggle"]/parent::body');
  await expect(getParentRow).toContainText('Show');
  //console.log(await getParentRow.textContent());

  // child element
  const getChildText: Locator  =page.locator("//div[1]/child::button");
  await expect(getChildText).toHaveCount(11);

  const getChildren: Locator  =page.locator("//div[1]/child::p");
  await expect(getChildren).toHaveCount(1);
  await expect(getChildren).toHaveText('Name: ');

  // ancestor
  const getAncestors : Locator = page.locator("//button[@id='resetHtml']/ancestor::*");
  await expect(getAncestors).toHaveCount(3);
  const getAncestorsdiv : Locator = page.locator("//button[@id='resetHtml']/ancestor::div/p");
  await expect(getAncestorsdiv).toHaveAttribute('id', 'text')

  // descendant
  const getDescendants : Locator = page.locator("//div[2]/div/descendant::div[1]");
  await expect(getDescendants).toHaveAttribute('id', 'topbar1');

  // following
  const getFollowing : Locator = page.locator("//div[1]//following::p[@id='text']");
  await expect(getFollowing).toHaveText('Name: ');

  // following-sibling
  const getFollowingSibling : Locator = page.locator("//div[1]//following-sibling::input");
  await expect(getFollowingSibling).toHaveAttribute('id', 'name');
  await expect(getFollowingSibling).toHaveValue("John Smith");

  const getFollowingSiblings : Locator = page.locator("//div[1]/following-sibling::button");
  await expect(getFollowingSiblings.nth(0)).toHaveText('Hide');

  // preceding
  const getPreceding : Locator = page.locator("//div[1]/p/preceding::h1");
  await expect(getPreceding).toHaveText('My First jQuery Web Page');

  // preceding-sibling
  const getPrecedingSibling : Locator = page.locator("//div[1]/button/preceding-sibling::p");
  await expect(getPrecedingSibling).toHaveCount(1);
});