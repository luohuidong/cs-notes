import fs from "node:fs";
import path from "node:path";

import { GenerateSidebar } from "./GenerateSidebar.js";

fs.watch("docs", { recursive: true }, (eventType, filename) => {
  const result = path.parse(filename);
  if (result.ext !== ".yml") return;
  new GenerateSidebar().generate();
});

console.log("watching...");
