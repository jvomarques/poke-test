import { ReactElement, useState } from 'react'

import pokeTestLogo from './assets/images/pokeTestLogo.png'
import style from './home.module.scss'
import PokemonRepository from '../infrastructure/pokemon-repository'
import Pokemon from '../domain/entities/pokemon'
import PokemonComponent from './components/pokemon.component'

const pokemonRepository = new PokemonRepository()

function Home(): ReactElement {
  const [inputPokemonName, setInputPokemonName] = useState('')
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined)

  const handleSubmitPokemonInput = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputPokemonName) {
      setPokemon(await pokemonRepository.getByName(inputPokemonName))
    } else {
      setPokemon(undefined)
    }
  }

  const handleChangePokemonInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPokemonName(event.currentTarget.value.toLowerCase())
  }

  return (
    <div className={style.homeContainer}>
      <div className={style.logoContainer}>
        <img src={pokeTestLogo} aria-label="PokeTest Logo Image" />
      </div>

      <form onSubmit={handleSubmitPokemonInput}>
        <div className={style.inputContainer}>
          <input
            type="text"
            onChange={handleChangePokemonInput}
            placeholder="Type a pokemon name"
            aria-label="Type a pokemon name"
          />
        </div>
      </form>

      <PokemonComponent pokemon={pokemon} />
    </div>
  )
}

export default Home
