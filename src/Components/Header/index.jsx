import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/pokemonlogo.svg";
import { Button, Grid, GridItem, Image, Text, useDisclosure } from "@chakra-ui/react";
import { goHome, goPokedex } from "../../Router/coordinator";
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

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pokemonGlobal, addPokemon, removePokemon, pokePage } =
    useContext(globalContext);

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
  const [functionButton, setFunctionButton] = useState("")
  function onCloseModal() {
    onClose();
    if (functionButton === "Remove") {
      removePokemon(pokemonGlobal);
    }
  }
  return (
    <Grid
      h={"10rem"}
      templateColumns={"repeat(16,1fr)"}
      alignItems={"center"}
      bgColor={"#FFFFFF"}
    >
      <GridItem colStart={2} colEnd={7}>
        {location.pathname !== "/" && (
          <Button
            bgColor={"transparent"}
            textDecoration={"underline"}
            fontWeight={"bolder"}
            fontSize={"1rem"}
            onClick={() => {
              goHome(navigate);
            }}
          >
            &lt; Todos Pokémons
          </Button>
        )}
      </GridItem>
      <GridItem colStart={7} colEnd={12}>
        <Image src={logo} alt="Logo" />
      </GridItem>
      <GridItem colStart={13} colEnd={16}>
        {location.pathname === "/" && (
          <Button
            bgColor={"#33A4F5"}
            color={"white"}
            w={"19.938rem"}
            h={"4.625rem"}
            fontSize={"1.5rem"}
            onClick={() => {
              goPokedex(navigate);
            }}
          >
            Pokédex
          </Button>
        )}
        {location.pathname.includes("details") &&
          (!pokePage.find((pokemon) => pokemon.id === pokemonGlobal.id) ? (
            <Button
              bgColor={"#33A4F5"}
              color={"white"}
              w={"19.938rem"}
              h={"4.625rem"}
              fontSize={"1.5rem"}
              onClick={() => {
                setFunctionButton("")
                onOpen();
                addPokemon(pokemonGlobal);
              }}
            >
              Capturar!
            </Button>
          ) : (
            <Button
              bgColor={"#33A4F5"}
              color={"white"}
              w={"19.938rem"}
              h={"4.625rem"}
              fontSize={"1.5rem"}
              onClick={() => {
                setFunctionButton("Remove")
                onOpen();
              }}
            >
              Excluir da Pokédex
            </Button>
          ))}
      </GridItem>
      <Modal isCentered isOpen={isOpen} onClose={onCloseModal}>
        {overlay}
        <ModalContent>
          <ModalHeader fontFamily={"Poppins"} fontSize={"3rem"}>
            {functionButton !== "Remove" ? "Gotcha!" : "Oh, no!"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontFamily={"Poppins"} fontSize={"1rem"}>
              {functionButton !== "Remove"
                ? "Sucesso! O Pokémon foi adicionado a sua Pokédex"
                : "Poxa! O Pokémon foi removido da sua Pokédex"}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseModal}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
}

export default Header;