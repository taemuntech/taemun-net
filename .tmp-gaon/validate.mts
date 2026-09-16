import fs from "node:fs";
import { validatePortfolioItem } from "../src/lib/portfolio/schema";

const raw = JSON.parse(fs.readFileSync("src/content/portfolio/atelier-noir.json", "utf8"));
const errs = validatePortfolioItem(raw, "atelier-noir");
console.log(errs.length === 0 ? "validatePortfolioItem: 문제 0건" : errs);
