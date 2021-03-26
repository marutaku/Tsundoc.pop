import { Book } from "../lib/models/book";
import { http, HttpResponse } from "../lib/models/http";

interface NounList {
  nouns: string;
}

export interface SuggestBook extends Book {
  commonNounSet?: Set<string>;
  similarity?: Number
}

export async function loadHTML(
  html_path: string,
): Promise<string> {
  const htmlURL = chrome.extension.getURL(html_path);
  return fetch(htmlURL).then((res) => res.text());
}

export function createStyleSheetLink(css_filename: string): HTMLLinkElement {
  const linkElement = document.createElement("link");
  linkElement.setAttribute("rel", "stylesheet");
  linkElement.setAttribute("href", chrome.extension.getURL(css_filename));
  return linkElement;
}

export function randomChoice<T>(list: Array<T>): T {
  return list[Math.floor(Math.random() * list.length)];
}

async function getPageNounSet(pageTitle: string): Promise<Set<string>> {
  const obj = {"title": pageTitle};
  const request: Request = new Request(
    "https://tsundoc-pop-idclo2e3ea-an.a.run.app/nouns",
    {
      method: "POST",
      body: JSON.stringify(obj),
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin':'*' ,
        'Access-Control-Allow-Methods': 'POST',
        'Content-Type': 'application/json'
      }
    }
  );
  let response: HttpResponse<NounList>;
  let nouns: any;
  try {
    response = await http<NounList>(request);
    nouns = response.parsedBody?.nouns;
  } catch(response) {
    nouns = "";
  }
  return  new Set(nouns.split(','));
}

function intersection(a: Set<string>, b: Set<string>): Set<string> {
    let _intersection: Set<string> = new Set()
    a.forEach((elem) => {
        if (b.has(elem)) {
            _intersection.add(elem)
        }
    });
    return _intersection;
}

function union(a: Set<string>, b: Set<string>): Set<string> {
    let _union = new Set(a)
    b.forEach((elem) => {
      _union.add(elem);
    });
    return _union;
}

export async function sortBooks(pageTitle: string, books: Array<SuggestBook>): Promise<Array<SuggestBook>> {
  const pageNounSet: Set<string> = await getPageNounSet(pageTitle);

  const scoredBooks: Array<SuggestBook> = books.map((book) => {
    const bookNounSet: Set<string> = new Set(book.nouns?.split(','));
    book.commonNounSet = intersection(pageNounSet, bookNounSet);
    const unionSet: Set<string> = union(pageNounSet, bookNounSet);
    book.similarity = book.commonNounSet.size / unionSet.size;
    return book;
  });

  return scoredBooks;
}
