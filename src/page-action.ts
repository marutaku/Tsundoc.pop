import { Book } from "./lib/models/book";
import { LocalStorage } from "./lib/storage/local-storage";
import { http, HttpResponse } from "./lib/models/http";

import { initBanner } from "./embed-banner/banner";
import { initModal } from "./embed-banner/modal";

interface NounList {
  nouns: string;
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

  console.log(pageTitle)
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
        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
        'Content-Type': 'application/json'
      }
    }
  );
  console.log(typeof(pageTitle));
  let response: HttpResponse<NounList>;
  let nouns: any;
  try {
    response = await http<NounList>(request);
    console.log("res", response.parsedBody);
    nouns = response.parsedBody?.nouns;
  } catch(response) {
    console.log("error", response);
    nouns = "";
  }

  // initBanner(books, body);
  initModal(books, body);
};
