import axios from 'axios'

import Pokemon from 'screens/home/domain/entities/pokemon'

class PokemonRepository {
  private pokemonAdapter(pokemonJSON: string): Pokemon {
    const pokemonObject = JSON.parse(pokemonJSON)
    const pokemon: Pokemon = {
      name: pokemonObject.name,
      image: pokemonObject.sprites.other.dream_world.front_default,
      type: pokemonObject.types[0].type.name,
    }
    return pokemon
  }

  async getByName(pokemonName: string): Promise<Pokemon | undefined> {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    const pokemonApiResult = await axios.get(url).catch(() => (undefined))
    if (!pokemonApiResult) { return undefined }
    const pokemon = this.pokemonAdapter(JSON.stringify(pokemonApiResult.data))
    return pokemon
  }
}

export default PokemonRepository
