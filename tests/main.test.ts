import { chromium, Browser, Page, selectors } from "playwright";
import { test, expect } from '@playwright/test';
import { screen } from  '@testing-library/react';

function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}

// LOGIN PAGE // 

   test("Home Page Should Have The Correct Title", async ({ page }) => { 
    test.setTimeout(10 * 1000);  
    await page.goto("http://127.0.0.1:3000/login");
    await expect(page).toHaveURL('http://127.0.0.1:3000/login');
     console.log(await page.title());
     expect(await page.title()).toBe("Login");
   });

   test("Page Heading is Correct", async ({ page }) => {
    test.setTimeout(10 * 1000);  
    await page.goto("http://127.0.0.1:3000/login");
    const heading = await page.locator('h1').textContent(); 
    await expect(page).toHaveURL('http://127.0.0.1:3000/login');
    console.log(heading);
    expect(heading).toBe('My TypeScript Project');
   });

   test('Login Button Test Text', async ({ page }) => {
    test.setTimeout(10 * 1000);  
    await page.goto("http://127.0.0.1:3000/login");
    await expect(page).toHaveURL('http://127.0.0.1:3000/login');
    const buttonText = await page.locator('text=Login >> nth=0').textContent();
    console.log(buttonText);
    expect(await buttonText).toBe("Login");
    await page.locator('text=Login >> nth=0').click({force: true});
  });

  test('Login Fail Functionality Test', async ({}) => {
    const browser = await chromium.launch({headless : false});
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:3000/login");
    await expect(page).toHaveURL('http://127.0.0.1:3000/login');
    await page.locator('[placeholder="E-mail Address"]').click();
    await page.locator('[placeholder="E-mail Address"]').fill('wrongemail@gmail.com');
    await page.locator('[placeholder="Password"]').click();
    await page.locator('[placeholder="Password"]').fill('password123');
    await page.locator('text=Login >> nth=0').click();
    const login = await page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    expect(await login).toHaveProperty("_guid");
    await delay(1000);
    await browser.close();
  });

  test('Login Success Functionality Test', async ({}) => {
    const browser = await chromium.launch({headless : false});
    const page = await browser.newPage();
    await page.goto("http://127.0.0.1:3000/login");
    await page.locator('[placeholder="E-mail Address"]').click();
    await page.locator('[placeholder="E-mail Address"]').fill('test123456@gmail.com');
    await page.locator('[placeholder="Password"]').click();
    await page.locator('[placeholder="Password"]').fill('password123');
    await page.locator('text=Login >> nth=0').click();
    await delay(3000);
    expect (await page.goto("http://127.0.0.1:3000/home"));
    await expect(page).toHaveURL('http://127.0.0.1:3000/home');

    await delay(1000);
    await browser.close();
  });

  test('Login With Google Button Test', async ({ page }) => {
    await page.goto("http://127.0.0.1:3000/login");
    const button = await page.locator('button').nth(1);
    console.log(button);
    expect(await button).toBeVisible;
    const [page1] = await Promise.all([
      page.waitForEvent('popup'),
      page.locator('button').nth(1).click()
    ]);
  });

  // Login - Navigation Testing //

  test('Open Forget Password from Login', async function () {
    const browser = await chromium.launch({headless : false});
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:3000/login');
    await expect(page).toHaveURL('http://127.0.0.1:3000/login');
    await page.locator('text=Forgot Password').click();
    await expect(page).toHaveURL('http://127.0.0.1:3000/reset');
    await expect(page).toHaveURL('http://127.0.0.1:3000/reset');
    await delay(1000);
    await browser.close();
  });

  test('Open Register from Login', async function () {
    const browser = await chromium.launch({headless : false});
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:3000/login');
    await expect(page).toHaveURL('http://127.0.0.1:3000/login');
    await page.locator('text=Register').click();
    await expect(page).toHaveURL('http://127.0.0.1:3000/register');
    await expect(page).toHaveURL('http://127.0.0.1:3000/register');
    await delay(1000);
    await browser.close();
  });

    // RESET PAGE //

    test('Password Reset', async function () {
      const browser = await chromium.launch({headless : false});
      const page = await browser.newPage();
      await page.goto('http://127.0.0.1:3000/reset');
      await expect(page).toHaveURL('http://127.0.0.1:3000/reset');
      await page.locator('[placeholder="E-mail Address"]').click();
      await page.locator('[placeholder="E-mail Address"]').fill('test123456@gmail.com');
      await page.locator('text=Send password reset email').click();
      await delay(1000);
      await browser.close();
    });

    // Reset - Navigation Testing //

    test('Open Register from Reset', async function () {
      const browser = await chromium.launch({headless : false});
      const page = await browser.newPage();
      await page.goto('http://127.0.0.1:3000/login');
          await expect(page).toHaveURL('http://127.0.0.1:3000/login');
      await page.locator('text=Forgot Password').click();
      await expect(page).toHaveURL('http://127.0.0.1:3000/reset');
      await expect(page).toHaveURL('http://127.0.0.1:3000/reset');
      await delay(1000);
      await browser.close();
    });

    // REGISTER PAGE //

    test('Register Fail Functionality Test', async ({}) => {
      const browser = await chromium.launch({headless : false});
      const page = await browser.newPage();
      await page.goto("http://127.0.0.1:3000/register");
      await expect(page).toHaveURL('http://127.0.0.1:3000/register');
      await page.locator('[placeholder="E-mail Address"]').click();
      await page.locator('[placeholder="E-mail Address"]').fill('wrongemail@gmail.com');
      await page.locator('[placeholder="Password"]').click();
      await page.locator('[placeholder="Password"]').fill('password123');
      await page.locator('text=Login >> nth=0').click();
      const login = await page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
      });
      expect(await login).toHaveProperty("_guid");
      await browser.close();
    });

    // test('Register Success Functionality Test', async ({}) => {
    //   const browser = await chromium.launch({headless : false});
    //   const page = await browser.newPage();
    //   await page.goto("http://127.0.0.1:3000/register");
    //   await expect(page).toHaveURL('http://localhost:3000/register');
    //   await page.locator('[placeholder="Full Name"]').click();
    //   await page.locator('[placeholder="Full Name"]').fill('newname');//needs changed each test or will fail
    //   await page.locator('[placeholder="E-mail Address"]').click();
    //   await page.locator('[placeholder="E-mail Address"]').fill('newemail@gmail.com');//needs changed each test or will fail
    //   await page.locator('[placeholder="Password"]').click();
    //   await page.locator('[placeholder="Password"]').fill('newpassword');//needs changed each test or will fail
    //   await page.locator('text=Register').click();
    //   await delay(3000);
    //   expect (await page.goto("http://127.0.0.1:3000/home"));
    //   await expect(page).toHaveURL('http://localhost:3000/home');

    //   await delay(1000);
    //   await browser.close();
    // });
  
    test('Register With Google Button Test', async ({ page }) => {
      await page.goto("http://127.0.0.1:3000/register");
      await expect(page).toHaveURL('http://127.0.0.1:3000/register');
      const [page1] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('button').nth(1).click()
      ]);
    });
  
    // Register - Navigation Testing //

    test('Open Login from Register', async function () {
      const browser = await chromium.launch({headless : false});
      const page = await browser.newPage();
      await page.goto('http://127.0.0.1:3000/register');
      await expect(page).toHaveURL('http://127.0.0.1:3000/register');
      await page.locator('text=Login').click();
      await expect(page).toHaveURL('http://127.0.0.1:3000/login');
      await expect(page).toHaveURL('http://127.0.0.1:3000/login');
      await delay(1000);
      await browser.close();
    });

    // HOME PAGE //

    test('Home Page Welcome Element Check', async ({}) => {
      const browser = await chromium.launch({headless : false});
      const page = await browser.newPage();
      await page.goto("http://127.0.0.1:3000/login");
      await page.locator('[placeholder="E-mail Address"]').click();
      await page.locator('[placeholder="E-mail Address"]').fill('test123456@gmail.com');
      await page.locator('[placeholder="Password"]').click();
      await page.locator('[placeholder="Password"]').fill('password123');
      await page.locator('text=Login >> nth=0').click();
      await delay(1000);
      await expect(page).toHaveURL('http://127.0.0.1:3000/home');

      const welcome = await page.locator('dashboard__container')
      expect(await welcome).toBeVisible;

      await delay(1000);
      await browser.close();
    });

    // NAV BAR //

    test('Navigation Check', async ({}) => {
      const browser = await chromium.launch({headless : false});
      const page = await browser.newPage();
      await page.goto("http://127.0.0.1:3000/login");
      await page.locator('[placeholder="E-mail Address"]').click();
      await page.locator('[placeholder="E-mail Address"]').fill('test123456@gmail.com');
      await page.locator('[placeholder="Password"]').click();
      await page.locator('[placeholder="Password"]').fill('password123');
      await page.locator('text=Login >> nth=0').click();
      await delay(1000);
      await expect(page).toHaveURL('http://127.0.0.1:3000/home');

      await page.locator('text=Home').click();
      await expect(page).toHaveURL('http://127.0.0.1:3000/home');

      await page.locator('text=Projects').click();
      await expect(page).toHaveURL('http://127.0.0.1:3000/projects');

      await page.locator('text=Logout').click();
      await expect(page).toHaveURL('http://127.0.0.1:3000/login');

      await delay(1000);
      await browser.close();
    });
    
    // PROJECTS PAGE //

    test.only('Card Functionality Check', async ({}) => {
      const browser = await chromium.launch({headless : false});
      const page = await browser.newPage();
      await page.goto("http://127.0.0.1:3000/login");
      await page.locator('[placeholder="E-mail Address"]').click();
      await page.locator('[placeholder="E-mail Address"]').fill('test123456@gmail.com');
      await page.locator('[placeholder="Password"]').click();
      await page.locator('[placeholder="Password"]').fill('password123');
      await page.locator('text=Login >> nth=0').click();
      await delay(1000);
      await expect(page).toHaveURL('http://127.0.0.1:3000/home');

      await page.locator('text=Projects').click();
      await expect(page).toHaveURL('http://127.0.0.1:3000/projects');

      await page.locator('.bordered').first().click();
      await page.locator('text=Save').click();
      await page.locator('.bordered').first().click();
      await page.locator('text=cancel').click();

      await delay(1000);
      await browser.close();
    });