import { useState, useEffect } from "react";
import handleFetch from '../utils/handleFetch';
import PokemonContext from "./PokemonContext";
// TODO: Import the PokemonContext

const starterPokemon = [
    {
        id: 0,
        name: "butterfree 1",
        hp: 60,
        front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
        back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/12.png"
    },
    {
        id: 1,
        name: "butterfree 2",
        hp: 60,
        front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
        back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/12.png"
    },
    {
        id: 2,
        name: "butterfree 3",
        hp: 60,
        front: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
        back: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/12.png"
    }
]

const PokemonProvider = ({ children }) => {
    
    const [allPokemon, setAllPokemon] = useState(starterPokemon);
    
    // TODO: use useEffect to fetch data from the local JSON server (remember to start JSON server!)
    useEffect(() => {
        const fetchData = async () => {
            const [data, fetchError] = await handleFetch('http://localhost:4000/pokemon')
            if (fetchError) {
                setError(fetchError)
            } else {
                setAllPokemon(data)
            }
        }
        fetchData()
        console.log('Current allPokemon:', allPokemon)
    }, [])
    // TODO: Add values to be included in the context here
    let contextValues = { allPokemon, setAllPokemon}

    // TODO: Wrap the {children} in the PokemonContext.Provider and provide the values above
    return (
        <PokemonContext.Provider value={contextValues} >
             { children }
        </PokemonContext.Provider>
    )
}

export default PokemonProvider;