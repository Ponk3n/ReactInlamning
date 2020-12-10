import React, { useState, useEffect } from 'react'
import LoadingGIF from '../shared/images/pokemon.gif'
import PokemonService from '../api/service/PokemonService'
import { useDebounce } from '../hooks/useDebounce'

export const HomeView = () => {
    const [data, setData] = useState()
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const debouncedSearchTerm = useDebounce(search, 1000)

    const fetchDataFromPokemonAPI = async () => {
        setLoading(true)
        try {
            const response = await PokemonService.searchForPokemon(search.toLowerCase())
            setData(response.data)
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const displayDataWhenDoneLoading = () => {
        return <div>
            <img src={data.sprites.front_default} alt={'Error...'} />
            <h1>{data?.name}</h1>
        </div>
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchDataFromPokemonAPI()
        }
    }, [debouncedSearchTerm])

    return (
        <div>
            <h1>hej</h1>
            <input onChange={(event) => setSearch(event.target.value)} />

            <hr />
            <br />

            {loading
                ? <img src={LoadingGIF} alt={'Error...'} />
                : displayDataWhenDoneLoading()}
        </div>
    )
}
