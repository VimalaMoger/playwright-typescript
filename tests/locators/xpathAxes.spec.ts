import {test, expect, Locator} from '@playwright/test';
import { get } from 'http';

test("XPath Axes - Ancestor, Descendant, Following, Preceding", async ({page}) => {
  // Navigate to the sample page
  await page.goto('https://resplendent-pony-e08064.netlify.app/')

  //self - current node
  const getText: Locator = page.locator('//p[text()="This button will toggle"]/self::p');
  await expect(getText).toHaveText('This button will toggle');

  // parent - single level up
  const getParentRow: Locator = page.locator('//p[text()="This button will toggle"]/parent::div');
  const pElement = getParentRow.locator('p');
  await expect(pElement).toHaveText('This button will toggle');

  // child element - single/multiple level down
  const getChildText: Locator  = page.locator("//div[1]/child::button");
  await expect(getChildText).toHaveCount(4);

  const getChildren: Locator  = page.locator("//div[1]/child::p");
  await expect(getChildren).toHaveCount(1);
  await expect(getChildren).toHaveText('Name: ');

  // ancestors- parent, grandparent, all top level nodes of the target element
  const getAncestors : Locator = page.locator("//button[@id='resetHtml']/ancestor::*");
  await expect(getAncestors).toHaveCount(3);
  const getAncestorsdiv : Locator = page.locator("//button[@id='resetHtml']/ancestor::div/p");
  await expect(getAncestorsdiv).toHaveAttribute('id', 'text')

  // descendant- child and grandchild elements
  const getDescendants : Locator = page.locator("//div[5]/descendant::div[1]");
  await expect(getDescendants).toHaveCount(1);
  const getDescendantsButton = getDescendants.locator("div");
  await expect(getDescendantsButton).toHaveText('View Smaller');

  // following - 
  const getFollowing : Locator = page.locator("//div[1]/following::div[@id='panel']/span");
  await expect(getFollowing).toHaveText('This is a Panel with sample content');

  // following-sibling- 
  const getFollowingSibling : Locator = page.locator("//div[1]//following-sibling::input");
  await expect(getFollowingSibling).toHaveAttribute('id', 'name');
  await expect(getFollowingSibling).toHaveValue("John Smith");

  const getFollowingSiblings : Locator = page.locator("//div[1]/following-sibling::button");
  await expect(getFollowingSiblings.nth(0)).toHaveText('Stop the square rolling!');

  // preceding
  const getPreceding : Locator = page.locator("//div[1]/p/preceding::h1");
  await expect(getPreceding).toHaveText('My First jQuery Web Page');

  // preceding-sibling
  const getPrecedingSibling : Locator = page.locator("//div[1]/button/preceding-sibling::p");
  await expect(getPrecedingSibling).toHaveCount(1);
});