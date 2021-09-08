import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('list editor', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
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
