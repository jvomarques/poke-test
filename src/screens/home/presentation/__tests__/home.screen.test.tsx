import { fireEvent, render, screen } from '@testing-library/react'
import PokemonRepository from '../../infrastructure/pokemon-repository'

import Home from '../home.screen'

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

    it('renders the guess image as default', () => {
      const guessPokemonImage = screen.getByRole('img', { name: 'guess pokemon image' })
      expect(guessPokemonImage).toBeInTheDocument()
    })
  })

  describe('when any valid pokemon is searched', () => {
    it('renders the pokemon image correctly from a text input', async () => {
      const pokemonNameMock = 'charmander'
      jest.spyOn(PokemonRepository.prototype, 'getByName').mockResolvedValue({ name: pokemonNameMock, image: 'url-test', type: 'test' })

      const searchPokemonInput = screen.getByPlaceholderText('Type a pokemon name')
      fireEvent.change(searchPokemonInput, { target: { value: pokemonNameMock } })
      fireEvent.submit(searchPokemonInput)

      const pokemonImage = await screen.findByRole('img', { name: `${pokemonNameMock} pokemon image` })
      expect(pokemonImage).toBeInTheDocument()
    })

    it('renders the pokemon type correctly', async () => {
      const pokemonNameMock = 'charmander'
      jest.spyOn(PokemonRepository.prototype, 'getByName').mockResolvedValue({ name: pokemonNameMock, image: 'url-test', type: 'test' })

      const searchPokemonInput = screen.getByPlaceholderText('Type a pokemon name')
      fireEvent.change(searchPokemonInput, { target: { value: pokemonNameMock } })
      fireEvent.submit(searchPokemonInput)

      const pokemonType = await screen.findByText(/test/i)
      expect(pokemonType).toBeInTheDocument()
    })
  })

  describe('when any invalid pokemon is searched', () => {
    it('renders the guess pokemon image', async () => {
      const pokemonInvalidNameMock = 'charmander123'
      jest.spyOn(PokemonRepository.prototype, 'getByName').mockResolvedValue(undefined)

      const searchPokemonInput = screen.getByPlaceholderText('Type a pokemon name')
      fireEvent.change(searchPokemonInput, { target: { value: pokemonInvalidNameMock } })
      fireEvent.submit(searchPokemonInput)

      const guessPokemonImage = await screen.findByRole('img', { name: 'guess pokemon image' })
      expect(guessPokemonImage).toBeInTheDocument()
    })
  })
})
