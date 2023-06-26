import { createContext, useState } from "react";

export const globalContext = createContext();


const GlobalContextProvider = ({ children }) => {
    const [pokePage, setPokePage] = useState([]);
    const [pokemonGlobal, setPokemonGlobal] = useState({});
    function addPokemon(pokemon) {
        setPokePage([...pokePage, pokemon]);
  }

  function removePokemon(pokemon) {
    setPokePage(
      pokePage.filter((pokemonFilter) => pokemon.id !== pokemonFilter.id)
    );
  }
  return (
    <globalContext.Provider
      value={{
        pokePage,
        setPokePage,
        addPokemon,
        removePokemon,
        pokemonGlobal,
        setPokemonGlobal,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default GlobalContextProvider;
