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
import { colors, cardSize, shapeSize } from "../theme/cards";
import { ScreenSizeContext } from "../screen/ScreenSizeProvider";

interface Props {
  card: CardType;
  onClick: () => void;
  selected: boolean;
  isNotInSet?: boolean;
  isInSet?: boolean;
}

const CardStyled = styled.div<{ $selected: boolean; $screen: string }>`
  background-color: ${({ theme }) => theme.card.background};
  margin: ${({ $screen }) => cardSize[$screen].margin};
  height: ${({ $screen }) => cardSize[$screen].height};
  width: ${({ $screen }) => cardSize[$screen].width};
  border-radius: 10px;
  box-shadow: ${({ $selected, theme }) =>
    $selected ? theme.card.boxShadow.selected : theme.card.boxShadow.default};
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
  const screen = React.useContext(ScreenSizeContext);

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
      <CardStyled $selected={selected} $screen={screen} onClick={onClick}>
        <ShapesContainerStyled>
          {Array.apply(null, { length: card.number }).map(
            (_: null, i: number) => {
              return (
                <ReactSVG
                  key={`${card.id}-${i}`}
                  src={getShape()}
                  color={card.color}
                  fill={card.fill}
                  className="card"
                  style={{
                    fill:
                      card.color === Color.Red
                        ? colors.red
                        : card.color === Color.Blue
                        ? colors.blue
                        : colors.green,
                    margin: shapeSize[screen].margin,
                    width: shapeSize[screen].width,
                    height: shapeSize[screen].width,
                  }}
                />
              );
            }
          )}
        </ShapesContainerStyled>
      </CardStyled>
    </animated.div>
  );
};
