import { test, expect } from '@playwright/test';
import { testUrl } from 'e2e/e2e.config';
import { AppFixture } from 'src/app/app.fixture';
import { UserFixture } from 'src/app/users/user/user.fixture';
import { UserFormFixture } from 'src/app/users/user-form/user-form.fixture';
import { text } from 'stream/consumers';



// test.describe is a hook that creates a test group and lets you define lifecycle stages such as beforeEach.
test.describe('Supprimer un profil', () => {

    test('Config User', async ({ page }) => {
        await page.goto(testUrl + '/actions');

        await page.goto(testUrl + '/actions');
        const button = await page.locator('button.button-card[routerLink="/password"]');
        await button.click();
        await expect(page).toHaveURL(testUrl+'/password');
        const input = await page.locator('input#password');
        await input.fill('1234');
        const buttonValider = await page.locator('button.button-card[type="submit"]');
        await buttonValider.click();

        //create all fixtures
        const userFormFixture = new UserFormFixture(page);
        const userFixture = new UserFixture(page);

        await expect(page).toHaveURL(testUrl+'/user-list');

        await test.step(`Supprimer user`, async () => {


            //const deleteButtonSelector = '.user-list .card:has(h2:has-text("Alpha Roméo")) #del-btn';
            const deleteButtonSelector = '.user-list .card #del-btn';


            await page.waitForSelector(deleteButtonSelector);


            // Sélectionner le bouton de configuration
            const deleteButton = await page.$(deleteButtonSelector);

            // Effectuer un clic sur le bouton de configuration
            if (deleteButton) {
                await deleteButton.click();
            }

            //await userFormFixture.clickValidateButton();

        });


    });


});
