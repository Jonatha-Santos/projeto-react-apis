import { useContext } from "react";
import { globalContext } from "../../context/globalContext";
import PokemonCard from "../../Components/PokemonCard";
import { Flex, Grid } from "@chakra-ui/react";

function PokedexPage() {
  const { pokePage } = useContext(globalContext);
  return (
    <>
      <Grid templateColumns={"repeat(3,1fr)"} justifyItems={"center"}>
        {pokePage.map((pokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </Grid>
    </>
  );
}

export default PokedexPage;
