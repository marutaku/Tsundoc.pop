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
