import { Box, Flex, Image, Progress, Text } from "@chakra-ui/react";
import bigPokeball from "../../assets/pokeballBackGroundDetail.png";
import smallPokeball from "../../assets/pokeballDetailInsideBackground.svg";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { pokeApi } from "../../Api/axiosConfig";
import types from "../../utility/types";
import colors from "../../utility/themes";
import { globalContext } from "../../context/globalContext";

const PokemonDetail = () => {
  let totalValue = 0;
  let moveCount = 0;
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});
  const params = useParams();
  const { setPokemonGlobal } = useContext(globalContext);
  useEffect(() => {
    pokeApi.get("/" + params.id).then((response) => {
      setPokemon(response.data);
      setPokemonGlobal(response.data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!loading) {
    for (const stats of pokemon.stats) {
      totalValue += stats.base_stat;
    }
  }
  return (
    <Box position={"relative"}>
      <Text
        fontSize={"3rem"}
        fontFamily={"Poppins"}
        position={"absolute"}
        top={"3rem"}
        left={"2.5rem"}
        color={"white"}
        fontWeight={700}
      >
        Detalhes
      </Text>

      <Image
        position={"absolute"}
        w={"56.812rem"}
        h={"56.812rem"}
        top={"-3.125rem"}
        left={"50%"}
        transform={"translate(-50%)"}
        src={bigPokeball}
        alt="Pokebola Grande"
      />

      <Box
        position={"absolute"}
        w={"86.821rem"}
        h={"41.438rem"}
        left={"50%"}
        top={"11.75rem"}
        transform={"translate(-50%)"}
        bgColor={colors.colors.backgroundCard[pokemon?.types[0].type.name]}
        borderRadius={"2.368rem"}
      >
        <Image
          position={"absolute"}
          top={0}
          right={0}
          h={"41.438rem"}
          src={smallPokeball}
          alt="Pokébola Pequena"
        />

        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt="Imagem do pokémon"
          zIndex={1}
          position={"absolute"}
          top={"-8.25rem"}
          left={"67.75rem"}
          h={"16.875rem"}
          w={"16.875rem"}
        />
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          position={"absolute"}
          bgColor={"white"}
          w={"17.625rem"}
          h={"17.625rem"}
          left={"2.75rem"}
          top={"1.625rem"}
          borderRadius={"0.5rem"}
          border={"0.125rem solid white"}
        >
          <Image
            w={"55%"}
            h={"55%"}
            src={
              pokemon.sprites.versions["generation-v"]["black-white"].animated
                .front_default
            }
          />
        </Flex>

        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          position={"absolute"}
          bgColor={"white"}
          w={"17.625rem"}
          h={"17.625rem"}
          left={"2.75rem"}
          top={"22.188rem"}
          borderRadius={"0.5rem"}
          border={"0.125rem solid white"}
        >
          <Image
            w={"55%"}
            h={"55%"}
            src={
              pokemon.sprites.versions["generation-v"]["black-white"].animated
                .back_default
            }
          />
        </Flex>

        <Box
          position={"absolute"}
          bgColor={"white"}
          w={"21.438rem"}
          h={"38.313rem"}
          left={"22.5rem"}
          top={"1.5rem"}
          borderRadius={"0.75rem"}
        >
          {pokemon.stats.map((stat) => {
            return (
              <Flex alignItems={"center"}>
                <>
                  <Text>
                    {stat.stat.name} {stat.base_stat}
                  </Text>
                  <Progress
                    borderRadius={"1rem"}
                    w={"60%"}
                    value={stat.base_stat}
                    colorScheme={`hsl(${stat.base_stat * 0.8}, 80%, 50%)}`}
                  />
                </>
              </Flex>
            );
          })}
          <Text>total:{totalValue}</Text>
        </Box>

        <Box
          position={"absolute"}
          bgColor={"white"}
          w={"18.25rem"}
          h={"28.313rem"}
          left={"48.188rem"}
          top={"11.5rem"}
          borderRadius={"0.5rem"}
        >
          {pokemon.moves.map((move, i) => {
            if (moveCount < 5) {
              moveCount++;
              return <Text key={i}>{move.move.name}</Text>;
            }
          })}
        </Box>

        <Text
          fontSize={"1rem"}
          fontFamily={"Inter"}
          position={"absolute"}
          top={"1.5rem"}
          left={"48.375rem"}
          color={"white"}
        >
          #{pokemon.id < 10 ? `0${pokemon.id}` : pokemon.id}
        </Text>

        <Text
          fontSize={"3rem"}
          fontFamily={"Inter"}
          position={"absolute"}
          top={"2.438rem"}
          left={"48.188rem"}
          color={"white"}
          textTransform={"capitalize"}
        >
          {pokemon.name}
        </Text>

        <Flex
          gap={"0.3rem"}
          position={"absolute"}
          left={"48.375rem"}
          top={"6.625rem"}
        >
          {pokemon.types.map((type, i) => {
            return <Image key={i} src={types[type.type.name]} />;
          })}
        </Flex>
      </Box>
    </Box>
  );
};

export default PokemonDetail;
