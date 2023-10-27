import React from "react";
import {v1 as uuid} from "uuid";
import PlayingCard from "./PlayingCard";
import "./PlayingCardList.css";
import { useAxios } from "./hooks";

/* Renders a list of playing cards.
 * Can also add a new card at random. */
function CardTable() {
  const [cards, addCard, clearCards] = useAxios(
    "cards",
    "https://deckofcardsapi.com/api/deck/new/draw/"
  );

  const format = (res) => ({
    image: res.data.cards[0].image, 
    id: uuid()
  })

  return (
    <div className="PlayingCardList">
      <h3>Pick a card, any card!</h3>
      <div>
        <button onClick={() => addCard(format)}>Add a playing card!</button>
      </div>
      <div>
        <button onClick={clearCards}>Clear cards</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(cardData => (
          <PlayingCard key={cardData.id} front={cardData.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;
