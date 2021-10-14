import { ReactElement } from 'react'

import Pokemon from '../../domain/entities/pokemon'
import style from './pokemon.module.scss'
import pokemonGuessImage from '../assets/images/pokemonGuess.png'

type PokemonComponentProps = {
  pokemon?: Pokemon
}
function PokemonComponent({ pokemon }: PokemonComponentProps): ReactElement {
  const pokemonTypeStyle = (pokemonType: string) => style[`pokemonType-${pokemonType}`]
  const ariaLabelPokemonName = `${pokemon && pokemon.name} pokemon image`

  return (
    <div>
      {pokemon ? (
        <div className={style.pokemonContainer}>
          <img src={pokemon.image} aria-label={ariaLabelPokemonName} />
          <h1 className={`${style.pokemonType} ${pokemonTypeStyle(pokemon.type)}`}>
            Type:
            {' '}
            {pokemon.type}
          </h1>
        </div>
      )
        : (
          <div className={style.pokemonContainer}>
            <img className={style.pokemonGuessImage} src={pokemonGuessImage} aria-label="guess pokemon image" />
          </div>
        )}

    </div>
  )
}

export default PokemonComponent
