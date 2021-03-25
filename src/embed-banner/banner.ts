import { applyStyles } from "./apply_style";

interface CustomStyle {
  background: string;
  text: string;
  accent: string;
}

const DEFAULT_STYLES: CustomStyle[] = [
  {
    background: "#C4C4C4",
    text: "#2DB497",
    accent: "#FAF6B0",
  },
  {
    background: "#FFC4C8",
    text: "#FF5685",
    accent: "#FEB25D",
  },
  {
    background: "#50B3A9",
    text: "#FFA6F8",
    accent: "#FFE373",
  },
  {
    background: "#41747E",
    text: "#D5E7F2",
    accent: "#CF4758",
  },
];

export async function createBanner(html_path: string): Promise<Element> {
  const banner = document.createElement("div");
  banner.id = "banner-wrapper";
  const htmlURL = chrome.extension.getURL(html_path);
  return fetch(htmlURL)
    .then((res) => res.text())
    .then((htmlString) => {
      banner.innerHTML = htmlString;
      return banner;
    });
}

export function createStyleSheetLink(): HTMLLinkElement {
  const linkElement = document.createElement("link");
  linkElement.setAttribute("rel", "stylesheet");
  linkElement.setAttribute("href", chrome.extension.getURL("embed-banner.css"));
  return linkElement;
}

export function injectContent(
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
