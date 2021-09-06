import puppetteer from 'puppeteer';

jest.setTimeout(30000); // default puppeteer timeout

describe('List editor', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:8080';

  beforeAll(async () => {
    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 500,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('shows popup', async () => {
    await page.goto(baseUrl);
    const form = await page.$('#container');
    const btn = await form.$('.btn__add');
    btn.click();
    await page.waitFor('.popup');
  });

  test('creates an item', async () => {
    await page.goto(baseUrl);
    const form = await page.$('#container');
    const btn = await form.$('.btn__add');
    btn.click();
    await page.waitFor('.popup');
    const popup = await page.$('.popup');
    const inputTitle = await popup.$('.title__input');
    const inputPrice = await popup.$('.price__input');
    await inputTitle.type('IPhone XR');
    await inputPrice.type('60000');
    const submit = await popup.$('.btn__save');
    submit.click();
    await page.waitFor('.table__group');
  });
});
