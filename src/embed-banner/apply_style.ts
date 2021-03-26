interface CustomStyle {
  background: string;
  text: string;
  accent: string;
}

const DEFAULT_STYLES: CustomStyle[] = [
  {
    background: "#F4A7B9",
    text: "#FFFFFF",
    accent: "#EEEEEE",
  },
  {
    background: "#F4A7B9",
    text: "#FFFFFF",
    accent: "#EEEEEE",
  },
  {
    background: "#fddec0",
    text: "#052342",
    accent: "#052342",
  },
];

export function applyStyles(dom: Element): Element {
  const selectedStyle = Math.floor(Math.random() * DEFAULT_STYLES.length);
  const style = DEFAULT_STYLES[selectedStyle];
  Array.from(dom.getElementsByClassName("background")).forEach((element) => {
    element.setAttribute("style", `background-color: ${style.background}`);
  });
  Array.from(dom.getElementsByClassName("text")).forEach((element) => {
    element.setAttribute("style", `color: ${style.text}`);
  });
  Array.from(dom.getElementsByClassName("accent")).forEach((element) => {
    element.setAttribute("style", `color: ${style.accent}`);
  });
  return dom;
}
