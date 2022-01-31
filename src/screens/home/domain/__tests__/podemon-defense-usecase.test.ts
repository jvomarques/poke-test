import { calculateDefense } from '../usecases/pokemon-defense-usecase'

describe('PokemonDefenseUseCase', () => {
  describe('when defense is calculated', () => {
    it('returns 40% of attack value', () => {
      const attack = 500
      const defenseExpected = attack * 0.4

      const defenseCalculated = calculateDefense(attack)

      expect(defenseCalculated).toBe(defenseExpected)
    })
  })
})
