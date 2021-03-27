import { Book, SuggestBook } from "../lib/models/book";
import { applyStyles } from "./apply_style";
import { loadHTML, createStyleSheetLink, randomChoice } from "./utils";

function injectContent(
  element: Element,
  title: string,
  subtitle: string,
  image: string = "",
  commonNouns: Set<string>
): Element {
  const titleElement = element.querySelector("#modal-book-title");
  const closeBtnElement = element.querySelector("#modal-close");
  const imgElement = element.querySelector("div#modal-img > img");
  const headElement = element.querySelector("#modal-header");
  const wordsElement = element.querySelector("#modal-header-text");
  let tmpList: Array<string> = Array.from(commonNouns.values());
  let nounsList = [];

  while (tmpList.length > 0) {
    let n = tmpList.length;
    let k = Math.floor(Math.random() * n);

    nounsList.push(tmpList[k]);
    tmpList.splice(k, 1);
  }

  if (titleElement && closeBtnElement && imgElement && headElement && wordsElement) {
    imgElement.setAttribute("src", image);
    titleElement.innerHTML = title;
    closeBtnElement.innerHTML = "この積読を消化せずにブラウジングを続ける";
  } else {
    throw new Error(`Unexpected Element.`);
  }

  if (headElement && wordsElement) {
    const firstWord = nounsList.pop();
    if (!firstWord) {
      headElement.innerHTML = "ネットサーフィンをしてしまうあなた";
    } else {
      const secondWord = nounsList.pop();
      if (!secondWord) {
      wordsElement.innerHTML = firstWord;
      } else {
        wordsElement.innerHTML = firstWord + "，" + secondWord;
      }
    }
  } else {
    throw new Error(`Unexpected Element.`);
  }
  return element;
}

export async function initModal(
  books: SuggestBook[],
  bodyElement: Element,
  onModalClose: () => void
) {
  const linkElement = createStyleSheetLink("embed-modal.css");
  const modal = document.createElement("div");
  modal.innerHTML = await loadHTML("embed-modal.html");
  bodyElement.appendChild(modal);
  bodyElement.insertBefore(linkElement, bodyElement.firstChild);

  // const firstBook = randomChoice(books);
  //
  const firstBook = books.pop();
  if (!firstBook) {
    throw new Error("no books");
  }
  if (!firstBook.commonNounSet) {
    firstBook.commonNounSet = new Set();
  }

  injectContent(
    modal,
    firstBook.title,
    firstBook.authors.join(","),
    firstBook.image,
    firstBook.commonNounSet
  );
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
    onModalClose();
  };
  dialog.showModal();
}
