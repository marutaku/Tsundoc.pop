import { Book } from "./lib/models/book";
import { LocalStorage } from "./lib/storage/local-storage";

import { initBanner } from "./embed-banner/banner";
import { initModal } from "./embed-banner/modal";
import { sortBooks } from "./embed-banner/utils";

export interface SuggestBook extends Book {
  commonNounSet?: Set<string>;
  similarity?: Number
}


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

  // sort books by similarity with page title
  const pageTitle = document.querySelector("title")?.innerText;
  if (!pageTitle) {
    throw new Error("page title not found ");
  }
  const sortedBooks: Array<SuggestBook> = await sortBooks(pageTitle, books);


  // initBanner(books, body);
  initModal(sortedBooks, body);
};
