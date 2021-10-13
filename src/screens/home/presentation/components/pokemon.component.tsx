import { ReactElement } from 'react'

import Pokemon from '../../domain/entities/pokemon'
import style from './pokemon.module.scss'
import pokemonGuessImage from '../assets/images/pokemonGuess.png'

type PokemonComponentProps = {
  pokemon?: Pokemon
}
function PokemonComponent({ pokemon }: PokemonComponentProps): ReactElement {
  const ariaLabelPokemonName = `${pokemon && pokemon.name} pokemon image`

  return (
    <div className={style.pokemonContainer}>
      {pokemon ? (
        <div>
          <img src={pokemon.image} aria-label={ariaLabelPokemonName} />
          <p>
            Type:
            {' '}
            {pokemon.type}
          </p>
        </div>
      )
        : (
          <img className={style.pokemonGuessImage} src={pokemonGuessImage} aria-label="guess pokemon image" />
        )}

    </div>
  )
}

export default PokemonComponent
