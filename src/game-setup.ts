import { shuffle as _shuffle, uniq as _uniq } from "lodash";

export enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

export enum Shape {
  Oval = "oval",
  Rect = "rect",
  Wave = "wave",
}

export enum Fill {
  Full = "full",
  Semi = "semi",
  None = "none",
}

export enum Number {
  One = "1",
  Two = "2",
  Three = "3",
}

export interface Card {
  id: number;
  color: Color | null;
  shape: Shape | null;
  fill: Fill | null;
  number: Number | null;
}

const color: Array<Color> = [Color.Red, Color.Green, Color.Blue];
const number: Array<Number> = [Number.One, Number.Two, Number.Three];
const shape: Array<Shape> = [Shape.Oval, Shape.Rect, Shape.Wave];
const fill: Array<Fill> = [Fill.Full, Fill.None, Fill.Semi];

const properties = { color, number, shape, fill };

const TOTAL = 81;

export const createCards = () => {
  const propertiesArray = Object.entries(properties);
  const cards: Array<Card> = [];
  for (let j = 0; j < Object.entries(propertiesArray).length; j++) {
    const [propertyKey, propertyValue] = propertiesArray[j];
    for (let i = 0; i < TOTAL; i++) {
      const skip = TOTAL / 3 ** (j + 1);
      const index = Math.floor((i / skip) % 3);
      if (cards[i] === undefined) {
        cards[i] = {
          id: i,
          color: null,
          number: null,
          shape: null,
          fill: null,
        };
        cards[i][propertyKey] = propertyValue[index];
      } else {
        cards[i][propertyKey] = propertyValue[index];
      }
    }
  }

  return cards;
};

export const createGame = () => {
  const cardsReference: Record<number, Card> = createCards().reduce(
    (cards: any, current: any) => {
      cards[String(current.id)] = current;
      return cards;
    },
    {}
  );
  const shuffledCards: Array<number> = _shuffle(
    Object.values(cardsReference)
  ).map((card) => card.id);

  return {
    shuffledCards,
    cardsReference,
  };
};

export const isItASet = (cards: Array<Card>) => {
  const colors = [];
  const fills = [];
  const shapes = [];
  const numbers = [];

  cards.forEach((card) => {
    colors.push(card.color);
    fills.push(card.fill);
    shapes.push(card.shape);
    numbers.push(card.number);
  });

  return (
    _uniq(colors).length !== 2 &&
    _uniq(shapes).length !== 2 &&
    _uniq(fills).length !== 2 &&
    _uniq(numbers).length !== 2
  );
};

export const addMore = (
  currentCards: Array<number>,
  cardsInGame: Array<number>
): Array<number> => {
  // [1, 2, 3, 4]
  // [1, 2, 4, 5]
  // [1, 2, 5, 4]

  const newCards = cardsInGame.slice(0, currentCards.length);

  const r = currentCards.reduce((cards: Array<number>, card, index) => {
    if (newCards[index] === currentCards[index]) {
      cards[index] = card;
      return cards;
    } else {
      return [
        ...cards.slice(0, index),
        cards[cards.length - 1],
        ...currentCards.slice(index + 1),
      ];
    }
  }, newCards);
  console.log(r);
  return r;
};
