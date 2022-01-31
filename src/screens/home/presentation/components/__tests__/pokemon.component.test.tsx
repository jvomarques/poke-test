import { render, screen } from '@testing-library/react'
import Pokemon from '../../../domain/entities/pokemon'
import PokemonComponent from '../pokemon.component'
import * as pokemonAttack from '../../../domain/usecases/pokemon-attack-usecase'
import * as pokemonDefense from '../../../domain/usecases/pokemon-defense-usecase'

const POKEMON_NAME_MOCK = 'pikachu'
const POKEMON_TYPE_MOCK = 'electric'
const POKEMON_IMAGE_MOCK = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
const POKEMON_MOCK: Pokemon = {
  name: POKEMON_NAME_MOCK,
  image: POKEMON_IMAGE_MOCK,
  type: POKEMON_TYPE_MOCK,
}
const attackValueMock = 500
const defenseValueMock = 100

describe('when pokemon is rendered', () => {
  beforeEach(() => {
    const calculateAttackMock = jest.spyOn(pokemonAttack, 'calculateAttack')
    calculateAttackMock.mockReturnValue(attackValueMock)

    const calculateDefenseMock = jest.spyOn(pokemonDefense, 'calculateDefense')
    calculateDefenseMock.mockReturnValue(defenseValueMock)
    render(<PokemonComponent pokemon={POKEMON_MOCK} />)
  })

  it('renders the pokemon image correctly', () => {
    const pokemonImage = screen.getByRole('img', { name: 'pikachu pokemon image' })
    expect(pokemonImage).toBeInTheDocument()
  })

  it('renders the pokemon type correctly', () => {
    const pokemonType = screen.getByText(/electric/i)
    expect(pokemonType).toBeInTheDocument()
  })

  it('renders the pokemon class type correctly', () => {
    const pokemonType = screen.getByText(/electric/i)
    expect(pokemonType).toHaveClass('pokemonType-electric')
  })

  it('renders the pokemon attack correctly', () => {
    const attackValue = screen.getByTestId('attack-value')
    expect(attackValue).toHaveTextContent(attackValueMock.toString())
  })

  it('renders the pokemon defense correctly', () => {
    const defenseValue = screen.getByTestId('defense-value')
    expect(defenseValue).toHaveTextContent(defenseValueMock.toString())
  })
})

describe('when pokemon is not rendered', () => {
  beforeEach(() => {
    render(<PokemonComponent pokemon={undefined} />)
  })

  it('renders the guess pokemon image', () => {
    const guessPokemonImage = screen.getByRole('img', { name: 'guess pokemon image' })
    expect(guessPokemonImage).toBeInTheDocument()
  })
})
