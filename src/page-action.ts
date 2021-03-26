import { Book } from "./lib/models/book";
import { LocalStorage } from "./lib/storage/local-storage";

import { initBanner } from "./embed-banner/banner";
import { initModal } from "./embed-banner/modal";

window.onload = async () => {
  // Init MicroModal
  const storage = new LocalStorage();
  const records = await storage.getAll();
  const books = records.map((record) => {
    const key = Object.keys(record)[0];
    return Book.parse(record[key]);
  });
  const body = document.querySelector("body");
  if (!body) {
    throw new Error("Body not found ");
  }
  // 
  initModal(books, body, () => initBanner(books, body));
};
