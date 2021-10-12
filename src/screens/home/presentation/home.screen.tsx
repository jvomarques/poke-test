import { ReactElement, useState } from 'react'

import pokeTestLogo from './assets/images/pokeTestLogo.png'
import style from './home.module.scss'
import PokemonRepository from '../infrastructure/pokemon-repository'
import Pokemon from '../domain/entities/pokemon'

const pokemonRepository = new PokemonRepository()
const POKEMON_NAME_DEFAULT = 'pikachu'
const POKEMON_TYPE_DEFAULT = 'eletric'
const POKEMON_IMAGE_DEFAULT = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
const POKEMON_DEFAULT: Pokemon = {
  name: POKEMON_NAME_DEFAULT,
  image: POKEMON_IMAGE_DEFAULT,
  type: POKEMON_TYPE_DEFAULT,
}

function Home(): ReactElement {
  const [inputPokemonName, setInputPokemonName] = useState('')

  // const pokemonImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
  // const [pokemonName, setPokemonName] = useState('pikachu')
  // const ariaLabelPokemonName = `${pokemonName} pokemon image`

  const [pokemon, setPokemon] = useState<Pokemon>(POKEMON_DEFAULT)
  const ariaLabelPokemonName = `${pokemon.name} pokemon image`

  const handleSubmitPokemonInput = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPokemon(await pokemonRepository.getByName(inputPokemonName || POKEMON_NAME_DEFAULT))
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

      <img src={pokemon.image} aria-label={ariaLabelPokemonName} />
      <p>
        Type:
        {' '}
        {pokemon.type}
      </p>
    </div>
  )
}

export default Home
