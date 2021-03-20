import { Book } from "./lib/models/book";
import { LocalStorage } from "./lib/storage/local-storage";

async function createBanner(): Promise<Element> {
  const banner = document.createElement("div");
  banner.id = "banner-wrapper";
  const htmlURL = chrome.extension.getURL("embed-banner.html");
  return fetch(htmlURL)
    .then((res) => res.text())
    .then((htmlString) => {
      banner.innerHTML = htmlString;
      return banner;
    });
}

function createStyleSheetLink(): HTMLLinkElement {
  const linkElement = document.createElement("link");
  linkElement.setAttribute("rel", "stylesheet");
  linkElement.setAttribute("href", chrome.extension.getURL("embed-banner.css"));
  return linkElement;
}

function injectContent(
  element: Element,
  title: string,
  subtitle: string
): Element {
  const titleElement = element.querySelector("#banner-title");
  const subtitleElement = element.querySelector("#banner-subtitle");
  if (titleElement && subtitleElement) {
    titleElement.innerHTML = title;
    subtitleElement.innerHTML = subtitle;
  } else {
    throw new Error(`Unexpected Element.`);
  }
  return element;
}

window.onload = async () => {
  const storage = new LocalStorage();
  const records = await storage.getAll();
  const books = records.map((record) => {
    const key = Object.keys(record)[0];
    return Book.parse(record[key]);
  });
  const banner = await createBanner();
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
