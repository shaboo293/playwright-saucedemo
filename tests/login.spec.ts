import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('https://www.saucedemo.com/');
});

test('login with invalid username', async ({page}) => {
    // Enter invalid username
    await page.locator('#user-name').fill('invalid-user');
    // Enter valid password
    await page.locator('#password').fill('secret_sauce');
    // Click the login button
    await page.locator('#login-button').click();

    // Expect an error message to be visible
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText("Username and password do not match any user in this service")
});

test('login with invalid password', async ({page}) => {
    // Enter valid username
    await page.locator('#user-name').fill('standard_user');
    // Enter invalid password
    await page.locator('#password').fill('invalid-password');
    // Click the login button
    await page.locator('#login-button').click();

    // Expect an error message to be visible
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText("Username and password do not match any user in this service")
});

test('login with locked out user', async ({page}) => {
    // Enter valid username
    await page.locator('#user-name').fill('locked_out_user');
    // Enter valid password
    await page.locator('#password').fill('secret_sauce');
    // Click the login button
    await page.locator('#login-button').click();

    // Expect an error message to be visible
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText("Sorry, this user has been locked out.")
});

const logins = [
    'standard_user',
    'problem_user',
    'performance_glitch_user',
    'error_user',
    'visual_user'
];

logins.forEach((username) => {
    test(`login with valid credentials for ${username}`, async ({page}) => {


        // Enter valid username
        await page.locator('#user-name').fill(username);
        // Enter valid password
        await page.locator('#password').fill('secret_sauce');
        // Click the login button
        await page.locator('#login-button').click();

        // Expect the page title to be visible
        await expect(page.getByTitle('Swag Labs')).toBeTruthy();
        await expect(page.locator('.app_logo')).toContainText('Swag Labs');
    });
});
