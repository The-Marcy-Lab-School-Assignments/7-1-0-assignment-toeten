
import React, { useContext } from 'react';
import PokemonCard from './PokemonCard';
import PokemonContext from '../context/PokemonContext';

const PokemonCollection = () => {
  const { allPokemon } = useContext(PokemonContext);

  return (
    <div className="ui six cards">
      {allPokemon?.map(pokemon => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
        />
      ))}
    </div>
  );
};

export default PokemonCollection;
