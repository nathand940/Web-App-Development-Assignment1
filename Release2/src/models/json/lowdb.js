import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const defaultData = {
  users: [],
  placemarks: [],
};

const adapter = new JSONFile("./src/models/json/db.json");
export const db = new Low(adapter, defaultData);

export async function init() {
  await db.read();
  db.data ||= defaultData;
}

export async function save() {
  await db.write();
}
