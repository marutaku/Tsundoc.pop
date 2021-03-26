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
