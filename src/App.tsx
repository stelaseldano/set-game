import "./App.css";
import { createGame, isItASet } from "./game-setup";
import {
  range as _range,
  difference as _difference,
  isEqual as _isEqual,
} from "lodash";
import * as React from "react";
import { Card } from "./components/Card";

const ADD = 3;
enum SHOWING {
  Default = 12,
  More = 15,
}

function App() {
  const { shuffledCards: cardsIds, cardsReference } = React.useMemo(
    () => createGame(),
    []
  );
  const [selectedCardsIds, setSelectedCardsIds] = React.useState<Array<number>>(
    []
  );
  const [cardsInGame, setCardsInGame] = React.useState<Array<number>>(cardsIds);
  const [showingCards, setShowingCards] = React.useState<Array<number>>([]);
  const [displayedCardsTotal, setDisplayedCardsTotal] = React.useState(
    SHOWING.Default
  );

  const selectedCards = React.useMemo(() => {
    return selectedCardsIds.map((c) => cardsReference[c]);
  }, [cardsReference, selectedCardsIds]);

  React.useEffect(() => {
    setShowingCards(cardsInGame.slice(0, displayedCardsTotal));
  }, [displayedCardsTotal, cardsInGame, cardsIds]);

  React.useEffect(() => {
    if (selectedCards.length === ADD) {
      const isASet = isItASet(selectedCards);

      if (isASet && displayedCardsTotal === SHOWING.Default) {
        setCardsInGame(
          cardsInGame.filter((cardId) => !selectedCardsIds.includes(cardId))
        );
      }
    }
  }, [selectedCards, displayedCardsTotal, cardsInGame, selectedCardsIds]);

  React.useEffect(() => {
    const newCardsIds = cardsInGame.slice(0, SHOWING.Default);

    const newCards = showingCards.reduce((newCards, card, index) => {
      if (showingCards[index] === newCardsIds[index]) {
        newCards[index] = card;
      } else {
        newCards = [
          ...newCards.slice(0, index),
          newCardsIds[newCards.length - 1],
        ];
        // [newCards[index], newCards[newCards.length - 1]] = [
        //   newCards[newCards.length - 1],
        //   cardsInGame[index],
        // ];
        console.log(newCards);
      }

      return newCards;
    }, []);

    if (!_isEqual(newCardsIds, showingCards)) {
      setShowingCards(newCardsIds);
      setSelectedCardsIds([]);
    }
  }, [cardsInGame]);

  return (
    <div className="App">
      <div className="cards">
        {showingCards.map((cardId) => {
          const card = cardsReference[cardId];
          return (
            <Card
              key={card["id"]}
              // spot={index}
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
      </div>
      <button
        onClick={() => setDisplayedCardsTotal(SHOWING.More)}
        disabled={displayedCardsTotal === SHOWING.More}
      >
        add more
      </button>
    </div>
  );
}

export default App;
