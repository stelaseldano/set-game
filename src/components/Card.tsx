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
import { useSpring, animated } from "@react-spring/web";

interface Props {
  card: CardType;
  onClick: () => void;
  selected: boolean;
  isNotInSet?: boolean;
  isInSet?: boolean;
}

const CardStyled = styled.div<{ $selected: boolean }>`
  background-color: white;
  margin: 20px;
  width: 140px;
  height: 200px;
  border-radius: 10px;
  box-shadow: ${(props) =>
    props.$selected ? "0px 0px 15px #4B5563" : "0px 0px 15px #97aac6"};
`;

const SvgStyled = styled(ReactSVG)<{}>`
  fill: ${(props) =>
    // @ts-ignore
    props.$color === Color.Red
      ? "#b967ff"
      : // @ts-ignore
      props.$color === Color.Blue
      ? "#01cdfe"
      : "#19d432"};
  height: 50px;
  width: 50px;
  margin: 5px;
`;

const ShapesContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Card: React.FC<Props> = ({
  card,
  onClick,
  selected,
  isNotInSet = false,
  isInSet = false,
}) => {
  const domTarget = React.useRef(null);

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1, tension: 250, friction: 30 },
  }));

  const { scale } = useSpring({ scale: selected ? 1.05 : 1 });

  React.useEffect(() => {
    if (!isNotInSet) {
      api.start({
        to: [
          { x: 0, y: 0 },
          { x: -3, y: 2 },
          { x: 5, y: -3 },
          { x: 0, y: 0 },
          { x: 7, y: 3 },
          { x: -7, y: -2 },
          { x: 0, y: 0 },
        ],
        config: {
          duration: 60,
          decay: 0,
          bounce: 2,
        },
      });
    }
  }, [isNotInSet, api, isInSet]);

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
    <animated.div
      ref={domTarget}
      style={{
        scale,
        x,
        y,
      }}
    >
      <CardStyled $selected={selected} onClick={onClick}>
        <ShapesContainerStyled>
          {Array.apply(null, { length: card.number }).map(
            (_: null, i: number) => {
              return (
                <SvgStyled
                  key={`${card.id}-${i}`}
                  src={getShape()}
                  // @ts-ignore
                  $color={card.color}
                  $fill={card.fill}
                />
              );
            }
          )}
        </ShapesContainerStyled>
      </CardStyled>
    </animated.div>
  );
};
