import { BrowserRouter, Route, Routes } from "react-router-dom";
import PokemonList from "../Pages/PokemonsListPage";
import PokedexPage from "../Pages/PokedexPage";
import PokemonDetail from "../Pages/PokemonDetailPage";
import Header from "../Components/Header";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<PokemonList />} />
        <Route path="/pokedex" element={<PokedexPage />} />
        <Route path="/details/:id" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
