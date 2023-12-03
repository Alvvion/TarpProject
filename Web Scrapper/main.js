const puppeteer = require("puppeteer");
const ids = require("./id.json");
const fs = require("fs");

(async () => {
  const baseDir = "http://visual.ic.uff.br/dmi/";
  // Browser Init
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const username = "alvie200100";
  const password = "RVEmHU@nxTd9vzD";

  // Login
  await page.goto(baseDir);
  await page.focus('input[name="usuario"]');
  await page.keyboard.type(username);
  await page.focus('input[name="password"]');
  await page.keyboard.type(password);
  await page.keyboard.press("Enter");
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  // Navigating through ids
  const patientDetails = [];
  for (let id of ids.id) {
    try {
      await page.goto(`${baseDir}prontuario/details.php?id=${id}`);
      await page.waitForSelector("div.clearfix");

      // Data extraction
      const details = await page.evaluate((baseDir) => {
        const diagnosis = document.querySelector(
          "div.detalhecurso div.visitauser p.view-diagnostico span"
        ).textContent;
        const bodyTemperature = document.querySelector(
          "div.detalhecurso div.visitauser div.descripcion3 div:nth-child(2)"
        );
        const images = Array.from(
          document.querySelectorAll("div.imagem a")
        ).map((img) => img.getAttribute("href"));

        const imageUrl = images.map(
          (image) => "http://visual.ic.uff.br/dmi/" + image.slice(3)
        );

        return { diagnosis, imageUrl, bodyTemperature };
      });
      details.id = id;
      patientDetails.push(details);
    } catch (e) {
      console.log(e.message);
    }
  }
  console.log(patientDetails);
  fs.writeFileSync("patientDetails2.json", JSON.stringify(patientDetails));
  await browser.close();
})();
