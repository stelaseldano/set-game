import { addMore, createGame, isItASet } from "./game-setup";
import { difference as _difference, isEqual as _isEqual } from "lodash";
import * as React from "react";
import { Card } from "./components/Card";
import styled from "styled-components";

const ADD = 3;
enum SHOWING {
  Default = 12,
  More = 15,
}

const AppStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #d9e0ea;
`;

const CardsContainerStyled = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(3, 1fr);
`;

function App() {
  const { shuffledCards: cardsIds, cardsReference } = React.useMemo(
    () => createGame(),
    []
  );
  const [selectedCardsIds, setSelectedCardsIds] = React.useState<Array<number>>(
    []
  );
  const [cardsInGame, setCardsInGame] = React.useState<Array<number>>(cardsIds);
  const [showingCards, setShowingCards] = React.useState<Array<number>>(
    cardsInGame.slice(0, SHOWING.Default)
  );

  const selectedCards = React.useMemo(() => {
    return selectedCardsIds.map((c) => cardsReference[c]);
  }, [cardsReference, selectedCardsIds]);

  React.useEffect(() => {
    if (selectedCards.length === ADD) {
      const isASet = isItASet(selectedCards);

      if (isASet) {
        setCardsInGame(
          cardsInGame.filter((cardId) => !selectedCardsIds.includes(cardId))
        );
        setSelectedCardsIds([]);
      }
    }
  }, [selectedCards, cardsInGame, selectedCardsIds, showingCards]);

  React.useEffect(() => {
    const newCards = addMore(showingCards, cardsInGame);
    if (!_isEqual(newCards, showingCards)) {
      if (cardsInGame.length > SHOWING.Default) {
        setShowingCards(newCards.slice(0, SHOWING.Default));
      } else {
        setShowingCards(cardsInGame);
      }
    }
  }, [cardsInGame, showingCards]);

  return (
    <AppStyled>
      <CardsContainerStyled>
        {showingCards.map((cardId) => {
          const card = cardsReference[cardId];
          return (
            <Card
              key={card.id}
              card={card}
              selected={selectedCardsIds.includes(cardId)}
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
        disabled={showingCards.length === SHOWING.More}
      >
        add more
      </button>
    </AppStyled>
  );
}

export default App;
