import { test } from "@playwright/test";


test("Keyboard Actions Test", async ({ page }) => {

    await page.goto("https://resplendent-pony-e08064.netlify.app/");

    const nameInputField = page.locator("//input[@id='name']");
    
    await nameInputField.click();
    await nameInputField.clear();

    //insertText
    await page.keyboard.type("John Doe");

    //select all text
    await page.keyboard.press("Control+A"); 

    //copy text
    await page.keyboard.press("Control+C");    

    // Retrieve the value from the input and print to console
    const inputValue = await nameInputField.inputValue();
    console.log("Input Value after copy-paste:", inputValue);

    await page.waitForTimeout(5000);
});