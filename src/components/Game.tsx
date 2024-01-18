import { addMore, createGame, isItASet } from "../game-setup";
import { difference as _difference, isEqual as _isEqual } from "lodash";
import * as React from "react";
import { Card } from "./Card";
import styled from "styled-components";

interface Props {
  onThemeChange: () => void;
}

const ADD = 3;
enum SHOWING {
  Default = 12,
  More = 15,
}

const GameStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const CardsContainerStyled = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, 1fr);
`;

const { shuffledCards: cardsIds, cardsReference } = createGame();

function Game({ onThemeChange }: Props) {
  const [selectedCardsIds, setSelectedCardsIds] = React.useState<Array<number>>(
    []
  );
  const [cardsInGame, setCardsInGame] = React.useState<Array<number>>(cardsIds);
  const [showingCards, setShowingCards] = React.useState<Array<number>>(
    cardsInGame.slice(0, SHOWING.Default)
  );
  const [wrongSet, setWrongSet] = React.useState<Array<number>>([]);

  const selectedCards = React.useMemo(() => {
    return selectedCardsIds.map((c) => cardsReference[c]);
  }, [selectedCardsIds]);

  React.useEffect(() => {
    if (selectedCards.length === ADD) {
      const isASet = isItASet(selectedCards);

      if (isASet) {
        const newCardsInGame = cardsInGame.filter(
          (cardId) => !selectedCardsIds.includes(cardId)
        );
        const newShowingCards = addMore(showingCards, newCardsInGame);

        if (!_isEqual(newShowingCards, showingCards)) {
          setShowingCards(newShowingCards.slice(0, SHOWING.Default));
        }
        setCardsInGame(newCardsInGame);
        setSelectedCardsIds([]);
      } else {
        setWrongSet(selectedCardsIds);
      }
    }
  }, [selectedCards, cardsInGame, selectedCardsIds, showingCards]);

  React.useEffect(() => {
    if (wrongSet.length === ADD) {
      setWrongSet([]);
      setSelectedCardsIds([]);
    }
  }, [wrongSet]);

  return (
    <GameStyled>
      <button onClick={onThemeChange}>change theme</button>
      <CardsContainerStyled>
        {showingCards.map((cardId) => {
          const card = cardsReference[cardId];
          return (
            <Card
              key={card.id}
              card={card}
              selected={selectedCardsIds.includes(cardId)}
              isNotInSet={!wrongSet.includes(card.id)}
              onClick={() => {
                if (selectedCardsIds.includes(cardId)) {
                  setSelectedCardsIds(_difference(selectedCardsIds, [cardId]));
                } else {
                  setSelectedCardsIds([...selectedCardsIds, cardId]);
                }
              }}
            />
          );
        })}
      </CardsContainerStyled>
      <button
        onClick={() => {
          setShowingCards(cardsInGame.slice(0, SHOWING.More));
        }}
        disabled={
          showingCards.length === SHOWING.More ||
          cardsInGame.length < SHOWING.More
        }
      >
        add more
      </button>
    </GameStyled>
  );
}

export default Game;
