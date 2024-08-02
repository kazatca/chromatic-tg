import path from "path";
import { Config } from './types'

export const config: Config = require(path.join(process.cwd(), "config.json"));

if (!config) {
  console.error("Config not found");
  process.exit(1);
}