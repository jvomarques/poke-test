import { fireEvent, render, screen } from '@testing-library/react'
import Pokemon from 'screens/home/domain/entities/pokemon'
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
    it('renders the pokemon type correctly', async () => {
      const pokemonMock: Pokemon = {
        name: 'pokeTestName',
        type: 'pokeTestType',
        image: 'pokeTestImage',
      }
      jest.spyOn(PokemonRepository.prototype, 'getByName').mockResolvedValue(pokemonMock)

      const searchPokemonInput = screen.getByPlaceholderText('Type a pokemon name')
      fireEvent.change(searchPokemonInput, { target: { value: pokemonMock.name } })
      fireEvent.submit(searchPokemonInput)

      const pokemonType = await screen.findByText(/test/i)
      expect(pokemonType).toBeInTheDocument()
    })

    it('renders the pokemon image correctly from a text input', async () => {
      const pokemonMock: Pokemon = {
        name: 'pokeTestName',
        type: 'pokeTestType',
        image: 'pokeTestImage',
      }

      jest.spyOn(PokemonRepository.prototype, 'getByName').mockResolvedValue(pokemonMock)

      const searchPokemonInput = screen.getByPlaceholderText('Type a pokemon name')
      fireEvent.change(searchPokemonInput, { target: { value: pokemonMock.name } })
      fireEvent.submit(searchPokemonInput)

      const pokemonImage = await screen.findByRole('img', { name: `${pokemonMock.name} pokemon image` })
      expect(pokemonImage).toBeInTheDocument()
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
