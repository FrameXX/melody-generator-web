export function getRandomNumber(min: number, max: number) {
  const number = Math.round(Math.random() * (max + 1 - min) + (min - 0.5)) * 1;
  return number + 0;
}

export function getRandomId(chars: number = 8) {
  const consonants = [
    "b",
    "c",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "p",
    "q",
    "r",
    "s",
    "t",
    "v",
    "w",
    "x",
    "z",
  ];
  const vowels = ["a", "e", "i", "o", "u", "y"];
  let useConsonant = Boolean(getRandomNumber(0, 1));
  let id = "";
  for (let i = 0; i < chars; i++) {
    if (useConsonant) {
      id = id + consonants[getRandomNumber(0, consonants.length - 1)];
    } else {
      id = id + vowels[getRandomNumber(0, vowels.length - 1)];
    }
    useConsonant = !useConsonant;
  }
  return id;
}

const DOMRoot = getDOMRoot();

function getDOMRoot(): HTMLElement {
  const root = document.querySelector(":root");
  if (!(root instanceof HTMLElement)) {
    throw new Error("Root DOM element wasn't found in DOM");
  }
  return root;
}

export function setCSSVariable(name: string, value: string) {
  DOMRoot.style.setProperty("--" + name, value);
}
