import { Book } from "./lib/models/book";
import { LocalStorage } from "./lib/storage/local-storage";

window.onload = async () => {
  const storage = new LocalStorage();
  const records = await storage.getAll();
  const books = records.map((record) => {
    const key = Object.keys(record)[0];
    return Book.parse(record[key]);
  });
  const newElement = document.createElement("ul");
  books.forEach((book) => {
    const li = document.createElement("li");
    li.innerText = book.title;
    newElement.appendChild(li);
  });
  const body = document.querySelector("body");
  if (body) {
    body.insertBefore(newElement, body.firstChild);
  } else {
    console.error("Body not found ");
  }
};
