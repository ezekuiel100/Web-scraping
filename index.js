import puppeteer from "puppeteer";
import fs from "fs";

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://books.tosc");

  const titles = await page.evaluate(() => {
    const titleArray = [];

    const books = document.querySelectorAll("h3 a");

    Array.from(books).forEach((element) => {
      titleArray.push(element.getAttribute("title"));
    });

    return titleArray;
  });

  fs.writeFile("data.json", JSON.stringify(titles));

  await browser.close();
}
main();
