import { render, screen } from '@testing-library/react'

import Home from './home.screen'

describe('<Home />', () => {
  describe('when home is renderes', () => {
    beforeAll(() => {
      render(<Home />)
    })
    it('renders the poke test image', () => {
      const pokeTestImage = screen.getByRole('img', { name: 'PokeTest Logo Image' })
      expect(pokeTestImage).toBeInTheDocument()
    })
  })
})
