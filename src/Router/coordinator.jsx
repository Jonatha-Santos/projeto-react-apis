export const goHome = (navigate) => {
    navigate("/");
}

export const goPokedex = (navigate) => {
    navigate("/pokedex");
}

export const goDetails = (navigate,id) => {
    navigate("/details/"+id);
}