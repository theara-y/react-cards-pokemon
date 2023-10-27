import React from "react";
import {v1 as uuid} from "uuid";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";
import { useAxios } from "./hooks";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const [pokemon, addPokemon, clearPokemon] = useAxios(
    "pokemons",
    "https://pokeapi.co/api/v2/pokemon/"
  );

  const format = (res) => ({
    id: uuid(),
    front: res.data.sprites.front_default,
    back: res.data.sprites.back_default,
    name: res.data.name,
    stats: res.data.stats.map(stat => ({
      value: stat.base_stat,
      name: stat.stat.name
    }))
  });

  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={(name) => addPokemon(format, name)} clear={clearPokemon} />
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          <PokemonCard
            key={cardData.id}
            front={cardData.front}
            back={cardData.back}
            name={cardData.name}
            stats={cardData.stats}
          />
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
