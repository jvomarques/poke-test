import { render, screen } from '@testing-library/react'
import Pokemon from '../../../domain/entities/pokemon'
import PokemonComponent from '../pokemon.component'

const POKEMON_NAME_MOCK = 'pikachu'
const POKEMON_TYPE_MOCK = 'electric'
const POKEMON_IMAGE_MOCK = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
const POKEMON_MOCK: Pokemon = {
  name: POKEMON_NAME_MOCK,
  image: POKEMON_IMAGE_MOCK,
  type: POKEMON_TYPE_MOCK,
}

describe('when pokemon is rendered', () => {
  beforeEach(() => {
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
