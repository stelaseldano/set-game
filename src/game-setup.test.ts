import { isItASet, addMore, Color, Fill, Number, Shape } from "./game-setup";

it("test correctly checking existing sets", () => {
  expect(
    isItASet([
      {
        id: 1,
        color: Color.Blue,
        fill: Fill.Full,
        number: Number.One,
        shape: Shape.Oval,
      },
      {
        id: 2,
        color: Color.Red,
        fill: Fill.Full,
        number: Number.One,
        shape: Shape.Oval,
      },
      {
        id: 3,
        color: Color.Green,
        fill: Fill.Full,
        number: Number.One,
        shape: Shape.Oval,
      },
    ])
  ).toBe(true);

  expect(
    isItASet([
      {
        id: 1,
        color: Color.Blue,
        fill: Fill.Full,
        number: Number.One,
        shape: Shape.Oval,
      },
      {
        id: 2,
        color: Color.Red,
        fill: Fill.Semi,
        number: Number.One,
        shape: Shape.Oval,
      },
      {
        id: 3,
        color: Color.Green,
        fill: Fill.None,
        number: Number.One,
        shape: Shape.Oval,
      },
    ])
  ).toBe(true);

  expect(
    isItASet([
      {
        id: 1,
        color: Color.Blue,
        fill: Fill.Full,
        number: Number.One,
        shape: Shape.Oval,
      },
      {
        id: 2,
        color: Color.Red,
        fill: Fill.Semi,
        number: Number.Two,
        shape: Shape.Oval,
      },
      {
        id: 3,
        color: Color.Green,
        fill: Fill.None,
        number: Number.Three,
        shape: Shape.Oval,
      },
    ])
  ).toBe(true);

  expect(
    isItASet([
      {
        id: 1,
        color: Color.Blue,
        fill: Fill.Full,
        number: Number.One,
        shape: Shape.Oval,
      },
      {
        id: 2,
        color: Color.Red,
        fill: Fill.Semi,
        number: Number.Two,
        shape: Shape.Rect,
      },
      {
        id: 3,
        color: Color.Green,
        fill: Fill.None,
        number: Number.Three,
        shape: Shape.Wave,
      },
    ])
  ).toBe(true);
});

it("test add more", () => {
  // expect(addMore([1, 2, 3, 4], [1, 2, 4, 5])).toEqual([1, 2, 5, 4]);
  expect(addMore([1, 2, 3, 4, 5, 6], [1, 2, 4, 6, 7, 8])).toEqual([
    1, 2, 8, 4, 7, 6,
  ]);
});
