import { shuffle as _shuffle, uniq as _uniq, difference } from "lodash";

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
  // [1, 2, 3, 4, 5, 6] -> current cards
  // [1, 2, 4, 6, 7, 8] -> new cards
  // steps
  // [1, 2, 8, 4, 5, 6]
  // [1, 2, 8, 4, 7, 6]

  const newCards = cardsInGame.slice(0, currentCards.length);
  const newNumbers = difference(newCards, currentCards);
  return currentCards.length > cardsInGame.length
    ? cardsInGame
    : currentCards.map((n) => {
        if (!newCards.includes(n)) {
          return newNumbers.pop();
        }
        return n;
      });

  // const check = (oldArr: number[], newArr: number[], idx: number) => {
  //   return newArr.reduce((n: number[], curr, index) => {
  //     if (oldArr[index] === n[index]) {
  //       return n;
  //     } else {
  //       // console.log("newArr", n);
  //       // console.log("oldArr", [
  //       //   ...oldArr.slice(idx, index),
  //       //   n[n.length - 1],
  //       //   ...oldArr.slice(index),
  //       // ]);
  //       // console.log("idx", idx);
  //       // return n;
  //       console.log("curr", curr);
  //       console.log("идь", idx);
  //       console.log(
  //         "[...n.slice(idx), n[n.length - 1], ...oldArr.slice(idx + 1)]",
  //         [...n.slice(0, idx), n[n.length - 1], ...oldArr.slice(idx + 1)]
  //       );
  //       return check(
  //         [...n.slice(idx), n[n.length - 1], ...oldArr.slice(idx + 1)],
  //         newArr,
  //         idx + index + 1
  //       );
  //     }
  //   }, newArr);
  // };

  // const r = check(currentCards, newCards, 0);

  // // const r = currentCards.reduce((cards: Array<number>, card, index) => {
  // //   if (newCards[index] === currentCards[index]) {
  // //     cards[index] = card;
  // //     return cards;
  // //   } else {
  // //     // return r([
  // //     //   ...cards.slice(0, index),
  // //     //   cards[cards.length - 1],
  // //     //   ...cards.slice(index + 1),
  // //     // ]);
  // //   }
  // // }, newCards);
  // console.log(r);
  // return r;
};
