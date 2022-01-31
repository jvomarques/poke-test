import { ReactElement, useMemo } from 'react'

import Pokemon from '../../domain/entities/pokemon'
import calculateAttack from '../../domain/usecases/pokemon-attack-usecase'
import calculateDefense from '../../domain/usecases/pokemon-defense-usecase'

import style from './pokemon.module.scss'
import pokemonGuessImage from '../assets/images/pokemonGuess.png'

type PokemonComponentProps = {
  pokemon?: Pokemon
}
function PokemonComponent({ pokemon }: PokemonComponentProps): ReactElement {
  const pokemonTypeStyle = (pokemonType: string) => style[`pokemonType-${pokemonType}`]
  const ariaLabelPokemonName = `${pokemon && pokemon.name} pokemon image`
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const attack = useMemo(():number => calculateAttack(), [pokemon])
  const defense = useMemo(():number => calculateDefense(attack), [attack])

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
          <span>
            Attack:
            {' '}
            {attack}
          </span>
          <span>
            Defense:
            {' '}
            {defense}
          </span>
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
