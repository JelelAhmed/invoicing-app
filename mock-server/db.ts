import { JSONFilePreset } from "lowdb/node";
import { fileURLToPath } from "url";
import path from "path";
import { DB } from "./types.js";

// LowDB Initialization and helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_FILE = path.join(__dirname, "db.json");

const defaultData: DB = {
  invoices: [],
  customers: [],
};

export const db = await JSONFilePreset<DB>(DB_FILE, defaultData);

export function generateId(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
