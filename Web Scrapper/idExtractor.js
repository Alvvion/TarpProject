const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  // Browser Init
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Login
  await page.goto("http://visual.ic.uff.br/dmi/");
  const username = "utkarshVerma2506";
  const password = "password";
  await page.focus('input[name="usuario"]');
  await page.keyboard.type(username);
  await page.focus('input[name="password"]');
  await page.keyboard.type(password);
  await page.keyboard.press("Enter");
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  // Navigate to index page
  const ids = new Set();
  for (let i = 1; i < 12; i++) {
    await page.goto(
      `http://visual.ic.uff.br/dmi/prontuario/index.php?diag=&filtro=0&order=1&by=1&pagina=${i}`
    );
    await page.waitForSelector("table.bordered");
    const data = await page.evaluate(() =>
      Array.from(document.querySelectorAll("tr td:nth-child(1)")).map(
        (ele) => ele.textContent
      )
    );
    data.forEach((id) => ids.add(Number(id)));
  }
  console.log(ids);

  // Writing to file
  const json = { id: Array.from(ids) };
  fs.writeFileSync("id.json", JSON.stringify(json));
  await browser.close();
})();
