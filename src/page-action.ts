import { Book } from "./lib/models/book";
import { LocalStorage } from "./lib/storage/local-storage";
import { applyStyles } from "./embed-banner/apply_style";
import {
  createStyleSheetLink,
  injectContent,
  createBanner,
} from "./embed-banner/banner";

window.onload = async () => {
  const storage = new LocalStorage();
  const records = await storage.getAll();
  const books = records.map((record) => {
    const key = Object.keys(record)[0];
    return Book.parse(record[key]);
  });
  const banner = await createBanner("embed-banner.html");
  const body = document.querySelector("body");
  const linkElement = createStyleSheetLink();
  if (!body) {
    throw new Error("Body not found ");
  }
  body.insertBefore(banner, body.firstChild);
  body.insertBefore(linkElement, body.firstChild);
  const firstRandom = Math.floor(Math.random() * books.length);
  injectContent(
    banner,
    books[firstRandom].title,
    books[firstRandom].authors.join(",")
  );
  const intervalHandler = () => {
    const random = Math.floor(Math.random() * books.length);
    injectContent(banner, books[random].title, books[random].authors.join(","));
    console.log("Show banner");
  };
  if (books.length !== 0) {
    setInterval(intervalHandler, 10000);
  }
};
