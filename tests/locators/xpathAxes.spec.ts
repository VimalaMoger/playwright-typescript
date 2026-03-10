import {test as base, expect, Locator} from '@playwright/test';
import { PageOne } from '../../pages/myjquerypage/PageOne';

// Extend Base test by providing "PageOne" fixture
const test = base.extend<{ pageOne: PageOne}>({
    pageOne: async ({page}, use) => {
        const pageOne = new PageOne(page);
        await use(pageOne);
    }
});

test("XPath Axes - Ancestor, Descendant, Following, Preceding", async ({ pageOne }) => {

  await pageOne.navigateTo('https://precious-scone-c844ed.netlify.app/')

  //self - current node
  expect(await pageOne.getSelfText()).toBe('This button will toggle');

  // parent - single level up
  const getParentRow: Locator = await pageOne.getParentLocator();
  const pElement = getParentRow.locator('p');
  await expect(pElement).toHaveText('This button will toggle');

  // child element - single/multiple level down
  const getChildText: Locator  = await pageOne.getChildLocator();
  await expect(getChildText).toHaveCount(8);

  const getChildren: Locator  = await pageOne.getChildrenLocator();
  await expect(getChildren).toHaveCount(1);
  await expect(getChildren).toHaveText('Name: ');

  // ancestors- parent, grandparent, all top level nodes of the target element
  expect(await pageOne.getAncestorCount()).toBe(4);
  const getAncestorsdiv : Locator = await pageOne.getAncestorDiv();
  await expect(getAncestorsdiv).toHaveAttribute('id', 'text')

  // descendant- child and grandchild elements
  expect(await pageOne.getDescendantCount()).toBe(1);
  expect(await pageOne.getDescendantsButtonText()).toBe('Click to view Panel');

  // following - 
 // const following: Locator = await pageOne.getFollowingLocator();
  expect(await pageOne.getFollowingText()).toBe('This is a Panel with sample content');

  // following-sibling- 
  const getFollowingSibling : Locator = await pageOne.getFollowingSibling();
  await expect(getFollowingSibling).toHaveAttribute('id', 'name');
  await expect(getFollowingSibling).toHaveValue("");

  expect(await pageOne.getFollowingSiblingsText()).toBe('Stop the square rolling!');

  // preceding
  expect(await pageOne.getPrecedingText()).toBe('My First jQuery Web Page');

  // preceding-sibling
  expect(await pageOne.getPrecedingSiblingCount()).toBe(1);
});