import { Book } from "./../lib/models/book";
import { applyStyles } from "./apply_style";
import { loadHTML, createStyleSheetLink, randomChoice } from "./utils";

async function createBanner(html_path: string): Promise<Element> {
  const banner = document.createElement("div");
  banner.id = "banner-wrapper";
  banner.innerHTML = await loadHTML(html_path);
  return banner;
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
  return applyStyles(element);
}

export async function initBanner(books: Book[], bodyElement: Element) {
  const linkElement = createStyleSheetLink("embed-banner.css");
  const banner = await createBanner("embed-banner.html");
  bodyElement.insertBefore(linkElement, bodyElement.firstChild);
  bodyElement.insertBefore(banner, bodyElement.firstChild);
  const firstBook = randomChoice(books);
  injectContent(banner, firstBook.title, firstBook.authors.join(","));
  const intervalHandler = () => {
    const selectedBook = randomChoice(books);
    injectContent(banner, selectedBook.title, selectedBook.authors.join(","));
  };
  if (books.length !== 0) {
    setInterval(intervalHandler, 10000);
  }
}
