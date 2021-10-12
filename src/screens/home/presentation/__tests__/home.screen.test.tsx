import { render, screen } from '@testing-library/react'

import Home from '../home.screen'

describe('<Home />', () => {
  describe('when home is renderes', () => {
    beforeEach(() => {
      render(<Home />)
    })
    it('renders the poke test logo image', () => {
      const pokeTestImage = screen.getByRole('img', { name: 'PokeTest Logo Image' })
      expect(pokeTestImage).toBeInTheDocument()
    })
    it('renders the search pokemon input', () => {
      const searchPokemonInput = screen.getByPlaceholderText('Type a pokemon name')
      expect(searchPokemonInput).toBeInTheDocument()
    })
  })
})
