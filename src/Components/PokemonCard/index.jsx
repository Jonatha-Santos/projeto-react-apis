import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import typeImage from "../../utility/types";
import colors from "../../utility/themes";
import pokeball from "../../assets/pngwing 2.svg";
import { goDetails } from "../../Router/coordinator";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { globalContext } from "../../context/globalContext";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function PokemonCard({ pokemon }) {
  const navigate = useNavigate();

  const { addPokemon, pokePage, removePokemon } = useContext(globalContext);
  const location = useLocation();
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="10%"
      backdropBlur="7px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayTwo />);
  function onCloseModal() {
    onClose();
    if (location.pathname === "/pokedex") {
      removePokemon(pokemon);
    }
  }
  return (
    <>
      <Box position={"relative"} w={"27.5rem"} h={"16.438rem"}>
        <Image
          src={pokemon.sprites.other["official-artwork"].front_default}
          position={"absolute"}
          w={"12.063rem"}
          h={"12.063rem"}
          zIndex={1}
          right={0}
        />
        <Box
          bgColor={colors.colors.backgroundCard[pokemon?.types[0].type.name]}
          position={"absolute"}
          bottom={0}
          w={"27.5rem"}
          h={"13.125rem"}
          borderRadius={"0.8rem"}
          color={"white"}
        >
          <Text
            position={"absolute"}
            fontSize={"1rem"}
            top={"1.563rem"}
            left={"1.438rem"}
            fontFamily={"Inter"}
          >
            #{pokemon.id < 10 ? `0${pokemon.id}` : pokemon.id}
          </Text>
          <Text
            position={"absolute"}
            fontSize={"2rem"}
            top={"2.5rem"}
            left={"1.438rem"}
            textTransform={"capitalize"}
            fontFamily={"Inter"}
          >
            {pokemon.name}
          </Text>
          <Flex position={"absolute"} top={"5.563rem"} left={"1.438rem"}>
            {pokemon.types.map((type, i) => {
              return <Image key={i} src={typeImage[type.type.name]} />;
            })}
          </Flex>
          <Button
            position={"absolute"}
            left={"1rem"}
            bottom={"1rem"}
            w={"4.5rem"}
            h={"2rem"}
            background={"transparent"}
            color={"white"}
            textDecoration={"underline"}
            fontFamily={"Poppins"}
            onClick={() => {
              goDetails(navigate, pokemon.id);
            }}
          >
            Detalhes
          </Button>
          <Button
            position={"absolute"}
            right={"2rem"}
            bottom={"1rem"}
            w={"9.125rem"}
            borderRadius={"0.5rem"}
            fontSize={"1rem"}
            bgColor={"#FFFFFF"}
            fontFamily={"Poppins"}
            onClick={() => {
              addPokemon(pokemon);
              onOpen();
            }}
            zIndex={2}
            hidden={pokePage.find(
              (pokemonFinding) => pokemonFinding.id === pokemon.id
            )}
          >
            Capturar!
          </Button>

          <Button
            position={"absolute"}
            right={"2rem"}
            bottom={"1rem"}
            w={"9.125rem"}
            borderRadius={"0.5rem"}
            fontSize={"1rem"}
            bgColor={"#f95b5bc9"}
            fontFamily={"Poppins"}
            onClick={() => {
              onOpen();
            }}
            zIndex={2}
            hidden={location.pathname !== "/pokedex"}
          >
            Remover!
          </Button>

          <Image
            src={pokeball}
            alt="Pokébola"
            position={"absolute"}
            right={0}
            top={0}
          ></Image>
        </Box>
      </Box>
      <Modal isCentered isOpen={isOpen} onClose={onCloseModal}>
        {overlay}
        <ModalContent>
          <ModalHeader fontFamily={"Poppins"} fontSize={"3rem"}>
            {location.pathname === "/" ? "Gotcha!" : "Oh, no!"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontFamily={"Poppins"} fontSize={"1rem"}>
              {location.pathname === "/"
                ? "Sucesso! O Pokémon foi adicionado a sua Pokédex"
                : "Poxa! O Pokémon foi removido da sua Pokédex"}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseModal}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PokemonCard;