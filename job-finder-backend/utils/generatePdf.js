import fs from "fs";
import path from "path";
import Handlebars from "express-handlebars";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hbs = Handlebars.create();

export const generateResumePdf = async (data) => {
  const templatePath = path.join(__dirname, "../templates/resumeTemplate.hbs");
  const source = fs.readFileSync(templatePath, "utf8");
  const template = hbs.handlebars.compile(source);
  const html = template(data);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();
  return pdfBuffer;
};
