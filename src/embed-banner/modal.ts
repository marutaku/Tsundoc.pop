import { Book } from "./../lib/models/book";
import { applyStyles } from "./apply_style";
import { loadHTML, createStyleSheetLink, randomChoice } from "./utils";

function injectContent(
  element: Element,
  title: string,
  subtitle: string,
  // image?: stringではだめだった
  image: any,
): Element {
  const titleElement = element.querySelector("#modal-title");
  const subtitleElement = element.querySelector("#modal-subtitle");
  const closeBtnElement = element.querySelector("#modal-close");
  const imgElement = element.querySelector("div#modal-img img");
  // const imgElement = document.getElementById("#modal-img");
  if (titleElement && subtitleElement && closeBtnElement && imgElement) {
    imgElement.setAttribute('src', image);
    titleElement.innerHTML = title;
    subtitleElement.innerHTML = subtitle;
    closeBtnElement.innerHTML = "この積読を消化せずにブラウジングを続ける";
  } else {
    throw new Error(`Unexpected Element.`);
  }
  return applyStyles(element);
}

export async function initModal(books: Book[], bodyElement: Element) {
  const linkElement = createStyleSheetLink("embed-modal.css");
  const modal = document.createElement("div");
  modal.innerHTML = await loadHTML("embed-modal.html");
  bodyElement.appendChild(modal);
  bodyElement.insertBefore(linkElement, bodyElement.firstChild);
  const firstBook = randomChoice(books);
  injectContent(modal, firstBook.title, firstBook.authors.join(","), firstBook.image);
  //   MicroModal.init();
  const dialog = document.querySelector("dialog");
  if (!dialog) {
    throw new Error("Dialog not found");
  }
  const closeButton: HTMLButtonElement | null = document.querySelector(
    "#modal-close"
  );
  if (!closeButton) {
    throw new Error("Button not found");
  }
  closeButton.onclick = (e) => {
    e.preventDefault();
    dialog.close();
  };
  dialog.showModal();
}
