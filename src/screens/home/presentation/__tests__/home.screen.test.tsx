import { fireEvent, render, screen } from '@testing-library/react'
import Pokemon from '../../domain/entities/pokemon'
import PokemonRepository from '../../infrastructure/pokemon-repository'

import Home from '../home.screen'

const POKEMON_NAME_DEFAULT = 'pikachu'
const POKEMON_TYPE_DEFAULT = 'eletric'
const POKEMON_IMAGE_DEFAULT = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg'
const POKEMON_DEFAULT: Pokemon = {
  name: POKEMON_NAME_DEFAULT,
  image: POKEMON_IMAGE_DEFAULT,
  type: POKEMON_TYPE_DEFAULT,
}

describe('<Home />', () => {
  beforeEach(() => {
    render(<Home />)
  })

  describe('when home is rendered', () => {
    it('renders the poke test logo image', () => {
      const pokeTestLogoImage = screen.getByRole('img', { name: 'PokeTest Logo Image' })
      expect(pokeTestLogoImage).toBeInTheDocument()
    })

    it('renders the search pokemon input', () => {
      const searchPokemonInput = screen.getByPlaceholderText('Type a pokemon name')
      expect(searchPokemonInput).toBeInTheDocument()
    })

    it('renders the pikachu image as default', () => {
      const pokemonImage = screen.getByRole('img', { name: 'pikachu pokemon image' })
      expect(pokemonImage).toBeInTheDocument()
    })

    it('renders the pikachu type as default', () => {
      const pokemonType = screen.getByText(/eletric/i)
      expect(pokemonType).toBeInTheDocument()
    })
  })

  describe('when any pokemon is searched', () => {
    it('renders the pokemon image correctly from a text input', async () => {
      const pokemonNameMock = 'charmander'
      jest.spyOn(PokemonRepository.prototype, 'getByName').mockResolvedValue({ name: pokemonNameMock, image: 'url-test', type: 'test' })

      const searchPokemonInput = screen.getByPlaceholderText('Type a pokemon name')
      fireEvent.change(searchPokemonInput, { target: { value: pokemonNameMock } })
      fireEvent.submit(searchPokemonInput)

      const pokemonImage = await screen.findByRole('img', { name: `${pokemonNameMock} pokemon image` })
      expect(pokemonImage).toBeInTheDocument()
    })

    it('renders the pikachu pokemon image if a text input is empty', async () => {
      jest.spyOn(PokemonRepository.prototype, 'getByName').mockResolvedValue(POKEMON_DEFAULT)
      const pokemonNameMock = ''
      const searchPokemonInput = screen.getByPlaceholderText('Type a pokemon name')
      fireEvent.change(searchPokemonInput, { target: { value: pokemonNameMock } })
      fireEvent.submit(searchPokemonInput)

      const pokemonImage = await screen.findByRole('img', { name: 'pikachu pokemon image' })
      expect(pokemonImage).toBeInTheDocument()
    })
  })
})
