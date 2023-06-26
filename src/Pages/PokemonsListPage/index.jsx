import { useContext, useEffect, useState } from "react";
import PokemonCard from "../../Components/PokemonCard";
import { pokeApi } from "../../Api/axiosConfig";
import { Grid } from "@chakra-ui/react";
import { globalContext } from "../../context/globalContext";

function PokemonList() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [pokeRender, setPokeRender] = useState([]);
  const { pokePage } = useContext(globalContext);
  useEffect(() => {
    pokeApi
      .get()
      .then((response) => {
        Promise.all(
          response.data.results.map((response) => pokeApi.get(response.url))
        ).then((response) => {
          setAllPokemons(response.map((res) => res.data));
          setPokeRender(response.map((res) => res.data));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   setPokeRender(allPokemons.filter((pokemon) =>
  //       pokePage.map((pokemonFilter) => pokemon.id !== pokemonFilter.id)
  //     )
  //   );


  // }, [pokePage]);

// console.log(pokeRender)
  return (
    <Grid templateColumns={"repeat(3,1fr)"} justifyItems={"center"}>
      {allPokemons.map((pokemon) => {
        return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
      })}
    </Grid>
  );
}

export default PokemonList;
