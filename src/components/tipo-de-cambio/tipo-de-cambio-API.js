import * as puppeteer from "puppeteer";
//import "dotenv/config";
import * as constants from "../../utils/Constants.js"

async function getTipoCambio() {
  let resultado;
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setUserAgent(constants.USER_AGENT_PUPPETEER);
    await page.goto(constants.URL_WEB_SBS, { waitUntil: "networkidle2" });
    resultado = await page.evaluate(() => {
      let tiposCambios = [];
      //const filas = document.querySelectorAll(".rgMasterTable tbody tr");
      const filas = document.querySelectorAll("#ctl00_cphContent_rgTipoCambio_ctl00 tbody tr");
      for (const fila of filas) {
        const columnas = fila.querySelectorAll("td");
        const moneda = columnas[0]?.innerText.trim();
        const compra = columnas[1]?.innerText.trim();
        const venta = columnas[2]?.innerText.trim();

        tiposCambios.push({ moneda, compra, venta });
      }
      return tiposCambios;
    });

    await browser.close();
  } catch (error) {
    console.error("Error:", error);
    if (browser) await browser.close();
  }

  return resultado ?? [];
}

export { getTipoCambio };