import * as React from "react";
import { Card as CardType, Color, Fill, Shape } from "../game-setup";
import OvalSemi from "../assets/oval_semi.svg";
import OvalFull from "../assets/oval_full.svg";
import OvalNone from "../assets/oval_none.svg";
import TriSemi from "../assets/tri_semi.svg";
import TriFull from "../assets/tri_full.svg";
import TriNone from "../assets/tri_none.svg";
import RectSemi from "../assets/rect_semi.svg";
import RectFull from "../assets/rect_full.svg";
import RectNone from "../assets/rect_none.svg";
import { ReactSVG } from "react-svg";
import styled from "styled-components";
import { range as _range } from "lodash";

interface Props {
  card: CardType;
  onClick: () => void;
  selected: boolean;
}

const StyledCard = styled.div<{ $selected: boolean }>`
  background-color: white;
  margin: 20px;
  width: 140px;
  height: 200px;
  border-radius: 10px;
  box-shadow: ${(props) =>
    props.$selected ? "0px 0px 15px #4B5563" : "0px 0px 15px #97aac6"};
`;

const Svg = styled(ReactSVG)<{ $color: string; $fill: string }>`
  fill: ${(props) =>
    props.$color === Color.Red
      ? "#b967ff"
      : props.$color === Color.Blue
      ? "#01cdfe"
      : "#04E590"};
  height: 50px;
  width: 50px;
  margin: 5px;
`;

const ShapesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Card: React.FC<Props> = ({ card, onClick, selected }) => {
  const getShape = () => {
    if (card.shape === Shape.Oval && card.fill === Fill.None) {
      return OvalNone;
    }
    if (card.shape === Shape.Oval && card.fill === Fill.Semi) {
      return OvalSemi;
    }
    if (card.shape === Shape.Oval && card.fill === Fill.Full) {
      return OvalFull;
    }
    if (card.shape === Shape.Rect && card.fill === Fill.None) {
      return RectNone;
    }
    if (card.shape === Shape.Rect && card.fill === Fill.Semi) {
      return RectSemi;
    }
    if (card.shape === Shape.Rect && card.fill === Fill.Full) {
      return RectFull;
    }
    if (card.shape === Shape.Wave && card.fill === Fill.None) {
      return TriNone;
    }
    if (card.shape === Shape.Wave && card.fill === Fill.Semi) {
      return TriSemi;
    }
    if (card.shape === Shape.Wave && card.fill === Fill.Full) {
      return TriFull;
    }
  };

  return (
    <StyledCard $selected={selected} onClick={onClick}>
      <ShapesContainer>
        {card.id}
        {_range(Number(card.number)).map((num) => {
          return (
            <Svg
              key={num}
              src={getShape()}
              $color={card.color}
              $fill={card.fill}
            />
          );
        })}
      </ShapesContainer>
    </StyledCard>
  );
};
